import { singleton, inject } from 'aurelia-framework';
import * as IO from 'socket.io-client';
import * as Promise from 'bluebird';
import * as _ from 'lodash';
import * as uuid from 'node-uuid';

@singleton()
export class SignalRClient {

    ws:any;
    url:string;
    pendingPromises:any = {};
    callbacks:any = {};
    connected:boolean = false;

    constructor() {}

    start() {
        console.info(`SocketClient instantiating with url: ${ this.url}`);
        // this.ws = IO.connect(this.url, {transports: ['websocket']});
        //
        // this.ws.on('connect', () => {
        //     this.handleConnect();
        // });
        // this.ws.on('*', (eventData) => {
        //     this.handleEvent(eventData);
        // });
        // this.ws.on('disconnect', () => {
        //     this.handleDisconnect();
        // });
    }

    setOnConnectionCallback(callback) {
        console.info(`SocketClient set onConnect callback.`);
        // this.callbacks['connected'] = callback;
        // if (this.connected) {
        //     callback();
        // }
    }

    setOnDisconnectCallback(callback) {
        console.info(`SocketClient set onDisconnect callback.`);
        // this.callbacks[`disconnected`] = callback;
    }

    setEventCallback(event, callback) {
        console.info(`SocketClient added a callback for event: ${event}.`);
        // this.callbacks[event] = callback;
    }

    handleConnect() {
        console.info(`SocketClient connected.`);
        // this.connected = true;
        // if (this.callbacks['connected']) {
        //     console.info(`SocketClient firing onConnect callback...`);
        //     this.callbacks['connected']();
        // }
        // else {
        //     console.info(`SocketClient NO ON CONNECT CALLBACKS REGISTERED YET!`);
        // }
    }

    handleEvent(eventData) {
        console.info(`SocketClient received incoming event with data: ${JSON.stringify(eventData)}`);
        // let req = this.pendingPromises[eventData.requestID];
        // if (req) {
        //     console.info(`SocketClient received response for pending promise: ${JSON.stringify(eventData.requestID)}`);
        //     req.deferred.fulfill({
        //         code: eventData.code,
        //         payload: eventData.payload
        //     });
        //     let end = new Date().getTime();
        //     console.info(`SocketClient request: ${eventData.requestID} took: ${end - req.start}ms`);
        //     delete this.pendingPromises[eventData.requestID];
        // } else {
        //     console.info(`SocketClient received response for no promise, using callback.`);
        //     let callback = this.callbacks[eventData.event];
        //     if (callback) {
        //         console.info(`SocketClient firing callback for: ${JSON.stringify(eventData)}!`);
        //         callback({code: eventData.code, payload: eventData.payload});
        //     }
        //     else {
        //         console.info(`SocketClient: No callback was registered for event: ${eventData.event}, ignoring the data...`);
        //     }
        // }
    }

    handleDisconnect() {
        console.info(`SocketClient disconnected.`);
        // this.connected = false;
        // this.cancelAllPendingPromises();
        // if (this.callbacks['disconnected']) {
        //     console.info(`SocketClient firing onDisconnect callback...(Remember to login on reconnect!)`);
        //     this.callbacks['disconnected']();
        // }
        // else {
        //     console.info(`SocketClient NO ON DISCONNECT CALLBACKS REGISTERED YET!`);
        // }
    }

    send(request) {
        console.info(`SocketClient sending the request: ${JSON.stringify(request)} over the wire...`);
        //this.ws.emit('*', request);
    }

    makeRequest(requestEvent, payload) {
        console.info(`SocketClient: building request with payload: ${JSON.stringify(payload)}`);
        // let requestID = uuid.v4();
        // let deferred = Promise.pending();
        // this.pendingPromises[requestID] = {deferred: deferred, start: new Date().getTime()};
        // this.send({
        //     requestID: requestID,
        //     request: requestEvent,
        //     payload: payload
        // });
        // return deferred.promise;
    }

    cancelAllPendingPromises() {
        console.info(`SocketClient cancelling all pending promises...`);
        // _.forEach(this.pendingPromises, (p) => {
        //     p.deferred.reject({
        //         error: 'Disconnected or timeout.'
        //     });
        // });
    }

}
