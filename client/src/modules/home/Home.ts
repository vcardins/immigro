import { bindable, inject, autoinject } from 'aurelia-framework';
import { Configure } from 'aurelia-configuration';
import { Logger } from 'core/Services';
import { AuthorModel } from './AuthorModel';
import { AuthorService } from './AuthorService';
import { IApplicationSettings, ApplicationSettings } from 'core/Settings';
//import * as bpolyfill from 'babel/polyfill';

@autoinject
//@inject(AuthorService, Configure, ApplicationSettings)
export class Home {

  public heading = 'Welcome to the Aurelia App!';
  authors:any;
  settings:IApplicationSettings;

  constructor(private authorService:AuthorService, private config:Configure, appSettings:ApplicationSettings) {
      this.authorService = authorService;
      this.settings = appSettings.instance;
      // this.config = config;
      // console.log(this.config.get('api'));
  }

  activate() {
    let self = this;
    let parameters = { populate: 'books', limit: 0, sort: 'name DESC' };

    return self.authorService.load(parameters).then(r => {
        return self.authors = r;
      });
  }

  // async activate2() {
  //   try {
  //     let parameters = { populate: 'books', limit: 0, sort: 'name DESC' };
  //     this.authors = await this.homeModel.load(parameters);
  //     console.log(`Search results: ${this.authors.length}`);
  //   }
  //   catch (err) {
  //     console.log(err);
  //   }
  // }

}
