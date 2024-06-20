import { ComponentPresets } from "@fireenjin/docs";

export default {
  default: {
    name: "Default",
    props: {
      options: {
        boards: [
          {
            id: "board-id-1", // id of the board
            title: "Board Title", // title of the board
            class: "", // css classes to add at the title
            item: [
              // item of this board
              {
                id: "item-id-1", // id of the item
                html: `<ion-item>This is a card<br /><br/></ion-item>`, // title of the item
                class: ["myClass"], // array of additional classes
              },
              {
                id: "item-id-2",
                html: `<ion-item>This is a card<br /><br/></ion-item>`, // title of the item
              },
              {
                id: "item-id-3",
                html: `<ion-item>This is a card<br /><br/></ion-item>`, // title of the item
              },
              {
                id: "item-id-4",
                html: `<ion-item>This is a card<br /><br/></ion-item>`, // title of the item
              },
              {
                id: "item-id-5",
                html: `<ion-item>This is a card<br /><br/></ion-item>`, // title of the item
              },
              {
                id: "item-id-6",
                html: `<ion-item>This is a card<br /><br/></ion-item>`, // title of the item
              },
              {
                id: "item-id-7",
                html: `<ion-item>This is a card<br /><br/></ion-item>`, // title of the item
              },
              {
                id: "item-id-8",
                html: `<ion-item>This is a card<br /><br/></ion-item>`, // title of the item
              },
              {
                id: "item-id-9",
                html: `<ion-item>This is a card<br /><br/></ion-item>`, // title of the item
              },
              {
                id: "item-id-10",
                html: `<ion-item>This is a card<br /><br/></ion-item>`, // title of the item
              },
            ],
          },
          {
            id: "board-id-2",
            title: "Board Title 2",
            item: [],
          },
          {
            id: "board-id-3",
            title: "Board Title 3",
            item: [],
          },
        ],
      },
    },
  },
} as ComponentPresets;
