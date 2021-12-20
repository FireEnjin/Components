# fireenjin-input-state

<!-- Auto Generated Below -->


## Properties

| Property      | Attribute     | Description | Type     | Default     |
| ------------- | ------------- | ----------- | -------- | ----------- |
| `name`        | `name`        |             | `string` | `undefined` |
| `placeholder` | `placeholder` |             | `string` | `undefined` |
| `value`       | `value`       |             | `string` | `undefined` |


## Dependencies

### Used by

 - [fireenjin-input-address](../input-address)

### Depends on

- ion-select
- ion-select-option

### Graph
```mermaid
graph TD;
  fireenjin-input-state --> ion-select
  fireenjin-input-state --> ion-select-option
  ion-select --> ion-select-popover
  ion-select-popover --> ion-item
  ion-select-popover --> ion-checkbox
  ion-select-popover --> ion-label
  ion-select-popover --> ion-radio-group
  ion-select-popover --> ion-radio
  ion-select-popover --> ion-list
  ion-select-popover --> ion-list-header
  ion-item --> ion-icon
  ion-item --> ion-ripple-effect
  ion-item --> ion-note
  fireenjin-input-address --> fireenjin-input-state
  style fireenjin-input-state fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
