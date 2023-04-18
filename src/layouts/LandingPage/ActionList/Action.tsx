import { motion } from "framer-motion";
import { ActionAnimations } from ".";

interface ActionProps {
    text: string;
    image: string;
    onClick: (ev: any) => void;
}

export const Action = ({ text, image, onClick }: ActionProps) => {
    return (
        <motion.div
            variants={ActionAnimations.item}
            key={"Action-1"}
            className=""
            onClick={onClick}
        >
            <div className="group flex cursor-pointer flex-col items-center justify-between gap-12 rounded-lg border-2 bg-gray-50 p-5 align-baseline text-gray-900 transition-all duration-300 hover:border-blue-400 hover:p-8 hover:shadow-2xl">
                <img
                    className="h-auto w-full max-w-md rounded-lg md:max-w-sm"
                    src={image}
                />
                <div className="text-xl transition-colors duration-300 group-hover:text-blue-500">
                    {text}
                </div>
            </div>
        </motion.div>
    );
};
