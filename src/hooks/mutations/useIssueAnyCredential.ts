import { useMutation } from "react-query";

export interface IssueAnySearchVars {
    email: string;
    authToken: string;
    schemaUri: string;
    jsonValues: string;
    returnUrl: string;
}

const handleIssueAny = async ({
    email,
    authToken,
    schemaUri,
    jsonValues,
    returnUrl,
}: IssueAnySearchVars) => {
    let url = "https://okeydokeissuer.azurewebsites.net/api/issue";
    url += `?email=${encodeURIComponent(email)}&authToken=${encodeURI(
        authToken
    )}&schemaUri=${encodeURIComponent(
        schemaUri
    )}&jsonValues=${encodeURIComponent(jsonValues)}`;
    const response = await fetch(url, { method: "POST" });

    // We expect a response in the form of { success: boolean, error?: string }
    // If there was an error here, throw it so that the React mutation can handle it
    let json = await response.json();
    if (!json.success) {
        throw new Error(json.error);
    } else {
        return returnUrl;
    }
};

export const useIssueAnyCredential = () => {
    return useMutation(
        ({
            email,
            authToken,
            schemaUri,
            jsonValues,
            returnUrl,
        }: IssueAnySearchVars) =>
            handleIssueAny({
                email,
                authToken,
                schemaUri,
                jsonValues,
                returnUrl,
            }),
        {
            onSuccess: (data) => {
                console.log("Return url", data);
                window.location.href = data;
            },
        }
    );
};
