import { Aurelia, autoinject } from 'aurelia-framework';
import { Router, Redirect } from 'aurelia-router';
import { AuthenticationProvider } from 'core/Providers'
import { IApplicationSettings, ApplicationSettings } from 'core/Settings';
import { userRoles, accessLevels } from './access';

@autoinject
export class AuthorizeStep {

  private appSettings:IApplicationSettings;

  constructor(private aurelia:Aurelia, private authProvider:AuthenticationProvider, appSettings: ApplicationSettings){
    this.authProvider = authProvider;
    this.appSettings = appSettings.instance;
    this.aurelia = aurelia;

    //aurelia.start().then(a => a.setRoot('public')); //'app', document.body
  }

  run(routingContext, next) {

    //console.log(userRoles, accessLevels);

    if ((routingContext.nextInstruction.config.name == this.appSettings.loginRoute) && this.authProvider.isAuthenticated) {
      return next.cancel(new Redirect(this.appSettings.defaultRoute));
    }
    if (routingContext.nextInstructions.some(i => i.config.auth)) {
      if (!this.authProvider.isAuthenticated) {
        return next.cancel(new Redirect(this.appSettings.loginRoute));
      }
    }
    return next();
  }

}
