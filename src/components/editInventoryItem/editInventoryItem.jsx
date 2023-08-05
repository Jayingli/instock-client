import { useParams } from "react-router";
import "../editInventoryItem/editInventoryItem.scss";
import { Link } from "react-router-dom";
import backArrow from "../../assets/icons/arrow_back-24px.svg";
import axios from "axios";
import { useEffect, useState } from "react";

//Edit Inventory Item Component

function EditInventoryItem() {
  // State
  const [newFormData, setNewFormData] = useState({});
  // const [formData, setFormData] = useState({});
  const [formData, setFormData] = useState({
    id:'',
    item_name: '',
    description: '',
    category: '',
    status: '',
    warehouse_id: '',
    quantity: '',

  });
  const [categories, setCategories] = useState([]);
  const [warehouses, setWarehouses] = useState([]);

  //Pull down url
  const { id } = useParams();

  //GET request to get array of inventory items
  useEffect(() => {
    //GET array of all inventory items
    const URL = "http://localhost:5050/api/";

    axios
      .get(`${URL}inventories/${id}`)

      .then((res) => {
        //Store inventory item in inventoryData
        const inventoryData = res.data;

        console.log(res.data);

        const newObj = {
          id:inventoryData.id,
          item_name: inventoryData.item_name,
          description: inventoryData.description,
          category: inventoryData.category,
          status: inventoryData.status,
          warehouse_id: inventoryData.warehouse_name,
          quantity: inventoryData.quantity,
        };
        console.log(newObj);

        setFormData(inventoryData);
      });
  }, []);

  //GET request
  useEffect(() => {
    //GET array of all inventories
    const URL = "http://localhost:5050/api/";

    axios
      .get(`${URL}inventories`)

      .then((res) => {
        //Store inventory array in inventoryData
        const inventoryData = res.data;

        const categoryData = [];
        const warehouseData = [];

        //For each object in the array, if category from obj is not included in categoryData array, push category to array
        inventoryData.forEach((obj) => {
          const objCategory = obj.category;
          if (!categoryData.includes(objCategory)) {
            categoryData.push(objCategory);
          }
        });

        //For each object in the array, if warehouse name from obj is not included in warehouseData array, push warehouse to array
        inventoryData.forEach((obj) => {
          const objWarehouse = obj.warehouse_name;
          if (!warehouseData.includes(objWarehouse)) {
            warehouseData.push(objWarehouse);
          }
        });

        //Setting State
        setCategories(categoryData);
        setWarehouses(warehouseData);
      });
  }, []);

  //Change handler to take in form changes
  const itemEditHandler = (e) => {
    console.log(e.target.value);
    const { name, value } = e.target.value;
    setFormData({...formData, [name]: value });
    // console.log(newFormData);

    const newObj = {
      id:formData.id,
      warehouse_id: formData.warehouse_id,
      item_name: formData.item_name,
      description: formData.description,
      category: formData.category,
      status: formData.status,
      quantity: formData.quantity,
    };

    console.log(newObj);


    setFormData(newObj);

    // setFormData(setNewFormData);

    console.log(formData);
    
  };


  //Change Handler to submit new form data
  const itemSubmitHandler = (e) => {
    e.preventDefault();

    // PUT request to write the new info to the database
    axios
      .put(`http://localhost:5050/api/inventories/${id}`, formData)

      .then((res) => {
        console.log(res.data);

        // const newObj = {
        //   warehouse_id: newFormData.warehouse_id,
        //   item_name: newFormData.item_name,
        //   description: newFormData.description,
        //   category: newFormData.category,
        //   status: newFormData.status,
        //   quantity: res.quantity,
        // };

    
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
              <select name="category" value={formData.category} id="categories" onChange={itemEditHandler}>
                <option value={formData.category}>{formData.category}</option>
                {categories.map((category) => {
                  if (category != formData.category) {
                    return <option value={category}>{category}</option>;
                  }
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
                  checked={true}
                  onChange={itemEditHandler}
                />{" "}
                <label htmlFor="in stock">In stock</label>
                <input
                  type="radio"
                  name="status"
                  value="Out of Stock"
                  checked={false}
                  onChange={itemEditHandler}
                />{" "}
                <label htmlFor="out of stock">Out of stock</label>
              </div>
            </div>

            <label htmlFor="warehouse">Warehouse</label>
            <div className="warehouse__name">
              <select name="warehouse_id" value={formData.warehouse_name} id="warehouses_dropdown" onChange={itemEditHandler}>
                <option value={formData.warehouse_name}>{formData.warehouse_name}</option>
                {warehouses.map((warehouse) => {
                  if (warehouse != formData.warehouse_name) {
                    const warehouse_name = warehouse;
                    return <option value={warehouse_name}>{warehouse_name}</option>;
                  }
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
