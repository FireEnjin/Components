# fireenjin-map



<!-- Auto Generated Below -->


## Properties

| Property  | Attribute | Description                           | Type                                                                                        | Default     |
| --------- | --------- | ------------------------------------- | ------------------------------------------------------------------------------------------- | ----------- |
| `apiKey`  | `api-key` | The Google Maps API Key               | `string`                                                                                    | `undefined` |
| `markers` | --        | A list of markers to put onto the map | `{ position: { lat: number; lng: number; }; name: string; icon: string; payload?: any; }[]` | `[]`        |
| `options` | `options` | Google Maps options                   | `any`                                                                                       | `{}`        |
| `visible` | `visible` | Should the map be visible?            | `boolean`                                                                                   | `true`      |


## Events

| Event              | Description                         | Type                                                                                                                                                              |
| ------------------ | ----------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `fireenjinTrigger` | When a marker on the map is clicked | `CustomEvent<{ trigger: string; payload: { marker: any; location: { position: { lat: number; lng: number; }; name: string; icon: string; payload?: any; }; }; }>` |


## Methods

### `addMarker(location: { position: { lat: number; lng: number; }; name: string; icon: string; payload?: any; }) => Promise<any>`

Add a marker to the map

#### Returns

Type: `Promise<any>`



### `clearMarkers() => Promise<boolean>`

Clear the markers off of the map

#### Returns

Type: `Promise<boolean>`



### `setCenter(latLng: any) => Promise<any>`



#### Returns

Type: `Promise<any>`



### `setMarkers(markers?: { position: { lat: number; lng: number; }; name: string; icon: string; payload?: any; }[]) => Promise<{ position: { lat: number; lng: number; }; name: string; icon: string; payload?: any; }[]>`

Set the list of map markers

#### Returns

Type: `Promise<{ position: { lat: number; lng: number; }; name: string; icon: string; payload?: any; }[]>`



### `setZoom(level: number) => Promise<any>`



#### Returns

Type: `Promise<any>`




----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
