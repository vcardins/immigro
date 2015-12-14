import { autoinject } from 'aurelia-framework';
import { IApplicationSettings, ApplicationSettings } from 'core/Settings';
import { LocalStorageTypes } from 'core/Enums';

export interface IStorage {
	getItem(key:string): any;
	setItem(key:string, value:any): void;
	removeItem(key:string): void;
}

@autoinject
export class LocalStorageProvider {

	appSettings: IApplicationSettings;
	storage:IStorage;

  constructor(appSettings: ApplicationSettings) {
    this.appSettings = appSettings.instance;
		switch (this.appSettings.localStorageMode) {
			case LocalStorageTypes.Local:
				this.storage = window.localStorage;
				if (!('localStorage' in window && window['localStorage'] !== null)) {
					console.warn('Warning: Local Storage is disabled or unavailable');
				}
				break;
			case LocalStorageTypes.Session:
				this.storage = window.sessionStorage;
				if (!('sessionStorage' in window && window['sessionStorage'] !== null)) {
					console.warn('Warning: Session Storage is disabled or unavailable. Will not work correctly.');
				}
			break;
		}
  }

  get(key:string):any{
		return this.storage.getItem(key);
	}

	set(key:string, value:any):any{
		return this.storage.setItem(key, value);
	}

	remove(key:string):any{
		return this.storage.removeItem(key);
	}

}
