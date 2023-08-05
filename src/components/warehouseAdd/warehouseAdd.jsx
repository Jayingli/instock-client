import "./warehouseAdd.scss";
import { Link, useNavigate } from "react-router-dom";
import backArrow from "../../assets/icons/arrow_back-24px.svg";
import Button from "../Button/Button";
import { useState } from "react";
import axios from "axios";

const WarehouseAdd = () => {
  //Variables
  const baseURL = process.env.REACT_APP_BASE_URL;
  let navigate = useNavigate();

  console.log(baseURL);
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

  //Function to add dashes to phone number

  //onChange handle
  const handleOnChange = (event) => {
    const value = event.target.value;
    const nameForm = event.target.name;
    const valuePhoneDash = value.replace(/^(\d{3})(\d{3})(\d{4})/, "$1-$2-$3");

    //If the state change is contact_phone, it will modify the phone number by adding dashes, so the server can accept it
    if (nameForm === "contact_phone") {
      return setWarehouseState({
        ...warehouseState,
        [nameForm]: valuePhoneDash,
      });
    }

    setWarehouseState({
      ...warehouseState,
      [nameForm]: value,
    });
  };

  //Form Validation

  //Empty Fields
  const isFieldsValid = () => {
    if (
      !warehouse_name ||
      !address ||
      !city ||
      !country ||
      !contact_name ||
      !contact_position ||
      !contact_phone ||
      !contact_email
    ) {
      return false;
    } else {
      return true;
    }
  };

  //Phone Number validation
  const isPhoneValid = () => {
    const phoneValidator = /1?-?\(?[0-9]{3}[\-\)][0-9]{3}-[0-9]{4}/;

    if (!phoneValidator.test(contact_phone)) {
      return false;
    } else {
      return true;
    }
  };

  //   Email Validation
  const isEmailValid = () => {
    if (!contact_email.includes("@")) {
      return false;
    } else {
      return true;
    }
  };

  // Final validation
  const isValidForm = () => {
    if (!isFieldsValid()) {
      return false;
    }
    if (!isEmailValid()) {
      return false;
    }
    if (!isPhoneValid()) {
      return false;
    }
    if (!isEmailValid()) {
      return false;
    }
    return true;
  };

  //Handle to submit form
  const handleSubmit = (event) => {
    event.preventDefault();

    if (isValidForm()) {
      axios
        .post(`${baseURL}/api/warehouses`, {
          warehouse_name: warehouse_name,
          address: address,
          city: city,
          country: country,
          contact_name: contact_name,
          contact_position: contact_position,
          contact_phone: contact_phone,
          contact_email: contact_email,
        })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });

      //Once form is submitted, re-direct to Warehouses List page
      navigate('/warehouses');
    } else {
    console.log("Form Invalid")
    }
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
