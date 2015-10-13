import { EntityModel } from 'core/Models';
import { Validation } from 'aurelia-validation';

export class StateModel {
  abbreviation:string = null;
  name:string = null;
}

export class ContactModel extends EntityModel{

	id:any = null;
  firstName:string = null;
  lastName:string = null;
  gender:string = null;
  address:string = null;
  city:string = null;
  state:StateModel = new StateModel();
  email:string = null;
  phoneNumber:string = null;
  dob:Date = null;
  validation:Validation;

  constructor(model?:ContactModel) {
    super();
    if (model) { Object.assign(this, model);  }
  }

  get fullName(){
    return (this.firstName) ? (`${this.firstName}` + (this.lastName ? ' ' + this.lastName : '')) : undefined;
  }
}
