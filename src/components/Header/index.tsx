import React, { useMemo, useState } from "react";
import { Search, ShoppingCart, User } from "react-feather";
import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { Combobox, Listbox, Menu } from "@headlessui/react";
import { CartButton } from "./CartButton";
import { AccountButton } from "./AccountButton";
import { useLocation } from "react-use";

const Header = () => {
    const location = useLocation();
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

            <div className="flex flex-row space-x-6 items-center">
                <CartButton />
            </div>
        </div>
    ) : null;
};

export default Header;
