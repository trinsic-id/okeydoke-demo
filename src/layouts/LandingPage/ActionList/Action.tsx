interface ActionProps {
    text: string;
    image: string;
    onClick: (ev: any) => void;
}

export const Action = ({ text, image, onClick }: ActionProps) => {
    return (
        <div
            className="flex cursor-pointer flex-col items-center justify-between align-baseline text-gray-900 duration-100 ease-in hover:text-gray-600"
            onClick={onClick}
        >
            <img
                className="h-auto w-48 rounded-lg duration-100 ease-in hover:opacity-90 md:w-64"
                src={image}
            />
            <div className="mt-4 text-center text-xl font-semibold">{text}</div>
        </div>
    );
};
