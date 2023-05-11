# fireenjin-input-path



<!-- Auto Generated Below -->


## Properties

| Property        | Attribute        | Description | Type                                                                                                                                             | Default          |
| --------------- | ---------------- | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------- |
| `addColor`      | `add-color`      |             | `"danger" \| "dark" \| "light" \| "medium" \| "primary" \| "secondary" \| "success" \| "tertiary" \| "warning" \| string & Record<never, never>` | `"primary"`      |
| `addIcon`       | `add-icon`       |             | `string`                                                                                                                                         | `"add-circle"`   |
| `deleteColor`   | `delete-color`   |             | `"danger" \| "dark" \| "light" \| "medium" \| "primary" \| "secondary" \| "success" \| "tertiary" \| "warning" \| string & Record<never, never>` | `"danger"`       |
| `deleteIcon`    | `delete-icon`    |             | `string`                                                                                                                                         | `"close-circle"` |
| `disabled`      | `disabled`       |             | `boolean`                                                                                                                                        | `false`          |
| `label`         | `label`          |             | `string`                                                                                                                                         | `undefined`      |
| `labelPosition` | `label-position` |             | `"fixed" \| "floating" \| "stacked"`                                                                                                             | `undefined`      |
| `name`          | `name`           |             | `string`                                                                                                                                         | `"path"`         |
| `partOptions`   | --               |             | `any[]`                                                                                                                                          | `undefined`      |
| `typeOptions`   | --               |             | `any[]`                                                                                                                                          | `undefined`      |
| `value`         | `value`          |             | `any`                                                                                                                                            | `undefined`      |


## Methods

### `addPathChunk() => Promise<any>`



#### Returns

Type: `Promise<any>`



### `deletePathChunk(index: number) => Promise<any>`



#### Returns

Type: `Promise<any>`



### `toggleManualEdit() => Promise<void>`



#### Returns

Type: `Promise<void>`




## Dependencies

### Depends on

- ion-item
- ion-label
- ion-input
- [fireenjin-chip-bar](../chip-bar)
- ion-chip
- ion-button
- ion-icon
- [fireenjin-select](../select)

### Graph
```mermaid
graph TD;
  fireenjin-input-path --> ion-item
  fireenjin-input-path --> ion-label
  fireenjin-input-path --> ion-input
  fireenjin-input-path --> fireenjin-chip-bar
  fireenjin-input-path --> ion-chip
  fireenjin-input-path --> ion-button
  fireenjin-input-path --> ion-icon
  fireenjin-input-path --> fireenjin-select
  ion-item --> ion-icon
  ion-item --> ion-ripple-effect
  ion-item --> ion-note
  ion-input --> ion-icon
  ion-chip --> ion-ripple-effect
  ion-button --> ion-ripple-effect
  fireenjin-select --> ion-item
  fireenjin-select --> ion-label
  fireenjin-select --> ion-select
  fireenjin-select --> ion-select-option
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
  style fireenjin-input-path fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
