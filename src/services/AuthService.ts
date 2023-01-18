import { IdTokenClaims, Log, User, UserManager } from "oidc-client-ts";
import { CredentialDerivedProof } from "../models/credential";

const clientRoot: string = `${window.location.origin}/`;

export const defaultEcosystem = "okeydoke";
export const defaultSchema =
    "https://schema.trinsic.cloud/okeydoke/foodsalvagerlicense";

export const defaultAuthSettings = {
    authority: "https://connect.trinsic.cloud",
    client_id: "okeydoke",
    redirect_uri: `${clientRoot}redirect`,
    silent_redirect_uri: `${clientRoot}silent-renew`,
    post_logout_redirect_uri: `${clientRoot}`,
    response_type: "code",
    scope: "openid",
    extraQueryParams: {
        "trinsic:ecosystem": defaultEcosystem,
        "trinsic:schema": defaultSchema,
    },
};

export class AuthService {
    public userManager: UserManager;
    public settings: typeof defaultAuthSettings | undefined;
    constructor(settings: typeof defaultAuthSettings) {
        this.settings = settings;
        this.userManager = new UserManager(this.settings);
        Log.setLogger(console);
    }

    public getUser(): Promise<User | null> {
        return this.userManager.getUser();
    }

    public login(): Promise<void> {
        return this.userManager.signinRedirect();
    }

    public renewToken(): Promise<User | null> {
        return this.userManager.signinSilent();
    }

    public logout(): Promise<void> {
        return this.userManager.signoutRedirect();
    }

    public async signinRedirect() {
        const user = await this.userManager.signinRedirectCallback();
        console.log("Logged in user", user);
    }
}
