import { useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { useIssueAnyCredential } from "../../hooks/mutations/useIssueAnyCredential";

export const IssueAny = () => {
    let [searchParams, setSearchParams] = useSearchParams();
    const { mutate } = useIssueAnyCredential();
    const issueParams = useMemo(() => {
        // string email, string authToken, string ecosystem, string schemaUri, string jsonValues
        const email = searchParams.get("email");
        const authToken = searchParams.get("authToken");
        const schemaUri = searchParams.get("schemaUri");
        const jsonValues = searchParams.get("jsonValues");
        const returnUrl = searchParams.get("returnUrl");
        let badParams = false;
        if (
            email === null ||
            authToken === null ||
            schemaUri === null ||
            jsonValues === null ||
            returnUrl === null
        ) {
            console.error("Incorrent params provided");
            return undefined;
        }

        return {
            email,
            authToken,
            schemaUri,
            jsonValues,
            returnUrl,
        };
    }, [searchParams]);

    useEffect(() => {
        if (issueParams) {
            mutate(issueParams);
        }
    }, [issueParams, mutate]);

    return <div className="h-full w-full bg-red-400">{}</div>;
};
