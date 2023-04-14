import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToggle } from "react-use";
import { useResetRecoilState } from "recoil";
import { authSettingsState } from "../../../atoms/authService";
import { LoadingItem } from "../../../components/Shop/LoadingItem";

export const ResetEcosystem = () => {
    const [isEcosystemResetting, toggleEcosystemResetting] = useToggle(false);
    const resetAuthSettings = useResetRecoilState(authSettingsState);
    const navigate = useNavigate();

    useEffect(() => {
        resetAuthSettings();
        toggleEcosystemResetting(true);
    }, []);

    return (
        <div className="w-full h-full flex flex-col items-center place-content-center space-y-5 p-3">
            <LoadingItem
                isLoading={isEcosystemResetting}
                text={"Resetting Ecosystem"}
                onNext={() => {
                    navigate("/");
                }}
            />
        </div>
    );
};
