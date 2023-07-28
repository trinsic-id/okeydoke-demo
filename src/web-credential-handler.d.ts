declare module "web-credential-handler" {
    export async function installHandler();
    export async function activateHandler(options: ActivateHandlerOptions);
    export async function receiveCredentialEvent(): any;

    interface ActivateHandlerOptions {
        mediatorOrigin: string;
        get: function;
        store: function;
    }
}
