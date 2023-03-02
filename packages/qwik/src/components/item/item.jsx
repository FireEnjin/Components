Error: SyntaxError: '}' expected. (1:207)
> 1 | import{Fragment,Slot,component$,h,useClientEffect$}from"@builder.io/qwik";export const Item=component$((props)=>{useClientEffect$(()=>{// On Load});return (<span><Slot></Slot></span>)});export default Item;
    |                                                                                                                                                                                                               ^
========================================================================
import{Fragment,Slot,component$,h,useClientEffect$}from"@builder.io/qwik";export const Item=component$((props)=>{useClientEffect$(()=>{// On Load});return (<span><Slot></Slot></span>)});export default Item;

========================================================================
    at File.toString (C:\Users\bobby\Desktop\apps\@fireenjin\v2\Components\node_modules\@builder.io\mitosis\dist\src\generators\qwik\src-generator.js:90:23)
    at C:\Users\bobby\Desktop\apps\@fireenjin\v2\Components\node_modules\@builder.io\mitosis\dist\src\generators\qwik\component-generator.js:87:67
    at C:\Users\bobby\Desktop\apps\@fireenjin\v2\Components\node_modules\@builder.io\mitosis-cli\dist\build\build.js:396:158
    at step (C:\Users\bobby\Desktop\apps\@fireenjin\v2\Components\node_modules\@builder.io\mitosis-cli\dist\build\build.js:44:23)
    at Object.next (C:\Users\bobby\Desktop\apps\@fireenjin\v2\Components\node_modules\@builder.io\mitosis-cli\dist\build\build.js:25:53)
    at fulfilled (C:\Users\bobby\Desktop\apps\@fireenjin\v2\Components\node_modules\@builder.io\mitosis-cli\dist\build\build.js:16:58)