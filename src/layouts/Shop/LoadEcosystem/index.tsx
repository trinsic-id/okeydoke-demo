import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useToggle } from "react-use";
import { useRecoilState } from "recoil";
import { authSettingsState } from "../../../atoms/authService";
import { LoadingItem } from "../../../components/Shop/LoadingItem";

export const LoadEcosystem = () => {
    const [isEcosystemLoading, toggleEcosystemLoading] = useToggle(false);
    const [isError, toggleError] = useToggle(false);
    const [authSettings, setAuthSettings] = useRecoilState(authSettingsState);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const ecosystem = params.get("ecosystem");
        const schema = params.get("schema");
        if (ecosystem && schema) {
            setAuthSettings({ ecosystem, schema });
            toggleEcosystemLoading(true);
        } else {
            toggleError(true);
        }
    }, [location]);

    return (
        <div className="flex h-full w-full flex-col place-content-center items-center space-y-5 p-3">
            <LoadingItem
                isLoading={isEcosystemLoading}
                isError={isError}
                text={"Loading Settings"}
                onNext={() => {
                    navigate("/shop");
                }}
                successElement={
                    <div className="flex w-full flex-col items-start space-y-1">
                        <div className="flex w-full flex-row items-center justify-between">
                            <div className="text-lg font-light leading-tight">
                                Ecosystem
                            </div>
                            <div className="text-lg leading-tight">
                                {authSettings?.ecosystem}
                            </div>
                        </div>
                        <div className="flex w-full flex-row items-center justify-between">
                            <div className="text-lg font-light leading-tight">
                                Schema
                            </div>
                            <div className="text-lg leading-tight">
                                {authSettings?.schema &&
                                    authSettings.schema.replace(
                                        "https://schema.trinsic.cloud/",
                                        ""
                                    )}
                            </div>
                        </div>
                    </div>
                }
            />
        </div>
    );
};
