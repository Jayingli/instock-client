import { useParams } from "react-router";
import "../editInventoryItem/editInventoryItem.scss";
import { Link } from "react-router-dom";
import backArrow from "../../assets/icons/arrow_back-24px.svg";
import axios from "axios";
import { useEffect, useState } from "react";

function EditInventoryItem() {
  const [formData, setFormData] = useState({
    id: '',
    item_name: '',
    description: '',
    category: '',
    status: '',
    warehouse_id: '',
    quantity: '',
  });

  const [categories, setCategories] = useState([]);
  const [warehouses, setWarehouses] = useState([]);

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
          warehouse_id: inventoryData.warehouse_id,
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

  const itemEditHandler = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    console.log("Updated Form Data:", { ...formData, [name]: value });
  };

  const itemSubmitHandler = (e) => {
    e.preventDefault();

    console.log("Form Data:", formData);

    const URL = "http://localhost:5050/api/";
    console.log("Submitting form data:", formData);
    axios
      .put(`${URL}inventories/${id}`, formData)
      .then((res) => {
        console.log(res.data);
        // Handle success or other logic after successful update
      })
      .catch((err) => {
        console.log(err);
        // Handle error if the update fails
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
  
      <form action="submit" onSubmit={itemSubmitHandler}>
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
              <select
                name="category"
                value={formData.category}
                id="categories"
                onChange={itemEditHandler}
              >
                <option value={formData.category}>{formData.category}</option>
                {categories.map((category) => {
                  if (category !== formData.category) {
                    return <option value={category}>{category}</option>;
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
              <select
                name="warehouse_id"
                value={formData.warehouse_id}
                id="warehouses_dropdown"
                onChange={itemEditHandler}
              >
                <option value={formData.warehouse_id}>
                  {formData.warehouse_id}
                </option>
                {warehouses.map((warehouse) => {
                  if (warehouse !== formData.warehouse_id) {
                    return <option value={warehouse}>{warehouse}</option>;
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
