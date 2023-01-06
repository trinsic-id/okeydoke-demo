import Carousel from "framer-motion-carousel";
import { TrinsicLogo } from "../../components/Icons/TrinsicLogo";
import { BackButton } from "./BackButton";

import { Card } from "./Card";
import { useState } from "react";
const colors = ["#f90", "#ef0", "#e0f"];
export const Home = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    return (
        <div className="w-full h-full p-5 flex flex-col gap-6">
            <div className="w-full flex flex-row items-start justify-between">
                <div className="flex flex-col items-start gap-6">
                    <BackButton />
                    <div className="text-4xl font-semibold">
                        Welcome to Trinsic, John!
                    </div>
                </div>
                <TrinsicLogo
                    width={101.25}
                    height={127.5}
                    className=""
                    opacity={0.2}
                    color="#808080"
                />
            </div>
            <div className="w-11/12 text-md font-light text-gray-500 mr-4">
                By using Trinsic Ecosystems, real customers have been able to
                get to production-ready 16X faster and 80X more cost effective.
                Watch how easy it is to do it using Trinsic:
            </div>
            {/* <div className="w-10/12 text-md font-light text-gray-500 mr-4 mt-3">
                {`Active index ${activeIndex}`}
            </div> */}
            <Carousel
                autoPlay={false}
                interval={0}
                loop={false}
                renderArrowLeft={(args) => {
                    setActiveIndex(args.activeIndex);
                    return undefined;
                }}
                renderArrowRight={(args) => {
                    setActiveIndex(args.activeIndex);
                    return undefined;
                }}
                renderDots={(args) => undefined}
            >
                {colors.map((item, i) => (
                    <Card key={i} />
                ))}
            </Carousel>
            <div className="flex-1 w-full"></div>
            <button className="bg-blue-600 rounded-lg text-white text-center p-3 text-lg">
                Launch Ecosystem
            </button>
        </div>
    );
};
