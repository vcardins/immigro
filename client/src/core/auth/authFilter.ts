import { autoinject } from 'aurelia-framework';
import { AuthService } from 'core/Services';

@autoinject
export class AuthFilterValueConverter  {

    constructor(private authService:AuthService) {}

    toView(routes){
      return routes.filter(r => this.authService.isAuthorized(r.config.access));
    }

}
