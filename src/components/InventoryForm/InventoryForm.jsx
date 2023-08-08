import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Button from "../../components/Button/Button";
import "./InventoryForm.scss";

/*
 * InventoryForm Component
 * - Represents the inventory form for adding new inventory item
 * - If status is “Out of Stock”, the quantity field will not be visible
 * - If status is "In stock", the quantity field will be visible
 * 
 * Form Validation:
 * - The form ensures that all required fields are filled out before submission.
 * - Validation errors are displayed under each corresponding field when applicable.
 */

function InventoryForm({ onCancelAddItem }) {
    // State to store warehouses and categories
    const [warehouses, setWarehouses] = useState([]);
    const [categories, setCategories] = useState(new Set()); // Use Set to store unique categories

    useEffect(() => {
        // Fetch warehouses data from the backend API
        const warehousesURL = "http://localhost:5050/api/warehouses";
        axios.get(warehousesURL)
            .then((response) => {
                setWarehouses(response.data);
            })
            .catch((error) => console.error("Failed to fetch warehouse:", error));

        // Fetch categories data from the backend API
        const inventoriesURL = "http://localhost:5050/api/inventories";
        axios.get(inventoriesURL)
            .then((response) => {
                // Get an array of all categories from the response data
                const allCategories = response.data.map((item) => item.category);
                // Create a new Set from the array to store unique categories
                const uniqueCategories = new Set(allCategories);
                setCategories(uniqueCategories);
            })
            .catch((error) => console.error("Failed to fetch category:", error));
    }, []);

    // State to store the selected option "In stock"
    const [selectedOption, setSelectedOption] = useState("in stock");

    // Handler function to update the selected option
    const handleOptionChange = (event) => {
        const selectedValue = event.target.value;
        setSelectedOption(selectedValue);
      
        // Clear the quantity field when switching to "out of stock"
        if (selectedValue === "out of stock") {
          setFormValues((prevFormValues) => ({
            ...prevFormValues,
            quantity: "",
          }));
        }
    };

    // State to store form validation errors
    const [formValues, setFormValues] = useState({
        name: "",
        description: "",
        category: "",
        status: "in stock",
        quantity: "",
        warehouse: "",
    });

    const [formErrors, setFormErrors] = useState({});

    // Form submission handler
    const handleSubmit = (event) => {
        event.preventDefault();

        // Check for form field errors before submitting
        const errors = {};
        if (!formValues.name.trim()) {
          errors.name = "This field is required";
        }
        if (!formValues.description.trim()) {
          errors.description = "This field is required";
        }
        if (!formValues.category || formValues.category === "Please select") {
          errors.category = "This field is required";
        }
        if (!formValues.status) {
          errors.status = "This field is required";
        }
        if (formValues.status === "in stock" && (!formValues.quantity || isNaN(parseInt(formValues.quantity)) || parseInt(formValues.quantity) <= 0)) {
            errors.quantity = "Invalid quantity";
        }
        if (!formValues.warehouse || formValues.warehouse === "Please select") {
          errors.warehouse = "This field is required";
        }


        // If there are errors, set them in the state and prevent form submission
        if (Object.keys(errors).length > 0) {
            setFormErrors(errors); // Set specific errors
            return;
        }

        // If there are no errors, proceed with form submission
        // Create a new item object
        const newItem = {
            item_name: formValues.name,
            description: formValues.description,
            category: formValues.category,
            status: selectedOption,
            quantity: formValues.quantity,
            warehouse_id: formValues.warehouse,
        };

        // Send the new item data to your backend API endpoint
        axios
        .post("http://localhost:5050/api/inventories", newItem)
        .then((response) => {
            console.log("New item added:", response.data);
            // Reload the page after successful submission
            window.location.reload();
        })
        .catch((error) => console.error("Failed to add item:", error));

        // Clear the form fields after successful submission
        event.target.reset();
        // Reset radio button to default value
        setSelectedOption("in stock");
        // Clear form errors after successful submission
        setFormErrors({});

        // Close the AddNewInventoryItem component
        onCancelAddItem();
    };

    return (
        <form className="inventory-form" onSubmit={handleSubmit}>
            <div className="inventory-form__content">
                {/* Item Details Section */}
                <div className="inventory-form__section">
                    <h3 className="inventory-form__title">Item Details</h3>

                    {/* Item Name */}
                    <label className="inventory-form__label" htmlFor="name">
                        Item Name
                    </label>
                    <input
                        className={`inventory-form__input ${formErrors.name ? "inventory-form__error" : ""}`}
                        type="text"
                        id="name"
                        name="name"
                        placeholder="Item Name"
                        value={formValues.name}
                        onChange={(e) => {
                            setFormValues({ ...formValues, name: e.target.value });
                            // Clear the error message for the name field
                            setFormErrors((prevErrors) => ({ ...prevErrors, name: "" }));
                        }}
                    ></input>
                    {/* Item name error message */}
                    {formErrors.name && (
                        <div className="inventory-form__error-message">
                            {formErrors.name}
                        </div>
                    )}

                    {/* Item Description */}
                    <label className="inventory-form__label" htmlFor="description">
                        Description
                    </label>
                    <textarea
                        className={`inventory-form__textarea ${formErrors.description ? "inventory-form__error" : ""}`}
                        id="description"
                        name="description"
                        rows="5"
                        placeholder="Please enter a brief item description..."
                        value={formValues.description}
                        onChange={(e) => {
                            setFormValues({ ...formValues, description: e.target.value });
                            // Clear the error message for the name field
                            setFormErrors((prevErrors) => ({ ...prevErrors, description: "" }));
                        }}
                    ></textarea>
                    {/* Item description error message */}
                    {formErrors.description && (
                        <div className="inventory-form__error-message">
                            {formErrors.description}
                        </div>
                    )}

                    {/* Category */}
                    <label className="inventory-form__label" htmlFor="category">
                        Category
                    </label>
                    <select
                        className={`inventory-form__select ${formErrors.category ? "inventory-form__error" : ""}`}
                        name="category"
                        id="category"
                        value={formValues.category}
                        onChange={(e) => {
                            setFormValues({ ...formValues, category: e.target.value });
                            // Clear the error message for the name field
                            setFormErrors((prevErrors) => ({ ...prevErrors, category: "" }));
                        }}
                    >
                        <option className="inventory-form__placeholder">Please select</option>
                        {[...categories].map((category, index) => (
                        <option key={index} value={category}>
                            {category}
                        </option>
                        ))}
                    </select>
                    {/* Category error message */}
                    {formErrors.category && (
                        <div className="inventory-form__error-message">
                            {formErrors.category}
                        </div>
                    )}
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
                            value="in stock"
                            checked={selectedOption === "in stock"}
                            onChange={handleOptionChange}
                        />
                        In stock
                        </label>
                        <label className="inventory-form__status">
                        <input
                            className="inventory-form__radio"
                            type="radio"
                            name="status"
                            value="out of stock"
                            checked={selectedOption === "out of stock"}
                            onChange={handleOptionChange}
                        />
                        Out of stock
                        </label>
                    </div>
                    {/* Status error message */}
                    {formErrors.status && (
                        <div className="inventory-form__error-message">
                            {formErrors.status}
                        </div>
                    )}

                    {/* Quantity (visible only if status is "in stock") */}
                    {selectedOption === "in stock" && (
                        <div className="inventory-form__quantity">
                            <label className="inventory-form__label" htmlFor="quantity">
                                Quantity
                            </label>
                            <input
                                className={`inventory-form__input ${formErrors.quantity ? "inventory-form__error" : ""}`}
                                type="number"
                                id="quantity"
                                name="quantity"
                                value={formValues.quantity}
                                onChange={(e) => {
                                    setFormValues({ ...formValues, quantity: e.target.value });
                                    // Clear the error message for the name field
                                    setFormErrors((prevErrors) => ({ ...prevErrors, quantity: "" }));
                                }}
                            />
                            {/* Quantity error message */}
                            {formErrors.quantity && (
                                <div className="inventory-form__error-message">
                                    {formErrors.quantity}
                                </div>
                            )}
                        </div>
                    )}

                    {/* Warehouse */}
                    <label className="inventory-form__label" htmlFor="warehouse">
                        Warehouse
                    </label>
                    <select
                        className={`inventory-form__select ${formErrors.warehouse ? "inventory-form__error" : ""}`}
                        name="warehouse"
                        id="warehouse"
                        value={formValues.warehouse}
                        onChange={(e) => {
                            setFormValues({ ...formValues, warehouse: e.target.value });
                            // Clear the error message for the name field
                            setFormErrors((prevErrors) => ({ ...prevErrors, warehouse: "" }));
                        }}
                    >
                        <option>Please select</option>
                        {warehouses.map((warehouse) => (
                        <option key={warehouse.id} value={warehouse.id}>
                            {warehouse.warehouse_name}
                        </option>
                        ))}
                    </select>
                    {/* Warehouse error message */}
                    {formErrors.warehouse && (
                        <div className="inventory-form__error-message">
                            {formErrors.warehouse}
                        </div>
                    )}
                </div>
            </div>

            {/* Form Buttons */}
            <div className="inventory-form__buttons">
                <Button variant="secondary" text="Cancel" onClick={onCancelAddItem} />
                <Button variant="primary" type="submit" text="+ Add item" />
            </div>
        </form>
    );
}

export default InventoryForm;
