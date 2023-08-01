import { useEffect, useState } from "react";
import "../warehouseDetails/warehouseDetails.scss";
import axios from "axios";
import { useParams } from "react-router";
import editIcon from "../../assets/icons/edit-24px.svg";
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
                    <img src={editIcon} alt="edit icon" fill="white" />
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
