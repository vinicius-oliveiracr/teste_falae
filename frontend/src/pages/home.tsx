import Product from "../components/product";
import React, { useEffect, useState } from "react";
import axios from "axios";

const Home: React.FC = () => {
    const [products, setProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:3333/api/products')
                setProducts(response.data)
            }
            catch (err){
                setError("Error while finding products.")
            } finally{
                setLoading(false)
            }
        }

        fetchProducts()
    }, []);

    if(loading){
        return <div>Loading...</div>
    }

    if(error){
        return <div>{error}</div>
    }
    return (
        <div>
            {products.map((product) => (
                <Product
                    key={product.id}
                    id={product.id}
                    name={product.name}
                    price={product.price}
                    description={product.description}
                    category={product.category}
                    imageUrl={product.imageUrl || "default-image.jpg"}
                />
            ))}
        </div>
    );
};

export default Home