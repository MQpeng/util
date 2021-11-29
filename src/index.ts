import { Test2 } from './index copy';

class Test {
  a: number;
  b: number;
  test2: Test2;
  constructor() {
    this.test2 = new Test2();
    console.log('🚀 ~ file: index.ts ~ line 8 ~ Test ~ b', this.b);
  }
}

export { Test };
