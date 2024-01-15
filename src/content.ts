import { CharRanger, Ranger, TRange } from './ranger';

const invisibleLetters = new CharRanger([0x1F1E6, 0x1F1FF] as TRange);
const invisibleChars = new Ranger([0x200B, 0x200F]);
const invisibleCharCodes:number[] = [0xFEFF, 0x00AD];

const getVisibleVersion = (char: string):string|null =>
    invisibleLetters.convertCharOut(char) || char.codePointAt(0)!.toString(16).padStart(4)

const matcher = new RegExp(`[${invisibleChars.regexRange()}${invisibleLetters.regexRange()}\uFEFF\u00AD]`, 'g');


document.addEventListener('paste', (event) => {
    let oldPasteData =  event.clipboardData?.getData('text');
    let matches = oldPasteData?.match(matcher);
    if (!matches) {
        return;
    }
    event.preventDefault();
    matches.forEach((match) => {
        let visibleVersion = getVisibleVersion(match);
        if (visibleVersion) {
            oldPasteData = oldPasteData?.replace(match, visibleVersion);
        }
    });
    event.clipboardData?.setData('text', oldPasteData || '');
})
