import { Switch } from "@headlessui/react";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo } from "react";
import { Filter, Trello } from "react-feather";
import { useLocation, useNavigate } from "react-router-dom";

import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
    MemberLevel,
    memberLevelObjState,
    memberLevelState,
    memberProduceState,
} from "../../atoms/member";
import {
    filteredProductsState,
    filterProductsState,
} from "../../atoms/products";
import {
    AuthState,
    authStateState,
    userCredentialState,
} from "../../atoms/user";
import { RateProduct } from "../../components/RateProduct";
import { VerifyCredentialModal } from "../../components/VerifyCredential";
import { defataultProducts } from "../../data/products";
import { useAddItem } from "../../hooks/custom/useAddItem";
import { AuthService } from "../../services/AuthService";
import { Card } from "./Card";
import { FilterButton } from "./FilterButton";

const Animations = {
    container: {
        visible: {
            opacity: 1,
            transition: {
                when: "beforeChildren",
                staggerChildren: 0.1,
            },
        },
        hidden: {
            opacity: 0,
            transition: {
                when: "afterChildren",
            },
        },
    },
    item: {
        visible: { opacity: 1, x: 0 },
        hidden: { opacity: 0, x: -100 },
    },
    filterText: {
        visible: { opacity: 1 },
        hidden: { opacity: 0 },
    },
};

const Catalog = () => {
    const memberLevel = useRecoilValue(memberLevelState);

    const memberLevelObj = useRecoilValue(memberLevelObjState);

    const memberProduceType = useRecoilValue(memberProduceState);
    const filteredProducts = useRecoilValue(filteredProductsState);

    return (
        <div className="w-full h-full bg-catalog-bg flex flex-col items-start">
            <div className="flex flex-row w-full justify-between p-4 shadow-2xl">
                <div className="flex flex-row items-start space-x-2">
                    <Trello size={28} className="stroke-green-600" />
                    <div className="text-2xl text-black">Products</div>
                </div>
                {memberProduceType && <FilterButton />}
            </div>
            <motion.div
                className="flex flex-col h-full overflow-y-scroll space-y-4 md:space-y-0 md:flex-row md:flex-wrap md:gap-4 items-start p-4"
                key="container"
                variants={Animations.container}
                initial="hidden"
                animate="visible"
            >
                {filteredProducts.map((product) => (
                    <Card
                        product={product}
                        {...memberLevelObj}
                        key={product.id}
                    />
                ))}
            </motion.div>
            <VerifyCredentialModal />
            <RateProduct />
        </div>
    );
};

export default Catalog;
