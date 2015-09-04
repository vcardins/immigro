import { Aurelia, autoinject } from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';
import { AuthenticationProvider } from 'core/Providers'
import { IApplicationSettings, ApplicationSettings } from 'core/Settings';
import { Router } from 'aurelia-router';

@autoinject
export class Login{

	heading:string = 'Login';
	identifier:string='';
	password:string='';
	private appSettings:IApplicationSettings;
	public providers:Array<any> = [];
	public signupUrl:string;

	constructor(
		appSettings:ApplicationSettings,
		public ea:EventAggregator,
		private authProvider:AuthenticationProvider,
		private aurelia:Aurelia,
		private router:Router){

		this.appSettings = appSettings.instance;
		this.signupUrl = this.appSettings.api.signupUrl;
	
		for (let key in this.appSettings.providers) {
			let p = this.appSettings.providers[key];
			this.providers.push({name:p.name, title:p.title});
		}
	};

	login():Promise<void>{
		return this.authProvider.login(this.identifier, this.password).then(response=>{
				this.aurelia.setRoot('app').then(() => {
					//this.ea.publish('auth:login:success', response);
					this.router.navigate('');
				});
			})
			.catch(err=>{
				this.ea.publish('auth:login:fail', err);
			});
	}

	authenticate(name:string):Promise<void> {
		return this.authProvider.authenticate(name, false, null).then((response)=>{
					console.log("auth response " + response);
				});
	}
}
