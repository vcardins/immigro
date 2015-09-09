import { EntityModel } from 'core/Models';
         
export class AuthorModel extends EntityModel{
	_id:string;  
  name:string;
  description:string;
  
  constructor(model?:AuthorModel) {
    super();
    if (model) { Object.assign(this, model);  }
  }
}
