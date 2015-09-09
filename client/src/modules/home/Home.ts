import { bindable, inject, autoinject } from 'aurelia-framework';
import { Logger } from 'core/Services';
import { IApplicationSettings, ApplicationSettings } from 'core/Settings';

@autoinject
export class Home {

  public heading = 'Welcome to the Aurelia App!';
  settings:IApplicationSettings;

  constructor(private logger:Logger, appSettings:ApplicationSettings) {
      this.settings = appSettings.instance;
  }

  activate() {}

}
