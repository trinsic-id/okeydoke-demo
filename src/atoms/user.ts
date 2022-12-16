import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();
export enum AuthState {
    ANONYMOUS = "ANONYMOUS",
    VERIFIED = "VERIFIED",
}

export const authStateState = atom<AuthState>({
    key: "auth-state",
    default: AuthState.ANONYMOUS,
});
