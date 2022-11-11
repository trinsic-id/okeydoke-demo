import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { CartButton } from "./CartButton";
import { useLocation } from "react-use";

import { memberLevelState } from "../../atoms/member";
import { cartTotalState } from "../../atoms/cart";

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

    return isVisible ? (
        <div className="flex flex-row items-center justify-between w-full border-b border-gray-300 pb-2 p-4">
            <Link to="/">
                <div className="text-2xl font-medium">OkieDoke</div>
            </Link>

            {totalQty || memberLevel ? <CartButton /> : <CartButton />}
        </div>
    ) : null;
};

export default Header;
