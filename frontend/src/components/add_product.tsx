import React, { useState } from "react";
import axios from "axios";

interface ProductFormProps {
  onClose: () => void;
}

interface Product {
  name: string;
  price: number;
  category: string;
  description: string | null;
  imageUrl: string | null;
}

const ProductForm: React.FC<ProductFormProps> = ({ onClose }) => {
  const [product, setProduct] = useState<Product>({
    name: "",
    price: 0,
    category: "",
    description: null,
    imageUrl: null,
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: name === "price" ? parseFloat(value) || 0 : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post("http://localhost:3333/api/products", product);
      alert("Product added successfully");
    } catch (error) {
      alert("Error adding product");
    } finally {
      setLoading(false);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-1/2">
        <h2 className="text-2xl text-white font-bold mb-4">Add New Product</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            value={product.name}
            onChange={handleChange}
            placeholder="Product Name"
            required
            className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600"
          />
          <input
            type="text"
            name="price"
            value={product.price}
            onChange={handleChange}
            placeholder="Price"
            required
            className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600"
          />
          <input
            type="text"
            name="category"
            value={product.category}
            onChange={handleChange}
            placeholder="Category"
            required
            className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600"
          />
          <textarea
            name="description"
            value={product.description || ""}
            onChange={handleChange}
            placeholder="Description (optional)"
            className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600"
          />
          <input
            type="text"
            name="imageUrl"
            value={product.imageUrl || ""}
            onChange={handleChange}
            placeholder="Image URL (optional)"
            className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600"
          />
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-red-500 text-white rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-lg"
              disabled={loading}
            >
              {loading ? "Adding..." : "Add Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};


const HomePage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <div className="p-4">
      <button
        onClick={handleOpenModal}
        className="px-4 py-2 bg-green-500 text-white rounded-lg"
      >
        Add New Product
      </button>
      {isModalOpen && <ProductForm onClose={handleCloseModal} />}
    </div>
  );
};

export default HomePage;
