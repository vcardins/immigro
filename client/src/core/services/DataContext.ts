import { DataModel } from 'core/Models';
import { Aurelia, autoinject } from 'aurelia-framework';

@autoinject
export class DataSource {

  repoNames:Array<string>;  
  
  constructor(public aurelia:Aurelia, public dataModel:DataModel<any>) {    
    this.repoNames = ['Home'];
    this.dataModel = dataModel;
    this.aurelia = aurelia;
    this.defineLazyLoadedRepos();
  } 
  
  // Add ES5 property to datacontext for each named repo
  private defineLazyLoadedRepos() {
      this.repoNames.forEach(function(name) {
          Object.defineProperty(this, name, {
              configurable: true, // will redefine this property once
              get: function() {
                  // The 1st time the repo is request via this property,
                  // we ask the repositories for it (which will inject it).
                  var repo = this.getRepo(name);
                  // Rewrite this property to always return this repo;
                  // no longer redefinable
                  Object.defineProperty(this, name, {
                      value: repo,
                      configurable: false,
                      enumerable: true
                  });
                  return repo;
              }
          });
      });
  }
  
  // Get named Repository Ctor (by injection), new it, and initialize it
  private getRepo(repoName:string) {
      var modelName = repoName + 'Model';
      
      // let appSettings = aurelia.container.get(ApplicationSettings);
      // var injector = Injector.resolveAndCreate(modelName);

      // var injector = new Injector();
      // var Repo = injector.get(modelName);
  
      return null; //new Repo();
  }
  	
}
