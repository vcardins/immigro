import { autoinject } from 'aurelia-framework';
import { AuthenticationProvider } from "core/Providers"

@autoinject
export class ErrorInterceptor {
    authProvider: AuthenticationProvider;
    
    constructor(authProvider: AuthenticationProvider) {
        this.authProvider = authProvider;
    }

    responseError(error) {
        console.log('AuthenticationInterceptor => Error', error);
    }
}