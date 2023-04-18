import { motion, Variant } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { isIssueModalVisibleState } from "../../../atoms/modals";
import { Action } from "./Action";

export const ActionAnimations: {
    container: {
        visible: Variant;
        hidden: Variant;
    };
    item: {
        visible: Variant;
        hidden: Variant;
    };
} = {
    container: {
        visible: {
            opacity: 1,
            transition: {
                when: "beforeChildren",
                staggerChildren: 0.3,
            },
        },
        hidden: {
            opacity: 0,
            transition: {
                when: "afterChildren",
            },
        },
    },
    item: {
        visible: { opacity: 1, x: 0, rotate: 0 },
        hidden: { opacity: 0, x: -100, rotate: -90 },
    },
};

export default function ActionList() {
    const setIssueModalVisible = useSetRecoilState(isIssueModalVisibleState);
    const navigate = useNavigate();
    return (
        <motion.div
            className="mt-24 flex w-full flex-col items-center justify-center gap-14 align-middle md:mt-48 md:flex-row md:gap-24"
            key="container"
            variants={ActionAnimations.container}
            initial="hidden"
            animate="visible"
            exit="hidden"
        >
            <Action
                key="1"
                text="Get your Farmerpass"
                image="images/landing/farm.jpg"
                onClick={() => {
                    setIssueModalVisible(true);
                }}
            />

            <Action
                key="2"
                text="Buy discounted seeds"
                image="images/artichokes/big-heart.jpg"
                onClick={() => {
                    navigate("/shop/catalog");
                }}
            />
        </motion.div>
    );
}

/* <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">*/
