import { Utils } from 'core/helpers/Utils';

let configBase = {
	title: 'Immigro',
	description: 'Starting here a better life',
	name: 'immigro',
	defaultRoute:'dashboard',
	version:'0.0.1',
	tokenPrefix: 'immigro',
	api : {
		url: '/',
		clientId:'immigro',
		clientSecret:'#$%ˆ&**()*()*)_)'
	}
};

let configForDevelopment = {
	api : { url: 'http://localhost:1340/' },
	signalR : { url: 'http://localhost:1340/', logging :true },
	isInDebugMode: true,
	providers: {
		google: {
			clientId: '239531826023-ibk10mb9p7ull54j55a61og5lvnjrff6.apps.googleusercontent.com'
		}
		,
		linkedin:{
			clientId:'778mif8zyqbei7'
		},
		facebook:{
			clientId:'1452782111708498'
		}
	}
};

let configForProduction = {
	api : { url: 'http://localhost:9999/' },
	signalR : { url: 'http://localhost:1340/', logging :false },
	isInDebugMode: false,
	providers: {
		google: {
			clientId: '239531826023-3ludu3934rmcra3oqscc1gid3l9o497i.apps.googleusercontent.com'
		}
		,
		linkedin:{
			clientId:'7561959vdub4x1'
		},
		facebook:{
			clientId:'1653908914832509'
		}

	}
};

let configEnv = (window.location.hostname==='localhost' ? configForDevelopment : configForProduction);
const config:any = Utils.merge(configBase, configEnv);

export { config as default };
