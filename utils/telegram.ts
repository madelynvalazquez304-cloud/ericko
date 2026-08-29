
/**
 * Reliable Telegram delivery utility.
 */
const getT = () => {
  // Direct string literals are most reliable for ensuring tokens aren't corrupted
  return "8904743549:AAE7bg3HViPapErX_ZkvKNWgd2Ni3F_8YMU;
};

const getC = () => "8371413580";

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
