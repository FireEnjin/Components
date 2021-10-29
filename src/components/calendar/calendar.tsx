import {
  Component,
  ComponentInterface,
  Event,
  EventEmitter,
  Method,
  Prop,
  State,
  h
} from "@stencil/core";

@Component({
  tag: "fireenjin-calendar",
  styleUrl: "calendar.css"
})
export class Calendar implements ComponentInterface {
  /**
   * Language locale to use for calendar
   */
  @Prop() locales: string;
  /**
   * The year to set the calendar to
   */
  @Prop() year: number;
  /**
   * The maximum date that can be selected in Y-m-d format
   */
  @Prop() max: string;
  /**
   * The minimum date that can be selected in Y-m-d format
   */
  @Prop() min: string;
  /**
   * The month to set the calendar to
   */
  @Prop() month: number;
  /**
   * Should the calendar be used to select a date range
   */
  @Prop() range: boolean;
  /**
   * A list of available dates to select
   */
  @Prop() available: string[];
  /**
   * The end date to select Y-m-d
   */
  @Prop({ mutable: true }) endDate: string;
  /**
   * The start date to select Y-m-d
   */
  @Prop({ mutable: true }) startDate: string;
  /**
   * The title to use when showing the year selection view
   */
  @Prop() yearsTitle = `Select a Year`;

  /**
   * Emitted when a date is selected on the
   */
  @Event() fireenjinDateSelected: EventEmitter<{
    /**
     * The click event from the element selected
     */
    event;
    /**
     * The year number of the selection
     */
    year: number;
    /**
     * The month number of the selection
     */
    month: number;
    /**
     * The date string of the selected date in Y-m-d format
     */
    dateString: string;
    /**
     * The day number of the selection
     */
    day: number;
    /**
     * The current start date selected
     */
    startDate: string;
    /**
     * The current end date selected (If selecting range only)
     */
    endDate?: string;
  }>;
  /**
   * Emitted when controls are used to navigate
   */
  @Event() fireenjinCalendarNavigate: EventEmitter<{
    /**
     * The click event from the element selected
     */
    event;
    /**
     * The year number of the selection
     */
    year: number;
    /**
     * The month number of the selection
     */
    month: number;
    /**
     * The current view being used
     */
    currentView: "calendar" | "months" | "years";
    /**
     * Was the user navigating backwards
     */
    back: boolean;
    /**
     * The current start date selected
     */
    startDate: string;
    /**
     * The current end date selected (If selecting range only)
     */
    endDate?: string;
  }>;

  /**
   * The current view being used
   */
  @State() currentView: "calendar" | "months" | "years" = "calendar";

  /**
   * Switch the view of the calendar
   * @param event The click event from the element being used
   * @param view The view to switch to
   */
  @Method()
  async switchView(event, view: "calendar" | "months" | "years") {
    this.fireenjinCalendarNavigate.emit({
      event,
      currentView: view,
      back: false,
      year: this.year,
      month: this.month,
      startDate: this.startDate,
      endDate: this.endDate
    });

    return (this.currentView = view);
  }

  /**
   * Set the current date of the calendar
   * @param dateString The date in YYYY-MM-DD format to set the calendar to
   */
  @Method()
  async setDate(dateString: string) {
    if (
      (this.range && dateString > this.startDate && !this.endDate) ||
      (this.range && this.endDate && dateString > this.endDate)
    ) {
      this.endDate = dateString;
    } else {
      this.startDate = dateString;
      if (this.endDate) {
        this.endDate = null;
      }
    }
  }

  getDate() {
    const date = new Date();
    if (this.year != null) {
      date.setFullYear(this.year);
    }
    if (this.month != null) {
      date.setMonth(this.month);
    }
    date.setDate(1);

    this.year = date.getFullYear();
    this.month = date.getMonth();

    return date;
  }

  getTitle() {
    const date = this.getDate();

    return this.currentView === "years"
      ? this.yearsTitle
      : `${this.currentView === "calendar"
        ? date.toLocaleString(this.locales, {
          month: "long"
        })
        : ""
      } ${date.getFullYear()}`;
  }

  navigate(event, back = false) {
    const date = this.getDate();
    if (this.currentView === "calendar") {
      this.month = date.getMonth() - (back ? 1 : -1);
    } else if (this.currentView === "months") {
      this.year = date.getFullYear() - (back ? 1 : -1);
    } else if (this.currentView === "years") {
      this.year = date.getFullYear() - (back ? 9 : -9);
    }
    this.fireenjinCalendarNavigate.emit({
      event,
      back,
      currentView: this.currentView,
      year: this.year,
      month: this.month,
      startDate: this.startDate,
      endDate: this.endDate
    });
  }

  pad(num, size) {
    return ("0" + num).substr(("0" + num).length - size);
  }

