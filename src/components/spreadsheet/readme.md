# fireenjin-spreadsheet



<!-- Auto Generated Below -->


## Properties

| Property     | Attribute     | Description | Type                                                                                                                       | Default     |
| ------------ | ------------- | ----------- | -------------------------------------------------------------------------------------------------------------------------- | ----------- |
| `colHeaders` | `col-headers` |             | `((index: number) => string) \| boolean \| string[]`                                                                       | `true`      |
| `colWidths`  | `col-widths`  |             | `((index: number) => string \| number) \| (string \| number)[] \| number \| number[] \| string \| string[] \| undefined[]` | `undefined` |
| `columns`    | --            |             | `((index: number) => any) \| any[]`                                                                                        | `undefined` |
| `data`       | `data`        |             | `any`                                                                                                                      | `undefined` |
| `height`     | `height`      |             | `number`                                                                                                                   | `450`       |
| `options`    | `options`     |             | `any`                                                                                                                      | `undefined` |
| `rowHeaders` | `row-headers` |             | `((index: number) => string) \| boolean \| string[]`                                                                       | `true`      |


## Events

| Event              | Description | Type                                      |
| ------------------ | ----------- | ----------------------------------------- |
| `fireenjinTrigger` |             | `CustomEvent<FireEnjinTriggerInput<any>>` |


## Methods

### `getInstance() => Promise<any>`



#### Returns

Type: `Promise<any>`




----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
