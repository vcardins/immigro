import { autoinject } from 'aurelia-framework';
import { Logger, AuthService } from "core/Services";
import { IApplicationSettings } from "core/Settings";
import { Router, Redirect } from 'aurelia-router';

@autoinject
export class ErrorInterceptor {

    constructor(private authService: AuthService,
                private router:Router,
                private appSettings:IApplicationSettings,
                private logger:Logger) {
    }

    responseError(error) {

        let err:any = { message:'', title:''};
        if (error.statusCode == 401) {
          err.message = error.content ? error.content.message : '';
          err.title = `(${error.statusCode}) ${error.statusText}`;
          this.router.navigate(this.appSettings.loginRoute);
        } else {
          if (error.content.error == 'E_VALIDATION') {
              err.title = `Validation Error`;
              for(let e in error.content.invalidAttributes) {
                  let attr = error.content.invalidAttributes[e];
                  for(let a in attr) {
                      err.message += attr[a].message + '<br>';
                  }
              }
          }
        }
        if (err.message.length) {
          this.logger.error(err);
        }

        return new Promise((response,reject)=>{
          reject({ error:err.message);
        });
    }

}
