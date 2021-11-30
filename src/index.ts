export type EventString =
  | 'keydown'
  | 'keyup'
  | 'mouseup'
  | 'mousemove'
  | 'click'
  | 'dblclick'
  | 'mouseover'
  | 'mouseout'
  | 'mouseenter'
  | 'mouseleave'
  | 'contextmenu';

export class Simulation {
  fromEvent: EventString;
  targetDom: any = document;
  eventInit: KeyboardEventInit | MouseEventInit | undefined;
  constructor(fromEvent: EventString, eventInit?: KeyboardEventInit | MouseEventInit, targetDom = document) {
    this.fromEvent = fromEvent;
    this.eventInit = eventInit;
    this.targetDom = targetDom;
  }

  public dispatch() {
    const keyEvent = this.of(this.fromEvent)
      ? new KeyboardEvent(this.fromEvent, this.eventInit)
      : new MouseEvent(this.fromEvent, this.eventInit);
    if ((this.targetDom as any)?.length) {
      this.targetDom.forEach((e: any) => e.dispatchEvent(keyEvent));
    } else {
      this.targetDom.dispatchEvent(keyEvent);
    }
  }

  private of(fromEvent: EventString) {
    return /^key/.test(fromEvent);
  }
}
