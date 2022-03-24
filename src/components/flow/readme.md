# fireenjin-flow



<!-- Auto Generated Below -->


## Properties

| Property        | Attribute        | Description                    | Type                | Default                |
| --------------- | ---------------- | ------------------------------ | ------------------- | ---------------------- |
| `endpoint`      | `endpoint`       |                                | `string`            | `undefined`            |
| `fields`        | --               |                                | `{ label: any; }[]` | `[]`                   |
| `pager`         | `pager`          |                                | `boolean`           | `false`                |
| `scrollbar`     | `scrollbar`      |                                | `boolean`           | `false`                |
| `showControls`  | `show-controls`  |                                | `boolean`           | `false`                |
| `slidesOptions` | `slides-options` | A list of options for SwiperJS | `any`               | `{ autoHeight: true }` |


## Dependencies

### Depends on

- [fireenjin-form](../form)
- ion-slides
- ion-slide

### Graph
```mermaid
graph TD;
  fireenjin-flow --> fireenjin-form
  fireenjin-flow --> ion-slides
  fireenjin-flow --> ion-slide
  fireenjin-form --> ion-grid
  fireenjin-form --> ion-row
  fireenjin-form --> ion-col
  fireenjin-form --> ion-button
  ion-button --> ion-ripple-effect
  style fireenjin-flow fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
