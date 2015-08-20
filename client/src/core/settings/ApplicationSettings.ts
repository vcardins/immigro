import * as Enums from 'core/Enums';
import { Utils } from 'core/helpers/Utils';

export interface IApiSettings {
  url:string;
  prefix:string;
  contentType:string;
  clientId:string;
  clientSecret:string;          
  loginUrl:string;
  signupUrl:string;
  profileUrl:string;
  unlinkUrl:string;
  unlinkMethod:string;
  grantType:  string; 
}

export interface IApplicationSettings {
  title:  string;
  description:  string;
  name: String;
  defaultRoute : string;
  version: string;
  year: number
  lockScreenTimeout:number;
  playSounds : boolean;
  api:IApiSettings; 
  localStorageMode: Enums.LocalStorageTypes,
  authenticationMode: Enums.AuthenticationTypes,  
  authorizationScope:string;
  isInDebugMode: boolean;
	httpInterceptor: boolean;
	loginOnSignup: boolean;
	loginRedirect:string;
	logoutRedirect:string;
	signupRedirect: string;
	loginRoute:string;
	signupRoute:string;
  authHeader:string;
	authToken:string;  
	tokenRoot: string;
	tokenName:string;
	tokenPrefix:string;
	withCredentials: boolean;
	platform:string;
	providers: any; //Object<string, IAuthProvider>;
}

export class ApplicationSettings {
  
  _current:IApplicationSettings;
  env:string;
    
  configure(incomingConfig:any){    
    Utils.merge(this._current, incomingConfig);
    let api = this._current.api; 
    api.loginUrl = Utils.joinUrl(api.url, api.loginUrl);
    api.signupUrl = Utils.joinUrl(api.url, api.signupUrl);
    api.profileUrl = Utils.joinUrl(api.url, api.profileUrl);
    api.unlinkUrl = Utils.joinUrl(api.url, api.unlinkUrl);
    return this._current;
  };
  
  get instance():IApplicationSettings {
    return this._current;
  };
  
  constructor(){
   
    this.env = (window.location.hostname==='localhost') ? 'dev' : 'production';
    this._current = {      
      title:'',
      description:'',      
      name:'',
      version: '',    
      year: ((new Date()).getFullYear()),
      playSounds:false,
      lockScreenTimeout:1,            
      defaultRoute: '',
      api : {
        url: '/',
        prefix:'',
        contentType: 'application/json',
        grantType:'password',
        clientId: null,
        clientSecret: null,          
        loginUrl: '/login',
        signupUrl: '/signup',
        profileUrl: '/me',
        unlinkUrl: '/auth/unlink/',
        unlinkMethod: 'get',
      },            
      isInDebugMode:false,
      localStorageMode: Enums.LocalStorageTypes.Local,
      authenticationMode: Enums.AuthenticationTypes.Local,
      authorizationScope:'openid',
      httpInterceptor: true,
      loginOnSignup: true,
      loginRedirect: '',
      logoutRedirect: 'login',
      signupRedirect: 'login',      
      loginRoute: 'login',
      signupRoute: 'signup',
      tokenRoot: '',
      tokenName: 'token',
      tokenPrefix: '',      
      authHeader: 'Authorization',
      authToken: 'Bearer',
      withCredentials: true,
      platform: 'browser',
      providers: {
        google: {
          name: 'google',
          title:'Google',
          url: '/auth/google',
          authorizationEndpoint: 'https://accounts.google.com/o/oauth2/auth',
          redirectUri: window.location.origin || window.location.protocol + '//' + window.location.host,
          scope: ['profile', 'email'],
          scopePrefix: 'openid',
          scopeDelimiter: ' ',
          requiredUrlParams: ['scope'],
          optionalUrlParams: ['display'],
          display: 'popup',
          type: '2.0',          
          popupOptions: { width: 452, height: 633 }
        },
        facebook: {
          name: 'facebook',
          title:'Facebook',
          url: '/auth/facebook',
          authorizationEndpoint: 'https://www.facebook.com/v2.3/dialog/oauth',
          redirectUri: window.location.origin + '/' || window.location.protocol + '//' + window.location.host + '/',
          scope: ['email'],
          scopeDelimiter: ',',
          nonce: function() {
            return Math.random();
          },
          requiredUrlParams: ['nonce','display', 'scope'],
          display: 'popup',
          type: '2.0',
          popupOptions: { width: 580, height: 400 }
        },
        linkedin: {
          name: 'linkedin',
          title:'Linkedin',
          url: '/auth/linkedin',
          authorizationEndpoint: 'https://www.linkedin.com/uas/oauth2/authorization',
          redirectUri: window.location.origin || window.location.protocol + '//' + window.location.host,
          requiredUrlParams: ['state'],
          scope: ['r_emailaddress'],
          scopeDelimiter: ' ',
          state: 'STATE',
          type: '2.0',
          popupOptions: { width: 527, height: 582 }
        },
        github: {
          name: 'github',
          title:'GitHub',
          url: '/auth/github',
          authorizationEndpoint: 'https://github.com/login/oauth/authorize',
          redirectUri: window.location.origin || window.location.protocol + '//' + window.location.host,
          optionalUrlParams: ['scope'],
          scope: ['user:email'],
          scopeDelimiter: ' ',
          type: '2.0',
          popupOptions: { width: 1020, height: 618 }
        },
        yahoo: {
          name: 'yahoo',
          title:'Yahoo',
          url: '/auth/yahoo',
          authorizationEndpoint: 'https://api.login.yahoo.com/oauth2/request_auth',
          redirectUri: window.location.origin || window.location.protocol + '//' + window.location.host,
          scope: [],
          scopeDelimiter: ',',
          type: '2.0',
          popupOptions: { width: 559, height: 519 }
        },
        twitter: {
          name: 'twitter',
          title:'Twitter',
          url: '/auth/twitter',
          authorizationEndpoint: 'https://api.twitter.com/oauth/authenticate',
          type: '1.0',
          popupOptions: { width: 495, height: 645 }
        },
        live: {
          name: 'live',
          title:'Microsoft Live',
          url: '/auth/live',
          authorizationEndpoint: 'https://login.live.com/oauth20_authorize.srf',
          redirectUri: window.location.origin || window.location.protocol + '//' + window.location.host,
          scope: ['wl.emails'],
          scopeDelimiter: ' ',
          requiredUrlParams: ['display', 'scope'],
          display: 'popup',
          type: '2.0',
          popupOptions: { width: 500, height: 560 }
        }
      }
    };
  }
}