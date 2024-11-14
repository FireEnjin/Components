define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = {
        default: {
            name: "Default d",
            props: {
                variables: {
                    title: {
                        label: "Title",
                        description: "This is a description of the field",
                    },
                },
                value: JSON.stringify({
                    if: [
                        {
                            and: [
                                {
                                    "==": [
                                        {
                                            var: "title",
                                        },
                                        "test",
                                    ],
                                },
                            ],
                        },
                        true,
                        false,
                    ],
                }),
            },
        },
    };
});
