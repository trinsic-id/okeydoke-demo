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
            className="flex cursor-pointer flex-col items-center justify-between align-baseline text-gray-900 hover:text-gray-600"
            onClick={onClick}
        >
            <img
                className="h-auto w-48 rounded-lg hover:opacity-90 md:w-64"
                src={image}
            />
            <div className="mt-4 text-center text-xl font-semibold">{text}</div>
        </motion.div>
    );
};
