export class KeyFocus {
  elements: any[];
  constructor(elements: any[]) {
    if (!elements || !elements.length) {
      throw new Error('Elements must be not null or undefined');
    }
    this.elements = buildLink(elements);
  }

  bindKey(cb?: (e?: KeyboardEvent) => void) {
    this.elements.forEach((v, i, a) => {
      v.value.addEventListener('keydown', (keyEvent: any) => {
        if (cb) cb(keyEvent);
        switch (keyEvent.key) {
          case 'Enter':
          case 'ArrowRight':
            this.getFocus(v.next);
            break;
          case 'ArrowLeft':
            this.getFocus(v.last);
            break;
          case 'ArrowDown':
            this.getFocus(v.bottom);
            break;
          case 'ArrowUp':
            this.getFocus(v.top);
            break;
        }
      });
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
    if (Math.abs(top - v.offsetTop) > 5) {
      row++;
      maxColumn = Math.max(column, maxColumn);
      column = 0;
      top = v.offsetTop;
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
