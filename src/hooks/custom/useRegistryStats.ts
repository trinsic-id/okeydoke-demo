import { useMemo } from "react";
import { TrustRegistry } from "../../models/registries";

export const useRegistryStats = (registry: TrustRegistry) => {
    const issuerCount = useMemo(() => registry.issuers.length, [registry]);
    const tempalateCount = useMemo(() => registry.templates.length, [registry]);

    return {
        issuerCount,
        tempalateCount,
    };
};
