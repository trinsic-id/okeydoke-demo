import {
    defaultEcosystem,
    defaultSchema,
} from "../services/AuthService";

export const generateSettings = (ecosystem?: string, schema?: string) => ({
    extraQueryParams: {
        "trinsic:ecosystem": ecosystem ? ecosystem : defaultEcosystem,
        "trinsic:schema": schema ? schema : defaultSchema,
    },
});
