import { Link } from "react-router-dom";
import shoppingCart from "../assets/images/shopping_cart.png";


interface Product {
    id: number;
    name: string;
    price: number;
    category: string;
    description: string | null;
    imageUrl: string | null;
}
const Product: React.FC<Product> = ({ id, name, price, description, category, imageUrl }) => {
    return (
        <div>
            <Link to={`/product/${id}`}>
            <img src={imageUrl || "default.jpg"} alt={name} className="w-full h-80 object-cover object-top drop-shadow-[0_80px_30px_#0007]"/>
            </Link>
            <h3 className="text-2xl py-3 text-center font-medium">{name}</h3>
            <div className="flex justify-between items-center">
                <p>
                    $<span className="text-2xl font-medium">{price}</span>
                </p>
            <h3 className="text-lg font-medium">{category}</h3>
            <h3 className="text-lg font-medium">{description}</h3>
            <button className="bg-gray-300 p-2 rounded-md text-sm hover:bg-gray-400 flex gap-2">
                <img src={shoppingCart} className="w-5" alt="" />
                Add to Cart
            </button>
            </div>
        </div>
    )
};

export default Product;