import { autoinject, Aurelia, LogManager } from 'aurelia-framework';
import { ConsoleAppender } from 'aurelia-logging-console';
import { ValidateCustomAttributeViewStrategy } from 'aurelia-validation';
import { ApplicationSettings } from 'core/Settings';
import { LocalStorageProvider } from 'core/Providers';
import { CSRFInterceptor, LoggerInterceptor } from 'aurelia-sails-socket-client';
import { AuthenticationInterceptor, SocketInterceptor } from 'core/Interceptors';
import config from './app.config';

LogManager.addAppender(new ConsoleAppender());
LogManager.setLevel(LogManager.logLevel.info);

export function configure(aurelia: Aurelia) {

  let appSettings = aurelia.container.get(ApplicationSettings);
  appSettings.configure(config);
  let settings = appSettings.instance;

  aurelia.use
    .standardConfiguration()
    //.plugin('aurelia-flux')
    .plugin('aurelia-animator-css')
    .plugin('toastr')
    .plugin('aurelia-configuration', config => {
        config.setEnvironments({
            development: ['localhost', 'dev.local'],
            staging: ['staging.website.com', 'test.staging.website.com'],
            production: ['website.com']
        });
    })
    .plugin('aurelia-sails-socket-client', (sails, io) => {
      io.sails.url = settings.api.url;
      sails.configure(x => {
        //x.withBaseUrl('/api/v1');
        // Example for CSRFInterceptor
        x.withInterceptor(new CSRFInterceptor('/csrfToken', sails));
        x.withInterceptor(new LoggerInterceptor());
        //x.withInterceptor(interceptor);
      });
    })
    .feature('core/resources')
    .feature('core/auth')
    .feature('widgets')
    .plugin('charlespockert/aurelia-bs-grid');
    // .plugin('aurelia-validation', (config) => {
    //   //config.useViewStrategy(ValidateCustomAttributeViewStrategy.TWBootstrapAppendToInput)
    // });
  aurelia.start().then(a => a.setRoot('bootstrapper'));

}
