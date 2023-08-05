import "./warehouseAdd.scss";
import { Link } from "react-router-dom";
import backArrow from "../../assets/icons/arrow_back-24px.svg";
import Button from "../Button/Button";
import { useState } from "react";

const WarehouseAdd = () => {
  //Variables
  const baseURL = process.env.REACT_APP_BASE_URL;

  //States
  const [warehouseState, setWarehouseState] = useState({
    warehouse_name: "",
    address: "",
    city: "",
    country: "",
    contact_name: "",
    contact_position: "",
    contact_phone: "",
    contact_email: "",
  });

  // Destructuring states
  const {
    warehouse_name,
    address,
    city,
    country,
    contact_name,
    contact_position,
    contact_phone,
    contact_email,
  } = warehouseState;

  //onChange handle
  const handleOnChange = (event) => {
    const value = event.target.value;
    setWarehouseState({
      ...warehouseState,
      [event.target.name]: value,
    });
  };

  //Form Validation

  //Empty Fields

  //Handle to submit form
  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <section className="addWarehouse__container">
      {/* header */}
      <div className="addWarehouse__header">
        <Link to="/warehouses">
          <img src={backArrow} alt="Back Arrow" />
        </Link>
        <h1>Add New Warehouse</h1>
      </div>

      {/* Warehouse details */}
      <form onSubmit={handleSubmit}>
        <div className="addWarehouse__details">
          <h2>Warehouse Details</h2>
          <label>Warehouse Name</label>
          <input
            type="text"
            name="warehouse_name"
            placeholder="Warehouse Name"
            onChange={handleOnChange}
          ></input>
          <label>Street Address</label>
          <input
            type="text"
            name="address"
            placeholder="Address"
            onChange={handleOnChange}
          ></input>
          <label>City</label>
          <input
            type="text"
            name="city"
            placeholder="City"
            onChange={handleOnChange}
          ></input>
          <label>Country</label>
          <input
            type="text"
            name="country"
            placeholder="Country"
            onChange={handleOnChange}
          ></input>
        </div>

        {/* Contact details */}
        <div className="addWarehouse__contact">
          <h2>Warehouse Contact</h2>
          <label>Contact Name</label>
          <input
            type="text"
            name="contact_name"
            placeholder="Contact Name"
            onChange={handleOnChange}
          ></input>
          <label>Position</label>
          <input
            type="text"
            name="contact_position"
            placeholder="Position"
            onChange={handleOnChange}
          ></input>
          <label>Phone Number</label>
          <input
            type="text"
            name="contact_phone"
            placeholder="Phone Number"
            onChange={handleOnChange}
          ></input>
          <label>Email</label>
          <input
            type="text"
            name="contact_email"
            placeholder="Email"
            onChange={handleOnChange}
          ></input>
        </div>

        {/* Button Container */}
        <div className="button__wrap">
          <Link to="/warehouses">
            {" "}
            <Button variant="cancel" type="cancel" text="Cancel" />
          </Link>
          <Button variant="warehouseAdd" type="submit" text="+ Add Warehouse" />
        </div>
      </form>
    </section>
  );
};

export default WarehouseAdd;
