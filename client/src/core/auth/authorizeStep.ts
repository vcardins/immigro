import { autoinject } from 'aurelia-framework';
import { Router, Redirect } from 'aurelia-router';
import { AuthenticationProvider } from 'core/Providers'
import { IApplicationSettings, ApplicationSettings } from 'core/Settings';

@autoinject
export class AuthorizeStep {

  private appSettings:IApplicationSettings;

  constructor(private authProvider:AuthenticationProvider, appSettings: ApplicationSettings){
    this.authProvider = authProvider;
    this.appSettings = appSettings.instance;
  }

  run(routingContext, next) {
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
