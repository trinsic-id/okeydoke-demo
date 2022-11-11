import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";
import { Bookmark, ShoppingCart, Star } from "react-feather";
import { useRecoilState, useRecoilValue } from "recoil";
import { memberLevelState, memberProduceState } from "../../atoms/member";
import {
    isRateProductModalVisibleState,
    selectedRateProductState,
} from "../../atoms/modals";
import { filterProductsState } from "../../atoms/products";
import { userCredentialState } from "../../atoms/user";
import { VerifyCredential } from "../../components/BetterDeal";
import { Product, ProductHeader } from "../../data/products";

import { useAddItem } from "../../hooks/custom/useAddItem";
import { useMemberLevelAdjust } from "../../hooks/custom/useMemberLevelAdjust";
import {
    applyBronzeDiscount,
    applyGoldDiscount,
    applySilverDiscount,
} from "../../utils/goldDiscount";
import { BronzeMember } from "./BronzeMember";
import { CardButtons } from "./CardButtons";
import { GoldMember } from "./GoldMember";
import { NewSeason } from "./NewSeason";
import { Sale } from "./Sale";
import { SilverMember } from "./SilverMember";
import { Stars } from "./Stars";

const Animations = {
    visible: { opacity: 1, x: 0 },
    hidden: { opacity: 0, x: -100 },
};

export interface CardProps {
    product: Product;
    isGoldMember: boolean;
    isSilverMember: boolean;
    isBronzeMember: boolean;
}
export const Card = ({
    product,
    isGoldMember,
    isSilverMember,
    isBronzeMember,
}: CardProps) => {
    const { isMember, memberAdjustment } = useMemberLevelAdjust(product);

    const [hoverPos, setHoverPos] = useState<number | undefined>(undefined);
    const [selectedProduct, setSelectedProduct] = useRecoilState(
        selectedRateProductState
    );
    return (
        <AnimatePresence>
            <motion.div
                variants={Animations}
                initial={Animations.hidden}
                animate={Animations.visible}
                exit={Animations.hidden}
                key={product.id + "child"}
                className="flex flex-col items-center rounded-lg w-full md:max-w-md  hover:shadow-xl"
            >
                <div className="flex flex-col items-start w-full gap-3 p-4 rounded-lg bg-white">
                    <div className="flex flex-row w-full items-center justify-between h-12">
                        {product.header === ProductHeader.Sale &&
                            product.discount &&
                            !isMember && <Sale discount={product.discount} />}
                        {product.header === ProductHeader.NewSeason &&
                            !isMember && <NewSeason />}
                        {memberAdjustment && isGoldMember && <GoldMember />}
                        {memberAdjustment && isSilverMember && <SilverMember />}
                        {memberAdjustment && isBronzeMember && <BronzeMember />}
                        {product.header !== ProductHeader.Sale &&
                            product.header !== ProductHeader.NewSeason &&
                            !isGoldMember &&
                            !isSilverMember &&
                            !isBronzeMember && (
                                <div className="opacity-0">A</div>
                            )}
                        {!isMember && <VerifyCredential />}
                    </div>

                    <div className="flex flex-col items-center w-full pt-3 space-y-3 pb-3">
                        <div className="flex relative w-2/3 max-h-36">
                            <img
                                className="rounded-lg object-cover"
                                src={product.image}
                            />
                            <div
                                className="absolute bottom-0 right-0"
                                onMouseLeave={() => setHoverPos(undefined)}
                                onClick={() => setSelectedProduct(product)}
                                title="Click to rate!"
                            >
                                <div className="bg-gray-600 hover:bg-gray-500 bg-opacity-80 text-xs rounded-lg p-2">
                                    <Stars
                                        score={product.score}
                                        hoverPos={hoverPos}
                                        setHoverPos={setHoverPos}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="text-xl font-medium text-black ">
                            {product.name}
                        </div>
                        <div className="text-md font-light text-gray-500">
                            {product.subTitle}
                        </div>

                        {!isMember && (
                            <div className="flex flex-row items-center space-x-4">
                                <div
                                    className={`text-lg font-medium ${
                                        product.header === ProductHeader.Sale
                                            ? "text-red-600"
                                            : "text-black"
                                    }`}
                                >
                                    {product.price.toLocaleString("en-US", {
                                        style: "currency",
                                        currency: "USD",
                                    })}
                                </div>
                                {product.header === ProductHeader.Sale &&
                                    product.prevPrice && (
                                        <div className="text-md font-light text-gray-500 line-through">
                                            {product.prevPrice.toLocaleString(
                                                "en-US",
                                                {
                                                    style: "currency",
                                                    currency: "USD",
                                                }
                                            )}
                                        </div>
                                    )}
                            </div>
                        )}

                        {isGoldMember && memberAdjustment && (
                            <div className="flex flex-row items-center space-x-4">
                                <div className="text-lg font-medium text-yellow-600 ">
                                    {memberAdjustment.newPrice.toLocaleString(
                                        "en-US",
                                        {
                                            style: "currency",
                                            currency: "USD",
                                        }
                                    )}
                                </div>
                                <div className="text-md font-light text-gray-500 line-through">
                                    {memberAdjustment.prevPrice.toLocaleString(
                                        "en-US",
                                        {
                                            style: "currency",
                                            currency: "USD",
                                        }
                                    )}
                                </div>
                            </div>
                        )}
                        {isSilverMember && memberAdjustment && (
                            <div className="flex flex-row items-center space-x-4">
                                <div className="text-lg font-medium text-gray-600 ">
                                    {memberAdjustment.newPrice.toLocaleString(
                                        "en-US",
                                        {
                                            style: "currency",
                                            currency: "USD",
                                        }
                                    )}
                                </div>
                                <div className="text-md font-light text-gray-400 line-through">
                                    {memberAdjustment.prevPrice.toLocaleString(
                                        "en-US",
                                        {
                                            style: "currency",
                                            currency: "USD",
                                        }
                                    )}
                                </div>
                            </div>
                        )}
                        {isBronzeMember && memberAdjustment && (
                            <div className="flex flex-row items-center space-x-4">
                                <div className="text-lg font-medium text-amber-600 ">
                                    {memberAdjustment.newPrice.toLocaleString(
                                        "en-US",
                                        {
                                            style: "currency",
                                            currency: "USD",
                                        }
                                    )}
                                </div>
                                <div className="text-md font-light text-gray-500 line-through">
                                    {memberAdjustment.prevPrice.toLocaleString(
                                        "en-US",
                                        {
                                            style: "currency",
                                            currency: "USD",
                                        }
                                    )}
                                </div>
                            </div>
                        )}
                    </div>

                    <CardButtons product={product} />
                </div>
                {/* <div className="flex flex-row items-center justify-between w-full rounded-b-lg border-gold-star bg-indigo-400 px-4 py-2">
                    <div className="text-lg font-medium text-white">
                        Certified Rating
                    </div>
                    <Stars score={product.score} />
                </div> */}
            </motion.div>
        </AnimatePresence>
    );
};
