import { motion } from "framer-motion";
import { Trello } from "react-feather";

import { useRecoilValue } from "recoil";
import { memberLevelObjState, memberProduceState } from "../../../atoms/member";
import { filteredProductsState } from "../../../atoms/products";
import { RateProduct } from "../../../components/Shop/RateProduct";
import { VerifyCredentialModal } from "../../../components/Shop/VerifyCredential";
import { Card } from "./Card";
import { FilterButton } from "./FilterButton";
import { VerifiedCredentialModal } from "./VerifiedCredentialModal";

const Animations = {
    container: {
        visible: {
            opacity: 1,
            transition: {
                when: "beforeChildren",
                staggerChildren: 0.1,
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
        visible: { opacity: 1, x: 0 },
        hidden: { opacity: 0, x: -100 },
    },
    filterText: {
        visible: { opacity: 1 },
        hidden: { opacity: 0 },
    },
};

const Catalog = () => {
    const memberLevelObj = useRecoilValue(memberLevelObjState);

    const memberProduceType = useRecoilValue(memberProduceState);
    const filteredProducts = useRecoilValue(filteredProductsState);

    return (
        <div className="flex max-h-screen-95 w-full flex-col items-start bg-catalog-bg">
            <div className="flex w-full flex-row justify-between p-4 mix-blend-darken shadow-2xl">
                <div className="flex flex-row items-start space-x-2">
                    <Trello size={28} className="stroke-green-600" />
                    <div className="text-2xl text-black">Products</div>
                </div>
                {memberProduceType && <FilterButton />}
            </div>

            <motion.div
                className="flex h-full flex-col items-start space-y-4 overflow-y-scroll p-4 pb-12 md:flex-row md:flex-wrap md:gap-4 md:space-y-0"
                key="container2"
                variants={Animations.container}
                initial="hidden"
                animate="visible"
                exit="hidden"
            >
                {filteredProducts.map((product) => (
                    <motion.div
                        variants={Animations.item}
                        key={product.id}
                        className="flex w-full flex-col items-center rounded-lg hover:shadow-xl  md:max-w-md"
                    >
                        <Card
                            product={product}
                            {...memberLevelObj}
                            key={product.id}
                        />
                    </motion.div>
                ))}
            </motion.div>

            <VerifyCredentialModal />
            <RateProduct />
            <VerifiedCredentialModal />
        </div>
    );
};

export default Catalog;
