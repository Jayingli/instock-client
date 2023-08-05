import "./warehouseAdd.scss";
import { Link, useNavigate } from "react-router-dom";
import backArrow from "../../assets/icons/arrow_back-24px.svg";
import Button from "../Button/Button";
import { useState } from "react";
import axios from "axios";
import errorIcon from "../../assets/icons/error-24px.svg";

const WarehouseAdd = () => {
  //Variables
  const baseURL = process.env.REACT_APP_BASE_URL;
  let navigate = useNavigate();

  //States
  const [warehouseState, setWarehouseState] = useState({
    warehouse_name: " ",
    address: " ",
    city: " ",
    country: " ",
    contact_name: " ",
    contact_position: " ",
    contact_phone: " ",
    contact_email: " ",
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

  //Error State
  const errorFieldRequiredHide = { display: "none" };

  const errorFieldRequiredShow = { display: "flex" };

  //Handle to submit form
  const handleSubmit = (event) => {
    event.preventDefault();

    if (isValidForm()) {
      axios
        .post(`${baseURL}/api/warehouses`, warehouseState)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });

      //Once form is submitted, re-direct to Warehouses List page
      navigate("/warehouses");
    } else {
      console.log("Form Invalid");
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
            className={`warehouse__input ${
              !warehouse_name ? "warehouse__input--error-state" : ""
            }`}
            type="text"
            name="warehouse_name"
            placeholder="Warehouse Name"
            onChange={handleOnChange}
          ></input>

          {/* Error state field required */}
          <div
            className="form__error-state"
            style={
              !warehouse_name ? errorFieldRequiredShow : errorFieldRequiredHide
            }
          >
            <img src={errorIcon} />
            <p>This field is required</p>
          </div>

          <label>Street Address</label>
          <input
            className={`warehouse__input ${
              !address ? "warehouse__input--error-state" : ""
            }`}
            type="text"
            name="address"
            placeholder="Address"
            onChange={handleOnChange}
          ></input>

          {/* Error state field required */}
          <div
            className="form__error-state"
            style={!address ? errorFieldRequiredShow : errorFieldRequiredHide}
          >
            <img src={errorIcon} />
            <p>This field is required</p>
          </div>

          <label>City</label>
          <input
            className={`warehouse__input ${
              !city ? "warehouse__input--error-state" : ""
            }`}
            type="text"
            name="city"
            placeholder="City"
            onChange={handleOnChange}
          ></input>

          {/* Error state field required */}
          <div
            className="form__error-state"
            style={!city ? errorFieldRequiredShow : errorFieldRequiredHide}
          >
            <img src={errorIcon} />
            <p>This field is required</p>
          </div>

          <label>Country</label>
          <input
            className={`warehouse__input ${
              !country ? "warehouse__input--error-state" : ""
            }`}
            type="text"
            name="country"
            placeholder="Country"
            onChange={handleOnChange}
          ></input>

          {/* Error state field required */}
          <div
            className="form__error-state"
            style={!country ? errorFieldRequiredShow : errorFieldRequiredHide}
          >
            <img src={errorIcon} />
            <p>This field is required</p>
          </div>
        </div>

        {/* Contact details */}
        <div className="addWarehouse__contact">
          <h2>Warehouse Contact</h2>
          <label>Contact Name</label>
          <input
            className={`warehouse__input ${
              !contact_name ? "warehouse__input--error-state" : ""
            }`}
            type="text"
            name="contact_name"
            placeholder="Contact Name"
            onChange={handleOnChange}
          ></input>

          {/* Error state field required */}
          <div
            className="form__error-state"
            style={
              !contact_name ? errorFieldRequiredShow : errorFieldRequiredHide
            }
          >
            <img src={errorIcon} />
            <p>This field is required</p>
          </div>

          <label>Position</label>
          <input
            className={`warehouse__input ${
              !contact_position ? "warehouse__input--error-state" : ""
            }`}
            type="text"
            name="contact_position"
            placeholder="Position"
            onChange={handleOnChange}
          ></input>

          {/* Error state field required */}
          <div
            className="form__error-state"
            style={
              !contact_position
                ? errorFieldRequiredShow
                : errorFieldRequiredHide
            }
          >
            <img src={errorIcon} />
            <p>This field is required</p>
          </div>

          <label>Phone Number</label>
          <input
            className={`warehouse__input ${
              !contact_phone ? "warehouse__input--error-state" : ""
            }`}
            type="text"
            name="contact_phone"
            placeholder="Phone Number"
            onChange={handleOnChange}
          ></input>

          {/* Error state field required */}
          <div
            className="form__error-state"
            style={
              !contact_phone ? errorFieldRequiredShow : errorFieldRequiredHide
            }
          >
            <img src={errorIcon} />
            <p>This field is required</p>
          </div>

          <label>Email</label>
          <input
            className={`warehouse__input ${
              !contact_email ? "warehouse__input--error-state" : ""
            }`}
            type="text"
            name="contact_email"
            placeholder="Email"
            onChange={handleOnChange}
          ></input>

          {/* Error state field required */}
          <div
            className="form__error-state"
            style={
              !contact_email ? errorFieldRequiredShow : errorFieldRequiredHide
            }
          >
            <img src={errorIcon} />
            <p>This field is required</p>
          </div>
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
