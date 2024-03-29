import { useMemo } from "react";
import { Star } from "react-feather";
import { useRecoilValue } from "recoil";
import { MemberLevel, memberLevelState } from "../../../atoms/member";
import { userCredentialState } from "../../../atoms/user";

export const MemberLevelSuccess = () => {
    const userCredential = useRecoilValue(userCredentialState);
    const memberLevel = useRecoilValue(memberLevelState);
    const profileText = useMemo(
        () =>
            userCredential?.credentialSubject &&
            memberLevel &&
            `${
                userCredential.credentialSubject.produceType
                    ? `${userCredential.credentialSubject.produceType} `
                    : ""
            }${memberLevel === MemberLevel.GOLD ? "Gold" : ""}${
                memberLevel === MemberLevel.SILVER ? "Silver" : ""
            }${memberLevel === MemberLevel.BRONZE ? "Bronze" : ""} farmer`,
        [userCredential?.credentialSubject, memberLevel]
    );
    return userCredential?.credentialSubject.certificationGrade !==
        undefined ? (
        <div className="flex w-full flex-row items-center justify-between">
            {userCredential?.credentialSubject.certificationGrade ===
                MemberLevel.GOLD && (
                <>
                    <div className="text-lg font-light leading-tight">
                        {profileText}
                    </div>
                    <Star
                        size={28}
                        className={"fill-yellow-400 stroke-yellow-400"}
                    />
                </>
            )}

            {userCredential?.credentialSubject.certificationGrade ===
                MemberLevel.SILVER && (
                <>
                    <div className="text-lg font-light leading-tight">
                        {profileText}
                    </div>
                    <Star
                        size={28}
                        className={"fill-gray-400 stroke-gray-400"}
                    />
                </>
            )}

            {userCredential?.credentialSubject.certificationGrade ===
                MemberLevel.BRONZE && (
                <>
                    <div className="text-lg font-light leading-tight">
                        {profileText}
                    </div>
                    <Star size={28} className={"stroke-amber-600"} />
                </>
            )}
        </div>
    ) : null;
};
