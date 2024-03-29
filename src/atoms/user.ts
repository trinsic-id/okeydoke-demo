import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";
import { CredentialDerivedProof } from "../models/credential";

const { persistAtom } = recoilPersist();
export enum AuthState {
    ANONYMOUS = "ANONYMOUS",
    VERIFIED = "VERIFIED",
}

export const authStateState = atom<AuthState>({
    key: "auth-state",
    default: AuthState.ANONYMOUS,
    effects_UNSTABLE: [persistAtom],
});

export const userCredentialState = atom<CredentialDerivedProof | undefined>({
    key: "user-credential-state",
    default: undefined,
    effects_UNSTABLE: [persistAtom],
});
