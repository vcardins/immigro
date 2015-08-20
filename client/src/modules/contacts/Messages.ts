import { autoinject, bindable } from 'aurelia-framework';
import { ContactModel } from './ContactModel';

@autoinject
export class ContactSelected {
  constructor(private contact:ContactModel){
    this.contact = contact;
  }
}

@autoinject
export class ContactUpdated { 
  constructor(private contact:ContactModel){
    this.contact = contact;
  }
}

@autoinject
export class ContactViewed {
  constructor(private contact:ContactModel){
    this.contact = contact;
  }
}
