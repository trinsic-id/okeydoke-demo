import { useEffect } from "react";
import { Star } from "react-feather";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import Spinner from "react-spinkit";
import { useToggle } from "react-use";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { authSettingsState } from "../../atoms/authService";
import { MemberLevel, memberLevelState } from "../../atoms/member";
import { isRedirectErrorModalVisibleState } from "../../atoms/modals";
import {
    AuthState,
    authStateState,
    userCredentialState,
} from "../../atoms/user";
import { LoadingItem } from "../../components/LoadingItem";
import { VerifyCredentialModal } from "../../components/VerifyCredential";
import { ProduceType } from "../../data/products";
import { CredentialDerivedProof } from "../../models/credential";
import { AuthService, defaultAuthSettings } from "../../services/AuthService";
import { generateSettings } from "../../utils/generateSettings";
import { CredentialIssued } from "./CredentialIssued";
import { ErrorModal } from "./ErrorModal";
import { MemberLevelSuccess } from "./MemberLevelSuccess";

export const Redirect = () => {
    const [isVerifyingLoading, toggleVerifyingLoading] = useToggle(false);
    const [isProfileLoading, toggleProfileLoading] = useToggle(false);
    const [isProfilError, toggleProfileError] = useToggle(false);
    const [isDiscountsLoading, toggleDiscountsLoading] = useToggle(false);
    const [isRedirectLoading, toggleRedirectLoading] = useToggle(false);
    const [isErrorVisible, setModalVisible] = useRecoilState(
        isRedirectErrorModalVisibleState
    );
    const [searchParams, _] = useSearchParams();
    const navigate = useNavigate();
    const [authState, setAuthState] = useRecoilState(authStateState);
    const [userCredential, setUserCredential] =
        useRecoilState(userCredentialState);
    const authSettings = useRecoilValue(authSettingsState);
    // useEffect(() => {
    //   toggleVerifyingLoading(true);
    // }, []);
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
                    const credential = user.profile
                        ._vp_token as CredentialDerivedProof;
                    // credential.credentialSubject.certificationGrade = MemberLevel.BRONZE;
                    // credential.credentialSubject.produceType = ProduceType.ARTICHOKE;
                    setUserCredential(credential);
                    toggleVerifyingLoading(true);
                    setAuthState(AuthState.VERIFIED);
                    //navigate("/");
                }
            });
    }, [authState, authSettings, searchParams]);

    return (
        <div
            className={`w-full h-full flex flex-col items-center place-content-center space-y-5 p-3`}
        >
            <LoadingItem
                isLoading={isVerifyingLoading}
                text={"Verifying Credential"}
                isError={isErrorVisible}
                onNext={() => {
                    if (!isErrorVisible) {
                        toggleVerifyingLoading(false);
                        toggleProfileLoading(true);
                    }
                }}
                successElement={<CredentialIssued />}
            />
            <LoadingItem
                isLoading={isProfileLoading}
                isError={isProfilError}
                text={"Fetching profile"}
                onNext={() => {
                    if (!isErrorVisible) {
                        toggleProfileLoading(false);
                        toggleDiscountsLoading(true);
                    }
                }}
                successElement={
                    userCredential?.credentialSubject.certificationGrade ? (
                        <MemberLevelSuccess />
                    ) : undefined
                }
            />
            <LoadingItem
                isLoading={isDiscountsLoading}
                text={"Fetching discounts and limits"}
                onNext={() => {
                    if (!isErrorVisible) {
                        toggleDiscountsLoading(false);
                        toggleRedirectLoading(true);
                    }
                }}
            />
            <LoadingItem
                isLoading={isRedirectLoading}
                text={"Redirecting to store"}
                onNext={() => {
                    if (!isErrorVisible) {
                        toggleRedirectLoading(false);
                        navigate("/");
                    }
                }}
            />
            <ErrorModal />
        </div>
    );
};
