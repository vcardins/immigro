//https://github.com/charlespockert/aurelia-bs-grid
import { bindable, autoinject } from 'aurelia-framework';
import { LinkModel, LinkService } from './linksService';
import { Sorter } from 'core/Helpers';

@autoinject
export class Links{
	
  private sorter:Sorter;
  links:Array<LinkModel>;
  count:number;
  filteredModels:Array<LinkModel>;
 
  constructor(public linkService:LinkService){
    this.linkService = linkService;
	  this.sorter = new Sorter();
  }

  activate(){
  	return this.linkService.all().then((response) => {   
  		this.links = this.filteredModels = response;	
      this.count = this.links.length;
  	});
  }
  
  sort(prop) {
    this.sorter.sort(this.filteredModels, prop);
  }
  
  loadData(gridArgs) {
    return new Promise((resolve, reject) => resolve({
        data: this.links,
        count: this.count
      }));
  }  
  
}