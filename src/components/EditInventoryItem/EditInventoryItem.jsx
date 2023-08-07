import { useEffect, useState} from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import axios from "axios";
import Button from "../Button/Button";
import backArrowIcon from "../../assets/icons/arrow_back-24px.svg";
import "./EditInventoryItem.scss";
import "../InventoryForm/InventoryForm.scss";

/*
 * Edit Inventory Item Component
 * - Represents the edit existing inventory item
 */

function EditInventoryItem() {
    const [formData, setFormData] = useState({
        id: '',
        item_name: '',
        description: '',
        category: '',
        status: '',
        warehouse_name: '',
        quantity: '',
    });

    const [warehouseData, setWarehouseData] = useState([])
    const [warehouseId, setWarehouseId] = useState([]);

    const [categories, setCategories] = useState([]);
    const [warehouses, setWarehouses] = useState([]);

    // State variable to track whether to redirect to Inventory Page
    const [redirectInventoryPage, setRedirectInventoryPage] = useState(false);

    const { id } = useParams();

    useEffect(() => {
    const URL = "http://localhost:5050/api/";

    axios.get(`${URL}inventories/${id}`)
        .then((res) => {
        const inventoryData = res.data;
        console.log("Fetched inventory data:", inventoryData);
        setFormData({
            id: inventoryData.id,
            item_name: inventoryData.item_name,
            description: inventoryData.description,
            category: inventoryData.category,
            status: inventoryData.status,
            warehouse_name: inventoryData.warehouse_name,
            quantity: inventoryData.quantity,
        });
        })
        .catch((err) => {
        console.log("Error fetching inventory data:", err);
        });
    }, [id]);
    
    useEffect(() => {
    const URL = "http://localhost:5050/api/";

    axios.get(`${URL}inventories`)
    .then((res) => {
        const inventoryData = res.data;
        const categoryData = [];
        const warehouseData = [];

        inventoryData.forEach((obj) => {
        const objCategory = obj.category;
        if (!categoryData.includes(objCategory)) {
            categoryData.push(objCategory);
        }
        });

        inventoryData.forEach((obj) => {
        const objWarehouse = obj.warehouse_name;
        if (!warehouseData.includes(objWarehouse)) {
            warehouseData.push(objWarehouse);
        }
        });

        setCategories(categoryData);
        setWarehouses(warehouseData);
    });
    }, []);
    
    useEffect(() => {
        const URL = "http://localhost:5050/api/";

        axios.get(`${URL}warehouses`)
            .then((res) => {
            setWarehouseData(res.data);
            console.log(res.data);
        })
    }, []);
    
    const itemEditHandler = (e) => {
        const { name, value } = e.target;
      
        if(name == "warehouse_name") {
            const findWarehouse = warehouseData.find((obj) => obj.warehouse_name == value)
            console.log(findWarehouse);
        
            setWarehouseId(findWarehouse.id);
            console.log(findWarehouse.id);
            console.log({warehouse_id: findWarehouse.id})
        
            setFormData({ ...formData, [name]: value, warehouse_id: findWarehouse.id});
            console.log(formData);
            return
        };

        // Special handling for status changes
        if (name === "status") {
            const newStatus = value === "in-stock" ? "In Stock" : "Out of Stock";
            let newQuantity;
      
            if (value === "in-stock") {
              // If switching back to "In Stock," restore the original quantity
              newQuantity = formData.originalQuantity;
            } else {
              // If switching to "Out of Stock," set quantity to "0"
              newQuantity = "0";
            }
      
            setFormData({
              ...formData,
              status: newStatus,
              quantity: newQuantity,
            });
      
            return;
        }
      
        if (name === "quantity" && formData.status === "In Stock") {
            setFormData({
                ...formData,
                [name]: value,
                originalQuantity: value, // Update the original quantity when editing quantity while "In Stock"
            });
            return;
        }
    
        setFormData({ ...formData, [name]: value });
        console.log("Updated Form Data:", { ...formData, [name]: value });
    };
    
    const itemSubmitHandler = (e) => {
        e.preventDefault();
    
        console.log("Form Data:", formData);
    
        const URL = "http://localhost:5050/api/";
        console.log("Submitting form data:", formData);
        axios.put(`${URL}inventories/${id}`, formData)
            .then((res) => {
                console.log(res.data);
                // Handle success or other logic after successful update

                // Set the state variable to trigger the redirect
                setRedirectInventoryPage(true);
                
            })
            .catch((err) => {
                console.log(err);
                // Handle error if the update fails
            });
    };

    // Redirect to Inventory Page
    if (redirectInventoryPage) {
        return <Navigate to="/inventories" />;
    }

    return (
        <div className="edit-inventory">
            <div className="edit-inventory__heading">
                <Link to="/inventories">
                    <img
                        className="edit-inventory__icon"
                        src={backArrowIcon}
                        alt="Back Arrow Icon"
                    />
                </Link>
                <h2 className="edit-inventory__title">{formData.item_name}</h2>
            </div>

            <form className="inventory-form" onSubmit={itemSubmitHandler}>
            <div className="inventory-form__content">
                {/* Item Details Section */}
                <div className="inventory-form__section">
                    <h3 className="inventory-form__title">Item Details</h3>

                    {/* Item Name */}
                    <label className="inventory-form__label" htmlFor="item_name">
                        Item Name
                    </label>
                    <input
                        className={"inventory-form__input"}
                        type="text"
                        id="item_name"
                        name="item_name"
                        value={formData.item_name}
                        onChange={itemEditHandler}
                    ></input>

                    {/* Item Description */}
                    <label className="inventory-form__label" htmlFor="description">
                        Description
                    </label>
                    <textarea
                        className={"inventory-form__textarea"}
                        id="description"
                        name="description"
                        rows="5"
                        value={formData.description}
                        onChange={itemEditHandler}
                    ></textarea>

                    {/* Category */}
                    <label className="inventory-form__label" htmlFor="category">
                        Category
                    </label>
                    <select
                        className={"inventory-form__select"}
                        name="category"
                        id="category"
                        value={formData.category}
                        onChange={itemEditHandler}
                    >
                        <option className="inventory-form__placeholder" value={formData.category}>{formData.category}</option>
                        {categories.map((category) => {
                            if (category !== formData.category) {
                            return <option key={category} value={category}>{category}</option>;
                        }
                            return null;
                        })}
                    </select>
                </div>

                {/* Item Availability Section */}
                <div className="inventory-form__section">
                    <h3 className="inventory-form__title">Item Availability</h3>

                    {/* Status */}
                    <label className="inventory-form__label" htmlFor="status">
                        Status
                    </label>
                    <div>
                        <label className="inventory-form__status">
                        <input
                            className="inventory-form__radio"
                            type="radio"
                            name="status"
                            value="in-stock"
                            checked={formData.status === "In Stock"}
                            onChange={itemEditHandler}
                        />
                        In stock
                        </label>
                        <label className="inventory-form__status">
                        <input
                            className="inventory-form__radio"
                            type="radio"
                            name="status"
                            value="out-of-stock"
                            checked={formData.status === "Out of Stock"}
                            onChange={itemEditHandler}
                        />
                        Out of stock
                        </label>
                    </div>

                    {/* Quantity (visible only if status is "in stock") */}
                    {formData.status === "In Stock" ? (
                        <div className="inventory-form__quantity">
                            <label className="inventory-form__label" htmlFor="quantity">
                                Quantity
                            </label>
                            <input
                                className={"inventory-form__input"}
                                type="quantity"
                                id="quantity"
                                name="quantity"
                                value={formData.quantity}
                                onChange={itemEditHandler}
                            ></input>
                        </div>
                    ) : null}

                    {/* Warehouse */}
                    <label className="inventory-form__label" htmlFor="warehouse">
                        Warehouse
                    </label>
                    <select
                        className={"inventory-form__select"}
                        name="warehouse_name"
                        id="warehouse_name"
                        value={formData.warehouse_name}
                        onChange={itemEditHandler}
                    >
                        <option value={formData.warehouse_name}>
                            {formData.warehouse_name}
                        </option>
                        {warehouses.map((warehouse) => {
                            if (warehouse !== formData.warehouse_name) {
                            return <option key={warehouse} value={warehouse}>{warehouse}</option>;
                        }
                            return null;
                        })}
                    </select>
                </div>
            </div>

            {/* Form Buttons */}
            <div className="inventory-form__buttons">
                <Link to="/inventories" className="edit-inventory__link">
                    <Button variant="secondary" text="Cancel"/>
                </Link>
                <Button variant="primary" type="submit" text="Save"/>
            </div>
        </form>
        </div>
    );
}

export default EditInventoryItem;
