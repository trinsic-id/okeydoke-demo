import { useRecoilValue } from "recoil";
import { cartState, cartTotalPriceState } from "../../atoms/cart";
import dayjs from "dayjs";
import { useMemo } from "react";
import {
    memberLevelObjState,
    memberLevelState,
    userAddressState,
} from "../../atoms/member";
import { GoldMember } from "../../components/VerifyCredential/GoldMember";
import { SilverMember } from "../../components/VerifyCredential/SilverMember";
import { BronzeMember } from "../../components/VerifyCredential/BronzeMember";
import { AlertCircle, CreditCard } from "react-feather";
import { AuthService, defaultAuthSettings } from "../../services/AuthService";
import { authSettingsState } from "../../atoms/authService";
import { generateSettings } from "../../utils/generateSettings";

export const Delivery = () => {
    const cartTotalPrice = useRecoilValue(cartTotalPriceState);

    const memberLevel = useRecoilValue(memberLevelState);
    const memberLevelObj = useRecoilValue(memberLevelObjState);
    const cartItems = useRecoilValue(cartState);
    const userAddress = useRecoilValue(userAddressState);
    const authSettings = useRecoilValue(authSettingsState);

    const deliveryDate = useMemo(
        () => dayjs().add(3, "day").format("MMMM D"),
        []
    );
    const subTotal = useMemo(() => {
        let subTotal = 0;
        cartItems.forEach(
            (product) => (subTotal += product.price * product.qty)
        );
        return subTotal;
    }, [cartItems]);

    return (
        <div className="flex flex-col w-full h-min items-start rounded-lg bg-white py-3 px-4 space-y-2 divide-y divide-dashed">
            <div className="flex flex-col items-start w-full">
                <div className="w-full text-xl text-gray-500">Delivery</div>
                <div className="w-full text-xs font-light text-gray-500">
                    {userAddress?.incomplete || !userAddress ? (
                        <div className="flex flex-row items-center space-x-2">
                            <div className="text-xs font-light text-red-500">
                                Verify address to get estimate
                            </div>
                            <AlertCircle size={10} className="stroke-red-500" />
                        </div>
                    ) : (
                        `Delivery to ${userAddress.city}, ${userAddress.state}
                        : ${deliveryDate}`
                    )}
                </div>
                {/* <div className="w-full text-xl font-medium pb-1">
                {cartTotalPrice}
            </div> */}
            </div>
            {memberLevel && (
                <div className="flex flex-col items-start w-full pt-3 pb-1">
                    {memberLevelObj.isGoldMember && <GoldMember mt={false} />}
                    {memberLevelObj.isSilverMember && <SilverMember />}
                    {memberLevelObj.isBronzeMember && <BronzeMember />}
                </div>
            )}
            {subTotal !== cartTotalPrice && (
                <div className="flex flex-col space-y-2 items-start w-full pt-2">
                    <div className="flex flex-row items-center justify-between w-full">
                        <div className="text-xl text-gray-500">Subtotal</div>
                        <div className="text-lg text-gray-500">
                            {subTotal.toLocaleString("en-US", {
                                style: "currency",
                                currency: "USD",
                            })}
                        </div>
                    </div>

                    {memberLevel && (
                        <div className="flex flex-row items-center justify-between w-full">
                            <div className="text-base text-gray-500">
                                Discount
                            </div>
                            <div className="text-base text-gray-500 tracking-wider">
                                {`- ${(
                                    subTotal - cartTotalPrice
                                ).toLocaleString("en-US", {
                                    style: "currency",
                                    currency: "USD",
                                })}`}
                            </div>
                        </div>
                    )}
                </div>
            )}
            <div className="flex flex-col space-y-6 items-start w-full pt-2">
                <div className="flex flex-row items-center justify-between w-full">
                    <div className="text-xl text-gray-500">Total</div>
                    <div className="text-lg text-gray-500">
                        {cartTotalPrice.toLocaleString("en-US", {
                            style: "currency",
                            currency: "USD",
                        })}
                    </div>
                </div>
                {(userAddress?.incomplete || !userAddress) && (
                    <button
                        className="w-full h-full group  bg-white border-2 border-red-500 hover:bg-red-500 rounded-lg text-red-500 hover:text-white px-4 py-3 flex flex-row items-center space-x-6"
                        onClick={() => {
                            let settings: typeof defaultAuthSettings;
                            if (authSettings) {
                                settings = generateSettings(
                                    authSettings.ecosystem,
                                    authSettings.schema
                                );
                            } else {
                                settings = generateSettings();
                            }

                            const authService = new AuthService(settings);
                            authService.login();
                        }}
                    >
                        <AlertCircle
                            size={24}
                            className="stroke-red-500 group-hover:stroke-white"
                        />
                        <div className="font-medium text-lg flex-1 pr-12">
                            Verify address
                        </div>
                    </button>
                )}
                {!userAddress?.incomplete && userAddress && (
                    <button
                        className="w-full h-full group disabled:pointer-events-none disabled:opacity-50 bg-blue-500 hover:bg-white rounded-lg text-white hover:text-blue-500 hover:border-2 hover:border-blue-500 px-4 py-3 flex flex-row items-center space-x-6"
                        // onClick={() => {
                        //     let settings: typeof defaultAuthSettings;
                        //     if (authSettings) {
                        //         settings = generateSettings(
                        //             authSettings.ecosystem,
                        //             authSettings.schema
                        //         );
                        //     } else {
                        //         settings = generateSettings();
                        //     }

                        //     const authService = new AuthService(settings);
                        //     authService.login();
                        // }}
                    >
                        <CreditCard
                            size={24}
                            className="stroke-white group-hover:stroke-blue-500"
                        />
                        <div className="font-medium text-lg flex-1 pr-12">
                            Purchase
                        </div>
                    </button>
                )}
            </div>
        </div>
    );
};
