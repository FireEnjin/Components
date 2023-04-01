import { Loader, LoaderOptions, google } from "google-maps";
import {
  Component,
  ComponentInterface,
  Element,
  Event,
  EventEmitter,
  Listen,
  Prop,
  State,
  h,
  Build,
  Watch,
} from "@stencil/core";

@Component({
  tag: "fireenjin-input-address",
  styleUrl: "input-address.css",
  scoped: true,
})
export class InputAddress implements ComponentInterface {
  google: google;
  autocompleteFieldEl: HTMLIonInputElement;
  streetInputEl: HTMLIonInputElement;
  unitInputEl: HTMLIonInputElement;
  stateSelectEl: any;
  cityInputEl: HTMLIonInputElement;
  zipInputEl: HTMLIonInputElement;

  @Element() addressAutocompleteEl: any;

  /**
   * The Google Maps API Key
   */
  @Prop() googleMapsKey: string;
  /**
   * The placeholder text for the input field
   */
  @Prop() placeholder: string;
  /**
   * The value of the input field
   */
  @Prop({ mutable: true }) value: any = {};
  /**
   * The label of the input field
   */
  @Prop() label: string;
  /**
   * Whether the address input is required
   */
  @Prop() required = false;
  /**
   * The name attribute of the input
   */
  @Prop() name: string;
  @Prop() lines: "full" | "inset" | "none";
  @Prop() labelPosition?: "stacked" | "fixed" | "floating" = "stacked";
  @Prop() iconLeft: string;
  @Prop() iconRight: string;

  @State() place: any;
  @State() manualEntry = false;

  @Event() ionInput: EventEmitter;
  @Event() fireenjinAddressMode: EventEmitter;
  @Event() fireenjinUpdateAutoHeight: EventEmitter;

  @Watch("value")
  onValueChange() {
    if (typeof this.value !== "string") return;
    this.value = { full: this.value };
    this.ionInput.emit({
      name: this.name,
      value: this.value,
    });
  }

  @Listen("ionChange")
  onChange() {
    if (this.manualEntry) {
      setTimeout(() => {
        const fullAddress = `${this.streetInputEl.value},${
          this.unitInputEl.value ? ` ${this.unitInputEl.value},` : ""
        } ${this.cityInputEl.value}, ${
          this.stateSelectEl.querySelector("ion-select").value
        } ${this.zipInputEl.value}`;
        this.autocompleteFieldEl.value = fullAddress;
        this.value.full = fullAddress;
        this.ionInput.emit({
          name: this.name,
          value: this.value,
        });
      }, 100);
    } else if (this.value?.full && !this.autocompleteFieldEl?.value) {
      this.value = null;
      this.ionInput.emit({
        name: this.name,
        value: this.value,
      });
    }
  }

  sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async loadGoogleMaps(options?: LoaderOptions) {
    if (window?.google) return window.google;
    if ((window as any)?._dk_google_maps_loader_cb) {
      await this.sleep(200);
      return this.loadGoogleMaps();
    }
    try {
      const loader = new Loader(this.googleMapsKey, {
        libraries: ["places"],
        ...options,
      });

      return loader.load();
    } catch (e) {
      console.log(e);
      setTimeout(this.loadGoogleMaps.bind(this), 2000);
    }
  }

  async componentDidLoad() {
    if (!Build?.isBrowser || !this.googleMapsKey) return;
    this.google = await this.loadGoogleMaps();
    const inputEl = await this.autocompleteFieldEl.getInputElement();
    setTimeout(() => {
      const autocomplete = new this.google.maps.places.Autocomplete(inputEl, {
        types: ["address"],
      });

      this.google.maps.event.addListener(autocomplete, "place_changed", () => {
        this.place = autocomplete.getPlace();
        if (!this.value) {
          this.value = {};
        }
        this.value.full = this.place.formatted_address;

        let streetAddress = "";
        this.value.placeId = this.place?.place_id;
        this.value.lat = this.place?.geometry?.location?.lat();
        this.value.lng = this.place?.geometry?.location?.lng();
        this.place.address_components.map((field, index) => {
          if (field.types.indexOf("street_number") !== -1) {
            streetAddress = field.long_name;
          }
          if (field.types.indexOf("route") !== -1) {
            streetAddress = streetAddress + " " + field.long_name;
          }
          if (field.types.indexOf("locality") !== -1) {
            this.value.city = field.long_name;
          }
          if (field.types.indexOf("postal_code") !== -1) {
            this.value.zip = field.short_name;
          }
          if (field.types.indexOf("administrative_area_level_1") !== -1) {
            this.value.state = field.short_name;
          }

          if (this.place.address_components.length === index + 1) {
            this.value.street = streetAddress;
          }

          if (index === this.place.address_components.length - 1) {
            setTimeout(() => {
              this.ionInput.emit({
                name: this.name,
                value: this.value,
              });
            }, 10);
          }
        });
      });
    }, 200);
  }

