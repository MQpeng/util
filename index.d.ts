export default class KeyFocus {
    elements: any[];
    useCapture: boolean;
    eventsHandler: any[];
    keyEvent: 'keydown' | 'keyup';
    constructor(elements: any[], useCapture?: boolean);
    updateElements(elements: any[]): void;
    bindKey(beforeCb?: (e: KeyboardEvent, ele: any) => any, afterCb?: (e: KeyboardEvent, ele: any) => any): void;
    removeAllListener(): void;
    private getFocus;
    destroyLink(): void;
}
export declare function buildLink(elements: any[]): any[];
export declare function getElementLeft(element: any): any;
export declare function getElementTop(element: any): any;
