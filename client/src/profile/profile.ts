import { autoinject } from 'aurelia-framework';
import { AuthService, UserService } from 'core/Services'
import { UserProfile } from 'core/Models';
import { Logger } from 'core/Services';

@autoinject
export class Profile{

	profile:UserProfile;
	heading:string = 'Profile';

	constructor(private authService:AuthService, private userService:UserService, private logger:Logger){
	};

	activate(){
		return this.userService.getProfile().then(data=>{
			this.profile = data;
		});
	}

	update():Promise<void>{
		return this.userService.updateProfile(this.profile).then(response=>{
			this.logger.success('Profile successfully updated');
		})
		.catch(err=>{
			this.logger.error(err.message);
		});
	};

	link(provider:any){
		return this.authService.authenticate(provider, true, null)
		/*.then((response)=>{
			console.log("auth response " + response);
			return this.auth.getMe();
		})*/
		.then(()=> this.userService.getProfile())
		.then(data=>{
			this.profile = data;
		});;
	}

	unlink(provider:any){
		return this.authService.unlinkProvider(provider)
		/*.then((response)=>{
			console.log("auth response " + response);
			return this.auth.getMe();
		})*/
		.then(()=> this.authService.user)
		.then(data=>{
			this.profile = data;
		});;
	}

	email='';
	password='';

}
