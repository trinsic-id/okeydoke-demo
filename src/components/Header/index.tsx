import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { CartButton } from "./CartButton";
import { useLocation } from "react-use";

import { memberLevelState } from "../../atoms/member";
import { cartTotalState } from "../../atoms/cart";
import { AuthState, authStateState } from "../../atoms/user";
import { LogOut } from "react-feather";
import { useLogout } from "../../hooks/custom/useLogOut";

const Header = () => {
    const location = useLocation();
    const memberLevel = useRecoilValue(memberLevelState);
    const { totalQty } = useRecoilValue(cartTotalState);
    const isVisible = useMemo(() => {
        if (!location) return false;
        if (location.pathname === "/redirect") return false;
        if (location.pathname === "/load-ecosystem") return false;
        return true;
    }, [location.pathname]);

    const isCredentialVerified = useRecoilValue(authStateState);
    const resetEverything = useLogout();
    return isVisible ? (
        <div className="flex flex-row items-center justify-between w-full border-b border-gray-300 pb-2 p-4">
            <Link to="/">
                <div className="text-2xl font-medium">OkeyDoke</div>
            </Link>
            <div className="flex flex-row space-x-4 items-center">
                {totalQty || memberLevel ? <CartButton /> : <CartButton />}
                {isCredentialVerified === AuthState.VERIFIED && (
                    <div
                        className="flex flex-row items-center space-x-2 cursor-pointer"
                        onClick={resetEverything}
                    >
                        <LogOut size={22} className="stroke-black" />
                        <div className="text-md text-black font-semibold">
                            Log out
                        </div>
                    </div>
                )}
            </div>
        </div>
    ) : null;
};

export default Header;
