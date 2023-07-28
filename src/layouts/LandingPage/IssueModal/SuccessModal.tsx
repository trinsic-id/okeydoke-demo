import { AnimatePresence, motion } from "framer-motion";
import { X } from "react-feather";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { isIssueSuccessModalVisibleState } from "../../../atoms/modals";
import { useLockBg } from "../../../hooks/custom/useLockBackground";
import {useChapiPolyfill} from "../../../hooks/custom/useChapiPolyfill";

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

export const SuccessModal = () => {
    const [isVisible, setModalVisible] = useRecoilState(
        isIssueSuccessModalVisibleState
    );
    useLockBg(isVisible);
    const navigate = useNavigate();

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
                        <div
                            className="absolute top-0 bottom-0 left-0 right-0 z-30 cursor-pointer bg-black bg-opacity-50"
                            onClick={() => {
                                navigate("/shop/catalog");
                                setModalVisible(false);
                            }}
                        ></div>
                        <div className="z-40 flex w-full items-center justify-center p-4">
                            <motion.div
                                className="w-full max-w-md rounded-lg bg-white shadow-lg"
                                variants={Animations.inputContainer}
                            >
                                <div className="flex w-full flex-col items-start gap-4 p-4 md:p-6">
                                    <div className="flex w-full flex-row items-start justify-between">
                                        <div className="flex flex-row items-center">
                                            <h6 className="text-xl font-semibold text-black">
                                                Success
                                            </h6>
                                        </div>
                                        <button
                                            className="ml-6 text-gray-50 focus:outline-none"
                                            onClick={() => {
                                                navigate("/shop/catalog");
                                                setModalVisible(false);
                                            }}
                                        >
                                            <X
                                                className="stroke-black hover:stroke-red-500"
                                                size={20}
                                            />
                                        </button>
                                    </div>
                                    <div className="w-full text-lg">
                                        Your farm has been audited and you've
                                        been issued a credential!
                                    </div>
                                    <button
                                        className={`group flex h-full w-full flex-row items-center space-x-6 rounded-lg
                                            bg-blue-500 px-4 py-3 text-white hover:border-2 hover:border-blue-500 hover:bg-white hover:py-2.5 hover:text-blue-500`}
                                        onClick={() => {
                                            navigate("/shop/catalog");
                                            setModalVisible(false);
                                        }}
                                    >
                                        <div className="relative">
                                            <img
                                                src="/images/trinsic-logo-white.png"
                                                className={`block w-6 group-hover:hidden`}
                                            />
                                            <img
                                                src="images/trinsic-logo-blue.png"
                                                className={`hidden h-[35.22px] w-6 group-hover:block`}
                                            />
                                        </div>
                                        <div className="flex-1 pr-12 text-lg font-medium">
                                            Use my credential
                                        </div>
                                    </button>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                ) : null}
            </AnimatePresence>
        </div>
    );
};
