## KeyFocus

> Response direction key switch cursor
> Bind listener of keyboard for changing focus in the form component

![DEMO](https://raw.githubusercontent.com/MQpeng/util/enter-focus/assets/zq3Ah56A3C.gif)

## get start

```shell
npm install --save hotkey-focus
```

```javascript
// <script src="node_modules/keyfocus/lib/hotkey-focus.esm.js"></script>
import KeyFocus from 'hotkey-focus';
const ins = document.getElementById('form');
const keyFocus = new KeyFocus(ins.children);
```
