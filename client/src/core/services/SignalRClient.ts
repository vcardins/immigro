import { singleton, autoinject } from 'aurelia-framework';
import { IApplicationSettings, ApplicationSettings } from 'core/Settings';
import { Logger, AuthResult, AuthService } from 'core/Services';
import * as uuid from 'node-uuid';
import * as $ from 'jquery';
import 'ms-signalr-client';

@autoinject
export class SignalRClient {

    private appSettings:IApplicationSettings;
    token:string;
    handlers:any = {};
    connection:any;
    proxy:any;
    vm:SignalRClient;
    options:any;
    hub:string;
    stateConversion:any = {
      0: 'connecting',
      1: 'connected',
      2: 'reconnecting',
      4: 'disconnected'
    };

    constructor(authService:AuthService, settings:ApplicationSettings, private logger:Logger, hubName:string) {

      this.appSettings = settings.instance;
      connection = $.hubConnection(this.appSettings.signalR.host);
      token = authService.token;
      proxy = connection.createHubProxy(hubName);
      hub:hubName;
      $.signalR.ajaxDefaults.headers = { Authorization: 'Bearer ' + token };
      connection.logging = !!this.appSettings.signalR.logging;

      connection.disconnected(function() {
        if (authService.isAuthenticated()) {
            setTimeout(function () { this.subscribe.bind(this); }, 1000);
        }
      });
      proxy.on('handleEvent', this.handleEvent.bind(this));
    }

    private connectionStateChanged(state) {
      console.info(hub + ' state change: ' + stateConversion[state.oldState]
          + ' => ' + stateConversion[state.newState]);
    }

    listenStatesChanges(conn) {
      console.log(conn);
      let _self = this;
      if (conn) {console.info(hub + ' State: ' + stateConversion[conn.state]);}
      connection.stateChanged(connectionStateChanged);
    }

    subscribe(options:any = {}) {
      let self = this;
      options.transport = options.transport || 'longPolling';
      options.withCredentials = false;
      connection.start(options).
          done(self.listenStatesChanges).
          fail(e => { self.logger.error({message:e.message, title:'SignalR Incompatible Version'}) });
    }

    unSubscribe() {
      connection.stop();
      proxy = null;
    }

    handleEvent(e) {
      console.info(e);
      var eventHandlers = (handlers[e.module] || {})[e.action] || [];
      eventHandlers.forEach(function(fn) {
          fn(e.data, e.userId);
      });
    }

    on(module:string, action:string, fn:Function) {
      if (action === undefined) { action = '$undefined'; }
      handlers[module] = handlers[module] || {};
      handlers[module][action] = handlers[module][action] || [];
      handlers[module][action].push(fn);
    }

    off(module:string, action:string, fn:Function) {
      var eventHandlers = (handlers[module] && handlers[module][action]) || [];
      if (fn) {
        eventHandlers.splice(eventHandlers.indexOf(fn), 1);
      } else {
        if (eventHandlers[module]) {
            eventHandlers[module] = [];
        }
      }
    }

    invoke () {
      let len = arguments.length;
      let args = Array.prototype.slice.call(arguments);
      let callback;

      if (len > 1) {
        callback = args.pop();
      }

      proxy.invoke.apply(proxy, args).done(result => {
        if (callback) {
          callback(result);
        }
      });
    }
}
