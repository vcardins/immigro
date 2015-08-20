/**
 * Created by moshensky on 6/16/15.
 */
import * as toastr from 'toastr';

const defaults = {
    source: 'app',
    title: '',
    message: '',
    data: '',
    showToast: true,
    type: 'info',
    closeDuration: 2000
  }
  
  
export class Logger {
    
  constructor() {
    toastr.options = {
      closeButton: true,
      newestOnTop: false,
      progressBar: true,
      positionClass: "toast-top-right",
      preventDuplicates: false,
      showEasing: "swing",
      hideEasing: "linear",
      showMethod: "fadeIn",
      hideMethod: "fadeOut"
    };
  }

  warn(options:any) {
    this.log(this.sanitize(options, 'warning'));
  }

  info(options:any) {
    this.log(this.sanitize(options, 'info'));
  }

  error(options:any) {
    this.log(this.sanitize(options, 'error'));
  }

  success(options:any) {
    this.log(this.sanitize(options, 'success'));
  }
  
  log(options:any) {
    var opts = Object.assign({}, defaults, options);
    if (opts.showToast) {
      toastr[opts.type](opts.message, opts.title);
    }
  }
  
  sanitize(options:any, messageType:string) {
    if (typeof options === 'string' || options instanceof String) {
      return {
        message: options,
        type: messageType
      };
    }
  
    options.type = messageType;
    return options;
  }
  
}