# FireEnjin Components v2

## Overview

---

Our component development process uses [Mitosis](https://mitosis.builder.io) to build our components once and run them everywhere.

## Release

---

The components release process is built around [Github Actions](https://github.com/features/actions) and will build a new release using [Semantic Release](https://semantic-release.gitbook.io/semantic-release/) when commits are made to the master branch. This can be configured in the /.github/workflows/release.yml.

## Deploy

---

The components deploy process is built around [Github Actions](https://github.com/features/actions) and will deploy automatically to [Firebase Hosting](https://firebase.google.com/docs/hosting) when commits are made to the master branch. This can be configured in the /.github/workflows/deploy.yml.
