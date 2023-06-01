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

const isValidHttpUrl = (str: string) => {
    let url;
    try {
        url = new URL(str);
    } catch (_) {
        return false;
    }
    return url.protocol === "http:" || url.protocol === "https:";
};

export const businessLogoState = selector<string | undefined>({
    key: "business-produce-state",
    get: ({ get }) => {
        const userCredential = get(userCredentialState);
        if (!userCredential?.credentialSubject.businessLogo) return undefined;

        if (!isValidHttpUrl(userCredential?.credentialSubject.businessLogo))
            return undefined;
        return userCredential.credentialSubject.businessLogo;
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

interface MemberAddress {
    address?: string;
    city?: string;
    state?: string;
    incomplete: boolean;
}

export const userAddressState = selector<MemberAddress | undefined>({
    key: "user-Address-state",
    get: ({ get }) => {
        const subject = get(userCredentialState)?.credentialSubject;
        if (!subject) return undefined;

        return {
            address: "123 Fakesville, IN 00000",
            city: "Fakesville",
            state: "IN",
            incomplete: false
        };

        // Address verification prompt bypassed due to issuance flow no longer supporting address
        // -JC 6/1/2023
        /*
        return {
            address: subject.address,
            city: subject.city,
            state: subject.state,
            incomplete:
                subject.address === undefined ||
                subject.city === undefined ||
                subject.state === undefined,
        };*/
    },
});

export const userFarmNameState = selector<string | undefined>({
    key: "user-name-state",
    get: ({ get }) => {
        return get(userCredentialState)?.credentialSubject.name;
    },
});
