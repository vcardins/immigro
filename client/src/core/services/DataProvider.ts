import { inject, autoinject } from 'aurelia-framework';
import { HttpClient } from 'aurelia-http-client';
import { SailsSocketClient } from 'aurelia-sails-socket-client';
import { IApplicationSettings, ApplicationSettings } from 'core/Settings';
import { Utils } from 'core/Helpers';

export interface IDataService {
  plainRequest: (route:string, httpRequestType:string, data:Object, headers:Object) => Promise<any>;
  get: (route:string, data:Object, headers:Object) => Promise<any>;
  getById: (route:string, identifier:any, headers:Object) => Promise<any>;
  create: (route:string, data:Object, headers:Object) => Promise<any>;
  patch: (route:string, data:Object, headers:Object) => Promise<any>;
  update: (route:string, data:Object, headers:Object) => Promise<any>;
  delete: (route:string, data:Object, headers:Object) => Promise<any>;
}

export interface IConfigRequest {
    url: string;
    method: string;
    headers: any;
    params: any;
    data: any;
}

@autoinject
//@inject(HttpClient, SailsSocketClient, ApplicationSettings)
export class DataProvider  {

  private configRequest:any;
  private _contentType:string;
  private _isPlainRequest:boolean = false;
  private deferredResult:Promise<any>[] = [];

  public isLocal:boolean;
  public isRequesting:boolean = false;
  appSettings:IApplicationSettings;

  constructor(private http:HttpClient, private socket:SailsSocketClient, private settings: ApplicationSettings) {
    this.appSettings = settings.instance;
  }

  /**
    * Helper function to get "proper" end point url for sails backend API.
    *
    * @param   {string}    endPoint        Name of the end point
    * @param   {number}    [identifier]    Identifier of endpoint object
    *
    * @returns {string}
    * @private
    */
  private _parseEndPointUrl(endPoint:string, identifier:any) {
    return this.appSettings.api.url + '/' + endPoint + (identifier ? '/' + identifier : '');
  }

  /**
    * Helper function to parse used parameters in 'get' and 'count' methods.
    *
    * @param   {{}}    parameters  Used query parameters
    *
    * @returns {{params: {}}}
    * @private
    */
  private _parseParameters(parameters:any) {
    parameters = parameters || {};
    return { params: parameters };
  }

  /**
    * Service method to get count of certain end point objects.
    *
    * @param   {string}    endPoint    Name of the end point
    * @param   {{}}        parameters  Used query parameters
    *
    * @returns {Promise|*}
    */
  count(route:string, data:Object = undefined) {
    return this.get(route + '/count/', data);
  }

