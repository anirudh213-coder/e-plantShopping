import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice';
import './ProductList.css';

function ProductList() {
    const dispatch = useDispatch();
    // 1. Pull the live cart items from the global Redux state
    const cart = useSelector(state => state.cart.items);
    const [addedToCart, setAddedToCart] = useState({});

    // 2. Calculate the total quantities across all unique items for the navbar badge
    const calculateTotalQuantity = () => {
        return cart.reduce((total, item) => total + item.quantity, 0);
    };

    const plantsArray = [
        {
            category: "Air Purifying",
            plants: [
                { name: "Snake Plant", image: "https://cdn.pixabay.com/photo/2021/01/22/06/04/snake-plant-5939186_1280.jpg", description: "Produces oxygen at night, improving air quality.", cost: "$15" },
                { name: "Spider Plant", image: "https://cdn.pixabay.com/photo/2018/07/11/06/47/chlorophytum-3530413_1280.jpg", description: "Filters formaldehyde and xylene from the air.", cost: "$12" }
            ]
        },
        {
            category: "Aromatic",
            plants: [
                { name: "Lavender", image: "https://cdn.pixabay.com/photo/2017/07/11/15/51/lavender-2493998_1280.jpg", description: "Calming scent helps reduce stress and anxiety.", cost: "$18" },
                { name: "Mint", image: "https://cdn.pixabay.com/photo/2016/01/24/18/11/mint-1159311_1280.jpg", description: "Refreshing aroma, great for culinary use.", cost: "$10" }
            ]
        },
        {
            category: "Low Maintenance",
            plants: [
                { name: "Cast Iron Plant", image: "https://cdn.pixabay.com/photo/2014/12/21/23/34/aspidistra-576371_1280.jpg", description: "Thrives in low light and handles neglect beautifully.", cost: "$20" },
                { name: "Aloe Vera", image: "https://cdn.pixabay.com/photo/2018/04/02/07/42/aloe-3283186_1280.jpg", description: "Succulent with soothing medicinal gel properties.", cost: "$14" }
            ]
        }
    ];

    const handleAddToCart = (product) => {
        dispatch(addItem(product));
        setAddedToCart((prevState) => ({
            ...prevState,
            [product.name]: true,
        }));
    };

    return (
        <div>
            {/* Navigation Bar */}
            <nav className="navbar">
                <div className="navbar-logo">Paradise Nursery</div>
                <div className="navbar-links">
                    <a href="#" className="nav-link">Plants</a>
                    {/* 3. The badge will now dynamically scale as items are added */}
                    <a href="#" className="nav-link">Cart ({calculateTotalQuantity()})</a>
                </div>
            </nav>

            {/* Plant Grid Layout */}
            <div className="product-container">
                {plantsArray.map((categoryGroup, catIdx) => (
                    <div key={catIdx} className="category-section">
                        <h2 className="category-title">{categoryGroup.category} Plants</h2>
                        <div className="product-grid">
                            {categoryGroup.plants.map((plant, plantIdx) => (
                                <div key={plantIdx} className="product-card">
                                    <img className="product-image" src={plant.image} alt={plant.name} />
                                    <div className="product-name">{plant.name}</div>
                                    <div className="product-description">{plant.description}</div>
                                    <div className="product-cost">{plant.cost}</div>
                                    <button 
                                        className="product-button" 
                                        disabled={addedToCart[plant.name]} 
                                        onClick={() => handleAddToCart(plant)}
                                    >
                                        {addedToCart[plant.name] ? 'Added to Cart' : 'Add to Cart'}
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ProductList;