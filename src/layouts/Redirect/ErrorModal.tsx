
import { motion, AnimatePresence } from "framer-motion";
import { useMemo } from "react";
import {
    AlertTriangle,
} from "react-feather";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { authSettingsState } from "../../atoms/authService";
import {
    isRedirectErrorModalVisibleState,
} from "../../atoms/modals";
import { useLockBg } from "../../hooks/custom/useLockBackground";
import { AuthService, defaultAuthSettings } from "../../services/AuthService";
import { generateSettings } from "../../utils/generateSettings";

const defaultValues = {
    vehicle: null,
    year: null,
};

interface VerifyCredentialModalProps {
    authService: AuthService;
}

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
    const [isVisible, setModalVisible] = useRecoilState(
        isRedirectErrorModalVisibleState
    );
    useLockBg(isVisible);
    const authSettings = useRecoilValue(authSettingsState);
    const navigate = useNavigate();
    const [searchParams, _] = useSearchParams();
    const errorMsg = useMemo(() => {
        const errorDesc = searchParams.get("error_description");
        return errorDesc ?? "Invalid state value";
    }, [searchParams]);
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
                                className="bg-white w-full max-w-md rounded-lg shadow-lg"
                                variants={Animations.inputContainer}
                            >
                                <div className="p-4 md:p-6">
                                    <div className="w-full flex flex-col items-start space-y-4 pt-2">
                                        <div className="flex flex-row bg-red-100 rounded-lg w-full p-4">
                                            <div className="flex-1 flex flex-col space-y-2 items-start">
                                                <div className="flex flex-row items-center space-x-4">
                                                    <AlertTriangle
                                                        size={18}
                                                        className="stroke-red-600"
                                                    />
                                                    <div className="text-red-600 text-base">
                                                        {errorMsg}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <button
                                            className="w-full h-full border-blue-500 border-2 rounded-lg text-blue-500 px-4 py-3 flex flex-row items-center space-x-6"
                                            onClick={() => {
                                                window.location.href =
                                                    "https://webapp-221109133537.azurewebsites.net/";
                                            }}
                                        >
                                            <img
                                                src="images/trinsic-logo-blue.png"
                                                className="w-6"
                                            />
                                            <div className="text-blue-500 font-medium text-lg flex-1 pr-12">
                                                {"Get a credential"}
                                            </div>
                                        </button>
                                        <button
                                            className="w-full h-full bg-blue-500 rounded-lg text-white px-4 py-3 flex flex-row items-center space-x-6"
                                            onClick={() => {
                                                let settings: typeof defaultAuthSettings;
                                                if (authSettings) {
                                                    settings = generateSettings(
                                                        authSettings.ecosystem,
                                                        authSettings.schema
                                                    );
                                                } else {
                                                    settings =
                                                        generateSettings();
                                                }

                                                const authService =
                                                    new AuthService(settings);
                                                authService.login();
                                            }}
                                        >
                                            <img
                                                src="images/trinsic-logo-white.png"
                                                className="w-6"
                                            />
                                            <div className="text-white font-medium text-lg flex-1 pr-12">
                                                Try again
                                            </div>
                                        </button>
                                        <button
                                            className="w-full h-full bg-gray-500 rounded-lg text-white px-4 py-3 flex flex-row items-center space-x-6"
                                            onClick={() => {
                                                navigate("/");
                                            }}
                                        >
                                            <img
                                                src="images/trinsic-logo-white.png"
                                                className="w-6 opacity-0"
                                            />
                                            <div className="text-white font-medium text-lg flex-1 pr-12">
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
