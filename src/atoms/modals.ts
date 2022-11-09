import { atom } from "recoil";

export const isVerifyCredentialModalVisibleState = atom<boolean>({
    key: "verify-credential-modal-visible",
    default: false,
});

export const isRedirectErrorModalVisibleState = atom<boolean>({
    key: "redirect-error-modal-visible",
    default: false,
});
