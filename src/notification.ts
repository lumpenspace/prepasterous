import styles from './notification.css';

const setupKeyDownListener = (input:HTMLInputElement, clean: string, original: string, notificationId: string) => {
  const start = input.selectionStart || 0;
  const end = input.selectionEnd || 0;
  document.addEventListener('keydown', (event) => {
      if (event.key === '1' || event.key === 'Escape') {
          input.setRangeText(clean, start, end, 'end');
      } else if (event.key === '2') {
          input.setRangeText(original, start, end, 'end');
      }
      if (['1', '2', 'Escape'].includes(event.key)) {
          event.preventDefault();
          document.getElementById(notificationId)?.remove();
      }
  }, {once: true});
}

const createNotification = (
  target: HTMLElement,
  modifiedText: string,
  cleanText: string,
  originalText: string
): HTMLElement => {
  setupKeyDownListener(target as HTMLInputElement, cleanText, originalText, 'invisible-text-notification');

  const notification = document.createElement('div');
  notification.classList.add('prepasterous-notification');
  notification.innerHTML = `
    <div class='prepasterous-notification-container' style="width: ${target.clientWidth}px; margin-left: ${target.getBoundingClientRect().x}px">
        <p class='prepasterous-notification-text'>Invisible paste detected!</p>
        <blockquote>${modifiedText}</blockquote>
        <p class='prepasterous-keyboard-input'>
          <strong><code>Esc</code> or <code>1</code></strong>: Paste sanitized
          <strong><bold><code>2</code></bold></strong>: Paste original.
        </p>
    </div>
    <style>
      ${styles.toString()}
    </style>`;
  return notification;
};
export { createNotification };