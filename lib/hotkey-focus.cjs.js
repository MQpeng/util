var __defProp = Object.defineProperty;
var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
var __export = (target, all) => {
  __markAsModule(target);
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// src/index.ts
__export(exports, {
  buildLink: () => buildLink,
  default: () => KeyFocus,
  getElementLeft: () => getElementLeft,
  getElementTop: () => getElementTop
});
var KeyFocus = class {
  constructor(elements, useCapture = true) {
    if (!elements || !elements.length) {
      throw new Error("Elements must be not null or undefined");
    }
    this.elements = buildLink(elements);
    this.useCapture = useCapture;
  }
  bindKey(beforeCb, afterCb) {
    this.elements.forEach((v, i, a) => {
      v.value.addEventListener("keydown", (keyEvent) => {
        let key = "", cbr;
        if (beforeCb) {
          cbr = beforeCb(keyEvent, v);
          if (cbr === false) {
            return;
          }
        }
        switch (keyEvent.key) {
          case "Enter":
          case "ArrowRight":
            key = "next";
            break;
          case "ArrowLeft":
            key = "last";
            break;
          case "ArrowDown":
            key = "bottom";
            break;
          case "ArrowUp":
            key = "top";
            break;
        }
        this.getFocus(cbr || v[key]);
        if (afterCb)
          afterCb(keyEvent, v);
      }, true);
    });
  }
  getFocus(next) {
    if (!next)
      return;
    if (next.focus)
      next.focus();
    if (next.select)
      next.select();
  }
};
function buildLink(elements) {
  const result = [];
  let row = -1, column = 0, maxColumn = 0, top = 0;
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
    const current = { value: v, next: array[i + 1], last: array[i - 1], row, column, top: topA == null ? void 0 : topA.value };
    result.push(current);
    column++;
  });
  return result;
}
function getElementLeft(element) {
  var actualLeft = element.offsetLeft;
  var current = element.offsetParent;
  while (current !== null) {
    actualLeft += current.offsetLeft + current.clientLeft;
    current = current.offsetParent;
  }
  return actualLeft;
}
function getElementTop(element) {
  var actualTop = element.offsetTop;
  var current = element.offsetParent;
  while (current !== null) {
    actualTop += current.offsetTop + current.clientTop;
    current = current.offsetParent;
  }
  return actualTop;
}
