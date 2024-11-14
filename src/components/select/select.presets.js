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
                multiple: false,
                options: options,
            },
        },
        withValue: {
            name: "With Value",
            props: {
                label: "Tags",
                options: options,
                multiple: false,
                value: ["important"],
            },
        },
        withAdding: {
            name: "With Adding",
            props: {
                allowAdding: true,
                label: "Tags",
                options: options,
                multiple: true,
                value: ["important"],
            },
        },
        withEndpoint: {
            name: "Data from API",
            props: {
                allowAdding: true,
                label: "Tags",
                endpoint: "listRoles",
                resultsKey: "roles",
                limit: 100,
            },
        },
    };
});
