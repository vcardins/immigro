import { autoinject } from 'aurelia-framework';
import { HttpClient, RequestBuilder } from 'aurelia-http-client';
import { Router } from 'aurelia-router';
import { AuthService } from 'core/Services';
import { AuthenticationInterceptor, ErrorInterceptor } from 'core/Interceptors';
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

      let withToken = (internalAuth = true, identifier = undefined) => {
          return (client, processor, message) => {
              let token = (internalAuth ? this.authService.token : this.authService.customToken(identifier));
              if (internalAuth) {
                  let interceptor = new AuthenticationInterceptor(this.authService, this.appSettings);
                  message.interceptors = message.interceptors || [];
                  message.interceptors.unshift(interceptor);
              }
              if (this.appSettings.authHeader && this.appSettings.authToken) {
                let token = `${this.appSettings.authToken} ${this.authService.token}`;
                message.headers.add(this.appSettings.authHeader, token);
              }
          };
      }
      RequestBuilder.addHelper('withToken', withToken);

      let handleError = () => {
        return (client, processor, message) => {
          message.interceptors = message.interceptors || [];
          let interceptor = new ErrorInterceptor(this.authService, this.router, this.appSettings, this.logger);
          message.interceptors.unshift(interceptor);
        };
      }
      RequestBuilder.addHelper('handleError', handleError);
      this.http.configure(x => { x.handleError(); });

    }

}
