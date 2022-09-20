# fireenjin-select-tags



<!-- Auto Generated Below -->


## Properties

| Property         | Attribute         | Description | Type                                 | Default         |
| ---------------- | ----------------- | ----------- | ------------------------------------ | --------------- |
| `addIcon`        | `add-icon`        |             | `string`                             | `"add-circle"`  |
| `addPrompt`      | `add-prompt`      |             | `string`                             | `undefined`     |
| `allowAdding`    | `allow-adding`    |             | `"custom" \| boolean`                | `false`         |
| `dataPropsMap`   | `data-props-map`  |             | `any`                                | `undefined`     |
| `disableFetch`   | `disable-fetch`   |             | `boolean`                            | `false`         |
| `disabled`       | `disabled`        |             | `boolean`                            | `false`         |
| `duplicates`     | `duplicates`      |             | `boolean`                            | `false`         |
| `endpoint`       | `endpoint`        |             | `string`                             | `undefined`     |
| `fetchData`      | `fetch-data`      |             | `any`                                | `undefined`     |
| `label`          | `label`           |             | `any`                                | `undefined`     |
| `labelPosition`  | `label-position`  |             | `"fixed" \| "floating" \| "stacked"` | `"stacked"`     |
| `limit`          | `limit`           |             | `number`                             | `15`            |
| `lines`          | `lines`           |             | `"full" \| "inset" \| "none"`        | `undefined`     |
| `name`           | `name`            |             | `string`                             | `"tags"`        |
| `options`        | --                |             | `{ label: string; value: any; }[]`   | `[]`            |
| `orderBy`        | `order-by`        |             | `string`                             | `undefined`     |
| `orderDirection` | `order-direction` |             | `string`                             | `undefined`     |
| `page`           | `page`            |             | `number`                             | `0`             |
| `placeholder`    | `placeholder`     |             | `string`                             | `"Select Tags"` |
| `query`          | `query`           |             | `string`                             | `undefined`     |
| `required`       | `required`        |             | `boolean`                            | `false`         |
| `results`        | --                |             | `any[]`                              | `[]`            |
| `resultsKey`     | `results-key`     |             | `string`                             | `undefined`     |
| `value`          | `value`           |             | `any`                                | `undefined`     |


## Events

| Event              | Description | Type                                                     |
| ------------------ | ----------- | -------------------------------------------------------- |
| `fireenjinFetch`   |             | `CustomEvent<FireEnjinFetchEvent>`                       |
| `fireenjinTrigger` |             | `CustomEvent<FireEnjinTriggerInput>`                     |
| `ionChange`        |             | `CustomEvent<{ event: any; name: string; value: any; }>` |


## Methods

### `addResults(results?: any[]) => Promise<void>`



#### Returns

Type: `Promise<void>`



### `addTag(tag: string, event?: any) => Promise<void>`



#### Returns

Type: `Promise<void>`



### `addValue(value: any, event?: any) => Promise<void>`



#### Returns

Type: `Promise<void>`



### `clearParamData(key?: string) => Promise<{ query?: string; limit?: number; orderBy?: string; orderDirection?: "desc" | "asc"; whereEqual?: string; whereLessThan?: string; whereLessThanOrEqual?: string; whereGreaterThan?: string; whereGreaterThanOrEqual?: string; whereArrayContains?: string; whereArrayContainsAny?: string; whereIn?: string; next?: string; back?: string; }>`



#### Returns

Type: `Promise<{ query?: string; limit?: number; orderBy?: string; orderDirection?: "desc" | "asc"; whereEqual?: string; whereLessThan?: string; whereLessThanOrEqual?: string; whereGreaterThan?: string; whereGreaterThanOrEqual?: string; whereArrayContains?: string; whereArrayContainsAny?: string; whereIn?: string; next?: string; back?: string; }>`



### `clearResults() => Promise<void>`



#### Returns

Type: `Promise<void>`



### `getResults(options?: { page?: number; next?: boolean; limit?: number; paramData?: any; }) => Promise<void>`



#### Returns

Type: `Promise<void>`



### `removeValue(value: any, event?: any) => Promise<void>`



#### Returns

Type: `Promise<void>`



### `updateOptionsForValue() => Promise<void>`



#### Returns

Type: `Promise<void>`




## Dependencies

### Depends on

- ion-item
- ion-label
- ion-input
- [fireenjin-chip-bar](../chip-bar)
- ion-chip
- ion-icon

### Graph
```mermaid
graph TD;
  fireenjin-select-tags --> ion-item
  fireenjin-select-tags --> ion-label
  fireenjin-select-tags --> ion-input
  fireenjin-select-tags --> fireenjin-chip-bar
  fireenjin-select-tags --> ion-chip
  fireenjin-select-tags --> ion-icon
  ion-item --> ion-icon
  ion-item --> ion-ripple-effect
  ion-item --> ion-note
  ion-chip --> ion-ripple-effect
  style fireenjin-select-tags fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
