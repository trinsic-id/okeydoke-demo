import { ArrowLeft } from "../../components/Icons/ArrowLeft";

export const BackButton = () => {
    return (
        <button className="flex flex-row items-center space-x-2 hover:opacity-75">
            <ArrowLeft
                width={21}
                height={21}
                className="stroke-blue-600"
                color="#219653"
            />
            <div className="text-blue-600 text-md font-semibold">Back</div>
        </button>
    );
};
