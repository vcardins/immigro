import { autoinject } from 'aurelia-framework';
import { Logger, AuthService, SignalRClient } from 'core/Services';
import { IApplicationSettings, ApplicationSettings } from 'core/Settings';

//@singleton()
@autoinject()
export class RealTime extends SignalRClient {

  constructor(authService:AuthService, appSettings: ApplicationSettings, logger:Logger) {
    super(authService, appSettings, logger, 'MessagingHub');
  }

}
