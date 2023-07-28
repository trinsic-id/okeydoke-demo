declare module "credential-handler-polyfill" {
    export interface PolyfillOptions {
        mediatorOrigin: string;
    }
    export function loadOnce(
        options: PolyfillOptions | string | undefined
    ): Promise<CredentialHandlerPolyfill | boolean>;

    interface WebCredentialOptions {
        recommendedHandlerOrigins: string[];
        protocols: any;
    }

    export interface WebCredential {
        type: string;
        dataType: string;
        data: any;
        options: WebCredentialOptions;
    }

    interface PermissionManager {
        query(permissionDesc: any): any;
        request(permissionDesc: any): any;
        revoke(permissionDesc: any): any;
    }

    interface CredentialManager {
        static requestPermission(): string;
    }

    interface CredentialsContainer {
        get(options: any): WebCredential | null;
        store(credential: WebCredential): WebCredential | null;
    }

    interface CredentialHandlerPolyfill {
        permissions: PermissionManager;
        CredentialManager: CredentialManager;
        credentials: CredentialsContainer;
    }
}
