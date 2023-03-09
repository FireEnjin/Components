module.exports = {
  files: "src/**",
  targets: ["html", "qwik", "stencil", "customElement"],
  options: {
    qwik: {
      typescript: true,
    },
    stencil: {
      typescript: true,
    },
  },
};
