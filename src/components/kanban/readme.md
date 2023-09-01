# fireenjin-kanban



<!-- Auto Generated Below -->


## Properties

| Property            | Attribute            | Description | Type                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | Default              |
| ------------------- | -------------------- | ----------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------- |
| `boardId`           | `board-id`           |             | `string`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | `"fireenjin-kanban"` |
| `disableResponsive` | `disable-responsive` |             | `boolean`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | `false`              |
| `options`           | --                   |             | `{ element?: string; gutter?: string; boards?: Board[]; widthBoard?: string; responsivePercentage?: boolean; dragItems?: boolean; dragBoards?: boolean; itemAddOptions?: { enabled?: boolean; content?: string; class?: string; footer?: string \| boolean; }; itemHandleOptions?: { enabled?: boolean; handleClass?: string; customCssHandler?: string; customCssIconHandler?: string; customHandler?: string; }; click?: (el: any) => void; context?: (el: any, event: any) => void; dragEl?: (el: any, source: any) => void; dragendEl?: (el: any) => void; dropEl?: (el: any, target: any, source: any, sibling: any) => void; dragBoard?: (el: any, source: any) => void; dragendBoard?: (el: any) => void; buttonClick?: (el: any, boardId: any) => void; propagationHandlers?: string[]; }` | `undefined`          |


## Methods

### `addBoards(boards: Board[]) => Promise<any>`



#### Returns

Type: `Promise<any>`



### `addElement(boardId: string, element: any, position?: number) => Promise<any>`



#### Returns

Type: `Promise<any>`



### `addForm(boardId: string, formItem?: any) => Promise<any>`



#### Returns

Type: `Promise<any>`



### `findBoard(id: string) => Promise<any>`



#### Returns

Type: `Promise<any>`



### `findElement(id: string) => Promise<any>`



#### Returns

Type: `Promise<any>`



### `getBoardElements(id: string) => Promise<any>`



#### Returns

Type: `Promise<any>`



### `getKanban() => Promise<any>`



#### Returns

Type: `Promise<any>`



### `getParentBoardID(id: string) => Promise<any>`



#### Returns

Type: `Promise<any>`



### `removeBoard(id: string) => Promise<any>`



#### Returns

Type: `Promise<any>`



### `removeElement(id: string) => Promise<any>`



#### Returns

Type: `Promise<any>`



### `replaceElement(id: string, element: any) => Promise<any>`



#### Returns

Type: `Promise<any>`




----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
