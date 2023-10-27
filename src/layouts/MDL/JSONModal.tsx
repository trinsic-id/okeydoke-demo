import { AnimatePresence, motion } from "framer-motion";
import { useLockBg } from "../../hooks/custom/useLockBackground";
import { generateMonacoHTML } from "./monaco";

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

export const JSONModal = ({
    data,
    close,
}: {
    close: () => void;
    data?: any;
}) => {
    const isVisible = data!!;

    useLockBg(isVisible);

    return (
        <div className="max-w-x2s overflow-hidden md:max-w-xs">
            <AnimatePresence>
                {isVisible ? (
                    <motion.div
                        className="fixed bottom-0 left-0 right-0 top-0 z-20 flex items-center justify-center"
                        variants={Animations.container}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                    >
                        <div
                            className="absolute bottom-0 left-0 right-0 top-0 z-30 cursor-pointer bg-black bg-opacity-50"
                            data-testid="schema-view-close"
                            onClick={close}
                        ></div>
                        <div className="z-40 flex items-center justify-center p-4">
                            <motion.div
                                className="relative h-screen w-screen rounded shadow-lg md:h-[70vh] md:w-[70vw]"
                                variants={Animations.inputContainer}
                            >
                                <iframe
                                    title="JSON viewer"
                                    className="h-full w-full bg-gray-500 md:rounded-lg"
                                    srcDoc={generateMonacoHTML(data)}
                                ></iframe>
                            </motion.div>
                        </div>
                    </motion.div>
                ) : null}
            </AnimatePresence>
        </div>
    );
};
