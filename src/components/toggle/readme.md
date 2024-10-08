# fireenjin-toggle



<!-- Auto Generated Below -->


## Properties

| Property            | Attribute              | Description                                          | Type                                                                                                                                             | Default     |
| ------------------- | ---------------------- | ---------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ | ----------- |
| `color`             | `color`                |                                                      | `"danger" \| "dark" \| "light" \| "medium" \| "primary" \| "secondary" \| "success" \| "tertiary" \| "warning" \| string & Record<never, never>` | `undefined` |
| `disabled`          | `disabled`             | If `true`, the user cannot interact with the select. | `boolean`                                                                                                                                        | `false`     |
| `enableOnOffLabels` | `enable-on-off-labels` |                                                      | `boolean`                                                                                                                                        | `undefined` |
| `label`             | `label`                |                                                      | `string`                                                                                                                                         | `undefined` |
| `labelPosition`     | `label-position`       |                                                      | `"fixed" \| "floating" \| "stacked"`                                                                                                             | `undefined` |
| `lines`             | `lines`                |                                                      | `"full" \| "inset" \| "none"`                                                                                                                    | `undefined` |
| `name`              | `name`                 |                                                      | `string`                                                                                                                                         | `undefined` |
| `value`             | `value`                |                                                      | `boolean`                                                                                                                                        | `undefined` |


## Events

| Event       | Description | Type               |
| ----------- | ----------- | ------------------ |
| `ionChange` |             | `CustomEvent<any>` |


## Dependencies

### Used by

 - [fireenjin-table](../table)

### Depends on

- ion-item
- ion-label
- ion-toggle

### Graph
```mermaid
graph TD;
  fireenjin-toggle --> ion-item
  fireenjin-toggle --> ion-label
  fireenjin-toggle --> ion-toggle
  ion-item --> ion-icon
  ion-item --> ion-ripple-effect
  ion-toggle --> ion-icon
  fireenjin-table --> fireenjin-toggle
  style fireenjin-toggle fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
