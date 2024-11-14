define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var options = [
        {
            label: "Imortant",
            value: "important",
        },
        {
            label: "Bug",
            value: "bug",
        },
        {
            label: "Idea",
            value: "idea",
        },
    ];
    exports.default = {
        default: {
            name: "With Options",
            props: {
                label: "With Options",
                options: options,
            },
        },
        withValue: {
            name: "With Value",
            props: {
                label: "Type",
                options: options,
                value: "important",
            },
        },
        withAdding: {
            name: "With Empty Selection",
            props: {
                allowEmptySelection: true,
                label: "Type",
                options: options,
            },
        },
    };
});
