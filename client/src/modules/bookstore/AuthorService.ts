import { bindable, autoinject } from 'aurelia-framework';
import { DataModel } from 'core/Models';
import { DataProvider } from 'core/Services';
import { EventAggregator } from 'aurelia-event-aggregator';
import { AuthorModel } from './AuthorModel';

@autoinject
export class AuthorService extends DataModel<AuthorModel>{
  constructor(dataProvider: DataProvider, public ea:EventAggregator) {
      super(dataProvider, ea, 'author');
  }    
}