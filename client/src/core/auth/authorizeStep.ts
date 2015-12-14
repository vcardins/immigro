import { Aurelia, autoinject } from 'aurelia-framework';
import { Router, Redirect } from 'aurelia-router';
import { AuthService } from 'core/Services'
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

  constructor(private authService:AuthService, appSettings: ApplicationSettings, private logger:Logger){
    this.appSettings = appSettings.instance;
  }

  /**
   * Validate user permissions and allow/deny access to routes
   * @param  {[type]}   routingContext [description]
   * @param  {Function} next           [description]
   * @return {[type]}                  [description]
   */
  run(routingContext:any, next:any) {

    let isAuthenticated = this.authService.isAuthenticated;
    let route = routingContext.config;
    let userAccessLevel = this.authService.accessLevel;
    let routeBitMask = route.access ? route.access.bitMask : accessLevels.public.bitMask;

    if (!isAuthenticated && (routeBitMask > userAccessLevel.bitMask)) {
      return next.cancel(new Redirect(this.appSettings.loginRoute));
    }

    if ( ((route.name == this.appSettings.loginRoute) && isAuthenticated) || (routeBitMask > userAccessLevel.bitMask) ) {
      this.logger.error('Sorry, you don\'t have access to this module.');
      return next.cancel(new Redirect(this.appSettings.defaultRoute));
    }

    if (routingContext.getAllInstructions().some(i => i.config.auth) && !isAuthenticated) {
      return next.cancel(new Redirect(this.appSettings.loginRoute));
    }

    return next();
  }

}