  find(route:string, prop:string, value:any):Promise<any> {
    return this.get(route, 'GET').then(data => {
      return data.filter((item:any) => {
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
  get(route:string, data:Object = undefined, headers:Object = undefined, anonymous:boolean = false):Promise<any> {
    return this.request(route, 'GET', data, headers, anonymous);
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
  getById(route:string, identifier:any, headers:Object = undefined, anonymous:boolean = false):Promise<any> {
    return this.request(route + '/' + identifier, 'GET', undefined, headers, anonymous);
  }

  /**
    * Service method to create new object to specified end point.
    *
    * @param   {string}    endPoint    Name of the end point
    * @param   {{}}        data        Data to update
    *
    * @returns {Promise|*}
    */
  create(route:string, data:Object = undefined, headers:Object = undefined, anonymous:boolean = false):Promise<any> {
    return this.request(route, 'POST', data, headers, anonymous);
  }

  patch(route:string, data:Object = undefined, headers:Object = undefined, anonymous:boolean = false):Promise<any> {
    return this.request(route, 'PATCH', data, headers, anonymous);
  }

  /**
    * Service method to update specified end point object.
    *
    * @param   {string}    endPoint    Name of the end point
    * @param   {number}    identifier  Identifier of endpoint object
    * @param   {{}}        data        Data to update
    *
    * @returns {Promise|*}
    */
    update(route:string, data:Object = undefined, headers:Object = undefined, anonymous:boolean = false):Promise<any> {
      return this.request(route, 'PUT', data, headers, anonymous);
    }

  /**
    * Service method to delete specified object.
    *
    * @param   {string}    endPoint    Name of the end point
    * @param   {number}    identifier  Identifier of endpoint object
    *
    * @returns {Promise|*}
    */
  delete(route:string, data:Object = undefined, headers:Object = undefined, anonymous:boolean = false):Promise<any> {
    return this.request(route, 'DELETE', data, headers, anonymous);
  }

  plainRequest(route:string, httpRequestType:string, data:Object = undefined, headers:Object = undefined, anonymous:boolean = false):Promise<any> {
    this._isPlainRequest = true;
    return this.request(route, httpRequestType, data, headers, anonymous);
  }

  upload(route:string, files:Array<File>, anonymous:boolean = false):Promise<any> {
    let req = this._getConfigRequest(route, 'POST');
    let p:any = this.http.createRequest(req.url);
    if (!anonymous) {
      p = p.withToken();
    }

    let formData = new FormData();
    for (var i = 0, f; f = files[i]; i++) {
      //add each file to the form data and iteratively name them
      if (f.isDeleted) { continue; }
      formData.append("file_" + i, f);
    }
    //transformRequest: angular.identity,
    p = p.asPost()
        .withContent(formData)
        .withHeader('Content-Type', undefined);

    return new Promise((resolve, reject) => {
          p.send().then(result => {
            if (result)
              resolve(result.content);
            else
              reject(undefined);
          }).finally(function(){
            for (var i = 0; i < files.length; i++) {
              delete formData['file_'+i];
            }
          });
      });
  }

  private request(route:string,
                  httpRequestType:string,
                  data:Object = {},
                  headers:Object = undefined,
                  anonymous:boolean = false):Promise<any>
  {

      let req = this._getConfigRequest(route, httpRequestType, data, headers);
      let key = req.url.replace(this.appSettings.api.url + this.appSettings.api.prefix, '');

      if (this.deferredResult[key] && httpRequestType == 'GET') {
        return this.deferredResult[key];
      }

      let p:any = this.http.createRequest(req.url);
      if (!anonymous) {
        p = p.withToken();
      }

      switch(httpRequestType) {
        case 'GET' : p = p.asGet(); break;
          //p = this.socket.get(req.url, this._parseParameters(data));
        case 'POST' : p = p.asPost().withContent(data); break;
        case 'PUT' : p = p.asPut().withContent(data); break;
        case 'PATCH' : p = p.asPatch().withContent(data); break;
        case 'DELETE' : p = p.asDelete(); break;
      }

      return this.deferredResult[key] = new Promise((resolve, reject) => {
            p.send().then(result => {
              if (result)
                resolve(result.content);
              else
                reject(undefined);
            });
        });
  }

  private _getConfigRequest(route:string, httpRequestType:string, data:any, headers:any):IConfigRequest {

      var configRequest = {
          url: this._urlCompile(route, data, true),
          headers: headers || { 'Content-Type': this._contentType || this.appSettings.api.contentType },
          params: {},
          data:{}
      };

      if (typeof (data) === 'object' && data.constructor.name === 'FormData') {
          configRequest.headers = { 'Content-Type': undefined };
      }
      if (httpRequestType === 'GET' || httpRequestType === 'DELETE') {
          Object.assign(configRequest.params, configRequest.params, data);
      } else {
          if (configRequest.headers['Content-Type'] === this.appSettings.api.contentType) {
              configRequest.data = this._serialize(data, '');
          } else {
              configRequest.data = data;
          }
      }

      return configRequest;
  }

  private _serialize(obj:any, prefix:string):string {
    let queryString:string[] = [];
    for (let p in obj) {
        let k = prefix ? prefix + '[' + p + ']' : p, v = obj[p];
        queryString.push(typeof v === 'object' ?
            this._serialize(v, k) : encodeURIComponent(k) + '=' + encodeURIComponent(v));
    }
    return queryString.join('&');
  }

  private _urlCompile(url:string, parameters:any, isReplace:boolean):string {
      if (!url) { return; }
      if (Array.isArray(url)) { url = url[0]; }
      for (let name in parameters) {
          if (url.indexOf(':' + name) > -1) {
              let value = parameters[name];
              if (!value) {
                  console.log('Router: No path replacement value for ' + name + '.', url, parameters);
              }
              url = url.replace(':' + name, value);
              if (isReplace) {
                  delete parameters[name];
              }
          }
      }
      let result = this.appSettings.api.url + this.appSettings.api.prefix + url; //(this._isPlainRequest ? this.apiUrl.replace('api/','') : this.apiUrl) + url;
      this._isPlainRequest = false;
      return result;
    }
}
