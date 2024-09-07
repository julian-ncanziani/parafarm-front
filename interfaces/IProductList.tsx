interface IProduct {
    _id: string; 
    name: string;
    description: string;
    price: number;
    stock: number;
    category_id: string;
    image: string;
    active: boolean;
}

export default IProduct;