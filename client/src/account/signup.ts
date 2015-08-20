import { autoinject } from 'aurelia-framework';
import { AuthenticationProvider } from 'core/Providers'
import { EventAggregator } from 'aurelia-event-aggregator';

@autoinject
export class Signup{
	
	heading:string = 'Sign Up';
	email:string='';
	password:string='';
	displayName:string='';
		
	constructor(public ea:EventAggregator, private authProvider:AuthenticationProvider){				
		this.ea = ea;
		this.authProvider = authProvider;
	}

	signup():Promise<void>{	
		let info = {displayName:this.displayName, email:this.email, password:this.password};
		return this.authProvider.signup(info).then(response=>{
				this.ea.publish('auth:signup:success', response);				
			})
			.catch(err=>{
				this.ea.publish('auth:signup:fail', err);				
			});
	}
	
}
