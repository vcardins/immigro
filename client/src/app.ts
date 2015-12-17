import { Aurelia, autoinject, ObserverLocator } from 'aurelia-framework';
import { Router} from 'aurelia-router';
import { EventAggregator } from 'aurelia-event-aggregator';
import { AuthResult, AuthService, SignalRClient } from './core/Services';
import { Logger } from './core/Services';
import AppRouterConfig from './app.router.config';
import Layout from './layout';

@autoinject
export class App {

  public sidebarCls:string;
  private authStatusUpdate:boolean;
  authCls:string;
  activeRoute:string;
  obsLoc:any;
  obsAuth:any;

  constructor(
        private aurelia:Aurelia,
        public router: Router,
        private appRouterConfig: AppRouterConfig,
        private authService:AuthService,
        private ea: EventAggregator,
        public observerLocator: ObserverLocator,
        private logger:Logger,
        private layout:Layout,
        private liveUpdate:SignalRClient
    ) {
    this.router = router;
    this.logger = logger;
    this.appRouterConfig = appRouterConfig;
    this.authService = authService;
    this.ea = ea;
    this.aurelia = aurelia;
    this.layout = layout;
    this.liveUpdate = liveUpdate;
  }

  activate(){
    //this.layout.activate();

    let isAuth = this.authService.isAuthenticated;

    this.sidebarCls = isAuth ? 'open' : '';
    this.authCls = isAuth ? 'auth' : 'anon';

    this.ea.subscribe('router:navigation:complete', (payload:any) => {
        this.activeRoute = payload.instruction.config;
    })

    this.ea.subscribe('auth:login:success', (payload:any) => {
      this.logger.success(`${payload.userInfo.firstName}, welcome to Immigro`);
      this.aurelia.setRoot('app');
      this.authStatusUpdate = payload;
    });

    this.ea.subscribe('auth:login:fail', (payload:any) => {
      this.logger.error({message:payload.errorText || 'An error ocurred trying to login. Please, check if the auth server is up', title: 'Login Failed'});
    });

    this.ea.subscribe('auth:logout:success', (payload:any) => {
      this.aurelia.setRoot('public');
      this.authStatusUpdate = payload;
    });

    this.obsLoc = this.observerLocator.getObserver(this, 'sidebarCls');
    this.obsLoc.subscribe(this.observeSidebarState.bind(this));

    this.obsAuth = this.observerLocator.getObserver(this, 'authStatusUpdate');
    this.obsAuth.subscribe(this.observeAuthStatus.bind(this));

    this.liveUpdate.activate();
  }

  observeSidebarState() {}

  observeAuthStatus(result:AuthResult) {
    if (!result) { return; }
    this.router.navigate(result.redirect);
    this.sidebarCls = result.success ? 'open' : '';
    this.authCls = result.success ? 'auth' : 'anon';
  }

  attached() {
    this.onWindowResize = this.onWindowResize.bind(this);
    window.addEventListener('resize', this.onWindowResize, false);
    this.onWindowResize();
  }

  dettached() {
    this.obsLoc.unsubscribe();
    this.obsAuth.unsubscribe();
    window.removeEventListener('resize', this.onWindowResize, false);
  }

  onWindowResize() {
    this.sidebarCls = (window.innerWidth <= 600) ? '' : 'open'; //&& this.sidebarCls == 'open'
  }

}
