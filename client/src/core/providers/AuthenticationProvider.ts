import { autoinject } from 'aurelia-framework';
import { HttpClient } from 'aurelia-http-client';
import { IApplicationSettings, ApplicationSettings } from 'core/Settings';
import * as Enums from 'core/Enums';
import { OAuthService, OpenIdService } from 'core/Services';
import { LocalStorageProvider } from 'core/providers/LocalStorageProvider';


export class AuthResult {
    success: boolean = false;
    redirect:string;
    errorText: string = '';
    userInfo:any = null;
}

@autoinject
export class AuthenticationProvider {

    private isAuth: boolean = false;    
    private tokenName:string;
    private userInfoKey:string;
    private appSettings:IApplicationSettings;
    
    constructor(appSettings: ApplicationSettings, private localStorageProvider: LocalStorageProvider, 
        private httpClient:HttpClient, private oAuthService: OAuthService, private openIdService: OpenIdService) {
        this.appSettings = appSettings.instance;
        this.localStorageProvider = localStorageProvider;
        this.oAuthService = oAuthService;
        this.openIdService = openIdService;
        this.httpClient = httpClient;
        
        this.tokenName = (this.appSettings.tokenPrefix ? `${this.appSettings.tokenPrefix}_` : '') + this.appSettings.tokenName;
        this.userInfoKey = (this.appSettings.tokenPrefix ? `${this.appSettings.tokenPrefix}_` : '') + 'user' ;        
    }

    get isAuthenticated(): boolean {        
        return !!this.token;
    }

    login(identifier: string, password: string, authMode?:Enums.AuthenticationTypes): Promise<AuthResult> {
        let self = this;
        let authResult = new AuthResult();
        let promise: Promise<AuthResult> = null;
        authMode = authMode || self.appSettings.authenticationMode;
         
        switch (self.appSettings.authenticationMode) {
            case Enums.AuthenticationTypes.OpenId:
                {
                    promise = new Promise<AuthResult>((resolve, reject) => {
                        self.openIdService.requestAccessToken(identifier, password).then(result => {
                            authResult.success = result.success;
                            authResult.errorText = result.errorText;
                            self.isAuth = authResult.success;
                            if (authResult.success) {
                                self.setToken(result.token);
                            }                            
                            resolve(authResult); 
                        }).catch(error => {                            
                            authResult.success = false;
                            authResult.errorText = error.errorText;
                            reject(authResult);
                        });
                    });
                    break;
                }
            case Enums.AuthenticationTypes.OAuth:
                {
                    authResult.errorText = "Not yet implemented";
                    promise = new Promise<AuthResult>((resolve) => {
                        resolve(authResult);
                    });
                    break;
                }
            case Enums.AuthenticationTypes.Local:
                {
                    promise = new Promise<AuthResult>((resolve, reject) => {
                        self.httpClient.post(self.appSettings.api.loginUrl, {'identifier': identifier, 'password':password}).then(result => {
                            authResult.success = self.isAuth = result.isSuccess;
                            if (authResult.success) {
                                self.setToken(result.content.token);
                                self.setUser(result.content.user);
                                authResult.redirect = self.appSettings.loginRedirect;
                                authResult.userInfo = self.user;
                            }                                                  
                            resolve(authResult); 
                        }).catch(error => {             
                            authResult.success = false;
                            authResult.errorText = error.content.message;
                            reject(authResult);
                        });
                    });
                    break;
                }                
            default:
                {
                    var defaultErrorText = 'Warning: Authentication mode not supported. Check ApplicationSettings';
                    console.error(defaultErrorText);
                    authResult.errorText = defaultErrorText;
                    promise = new Promise<AuthResult>((resolve) => {
                        resolve(authResult);
                    });
                }
        }        
        return promise;
    }
  
    signup(data:any): Promise<AuthResult> {
        let self = this;
        let authResult = new AuthResult();
        return new Promise<AuthResult>((resolve, reject) => {
                self.httpClient.post(self.appSettings.api.signupUrl, data).then(result => {
                    authResult.success = self.isAuth = result.isSuccess;
                    if (authResult.success) {
                        self.setToken(result.content.token);
                        self.setUser(result.content.user);
                        authResult.redirect = self.appSettings.loginRedirect;
                        authResult.userInfo = self.user;
                    }                                                  
                    resolve(authResult); 
                }).catch(error => {             
                    authResult.success = false;
                    authResult.errorText = error.content.message;
                    reject(authResult);
                });
            });        
    }
      
    authenticate(name:string, redirect:any, userData:any): Promise<AuthResult> {
         let authResult = new AuthResult();
         return new Promise<AuthResult>((resolve) => {
            resolve(authResult);
         });
                
		// let provider:OAuth; 		
		// provider = (this.config.providers[name].type === '1.0') ? this.oAuth1 : this.oAuth2;
		
		// return provider.open(this.config.providers[name], userData || {}).then((response) => {
		// 	this.auth.setToken(response, redirect);
		// 	return response;
		// })
		// .catch((error)=> {
		// 	console.log("auth problem");
		// 	throw error;
		// });
	};
         
    setToken(token: string): void {
        this.localStorageProvider.set(this.tokenName, token);
    }
    
    setUser(u: any): void {
        let val = {
                id:u.id,
                admin:u.admin,
                email:u.email,
                firstName:u.firstName,
                lastName:u.lastName,
                username:u.username,
                fullName: `${u.firstName} ${u.lastName}`
            };
        this.localStorageProvider.set(this.userInfoKey, JSON.stringify(val));
    }
    
    get token(): string {
        return this.localStorageProvider.get(this.tokenName);
    }
    
    get user(): any {
        return JSON.parse(this.localStorageProvider.get(this.userInfoKey));
    }
    
    getProfile():Promise<any> {
        let user = this.localStorageProvider.get(this.userInfoKey);
        return new Promise<any>((resolve) => {
            resolve(JSON.parse(user));
        });
    }
    
    updateProfile(data:any):Promise<void> {
        return null;
    }
        
    unlinkProvider(name:string):Promise<void> {
        return null;
    }
                
    logout():Promise<AuthResult> {
        return new Promise<AuthResult>((resolve) => {
            this.clearToken();
            let authResult = new AuthResult();
            authResult.redirect = this.appSettings.logoutRedirect;
            authResult.success = false;
            resolve(authResult);            
        });               
    }
        
    clearToken(): void {
        this.localStorageProvider.remove(this.tokenName);
        this.localStorageProvider.remove(this.userInfoKey);
    }
}
