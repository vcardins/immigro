import { Aurelia, autoinject } from 'aurelia-framework';
import { Router, Redirect } from 'aurelia-router';
import { AuthenticationProvider } from 'core/Providers'
import { IApplicationSettings, ApplicationSettings } from 'core/Settings';
import { Logger } from 'core/Services';
import { userRoles, accessLevels } from './access';

/**
 * Perform access verification before allowing routing
 */
@autoinject
export class AuthorizeStep {

  private appSettings:IApplicationSettings;
  private accessLevel:any;

  constructor(private authProvider:AuthenticationProvider, appSettings: ApplicationSettings, private logger:Logger){
    this.appSettings = appSettings.instance;
  }

  /**
   * Validate user permissions and allow/deny access to routes
   * @param  {[type]}   routingContext [description]
   * @param  {Function} next           [description]
   * @return {[type]}                  [description]
   */
  run(routingContext, next) {

    let isAuthenticated = this.authProvider.isAuthenticated;
    let route = routingContext.nextInstruction.config;
    let level = this.authProvider.accessLevel;
    let routeBitMask = route.access ? route.access.bitMask : accessLevels.public.bitMask;

    if (!isAuthenticated && (routeBitMask > level.bitMask)) {
      return next.cancel(new Redirect(this.appSettings.loginRoute));
    }

    if ( ((route.name == this.appSettings.loginRoute) && isAuthenticated) || !(routeBitMask & level.bitMask) ) {
      this.logger.error('Sorry, you don\'t have access to this module.');
      return next.cancel(new Redirect(this.appSettings.defaultRoute));
    }
    if (routingContext.nextInstructions.some(i => i.config.auth) && !isAuthenticated) {
      return next.cancel(new Redirect(this.appSettings.loginRoute));
    }
    return next();
  }

}
