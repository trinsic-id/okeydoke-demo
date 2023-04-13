import { AnimatePresence, motion } from "framer-motion";
import { useMemo } from "react";
import { AlertTriangle } from "react-feather";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { authSettingsState } from "../../atoms/authService";
import {
    isRedirectErrorModalVisibleState,
    isRedirectVerifyCredentialErrorState,
} from "../../atoms/modals";
import { useLockBg } from "../../hooks/custom/useLockBackground";
import { authService } from "../../services/AuthService";

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

export const ErrorModal = () => {
    const [isVisible, setIsVisible] = useRecoilState(
        isRedirectErrorModalVisibleState
    );
    useLockBg(isVisible);
    const [isVerifyError, setVerifyError] = useRecoilState(
        isRedirectVerifyCredentialErrorState
    );
    const authSettings = useRecoilValue(authSettingsState);
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const errorMsg = useMemo(() => {
        if (isVerifyError) return "Unable to verify credential";
        const errorDesc = searchParams.get("error_description");
        return errorDesc ?? "Invalid state value";
    }, [searchParams, isVerifyError]);
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
                                    <div className="flex w-full flex-col items-start space-y-4 pt-2">
                                        <div className="flex w-full flex-row rounded-lg bg-red-100 p-4">
                                            <div className="flex flex-1 flex-col items-start space-y-2">
                                                <div className="flex flex-row items-center space-x-4">
                                                    <AlertTriangle
                                                        size={18}
                                                        className="stroke-red-600"
                                                    />
                                                    <div className="text-base text-red-600">
                                                        {errorMsg}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <button
                                            className="flex h-full w-full flex-row items-center space-x-6 rounded-lg border-2 border-blue-500 px-4 py-3 text-blue-500"
                                            onClick={() => {
                                                window.location.href =
                                                    "https://webapp-221109133537.azurewebsites.net/";
                                            }}
                                        >
                                            <img
                                                src="images/trinsic-logo-blue.png"
                                                className="w-6"
                                            />
                                            <div className="flex-1 pr-12 text-lg font-medium text-blue-500">
                                                {"Get a credential"}
                                            </div>
                                        </button>
                                        <button
                                            className="flex h-full w-full flex-row items-center space-x-6 rounded-lg bg-blue-500 px-4 py-3 text-white"
                                            onClick={() => {
                                                setVerifyError(false);
                                                setIsVisible(false);

                                                authService.login();
                                            }}
                                        >
                                            <img
                                                src="images/trinsic-logo-white.png"
                                                className="w-6"
                                            />
                                            <div className="flex-1 pr-12 text-lg font-medium text-white">
                                                Try again
                                            </div>
                                        </button>
                                        <button
                                            className="flex h-full w-full flex-row items-center space-x-6 rounded-lg bg-gray-500 px-4 py-3 text-white"
                                            onClick={() => {
                                                setVerifyError(false);
                                                setIsVisible(false);
                                                navigate("/");
                                            }}
                                        >
                                            <img
                                                src="images/trinsic-logo-white.png"
                                                className="w-6 opacity-0"
                                            />
                                            <div className="flex-1 pr-12 text-lg font-medium text-white">
                                                Back to store
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
