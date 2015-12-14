import { Router, activationStrategy } from 'aurelia-router';

export class Contacts{

  public heading:string = 'Contacts';

  configureRouter(config:any, router:Router){
    config.map([
			{ route: ['', ':id'],  name: 'contact-details', moduleId: './ContactDetails', nav: false, title:'Contact\'s Details', auth:true, description:'' },
    ]);
  }

  // determineActivationStrategy(){
  //   return activationStrategy.replace;
  // }

}
