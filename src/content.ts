import { createNotification } from './notification';
import convert, { matcher } from './converter';

document.addEventListener('paste', (event) => {
    const originalText = event.clipboardData!.getData('text/plain');
    const modifiedText = convert(originalText);
    if (modifiedText === originalText) {
        return true;
    }
    event.preventDefault();    
    if (document.activeElement && 
        ((['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)
            || (document.activeElement as HTMLElement).isContentEditable))
    ) {
        const notificationId = 'invisible-text-notification';
        const target = document.activeElement as HTMLInputElement;
        const notification = createNotification(
            target,
            modifiedText,
            originalText.replaceAll(matcher, ''),
            originalText
        );
        notification.id = notificationId;
        document.body.appendChild(notification);
    }
});

