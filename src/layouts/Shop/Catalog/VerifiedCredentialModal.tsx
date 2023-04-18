import { AnimatePresence, motion } from "framer-motion";
import { X } from "react-feather";
import { useToggle } from "react-use";
import { useRecoilState, useRecoilValue } from "recoil";
import { authSettingsState } from "../../../atoms/authService";
import { userFarmNameState } from "../../../atoms/member";
import { isVerifiedCredentialModalVisibleState } from "../../../atoms/modals";
import { userCredentialState } from "../../../atoms/user";
import { LoadingItem } from "../../../components/Shop/LoadingItem";
import { useLockBg } from "../../../hooks/custom/useLockBackground";
import { CredentialIssued } from "../Redirect/CredentialIssued";
import { DisclosedFields } from "./DislosedFields";

const Animations = {
    container: {
        hidden: {
            opacity: 0,
        },
        visible: {
            opacity: 1,
        },
    },
    inputContainer: {
        hidden: {
            y: 200,
            opacity: 0,
        },
        visible: {
            y: 0,
            opacity: 1,
        },
    },
};

export const VerifiedCredentialModal = () => {
    const [isVisible, setModalVisible] = useRecoilState(
        isVerifiedCredentialModalVisibleState
    );
    const [isVerifyingLoading, toggleVerifyingLoading] = useToggle(false);
    const [isProfileLoading, toggleProfileLoading] = useToggle(false);
    const [isDiscountsLoading, toggleDiscountsLoading] = useToggle(false);
    const [isRedirectLoading, toggleRedirectLoading] = useToggle(false);

    const [userCredential, setUserCredential] =
        useRecoilState(userCredentialState);

    useLockBg(isVisible);
    const authSettings = useRecoilValue(authSettingsState);
    const farmName = useRecoilValue(userFarmNameState);

    return (
        <div className="max-w-x2s overflow-hidden md:max-w-xs">
            <AnimatePresence>
                {isVisible ? (
                    <motion.div
                        className="fixed top-0 bottom-0 left-0 right-0 z-20 flex items-center justify-center"
                        variants={Animations.container}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                    >
                        <div className="absolute top-0 bottom-0 left-0 right-0 z-30 cursor-pointer bg-black bg-opacity-50"></div>
                        <div className="z-40 flex w-full items-center justify-center p-4">
                            <motion.div
                                className="w-full max-w-lg rounded-lg bg-white shadow-lg"
                                variants={Animations.inputContainer}
                            >
                                <div className="p-4 md:p-6">
                                    <div className="flex items-start justify-between">
                                        <div className="flex flex-row items-center">
                                            <h6 className="text-xl font-semibold text-black">
                                                {farmName
                                                    ? `Welcome ${farmName}!`
                                                    : "Verification complete"}
                                            </h6>
                                        </div>
                                        <button
                                            className="ml-6 text-gray-50 focus:outline-none"
                                            onClick={() => {
                                                setModalVisible(false);
                                            }}
                                        >
                                            <X
                                                className="stroke-black hover:stroke-red-500"
                                                size={20}
                                            />
                                        </button>
                                    </div>
                                    <div className="flex w-full flex-col items-start space-y-4 overflow-y-scroll pt-2">
                                        <LoadingItem
                                            isLoading={false}
                                            isSuccess
                                            text={"Verifying Credential"}
                                            onNext={() => {
                                                toggleVerifyingLoading(false);
                                                toggleProfileLoading(true);
                                            }}
                                            successElement={
                                                <CredentialIssued />
                                            }
                                        />
                                        <LoadingItem
                                            isLoading={false}
                                            isSuccess
                                            text={"Loading profile"}
                                            onNext={() => {
                                                toggleProfileLoading(false);
                                                toggleDiscountsLoading(true);
                                            }}
                                            successElement={<DisclosedFields />}
                                        />
                                        <LoadingItem
                                            isLoading={false}
                                            isSuccess
                                            text={
                                                "Fetching discounts and limits"
                                            }
                                            onNext={() => {
                                                toggleDiscountsLoading(false);
                                                toggleRedirectLoading(true);
                                            }}
                                        />
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                ) : null}
            </AnimatePresence>
        </div>
    );
};
