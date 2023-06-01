import { useSetRecoilState } from "recoil";
import { isVerifyCredentialModalVisibleState } from "../../../atoms/modals";

export const VerifyCredential = () => {
    const setVerifyModalVisible = useSetRecoilState(
        isVerifyCredentialModalVisibleState
    );
    return (
        <button
            className="flex flex-row items-center space-x-6 rounded-lg  border-2 border-orange-500 py-1 px-2 font-medium text-orange-500 hover:border-opacity-0 hover:bg-orange-500 hover:text-white md:text-sm"
            onClick={() => setVerifyModalVisible(true)}
        >
            Want a better deal?
        </button>
    );
};
