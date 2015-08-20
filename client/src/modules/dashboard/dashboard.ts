import { autoinject } from 'aurelia-framework';
import { computedFrom, bindable } from 'aurelia-framework';
import { Logger } from 'core/Services';
import { AuthorService } from '../home/AuthorService';

export class User {
  public firstName = 'John';
  public lastName = 'Doe';

  //Getters can't be observed with Object.observe, so they must be dirty checked.
  //However, if you tell Aurelia the dependencies, it no longer needs to dirty check the property.
  //To optimize by declaring the properties that this getter is computed from, uncomment the line below.
  @computedFrom('firstName', 'lastName')
  get fullName(){
    return `${this.firstName} ${this.lastName}`;
  }
}

@autoinject
export class Dashboard{
  public heading = 'Welcome to Immigro';
  
  @bindable
  public user = new User();
  public previousValue = this.user.fullName;  
  currentDate:Date;
  netWorth:number; 
  authors:any;
  
  constructor(private authorService:AuthorService, private logger:Logger) {
    this.logger = logger;
    this.update();
    setInterval(() => this.update(), 4000);
    this.currentDate = new Date();
    this.authorService = authorService;
  }

  update() {
    this.netWorth = Math.random() * 1000000000;
  }

  submit(){
    this.previousValue = this.user.fullName;
    this.logger.info({message:`Welcome, ${this.user.fullName}!`, title:'Welcome'});	
  }
  
  activate() {
    let self = this;
    let parameters = { populate: 'books', limit: 0, sort: 'name DESC' };

    return self.authorService.load(parameters).then(r => { 
        return self.authors = r;
      }); 
  }
  
  canDeactivate() {
    if (this.user.fullName !== this.previousValue) {
      return confirm('Are you sure you want to leave?');
    }
  }
}