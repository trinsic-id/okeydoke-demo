import { AnimatePresence, motion } from "framer-motion";
import { AlertOctagon, X } from "react-feather";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { authSettingsState } from "../../../atoms/authService";
import { isRedirectVerifyCredentialErrorState, isVerifiedCredentialModalVisibleState, isVerifyCredentialModalVisibleState } from "../../../atoms/modals";
import { useLockBg } from "../../../hooks/custom/useLockBackground";
import { authService } from "../../../services/AuthService";
import { BronzeMember } from "./BronzeMember";
import { GoldMember } from "./GoldMember";
import { SilverMember } from "./SilverMember";
import { AuthState, authStateState, userCredentialState } from "../../../atoms/user";
import { useVerifyCredential } from "../../../hooks/queries/useVerifyCredential";
import { CredentialDerivedProof } from "../../../models/credential";

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

export const VerifyCredentialModal = () => {
    const [isVisible, setModalVisible] = useRecoilState(
        isVerifyCredentialModalVisibleState
    );
    const setVerifiedModalVisible = useSetRecoilState(
        isVerifiedCredentialModalVisibleState
    );
    useLockBg(isVisible);

    const [userCredential, setUserCredential] =
        useRecoilState(userCredentialState);
    const [authState, setAuthState] = useRecoilState(authStateState);
    const setIsVerifyCredentialError = useSetRecoilState(
        isRedirectVerifyCredentialErrorState
    );
    const { mutateAsync: verifyCredentialAsync } = useVerifyCredential();
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
                                className="w-full max-w-md rounded-lg bg-white shadow-lg"
                                variants={Animations.inputContainer}
                            >
                                <div className="p-4 md:p-6">
                                    <div className="flex items-start justify-between">
                                        <div className="flex flex-row items-center">
                                            <h6 className="text-xl font-semibold text-black">
                                                Verification recommended
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
                                    <div className="flex w-full flex-col items-start space-y-4 pt-2">
                                        <GoldMember />
                                        <SilverMember />
                                        <BronzeMember />
                                        <div className="flex w-full flex-row rounded-lg bg-red-100 p-4">
                                            <div className="flex flex-1 flex-col items-start space-y-2">
                                                <div className="text-lg text-black">
                                                    Recommended disclosures:
                                                </div>
                                                <div className="flex flex-row items-center space-x-4">
                                                    <AlertOctagon
                                                        size={18}
                                                        className="stroke-black"
                                                    />
                                                    <div className="text-base text-black">
                                                        Certification Grade
                                                    </div>
                                                </div>
                                                <div className="flex flex-row items-center space-x-4">
                                                    <AlertOctagon
                                                        size={18}
                                                        className="stroke-black"
                                                    />
                                                    <div className="text-base text-black">
                                                        Produce Type
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <button
                                            className="group flex h-full w-full flex-row items-center space-x-6 rounded-lg bg-blue-500 px-4 py-3 text-white border-2 border-blue-500 hover:bg-white hover:text-blue-500"
                                            onClick={async () => {
                                                const user = await authService.loginPopup();
                                                if (user && user.vp_token) {
                                                    setModalVisible(false);
                                                    const credential = user.vp_token as CredentialDerivedProof;
                                                    const verifyResp = await verifyCredentialAsync({
                                                        derivedProof: credential,
                                                    });
                                                    if (
                                                        // verifyResp.isValid &&
                                                        verifyResp.validationResults["CredentialStatus"]
                                                            .isValid &&
                                                        verifyResp.validationResults["IssuerIsSigner"]
                                                            .isValid &&
                                                        verifyResp.validationResults["SignatureVerification"]
                                                            .isValid
                                                    ) {
                                                        setUserCredential(credential);
                                                        setAuthState(AuthState.VERIFIED);
                                                        return setVerifiedModalVisible(true);
                                                    } else {
                                                        return setIsVerifyCredentialError(true);

                                                    }

                                                }
                                            }}
                                        >
                                            <div className="relative">
                                                <img
                                                    src="/images/trinsic-logo-white.png"
                                                    className="block w-6 group-hover:hidden"
                                                />
                                                <img
                                                    src="/images/trinsic-logo-blue.png"
                                                    className="hidden w-6 group-hover:block"
                                                />
                                            </div>
                                            <div className="flex-1 pr-12 text-lg font-medium">
                                                Verify your Farmerpass
                                            </div>
                                        </button>
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
