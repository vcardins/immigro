import { AuthResult, AuthService } from 'core/Services';
import { autoinject } from 'aurelia-framework';

@autoinject
export class AuthFilterValueConverter  {
    userLevel:any;
    constructor(private authService:AuthService) {
      this.userLevel = this.authService.accessLevel;
    }

    toView(routes){
      return routes.filter(r => r.config.access.bitMask & this.userLevel.bitMask);
    }
}
