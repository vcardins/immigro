import { autoinject } from 'aurelia-framework';
import { AuthService } from "core/Services";
import { IApplicationSettings } from 'core/Settings';

@autoinject
export class SocketInterceptor {
  
    private appSettings:IApplicationSettings
    constructor(
        private authService: AuthService,
        private appSettings:IApplicationSettings
      ) {
        this.authService = authService;
        this.appSettings = appSettings.instance;
    }

    request(config:any) {
      let token:string = '';
      if (this.appSettings.authHeader && this.appSettings.authToken) {
        token = `${this.appSettings.authToken} ${this.authService.token}`;
        config.data.token = token;
        config.headers.add(this.appSettings.authHeader, token);
      }
      return config;
    }

}
