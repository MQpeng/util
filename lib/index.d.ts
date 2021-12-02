export default class KeyFocus {
    elements: any[];
    useCapture: boolean;
    constructor(elements: any[], useCapture?: boolean);
    bindKey(beforeCb?: (e?: KeyboardEvent, ele?: any) => any, afterCb?: (e?: KeyboardEvent, ele?: any) => any): void;
    private getFocus;
}
export declare function buildLink(elements: any[]): any[];
export declare function getElementLeft(element: any): any;
export declare function getElementTop(element: any): any;
