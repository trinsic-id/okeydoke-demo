import { atom } from "recoil";

export enum IllustrationOptions {
    CreateTemplate,
    InviteIssuer,
    InviteVerifier,
    GovernanceFramework,
    IntegrateOIDC,
    IntegrateSDK,
}

export const illustrationSelectorState = atom<IllustrationOptions>({
    key: "illustration-state",
    default: IllustrationOptions.CreateTemplate,
});
