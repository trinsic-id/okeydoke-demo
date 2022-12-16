import { useRegistryStats } from "../../hooks/custom/useRegistryStats";
import { TrustRegistry } from "../../models/registries";

interface RegistryTableRowProps {
    registry: TrustRegistry;
}

export const RegistryTableRow = ({ registry }: RegistryTableRowProps) => {
    const { issuerCount, tempalateCount } = useRegistryStats(registry);

    return (
        <div className="w-full flex flex-row p-2 hover:border">
            <div className="text-lg font-light text-black w-1/3 ">
                {registry.name}
            </div>
            <div className="text-lg font-light text-black w-1/3 text-center">
                {issuerCount}
            </div>
            <div className="text-lg font-light text-black w-1/3 text-center">
                {tempalateCount}
            </div>
        </div>
    );
};
