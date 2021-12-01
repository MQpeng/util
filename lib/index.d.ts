export default class KeyFocus {
    elements: any[];
    constructor(elements: any[]);
    bindKey(cb?: (e?: KeyboardEvent) => void): void;
    private getFocus;
}
export declare function buildLink(elements: any[]): any[];
