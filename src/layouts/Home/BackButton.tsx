import { ArrowLeft } from "../../components/Icons/ArrowLeft";

export const BackButton = () => {
    return (
        <button className="flex flex-row items-center space-x-1 hover:opacity-75">
            <ArrowLeft
                width={16}
                height={16}
                className="stroke-blue-600"
                color="#219653"
            />
            <div className="text-blue-600 text-sm font-semibold">Back</div>
        </button>
    );
};
