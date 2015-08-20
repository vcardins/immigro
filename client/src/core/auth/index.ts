import { Aurelia } from 'aurelia-framework';
import { RequestBuilder } from 'aurelia-http-client';
import { HttpClientExtensions } from 'core/Helpers'

// import { AuthenticationProvider } from 'core/Providers'
// import { AuthenticationInterceptor } from 'core/Interceptors'

export function configure(aurelia:Aurelia){
	let httpClientExtensions = aurelia.container.get(HttpClientExtensions);
	httpClientExtensions.configure();
	aurelia.globalResources('authFilter');			
};