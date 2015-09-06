import { autoinject } from 'aurelia-framework';
import { LocalStorageProvider } from 'core/Providers';
import { DataProvider } from 'core/Services';
import { EventAggregator } from 'aurelia-event-aggregator';

@autoinject
export class DataModel<T> {

    private dataProvider: DataProvider;
    private localStorageProvider:LocalStorageProvider;
    protected endpoint:string;

    // Initialize default values.
    object:T;
    objects:Array<T>;

    // Cache parameters
    cache:any = {
        count: {},
        fetch: {},
        load: {}
    };

    // Is scope used with data model or not, if yes this is actual scope
    scope:boolean = false;

    // Scope item names for single, collection and count
    itemNames:any = {
        object: false,
        objects: false,
        count: false
    };

    /**
    * Constructor for actual data model.
    *
    * @param   {string}  [endpoint]  Name of the API endpoint
    * @constructor
    */    //, localStorageProvider:LocalStorageProvider // this.localStorageProvider = localStorageProvider;
    constructor(dataProvider: DataProvider, public ea:EventAggregator, endpoint:string, key:string = 'id') {
        this.dataProvider = dataProvider;
        this.ea = ea;

        // Subscribe to specified endpoint
        if (endpoint) {
            this.endpoint = endpoint;
            this._subscribe();
        } else {
            this.endpoint = undefined;
        }
    }

    clearCache():void {
        this.objects = [];
        console.info('Cache Cleared: ' + this.endpoint);
    }

    setEndpoint(endpoint:string):void {
        this.endpoint = endpoint;
        this._subscribe();
    }

    find(identifier:any, parameters?:any):Promise<T> {

         let self = this;
         let url = `${this.endpoint}`+(identifier ? `/${identifier}`:'');
         return this.dataProvider
            .get(url, parameters)
            .then(
              function onSuccess(response) {
                self.object = Array.isArray(response) ? response[0] : response;
                return self.object;
              },
              function onError(error) {
                console.error('DataModel.load() failed.', error, self.endpoint);
              }
            );
    }

    load(parameters:any, fromCache:boolean = true):Promise<T[]> {
        let self = this;

        // Normalize parameters
        parameters = parameters || {};
        fromCache = !!fromCache;

        // if (fromCache) {
        //     parameters = self.cache.load.parameters;
        //     if (self.objects && self.objects.length) {
        //         console.log('Cached Objects: ' + this.endpoint);
        //         return new Promise((resolve, reject) => resolve(self.objects));
        //     }
        // } else {
        //     // Store used parameters
        //     self.cache.load = {
        //         parameters: parameters
        //     };
        // }

        return this.dataProvider
            .get(self.endpoint, parameters)
            .then(
              function onSuccess(response) {
                self.objects = response;
                return self.objects;
              },
              function onError(error) {
                console.error('DataModel.load() failed.', error, self.endpoint, parameters);
              }
            );
    }

    save(data:T, identifier?:any) {
        let p = (!identifier) ?
                this.dataProvider.create(this.endpoint, data) :
                this.dataProvider.update(`${this.endpoint}/${identifier}`, data);

        return p.then(result=>{return result;})
                 .catch(error=>{
                    console.error('DataModel.create() failed.', error, this.endpoint, data);
                  });
    }

    private _subscribe() {
        this.ea.subscribe('auth:logout:success', this.clearCache.bind(this));
    }

    private _unsubscribe() {

    }
}
