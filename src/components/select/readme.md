# fireenjin-select



<!-- Auto Generated Below -->


## Properties

| Property           | Attribute           | Description                                                                                                                                                                                                                                                                                                                                               | Type                                                                                        | Default                     |
| ------------------ | ------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- | --------------------------- |
| `cancelText`       | `cancel-text`       | The text to display on the cancel button.                                                                                                                                                                                                                                                                                                                 | `string`                                                                                    | `"Dismiss"`                 |
| `compareWith`      | `compare-with`      | A property name or function used to compare object values                                                                                                                                                                                                                                                                                                 | `((currentValue: any, compareValue: any) => boolean) \| string`                             | `undefined`                 |
| `dataPropsMap`     | `data-props-map`    |                                                                                                                                                                                                                                                                                                                                                           | `any`                                                                                       | `undefined`                 |
| `disabled`         | `disabled`          | If `true`, the user cannot interact with the select.                                                                                                                                                                                                                                                                                                      | `boolean`                                                                                   | `false`                     |
| `endpoint`         | `endpoint`          |                                                                                                                                                                                                                                                                                                                                                           | `string`                                                                                    | `undefined`                 |
| `header`           | `header`            |                                                                                                                                                                                                                                                                                                                                                           | `string`                                                                                    | `undefined`                 |
| `interface`        | `interface`         | The interface the select should use: `action-sheet`, `popover` or `alert`.                                                                                                                                                                                                                                                                                | `"action-sheet" \| "alert" \| "custom" \| "popover" \| "select"`                            | `undefined`                 |
| `interfaceOptions` | `interface-options` | Any additional options that the `alert`, `action-sheet` or `popover` interface can take. See the [ion-alert docs](../alert), the [ion-action-sheet docs](../action-sheet) and the [ion-popover docs](../popover) for the create options for each interface.  Note: `interfaceOptions` will not override `inputs` or `buttons` with the `alert` interface. | `any`                                                                                       | `{}`                        |
| `label`            | `label`             |                                                                                                                                                                                                                                                                                                                                                           | `string`                                                                                    | `undefined`                 |
| `labelPosition`    | `label-position`    |                                                                                                                                                                                                                                                                                                                                                           | `"fixed" \| "floating" \| "stacked"`                                                        | `undefined`                 |
| `limit`            | `limit`             |                                                                                                                                                                                                                                                                                                                                                           | `number`                                                                                    | `15`                        |
| `lines`            | `lines`             |                                                                                                                                                                                                                                                                                                                                                           | `"full" \| "inset" \| "none"`                                                               | `undefined`                 |
| `message`          | `message`           |                                                                                                                                                                                                                                                                                                                                                           | `string`                                                                                    | `undefined`                 |
| `multiple`         | `multiple`          | If `true`, the select can accept multiple values.                                                                                                                                                                                                                                                                                                         | `boolean`                                                                                   | `false`                     |
| `name`             | `name`              | The name of the control, which is submitted with the form data.                                                                                                                                                                                                                                                                                           | `string`                                                                                    | `undefined`                 |
| `okText`           | `ok-text`           | The text to display on the ok button.                                                                                                                                                                                                                                                                                                                     | `string`                                                                                    | `"Okay"`                    |
| `optionEl`         | --                  |                                                                                                                                                                                                                                                                                                                                                           | `(result: any) => any`                                                                      | `undefined`                 |
| `options`          | --                  |                                                                                                                                                                                                                                                                                                                                                           | `{ [key: string]: any; label?: string; value?: any; disabled?: boolean; payload?: any; }[]` | `[]`                        |
| `orderBy`          | `order-by`          |                                                                                                                                                                                                                                                                                                                                                           | `string`                                                                                    | `undefined`                 |
| `params`           | `params`            |                                                                                                                                                                                                                                                                                                                                                           | `any`                                                                                       | `undefined`                 |
| `pattern`          | `pattern`           |                                                                                                                                                                                                                                                                                                                                                           | `any`                                                                                       | `undefined`                 |
| `placeholder`      | `placeholder`       | The text to display when the select is empty.                                                                                                                                                                                                                                                                                                             | `string`                                                                                    | `undefined`                 |
| `query`            | `query`             |                                                                                                                                                                                                                                                                                                                                                           | `string`                                                                                    | `undefined`                 |
| `required`         | `required`          |                                                                                                                                                                                                                                                                                                                                                           | `boolean`                                                                                   | `false`                     |
| `resultsKey`       | `results-key`       |                                                                                                                                                                                                                                                                                                                                                           | `string`                                                                                    | `"results"`                 |
| `selectedOptionEl` | --                  |                                                                                                                                                                                                                                                                                                                                                           | `(result: any) => any`                                                                      | `undefined`                 |
| `selectedText`     | `selected-text`     | The text to display instead of the selected option's value.                                                                                                                                                                                                                                                                                               | `string`                                                                                    | `undefined`                 |
| `subHeader`        | `sub-header`        |                                                                                                                                                                                                                                                                                                                                                           | `string`                                                                                    | `undefined`                 |
| `trigger`          | `trigger`           |                                                                                                                                                                                                                                                                                                                                                           | `string`                                                                                    | `"fireenjin-custom-select"` |
| `value`            | `value`             | the value of the select.                                                                                                                                                                                                                                                                                                                                  | `any`                                                                                       | `undefined`                 |


## Events

| Event            | Description | Type                                                     |
| ---------------- | ----------- | -------------------------------------------------------- |
| `fireenjinFetch` |             | `CustomEvent<FireEnjinFetchEvent>`                       |
| `ionChange`      |             | `CustomEvent<{ event: any; name: string; value: any; }>` |


## Dependencies

### Used by

 - [fireenjin-flow](../flow)
 - [fireenjin-input-logic](../input-logic)
 - [fireenjin-input-path](../input-path)
 - [fireenjin-table](../table)

### Depends on

- ion-label
- ion-item
- ion-popover
- ion-content
- ion-list
- ion-item-divider
- ion-select
- ion-select-option
- ion-icon

### Graph
```mermaid
graph TD;
  fireenjin-select --> ion-label
  fireenjin-select --> ion-item
  fireenjin-select --> ion-popover
  fireenjin-select --> ion-content
  fireenjin-select --> ion-list
  fireenjin-select --> ion-item-divider
  fireenjin-select --> ion-select
  fireenjin-select --> ion-select-option
  fireenjin-select --> ion-icon
  ion-item --> ion-icon
  ion-item --> ion-ripple-effect
  ion-item --> ion-note
  ion-popover --> ion-backdrop
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
  ion-action-sheet --> ion-backdrop
  ion-action-sheet --> ion-icon
  ion-action-sheet --> ion-ripple-effect
  ion-alert --> ion-ripple-effect
  ion-alert --> ion-backdrop
  fireenjin-flow --> fireenjin-select
  fireenjin-input-logic --> fireenjin-select
  fireenjin-input-path --> fireenjin-select
  fireenjin-table --> fireenjin-select
  style fireenjin-select fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
