import { Component, ComponentInterface, h, Prop } from "@stencil/core";

@Component({
  tag: "fireenjin-list-header",
})
export class ListHeader implements ComponentInterface {
  @Prop() label: string;
  @Prop() icon: string;
  @Prop() image: string;
  @Prop() imageSize: string;

  render() {
    return (
      <ion-item-divider
        style={{
          width: "100%",
          justifyContent: "space-between",
          gap: "0.5rem",
          alignItems: "center",
          padding: "0 1rem",
        }}
      >
        <ion-label
          style={{
            width: "100%",
          }}
        >
          {this.label}
          <slot />
        </ion-label>
        {this.icon && (
          <ion-icon
            name={!this.icon?.includes?.("/") && this.icon}
            src={this.icon?.includes?.("/") && this.icon}
          />
        )}
        {this.image && (
          <fireenjin-avatar src={this.image} size={this.imageSize} />
        )}
      </ion-item-divider>
    );
  }
}
