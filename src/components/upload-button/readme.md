# fireenjin-upload-button



<!-- Auto Generated Below -->


## Properties

| Property         | Attribute         | Description | Type                                                                                                                                             | Default          |
| ---------------- | ----------------- | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------- |
| `accept`         | `accept`          |             | `string`                                                                                                                                         | `undefined`      |
| `autoSubmit`     | `auto-submit`     |             | `boolean`                                                                                                                                        | `false`          |
| `color`          | `color`           |             | `"danger" \| "dark" \| "light" \| "medium" \| "primary" \| "secondary" \| "success" \| "tertiary" \| "warning" \| string & Record<never, never>` | `"primary"`      |
| `disabled`       | `disabled`        |             | `boolean`                                                                                                                                        | `false`          |
| `documentId`     | `document-id`     |             | `string`                                                                                                                                         | `undefined`      |
| `endpoint`       | `endpoint`        |             | `string`                                                                                                                                         | `"upload"`       |
| `expand`         | `expand`          |             | `"block" \| "full"`                                                                                                                              | `"block"`        |
| `fileName`       | `file-name`       |             | `string`                                                                                                                                         | `undefined`      |
| `fill`           | `fill`            |             | `"clear" \| "default" \| "outline" \| "solid"`                                                                                                   | `"outline"`      |
| `iconEnd`        | `icon-end`        |             | `string`                                                                                                                                         | `"cloud-upload"` |
| `iconStart`      | `icon-start`      |             | `string`                                                                                                                                         | `undefined`      |
| `label`          | `label`           |             | `string`                                                                                                                                         | `undefined`      |
| `multiple`       | `multiple`        |             | `boolean`                                                                                                                                        | `false`          |
| `name`           | `name`            |             | `string`                                                                                                                                         | `"file"`         |
| `path`           | `path`            |             | `string`                                                                                                                                         | `undefined`      |
| `placeholder`    | `placeholder`     |             | `string`                                                                                                                                         | `undefined`      |
| `required`       | `required`        |             | `boolean`                                                                                                                                        | `false`          |
| `shape`          | `shape`           |             | `"round"`                                                                                                                                        | `"round"`        |
| `showClear`      | `show-clear`      |             | `boolean`                                                                                                                                        | `false`          |
| `showFileName`   | `show-file-name`  |             | `boolean`                                                                                                                                        | `false`          |
| `showLink`       | `show-link`       |             | `boolean`                                                                                                                                        | `false`          |
| `size`           | `size`            |             | `"default" \| "large" \| "small"`                                                                                                                | `undefined`      |
| `submitEndpoint` | `submit-endpoint` |             | `string`                                                                                                                                         | `undefined`      |
| `value`          | `value`           |             | `any`                                                                                                                                            | `undefined`      |


## Events

| Event             | Description | Type                                |
| ----------------- | ----------- | ----------------------------------- |
| `fireenjinSubmit` |             | `CustomEvent<FireEnjinSubmitEvent>` |
| `fireenjinUpload` |             | `CustomEvent<FireEnjinUploadEvent>` |
| `ionChange`       |             | `CustomEvent<any>`                  |


## Methods

### `clear() => Promise<void>`



#### Returns

Type: `Promise<void>`




## Dependencies

### Depends on

- ion-button
- ion-icon
- ion-label
- ion-spinner
- ion-buttons

### Graph
```mermaid
graph TD;
  fireenjin-upload-button --> ion-button
  fireenjin-upload-button --> ion-icon
  fireenjin-upload-button --> ion-label
  fireenjin-upload-button --> ion-spinner
  fireenjin-upload-button --> ion-buttons
  ion-button --> ion-ripple-effect
  style fireenjin-upload-button fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
