# fireenjin-render-template

<!-- Auto Generated Below -->


## Properties

| Property     | Attribute     | Description | Type                                                  | Default                                                                                                                                                                                                                                                   |
| ------------ | ------------- | ----------- | ----------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `data`       | `data`        |             | `any`                                                 | `{}`                                                                                                                                                                                                                                                      |
| `helpers`    | --            |             | `{ [helperName: string]: any; }`                      | `{     formatUSD: (amount) => {       const formatter = new Intl.NumberFormat("en-US", {         style: "currency",         currency: "USD",         minimumFractionDigits: 2,       });        return formatter.format(amount ? amount : 0);     },   }` |
| `name`       | `name`        |             | `string`                                              | `undefined`                                                                                                                                                                                                                                               |
| `partials`   | --            |             | `{ [key: string]: any; id: string; html: string; }[]` | `[]`                                                                                                                                                                                                                                                      |
| `template`   | `template`    |             | `any`                                                 | `{}`                                                                                                                                                                                                                                                      |
| `templateId` | `template-id` |             | `string`                                              | `undefined`                                                                                                                                                                                                                                               |


## Events

| Event            | Description | Type                               |
| ---------------- | ----------- | ---------------------------------- |
| `fireenjinFetch` |             | `CustomEvent<FireEnjinFetchEvent>` |


## Methods

### `fetchData(input?: { templateId?: string; }) => Promise<void>`



#### Returns

Type: `Promise<void>`



### `renderTemplate() => Promise<void>`



#### Returns

Type: `Promise<void>`



### `setHelpers(helpers?: { [helperName: string]: any; }) => Promise<void>`



#### Returns

Type: `Promise<void>`



### `setPartials(partials?: any[]) => Promise<void>`



#### Returns

Type: `Promise<void>`



### `unsetPartials() => Promise<void>`



#### Returns

Type: `Promise<void>`




----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
