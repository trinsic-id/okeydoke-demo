import { useEffect } from "react";
import { useRecoilValue } from "recoil";
import { trustRegistryState } from "../../atoms/registries";
import { RegistryTable } from "./RegistryTable";

export const Registries = () => {
    return (
        <div className="w-full h-full flex flex-col items-start p-2 gap-6">
            <div className="flex flex-row w-full items-center justify-between">
                <div className="text-xl font-light">Governance Frameworks</div>
                <button className="rounded-lg px-3 py-1 bg-blue-500 text-white">
                    Add framework
                </button>
            </div>
            <RegistryTable />
        </div>
    );
};
