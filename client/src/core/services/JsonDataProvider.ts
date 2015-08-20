import { autoinject } from 'aurelia-framework';
import { HttpClient } from 'aurelia-http-client';
import { IApplicationSettings, ApplicationSettings } from 'core/Settings';
import { Utils } from 'core/Helpers';

@autoinject
export class JsonDataProvider  {
   
  appSettings:IApplicationSettings;
  objects:Array<any> = [];
  
  constructor(private http:HttpClient, private settings: ApplicationSettings) {
    this.appSettings = settings.instance; 
    this.http = http;   
  } 
         
  public find(file:string, prop:string, value:any):Promise<any> {
    return this.load(file).then(data => {
      return data.filter(item => {        
        return item[prop] == value; 
      })[0];
    });
  }
  
  /**
    * Service method to get data from certain end point. This will always return a collection
    * of data.
    *
    * @param   {string}    endPoint    Name of the end point
    * @param   {{}}        parameters  Used query parameters
    *
    * @returns {Promise|*}
    */  
  public load(file:string, fromCache:boolean = true):Promise<any> {
    let self = this;
    if (fromCache && self.objects.length) {          
        return new Promise((resolve, reject) => resolve(self.objects));
    } 
    return this.http.get(`/db/${file}.json`).then(response=>{
				return self.objects = response;
			})
			.catch(err=>{
				return err;
			});
  }
  
  /**
    * Service method to get data from certain end point. This will always return a collection
    * of data.
    *
    * @param   {string}    endPoint    Name of the end point
    * @param   {{}}        parameters  Used query parameters
    *
    * @returns {Promise|*}
    */  
  public getById(file:string, identifier:any, idKey:any = 'id'):Promise<any> {
    return this.find(file, idKey, identifier);
  }
  
}