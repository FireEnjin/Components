# fireenjin-map



<!-- Auto Generated Below -->


## Properties

| Property        | Attribute         | Description                           | Type                                                                                        | Default     |
| --------------- | ----------------- | ------------------------------------- | ------------------------------------------------------------------------------------------- | ----------- |
| `googleMapsKey` | `google-maps-key` | The Google Maps API Key               | `string`                                                                                    | `undefined` |
| `markers`       | --                | A list of markers to put onto the map | `{ position: { lat: number; lng: number; }; name: string; icon: string; payload?: any; }[]` | `[]`        |
| `options`       | `options`         | Google Maps options                   | `any`                                                                                       | `{}`        |
| `visible`       | `visible`         | Should the map be visible?            | `boolean`                                                                                   | `true`      |


## Events

| Event              | Description                         | Type                                                                                                                                                              |
| ------------------ | ----------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `fireenjinTrigger` | When a marker on the map is clicked | `CustomEvent<{ name: string; payload: { marker: Marker; location: { position: { lat: number; lng: number; }; name: string; icon: string; payload?: any; }; }; }>` |


## Methods

### `addMarker(location: { position: { lat: number; lng: number; }; name: string; icon: string; payload?: any; }) => Promise<google.maps.Marker>`

Add a marker to the map

#### Parameters

| Name       | Type                                                                                      | Description                                        |
| ---------- | ----------------------------------------------------------------------------------------- | -------------------------------------------------- |
| `location` | `{ position: { lat: number; lng: number; }; name: string; icon: string; payload?: any; }` | The location information for the marker on the map |

#### Returns

Type: `Promise<Marker>`



### `clearMarkers() => Promise<boolean>`

Clear the markers off of the map

#### Returns

Type: `Promise<boolean>`



### `setCenter(latLng: google.maps.LatLng | google.maps.LatLngLiteral) => Promise<void>`



#### Parameters

| Name     | Type                      | Description |
| -------- | ------------------------- | ----------- |
| `latLng` | `LatLng \| LatLngLiteral` |             |

#### Returns

Type: `Promise<void>`



### `setMarkers(markers?: { position: { lat: number; lng: number; }; name: string; icon: string; payload?: any; }[]) => Promise<{ position: { lat: number; lng: number; }; name: string; icon: string; payload?: any; }[]>`

Set the list of map markers

#### Parameters

| Name      | Type                                                                                        | Description           |
| --------- | ------------------------------------------------------------------------------------------- | --------------------- |
| `markers` | `{ position: { lat: number; lng: number; }; name: string; icon: string; payload?: any; }[]` | A list of map markers |

#### Returns

Type: `Promise<{ position: { lat: number; lng: number; }; name: string; icon: string; payload?: any; }[]>`



### `setZoom(level: number) => Promise<void>`



#### Parameters

| Name    | Type     | Description |
| ------- | -------- | ----------- |
| `level` | `number` |             |

#### Returns

Type: `Promise<void>`




----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
