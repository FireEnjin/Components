# fireenjin-radios

<!-- Auto Generated Below -->


## Properties

| Property              | Attribute               | Description | Type                                 | Default     |
| --------------------- | ----------------------- | ----------- | ------------------------------------ | ----------- |
| `allowEmptySelection` | `allow-empty-selection` |             | `boolean`                            | `false`     |
| `color`               | `color`                 |             | `string`                             | `undefined` |
| `dataPropsMap`        | `data-props-map`        |             | `any`                                | `undefined` |
| `disabled`            | `disabled`              |             | `boolean`                            | `false`     |
| `endpoint`            | `endpoint`              |             | `string`                             | `undefined` |
| `label`               | `label`                 |             | `string`                             | `undefined` |
| `labelPosition`       | `label-position`        |             | `"fixed" \| "floating" \| "stacked"` | `undefined` |
| `limit`               | `limit`                 |             | `number`                             | `15`        |
| `lines`               | `lines`                 |             | `"full" \| "inset" \| "none"`        | `"none"`    |
| `mode`                | `mode`                  |             | `"ios" \| "md"`                      | `undefined` |
| `name`                | `name`                  |             | `string`                             | `undefined` |
| `optionEl`            | --                      |             | `(result: any) => any`               | `undefined` |
| `options`             | --                      |             | `FieldOption[]`                      | `undefined` |
| `orderBy`             | `order-by`              |             | `string`                             | `undefined` |
| `params`              | `params`                |             | `any`                                | `undefined` |
| `query`               | `query`                 |             | `string`                             | `undefined` |
| `radioSlot`           | `radio-slot`            |             | `string`                             | `"start"`   |
| `required`            | `required`              |             | `any`                                | `undefined` |
| `resultsKey`          | `results-key`           |             | `string`                             | `undefined` |
| `value`               | `value`                 |             | `any`                                | `undefined` |


## Events

| Event            | Description | Type                               |
| ---------------- | ----------- | ---------------------------------- |
| `fireenjinFetch` |             | `CustomEvent<FireEnjinFetchEvent>` |


## Dependencies

### Used by

 - [fireenjin-flow](../flow)

### Depends on

- ion-list
- ion-radio-group
- ion-list-header
- ion-item
- ion-label
- ion-radio

### Graph
```mermaid
graph TD;
  fireenjin-radios --> ion-list
  fireenjin-radios --> ion-radio-group
  fireenjin-radios --> ion-list-header
  fireenjin-radios --> ion-item
  fireenjin-radios --> ion-label
  fireenjin-radios --> ion-radio
  ion-item --> ion-icon
  ion-item --> ion-ripple-effect
  ion-item --> ion-note
  fireenjin-flow --> fireenjin-radios
  style fireenjin-radios fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
