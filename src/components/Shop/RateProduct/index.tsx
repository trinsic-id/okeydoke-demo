import { AnimatePresence, motion } from "framer-motion";
import { useMemo } from "react";
import { AlertOctagon, X } from "react-feather";
import { useRecoilState } from "recoil";
import { selectedRateProductState } from "../../../atoms/modals";
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

export const RateProduct = () => {
    const [selectedProduct, setSelectedProduct] = useRecoilState(
        selectedRateProductState
    );
    const isVisible = useMemo(
        () => selectedProduct !== undefined,
        [selectedProduct]
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
                                                {`Rate ${selectedProduct?.name}`}
                                            </h6>
                                        </div>
                                        <button
                                            className="ml-6 text-gray-50 focus:outline-none"
                                            onClick={() =>
                                                setSelectedProduct(undefined)
                                            }
                                        >
                                            <X
                                                className="stroke-black hover:stroke-red-500"
                                                size={20}
                                            />
                                        </button>
                                    </div>
                                    <div className="flex w-full flex-col items-start space-y-4 pt-2">
                                        <div className="flex w-full flex-row rounded-lg bg-red-100 p-4">
                                            <div className="flex flex-1 flex-col items-start space-y-2">
                                                <div className="text-lg text-black">
                                                    Requirements to rate
                                                    product:
                                                </div>
                                                <div className="flex flex-row items-center space-x-4">
                                                    <AlertOctagon
                                                        size={18}
                                                        className="stroke-black"
                                                    />
                                                    <div className="text-base text-black">
                                                        Certification Grade Gold
                                                    </div>
                                                </div>
                                                <div className="flex flex-row items-center space-x-4">
                                                    <AlertOctagon
                                                        size={18}
                                                        className="stroke-black"
                                                    />
                                                    <div className="text-base text-black">
                                                        {`Have a farm that produces ${selectedProduct?.produceType.toLowerCase()}`}
                                                    </div>
                                                </div>
                                                <div className="flex flex-row items-center space-x-4">
                                                    <AlertOctagon
                                                        size={18}
                                                        className="stroke-black"
                                                    />
                                                    <div className="text-base text-black">
                                                        Have purchased this
                                                        product
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <button
                                            className="flex h-full w-full flex-row items-center space-x-6 rounded-lg bg-blue-500 px-4 py-3 text-white"
                                            onClick={() => {}}
                                        >
                                            <img
                                                src="images/trinsic-logo-white.png"
                                                className="w-6"
                                            />
                                            <div className="flex-1 pr-12 text-lg font-medium text-white">
                                                Verify your purchase
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
