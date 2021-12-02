export default class KeyFocus {
  elements: any[];
  useCapture: boolean;
  constructor(elements: any[], useCapture: boolean = true) {
    if (!elements || !elements.length) {
      throw new Error('Elements must be not null or undefined');
    }
    this.elements = buildLink(elements);
    this.useCapture = useCapture;
  }

  bindKey(beforeCb?: (e?: KeyboardEvent, ele?: any) => any, afterCb?: (e?: KeyboardEvent, ele?: any) => any) {
    this.elements.forEach((v, i, a) => {
      v.value.addEventListener(
        'keydown',
        (keyEvent: KeyboardEvent) => {
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
        },
        true,
      );
    });
  }

  private getFocus(next: any) {
    if (!next) return;
    if (next.focus) next.focus();
    if (next.select) next.select();
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
