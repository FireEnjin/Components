# fireenjin-input-amount

<!-- Auto Generated Below -->


## Properties

| Property        | Attribute        | Description | Type                                            | Default     |
| --------------- | ---------------- | ----------- | ----------------------------------------------- | ----------- |
| `autofocus`     | `autofocus`      |             | `boolean`                                       | `undefined` |
| `decimal`       | `decimal`        |             | `boolean`                                       | `undefined` |
| `disabled`      | `disabled`       |             | `boolean`                                       | `undefined` |
| `label`         | `label`          |             | `string`                                        | `undefined` |
| `labelPosition` | `label-position` |             | `"fixed" \| "floating" \| "stacked"`            | `undefined` |
| `lines`         | `lines`          |             | `"full" \| "inset" \| "none"`                   | `undefined` |
| `max`           | `max`            |             | `string`                                        | `undefined` |
| `min`           | `min`            |             | `string`                                        | `undefined` |
| `name`          | `name`           |             | `string`                                        | `undefined` |
| `placeholder`   | `placeholder`    |             | `string`                                        | `undefined` |
| `presets`       | --               |             | `(string \| { label?: string; value: any; })[]` | `undefined` |
| `required`      | `required`       |             | `boolean`                                       | `false`     |
| `step`          | `step`           |             | `string`                                        | `"0.01"`    |
| `value`         | `value`          |             | `any`                                           | `undefined` |


## Events

| Event       | Description | Type               |
| ----------- | ----------- | ------------------ |
| `ionChange` |             | `CustomEvent<any>` |
| `ionInput`  |             | `CustomEvent<any>` |


## Methods

### `checkValidity(options?: { setValidationClass?: boolean; validationClassOptions?: { ignoreInvalid?: boolean; }; }) => Promise<boolean>`



#### Parameters

| Name      | Type                                                                                       | Description |
| --------- | ------------------------------------------------------------------------------------------ | ----------- |
| `options` | `{ setValidationClass?: boolean; validationClassOptions?: { ignoreInvalid?: boolean; }; }` |             |

#### Returns

Type: `Promise<boolean>`



### `clear() => Promise<void>`



#### Returns

Type: `Promise<void>`



### `reportValidity() => Promise<boolean>`



#### Returns

Type: `Promise<boolean>`




## Dependencies

### Depends on

- ion-item
- ion-icon
- ion-label
- ion-input

### Graph
```mermaid
graph TD;
  fireenjin-input-amount --> ion-item
  fireenjin-input-amount --> ion-icon
  fireenjin-input-amount --> ion-label
  fireenjin-input-amount --> ion-input
  ion-item --> ion-icon
  ion-item --> ion-ripple-effect
  ion-input --> ion-icon
  style fireenjin-input-amount fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
