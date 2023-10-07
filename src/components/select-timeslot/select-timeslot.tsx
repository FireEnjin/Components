import { Component, Event, EventEmitter, Prop, State, h } from "@stencil/core";
import formatDate from "../../helpers/formatDate";
import { Color } from "@ionic/core";

@Component({
  tag: "fireenjin-select-timeslot",
})
export class SelectTimeslot {
  @Event() ionChange: EventEmitter<{ name: string; value: Date | string }>;

  /**
   * What the next button says
   */
  @Prop() nextButton?: string;
  /**
   * What size is the next button
   */
  @Prop() nextButtonSize: "default" | "large" | "small";
  /**
   * What color the next button is
   */
  @Prop() nextButtonColor?: Color;
  /**
   * What color the next button is
   */
  @Prop() nextButtonExpand: "full" | "block" | undefined = "full";
  /**
   * What fill option to use for the next button
   */
  @Prop() nextButtonFill: "clear" | "outline" | "solid" | "default" = "clear";
  /**
   * What shape is the next button
   */
  @Prop() nextButtonShape?: "round";
  /**
   * What the previous button says
   */
  @Prop() previousButton?: string;
  /**
   * What size is the previous button
   */
  @Prop() previousButtonSize?: "default" | "large" | "small";
  /**
   * What color the previous button is
   */
  @Prop() previousButtonColor?: Color;
  /**
   * What fill option to use for the previous button
   */
  @Prop() previousButtonFill: "clear" | "outline" | "solid" | "default" =
    "clear";
  /**
   * What color the previous button is
   */
  @Prop() previousButtonExpand: "full" | "block" | undefined = "full";
  /**
   * What shape is the previous button
   */
  @Prop() previousButtonShape?: "round";
  /**
   * Should the form controls be hidden?
   */
  @Prop() hideControls = false;
  @Prop() name = "timeslot";
  @Prop({ mutable: true }) value: string;
  @Prop() lines: "full" | "none" | undefined = "full";
  @Prop() duration: number;
  @Prop() durationLabel = "min";
  @Prop() label: string;
  @Prop() controlsPosition: "top" | "bottom" = "top";
  @Prop() valueToString = false;

  @State() timeslots: { label: string; value: string }[] = [];
  @State() selectedDate = new Date();
  @State() nextDate: Date;
  @State() previousDate: Date;

  convertTime12to24(time12Hour) {
    const [time, modifier] = time12Hour.split(" ");

    let [hours, minutes] = time.split(":");

    if (hours === "12") {
      hours = "00";
    }

    if (modifier === "PM") {
      hours = parseInt(hours, 10) + 12;
    }

    minutes = parseInt(minutes, 10);

    return { hours, minutes };
  }

  inFuture(date: Date, hours: number, minutes: number) {
    const futureDate = new Date(date);
    futureDate.setHours(hours, minutes, 0, 0);
    return futureDate > new Date();
  }

  generateTimeslots() {
    const nextDate = new Date(this.selectedDate);
    nextDate.setDate(nextDate.getDate() + 1);
    this.nextDate = nextDate;
    const previousDate = new Date(this.selectedDate);
    previousDate.setDate(previousDate.getDate() - 1);
    previousDate.setHours(23, 59);
    this.previousDate = previousDate;
    const x = 15; //minutes interval
    const times: { label: string; value: string }[] = []; // time array
    let tt = 0; // start time
    const ap = ["AM", "PM"]; // AM-PM

    //loop to increment the time and push results in array
    for (let i = 0; tt < 24 * 60; i++) {
      const hh = Math.floor(tt / 60); // getting hours of day in 0-24 format
      const mm = tt % 60; // getting minutes of the hour in 0-55 format
      let hh12 = hh % 12;

      if (hh12 === 0) {
        hh12 = 12;
      }
      const time12Hour = `${("0" + hh12).slice(-2)}:${("0" + mm).slice(-2)} ${
        ap[Math.floor(hh / 12)]
      }`;
      const { hours, minutes } = this.convertTime12to24(time12Hour);
      if (this.inFuture(this.selectedDate, hours, minutes)) {
        const value = new Date(this.selectedDate);
        value.setHours(hh, mm, 0, 0);
        times[i] = {
          label: `${formatDate(this.selectedDate, "MMM do")} @ ${time12Hour}`,
          value: value.toISOString(),
        };
      }

      tt = tt + x;
    }

    this.timeslots = times;
  }

  nextDay() {
    this.selectedDate.setDate(this.selectedDate.getDate() + 1);
    this.generateTimeslots();
    return this.selectedDate;
  }

  previousDay() {
    this.selectedDate.setDate(this.selectedDate.getDate() - 1);
    this.generateTimeslots();
    return this.selectedDate;
  }

  renderControls(position: "top" | "bottom") {
    return this.hideControls || this.controlsPosition !== position ? null : (
      <ion-item lines={this.lines}>
        <ion-grid>
          <ion-row>
            <ion-col size="12" sizeSm="6">
              <ion-button
                color={this.previousButtonColor}
                fill={this.previousButtonFill}
                expand={this.previousButtonExpand}
                shape={this.previousButtonShape}
                onClick={() => this.previousDay()}
                disabled={this.previousDate < new Date()}
              >
                <ion-icon slot="start" name="chevron-back-circle" />
                {this.previousButton || formatDate(this.previousDate)}
              </ion-button>
            </ion-col>
            <ion-col size="12" sizeSm="6">
              <ion-button
                color={this.nextButtonColor}
                fill={this.nextButtonFill}
                expand={this.previousButtonExpand}
                shape={this.previousButtonShape}
                onClick={() => this.nextDay()}
              >
                {this.nextButton || formatDate(this.nextDate)}
                <ion-icon slot="end" name="chevron-forward-circle" />
              </ion-button>
            </ion-col>
          </ion-row>
        </ion-grid>
      </ion-item>
    );
  }

  componentWillLoad() {
    this.generateTimeslots();
  }

  render() {
    return (
      <ion-list>
        {this.label ? <ion-list-header>{this.label}</ion-list-header> : null}
        {this.renderControls("top")}
        <slot name="top" />
        <ion-radio-group
          onIonChange={(event) => {
            const value: string =
              this.valueToString && event?.detail?.value instanceof Date
                ? (event?.detail?.value as Date)?.toISOString?.()
                : event?.detail?.value;
            this.value = value;
            this.ionChange.emit({ name: this.name, value });
          }}
          value={
            typeof this.value === "object"
              ? (this.value as Date).toISOString()
              : this.value
          }
        >
          <slot />
          {this.timeslots?.map?.((timeslot) => {
            const valueSelected =
              (typeof this.value === "object" &&
                (this.value as Date).toISOString?.() === timeslot?.value) ||
              this.value === timeslot?.value;
            return (
              <ion-item lines={this.lines}>
                <ion-radio slot="start" value={timeslot?.value} />
                <ion-label>{timeslot.label}</ion-label>
                {this.duration && valueSelected ? (
                  <ion-badge slot="end">
                    {this.duration} {this.durationLabel}
                  </ion-badge>
                ) : null}
              </ion-item>
            );
          })}
        </ion-radio-group>
        <slot name="bottom" />
        {this.renderControls("bottom")}
      </ion-list>
    );
  }
}
