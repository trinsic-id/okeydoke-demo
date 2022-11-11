import { useMemo, useState } from "react";
import { useRecoilValue } from "recoil";
import { memberLevelObjState } from "../../atoms/member";
import { Product, ProductHeader } from "../../data/products";
import { useMemberLevelAdjust } from "../../hooks/custom/useMemberLevelAdjust";
import {
    applyBronzeDiscount,
    applyGoldDiscount,
    applySilverDiscount,
} from "../../utils/goldDiscount";
import { CartQuantity } from "./CartQuantity";

interface CartItemProps {
    product: Product;
}

export const CartItem = ({ product }: CartItemProps) => {
    const {
        isMember,
        memberAdjustment,
        isGoldMember,
        isBronzeMember,
        isSilverMember,
    } = useMemberLevelAdjust(product);

    const price = useMemo(() => {
        if (memberAdjustment) return memberAdjustment.newPrice * product.qty;
        return product.price * product.qty;
    }, [memberAdjustment, product]);

    return (
        <div className="flex flex-row w-full py-3 h-32 space-x-4">
            <img
                className="h-full rounded-lg w-1/4 object-cover"
                src={product.image}
            />
            <div className="flex flex-row flex-1 justify-between">
                <div className="flex flex-col items-start place-content-center w-64 justify-between">
                    <div className="text-xl text-black">{product.name}</div>

                    <div className="flex flex-row items-center divide-x-2 space-x-2">
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
                        <div className="text-green-500 pl-2">In stock</div>
                    </div>
                    <CartQuantity product={product} />
                </div>
                <div className="flex flex-col items-start place-content-center w-64 justify-between">
                    <div className="text-black">
                        {price.toLocaleString("en-US", {
                            style: "currency",
                            currency: "USD",
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};
