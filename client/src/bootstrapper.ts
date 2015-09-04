import { autoinject, Aurelia } from 'aurelia-framework';
import { AuthResult, AuthenticationProvider } from 'core/Providers'
import { Router } from 'aurelia-router';
import AppRouterConfig from './app.router.config';

@autoinject
export class Bootstrapper {

  constructor(private aurelia:Aurelia, private appRouterConfig: AppRouterConfig, private authProvider:AuthenticationProvider) {
    let isAuth = this.authProvider.isAuthenticated;
    this.appRouterConfig.configure();
    this.aurelia.setRoot(isAuth ? 'app': 'public');
  }

}
