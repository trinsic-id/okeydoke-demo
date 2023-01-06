import { LaunchEcosystem } from "./Illustrations/LaunchEcosystem";

export const Card = () => {
    return (
        <div className="w-8/12 md:w-8/12 flex flex-col shadow-xl rounded-lg mb-2 gap-2">
            <LaunchEcosystem className="w-full h-full rounded-t-lg" />
            <div className="w-full flex flex-col rounded-b-lg bg-white p-3">
                <div className="text-xl font-semibold">
                    Create a Credential Template
                </div>
                <div className="text-xl font-light">
                    Can create a verifiable credential in <br /> just a few
                    clicks!
                </div>
            </div>
        </div>
    );
};
