import {Action} from "./Action";
import {useSetRecoilState} from "recoil";
import {isIssueModalVisibleState} from "../../../atoms/modals";

export default function ActionList() {
    const setIssueModalVisible = useSetRecoilState(isIssueModalVisibleState);

    return (
        <div className="mt-24 md:mt-48 w-full">
            <div className="flex flex-col md:flex-row items-center align-middle justify-center gap-14 md:gap-24">
                <Action text="Get your Farmerpass" image="images/landing/farm.jpg" onClick={() => {
                    setIssueModalVisible(true);
                }}/>
                <a href="/shop">
                    <Action text="Buy discounted seeds" image="images/artichokes/big-heart.jpg" onClick={() => {}}/>
                </a>
            </div>
        </div>
    )
}

/* <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">*/
