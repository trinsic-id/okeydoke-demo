import { useMemo } from "react";
import { useRecoilValue } from "recoil";
import { memberLevelObjState } from "../../atoms/member";
import { Product } from "../../data/products";
import {
    applyBronzeDiscount,
    applyGoldDiscount,
    applySilverDiscount,
} from "../../utils/goldDiscount";

export const useMemberLevelAdjust = (product: Product) => {
    const { isGoldMember, isSilverMember, isBronzeMember } =
        useRecoilValue(memberLevelObjState);

    const isMember = useMemo(
        () => isBronzeMember || isSilverMember || isGoldMember,
        [isBronzeMember, isSilverMember, isGoldMember]
    );

    const memberAdjustment = useMemo(() => {
        if (!isMember) return undefined;

        if (isGoldMember)
            return {
                newPrice: applyGoldDiscount(product.price),
                prevPrice: product.price,
            };
        if (isSilverMember)
            return {
                newPrice: applySilverDiscount(product.price),
                prevPrice: product.price,
            };
        if (isBronzeMember)
            return {
                newPrice: applyBronzeDiscount(product.price),
                prevPrice: product.price,
            };
    }, [product, isMember, isGoldMember, isSilverMember, isBronzeMember]);
    return {
        isGoldMember,
        isSilverMember,
        isBronzeMember,
        isMember,
        memberAdjustment,
    };
};
