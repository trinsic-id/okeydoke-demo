import Carousel from "framer-motion-carousel";
import { TrinsicLogo } from "../../components/Icons/TrinsicLogo";
import { BackButton } from "./BackButton";

import { Card } from "./Card";
import { useState } from "react";
import { range } from "lodash";
import { Tabs } from "./Tabs";
import { LaunchEcosystem } from "./Illustrations/LaunchEcosystem";
import { EcosystemArchitecture } from "./Illustrations/EcosystemArchitecture";
import { IllustrationSelector } from "./IllustrationSelector";

const carouselItems = 6;

export enum IllustrationOptions {
    CreateTemplate,
    InviteIssuer,
    InviteVerifier,
    GovernanceFramework,
    IntegrateOIDC,
    IntegrateSDK,
}

export const Home = () => {
    const [activeIndex, setActiveIndex] = useState<IllustrationOptions>(0);

    return (
        <div className="flex flex-row h-full">
            <div className="w-full lg:max-w-md h-full p-5 md:py-8 md:px-12 flex flex-col gap-6 bg-white">
                <div className="w-full flex flex-row items-start justify-between">
                    <div className="flex flex-col items-start gap-6">
                        <BackButton />
                        <div className="text-4xl lg:text-3xl font-semibold">
                            Welcome to Trinsic, John!
                        </div>
                    </div>
                    <TrinsicLogo
                        width={101.25}
                        height={127.5}
                        className="md:hidden"
                        opacity={0.2}
                        color="#808080"
                    />
                </div>
                <div className="w-full text-base leading-6 lg:text-base font-light text-gray-500 pr-3">
                    By using Trinsic Ecosystems, real customers have been able
                    to get to production-ready 16X faster and 80X more cost
                    effective. Watch how easy it is to do it using Trinsic:
                </div>
                <div className="w-full lg:hidden">
                    <Card />
                </div>
                <div className="hidden w-full lg:flex">
                    <IllustrationSelector />
                </div>
                <div className="w-full flex place-content-center lg:hidden">
                    <Tabs activeIndex={activeIndex} numTabs={carouselItems} />
                </div>
                <div className="flex-1 w-full"></div>
                <button className="bg-blue-600 rounded-lg text-white text-center p-3 text-lg">
                    Launch Ecosystem
                </button>
            </div>
            <div className="hidden lg:flex items-center place-content-center flex-1 h-full bg-gray-200">
                <EcosystemArchitecture className="w-3/4" />
            </div>
        </div>
    );
};
