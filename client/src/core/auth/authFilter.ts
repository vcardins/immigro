import { AuthResult, AuthService } from 'core/Services';
import { autoinject } from 'aurelia-framework';

@autoinject
export class AuthFilterValueConverter  {

    constructor(private authService:AuthService) {}

    toView(routes){
      return routes.filter(r => this.authService.isAuthorized(r.config.access));
    }
    
}
