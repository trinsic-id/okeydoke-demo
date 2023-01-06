import { useState } from "react";

import { useRecoilState, useRecoilValue } from "recoil";
import {
    IllustrationOptions,
    illustrationSelectorState,
} from "../../atoms/onboarding";

export const IllustrationSelector = () => {
    const [selectedIllustration, setSelectedIllustration] = useRecoilState(
        illustrationSelectorState
    );

    return (
        <div className="w-full flex flex-col">
            <div
                className={`flex flex-col items-start gap-1 py-3 px-4 border-l-2 cursor-pointer transition-colors duration-300   ${
                    selectedIllustration === IllustrationOptions.CreateTemplate
                        ? "border-blue-600"
                        : "border-gray-300"
                }`}
                onClick={() =>
                    setSelectedIllustration(IllustrationOptions.CreateTemplate)
                }
            >
                <div className="font-semibold text-base">
                    Create a credential template
                </div>
                <div className="font-light text-sm">
                    Can create a verifiable credential in just a few clicks!
                </div>
            </div>
            <div
                className={`flex flex-col items-start gap-1 py-3 px-4 border-l-2 cursor-pointer transition-colors duration-300 ${
                    selectedIllustration === IllustrationOptions.InviteIssuer
                        ? "border-blue-600"
                        : "border-gray-300"
                }`}
                onClick={() =>
                    setSelectedIllustration(IllustrationOptions.InviteIssuer)
                }
            >
                <div className="font-semibold text-base">Invite an Issuer</div>
            </div>
            <div
                className={`flex flex-col items-start gap-1 py-3 px-4 border-l-2 cursor-pointer transition-colors duration-300 ${
                    selectedIllustration === IllustrationOptions.InviteVerifier
                        ? "border-blue-600"
                        : "border-gray-300"
                }`}
                onClick={() =>
                    setSelectedIllustration(IllustrationOptions.InviteVerifier)
                }
            >
                <div className="font-semibold text-base">Invite a Verifier</div>
            </div>
            <div
                className={`flex flex-col items-start gap-1 py-3 px-4 border-l-2 cursor-pointer transition-colors duration-300 ${
                    selectedIllustration ===
                    IllustrationOptions.GovernanceFramework
                        ? "border-blue-600"
                        : "border-gray-300"
                }`}
                onClick={() =>
                    setSelectedIllustration(
                        IllustrationOptions.GovernanceFramework
                    )
                }
            >
                <div className="font-semibold text-base">
                    Create a Governance Framework
                </div>
            </div>
            <div
                className={`flex flex-col items-start gap-1 py-3 px-4 border-l-2 cursor-pointer transition-colors duration-300 ${
                    selectedIllustration === IllustrationOptions.IntegrateOIDC
                        ? "border-blue-600"
                        : "border-gray-300"
                }`}
                onClick={() =>
                    setSelectedIllustration(IllustrationOptions.IntegrateOIDC)
                }
            >
                <div className="font-semibold text-base">
                    Integrate using OIDC flow
                </div>
            </div>
            <div
                className={`flex flex-col items-start gap-1 py-3 px-4 border-l-2 cursor-pointer transition-colors duration-300 ${
                    selectedIllustration === IllustrationOptions.IntegrateSDK
                        ? "border-blue-600"
                        : "border-gray-300"
                }`}
                onClick={() =>
                    setSelectedIllustration(IllustrationOptions.IntegrateSDK)
                }
            >
                <div className="font-semibold text-base">
                    Integrate using SDK
                </div>
            </div>
        </div>
    );
};
