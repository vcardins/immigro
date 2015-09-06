import { autoinject } from 'aurelia-framework';
import { HttpClient, RequestBuilder } from 'aurelia-http-client';
import { Router } from 'aurelia-router';
import { AuthService } from 'core/Services'
import { AuthenticationInterceptor } from 'core/Interceptors'
import { IApplicationSettings, ApplicationSettings } from 'core/Settings';
import { Logger } from 'core/Services';

@autoinject
export class HttpClientExtensions {
    requestBuilder:any = null;
    private appSettings:IApplicationSettings;

    constructor(appSettings: ApplicationSettings,
                private authService: AuthService,
                private http:HttpClient,
                private router:Router,
                private logger:Logger) {
        this.appSettings = appSettings.instance;
    }

    configure() {

      RequestBuilder.addHelper('authTokenHandling', (internalAuth:boolean = true, identifier:any = undefined)=>{
  			return (client, processor, message)=>{
  				if (this.appSettings.httpInterceptor) {
            //this.authService.isAuthenticated &&
            if (internalAuth) {
                message.interceptors = message.interceptors || [];
                message.interceptors.unshift(new AuthenticationInterceptor(this.authService, this.router, this.appSettings, this.logger));
            }
  					if (this.appSettings.authHeader && this.appSettings.authToken) {
  						let token = this.appSettings.authToken + ' ' + this.authService.token;
              message.headers.add(this.appSettings.authHeader, token);
  					}
  				}
  			}
  		});

  		this.http.configure(x => { x.authTokenHandling(); });
    }

    getCustomToken(identifier: string): string {
        return 'Throw new NotImplementedException();';
    }
}
