export enum ProduceType {
    ARTICHOKE = "Artichoke",
    CORN = "Corn",
}

export enum ProductHeader {
    NewSeason,
    Sale,
}

export type Product = {
    id: string;
    name?: string;
    prevPrice?: number;
    discount?: number;
    price: number;
    qty: number;
    image?: string;
    header: ProductHeader;
    subTitle: string;
    produceType: ProduceType;
};

const getSalesPrice = (price: number, discount: number) =>
    price - (discount / 100) * price;

export const defataultProducts: Product[] = [
    {
        id: "baby-anzio-artichoke",
        name: "Baby Anzio",
        price: 40,
        qty: 0,
        image: "/images/artichokes/baby-anzio.jpg",
        header: ProductHeader.NewSeason,
        subTitle: "Premium Artichoke Strain",
        produceType: ProduceType.ARTICHOKE,
    },
    {
        id: "big-heart-artichoke",
        name: "Big Heart",
        prevPrice: 75,
        price: getSalesPrice(75, 3),
        qty: 0,
        image: "/images/artichokes/big-heart.jpg",
        discount: 3,

        header: ProductHeader.Sale,
        subTitle: "Premium Artichoke Strain",
        produceType: ProduceType.ARTICHOKE,
    },
    {
        id: "ambrosia",
        name: "Ambrosia",
        prevPrice: 75,
        price: getSalesPrice(75, 3),
        qty: 0,
        image: "/images/corn/ambrosia.jpg",
        discount: 3,
        header: ProductHeader.Sale,
        subTitle: "Premium Corn Strain",
        produceType: ProduceType.CORN,
    },
    {
        id: "blue-hopi",
        name: "Blue Hopi",
        price: 55,
        qty: 0,
        image: "/images/corn/blue-hopi.jpg",
        header: ProductHeader.NewSeason,
        subTitle: "Premium Corn Strain",
        produceType: ProduceType.CORN,
    },
    {
        id: "blue-hopi2",
        name: "Blue Hopi",
        prevPrice: 75,
        price: getSalesPrice(75, 3),
        qty: 0,
        image: "/images/corn/blue-hopi.jpg",
        discount: 3,
        header: ProductHeader.Sale,
        subTitle: "Premium Corn Strain",
        produceType: ProduceType.CORN,
    },
    {
        id: "blue-hopi3",
        name: "Blue Hopi",
        prevPrice: 75,
        price: getSalesPrice(75, 3),
        qty: 0,
        image: "/images/corn/blue-hopi.jpg",
        discount: 3,
        header: ProductHeader.Sale,
        subTitle: "Premium Corn Strain",
        produceType: ProduceType.CORN,
    },
    {
        id: "big-heart-artichoke2",
        name: "Big Heart",
        prevPrice: 75,
        price: getSalesPrice(75, 3),
        qty: 0,
        image: "/images/artichokes/big-heart.jpg",
        discount: 3,
        header: ProductHeader.Sale,
        subTitle: "Premium Artichoke Strain",
        produceType: ProduceType.ARTICHOKE,
    },
];
