define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var options = [
        {
            label: "User 1",
            value: "1",
            image: "https://picsum.photos/200?random=1",
        },
        {
            label: "User 2",
            value: "2",
            image: "https://picsum.photos/200?random=2",
        },
        {
            label: "User 3",
            value: "3",
            image: "https://picsum.photos/200?random=3",
        },
    ];
    exports.default = {
        default: {
            props: {
                icon: "person",
                label: "Select a user",
                options: options,
            },
        },
        multiple: {
            props: {
                icon: "person",
                label: "Select users",
                multiple: true,
                options: options,
            },
        },
        outline: {
            props: {
                icon: "person",
                label: "Select a user",
                outline: true,
                options: options,
            },
        },
    };
});
