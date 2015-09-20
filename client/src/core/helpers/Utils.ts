export class Utils {

	static setHashKey(obj, h) {
		if (h) {
			obj.$$hashKey = h;
		} else {
			delete obj.$$hashKey;
		}
	}

	static baseExtend(target, objs, deep) {
		var h = target.$$hashKey;

		for (let i = 0, ii = objs.length; i < ii; ++i) {
			let obj = objs[i];
			if (!this.isObject(obj) && !this.isFunction(obj)) continue;
			let keys = Object.keys(obj);
			for (let j = 0, jj = keys.length; j < jj; j++) {
				let key = keys[j], src = obj[key];

				if (deep && this.isObject(src)) {
					if (!this.isObject(target[key])) {
						target[key] = Array.isArray(src) ? [] : {}
					};
					this.baseExtend(target[key], [src], true);
				} else {
					target[key] = src;
				}
			}
		}
		this.setHashKey(target, h);
		return target;
	}

	// extend: used to make deep copies of options object
  static extend(destination, source) {
    for (let property in source) {
        if (source[property] && source[property].constructor &&
            source[property].constructor === Object) {
            destination[property] = destination[property] || {};
            arguments.callee(destination[property], source[property]);
        }
        else {
            destination[property] = source[property];
        }
    }
    return destination;
  }

  static isDefined(value:any) {
		return typeof value !== 'undefined';
	}

 	static isUndefined(value:any) {
		return typeof value === 'undefined';
	}

	static camelCase(name:string) {
        return name.replace(/([\:\-\_]+(.))/g, function(_, separator, letter, offset) {
          return offset ? letter.toUpperCase() : letter;
        });
    }

	static parseQueryString (keyValue:string) {
        var obj = {}, key:string, value:any[];
        this.forEach((keyValue || '').split('&'), function(keyValue) {
          if (keyValue) {
            value = keyValue.split('=');
            key = decodeURIComponent(value[0]);
            obj[key] = this.isDefined(value[1]) ? decodeURIComponent(value[1]) : true;
          }
        });
        return obj;
    }

	static isString(value:any) {
		return typeof value === 'string';
	}

	static isObject (value:any) {
		return value !== null && typeof value === 'object';
	}

	static isFunction (value:any) {
		return typeof value === 'function';
	}

	static checkDomain(url:string) {
		if (url.indexOf('//') === 0 ) {
			url = location.protocol + url;
		}
		return url.toLowerCase().replace(/([a-z])?:\/\//,'$1').split('/')[0];
	}

	static isExternalLink(url:string) {
		return ( ( url.indexOf(':') > -1 || url.indexOf('//') > -1 ) && this.checkDomain(location.href) !== this.checkDomain(url) );
	}

	// http://stackoverflow.com/a/1054862/725866
	static titleToSlug(text:string) {
		return text
			.toLowerCase()
			.replace(/[^\w ]+/g,'')
			.replace(/ +/g,'-');
	}

	static joinUrl  (baseUrl:string, url:string) {
		if (/^(?:[a-z]+:)?\/\//i.test(url)) {
			return url;
		}

		var joined = [baseUrl, url].join('/');

		var normalize = function(str) {
			return str
			.replace(/[\/]+/g, '/')
			.replace(/\/\?/g, '?')
			.replace(/\/\#/g, '#')
			.replace(/\:\//g, '://');
		};

		return normalize(joined);
	}

	static isBlankObject  (value) {
		return value !== null && typeof value === 'object' && !Object.getPrototypeOf(value);
	}

	static isArrayLike (obj) {
		if (obj == null || this.isWindow(obj)) {
			return false;
		}
	}

	static isWindow(obj) {
	  return obj && obj.window === obj;
	}

	static extend (...dst: any[]) {
		return this.baseExtend(dst[0], arguments[1], false);
	}

	static merge (...dst: any[]) {
		return this.baseExtend(dst[0], [].slice.call(arguments,1), true);
	}

	static getObjectProperties (source:any, props: any[], target:any) {
		let obj = target || {};
		if (props === null) { return obj; }
		props.forEach(prop=>{
			if (source.hasOwnProperty(prop)) {
				obj[prop] = source[prop];
			}
		});
		return obj;
	}

	static areEqual(obj1, obj2) {
		return Object.keys(obj1).every((key) => obj2.hasOwnProperty(key) && (obj1[key] === obj2[key]));
	}

	static forEach (obj:any, iterator:any, context:any = undefined) {
		var key, length;
		if (obj) {
			if (this.isFunction(obj)) {
				for (key in obj) {
		        // Need to check if hasOwnProperty exists,
		        // as on IE8 the result of querySelectorAll is an object without a hasOwnProperty function
		        if (key != 'prototype' && key != 'length' && key != 'name' && (!obj.hasOwnProperty || obj.hasOwnProperty(key))) {
		        	iterator.call(context, obj[key], key, obj);
		        }
		    }
		} else if (Array.isArray(obj) || this.isArrayLike(obj)) {
			var isPrimitive = typeof obj !== 'object';
			for (key = 0, length = obj.length; key < length; key++) {
				if (isPrimitive || key in obj) {
					iterator.call(context, obj[key], key, obj);
				}
			}
		} else if (obj.forEach && obj.forEach !== this.forEach) {
			obj.forEach(iterator, context, obj);
		} else if (this.isBlankObject(obj)) {
		      // createMap() fast path --- Safe to avoid hasOwnProperty check because prototype chain is empty
		      for (key in obj) {
		      	iterator.call(context, obj[key], key, obj);
		      }
		  } else if (typeof obj.hasOwnProperty === 'function') {
		      // Slow path for objects inheriting Object.prototype, hasOwnProperty check needed
		      for (key in obj) {
		      	if (obj.hasOwnProperty(key)) {
		      		iterator.call(context, obj[key], key, obj);
		      	}
		      }
		  } else {
		      // Slow path for objects which do not have a method `hasOwnProperty`
		      for (key in obj) {
		      	if (Object.hasOwnProperty.call(obj, key)) {
		      		iterator.call(context, obj[key], key, obj);
		      	}
		      }
		  }
		}
		return obj;
	}

}
