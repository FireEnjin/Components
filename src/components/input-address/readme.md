# fireenjin-input-address

<!-- Auto Generated Below -->


## Properties

| Property        | Attribute         | Description                              | Type                                 | Default     |
| --------------- | ----------------- | ---------------------------------------- | ------------------------------------ | ----------- |
| `disableToggle` | `disable-toggle`  | Disable manual/search toggle             | `boolean`                            | `false`     |
| `googleMapsKey` | `google-maps-key` | The Google Maps API Key                  | `string`                             | `undefined` |
| `iconLeft`      | `icon-left`       | The icon to show at the left             | `string`                             | `undefined` |
| `iconRight`     | `icon-right`      | The icon to show at the right            | `string`                             | `undefined` |
| `label`         | `label`           | The label of the input field             | `string`                             | `undefined` |
| `labelPosition` | `label-position`  | Label position to use for ion-item       | `"fixed" \| "floating" \| "stacked"` | `"stacked"` |
| `lines`         | `lines`           | Line style to use for ion-item           | `"full" \| "inset" \| "none"`        | `undefined` |
| `name`          | `name`            | The name attribute of the input          | `string`                             | `undefined` |
| `placeholder`   | `placeholder`     | The placeholder text for the input field | `string`                             | `undefined` |
| `required`      | `required`        | Whether the address input is required    | `boolean`                            | `false`     |
| `value`         | `value`           | The value of the input field             | `any`                                | `{}`        |


## Events

| Event                       | Description | Type                                      |
| --------------------------- | ----------- | ----------------------------------------- |
| `fireenjinAddressMode`      |             | `CustomEvent<any>`                        |
| `fireenjinTrigger`          |             | `CustomEvent<FireEnjinTriggerInput<any>>` |
| `fireenjinUpdateAutoHeight` |             | `CustomEvent<any>`                        |
| `ionInput`                  |             | `CustomEvent<any>`                        |


## Dependencies

### Depends on

- ion-item
- ion-icon
- ion-label
- ion-input
- ion-grid
- ion-row
- ion-col
- [fireenjin-input-state](../input-state)
- ion-buttons
- ion-button

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
  fireenjin-input-address --> ion-buttons
  fireenjin-input-address --> ion-button
  ion-item --> ion-icon
  ion-item --> ion-ripple-effect
  ion-input --> ion-icon
  fireenjin-input-state --> ion-select
  fireenjin-input-state --> ion-select-option
  ion-select --> ion-select-popover
  ion-select --> ion-popover
  ion-select --> ion-action-sheet
  ion-select --> ion-alert
  ion-select --> ion-icon
  ion-select-popover --> ion-item
  ion-select-popover --> ion-checkbox
  ion-select-popover --> ion-radio-group
  ion-select-popover --> ion-radio
  ion-select-popover --> ion-list
  ion-select-popover --> ion-list-header
  ion-select-popover --> ion-label
  ion-popover --> ion-backdrop
  ion-action-sheet --> ion-backdrop
  ion-action-sheet --> ion-icon
  ion-action-sheet --> ion-ripple-effect
  ion-alert --> ion-ripple-effect
  ion-alert --> ion-backdrop
  ion-button --> ion-ripple-effect
  style fireenjin-input-address fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
