import { useEffect, useMemo } from "react";
import { useSetRecoilState } from "recoil";
import { cartAdjustedTotalState } from "../../../atoms/cart";
import { Product, ProductHeader } from "../../../data/products";
import { useMemberLevelAdjust } from "../../../hooks/custom/useMemberLevelAdjust";
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

    const setCartTotals = useSetRecoilState(cartAdjustedTotalState);

    const price = useMemo(() => {
        if (memberAdjustment) return memberAdjustment.newPrice * product.qty;
        return product.price * product.qty;
    }, [memberAdjustment, product]);

    useEffect(
        () =>
            setCartTotals((curVal) => ({
                ...curVal,
                [product.id]: price,
            })),
        [price, product, setCartTotals]
    );

    return (
        <div className="flex h-32 w-full flex-row space-x-4 py-3">
            <img
                className="h-full w-1/4 rounded-lg object-cover"
                src={product.image}
            />
            <div className="flex flex-1 flex-row justify-between">
                <div className="flex w-full flex-col place-content-center items-start justify-between">
                    <div className="text-xl text-black">{product.name}</div>

                    <div className="flex flex-row items-center space-x-2 divide-x-2">
                        {!isMember && (
                            <div className="flex flex-row items-center space-x-4">
                                <div
                                    className={`text-base font-medium sm:text-lg ${
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
                                        <div className="sm:text-md text-sm font-light text-gray-500 line-through">
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
                                <div className="text-base font-medium text-yellow-600 sm:text-lg ">
                                    {memberAdjustment.newPrice.toLocaleString(
                                        "en-US",
                                        {
                                            style: "currency",
                                            currency: "USD",
                                        }
                                    )}
                                </div>
                                <div className="sm:text-md text-sm font-light text-gray-500 line-through">
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
                                <div className="text-base font-medium text-gray-600 sm:text-lg ">
                                    {memberAdjustment.newPrice.toLocaleString(
                                        "en-US",
                                        {
                                            style: "currency",
                                            currency: "USD",
                                        }
                                    )}
                                </div>
                                <div className="sm:text-md text-sm font-light text-gray-400 line-through">
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
                                <div className="text-base font-medium text-amber-600 sm:text-lg ">
                                    {memberAdjustment.newPrice.toLocaleString(
                                        "en-US",
                                        {
                                            style: "currency",
                                            currency: "USD",
                                        }
                                    )}
                                </div>
                                <div className="sm:text-md text-sm font-light text-gray-500 line-through">
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
                        <div className="pl-2 text-green-500">In stock</div>
                    </div>
                    <div className="flex w-full flex-row justify-between space-x-4">
                        <CartQuantity product={product} />
                        <div className="text-lg text-black">
                            {price.toLocaleString("en-US", {
                                style: "currency",
                                currency: "USD",
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
