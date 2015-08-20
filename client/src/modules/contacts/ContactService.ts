import { autoinject } from 'aurelia-framework';
import { DataModel } from 'core/Models';
import { DataProvider } from 'core/Services';
import { EventAggregator } from 'aurelia-event-aggregator';
import { ContactModel } from './ContactModel';

@autoinject
export class ContactService extends DataModel<ContactModel>{
  constructor(dataProvider: DataProvider, public ea:EventAggregator) {
      super(dataProvider, ea, 'contact');
  }    
}