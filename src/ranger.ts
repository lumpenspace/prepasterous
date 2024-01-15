
type TRange = [start: number, end: number];

class Ranger {
    startOffset: number;
    endOffset: number;

    constructor([start, end]: TRange) {
        this.startOffset = start;
        this.endOffset = end;
    }
    getRange() {
        return [this.startOffset, this.endOffset];
    }
    includes(candidate: number) {
        return candidate >= this.startOffset && candidate <= this.endOffset;
    }
    convertIn(candidate: number) {
        if (!this.includes(candidate)) {
            return undefined;
        }
        return candidate + this.startOffset;
    }
    convertOut(candidate: number) {
        return candidate - this.startOffset;
    }
    toString() {
        return `${this.startOffset}-${this.endOffset}`;
    }
    *each() {
        for (let i = this.startOffset; i <= this.endOffset; i++) {
            yield i;
        }
    }
    regexRange(): string {
        const startHex = this.startOffset.toString(16).padStart(4, '0');
        const endHex = this.endOffset.toString(16).padStart(4, '0');
        return `\\u${startHex}-\\u${endHex}`;
    }
}


class CharRanger extends Ranger {
    constructor(range: TRange) {
        super(range);
    }


    convertCharIn(candidate: string): string|null {
        const alphabetStart = 0x0041; // Start of the alphabet in Unicode (A)
        const code = candidate.codePointAt(0);
        if (!code) {
            return null;
        }
        const adjustedCode = code - alphabetStart + this.startOffset;
        if (this.includes(adjustedCode)) {
            return String.fromCodePoint(adjustedCode);
        }
        return null;
    }

    convertCharOut(candidate: string): string|null {
        const code = candidate.codePointAt(0);
        if (!code || !this.includes(code)) {
            return null;
        }
        const alphabetStart = 0x0041; // Start of the alphabet in Unicode (A)
        const adjustedCode = code - this.startOffset + alphabetStart;
        return String.fromCodePoint(adjustedCode);
    }
}

export { Ranger, CharRanger, TRange };