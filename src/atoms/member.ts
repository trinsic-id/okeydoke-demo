import { selector } from "recoil";
import { ProduceType } from "../data/products";
import { userCredentialState } from "./user";

export enum MemberLevel {
    GOLD = "A",
    SILVER = "B",
    BRONZE = "C",
    NONE = "N",
}

export const memberLevelState = selector<MemberLevel | undefined>({
    key: "member-level-state",
    get: ({ get }) => {
        const userCredential = get(userCredentialState);
        return userCredential?.credentialSubject.certificationGrade;
    },
});

export const memberProduceState = selector<ProduceType | undefined>({
    key: "member-produce-state",
    get: ({ get }) => {
        const userCredential = get(userCredentialState);
        return userCredential?.credentialSubject.produceType &&
            Object.values(ProduceType).includes(
                userCredential?.credentialSubject.produceType
            )
            ? userCredential.credentialSubject.produceType
            : undefined;
    },
});

interface MemberLevelObj {
    isGoldMember: boolean;
    isSilverMember: boolean;
    isBronzeMember: boolean;
}

export const memberLevelObjState = selector<MemberLevelObj>({
    key: "member-level-obj-state",
    get: ({ get }) => {
        const memberLevel = get(memberLevelState);
        return {
            isGoldMember: memberLevel === MemberLevel.GOLD,
            isSilverMember: memberLevel === MemberLevel.SILVER,
            isBronzeMember: memberLevel === MemberLevel.BRONZE,
        };
    },
});
