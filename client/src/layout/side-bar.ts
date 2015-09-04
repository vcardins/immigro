import { Aurelia, bindable, autoinject } from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';
import { AuthResult, AuthenticationProvider } from 'core/Providers'
//import { Router } from 'aurelia-router';

@autoinject
export class SideBar {

  heading:string;
  parent:any;
  ENTER:number  = 13;
  searchValue:string;

  @bindable public router:any = null;

  constructor(private authProvider:AuthenticationProvider, public ea:EventAggregator, private aurelia:Aurelia){
    this.heading = 'Aurelia';
  }

  bind( bindingContext:any ) {
      this.parent = bindingContext;
  }

  toggleSidebar():void {
    this.parent.sidebarCls = this.parent.sidebarCls == 'open' ? '' : 'open';
  }

  search(e:KeyboardEvent) {
    if (e && e.keyCode !== this.ENTER) {
      return true;
    }
  }

  logout():Promise<void>{
      return this.authProvider.logout().then(response=>{
          this.aurelia.setRoot('public').then(() => {
            this.router.navigate('login');
            //this.ea.publish('auth:logout:success', response);
          });
        });
    }
}
