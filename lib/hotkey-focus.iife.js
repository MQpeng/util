var KeyFocus = (() => {
  var __defProp = Object.defineProperty;
  var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
  var __export = (target, all) => {
    __markAsModule(target);
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };

  // src/index.ts
  var src_exports = {};
  __export(src_exports, {
    buildLink: () => buildLink,
    default: () => KeyFocus
  });
  var KeyFocus = class {
    constructor(elements) {
      if (!elements || !elements.length) {
        throw new Error("Elements must be not null or undefined");
      }
      this.elements = buildLink(elements);
    }
    bindKey(cb) {
      this.elements.forEach((v, i, a) => {
        v.value.addEventListener("keydown", (keyEvent) => {
          if (cb)
            cb(keyEvent);
          switch (keyEvent.key) {
            case "Enter":
            case "ArrowRight":
              this.getFocus(v.next);
              break;
            case "ArrowLeft":
              this.getFocus(v.last);
              break;
            case "ArrowDown":
              this.getFocus(v.bottom);
              break;
            case "ArrowUp":
              this.getFocus(v.top);
              break;
          }
        });
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
      const current = { value: v, next: array[i + 1], last: array[i - 1], row, column, top: topA == null ? void 0 : topA.value };
      result.push(current);
      column++;
    });
    return result;
  }
  return src_exports;
})();
