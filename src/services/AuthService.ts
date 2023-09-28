import { ConnectClient } from "@trinsic/trinsic";

export const defaultEcosystem = "okeydoke";
export const defaultSchema = "https://schema.trinsic.cloud/okeydoke/foodsalvagerlicense";


export class AuthService {
    public connectClient: ConnectClient;
    public user: any | null = null;
    constructor() {
        this.connectClient = new ConnectClient();
    }

    public getUser(): Promise<any | null> {
        return this.user;
    }

    public async loginPopup() {
        this.user = await this.connectClient.requestVerifiableCredential({
            ecosystem: defaultEcosystem,
            schema: defaultSchema,
        });
        return this.user;
    }

    public login(): Promise<void> {
        return this.loginPopup();
    }

    public renewToken(): Promise<void> {
        return Promise.resolve();
    }

    public logout(): Promise<void> {
        this.user = null;
        return Promise.resolve();
    }

    public async signinRedirect() {
        return this.loginPopup();
    }
}

export const authService = new AuthService();
