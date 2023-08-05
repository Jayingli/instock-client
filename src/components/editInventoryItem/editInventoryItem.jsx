import { useParams } from "react-router";
import "../editInventoryItem/editInventoryItem.scss";
import { Link } from "react-router-dom";
import backArrow from "../../assets/icons/arrow_back-24px.svg";
import axios from "axios";
import { useEffect, useState } from "react";

// Edit Inventory Item Component

function EditInventoryItem() {
  // State
  const [formData, setFormData] = useState({
    item_name: "",
    description: "",
    category: "",
    status: "",
    warehouse_id: "",
  });
  const [categories, setCategories] = useState([]);
  const [warehouses, setWarehouses] = useState([]);

  // Pull down url
  const { id } = useParams();

  // GET request to get the inventory item from the backend
  const getInventoryItem = async (itemId) => {
    try {
      const response = await axios.get(`http://localhost:5050/api/inventories/${itemId}`);
      const inventoryData = response.data;

      const newObj = {
        item_name: inventoryData.item_name,
        description: inventoryData.description,
        category: inventoryData.category,
        status: inventoryData.status,
        warehouse_id: inventoryData.warehouse_id, // warehouse_id
      };
      console.log(newObj);

      setFormData(newObj);
    } catch (error) {
      console.error("Error fetching inventory item:", error);
    }
  };

  // GET request to get array of all inventories
  const getAllInventories = async () => {
    try {
      const response = await axios.get("http://localhost:5050/api/inventories");
      const inventoryData = response.data;

      const categoryData = [];
      const warehouseData = [];

      // For each object in the array, if category from obj is not included in categoryData array, push category to array
      inventoryData.forEach((obj) => {
        const objCategory = obj.category;
        if (!categoryData.includes(objCategory)) {
          categoryData.push(objCategory);
        }
      });

      // For each object in the array, if warehouse name from obj is not included in warehouseData array, push warehouse to array
      inventoryData.forEach((obj) => {
        const objWarehouse = obj.warehouse_name;
        if (!warehouseData.includes(objWarehouse)) {
          warehouseData.push(objWarehouse);
        }
      });

      // Setting State
      setCategories(categoryData);
      setWarehouses(warehouseData);
    } catch (error) {
      console.error("Error fetching all inventories:", error);
    }
  };

  // Fetch the inventory item and all inventories on component mount
  useEffect(() => {
    getInventoryItem(id);
    getAllInventories();
  }, [id]);

  // Change handler to take in form changes
  const itemEditHandler = (e) => {
    console.log(e.target.value);
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  // Change Handler to submit new form data
  const itemSubmitHandler = (e) => {
    e.preventDefault();

    // PUT request to write the new info to the database
    axios
      .put(`http://localhost:5050/api/inventories/${id}`, formData)
      .then((res) => {
        console.log(res.data);

        const newObj = {
          warehouse_id: formData.warehouse_id,
          item_name: formData.item_name,
          description: formData.description,
          category: formData.category,
          status: formData.status,
          quantity: res.data.quantity, // res.data.quantity
        };

        // setNewFormData({newObj});
        console.log(newObj);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <section className="editInventoryItem">
      <div className="editHeader__div">
        <Link to="/inventories">
          <img src={backArrow} alt="Back Arrow" />
        </Link>
        <h1>Edit Inventory Item</h1>
      </div>

      <form action="submit" onClick={itemSubmitHandler}>
        <div className="form__wrap">
          <div className="details__wrap">
            <h2>Item Details</h2>

            <label htmlFor="item__name">Item Name</label>
            <input
              type="text"
              name="item_name"
              value={formData.item_name}
              onChange={itemEditHandler}
            />

            <label htmlFor="description">Description</label>
            <textarea
              name="description"
              id="description"
              value={formData.description}
              onChange={itemEditHandler}
            ></textarea>

            <label htmlFor="category">Category</label>
            <div className="category">
              <select name="categories__dropdown" id="categories" onChange={itemEditHandler}>
                <option value={formData.category}>{formData.category}</option>
                {categories.map((category) => {
                  if (category !== formData.category) {
                    return <option key={category} value={category}>{category}</option>;
                  }
                  return null;
                })}
              </select>
            </div>
          </div>

          <div className="availability__wrap">
            <h2>Item Availability</h2>

            <div className="status__wrap">
              <label htmlFor="status">Status</label>
              <div className="radio__wrap">
                <input
                  type="radio"
                  name="status"
                  value="In Stock"
                  checked={formData.status === "In Stock"}
                  onChange={itemEditHandler}
                />
                <label htmlFor="in stock">In stock</label>
                <input
                  type="radio"
                  name="status"
                  value="Out of Stock"
                  checked={formData.status === "Out of Stock"}
                  onChange={itemEditHandler}
                />
                <label htmlFor="out of stock">Out of stock</label>
              </div>
            </div>

            <label htmlFor="warehouse">Warehouse</label>
            <div className="warehouse__name">
              <select name="warehouses__dropdown" id="warehouses" onChange={itemEditHandler}>
                <option value={formData.warehouse_id}>{formData.warehouse_id}</option>
                {warehouses.map((warehouse) => {
                  if (warehouse !== formData.warehouse_id) {
                    return <option key={warehouse} value={warehouse}>{warehouse}</option>;
                  }
                  return null;
                })}
              </select>
            </div>
          </div>
        </div>

        <div className="button__wrap">
          <button className="cancel">Cancel</button>
          <button className="save" type="submit">
            Save
          </button>
        </div>
      </form>
    </section>
  );
}

export default EditInventoryItem;
