define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = {
        default: {
            name: "Default",
            props: {
                googleMapsKey: "AIzaSyAz5C9TRxQ9bUkTwVaD6Yc-Iisw57UslPM",
            },
        },
        multipleInputs: {
            name: "Multiple Inputs",
            innerHTML: function () { return "<fireenjin-form>\n    <fireenjin-input-address name=\"primary\" label=\"Primary Address\" google-maps-key=\"AIzaSyAz5C9TRxQ9bUkTwVaD6Yc-Iisw57UslPM\"></fireenjin-input-address>\n    <fireenjin-input-address name=\"secondary\" label=\"Secondary Address\" google-maps-key=\"AIzaSyAz5C9TRxQ9bUkTwVaD6Yc-Iisw57UslPM\"></fireenjin-input-address>\n  </fireenjin-form>"; },
        },
        withIcons: {
            props: {
                label: "Test",
                iconLeft: "create",
                iconRight: "map",
            },
        },
    };
});
