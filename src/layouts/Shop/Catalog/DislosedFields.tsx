import { useRecoilValue } from "recoil";
import {
    businessLogoState,
    memberLevelState,
    memberProduceState,
    userAddressState,
} from "../../../atoms/member";
import { MemberLevelSuccess } from "../Redirect/MemberLevelSuccess";

export const DisclosedFields = () => {
    const memberLevel = useRecoilValue(memberLevelState);
    const userAddress = useRecoilValue(userAddressState);
    const memberProduce = useRecoilValue(memberProduceState);
    const businessLogo = useRecoilValue(businessLogoState);

    return (
        <div className="flex w-full flex-col items-start space-y-4">
            {businessLogo && (
                <div className="flex w-full flex-row items-center justify-between">
                    <div className="w-full text-base font-light leading-tight sm:text-lg">
                        Business profile:
                    </div>

                    <img src={businessLogo} className="h-6 w-auto rounded-lg" />
                </div>
            )}

            {memberLevel ? (
                <MemberLevelSuccess />
            ) : (
                <>
                    {memberProduce ? (
                        <div className="flex w-full flex-row items-center justify-between">
                            <div className="w-full text-base font-light leading-tight sm:text-lg">
                                Produce type:
                            </div>

                            <div className="flex items-center whitespace-nowrap rounded-lg text-base leading-tight sm:text-lg">
                                {memberProduce}
                            </div>
                        </div>
                    ) : (
                        <div className="flex w-full flex-row items-center justify-between">
                            <div className="w-full text-base font-light leading-tight sm:text-lg">
                                Produce type:
                            </div>

                            <div className="flex items-center whitespace-nowrap rounded-lg text-base leading-tight sm:text-lg">
                                {`-`}
                            </div>
                        </div>
                    )}
                </>
            )}
            {userAddress?.address && (
                <div className="flex w-full flex-row items-center justify-between">
                    <div className="w-full text-base font-light leading-tight sm:text-lg">
                        Address:
                    </div>

                    <div className="flex items-center whitespace-nowrap rounded-lg text-base leading-tight sm:text-lg">
                        {userAddress.address}
                    </div>
                </div>
            )}
            {userAddress?.city && (
                <div className="flex w-full flex-row items-center justify-between">
                    <div className="w-full text-base font-light leading-tight sm:text-lg">
                        City:
                    </div>

                    <div className="flex items-center whitespace-nowrap rounded-lg text-base leading-tight sm:text-lg">
                        {userAddress.city}
                    </div>
                </div>
            )}
            {userAddress?.state && (
                <div className="flex w-full flex-row items-center justify-between">
                    <div className="w-full text-base font-light leading-tight sm:text-lg">
                        State:
                    </div>

                    <div className="flex items-center whitespace-nowrap rounded-lg text-base leading-tight sm:text-lg">
                        {userAddress.state}
                    </div>
                </div>
            )}
        </div>
    );
};
