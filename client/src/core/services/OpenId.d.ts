declare module OpenIdTypes {
    export interface IServerConfiguration {
        issuer: string;
        jwks_uri: string;
        authorization_endpoint: string;
        token_endpoint: string;
        userinfo_endpoint: string;
        end_session_endpoint: string;
        check_session_iframe: string;
        revocation_endpoint: string;
        scopes_supported: string[];
        claims_supported: string[];
        response_types_supported: string[];
        response_modes_supported: string[];
        grant_types_supported: string[];
        subject_types_supported: string[];
        id_token_signing_alg_values_supported: string[];
        token_endpoint_auth_methods_supported: string[];
    }
}