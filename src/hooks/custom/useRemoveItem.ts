import { useRecoilState, useSetRecoilState } from "recoil";
import { cartAdjustedTotalState, cartState } from "../../atoms/cart";
import { Product } from "../../data/products";

export const useRemoveItem = () => {
    const [items, setItems] = useRecoilState(cartState);
    const setCartTotals = useSetRecoilState(cartAdjustedTotalState);
    return (product: Product) => {
        setItems(items.filter((item) => item.id !== product.id));
        setCartTotals((curVal) => ({ ...curVal, [product.id]: 0 }));
    };
};
