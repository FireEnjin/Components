# fireenjin-input-address

<!-- Auto Generated Below -->


## Properties

| Property        | Attribute         | Description                              | Type                                 | Default     |
| --------------- | ----------------- | ---------------------------------------- | ------------------------------------ | ----------- |
| `googleMapsKey` | `google-maps-key` | The Google Maps API Key                  | `string`                             | `undefined` |
| `iconLeft`      | `icon-left`       |                                          | `string`                             | `undefined` |
| `iconRight`     | `icon-right`      |                                          | `string`                             | `undefined` |
| `label`         | `label`           | The label of the input field             | `string`                             | `undefined` |
| `labelPosition` | `label-position`  |                                          | `"fixed" \| "floating" \| "stacked"` | `undefined` |
| `lines`         | `lines`           |                                          | `"full" \| "inset" \| "none"`        | `undefined` |
| `name`          | `name`            | The name attribute of the input          | `string`                             | `undefined` |
| `placeholder`   | `placeholder`     | The placeholder text for the input field | `string`                             | `undefined` |
| `required`      | `required`        | Whether the address input is required    | `boolean`                            | `false`     |
| `value`         | `value`           | The value of the input field             | `any`                                | `{}`        |


## Events

| Event                       | Description | Type               |
| --------------------------- | ----------- | ------------------ |
| `fireenjinAddressMode`      |             | `CustomEvent<any>` |
| `fireenjinUpdateAutoHeight` |             | `CustomEvent<any>` |
| `ionInput`                  |             | `CustomEvent<any>` |


## Dependencies

### Used by

 - [fireenjin-flow](../flow)

### Depends on

- ion-item
- ion-icon
- ion-label
- ion-input
- ion-grid
- ion-row
- ion-col
- [fireenjin-input-state](../input-state)
- ion-button
- ion-buttons

### Graph
```mermaid
graph TD;
  fireenjin-input-address --> ion-item
  fireenjin-input-address --> ion-icon
  fireenjin-input-address --> ion-label
  fireenjin-input-address --> ion-input
  fireenjin-input-address --> ion-grid
  fireenjin-input-address --> ion-row
  fireenjin-input-address --> ion-col
  fireenjin-input-address --> fireenjin-input-state
  fireenjin-input-address --> ion-button
  fireenjin-input-address --> ion-buttons
  ion-item --> ion-icon
  ion-item --> ion-ripple-effect
  ion-item --> ion-note
  ion-input --> ion-icon
  fireenjin-input-state --> ion-select
  fireenjin-input-state --> ion-select-option
  ion-select --> ion-select-popover
  ion-select --> ion-popover
  ion-select --> ion-action-sheet
  ion-select --> ion-alert
  ion-select-popover --> ion-item
  ion-select-popover --> ion-checkbox
  ion-select-popover --> ion-label
  ion-select-popover --> ion-radio-group
  ion-select-popover --> ion-radio
  ion-select-popover --> ion-list
  ion-select-popover --> ion-list-header
  ion-popover --> ion-backdrop
  ion-action-sheet --> ion-backdrop
  ion-action-sheet --> ion-icon
  ion-action-sheet --> ion-ripple-effect
  ion-alert --> ion-ripple-effect
  ion-alert --> ion-backdrop
  ion-button --> ion-ripple-effect
  fireenjin-flow --> fireenjin-input-address
  style fireenjin-input-address fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
