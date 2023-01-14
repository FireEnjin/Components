import { Config } from "@stencil/core";
import nodePolyfills from "rollup-plugin-node-polyfills";

const { namespace } = require("./package.json");

export const config: Config = {
  namespace,
  plugins: [],
  rollupPlugins: {
    after: [nodePolyfills()],
  },
  globalStyle: "src/css/global.css",
  globalScript: "src/global.ts",
  sourceMap: true,
  devServer: {
    reloadStrategy: "hmr",
    openBrowser: false,
  },
  outputTargets: [
    {
      type: "dist",
    },
    {
      type: "dist-hydrate-script",
    },
    {
      type: "www",
      serviceWorker: null,
      baseUrl: "https://fireenjin.com",
    },
    {
      type: "docs-readme",
    },
    {
      type: "docs-json",
      file: "www/core.json",
    },
  ],
};
