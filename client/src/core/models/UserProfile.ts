import { EntityModel, AccessLevel } from 'core/Models';
import { Utils } from 'core/Helpers';

export class UserProfile extends EntityModel{

	id:any = null;
  username:string = null;
  firstName:string = null;
  lastName:string = null;
  address:string = null;
  city:string = null;
  admin:boolean = false;
  accessLevel:AccessLevel = new AccessLevel();
  email:string = null;
  phoneNumber:string = null;
	picture:string = null;

  constructor(model?:any) {
    super();
    if (model) { Utils.merge(this, model); }
  }

  get fullName(){
    return (this.firstName) ? (`${this.firstName}` + (this.lastName ? ' ' + this.lastName : '')) : undefined;
  }

  get displayName(){
    return (this.firstName) ? (`${this.firstName}` + (this.lastName ? ' ' + this.lastName.substring(0,1) : '')) : undefined;
  }
}