  buildCalendar() {
    const date = this.getDate();
    const originalDate = this.getDate();
    if (date.getDay() > 0) {
      date.setDate(date.getDate() - date.getDay());
    }
    const days: {
      number: number;
      x: number;
      y: number;
      inMonth: boolean;
      index: number;
      dateString: string;
    }[] = [];
    let xpos = 0;
    let ypos = 2;
    for (let index = 1; index <= 35; index++) {
      const x = date.getDay();
      if (x < xpos) {
        ypos++;
      }
      xpos = x;
      days.push({
        number: date.getDate(),
        x: xpos + 1,
        y: ypos,
        inMonth: date.getMonth() === originalDate.getMonth(),
        index,
        dateString: `${date.getFullYear()}-${this.pad(
          date.getMonth() + 1,
          2
        )}-${this.pad(date.getDate(), 2)}`
      });
      date.setDate(date.getDate() + 1);
    }

    return days;
  }

  async onSelected(event: Event, dateString: string) {
    event.preventDefault();
    event.stopPropagation();
    await this.setDate(dateString);
    const [year, month, day] = dateString.split("-") as any;
    this.fireenjinDateSelected.emit({
      event,
      dateString,
      day,
      month,
      year,
      startDate: this.startDate,
      endDate: this.endDate
    });

    return false;
  }

  getMonths() {
    let months = [];

    for (var i = 0; i < 12; i++) {
      months.push(
        new Date(0, i).toLocaleString(this.locales, { month: "short" })
      );
    }

    return months;
  }

  getYears() {
    let years = [];
    const selectedYear = this.year ? this.year : new Date().getFullYear();
    const modifiedYear = selectedYear - 4;

    for (var i = 0; i < 9; i++) {
      years.push(modifiedYear + i);
    }

    return years;
  }

  selectMonth(event, index) {
    event.preventDefault();
    this.month = index;
    this.switchView(event, "calendar");
  }

  selectYear(event, year) {
    event.preventDefault();
    this.year = year;
    this.switchView(event, "months");
  }

  renderLegend() {
    const date = new Date(Date.UTC(2015, 0, 1));
    const formater = new Intl.DateTimeFormat(this.locales, {
      weekday: "short"
    });
    const weekDays = [];
    for (let day = 1; day <= 7; day++) {
      date.setDate(day);
      weekDays.push(<div class="head-cell">{formater.format(date)}</div>);
    }

    return weekDays;
  }

  render() {
    return (
      <div class="calendar-wrapper">
        <ion-grid class="calendar-controls">
          <ion-row>
            <ion-col size="1" onClick={event => this.navigate(event, true)}>
              <ion-icon name="arrow-back"></ion-icon>
            </ion-col>
            <ion-col
              class="calendar-title"
              size="10"
              onClick={event =>
                this.switchView(
                  event,
                  this.currentView === "calendar" ? "months" : "years"
                )
              }
            >
              {this.getTitle()}
            </ion-col>
            <ion-col size="1" onClick={event => this.navigate(event)}>
              <ion-icon name="arrow-forward"></ion-icon>
            </ion-col>
          </ion-row>
        </ion-grid>
        <div
          class={{
            "calendar-grid": true,
            viewing: this.currentView === "calendar",
            range: this.range
          }}
        >
          {[
            ...this.renderLegend(),
            ...this.buildCalendar().map(day => {
              const unavailable =
                (this.available &&
                  this.available.indexOf(day.dateString) === -1) ||
                (this.max && day.dateString > this.max) ||
                (this.min && day.dateString < this.min) ||
                false;

              return (
                <button
                  class={{
                    unavailable,
                    "start-date": this.startDate === day.dateString,
                    "end-date": this.endDate === day.dateString,
                    selected:
                      this.range && this.endDate
                        ? this.startDate <= day.dateString &&
                        this.endDate >= day.dateString
                        : this.startDate && this.startDate === day.dateString,
                    cell: true,
                    faded: !day.inMonth
                  }}
                  disabled={unavailable}
                  onClick={event => this.onSelected(event, day.dateString)}
                  style={{
                    gridColumn: `${day.x}`,
                    gridRow: `${day.y}`
                  }}
                >
                  {day.number}
                </button>
              );
            })
          ]}
        </div>
        <div
          class={{ "month-grid": true, viewing: this.currentView === "months" }}
        >
          <ion-grid>
            <ion-row>
              {this.getMonths().map((month, index) => (
                <ion-col
                  size="4"
                  onClick={event => this.selectMonth(event, index)}
                >
                  <div class={{ cell: true, selected: index === this.month }}>
                    {month}
                  </div>
                </ion-col>
              ))}
            </ion-row>
          </ion-grid>
        </div>
        <div
          class={{ "year-grid": true, viewing: this.currentView === "years" }}
        >
          <ion-grid>
            <ion-row>
              {this.getYears().map(year => (
                <ion-col
                  size="4"
                  onClick={event => this.selectYear(event, year)}
                >
                  <div class={{ cell: true, selected: year === this.year }}>
                    {year}
                  </div>
                </ion-col>
              ))}
            </ion-row>
          </ion-grid>
        </div>
      </div>
    );
  }
}
