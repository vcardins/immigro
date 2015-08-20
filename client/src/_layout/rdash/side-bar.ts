import { bindable, autoinject } from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';
import { AuthResult, AuthenticationProvider } from 'core/Providers'

@autoinject
export class SideBar {
    
  heading:string;    
  parent:any;
  ENTER:number  = 13;
  searchValue:string;
  
  @bindable public router:any = null;
  
  constructor(private authProvider:AuthenticationProvider, public ea:EventAggregator){   	
    this.heading = 'Aurelia';    
    this.authProvider = authProvider;
    this.ea = ea;
  }
    
  bind( bindingContext ) {
      this.parent = bindingContext;      
  }

  toggleSidebar() {
    this.parent.sidebarCls = this.parent.sidebarCls == 'open' ? '' : 'open';
  }
  
  search(e:KeyboardEvent) {
    if (e && e.keyCode !== this.ENTER) {
      return true;   
    } 
  }
  
  logout():Promise<void>{	
      return this.authProvider.logout().then(response=>{
          this.ea.publish('auth:logout:success', response);                 
        });
    }  
}