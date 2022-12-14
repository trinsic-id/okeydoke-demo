import { motion, AnimatePresence } from "framer-motion";
import { useMemo } from "react";
import { AlertOctagon, X } from "react-feather";
import { useRecoilState } from "recoil";
import { selectedRateProductState } from "../../atoms/modals";
import { useLockBg } from "../../hooks/custom/useLockBackground";

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
                                    <div className="flex items-start justify-between">
                                        <div className="flex flex-row items-center">
                                            <h6 className="text-black font-semibold text-xl">
                                                {`Rate ${selectedProduct?.name}`}
                                            </h6>
                                        </div>
                                        <button
                                            className="focus:outline-none text-gray-50 ml-6"
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
                                    <div className="w-full flex flex-col items-start space-y-4 pt-2">
                                        <div className="flex flex-row bg-red-100 rounded-lg w-full p-4">
                                            <div className="flex-1 flex flex-col space-y-2 items-start">
                                                <div className="text-black text-lg">
                                                    Requirements to rate
                                                    product:
                                                </div>
                                                <div className="flex flex-row items-center space-x-4">
                                                    <AlertOctagon
                                                        size={18}
                                                        className="stroke-black"
                                                    />
                                                    <div className="text-black text-base">
                                                        Certification Grade Gold
                                                    </div>
                                                </div>
                                                <div className="flex flex-row items-center space-x-4">
                                                    <AlertOctagon
                                                        size={18}
                                                        className="stroke-black"
                                                    />
                                                    <div className="text-black text-base">
                                                        {`Have a farm that produces ${selectedProduct?.produceType.toLowerCase()}`}
                                                    </div>
                                                </div>
                                                <div className="flex flex-row items-center space-x-4">
                                                    <AlertOctagon
                                                        size={18}
                                                        className="stroke-black"
                                                    />
                                                    <div className="text-black text-base">
                                                        Have purchased this
                                                        product
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <button
                                            className="w-full h-full bg-blue-500 rounded-lg text-white px-4 py-3 flex flex-row items-center space-x-6"
                                            onClick={() => {}}
                                        >
                                            <img
                                                src="images/trinsic-logo-white.png"
                                                className="w-6"
                                            />
                                            <div className="text-white font-medium text-lg flex-1 pr-12">
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
