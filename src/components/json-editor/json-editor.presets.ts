import { ComponentPresets } from "@fireenjin/docs";

export default {
  default: {
    name: "Default",
    props: {
      value: '{"wee": 123}',
    },
  },
  split: {
    props: {
      value: '{"wee": 123}',
    },
    innerHTML(_component, props) {
      return `<div style="display: flex;">
        <div style="width: 50%; height: 100%; position: relative;">
          <fireenjin-json-editor value="${props.value}"></fireenjin-json-editor>
        </div>
        <div style="width: 50%; height: 100%; position: relative;">
          <fireenjin-json-editor value="${props.value}"></fireenjin-json-editor>
        </div>
      </div>`;
    },
  },
  multiple: {
    props: {
      value: '{"wee": 123}',
    },
    innerHTML(_component, props) {
      return `<ion-card style="overflow:visible;">
        <ion-accordion-group>
          <ion-accordion>
            <h2 slot="header">Test</h2>
            <fireenjin-json-editor slot="content" value="${props.value}"></fireenjin-json-editor>
          </ion-accordion>
        </ion-accordion-group>
        <fireenjin-json-editor value="${props.value}"></fireenjin-json-editor>
      </ion-card>`;
    },
  },
} as ComponentPresets;
