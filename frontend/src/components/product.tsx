import { Link } from "react-router-dom";
import shoppingCart from "../assets/images/shopping_cart.png";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "../store/cart";
import { RootState } from "../store";


interface Product {
    id: number;
    name: string;
    price: number;
    category: string;
    description: string | null;
    imageUrl: string | null;
}
const Product: React.FC<Product> = ({ id, name, price, description, category, imageUrl }) => {
    const carts = useSelector((store:RootState) => store.cart.items)
    console.log(carts)
    const dispatch = useDispatch()
    const handleAddToCart = () => {
        dispatch(addToCart({productId: id, quantity: 1}))
    }
    
return (
        <div className="flex flex-col sm:flex-row sm:flex-wrap items-start bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 p-4 rounded-lg shadow-md hover:shadow-lg mb-4">
            <Link to={`/product/${id}`} className="flex-shrink-0 mb-4 sm:mb-0 sm:mr-4">
                <img
                    src={imageUrl || ""}
                    alt={name}
                    className="w-32 h-auto rounded-lg"
                />
            </Link>
            <div className="flex flex-col items-center sm:items-start sm:flex-1">
                <h3 className="text-lg font-bold text-red-800 text-center sm:text-left">{name}</h3>
                <h3 className="text-sm text-yellow-600 text-center sm:text-left mb-4 truncate">
                    {description || "Description not found"}
                </h3>
                <h3 className="text-lg font-medium text-center sm:text-left">{category}</h3>
                <p className="text-lg font-semibold text-white mt-2 mb-2 text-center sm:text-left">
                    ${price}
                </p>
            </div>
            <div className="flex justify-center sm:justify-start mt-4 sm:mt-0 sm:ml-4">
                <button
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex gap-2"
                    onClick={handleAddToCart}
                >
                    <img src={shoppingCart} className="w-5" alt="Cart Icon" />
                    Add to Cart
                </button>
            </div>
        </div>
    );
};

export default Product;