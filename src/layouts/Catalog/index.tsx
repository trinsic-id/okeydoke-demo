import { motion } from "framer-motion";
import { Trello } from "react-feather";

import { useRecoilValue } from "recoil";
import { memberLevelObjState, memberProduceState } from "../../atoms/member";
import { filteredProductsState } from "../../atoms/products";
import { RateProduct } from "../../components/RateProduct";
import { VerifyCredentialModal } from "../../components/VerifyCredential";
import { Card } from "./Card";
import { FilterButton } from "./FilterButton";

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
        <div className="w-full bg-catalog-bg flex flex-col items-start max-h-screen-95">
            <div className="flex flex-row w-full justify-between p-4 shadow-2xl mix-blend-darken">
                <div className="flex flex-row items-start space-x-2">
                    <Trello size={28} className="stroke-green-600" />
                    <div className="text-2xl text-black">Products</div>
                </div>
                {memberProduceType && <FilterButton />}
            </div>
            <motion.div
                className="flex flex-col h-full overflow-y-scroll space-y-4 md:space-y-0 md:flex-row md:flex-wrap md:gap-4 items-start p-4 pb-12"
                key="container"
                variants={Animations.container}
                initial="hidden"
                animate="visible"
            >
                {filteredProducts.map((product) => (
                    <Card
                        product={product}
                        {...memberLevelObj}
                        key={product.id}
                    />
                ))}
            </motion.div>
            <VerifyCredentialModal />
            <RateProduct />
        </div>
    );
};

export default Catalog;
