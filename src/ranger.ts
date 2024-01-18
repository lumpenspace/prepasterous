type TRange = [start: number, end: number];

class Ranger {
    start: number;
    end: number;


    constructor([start, end]: TRange) {
        this.start = start;
        this.end = end;
    }
    getRange() {
        return [this.start, this.end];
    }
    includes(candidate: number) {
        return candidate >= this.start && candidate <= this.end;
    }
    convertIn(candidate: number) {
        if (!this.includes(candidate)) {
            return undefined;
        }
        return candidate + this.start;
    }
    convertOut(candidate: number) {
        return candidate - this.start;
    }
    toString() {
        return `${this.start}-${this.end}`;
    }
    *each() {
        for (let i = this.start; i <= this.end; i++) {
            yield i;
        }
    }
    regexRange(): string {
        const startHex = this.start.toString(16).padStart(4, '0');
        const endHex = this.end.toString(16).padStart(4, '0');
        return `\\u{${startHex}}-\\u{${endHex}}`;
    }
}

class CharRanger extends Ranger {
    alphabetStart = 0x30; // Start of the alphabet in Unicode (A)

    convertCharIn(candidate: string): string|null {
        const code = candidate.codePointAt(0);
        if (!code) {
            return null;
        }
        const adjustedCode = code - this.alphabetStart + this.start;
        if (this.includes(adjustedCode)) {
            return String.fromCodePoint(adjustedCode);
        }
        return null;
    }

    __convertCodePointOut(candidate: string): number|null { 
        const code = candidate.codePointAt(0)!;

        if (!this.includes(code)) {
            console.log(`Char ${candidate} not in range ${this.toString()}`);
            return null;
        }
        return this.convertOut(code + this.alphabetStart);
    }

    convertCharOut(candidate: string): string|null {
        const code = this.__convertCodePointOut(candidate);
        if (code === null) {
            return null;
        }
        const char = String.fromCodePoint(code);
        return char;
    }
}

export { Ranger, CharRanger, TRange };