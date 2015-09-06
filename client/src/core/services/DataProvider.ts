import { autoinject } from 'aurelia-framework';
import { HttpClient } from 'aurelia-http-client';
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
export class DataProvider  {

  private configRequest:any;
  private _contentType:string;
  private _isPlainRequest:boolean = false;
  private deferredResult:Promise<any>[] = [];

  public isLocal:boolean;
  public isRequesting:boolean = false;
  appSettings:IApplicationSettings;

  constructor(private http:HttpClient, private settings: ApplicationSettings) {
    this.appSettings = settings.instance;
    this.http = http;
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
    if (!Utils.isUndefined(identifier)) {
      endPoint = endPoint + '/' + identifier;
    }
    return this.appSettings.api.url + '/' + endPoint;
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
    return {params: parameters};
  }

  /**
    * Service method to get count of certain end point objects.
    *
    * @param   {string}    endPoint    Name of the end point
    * @param   {{}}        parameters  Used query parameters
    *
    * @returns {Promise|*}
    */
  public count(route:string, data:Object = undefined) {
    return this.get(route + '/count/', data);
  }

  public find(route:string, prop:string, value:any):Promise<any> {
    return this.get(route, 'GET').then(data => {
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
  public get(route:string, data:Object = undefined, headers:Object = undefined):Promise<any> {
    return this.request(route, 'GET', data, headers);
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
  public getById(route:string, identifier:any, headers:Object = undefined):Promise<any> {
    return this.request(route + '/' + identifier, 'GET', undefined, headers);
  }

  /**
    * Service method to create new object to specified end point.
    *
    * @param   {string}    endPoint    Name of the end point
    * @param   {{}}        data        Data to update
    *
    * @returns {Promise|*}
    */
  public create(route:string, data:Object = undefined, headers:Object = undefined):Promise<any> {
    return this.request(route, 'POST', data, headers);
  }

  public patch(route:string, data:Object = undefined, headers:Object = undefined):Promise<any> {
    return this.request(route, 'PATCH', data, headers);
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
  public update(route:string, data:Object = undefined, headers:Object = undefined):Promise<any> {
    return this.request(route, 'PUT', data, headers);
  }

  /**
    * Service method to delete specified object.
    *
    * @param   {string}    endPoint    Name of the end point
    * @param   {number}    identifier  Identifier of endpoint object
    *
    * @returns {Promise|*}
    */
  public delete(route:string, data:Object = undefined, headers:Object = undefined):Promise<any> {
    return this.request(route, 'DELETE', data, headers);
  }

  public plainRequest(route:string, httpRequestType:string, data:Object = undefined, headers:Object = undefined):Promise<any> {
    this._isPlainRequest = true;
    return this.request(route, httpRequestType, data, headers);
  }

  private request(route:string, httpRequestType:string, data:Object = undefined, headers:Object = undefined):Promise<any> {
      data = data || {};
      let req = this._getConfigRequest(route, httpRequestType, data, headers);
      let p:Promise<any>;
      let key = req.url.replace(this.appSettings.api.url + this.appSettings.api.prefix, '');

      if (this.deferredResult[key]) {
        return this.deferredResult[key];
      }

      switch(httpRequestType) {
        case 'GET' : p = this.http.get(req.url); break;
        case 'POST' : p = this.http.post(req.url, data); break;
        case 'PUT' : p = this.http.put(req.url, data); break;
        case 'PATCH' : p = this.http.patch(req.url, data); break;
        case 'DELETE' : p = this.http.delete(req.url); break;
      }
      console.log(key);
      return this.deferredResult[key] = new Promise((resolve, reject) => {
            p.then(result => {
              if (result)
                resolve(result.content)
              else
                reject(undefined)
            });
        });
  }

  private _getConfigRequest(route:string, httpRequestType:string, data:any, headers:any):IConfigRequest {

      var configRequest = {
          url: this._urlCompile(route, data, true),
          method: httpRequestType,
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
      if (!url) {
          return;
      } else if (Array.isArray(url)) {
          url = url[0];
      }
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
