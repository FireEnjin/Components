import { Component, h, Prop } from "@stencil/core";

@Component({
  tag: "fireenjin-flow",
  styleUrl: "flow.css",
})
export class flow {
  slidesEl: HTMLIonSlidesElement;

  /**
   * A list of options for SwiperJS
   * @link https://swiperjs.com/swiper-api#parameters
   */
  @Prop() slidesOptions: any = { autoHeight: true };
  @Prop() pager = false;
  @Prop() scrollbar = false;
  @Prop() fields: {
    label;
  }[] = [];
  @Prop() endpoint: string;
  @Prop() showControls = false;

  render() {
    return (
      <fireenjin-form
        endpoint={this.endpoint}
        hideControls={!this.showControls}
        disableLoader
      >
        <ion-slides
          ref={(el) => (this.slidesEl = el)}
          pager={this.pager}
          options={this.slidesOptions}
          scrollbar={this.scrollbar}
        >
          {(this.fields || []).map((field) => (
            <ion-slide>
              <div>{field?.label || "None"}</div>
            </ion-slide>
          ))}
        </ion-slides>
      </fireenjin-form>
    );
  }
}
