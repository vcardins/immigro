import { autoinject, customElement, bindable } from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';
import { ContactModel } from './ContactModel';
import { ContactService } from './ContactService';
import { ContactSelected, ContactUpdated, ContactViewed } from './Messages';

@autoinject
@customElement('contacts-list')
export class ContactsList {
  
  heading = 'Contact List';
  contacts:ContactModel[];
  private selectedId:string;
  
  constructor(private ea:EventAggregator, private contactService:ContactService){
    this.contactService = contactService;
    this.ea = ea;    
    this.load(); 
  }
  
  load() {
    
    let self = this;
    this.ea.subscribe(ContactViewed, msg => this.select(msg.contact));
    this.ea.subscribe(ContactUpdated, msg => {
      let id = msg.contact.id;
      let found = this.contacts.filter(x => x.id == id)[0];
      if (found) {
        Object.assign(found, msg.contact);  
      }else{
        this.contacts.push(new ContactModel(msg.contact));
      }      
    });   
    
    let parameters = { limit: 0, sort: 'name DESC' };
    return self.contactService.load(parameters).then(r => { 
        return self.contacts = r;
      });     
  }
  
  // activate() {
  //   this.load()   
  // }
  
  select(contact:ContactModel){
    this.selectedId = contact.id;
    this.ea.publish(new ContactSelected(contact));
    return true;
  }
  
}