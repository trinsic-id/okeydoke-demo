import { Calendar, ShoppingBag, ShoppingCart } from "react-feather";
import { Link } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { cartTotalState } from "../../atoms/cart";
import { memberLevelState } from "../../atoms/member";
import { isVerifyCredentialModalVisibleState } from "../../atoms/modals";

export const VerifyCredential = () => {
    const [isVerifyModalVisible, setVerifyModalVisible] = useRecoilState(
        isVerifyCredentialModalVisibleState
    );
    return (
        <button
            className="border-2 border-blue-500 hover:border-opacity-0 hover:bg-blue-500 rounded-lg  py-1 px-2 flex flex-row items-center space-x-6 text-blue-500 hover:text-white md:text-sm font-medium"
            onClick={() => setVerifyModalVisible(true)}
        >
            Want a better deal?
        </button>
    );
};
