define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = {
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
            innerHTML: function (_component, props) {
                return "<div style=\"display: flex;\">\n        <div style=\"width: 50%; height: 100%; position: relative;\">\n          <fireenjin-json-editor value=\"".concat(props.value, "\"></fireenjin-json-editor>\n        </div>\n        <div style=\"width: 50%; height: 100%; position: relative;\">\n          <fireenjin-json-editor value=\"").concat(props.value, "\"></fireenjin-json-editor>\n        </div>\n      </div>");
            },
        },
        multiple: {
            props: {
                value: '{"wee": 123}',
            },
            innerHTML: function (_component, props) {
                return "<ion-card style=\"overflow:visible;\">\n        <ion-accordion-group>\n          <ion-accordion>\n            <h2 slot=\"header\">Test</h2>\n            <fireenjin-json-editor slot=\"content\" value=\"".concat(props.value, "\"></fireenjin-json-editor>\n          </ion-accordion>\n        </ion-accordion-group>\n        <fireenjin-json-editor value=\"").concat(props.value, "\"></fireenjin-json-editor>\n      </ion-card>");
            },
        },
    };
});
