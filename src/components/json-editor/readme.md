# fireenjin-json-viewer



<!-- Auto Generated Below -->


## Properties

| Property                  | Attribute                   | Description | Type               | Default     |
| ------------------------- | --------------------------- | ----------- | ------------------ | ----------- |
| `escapeControlCharacters` | `escape-control-characters` |             | `boolean`          | `false`     |
| `escapeUnicodeCharacters` | `escape-unicode-characters` |             | `boolean`          | `false`     |
| `indentation`             | `indentation`               |             | `number \| string` | `4`         |
| `mainMenuBar`             | `main-menu-bar`             |             | `boolean`          | `true`      |
| `mode`                    | `mode`                      |             | `"text" \| "tree"` | `"tree"`    |
| `name`                    | `name`                      |             | `string`           | `"json"`    |
| `navigationBar`           | `navigation-bar`            |             | `boolean`          | `true`      |
| `options`                 | `options`                   |             | `any`              | `{}`        |
| `readOnly`                | `read-only`                 |             | `boolean`          | `false`     |
| `statusBar`               | `status-bar`                |             | `boolean`          | `true`      |
| `tabSize`                 | `tab-size`                  |             | `number`           | `4`         |
| `validator`               | `validator`                 |             | `any`              | `undefined` |
| `value`                   | `value`                     |             | `any`              | `undefined` |


## Events

| Event       | Description | Type               |
| ----------- | ----------- | ------------------ |
| `ionChange` |             | `CustomEvent<any>` |
| `ionInput`  |             | `CustomEvent<any>` |


## Methods

### `destroy() => Promise<any>`



#### Returns

Type: `Promise<any>`



### `expand(callback: any) => Promise<any>`



#### Parameters

| Name       | Type  | Description |
| ---------- | ----- | ----------- |
| `callback` | `any` |             |

#### Returns

Type: `Promise<any>`



### `getEditor() => Promise<JSONEditor>`



#### Returns

Type: `Promise<JSONEditor>`



### `refresh() => Promise<any>`



#### Returns

Type: `Promise<any>`



### `scrollToPath(path: any) => Promise<any>`



#### Parameters

| Name   | Type  | Description |
| ------ | ----- | ----------- |
| `path` | `any` |             |

#### Returns

Type: `Promise<any>`



### `set(content: Content) => Promise<void>`



#### Parameters

| Name      | Type      | Description |
| --------- | --------- | ----------- |
| `content` | `Content` |             |

#### Returns

Type: `Promise<void>`



### `setFocus() => Promise<any>`



#### Returns

Type: `Promise<any>`



### `update(content: Content) => Promise<any>`



#### Parameters

| Name      | Type      | Description |
| --------- | --------- | ----------- |
| `content` | `Content` |             |

#### Returns

Type: `Promise<any>`



### `updateOptions(options: JSONEditorPropsOptional) => Promise<any>`



#### Parameters

| Name      | Type                      | Description |
| --------- | ------------------------- | ----------- |
| `options` | `JSONEditorPropsOptional` |             |

#### Returns

Type: `Promise<any>`



### `validate() => Promise<any>`



#### Returns

Type: `Promise<any>`




----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
