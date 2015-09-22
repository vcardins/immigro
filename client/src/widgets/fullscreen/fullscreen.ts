import {inject, customAttribute, bindable} from 'aurelia-framework';
import * as screenfull from 'screenfull';

@customAttribute('toggle-fullscreen')
@inject(Element)
export class ToogleFullscreen {
  @bindable iconOn;
  @bindable iconOff;
  constructor(element:Element) {
    this.element = element;
  }

  attached() {
    if (screenfull.enabled) {
      this.element.addEventListener('click', this.handleClick.bind(this), false);
    }else{
      this.element.outerHTML = '';
      //this.element.parentElement.removeChild(this.element);
    }
  }

  handleClick(e:Event) {
    e.preventDefault();
    screenfull.toggle();
    // Switch icon indicator
    let icons = this.element.getElementsByTagName('i')[0].classList;
    if (screenfull.isFullscreen) {
      icons.remove(this.iconOn);
      icons.add(this.iconOff);
    } else {
      icons.remove(this.iconOff);
      icons.add(this.iconOn);
    }
  }

}
