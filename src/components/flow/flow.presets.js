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
            name: "Default",
            props: {
                endpoint: "addUser",
                askConfirmation: true,
                steps: [
                    {
                        fields: [
                            {
                                name: "test",
                                label: "Testing",
                                labelPosition: "stacked",
                                required: true,
                                placeholder: "wee",
                            },
                        ],
                    },
                    {
                        component: "fireenjin-star-rating",
                        componentProps: {
                            value: 4,
                            required: true,
                        },
                    },
                    {
                        label: "Twee",
                        fields: [
                            {
                                name: "test2",
                                type: "radios",
                                options: options,
                                label: "Testing",
                                labelPosition: "stacked",
                            },
                        ],
                    },
                ],
            },
        },
    };
});
