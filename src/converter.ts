import { CharRanger, Ranger, TRange } from './ranger';

const invisibleLetters = new CharRanger([0xe0030, 0xE007f] as TRange);
const invisibleChars = new Ranger([0x200B, 0x200F]);

const toExplicit = (char:string) => `U:0x${char.codePointAt(0)!.toString(16).padStart(4, '0')}`;

const getVisibleVersion = (char: string):string|null =>
  invisibleLetters.convertCharOut(char) || toExplicit(char);

const matchString = `[${invisibleChars.regexRange()}${invisibleLetters.regexRange()}\uFEFF\u00AD]`;

const matcher = new RegExp(`${matchString}+`, 'ug');
const charMatcher = new RegExp(matchString, 'ug');

const convert = (originalString: string) => {

    const matches = originalString?.match(matcher);

    if (!matches) return originalString;

    let newString = originalString;

    matches.forEach((match, i) => {
        const charMatches = match.match(charMatcher);
        if (!charMatches) return;
        const visibleMatches = charMatches.map(getVisibleVersion).join('');
        
        newString = newString?.replaceAll(match, `<pre>${visibleMatches}</pre>`);
    })

    return newString;
}

export default convert;
export { matcher, charMatcher };
