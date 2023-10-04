# fireenjin-popover-filter



<!-- Auto Generated Below -->


## Properties

| Property       | Attribute       | Description | Type                                                                                                                                                                                                                                                                                                                                                                                                                  | Default     |
| -------------- | --------------- | ----------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| `beforeChange` | --              |             | `(value: any, options?: { name: string; multiple: boolean; }) => any`                                                                                                                                                                                                                                                                                                                                                 | `undefined` |
| `beforeSubmit` | --              |             | `(data: any, value?: string[]) => any`                                                                                                                                                                                                                                                                                                                                                                                | `undefined` |
| `enableLoader` | `enable-loader` |             | `boolean`                                                                                                                                                                                                                                                                                                                                                                                                             | `false`     |
| `hideControls` | `hide-controls` |             | `boolean`                                                                                                                                                                                                                                                                                                                                                                                                             | `false`     |
| `icon`         | `icon`          |             | `string`                                                                                                                                                                                                                                                                                                                                                                                                              | `undefined` |
| `label`        | `label`         |             | `string`                                                                                                                                                                                                                                                                                                                                                                                                              | `"Filter"`  |
| `multiple`     | `multiple`      |             | `boolean`                                                                                                                                                                                                                                                                                                                                                                                                             | `false`     |
| `name`         | `name`          |             | `string`                                                                                                                                                                                                                                                                                                                                                                                                              | `"filter"`  |
| `options`      | --              |             | `{ name?: string; image?: string; label?: string; color?: Color; checked?: boolean; icon?: string; value?: string; header?: string; subHeader?: string; message?: string; optionEl?: (result: any) => HTMLIonSelectOptionElement; placeholder?: string; endpoint?: string; query?: string; limit?: number; orderBy?: string; dataPropsMap?: string; params?: any; options?: { label: string; value: string; }[]; }[]` | `undefined` |
| `submitButton` | `submit-button` |             | `string`                                                                                                                                                                                                                                                                                                                                                                                                              | `"Filter"`  |
| `value`        | `value`         |             | `any`                                                                                                                                                                                                                                                                                                                                                                                                                 | `undefined` |


## Dependencies

### Depends on

- ion-content
- [fireenjin-form](../form)
- ion-list
- [fireenjin-list-header](../list-header)
- ion-item
- ion-checkbox
- ion-label
- ion-icon
- [fireenjin-avatar](../avatar)

### Graph
```mermaid
graph TD;
  fireenjin-popover-filter --> ion-content
  fireenjin-popover-filter --> fireenjin-form
  fireenjin-popover-filter --> ion-list
  fireenjin-popover-filter --> fireenjin-list-header
  fireenjin-popover-filter --> ion-item
  fireenjin-popover-filter --> ion-checkbox
  fireenjin-popover-filter --> ion-label
  fireenjin-popover-filter --> ion-icon
  fireenjin-popover-filter --> fireenjin-avatar
  fireenjin-form --> ion-grid
  fireenjin-form --> ion-row
  fireenjin-form --> ion-col
  fireenjin-form --> ion-button
  ion-button --> ion-ripple-effect
  fireenjin-list-header --> ion-item-divider
  fireenjin-list-header --> ion-label
  fireenjin-list-header --> ion-icon
  fireenjin-list-header --> fireenjin-avatar
  ion-item --> ion-icon
  ion-item --> ion-ripple-effect
  ion-item --> ion-note
  style fireenjin-popover-filter fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
