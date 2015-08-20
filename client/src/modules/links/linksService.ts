
import { autoinject } from 'aurelia-framework';
import { JsonDataProvider } from 'core/Services';

export interface ILinkService {
  all: () => Promise<any>;
  getById: (id:number) => Promise<any>;
  save: (model:LinkModel) => Promise<boolean>;  
}

export class LinkModel {
  id:number;
  title:string;
  url:string;
  source:string;
  category:string;
}

@autoinject
export class LinkService {
  
  constructor(public jsonDataProvider: JsonDataProvider) {
    this.jsonDataProvider = jsonDataProvider;
  }
  
  all() {
    return this.jsonDataProvider.load('links');
  }
  
}