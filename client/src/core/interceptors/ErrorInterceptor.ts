import { autoinject } from 'aurelia-framework';
import { Logger, AuthService } from "core/Services";
import { Router, Redirect } from 'aurelia-router';

@autoinject
export class ErrorInterceptor {

    constructor(private authService: AuthService,
                private router:Router,
                private appSettings:IApplicationSettings,
                private logger:Loger) {
    }

    responseError(error) {
        if (error.statusCode == 401) {
          let message = error.content ? error.content.message : '';
          this.router.navigate(this.appSettings.loginRoute);
          console.log(message, this.appSettings.loginRoute)
        }
        // let message:string = '';
        // if (error.content.error == 'E_VALIDATION') {
        //     for(let e in error.content.invalidAttributes) {
        //         let attr = error.content.invalidAttributes[e];
        //         for(let a in attr) {
        //             message += attr[a].message + '<br>';
        //         }
        //     }
        // }
        // this.logger.error({message:message, title:`(${error.statusCode}) ${error.statusText}`})
        return;
    }

}