  toggleManualEntry() {
    this.manualEntry = !this.manualEntry;
    if (this.manualEntry) {
      this.value = {
        city: this.cityInputEl.value as string,
        country: "US",
        full: this.autocompleteFieldEl.value as string,
        state: this.stateSelectEl.value,
        street: this.streetInputEl.value as string,
        unit: this.unitInputEl.value as string,
        zip: this.zipInputEl.value as string,
      };
    }
    this.fireenjinAddressMode.emit({ maual: this.manualEntry });
    this.fireenjinUpdateAutoHeight.emit();
  }

  render() {
    const value = this.value ? this.value : {};
    return [
      <ion-item lines={this.lines} class={{ "is-hidden": !this.manualEntry }}>
        {this.iconLeft && (
          <ion-icon
            style={{ marginTop: "auto", marginBottom: "auto" }}
            name={this.iconLeft}
            slot="start"
          />
        )}
        <div style={{ width: "100%" }}>
          <ion-label position={this.labelPosition}>{this.label}</ion-label>
          <div class="manual-fields">
            <ion-input
              ref={(el) => (this.streetInputEl = el)}
              type="text"
              name={this.name + ".street"}
              placeholder="Street Address"
              value={value.street}
              required={this.required && this.manualEntry}
            />
            <ion-input
              ref={(el) => (this.unitInputEl = el)}
              type="text"
              name={this.name + ".unit"}
              placeholder="Street Address 2"
              value={value.unit}
            />
            <ion-input
              ref={(el) => (this.cityInputEl = el)}
              type="text"
              name={this.name + ".city"}
              placeholder="City"
              value={value.city}
              required={this.required && this.manualEntry}
            />
            <ion-grid>
              <ion-row>
                <ion-col size="6">
                  <fireenjin-input-state
                    ref={(el) => (this.stateSelectEl = el)}
                    name={this.name + ".state"}
                    value={value.state}
                    placeholder="State"
                  />
                </ion-col>
                <ion-col size="6">
                  <ion-input
                    ref={(el) => (this.zipInputEl = el)}
                    class="zip-input"
                    type="tel"
                    name={this.name + ".zip"}
                    min="0"
                    max="999999"
                    value={value.zip}
                    placeholder="Zip Code"
                    required={this.required && this.manualEntry}
                  />
                </ion-col>
              </ion-row>
            </ion-grid>
          </div>
        </div>
        <div slot="end">
          <ion-button
            fill="clear"
            color="primary"
            onClick={() => this.toggleManualEntry()}
          >
            Search
            {this.iconRight && <ion-icon slot="end" name={this.iconRight} />}
          </ion-button>
        </div>
      </ion-item>,
      <ion-item class={{ "is-hidden": this.manualEntry }}>
        {this.iconLeft && (
          <ion-icon
            name={this.iconLeft}
            style={{ marginTop: "auto" }}
            slot="start"
          />
        )}
        <ion-label position={this.labelPosition}>{this.label}</ion-label>
        <div
          style={{
            width: "100%",
            display: "flex",
            gap: "0.5rem",
            justifyContent: "center",
            alignItems: "baseline",
          }}
        >
          <ion-input
            style={{ display: "block", width: "100%" }}
            ref={(el) => (this.autocompleteFieldEl = el)}
            class="autocomplete-field"
            type="text"
            name={`${this.name}.full`}
            placeholder={this.placeholder}
            value={value.full}
            autocomplete="off"
            required={this.required && !this.manualEntry}
          />
          <ion-input
            style={{ maxWidth: "100px" }}
            ref={(el) => (this.unitInputEl = el)}
            type="text"
            name={this.name + ".unit"}
            placeholder="Unit"
            value={value.unit}
          />
        </div>
        <ion-buttons style={{ margin: "0" }} slot="end">
          <ion-button
            fill="clear"
            color="primary"
            onClick={() => this.toggleManualEntry()}
            slot="end"
          >
            Manual
            {this.iconRight && <ion-icon slot="end" name={this.iconRight} />}
          </ion-button>
        </ion-buttons>
      </ion-item>,
    ];
  }
}
