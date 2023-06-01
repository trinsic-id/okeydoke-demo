import dayjs from "dayjs";
import { useMemo } from "react";
import { AlertCircle, CreditCard } from "react-feather";
import { useRecoilValue } from "recoil";
import { cartState, cartTotalPriceState } from "../../../atoms/cart";
import {
    memberLevelObjState,
    memberLevelState,
    userAddressState,
} from "../../../atoms/member";
import { BronzeMember } from "../../../components/Shop/VerifyCredential/BronzeMember";
import { GoldMember } from "../../../components/Shop/VerifyCredential/GoldMember";
import { SilverMember } from "../../../components/Shop/VerifyCredential/SilverMember";
import { authService } from "../../../services/AuthService";

export const Delivery = () => {
    const cartTotalPrice = useRecoilValue(cartTotalPriceState);

    const memberLevel = useRecoilValue(memberLevelState);
    const memberLevelObj = useRecoilValue(memberLevelObjState);
    const cartItems = useRecoilValue(cartState);
    const userAddress = useRecoilValue(userAddressState);

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
        <div className="flex h-min w-full flex-col items-start space-y-2 divide-y divide-dashed rounded-lg bg-white py-3 px-4">
            <div className="flex w-full flex-col items-start">
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
                <div className="flex w-full flex-col items-start pt-3 pb-1">
                    {memberLevelObj.isGoldMember && <GoldMember mt={false} />}
                    {memberLevelObj.isSilverMember && <SilverMember />}
                    {memberLevelObj.isBronzeMember && <BronzeMember />}
                </div>
            )}
            {subTotal !== cartTotalPrice && (
                <div className="flex w-full flex-col items-start space-y-2 pt-2">
                    <div className="flex w-full flex-row items-center justify-between">
                        <div className="text-xl text-gray-500">Subtotal</div>
                        <div className="text-lg text-gray-500">
                            {subTotal.toLocaleString("en-US", {
                                style: "currency",
                                currency: "USD",
                            })}
                        </div>
                    </div>

                    {memberLevel && (
                        <div className="flex w-full flex-row items-center justify-between">
                            <div className="text-base text-gray-500">
                                Discount
                            </div>
                            <div className="text-base tracking-wider text-gray-500">
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
            <div className="flex w-full flex-col items-start space-y-6 pt-2">
                <div className="flex w-full flex-row items-center justify-between">
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
                        className="group flex h-full  w-full flex-row items-center space-x-6 rounded-lg border-2 border-red-500 bg-white px-4 py-3 text-red-500 hover:bg-red-500 hover:text-white"
                        onClick={() => {
                            authService.login();
                        }}
                    >
                        <AlertCircle
                            size={24}
                            className="stroke-red-500 group-hover:stroke-white"
                        />
                        <div className="flex-1 pr-12 text-lg font-medium">
                            Verify address
                        </div>
                    </button>
                )}
                {!userAddress?.incomplete && userAddress && (
                    <button
                        className="group flex h-full w-full flex-row items-center space-x-6 rounded-lg bg-blue-500 px-4 py-3 text-white hover:border-2 hover:border-blue-500 hover:bg-white hover:text-blue-500 disabled:pointer-events-none disabled:opacity-50"
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
                        <div className="flex-1 pr-12 text-lg font-medium">
                            Purchase
                        </div>
                    </button>
                )}
            </div>
        </div>
    );
};
