import { autoinject } from 'aurelia-framework';
import { AuthenticationProvider } from "core/Providers"
import { Logger } from 'core/Services';

@autoinject
export class AuthenticationInterceptor {

    constructor(private authProvider: AuthenticationProvider, private logger:Logger) {
        this.authProvider = authProvider;
        this.logger = logger;
    }

    request(data:any) {
        //console.log('AuthenticationInterceptor => Data', data);        
    }
    
    responseError(error:any) {
        console.log('AuthenticationInterceptor => Error', error);
        let message:string = '';
        if (error.content.error == 'E_VALIDATION') {
            for(let e in error.content.invalidAttributes) {
                let attr = error.content.invalidAttributes[e];
                for(let a in attr) {
                    message += attr[a].message + '<br>';
                }
            }
        }
        this.logger.error({message:message, title:`(${error.statusCode}) ${error.statusText}`})
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