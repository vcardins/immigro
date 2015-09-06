import { autoinject, Aurelia } from 'aurelia-framework';
import { AuthResult, AuthService } from 'core/Services';
import { Router } from 'aurelia-router';
import AppRouterConfig from './app.router.config';

@autoinject
export class Bootstrapper {

  constructor(private aurelia:Aurelia, private appRouterConfig: AppRouterConfig, private authService:AuthService) {
    let isAuth = this.authService.isAuthenticated;
    this.appRouterConfig.configure();
    this.aurelia.setRoot(isAuth ? 'app': 'public');
  }

}
