import { Component, h, Host, State } from "@stencil/core";

@Component({
  tag: "fireenjin-query",
})
export class Query {
  @State()
  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }
}
