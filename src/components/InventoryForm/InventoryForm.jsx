import { useState, useEffect } from 'react';
import axios from 'axios';
import Button from '../../components/Button/Button';
import './InventoryForm.scss';

/* 
 * InventoryForm Component
 * - Represents 
 *
 * Props:
 * '' prop: 
 * '' prop: 
 */

function InventoryForm() {
    const [warehouses, setWarehouses] = useState([]);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const warehousesURL = "http://localhost:5050/api/warehouses";
        axios.get(warehousesURL)
            .then(response => {
                setWarehouses(response.data);
            })
            .catch((error) => console.error("Failed to fetch warehouse:", error));

        const categoriesURL = "http://localhost:5050/api/inventories";
        axios.get(categoriesURL)
            .then((response) => {
                setCategories(response.data);
                // const uniqueCategories = [...new Set(response.data.map(item => item.category))];
                // setCategories(uniqueCategories);
            })
            .catch((error) => console.error("Failed to fetch category:", error));
    }, []);


    const [selectedOption, setSelectedOption] = useState('');

    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
    };

    return (
        <form className="inventory-form">
            <div className="inventory-form__content">
                <div className="inventory-form__section">
                    <h3 className="inventory-form__title">Item Details</h3>

                    <label className="inventory-form__label" htmlFor="name" >Item Name</label>
                    <input className="inventory-form__input" type="text" id="name" name="name" placeholder="Item Name"></input>

                    <label className="inventory-form__label" htmlFor="description">Description</label>
                    <textarea className="inventory-form__textarea" id="description" name="description" rows="5" placeholder="Please enter a brief item description..."></textarea>

                    <label className="inventory-form__label" htmlFor="category">Category</label>
                    <select className="inventory-form__select" name="category" id="category">
                        <option className="inventory-form__placeholder" value="Please select">Please select</option>
                        {/* {categories.map((category, index) => (
                            <option key={index} value={category}>{category}</option>
                        ))} */}
                        {categories.map((category) => (
                            <option key={category.id} value={category.category}>{category.category}</option>
                        ))}
                    </select>
                </div>

                <div className="inventory-form__section">
                    <h3 className="inventory-form__title">Item Availability</h3>

                    <label className="inventory-form__label" htmlFor="status">Status</label>
                    <div>
                        <label className="inventory-form__status">
                            <input
                            className="inventory-form__radio"
                            type="radio"
                            name="status"
                            value="in-stock"
                            checked={selectedOption === 'in-stock'}
                            onChange={handleOptionChange}
                            />
                            In stock
                        </label>
                        <label className="inventory-form__status">
                            <input
                            className="inventory-form__radio"
                            type="radio"
                            name="status"
                            value="out-of-stock"
                            checked={selectedOption === 'out-of-stock'}
                            onChange={handleOptionChange}
                            />
                            Out of stock
                        </label>
                    </div>

                    <label className="inventory-form__label" htmlFor="quantity">Quantity</label>
                    <input className="inventory-form__input" type="quantity" id="quantity" name="quantity" ></input>

                    <label className="inventory-form__label" htmlFor="warehouse">Warehouse</label>
                    <select className="inventory-form__select" name="warehouse" id="warehouse">
                        <option value="Please select">Please select</option>
                        {warehouses.map((warehouse) => (
                            <option key={warehouses.id} value={warehouse.warehouse_name}>{warehouse.warehouse_name}</option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="inventory-form__buttons">
                    <Button variant="secondary" text="Cancel"/>
                    <Button variant="primary" text="+ Add item"/>
            </div>
        </form>
    );
};

export default InventoryForm;

// <form onSubmit={handleSubmit}>
        //     <label>
        //         Name:
        //         <input type="text" value={itemData.name} onChange={(e) => setItemData({ ...itemData, name: e.target.value })} />
        //     </label>
        //     <label>
        //         Quantity:
        //         <input type="number" value={itemData.quantity} onChange={(e) => setItemData({ ...itemData, quantity: parseInt(e.target.value) })} />
        //     </label>
        //     <button type="submit">{initialData ? 'Edit Item' : 'Add Item'}</button>
        // </form>

        // <form class="comments__form">
        //     <label class="comments__label" for="name">Name</label>
        //     <input class="comments__input" type="text" id="name" name="name" placeholder="Enter your name">
            
        //     <label class="comments__label">Comment</label>
        //     <textarea class="comments__textarea" id="message" name="message" rows="4" placeholder="Add a new comment"></textarea>
            
        //     <div class="comments__submit">
        //         <input class="comments__btn button" type="submit" value="Comment">
        //     </div>
        // </form>

        