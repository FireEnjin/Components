define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = {
        default: {
            innerHTML: function () {
                return "<fireenjin-form cache-key=\"wee\" endpoint=\"users\" fetch filter-data=\"firstName,lastName\" fetch-key=\"user\" reset-button=\"test\">\n        <fireenjin-input required name=\"users[0].firstName\" />\n      </fireenjin-form>";
            },
        },
    };
});
