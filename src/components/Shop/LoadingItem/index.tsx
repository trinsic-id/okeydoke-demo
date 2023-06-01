import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";
import { CheckSquare } from "react-feather";
import { useToggle } from "react-use";

const Animations = {
    icons: {
        fadeIn: {
            opacity: 1,
            transitionDuration: "0.6s",
        },
        fadeOut: {
            opacity: 0,
            transitionDuration: "0.6s",
        },
    },
    subText: {
        fadeIn: {
            height: "auto",
            opacity: 1,
            transitionDuration: "1.5s",
        },
        fadeOut: {
            height: 0,
            opacity: 0,
            transitionDuration: "1.5s",
        },
    },
};

interface LoadingItemProps {
    isLoading: boolean;
    isError?: boolean;
    isSuccess?: boolean;
    onNext: () => void;
    text: string;
    successElement?: JSX.Element;
}

export const LoadingItem = ({
    isLoading,
    isError,
    isSuccess = false,
    onNext,
    text,
    successElement,
}: LoadingItemProps) => {
    const [isComplete, toggleComplete] = useToggle(isSuccess);

    useEffect(() => {
        if (isLoading)
            setTimeout(() => {
                toggleComplete(true);
            }, 2000);
    }, [isLoading]);

    useEffect(() => {
        if (isComplete)
            setTimeout(() => {
                onNext();
            }, 2000);
    }, [isComplete]);
    //md:w-2/3 lg:w-1/2 max-w-xl
    return (
        <motion.div
            className={`flex h-full w-full flex-row items-start space-x-4 rounded-lg bg-loading-bg-light p-4 transition duration-700 ${
                !isLoading && !isComplete && !isError && "opacity-40"
            }`}
        >
            <div className="w-8">
                <AnimatePresence>
                    {isComplete && (
                        <motion.div
                            className=""
                            variants={Animations.icons}
                            initial={"fadeOut"}
                            animate={"fadeIn"}
                            exit={"fadeOut"}
                            key={"complete"}
                        >
                            <CheckSquare
                                size={28}
                                className="stroke-green-400"
                            />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
            <div className="flex h-full flex-1 flex-col">
                <div
                    className={`text-md font-bold ${
                        isError ? "text-red-600" : "text-loading-text"
                    }`}
                >
                    {text}
                </div>

                {successElement && isComplete && (
                    <AnimatePresence>
                        <motion.div
                            variants={Animations.subText}
                            initial={"fadeOut"}
                            animate={"fadeIn"}
                            exit={"fadeOut"}
                            className="text-md overflow-clip pt-3 font-bold text-loading-text"
                        >
                            {successElement}
                        </motion.div>
                    </AnimatePresence>
                )}
            </div>
        </motion.div>
    );
};
