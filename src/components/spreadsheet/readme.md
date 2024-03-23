# fireenjin-spreadsheet



<!-- Auto Generated Below -->


## Properties

| Property     | Attribute     | Description | Type                                                                                                                       | Default     |
| ------------ | ------------- | ----------- | -------------------------------------------------------------------------------------------------------------------------- | ----------- |
| `colHeaders` | `col-headers` |             | `((index: number) => string) \| boolean \| string[]`                                                                       | `true`      |
| `colWidths`  | `col-widths`  |             | `((index: number) => string \| number) \| (string \| number)[] \| number \| number[] \| string \| string[] \| undefined[]` | `undefined` |
| `columns`    | --            |             | `((index: number) => ColumnSettings) \| ColumnSettings[]`                                                                  | `undefined` |
| `data`       | `data`        |             | `any`                                                                                                                      | `undefined` |
| `height`     | `height`      |             | `number`                                                                                                                   | `450`       |
| `options`    | --            |             | `GridSettings`                                                                                                             | `undefined` |
| `rowHeaders` | `row-headers` |             | `((index: number) => string) \| boolean \| string[]`                                                                       | `true`      |


## Events

| Event              | Description | Type                                      |
| ------------------ | ----------- | ----------------------------------------- |
| `fireenjinTrigger` |             | `CustomEvent<FireEnjinTriggerInput<any>>` |


## Methods

### `getInstance() => Promise<Handsontable>`



#### Returns

Type: `Promise<Handsontable>`




----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
