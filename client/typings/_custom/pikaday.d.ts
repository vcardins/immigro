// Type definitions for Pikaday.js
// Project: https://github.com/dbushell/Pikaday
// Definitions by: Victor Cardins <https://github.com/cardins/>
// Definitions: https://github.com/borisyankov/DefinitelyTyped

interface Pikaday {
	field:string; //bind the datepicker to a form field
	trigger:any;  //use a different element to trigger opening the datepicker, see trigger example (default to field)
	bound:Boolean;  //automatically show/hide the datepicker on field focus (default true if field is set)
	position:string;  //preferred position of the datepicker relative to the form field, e.g.: top right, bottom right Note: automatic adjustment may occur to avoid datepicker from being displayed outside the viewport, see positions example (default to 'bottom left')
	reposition:Boolean;  //can be set to false to not reposition datepicker within the viewport, forcing it to take the configured position (default: true)
	container:any;  //DOM node to render calendar into, see container example (default: undefined)
	format:string;  //the default output format for .toString() and field value (requires Moment.js for custom formatting)
	defaultDate:Date;  //the initial date to view when first opened
	setDefaultDate:Function;  //make the defaultDate the initial selected value
	firstDay:Number;  //first day of the week (0: Sunday, 1: Monday, etc)
	minDate:Date;  //the minimum/earliest date that can be selected (this should be a native Date object - e.g. new Date() or moment().toDate())
	maxDate:Date;  //the maximum/latest date that can be selected (this should be a native Date object - e.g. new Date() or moment().toDate())
	disableWeekends:Boolean;  //disallow selection of Saturdays or Sundays
	disableDayFn:Function;  //callback function that gets passed a Date object for each day in view. Should return true to disable selection of that day.
	yearRange:any;  //number of years either side (e.g. 10) or array of upper/lower range (e.g. [1900,2015])
	showWeekNumber:Boolean;  //show the ISO week number at the head of the row (default false)
	isRTL:Boolean;  //reverse the calendar for right-to-left languages
	i18n:any;  //language defaults for month and weekday names (see internationalization below)
	yearSuffix:string;  //additional text to append to the year in the title
	showMonthAfterYear:Boolean;  //render the month after year in the title (default false)
	numberOfMonths:Number;  //number of visible calendars
	mainCalendar:any;  //when numberOfMonths is used, this will help you to choose where the main calendar will be (default left, can be set to right). Only used for the first display or when a selected date is not already visible
	theme:string;  //define a classname that can be used as a hook for styling different themes, see theme example (default null)
	showTime:Boolean;
	showSeconds:Boolean;
	use24hour:Boolean;
	onSelect:Function;  //callback function for when a date is selected
	onOpen:Function; //callback function for when the picker becomes visible
	onClose:Function; //callback function for when the picker is hidden
	onDraw:Function; //callback function for when the picker draws a new month
}

declare var pikaday: Pikaday;

declare module "pikaday" {

    export = pikaday;

}
