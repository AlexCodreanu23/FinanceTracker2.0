import React, { useEffect, useState } from "react";
import { fetchCategories } from "../services/api";

const CategoriesPage = () => {
        const[categories, setCategories] = useState([]);

        useEffect(() => {
            fetchCategories().then((data) => {
                console.log("Categories: ", data);
                setCategories(data);
            }).catch((err) => console.error(err));
        }, []);

        return(
            <div>
                <h1>Categories</h1>
                {categories.length === 0 ? (
                    <p>No categories or categories are loading..</p>
                ) : (
                    <ul>
                        {categories.map((tx) => (
                            <li key = {tx.id}> {tx.name}</li>
                        ))}
                    </ul>
                )}
            </div>
        )
    };

export default CategoriesPage;