import { autoinject } from 'aurelia-framework';
import { HttpClient, RequestBuilder } from 'aurelia-http-client';
import { Router } from 'aurelia-router';
import { AuthenticationProvider } from 'core/Providers'
import { AuthenticationInterceptor } from 'core/Interceptors'
import { IApplicationSettings, ApplicationSettings } from 'core/Settings';
import { Logger } from 'core/Services';

@autoinject
export class HttpClientExtensions {
    requestBuilder:any = null;
    private appSettings:IApplicationSettings;

    constructor(appSettings: ApplicationSettings,
                private authProvider: AuthenticationProvider,
                private http:HttpClient,
                private router:Router,
                private logger:Logger) {
        this.authProvider = authProvider;
        this.appSettings = appSettings.instance;
        this.http = http;
        this.logger = logger;
        this.router = router;
    }

    configure() {

      RequestBuilder.addHelper('authTokenHandling', (internalAuth:boolean = true, identifier:any = undefined)=>{
  			return (client, processor, message)=>{
  				if (this.appSettings.httpInterceptor) {
            //this.authProvider.isAuthenticated &&
            if (internalAuth) {
                message.interceptors = message.interceptors || [];
                message.interceptors.unshift(new AuthenticationInterceptor(this.authProvider, this.router, this.appSettings, this.logger));
            }
  					if (this.appSettings.authHeader && this.appSettings.authToken) {
  						let token = this.appSettings.authToken + ' ' + this.authProvider.token;
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
