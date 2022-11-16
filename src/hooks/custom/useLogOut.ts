import { useCallback } from "react";
import { useResetRecoilState } from "recoil";
import { cartState } from "../../atoms/cart";
import { authStateState, userCredentialState } from "../../atoms/user";

export const useLogout = () => {
    const resetCredential = useResetRecoilState(userCredentialState);
    const resetAuthState = useResetRecoilState(authStateState);
    const resetCart = useResetRecoilState(cartState);
    return useCallback(() => {
        resetAuthState();
        resetCredential();
        resetCart();
    }, [resetAuthState, resetCart, resetCredential]);
};
