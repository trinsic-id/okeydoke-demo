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
    score: number;
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
        score: 4,
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
        score: 3,
    },

    {
        id: "castel",
        name: "Castel",
        prevPrice: 64,
        price: getSalesPrice(64, 3),
        qty: 0,
        image: "/images/artichokes/castel.jpeg",
        discount: 3,
        header: ProductHeader.Sale,
        subTitle: "Premium Artichoke Strain",
        produceType: ProduceType.ARTICHOKE,
        score: 4,
    },

    {
        id: "sangria",
        name: "Sangria",
        price: 78,
        qty: 0,
        image: "/images/artichokes/sangria.jpg",
        header: ProductHeader.NewSeason,
        subTitle: "Premium Artichoke Strain",
        produceType: ProduceType.ARTICHOKE,
        score: 3,
    },

    {
        id: "green-globe",
        name: "Green Globe",
        prevPrice: 45,
        price: getSalesPrice(45, 3),
        qty: 0,
        image: "/images/artichokes/green-globe.jpg",
        header: ProductHeader.Sale,
        subTitle: "Premium Artichoke Strain",
        produceType: ProduceType.ARTICHOKE,
        score: 3,
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
        score: 5,
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
        score: 4,
    },
    {
        id: "golden-bantam",
        name: "Golden Bantam",
        prevPrice: 64,
        price: getSalesPrice(64, 3),
        qty: 0,
        image: "/images/corn/golden-bantam.jpg",
        discount: 3,
        header: ProductHeader.Sale,
        subTitle: "Premium Corn Strain",
        produceType: ProduceType.CORN,
        score: 4,
    },
    {
        id: "honey-select",
        name: "Honey Select",
        price: 55,
        qty: 0,
        image: "/images/corn/honey-select.jpg",
        header: ProductHeader.NewSeason,
        subTitle: "Premium Corn Strain",
        produceType: ProduceType.CORN,
        score: 4,
    },
    {
        id: "jubilee",
        name: "Jubilee",
        prevPrice: 64,
        price: getSalesPrice(64, 3),
        qty: 0,
        image: "/images/corn/jubilee.jpg",
        discount: 3,
        header: ProductHeader.Sale,
        subTitle: "Premium Corn Strain",
        produceType: ProduceType.CORN,
        score: 4,
    },
];
