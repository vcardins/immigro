import { autoinject } from 'aurelia-framework';
import { AuthService } from 'core/Services';
import { EventAggregator } from 'aurelia-event-aggregator';

@autoinject
export class Signup{

	heading:string = 'Sign Up';
	email:string='';
	password:string='';
	displayName:string='';

	constructor(public ea:EventAggregator, private authService:AuthService){
		this.ea = ea;
		this.authService = authService;
	}

	signup():Promise<void>{
		let info = {displayName:this.displayName, email:this.email, password:this.password};
		return this.authService.signup(info).then(response=>{
				this.ea.publish('auth:signup:success', response);
			})
			.catch(err=>{
				this.ea.publish('auth:signup:fail', err);
			});
	}

}
