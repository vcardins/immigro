import { autoinject } from 'aurelia-framework';
import { AuthService } from "core/Services"

@autoinject
export class ErrorInterceptor {
    authService: AuthService;

    constructor(authService: AuthService) {
        this.authService = authService;
    }

    responseError(error) {
        console.log('AuthenticationInterceptor => Error', error);
    }
}
