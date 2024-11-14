define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = {
        default: {
            name: "Pie Chart",
            props: {
                type: "pie",
                labels: ["Test 1", "test 2"],
                datasets: [
                    {
                        label: "Dataset 1",
                        data: [30, 20],
                        backgroundColor: ["red", "blue"],
                    },
                ],
            },
        },
        bar: {
            name: "Bar Chart",
            props: {
                type: "bar",
                labels: ["Test 1", "test 2"],
                datasets: [
                    {
                        label: "Dataset 1",
                        data: [30, 20],
                        backgroundColor: ["red", "blue"],
                    },
                ],
            },
        },
        line: {
            name: "Line Chart",
            props: {
                type: "line",
                labels: ["Test 1", "test 2"],
                datasets: [
                    {
                        label: "Dataset 1",
                        data: [30, 20],
                        backgroundColor: ["red", "blue"],
                    },
                ],
            },
        },
    };
});
