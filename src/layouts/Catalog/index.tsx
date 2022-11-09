import { Switch } from "@headlessui/react";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo } from "react";
import { Filter, Trello } from "react-feather";
import { useLocation, useNavigate } from "react-router-dom";

import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  filterProductsState,
  MemberLevel,
  memberLevelState,
  memberProduceState,
} from "../../atoms/member";
import {
  AuthState,
  authStateState,
  userCredentialState,
} from "../../atoms/user";
import { VerifyCredentialModal } from "../../components/VerifyCredential";
import { products } from "../../data/products";
import { useAddItem } from "../../hooks/custom/useAddItem";
import { AuthService } from "../../services/AuthService";
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
  const memberLevel = useRecoilValue(memberLevelState);

  const memberLevelObj = useMemo(
    () => ({
      isGoldMember: memberLevel === MemberLevel.GOLD,
      isSilverMember: memberLevel === MemberLevel.SILVER,
      isBronzeMember: memberLevel === MemberLevel.BRONZE,
    }),
    [memberLevel]
  );

  const [isFiltered, toggleFilter] = useRecoilState(filterProductsState);
  const memberProduceType = useRecoilValue(memberProduceState);

  return (
    <div className="w-full h-screen overflow-y-scroll p-4 bg-catalog-bg flex flex-col items-start space-y-4">
      <div className="flex flex-row w-full justify-between">
        <div className="flex flex-row items-start space-x-2">
          <Trello size={28} className="stroke-green-600" />
          <div className="text-2xl text-black">Products</div>
        </div>
        {memberProduceType && <FilterButton />}
      </div>
      <motion.div
        className="flex flex-col h-full overflow-y-scroll space-y-4 md:space-y-0 md:flex-row md:flex-wrap md:gap-4 items-start"
        key="container"
        variants={Animations.container}
        initial="hidden"
        animate="visible"
      >
        {products.map((product) => (
          <Card product={product} {...memberLevelObj} key={product.id} />
        ))}
      </motion.div>
      <VerifyCredentialModal />
    </div>
  );
};

export default Catalog;