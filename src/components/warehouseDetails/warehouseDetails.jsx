import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import "../warehouseDetails/warehouseDetails.scss";
import axios from "axios";
import editIcon from "../../assets/icons/edit-white-24px.svg";
import backArrow from "../../assets/icons/arrow_back-24px.svg";

//WarehouseDetails Component

function WarehouseDetails() {
  //State
  const [details, setDetails] = useState([]);

  //Get current id
  const { id } = useParams();

  //GET request
  useEffect(() => {
    //GET array of all warehouses
    const URL = "http://localhost:5050/api/";

    axios
      .get(URL + "warehouses")

      .then((res) => {
        //Store warehouse array in warehouseData
        const warehouseData = res.data;

        //Set details to the array of warehouses
        setDetails(warehouseData);
      });
  }, []);

  return (
    <div className="warehouse__details">
      {details.map((warehouse) => {
        // If warehouse id is equal to url id, build component below with that data
        if (warehouse.id == id) {
          return (
            <div>
              <div className="title__wrap">
                <div className="warehouse">
                  <Link to="/warehouses">
                    <img src={backArrow} alt="Back Arrow" />
                  </Link>
                  
                  <h1>{warehouse.warehouse_name}</h1>
                </div>

                <div className="edit">
                  <Link to="/warehouses/:id">
                    <img src={editIcon} alt="edit icon" />

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
