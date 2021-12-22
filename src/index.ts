export default class KeyFocus {
  elements: any[] = [];
  useCapture: boolean = true;
  eventsHandler: any[] = [];
  keyEvent: 'keydown' | 'keyup' = 'keyup';
  constructor(elements: any[], useCapture: boolean = true) {
    this.updateElements(elements);
    this.useCapture = useCapture;
  }

  updateElements(elements: any[]) {
    this.removeAllListener();
    if (!elements || !elements.length) {
      throw new Error('Elements must be not null or undefined');
    }
    this.destroyLink();
    this.elements = buildLink(elements);
  }

  bindKey(beforeCb?: (e: KeyboardEvent, ele: any) => any, afterCb?: (e: KeyboardEvent, ele: any) => any) {
    this.elements.forEach((v, i, a) => {
      const onHandler = (keyEvent: KeyboardEvent) => {
        let key = '',
          cbr: any;
        if (beforeCb) {
          cbr = beforeCb(keyEvent, v);
          if (cbr === false) {
            return;
          }
        }

        switch (keyEvent.key) {
          case 'Enter':
          case 'ArrowRight':
            key = 'next';
            break;
          case 'ArrowLeft':
            key = 'last';
            break;
          case 'ArrowDown':
            key = 'bottom';
            break;
          case 'ArrowUp':
            key = 'top';
            break;
        }
        this.getFocus(cbr || v[key]);

        if (afterCb) afterCb(keyEvent, v);
      };
      this.eventsHandler.push({ element: v.value, onHandler });
      v.value.addEventListener(this.keyEvent, onHandler, this.useCapture);
    });
  }

  public removeAllListener() {
    this.eventsHandler.forEach(({ element, onHandler }) => {
      element.removeEventListener(this.keyEvent, onHandler, this.useCapture);
    });
    this.eventsHandler.length = 0;
  }

  private getFocus(next: any) {
    if (!next) return;
    if (next.focus) next.focus();
    if (next.select) next.select();
  }

  public destroyLink() {
    if (this.elements && this.elements.length) {
      this.elements
        .filter((vv) => vv)
        .forEach((vv) => {
          vv.next = null;
          vv.last = null;
          vv.top = null;
          vv.bottom = null;
        });
    }
  }
}

export function buildLink(elements: any[]) {
  const result: any[] = [];
  let row = -1,
    column = 0,
    maxColumn = 0,
    top: number = 0;
  Array.from(elements).forEach((v, i, array) => {
    const vTop = getElementTop(v);
    if (Math.abs(top - vTop) > 5) {
      row++;
      maxColumn = Math.max(column, maxColumn);
      column = 0;
      top = vTop;
    }
    const topA = row - 1 < 0 ? null : result[column + maxColumn * (row - 1)];
    if (topA) {
      topA.bottom = v;
    }
    const current = { value: v, next: array[i + 1], last: array[i - 1], row, column, top: topA?.value };
    result.push(current);
    column++;
  });
  return result;
}

export function getElementLeft(element) {
  var actualLeft = element.offsetLeft;
  var current = element.offsetParent;
  while (current !== null) {
    actualLeft += current.offsetLeft + current.clientLeft;
    current = current.offsetParent;
  }
  return actualLeft;
}

export function getElementTop(element) {
  var actualTop = element.offsetTop;
  var current = element.offsetParent;
  while (current !== null) {
    actualTop += current.offsetTop + current.clientTop;
    current = current.offsetParent;
  }
  return actualTop;
}
