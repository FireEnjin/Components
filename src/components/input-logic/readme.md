# fireenjin-logic



<!-- Auto Generated Below -->


## Properties

| Property                 | Attribute                  | Description | Type                                 | Default                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| ------------------------ | -------------------------- | ----------- | ------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `allowAdding`            | `allow-adding`             |             | `boolean`                            | `false`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| `joinBy`                 | `join-by`                  |             | `"and" \| "or"`                      | `null`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| `label`                  | `label`                    |             | `string`                             | `"Statements"`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| `name`                   | `name`                     |             | `string`                             | `"logic"`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| `operations`             | --                         |             | `{ [key: string]: any; }`            | `{     var: { var: "" },     missing: { missing: ["", ""] },     missing_some: { missing_some: ["", [""]] },     if: { if: ["", true, false] },     "==": { "==": ["", ""] },     "===": { "===": ["", ""] },     "!=": { "!=": ["", ""] },     "!==": { "!==": ["", ""] },     "!": { "!": ["", ""] },     "!!": { "!!": ["", ""] },     or: { or: [] },     and: { and: [] },     ">": { ">": [1, 0] },     ">=": { ">=": [1, 0] },     "<": { "<": [0, 1] },     "<=": { "<=": [0, 1] },     min: { min: [0, 1] },     max: { max: [0, 1] },     "+": { "+": [0, 1] },     "-": { "-": [0, 1] },     "*": { "*": [0, 1] },     "/": { "/": [0, 1] },     "%": { "%": [0, 1] },     map: { map: [{ var: "" }, {}] },     filter: { filter: [{ var: "" }, {}] },     reduce: {       reduce: [         { var: "" },         { "+": [{ var: "current" }, { var: "accumulator" }] },         0,       ],     },     all: { all: [[1, 2, 3], { ">": [{ var: "" }, 0] }] },     some: { some: [[-1, 0, 1], { ">": [{ var: "" }, 0] }] },     none: { none: [[-3, -2, -1], { ">": [{ var: "" }, 0] }] },     merge: {       merge: [         [1, 2],         [3, 4],       ],     },     in: { in: ["", [""]] },     cat: { cat: ["", ""] },     substr: { substr: ["", 0] },     log: { log: "" },   }` |
| `outputObject`           | `output-object`            |             | `boolean`                            | `false`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| `placeholder`            | `placeholder`              |             | `string`                             | `"No statements added yet"`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| `selectedOperator`       | `selected-operator`        |             | `string`                             | `"=="`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| `selectedType`           | `selected-type`            |             | `"number" \| "string" \| "variable"` | `undefined`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| `showCode`               | `show-code`                |             | `boolean`                            | `false`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| `value`                  | `value`                    |             | `any`                                | `undefined`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| `variablePopoverOptions` | `variable-popover-options` |             | `any`                                | `{     header: "Select Variable",     cssClass: "variable-options",   }`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| `variables`              | --                         |             | `VariableField[]`                    | `[]`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |


## Methods

### `addStatment(statement: any) => Promise<void>`



#### Parameters

| Name        | Type  | Description |
| ----------- | ----- | ----------- |
| `statement` | `any` |             |

#### Returns

Type: `Promise<void>`



### `removeStatement(index: number) => Promise<void>`



#### Parameters

| Name    | Type     | Description |
| ------- | -------- | ----------- |
| `index` | `number` |             |

#### Returns

Type: `Promise<void>`



### `toggleManualEdit() => Promise<void>`



#### Returns

Type: `Promise<void>`




## Dependencies

### Depends on

- ion-item-divider
- ion-buttons
- ion-button
- ion-icon
- ion-label
- ion-chip
- ion-select
- ion-select-option
- ion-item
- [fireenjin-chip-bar](../chip-bar)
- ion-grid
- ion-row
- ion-col
- ion-popover
- ion-content
- ion-list
- ion-input
- [fireenjin-select](../select)

### Graph
```mermaid
graph TD;
  fireenjin-input-logic --> ion-item-divider
  fireenjin-input-logic --> ion-buttons
  fireenjin-input-logic --> ion-button
  fireenjin-input-logic --> ion-icon
  fireenjin-input-logic --> ion-label
  fireenjin-input-logic --> ion-chip
  fireenjin-input-logic --> ion-select
  fireenjin-input-logic --> ion-select-option
  fireenjin-input-logic --> ion-item
  fireenjin-input-logic --> fireenjin-chip-bar
  fireenjin-input-logic --> ion-grid
  fireenjin-input-logic --> ion-row
  fireenjin-input-logic --> ion-col
  fireenjin-input-logic --> ion-popover
  fireenjin-input-logic --> ion-content
  fireenjin-input-logic --> ion-list
  fireenjin-input-logic --> ion-input
  fireenjin-input-logic --> fireenjin-select
  ion-button --> ion-ripple-effect
  ion-chip --> ion-ripple-effect
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
  ion-item --> ion-icon
  ion-item --> ion-ripple-effect
  ion-popover --> ion-backdrop
  ion-action-sheet --> ion-backdrop
  ion-action-sheet --> ion-icon
  ion-action-sheet --> ion-ripple-effect
  ion-alert --> ion-ripple-effect
  ion-alert --> ion-backdrop
  ion-input --> ion-icon
  fireenjin-select --> ion-label
  fireenjin-select --> ion-item
  fireenjin-select --> ion-popover
  fireenjin-select --> ion-content
  fireenjin-select --> ion-list
  fireenjin-select --> ion-item-divider
  fireenjin-select --> ion-select
  fireenjin-select --> ion-select-option
  fireenjin-select --> ion-icon
  style fireenjin-input-logic fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
