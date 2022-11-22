import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useToggle } from "react-use";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { authSettingsState } from "../../atoms/authService";
import {
    isRedirectErrorModalVisibleState,
    isRedirectVerifyCredentialErrorState,
    isVerifiedCredentialModalVisibleState,
} from "../../atoms/modals";
import {
    AuthState,
    authStateState,
    userCredentialState,
} from "../../atoms/user";
import { LoadingItem } from "../../components/LoadingItem";
import { CredentialDerivedProof } from "../../models/credential";
import { AuthService, defaultAuthSettings } from "../../services/AuthService";
import { generateSettings } from "../../utils/generateSettings";
import { CredentialIssued } from "./CredentialIssued";
import { ErrorModal } from "./ErrorModal";
import { MemberLevelSuccess } from "./MemberLevelSuccess";
import Spinner from "react-spinkit";
import { ServiceOptions, TrinsicService } from "@trinsic/trinsic/browser";
import { useVerifyCredential } from "../../hooks/custom/queries/useVerifyCredential";

export const Redirect = () => {
    const [isVerifyingLoading, toggleVerifyingLoading] = useToggle(false);
    const [isErrorVisible, setModalVisible] = useRecoilState(
        isRedirectErrorModalVisibleState
    );
    const setIsVerifyCredentialError = useSetRecoilState(
        isRedirectVerifyCredentialErrorState
    );
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [authState, setAuthState] = useRecoilState(authStateState);
    const [userCredential, setUserCredential] =
        useRecoilState(userCredentialState);
    const authSettings = useRecoilValue(authSettingsState);
    const setVerifiedModalVisible = useSetRecoilState(
        isVerifiedCredentialModalVisibleState
    );
    const { mutateAsync: verifyCredentialAsync } = useVerifyCredential(() => {
        setModalVisible(true);
        setIsVerifyCredentialError(true);
    });
    useEffect(() => {
        const error = searchParams.get("error");
        if (error !== null) return setModalVisible(true);

        let settings: typeof defaultAuthSettings;
        if (authSettings)
            settings = generateSettings(
                authSettings.ecosystem,
                authSettings.schema
            );
        else settings = generateSettings();

        const authService = new AuthService(settings);
        authService
            .signinRedirect()
            .catch(() => {
                const state = searchParams.get("state");
                const code = searchParams.get("code");
                if (!state && !code) return setModalVisible(true);
            })
            .then(async () => {
                const user = await authService.getUser();

                //("http://localhost:3000/redirect?state=d9b562509742421fb85c20e7d09a91da&error=no_credentials&error_description=User%20had%20no%20credentials%20to%20share");

                if (user && user.profile._vp_token) {
                    const verifyResp = await verifyCredentialAsync({
                        derivedProof: user.profile._vp_token as any,
                    });
                    window.alert(verifyResp);
                    if (
                        verifyResp.isValid &&
                        verifyResp.validationResults["CredentialStatus"].isValid
                    ) {
                        const credential = user.profile
                            ._vp_token as CredentialDerivedProof;
                        setUserCredential(credential);
                        toggleVerifyingLoading(true);
                        setAuthState(AuthState.VERIFIED);
                        setVerifiedModalVisible(true);
                        return navigate("/");
                    } else {
                        setIsVerifyCredentialError(true);
                        return setModalVisible(true);
                    }
                }
            });
    }, [authState, authSettings, searchParams]);

    return (
        <div
            className={`w-full h-full flex flex-col items-center place-content-center space-y-5 p-3`}
        >
            <div className="flex flex-row items-center space-x-4">
                <Spinner
                    fadeIn="full"
                    className={``}
                    name="double-bounce"
                    color="#828282"
                    style={{ height: "30px", width: "30px" }}
                />
                <div className="text-2xl text-gray-500">Loading store</div>
            </div>
            <ErrorModal />
        </div>
    );
};
