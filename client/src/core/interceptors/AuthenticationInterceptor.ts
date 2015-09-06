import { autoinject } from 'aurelia-framework';
import { Router, Redirect } from 'aurelia-router';
import { AuthService } from "core/Services";
import { Logger } from 'core/Services';
import { IApplicationSettings } from 'core/Settings';

@autoinject
export class AuthenticationInterceptor {

    constructor(
        private authService: AuthService,
        private router:Router,
        private appSettings:IApplicationSettings,
        private logger:Logger
      ) {
        this.authService = authService;
        this.logger = logger;
        this.router = router;
        this.appSettings = appSettings;
    }

    request(data:any) {
        //console.log('AuthenticationInterceptor => Data', data);
    }

    responseError(error:any) {
        console.log('AuthenticationInterceptor => Error', error, message);
        if (error.statusCode === 401) {
          let message = error.content ? error.content.message : '';
          this.router.navigate(this.appSettings.loginRoute);
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

/*
content: Object
headers: Headers
isSuccess: false
mimeType: "application/json"
requestMessage: HttpRequestMessage
response: "{↵ "error": "E_VALIDATION",↵ "status": 400,↵ "summary": "2 attributes are invalid",↵ "model": "Contact",↵ "invalidAttributes": {↵ "email": [↵ {↵ "rule": "object",↵ "message": "`undefined` should be a object (instead of \"test@test.com\", which is a string)"↵ }↵ ],↵ "phoneNumber": [↵ {↵ "rule": "object",↵ "message": "`undefined` should be a object (instead of \"555 555 5555\", which is a string)"↵ }↵ ]↵ }↵}"
responseType: "json"
reviver: undefined
statusCode: 400
statusText: "Bad Request"
*/
