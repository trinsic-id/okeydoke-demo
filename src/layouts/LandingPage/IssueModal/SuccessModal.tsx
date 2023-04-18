import { AnimatePresence, motion } from "framer-motion";
import { X } from "react-feather";
import { useRecoilState } from "recoil";
import { isIssueSuccessModalVisibleState } from "../../../atoms/modals";
import { useLockBg } from "../../../hooks/custom/useLockBackground";

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
                                                Success
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
                                    <div className="mt-4 flex w-full flex-col items-start space-y-4 pt-2">
                                        <span>
                                            Your farm has been audited and
                                            you've been issued a credential!
                                        </span>
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
