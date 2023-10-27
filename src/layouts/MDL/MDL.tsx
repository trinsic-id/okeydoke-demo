import { Encoder } from "cbor-x";

import * as jose from "jose";
import { useState } from "react";
import { Trello } from "react-feather";
import { JSONModal } from "./JSONModal";

const Animations = {
    container: {
        visible: {
            opacity: 1,
            transition: {
                when: "beforeChildren",
                staggerChildren: 0.1,
            },
        },
        hidden: {
            opacity: 0,
            transition: {
                when: "afterChildren",
            },
        },
    },
    item: {
        visible: { opacity: 1, x: 0 },
        hidden: { opacity: 0, x: -100 },
    },
    filterText: {
        visible: { opacity: 1 },
        hidden: { opacity: 0 },
    },
};
//@ts-ignore
const qr = new QrcodeDecoder();

const fetchJWT = async (url: string, token: string) => {
    var myHeaders = new Headers();
    myHeaders.append("User-Agent", "LE-Officer/3 CFNetwork/1474 Darwin/23.0.0");
    myHeaders.append("Accept-Language", "en-US,en;q=0.9");
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
        version: "1.0",
        docRequests: [
            {
                nameSpaces: {
                    "org.iso.18013.5.1.ut": { donor: true, veteran: true },
                    "org.aamva.us": {
                        endorsements: true,
                        weight: true,
                        veteran: true,
                        height: true,
                        name_suffix: true,
                        middle_name: true,
                        donor: true,
                        restrictions: true,
                        real_id: true,
                    },
                    "org.iso.18013.5.1": {
                        expiry_date: true,
                        issue_date: true,
                        height: true,
                        driving_privileges: true,
                        administrative_number: true,
                        resident_state: true,
                        hair_colour: true,
                        iat: true,
                        family_name: true,
                        eye_colour: true,
                        birth_place: true,
                        weight: true,
                        resident_city: true,
                        age_over_18: true,
                        given_name: true,
                        age_birth_year: true,
                        biometric_template_face: true,
                        issuing_authority: true,
                        un_distinguishing_sign: true,
                        resident_postal_code: true,
                        document_number: true,
                        portrait: true,
                        given_name_national_character: true,
                        family_name_national_character: true,
                        age_in_years: true,
                        exp: true,
                        nationality: true,
                        issuing_jurisdiction: true,
                        resident_address: true,
                        birth_date: true,
                        name_national_character: true,
                        biometric_template_signature_sign: true,
                        portrait_capture_date: true,
                        age_over_21: true,
                        resident_country: true,
                        sex: true,
                        signature_usual_mark: true,
                        issuing_country: true,
                    },
                    "com.scytales.18013.5.1": {
                        status: true,
                        revocation_date: true,
                        physical_document_discriminator: true,
                    },
                    "org.iso.18013.5.1.aamva": {
                        DHS_compliance: true,
                        DHS_temporary_lawful_status: true,
                        EDL_credential: true,
                    },
                },
                docType: "org.iso.18013.5.1.mDL",
            },
        ],
        token: token,
    });

    let requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
    };

    const resp = await fetch(`${url}/identity`, {
        ...requestOptions,
    });
    const json = await resp.json();
    try {
        const data = json.documents[0];
        const claims = jose.decodeJwt(data);
        return claims;
    } catch {
        return json;
    }
};

async function startScan(setData: React.Dispatch<any>) {
    if (!qr.isCanvasSupported()) {
        alert("Your browser doesn't match the required specs.");
        throw new Error("Canvas and getUserMedia are required");
    }
    var video = document.getElementById("video")!;
    console.log(video);
    let code = await qr.decodeFromCamera(video, {
        width: 400,
        height: 400,
    });
    console.log("code", code);
    const decodeBase64 = (encoded: string) => {
        return new Uint8Array(
            atob(encoded.replace(/_/g, "/").replace(/-/g, "+"))
                .split("")
                .map((c) => c.charCodeAt(0))
        );
    };

    let encoder = new Encoder({ structuredClone: true });
    //@ts-ignore
    let b64 = code.data.replace("mdoc:", "");
    //   let b64 =
    //     "pABjMS4wAYIB2BhYS6QBAiABIVggptRJVEVxFBOvIwhVqv8lKk0EyR-1VJNQUD3Wk5kJ2h4iWCAyJiPrLAYI_V_ANgJq4UQPbM3pQG5HfDoopiJ0fEyrnQKBgwIBowD1AfQKUAAA0EIAABAAgAAAgF-bNPsDoWZ3ZWJBcGmDAXgnaHR0cHM6Ly9hcGkudXQubW9iaWxlZGwudXMvYXBpL0lzbzE4MDEzeKIwb1JEb1FFbW9GZ3VoR2t4T1RBNU1UUXdPRFZyTWpBeE1qQXhNVGN3TlRpRVFSSkM5d0ZGX2JuN0s3dEJBV2d5TmpRME5qRTNOMWhBQmRuUU9fZW8zdUxtR0ZlQnlKM0pYYjRobHg1M0dTOXE1T3VSZGZuYW4xa2pPNkZEOTNYUEJfdk1UTVNaMTAwMnZxaWtLazFIbnQ5T3VlSlpyeVJjUWc";
    //   // b64 = b64.replace(/_/g, "/").replace(/-/g, "+");
    let decodedString = decodeBase64(b64);
    console.log(decodedString);
    let decoded = encoder.decode(decodedString);
    //@ts-ignore
    window.decoded = decoded;
    console.log(decoded);
    const serverRetrival = decoded.get(3);
    if (serverRetrival) {
        if (serverRetrival.has("webApi")) {
            const webApi = serverRetrival.get("webApi");
            const [_, url, token] = webApi;
            const data = await fetchJWT(url, token);
            setData(data);
        }
    }
    //   console.log(decoded);
    //   for (let obj of decoded) {
    //     console.log(obj);
    //   }
}

export const MDL = () => {
    const [data, setData] = useState<any>(undefined);
    return (
        <div className="flex max-h-screen-95 w-full flex-col items-start bg-catalog-bg">
            <div className="flex w-full flex-row justify-between p-4 mix-blend-darken shadow-2xl">
                <div className="flex flex-row items-start space-x-2">
                    <Trello size={28} className="stroke-green-600" />
                    <div className="text-2xl text-black">Utah MDL</div>
                </div>
            </div>

            <div className="flex w-full flex-col place-content-center items-center gap-4">
                <video id="video" autoPlay></video>
                <div className="flex flex-row gap-4 space-x-2">
                    <button
                        className="group flex h-full w-full max-w-lg flex-row place-content-center items-center space-x-3 rounded-lg border-2 border-blue-500 bg-white px-2 py-3 text-blue-500 hover:border-opacity-0 hover:bg-blue-500 hover:text-white"
                        onClick={() => {
                            startScan(setData);
                        }}
                    >
                        <span>Scan QR code</span>
                    </button>
                </div>
            </div>
            <JSONModal data={data} close={() => setData(undefined)} />
        </div>
    );
};
