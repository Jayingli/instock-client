import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import backArrow from "../../assets/icons/arrow_back-24px.svg";
import { useParams } from "react-router";
import "../editWarehouse/editWarehouse.scss";

//Edit Warehouse Component

function EditWarehouse() {
  //state
  const { id } = useParams();
  const [formData, setFormData] = useState({});

  //GET request to get array of warehuose
  useEffect(() => {
    const URL = `http://localhost:5050/api/warehouses/${id}`;
    axios.get(URL).then((res) => {
      //Store Warehouse data in data
      const data = res.data;

      //set FormData to the warehouse object
      setFormData(data[0]);
    });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => {
      return { ...prevFormData, [name]: value };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);

    const URL = `http://localhost:5050/api/warehouses/${id}`;
    //PUT request to write the new info to the database?
    axios
      .put(URL, formData)
      .then((res) => {
        console.log(res.data);
        console.log("Updated");
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
        <h1>Edit Warehouse</h1>
      </div>

      <form action="submit">
        <div className="form__wrap">
          <div className="details__wrap">
            <h2>Warehouse Details</h2>

            <label htmlFor="item__name">Warehouse Name</label>
            <input type="text" name="item_name" value={formData.item_name} />

            <label htmlFor="item__name">Street Address</label>
            <input type="text" name="item_name" value={formData.item_name} />
            {/* <label htmlFor="description">Street Address</label>
            <textarea
              name="description"
              id="description"
              value={formData.description}
            ></textarea> */}

            <label htmlFor="item__name">City</label>
            <input type="text" name="item_name" value={formData.item_name} />
            {/* <label htmlFor="category">City</label>
            <div className="category">{formData.category}</div> */}
            <label htmlFor="item__name">Country</label>
            <input type="text" name="item_name" value={formData.item_name} />
            {/* 
            <label htmlFor="category">Country</label>
            <div className="category">{formData.category}</div> */}
          </div>

          <div className="availability__wrap">
            <h2>Contact Details</h2>

            <div className="status__wrap">
              <label htmlFor="status">Contact Name</label>
              <div className="radio__wrap">
                <input type="text" name="status" />
              </div>
            </div>

            <label htmlFor="warehouse">Position</label>
            <input type="text" name="item_name" value={formData.item_name} />
            <label htmlFor="warehouse">Phone Number</label>
            <input type="text" name="item_name" value={formData.item_name} />
            <label htmlFor="warehouse">Email</label>
            <input type="text" name="item_name" value={formData.item_name} />
          </div>
        </div>

        <div className="button__wrap">
          <button className="cancel">Cancel</button>
          <button className="save">Save</button>
        </div>
      </form>
    </section>
  );
}

export default EditWarehouse;