define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = {
        list: {
            props: {
                display: "list",
                endpoint: "listUsers",
                limit: 15,
                listEl: function (_a) {
                    var result = _a.result;
                    return "<h1>".concat(result.id, "</h1>");
                },
                collection: "users",
                results: [{ id: "001" }, { id: "002" }, { id: "003" }],
                fillScreen: true,
            },
            beforeHTML: function () { return "<h1>User List</h1>"; },
            innerHTML: function (_component, props) { return "\n            <ion-content>\n                <fireenjin-pagination fill-screen=\"".concat(props === null || props === void 0 ? void 0 : props.fillScreen, "\" display=\"").concat(props.display, "\" endpoint=\"").concat(props.endpoint, "\" limit=\"").concat(props.limit, "\" collection=\"").concat(props.collection, "\"></fireenjin-pagination>\n            </ion-content>\n        "); },
            hooks: {
                onComponentDidLoad: function (_a) {
                    var organismEl = _a.organismEl, props = _a.props;
                    if (!organismEl.querySelector("fireenjin-pagination"))
                        return;
                    organismEl.querySelector("fireenjin-pagination").listEl = props.listEl;
                    organismEl.querySelector("fireenjin-pagination").results =
                        props.results;
                },
            },
        },
    };
});
