import { autoinject } from 'aurelia-framework';
import { AuthenticationProvider } from 'core/Providers'
import { UserProfile } from './UserProfile';
import { Logger } from 'core/Services';

@autoinject
export class Profile{

	profile:UserProfile;
	heading:string = 'Profile';

	constructor(private authProvider:AuthenticationProvider, private logger:Logger){
		this.authProvider = authProvider;
		authProvider.getProfile().then(profile=>{
			console.log(profile);
			this.profile = profile;
		});
		this.logger = logger;
	};

	activate(){
		return this.authProvider.getProfile().then(data=>{
			this.profile = data;
		});
	}

	update():Promise<void>{
		return this.authProvider.updateProfile(this.profile).then(response=>{
			this.logger.success('Profile successfully updated');
		})
		.catch(err=>{
			this.logger.error(err.message);
		});
	};

	link(provider:any){
		return this.authProvider.authenticate(provider, true, null)
		/*.then((response)=>{
			console.log("auth response " + response);
			return this.auth.getMe();
		})*/
		.then(()=> this.authProvider.getProfile())
		.then(data=>{
			this.profile = data;
		});;
	}
	unlink(provider:any){
		return this.authProvider.unlinkProvider(provider)
		/*.then((response)=>{
			console.log("auth response " + response);
			return this.auth.getMe();
		})*/
		.then(()=> this.authProvider.user)
		.then(data=>{
			this.profile = data;
		});;
	}
	email='';
	password='';

}
