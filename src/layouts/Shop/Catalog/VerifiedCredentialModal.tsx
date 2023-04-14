import { motion, AnimatePresence } from "framer-motion";
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
        <div className="max-w-x2s md:max-w-xs overflow-hidden">
            <AnimatePresence>
                {isVisible ? (
                    <motion.div
                        className="fixed top-0 bottom-0 left-0 right-0 z-20 flex items-center justify-center"
                        variants={Animations.container}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                    >
                        <div className="absolute top-0 bottom-0 left-0 right-0 bg-opacity-50 bg-black z-30 cursor-pointer"></div>
                        <div className="w-full z-40 p-4 flex items-center justify-center">
                            <motion.div
                                className="bg-white w-full max-w-lg rounded-lg shadow-lg"
                                variants={Animations.inputContainer}
                            >
                                <div className="p-4 md:p-6">
                                    <div className="flex items-start justify-between">
                                        <div className="flex flex-row items-center">
                                            <h6 className="text-black font-semibold text-xl">
                                                {farmName
                                                    ? `Welcome ${farmName}!`
                                                    : "Verification complete"}
                                            </h6>
                                        </div>
                                        <button
                                            className="focus:outline-none text-gray-50 ml-6"
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
                                    <div className="w-full flex flex-col items-start space-y-4 pt-2 overflow-y-scroll">
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
