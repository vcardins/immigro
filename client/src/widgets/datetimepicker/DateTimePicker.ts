import { autoinject, customElement, bindable } from 'aurelia-framework';
import * as moment from 'moment';
import * as Pikaday from 'pikaday';

// extend: used to make deep copies of options object
function extend(destination, source) {
  for (let property in source) {
      if (source[property] && source[property].constructor &&
          source[property].constructor === Object) {
          destination[property] = destination[property] || {};
          arguments.callee(destination[property], source[property]);
      }
      else {
          destination[property] = source[property];
      }
  }
  return destination;
}

@autoinject
@customElement('datetime-picker')
/**
 * https://github.com/dbushell/Pikaday
 * https://github.com/owenmead/pikaday
 */
export class DateTimePicker {

  @bindable trigger:any;

  @bindable bound:boolean = true;

  @bindable position:string = 'bottom left';

  @bindable reposition:boolean = false;

  @bindable container:any = null;

  @bindable format:string = 'D MMM YYYY HH:mm a';

  @bindable defaultDate:Date = new Date();

  @bindable firstDay:Number = 1;

  @bindable minDate:Date;

  @bindable maxDate:Date;

  @bindable disableWeekends:Boolean = false;

  @bindable disableDayFn:Function;

  @bindable yearRange:any;

  @bindable showWeekNumber:Boolean = true;

  @bindable isRTL:Boolean = false;

  @bindable i18n:any;

  @bindable yearRange:any;

  @bindable yearSuffix:any;

  @bindable showMonthAfterYear:Boolean = true;

  @bindable numberOfMonths:Number;

  @bindable mainCalendar:any;

  @bindable yearRange:any;

  @bindable theme:any;

  @bindable showTime:Boolean = false;

  @bindable showSeconds:Boolean = false;

  @bindable use24hour:Boolean = false;

  @bindable onSelect:Function;

  @bindable onOpen:Function;

  @bindable onClose:Function;

  @bindable onDraw:Function;

  @bindable model:any;

  @bindable inputClass:string;

  private elemId:string;
  private field:any;

  constructor(private element:Element){
    this.elemId = (Math.random() * 1000).toFixed(3).replace('.','-');
  }

  /**
   * [attached description]
   * @return {[type]} [description]
   */
  attached() {

    let self = this;
    let input = this.element.getElementsByTagName('input')[0];
    input.classList.add(this.inputClass);

    this.field = input;

    let config = {
      field: this.field,
      bound: this.bound,
      format: this.format,
      position: this.position,
      reposition: this.reposition,
      defaultDate: this.defaultDate,
      firstDay: this.firstDay,
      disableWeekends: this.disableWeekends,
      yearRange: this.yearRange,
      showTime: this.showTime,
      showSeconds: this.showSeconds,
      use24hour: this.use24hour,
      isRTL:this.isRTL,
      showMonthAfterYear:this.showMonthAfterYear,
      onSelect: function(date) {
          input.value = moment(date).format(self.format);
          self.model = date;
      }
    }

    if (this.trigger) { config.trigger = document.getElementById(this.trigger); }
    if (this.yearSuffix) { config.yearSuffix = this.yearSuffix; }
    if (this.numberOfMonths) { config.numberOfMonths = this.numberOfMonths; }
    if (this.mainCalendar) { config.mainCalendar = this.mainCalendar; }
    if (this.i18n) { config.i18n = this.i18n; }
    if (this.disableDayFn) { config.disableDayFn = this.disableDayFn; }
    if (this.yearRange) { config.yearRange = this.yearRange; }
    if (this.theme) { config.theme = this.theme; }

    var picker = new Pikaday(config);
  }

  modelChanged (newValue) {
    if (this.field) {
      this.field.value = !newValue ? null : moment(newValue).format(this.format);
    }
  }

}
