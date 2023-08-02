import { useEffect, useState } from "react";
import "../warehouseDetails/warehouseDetails.scss";
import axios from "axios";
import { useParams } from "react-router";
import editIcon from "../../assets/icons/edit-white-24px.svg";
import backArrow from "../../assets/icons/arrow_back-24px.svg";
import { Link } from "react-router-dom";

//WarehouseDetails Component

function WarehouseDetails() {
  //State
  const [details, setDetails] = useState([]);

  //Get current id
  const { id } = useParams();
  console.log(id);

  //GET request
  useEffect(() => {
    //GET array of all warehouses
    const URL = "http://localhost:5050/api/";

    axios
      .get(URL + "warehouses")

      .then((res) => {
        //Store warehouse array in warehouseData
        const warehouseData = res.data;

        //Set listData to the array of warehouses
        setDetails(warehouseData);
      });
  }, []);

  return (
    <div className="warehouse__details">
      {details.map((warehouse) => {
        if (warehouse.id == id) {
          return (
            <div>
              <div className="title__wrap">
                <div className="warehouse">
                  <Link to="/warehouses"><img src={backArrow} alt="Back Arrow" />
                  </Link>
                  <h1>{warehouse.warehouse_name}</h1>
                </div>
                <div className="edit">
                  <Link to="/warehouses/:id">
                    <img src={editIcon} alt="edit icon" fill="none" className="edit__icon" /> 
                    {/* <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 17.25V21H6.75L17.81 9.94L14.06 6.19L3 17.25ZM20.71 7.04C21.1 6.65 21.1 6.02 20.71 5.63L18.37 3.29C17.98 2.9 17.35 2.9 16.96 3.29L15.13 5.12L18.88 8.87L20.71 7.04V7.04Z" fill="#2E66E6"/>
                    </svg> */}

                    
                    <p>Edit</p>
                  </Link>
                </div>
              </div>

              <div className="detail__wrap">
                <div className="detail__header--mobile">
                  <h4>Warehouse Address:</h4>
                  <p>
                    {warehouse.address}, {warehouse.city}, {warehouse.country}
                  </p>
                </div>

                <div className="detail__header--tabdesc">
                  <h4>Warehouse Address:</h4>
                  <p>{warehouse.address}, </p>
                  <p>
                    {warehouse.city}, {warehouse.country}
                  </p>
                </div>

                <div className="contact__wrap">
                  <div className="name__wrap">
                    <h4>Contact Name:</h4>
                    <p>{warehouse.contact_name}</p>
                    <p>{warehouse.contact_position}</p>
                  </div>

                  <div className="info__wrap">
                    <h4>Contact Information:</h4>
                    <p>{warehouse.contact_phone}</p>
                    <a href={`mailto: ${warehouse.contact_email}`}>
                      {warehouse.contact_email}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          );
        }
      })}
    </div>
  );
}

export default WarehouseDetails;
