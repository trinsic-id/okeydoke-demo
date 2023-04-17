import {Product} from "../../../data/products";

interface ActionProps {
    text: string;
    image: string;
    onClick: (ev: any) => void;
}

export const Action = ({text, image, onClick}: ActionProps) => {
    return (
        <div
            className="flex flex-col items-center justify-between align-baseline cursor-pointer ease-in duration-100 text-gray-900 hover:text-gray-600"
            onClick={onClick}>
            <img className="rounded-lg w-48 md:w-64 h-auto hover:opacity-90 ease-in duration-100" src={image}/>
            <div className="text-center mt-4 font-semibold text-xl">
                {text}
            </div>
        </div>
    );
}
