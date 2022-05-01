import { Component, ComponentInterface, Prop, h, Build } from "@stencil/core";

@Component({
  tag: "fireenjin-avatar",
  styleUrl: "avatar.css",
})
export class Avatar implements ComponentInterface {
  @Prop() color: string;
  @Prop() src: string;
  @Prop() size: string;
  @Prop() initials: string;
  @Prop() fallback: string;

  getCssVarColor(color: string) {
    if (!Build?.isBrowser) return color;
    return getComputedStyle(document.documentElement).getPropertyValue(
      `--ion-color-${color}`
    );
  }

  render() {
    return (
      <div
        class="avatar-image"
        style={{
          background: this.color,
          backgroundImage:
            !this.src?.length && this.initials
              ? `url('https://avatars.dicebear.com/api/initials/${
                  this.initials
                }.svg${
                  this.color && this.color.includes("#")
                    ? `?b=${this.color.replace("#", "%23")}`
                    : this.color
                    ? `?b=${this.getCssVarColor(this.color).replace(
                        "#",
                        "%23"
                      )}`
                    : ""
                }')`
              : `url('${
                  this.src?.length
                    ? this.src
                    : this.fallback?.length
                    ? this.fallback
                    : "/assets/images/default-icon.png"
                }')`,
          height: this.size ? this.size : "50px",
          width: this.size ? this.size : "50px",
        }}
      />
    );
  }
}
