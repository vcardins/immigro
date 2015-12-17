import { autoinject } from 'aurelia-framework';
import { IApplicationSettings, ApplicationSettings } from 'core/Settings';
import { HttpClient } from 'aurelia-http-client';
import { Base64 } from 'core/helpers/Base64';

export class AccessTokenRequestResult {
    success: boolean = false;
    errorText: string = '';
    token: string = null;
}

@autoinject
export class OpenIdService {
    appSettings: IApplicationSettings;
    httpClient: HttpClient = null;
    configEndpoint: string = 'core/.well-known/openid-configuration';
    serverConfiguration: OpenIdTypes.IServerConfiguration = null;
    base64Helper: Base64 = null;

    constructor(appSettings: ApplicationSettings, httpClient: HttpClient, base64Helper: Base64) {
        this.appSettings = appSettings.instance;
        this.httpClient = httpClient;
        this.base64Helper = base64Helper;
    }

    getServerConfiguration() {
        var url = `${this.appSettings.api.url}${this.configEndpoint}`;
        return this.httpClient.get(url).then(responseResult => {
            this.serverConfiguration = JSON.parse(responseResult.response);
        });
    }

    requestAccessToken(userName: string, password: string): Promise<AccessTokenRequestResult> {
        var loginResult = new AccessTokenRequestResult();
        var promise: Promise<AccessTokenRequestResult> = null;

        if (this.serverConfiguration === null) {
            promise = new Promise<AccessTokenRequestResult>((resolve, reject) => {
                this.getServerConfiguration().then(something => {
                    if (this.appSettings.isInDebugMode) {
                        console.log("OpenIdService => this.requestAccessToken => Recursive");
                    }
                    return this.requestAccessToken(userName, password);
                });
            });

            return promise;
        }

        var credentials = `${this.appSettings.api.clientId}:${this.appSettings.api.clientSecret}`;
        var credentialsBase64Value = this.base64Helper.encode(credentials);
        var credentialsHeaderValue = `${"Basic "}${credentialsBase64Value}`;
        var grantContent = `grant_type=${this.appSettings.api.grantType}`;
        var userNameContent = `${"&username="}${userName}`;
        var passwordContent = `${"&password="}${password}`;
        var scopeContent = `${"&scope="}${this.appSettings.authorizationScope}`;

        var bodyContent = `${grantContent}${userNameContent}${passwordContent}${scopeContent}`;

        promise = new Promise<AccessTokenRequestResult>((resolve, reject) => {
            this.httpClient.createRequest(this.serverConfiguration.token_endpoint)
                .withHeader('Authorization', credentialsHeaderValue)
                .withHeader('Content-Type', 'application/x-www-form-urlencoded')
                .asPost()
                .withContent(bodyContent)
                .send()
                .then(response => {
                    if (response.isSuccess) {
                        var loginResponse = JSON.parse(response.response);
                        loginResult.token = loginResponse.access_token;
                        loginResult.success = true;
                        resolve(loginResult);
                    } else {
                        var errorResponse = JSON.parse(response.response);
                        loginResult.success = false;
                        loginResult.errorText = errorResponse;
                        resolve(loginResult);
                    }
                }).catch(error => {
                    var errorResponse = JSON.parse(error.response);
                    loginResult.success = false;
                    loginResult.errorText = errorResponse.error;
                    reject(loginResult);
                });
        });

        return promise;
    }
}
