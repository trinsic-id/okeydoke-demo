import { useMemo } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-use";
import { useRecoilValue } from "recoil";
import { CartButton } from "./CartButton";

import { LogOut } from "react-feather";
import { cartTotalState } from "../../atoms/cart";
import { businessLogoState, memberLevelState } from "../../atoms/member";
import { AuthState, authStateState } from "../../atoms/user";
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
    const businessLogo = useRecoilValue(businessLogoState);

    const resetEverything = useLogout();
    return isVisible ? (
        <div className="flex w-full flex-row items-center justify-between border-b border-gray-300 p-4 pb-2">
            <Link to="/">
                <div className="flex flex-col items-start justify-between">
                    <div className="text-2xl font-medium">
                        Seeds R'Us
                    </div>
                    <div className="text-xs font-medium">
                        Part of the <b>OkeyDoke</b> ecosystem
                    </div>
                </div>
            </Link>
            <div className="flex flex-row items-center space-x-4">
                {businessLogo && (
                    <img src={businessLogo} className="h-6 w-auto rounded-lg" />
                )}
                {totalQty || memberLevel ? <CartButton /> : <CartButton />}
                {isCredentialVerified === AuthState.VERIFIED && (
                    <div
                        className="flex cursor-pointer flex-row items-center space-x-2"
                        onClick={resetEverything}
                    >
                        <LogOut size={22} className="stroke-black" />
                        <div className="text-md font-semibold text-black">
                            Log out
                        </div>
                    </div>
                )}
            </div>
        </div>
    ) : null;
};

export default Header;
