import { autoinject } from 'aurelia-framework';
import { Utils } from 'core/Helpers';
import { IApplicationSettings, ApplicationSettings } from 'core/Settings';

@autoinject
export class Popup{

	public popupWindow:Window = null;
  private polling:any = null;
  private url:string = '';
  private appSettings:IApplicationSettings;
  
  constructor(appSettings:ApplicationSettings){
    this.appSettings = appSettings.instance;
    this.popupWindow = null;
    this.polling = null;
    this.url = '';
  };

  open(url, windowName, options, redirectUri){
    this.url = url;
    let optionsString = this.stringifyOptions(this.prepareOptions(options || {}));

    this.popupWindow = window.open(url, windowName, optionsString);
    
    if (this.popupWindow && this.popupWindow.focus) {
      this.popupWindow.focus();
    }

    return this;
  };

  eventListener(redirectUri) {
    let self = this;
    let promise =  new Promise((resolve,reject)=>{
      self.popupWindow.addEventListener('loadstart', (event)=> {        
        
        let uri:string = (<any>event).url;
        if (uri.indexOf(redirectUri) !== 0) {
          return;
        }

        let parser = document.createElement('a');
        parser.href = uri;

        if (parser.search || parser.hash) {
          let queryParams = parser.search.substring(1).replace(/\/$/, '');
          let hashParams = parser.hash.substring(1).replace(/\/$/, '');
          let hash = Utils.parseQueryString(hashParams);
          let qs = Utils.parseQueryString(queryParams);

          Utils.extend(qs, hash);

          if (qs.hasOwnProperty('error')) {
            reject({ error: (<ErrorEvent>qs).error });
          } else {
            resolve(qs);
          }

          self.popupWindow.close();
        }
      });

      self.popupWindow.addEventListener('exit', () => {
        reject({ data: 'Provider Popup was closed' });
      });

      self.popupWindow.addEventListener('loaderror', () => {
        reject({ data: 'Authorization Failed' });
      });
    });
  return promise;
};

  pollPopup(){
    let self = this;
    let promise =  new Promise((resolve,reject)=>{
      this.polling = setInterval(()=> {
        try {
            let documentOrigin = document.location.host;
            let popupWindowOrigin = self.popupWindow.location.host;
  
           if (popupWindowOrigin === documentOrigin && (self.popupWindow.location.search || self.popupWindow.location.hash)) {
                  let queryParams = self.popupWindow.location.search.substring(1).replace(/\/$/, '');
                  let hashParams = self.popupWindow.location.hash.substring(1).replace(/[\/$]/, '');
                  let hash = Utils.parseQueryString(hashParams);
                  let qs = Utils.parseQueryString(queryParams);
          
                  Utils.extend(qs, hash);
          
                  if (qs.hasOwnProperty('error')) {
                    reject({ error: (<ErrorEvent>qs).error });
                  } else {
                    resolve(qs);
                  }
          
                  self.popupWindow.close();
                  clearInterval(self.polling);
            }
        } catch (error) {}
  
        if (!self.popupWindow) {
          clearInterval(self.polling);
          reject({ data: 'Provider Popup Blocked' });
        } else if (self.popupWindow.closed) {
          clearInterval(self.polling);
          reject({ data: 'Problem poll popup' });
        }
      }, 35);
    });
    
    return promise;
  };

  prepareOptions(options) {
    let width = options.width || 500;
    let height = options.height || 500;
    return Utils.extend({
      width: width,
      height: height,
      left: window.screenX + ((window.outerWidth - width) / 2),
      top: window.screenY + ((window.outerHeight - height) / 2.5)
    }, options);
  };
  
  stringifyOptions(options) {
    let parts = [];
    Utils.forEach(options, function(value, key) {
      parts.push(key + '=' + value);
    });
    return parts.join(',');
  };
}