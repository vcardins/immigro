import { autoinject, Aurelia, LogManager } from 'aurelia-framework';
import { ConsoleAppender } from 'aurelia-logging-console';
import { ValidateCustomAttributeViewStrategy } from 'aurelia-validation';
import { HttpClientExtensions } from 'core/Helpers'
import { ApplicationSettings } from 'core/Settings';
import { LocalStorageProvider } from 'core/Providers';
import config from './app.config';

LogManager.addAppender(new ConsoleAppender());
LogManager.setLevel(LogManager.logLevel.info);

export function configure(aurelia: Aurelia) {
  
  let appSettings = aurelia.container.get(ApplicationSettings);
  appSettings.configure(config);
  let settings = appSettings.instance;
  aurelia.use
    .standardConfiguration()
    .plugin('aurelia-animator-css')
    .plugin('toastr')
    .plugin('aurelia-configuration', config => {
        config.setEnvironments({
            development: ['localhost', 'dev.local'],
            staging: ['staging.website.com', 'test.staging.website.com'],
            production: ['website.com']
        });
    })
    .feature('core/resources')
    .feature('core/auth');
    // .plugin('aurelia-validation', (config) => {
    //   //config.useViewStrategy(ValidateCustomAttributeViewStrategy.TWBootstrapAppendToInput)
    // });
    //.plugin('charlespockert/aurelia-bs-grid');
  aurelia.start().then(a => a.setRoot('bootstrapper'));

}
