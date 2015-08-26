import { autoinject, Aurelia } from 'aurelia-framework';
import { AuthResult, AuthenticationProvider } from 'core/Providers'
import { Router } from 'aurelia-router';
import AppRouterConfig from './app.router.config';

@autoinject
export class Splash {

  constructor(private aurelia:Aurelia, private appRouterConfig: AppRouterConfig, private authProvider:AuthenticationProvider) {
    this.authProvider = authProvider;
    this.appRouterConfig = appRouterConfig;
    this.aurelia = aurelia;
    //let authProvider = aurelia.container.get(AuthenticationProvider);
    //appSettings.configure(config);
  }

  activate(){
    this.appRouterConfig.configure();
    let isAuth = this.authProvider.isAuthenticated;
    this.aurelia.setRoot(isAuth ? 'app': 'public');
  }
}
