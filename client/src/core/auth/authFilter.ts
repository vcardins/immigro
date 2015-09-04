import { AuthResult, AuthenticationProvider } from 'core/Providers';
import { autoinject } from 'aurelia-framework';

@autoinject
export class AuthFilterValueConverter  {
    userLevel:any;
    constructor(private authProvider:AuthenticationProvider) {
      this.userLevel = this.authProvider.accessLevel;
    }

    toView(routes){
      return routes.filter(r => r.config.access.bitMask & this.userLevel.bitMask);
    }
}
