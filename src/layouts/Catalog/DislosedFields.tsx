import { CheckSquare } from "react-feather";
import { useRecoilValue } from "recoil";
import {
    memberLevelState,
    memberProduceState,
    userAddressState,
} from "../../atoms/member";
import { ProduceType } from "../../data/products";
import { MemberLevelSuccess } from "../Redirect/MemberLevelSuccess";

export const DisclosedFields = () => {
    const memberLevel = useRecoilValue(memberLevelState);
    const userAddress = useRecoilValue(userAddressState);
    return (
        <div className="flex flex-col items-start space-y-4 w-full">
            {memberLevel ? <MemberLevelSuccess /> : undefined}
            {userAddress?.address && (
                <div className="w-full flex flex-row items-center justify-between">
                    <div className="font-light leading-tight text-base sm:text-lg w-full">
                        Address:
                    </div>

                    <div className="leading-tight text-base sm:text-lg rounded-lg flex items-center whitespace-nowrap">
                        {userAddress.address}
                    </div>
                </div>
            )}
            {userAddress?.city && (
                <div className="w-full flex flex-row items-center justify-between">
                    <div className="font-light leading-tight text-base sm:text-lg w-full">
                        City:
                    </div>

                    <div className="leading-tight text-base sm:text-lg rounded-lg flex items-center whitespace-nowrap">
                        {userAddress.city}
                    </div>
                </div>
            )}
            {userAddress?.state && (
                <div className="w-full flex flex-row items-center justify-between">
                    <div className="font-light leading-tight text-base sm:text-lg w-full">
                        State:
                    </div>

                    <div className="leading-tight text-base sm:text-lg rounded-lg flex items-center whitespace-nowrap">
                        {userAddress.state}
                    </div>
                </div>
            )}
        </div>
    );
};
