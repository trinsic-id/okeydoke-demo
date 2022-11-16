import { atom } from "recoil";
import { Product } from "../data/products";

export const isVerifyCredentialModalVisibleState = atom<boolean>({
    key: "verify-credential-modal-visible",
    default: false,
});

export const isRedirectErrorModalVisibleState = atom<boolean>({
    key: "redirect-error-modal-visible",
    default: false,
});

export const selectedRateProductState = atom<Product | undefined>({
    key: "rate-product",
    default: undefined,
});

export const isVerifiedCredentialModalVisibleState = atom<boolean>({
    key: "verified-credential-modal-visible",
    default: false,
});
