import { autoinject } from 'aurelia-framework';
import { AuthService } from "core/Services";
import { IApplicationSettings } from 'core/Settings';

@autoinject
export class AuthenticationInterceptor {

    constructor(
        private authService: AuthService,
        private appSettings:IApplicationSettings
      ) {
        this.authService = authService;
        this.appSettings = appSettings;
    }

    request(config:any) {
      //console.log('AuthenticationInterceptor => Data', data);
    }
}
