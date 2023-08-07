import { useEffect, useState} from "react";
import { Link, useParams, Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import Button from "../Button/Button";
import backArrowIcon from "../../assets/icons/arrow_back-24px.svg";
import "./EditWarehouse.scss";
import "../AddNewWarehouse/AddNewWarehouse.scss";

/*
 * Edit Warehouse Component
 * - Represents the edit existing warehouse
 */

function EditWarehouse() {
    //state
    const { id } = useParams();
    const [formData, setFormData] = useState({});

    //Variables
    let navigate = useNavigate();

    //GET request to get array of warehuose
    useEffect(() => {
    const URL = `http://localhost:5050/api/warehouses/${id}`;
    axios.get(URL).then((res) => {
        //Store Warehouse data in data
        const data = res.data[0];

        // Data variables
        const {warehouse_name, address, city, country, contact_name, contact_position, contact_phone, contact_email}= data;

        //set FormData to the warehouse object
        setFormData({  
        warehouse_name: warehouse_name,
        address: address,
        city: city,
        country: country,
        contact_name: contact_name,
        contact_position: contact_position,
        contact_phone: contact_phone,
        contact_email: contact_email
    });
    });
    }, []);

    //Handle Change
    const handleChange = (e) => {
        const { name, value } = e.target;
        const valuePhoneDash = value.replace(/^(\d{3})(\d{3})(\d{4})/, "$1-$2-$3");

        //If the state change is contact_phone, it will modify the phone number by adding dashes, so the server can accept it
        if (name === "contact_phone") {
            return setFormData({
                ...formData,
                [name]: valuePhoneDash,
            });
        };
        setFormData((prevFormData) => {
            return { ...prevFormData, [name]: value };
        });
    };

// Form data variables
const {warehouse_name, address, city, country, contact_name, contact_position, contact_phone, contact_email}= formData;

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

    // Phone Number validation
    const isPhoneValid = () => {
        const phoneValidator = /^(?:(?:\(?(?:00|\+)([1-4]\d\d|[1-9]\d*)\)?)[\-\.\ \\\/]?)?((?:\(?\d{1,}\)?[\-\.\ \\\/]?){0,})(?:[\-\.\ \\\/]?(?:#|ext\.?|extension|x)[\-\.\ \\\/]?(\d+))?$/igm;

        if (!phoneValidator.test(contact_phone)) {
        return false;
        } else {
        return true;
        }
    };

    // Email Validation
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


    //Submit handle
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);

        if(isValidForm()){
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
    
            //Once form is submitted, re-direct to Warehouses List page
            navigate("/warehouses");
        }else{
         console.log('Form invalid')
        }
    };

    return (
        <div className="edit-warehouse">
            <div className="edit-warehouse__heading">
                <Link to="/warehouses">
                    <img
                        className="edit-warehouse__icon"
                        src={backArrowIcon}
                        alt="Back Arrow Icon"
                    />
                </Link>
                <h2 className="edit-warehouse__title">Edit Warehouse</h2>
            </div>

            {/* Warehouse details */}
            <form className="edit-warehouse__form" onSubmit={handleSubmit}>
                <div className="edit-warehouse__content">
                    <div className="edit-warehouse__section">
                        <h3 className="edit-warehouse__subtitle">Warehouse Details</h3>
                        <label className="edit-warehouse__label" htmlFor="warehouse_name">Warehouse Name</label>
                        <input
                            className={"edit-warehouse__input"}
                            type="text"
                            name="warehouse_name"
                            value={formData.warehouse_name}
                            onChange={handleChange}
                        ></input>

                        <label className="edit-warehouse__label" htmlFor="address">Street Address</label>
                        <input
                            className={"edit-warehouse__input"}
                            type="text"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                        ></input>

                        <label className="edit-warehouse__label" htmlFor="city">City</label>
                        <input
                            className={"edit-warehouse__input"}
                            type="text"
                            name="city"
                            value={formData.city}
                            onChange={handleChange}
                        ></input>

                        <label className="edit-warehouse__label" htmlFor="country">Country</label>
                        <input
                            className={"edit-warehouse__input"}
                            type="text"
                            name="country"
                            value={formData.country}
                            onChange={handleChange}
                        ></input>
                    </div>

                    {/* Contact details */}
                    <div className="edit-warehouse__section">
                        <h3 className="edit-warehouse__subtitle">Contact Details</h3>
                        <label className="edit-warehouse__label" htmlFor="contact_name">Contact Name</label>
                        <input
                            className={"edit-warehouse__input"}
                            type="text"
                            name="contact_name"
                            id="contact_name"
                            value={formData.contact_name}
                            onChange={handleChange}
                        ></input>

                        <label className="edit-warehouse__label" htmlFor="contact_position">Position</label>
                        <input
                            className={"edit-warehouse__input"}
                            type="text"
                            name="contact_position"
                            id="contact_position"
                            value={formData.contact_position}
                            onChange={handleChange}
                        ></input>

                        <label className="edit-warehouse__label" htmlFor="contact_phone">Phone Number</label>
                        <input
                            className={"edit-warehouse__input"}
                            type="text"
                            name="contact_phone"
                            id="contact_phone"
                            value={formData.contact_phone}
                            onChange={handleChange}
                        ></input>

                        <label className="edit-warehouse__label" htmlFor="contact_email">Email</label>
                        <input
                            className={"edit-warehouse__input"}
                            type="text"
                            name="contact_email"
                            id="contact_email"
                            value={formData.contact_email}
                            onChange={handleChange}
                        ></input>
                    </div>
                </div>

                {/* Form Buttons */}
                <div className="edit-warehouse__buttons">
                    <Link to="/warehouses" className="edit-warehouse__link">
                        <Button variant="secondary" text="Cancel"/>
                    </Link>
                    <Button variant="primary" type="submit" text="Save" />
                </div>
            </form>

        </div>
    );
}

export default EditWarehouse;