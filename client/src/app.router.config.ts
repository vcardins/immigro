import { autoinject } from 'aurelia-framework';
import { Router, RouterConfiguration } from 'aurelia-router';
import { AuthorizeStep, userRoles, accessLevels } from 'core/Auth';

@autoinject
export default class {

	constructor(public router: Router){
		this.router = router;
	}

	configure(){
		if (this.router.isConfigured) { return; }
		let self = this;
		let appRouterConfig:any = ((config:RouterConfiguration) => {
			config.title = 'Aurelia';
			config.options.pushState = true; // <-- this is all you need here
			config.addPipelineStep('authorize', AuthorizeStep); // Add a route filter to the authorize extensibility point.
			config.map([
				{ route: ['','home'], 	   name: 'home',    	 moduleId: 'modules/home/home',       		  nav: false, title:'Home', access: accessLevels.user },
				{ route: 'dashboard', 	   name: 'dashboard',    moduleId: 'modules/dashboard/dashboard',       nav: true, title:'Dashboard', access: accessLevels.user, icon:'dashboard', description:'Welcome to the Aurelia Navigation App' },
				{ route: 'flickr',         name: 'flickr',       moduleId: 'modules/flickr/flickr',             nav: true, title:'Flickr', access: accessLevels.user, icon:'photo', description:'' },
				//{ route: 'maps',           name: 'maps',         moduleId: './modules/maps/maps',                 nav: true, title:'Maps', auth:true, icon:'map-o', description:'Google Maps' },
				{ route: 'child-router',   name: 'child-router', moduleId: './modules/child-router/child-router', nav: true, title:'Child Router', access: accessLevels.user, icon:'cubes', description:'' },
				{ route: 'links',   	   name: 'links', 		 moduleId: 'modules/links/links', 			  nav: true, title:'Links', access: accessLevels.user, icon:'chain', description:'' },
				{ route: 'contacts',  	   name: 'contacts', 	 moduleId: './modules/contacts/contacts', 	      nav: true, title:'Contacts', access: accessLevels.user, icon:'users', description:'' },
				// //{ route: 'converters',     name: 'converters', 	 moduleId: './converters/converters', 	  nav: true, title:'Converters', auth:true, icon:'users', description:'' },
				{ route: 'users',          name: 'users',        moduleId: 'modules/users/users',        		  nav: true, title:'Github Users', access: accessLevels.user, icon:'users', description:''  },
				{ route: 'signup',         name: 'signup', 		 moduleId: 'account/signup',       	  nav: false, title:'Signup', icon:'', description:'pencil-square' },
				{ route: 'login',          name: 'login', 		 moduleId: 'account/login',       	  nav: false, title:'Login', icon:'', description:'' },
				{ route: 'logout',         name: 'logout', 		 moduleId: 'account/logout',       	  nav: false, title:'Logout', icon:'', description:'' },
				{ route: 'profile',        name: 'profile', 	 moduleId: 'account/profile',           nav: true, title:'Profile', icon:'user', description:'', access: accessLevels.user },
				{ route: 'admin',        name: 'admin', 	 moduleId: 'admin/admin',           nav: true, title:'Admin', icon:'user', description:'', access: accessLevels.admin }
  		]);
			config.mapUnknownRoutes(instruction => {
			   self.router.navigate('login');
	    });
		 });
		this.router.configure(appRouterConfig);
	}
}
