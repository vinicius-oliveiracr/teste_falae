import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Product from "../components/product";



const Detail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [product, setProduct] = useState<any>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`http://localhost:3333/api/products/${id}`)
                setProduct(response.data)
            }catch (err){
                setError("Error while finding products.")
            }
            finally{
                setLoading(false)
            }
        }
        fetchProduct()
    }, [id])

    if(loading){
        return <div>Loading...</div>
    }

    if(error){
        return <div>{error}</div>
    }
    
    return (
        <div>
        <Product
        key={product.id}
            id={product.id}
            name={product.name}
            price={product.price}
            description={product.description}
            category={product.category}
            imageUrl={product.imageUrl || "No image found."}/>
        </div>
    )
}

export default Detail