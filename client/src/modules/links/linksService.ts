
import { autoinject } from 'aurelia-framework';
import { DataModel } from 'core/Models';
import { DataProvider } from 'core/Services';
import { EventAggregator } from 'aurelia-event-aggregator';

export class LinkModel {
  id:number;
  title:string;
  url:string;
  source:string;
  category:string;
}

@autoinject
export class LinkService extends DataModel<LinkModel>{
  constructor(dataProvider: DataProvider, public ea:EventAggregator) {
      super(dataProvider, ea, 'link');
  }
}
/*
@autoinject
export class LinkService {

  constructor(public jsonDataProvider: JsonDataProvider) {
    this.jsonDataProvider = jsonDataProvider;
  }

  all() {
    return this.jsonDataProvider.load('links');
  }

}
*/
