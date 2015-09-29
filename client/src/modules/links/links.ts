//https://github.com/charlespockert/aurelia-bs-grid
import { bindable, autoinject } from 'aurelia-framework';
import { LinkModel, LinkService } from './linksService';
import { Sorter } from 'core/Helpers';
import { Dispatcher, handle, waitFor } from 'aurelia-flux';

@autoinject
export class Links{

  private sorter:Sorter;
  links:Array<LinkModel>;
  count:number;
  filteredModels:Array<LinkModel>;

  constructor(public linkService:LinkService, private dispatcher:Dispatcher){
    this.dispatcher.handle('message.submit', (action, message) => {
          alert(message);
      });
  }

  activate(){
		this.sorter = new Sorter();
  	return this.linkService.load().then((response, reject) => {
  		this.links = this.filteredModels = response;
      this.count = this.links.length;
      this.dispatcher.dispatch('message.submit', this.links);
  	});
  }

  @handle('message.submit')
  messageHandler(action, message) {
    console.log(arguments);
  }

  sort(prop) {
    this.sorter.sort(this.filteredModels, prop);
  }

  loadData(gridArgs:any) {
    return new Promise((resolve, reject) => resolve({
        data: this.links,
        count: this.count
      }));
  }


}
