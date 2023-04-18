import { useState } from "react";
import { useSetRecoilState } from "recoil";
import { selectedRateProductState } from "../../../atoms/modals";
import { VerifyCredential } from "../../../components/Shop/BetterDeal";
import { Product, ProductHeader } from "../../../data/products";
import { useMemberLevelAdjust } from "../../../hooks/custom/useMemberLevelAdjust";
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
    const setSelectedProduct = useSetRecoilState(selectedRateProductState);
    return (
        <div className="flex w-full flex-col items-start gap-3 rounded-lg bg-white p-4">
            <div className="flex h-12 w-full flex-row items-center justify-between">
                {product.header === ProductHeader.Sale &&
                    product.discount &&
                    !isMember && <Sale discount={product.discount} />}
                {product.header === ProductHeader.NewSeason && !isMember && (
                    <NewSeason />
                )}
                {memberAdjustment && isGoldMember && <GoldMember />}
                {memberAdjustment && isSilverMember && <SilverMember />}
                {memberAdjustment && isBronzeMember && <BronzeMember />}
                {product.header !== ProductHeader.Sale &&
                    product.header !== ProductHeader.NewSeason &&
                    !isGoldMember &&
                    !isSilverMember &&
                    !isBronzeMember && <div className="opacity-0">A</div>}
                {!isMember && <VerifyCredential />}
            </div>

            <div className="flex w-full flex-col items-center space-y-3 pt-3 pb-3">
                <div className="relative flex h-48">
                    <img
                        className="w-full rounded-lg object-cover"
                        src={product.image}
                    />
                    <div
                        className="absolute bottom-0 right-0"
                        onMouseLeave={() => setHoverPos(undefined)}
                        onClick={() => setSelectedProduct(product)}
                        title="Click to rate!"
                    >
                        <div className="rounded-lg bg-gray-600 bg-opacity-80 p-2 text-xs hover:bg-gray-500">
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
                                    {product.prevPrice.toLocaleString("en-US", {
                                        style: "currency",
                                        currency: "USD",
                                    })}
                                </div>
                            )}
                    </div>
                )}

                {isGoldMember && memberAdjustment && (
                    <div className="flex flex-row items-center space-x-4">
                        <div className="text-lg font-medium text-yellow-600 ">
                            {memberAdjustment.newPrice.toLocaleString("en-US", {
                                style: "currency",
                                currency: "USD",
                            })}
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
                            {memberAdjustment.newPrice.toLocaleString("en-US", {
                                style: "currency",
                                currency: "USD",
                            })}
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
                            {memberAdjustment.newPrice.toLocaleString("en-US", {
                                style: "currency",
                                currency: "USD",
                            })}
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
    );
};
