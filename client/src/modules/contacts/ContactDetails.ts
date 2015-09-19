import { autoinject, bindable } from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';
//import { Validation } from 'aurelia-validation';
import { ContactModel } from './ContactModel';
import { ContactService } from './ContactService';
import { ContactSelected, ContactUpdated, ContactViewed } from './Messages';
import { Utils } from 'core/Helpers';
import { Logger } from 'core/Services';

@autoinject
export class ContactDetails {

  heading = 'Contact Details';
  contact:ContactModel;
  files:Array<any> = [];
  private originalContact:ContactModel;
  private selectedId:string;
  private validation:any = { result : {isValid : false} };
  //private validation:Validation;

  constructor(private ea:EventAggregator, private contactService:ContactService, private logger:Logger) { //, private valid:Validation
    this.contactService = contactService;
    this.ea = ea;
    this.validation.result.isValid = true;
    this.logger = logger;
    // this.validation = valid.on(this)
    //     .ensure('contact.firstName').isNotEmpty().hasMinLength(3).hasMaxLength(10)
    //     .ensure('contact.lastName').isNotEmpty().hasMinLength(3).hasMaxLength(10)
    //     .ensure('contact.email').isNotEmpty().isEmail();

    // this.contact.validation = this.validation;
  }

  activate(params:any, config:any):any { //params, config
    if (!params.id) {
      this.contact = this.originalContact = new ContactModel();
      this.contact.setEditMode(true);
      return true;
    }

    return this.contactService.find(params.id).then(contact => {
      this.contact = new ContactModel(contact);
      this.originalContact = new ContactModel(contact);
      this.contact.setEditMode(true);
      config.navModel.setTitle(this.contact.firstName);
      this.ea.publish(new ContactViewed(this.contact));
    });

  }

  save(){
    let isNew = !this.contact.id;

    this.contactService.save(this.contact, this.contact.id).then(contact => {
      this.contact = new ContactModel(contact);
      this.originalContact = new ContactModel(contact);
      this.ea.publish(new ContactUpdated(this.contact));
      this.logger.info('Contact succesfully updated');
      if (this.files.length>0) {
        this.contactService.upload(this.files, null, this.contact.id).then(files => {
          this.files = null;
        }).catch((err) => {
          this.logger.error('Error uploading contact files ' + err);
        });
      }
    }).catch((err) => {
      this.logger.error('Error on updating contact');
    });
  }

  canDeactivate(){
    if (!this.contact.id) { return true; }

    if(!Utils.areEqual(this.originalContact.getOwnProperties(), this.contact.getOwnProperties())){
      let result = confirm('You have unsaved changes. Are you sure you wish to leave?');
      if(!result){
        this.ea.publish(new ContactViewed(this.contact));
      }
      return result;
    }
    return true;
  }

}
