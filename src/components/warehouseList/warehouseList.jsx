import { Link } from "react-router-dom";
import Warehouse from "../../Pages/warehouse/warehouse";
import "../warehouseList/warehouseList.scss";
import "../../styles/partials/_global.scss";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import searchIcon from '../../assets/icons/search-24px.svg';
import forwardArrow from '../../assets/icons/chevron_right-24px.svg';
import deleteIcon from '../../assets/icons/delete_outline-24px.svg';
import editIcon from '../../assets/icons/edit-24px.svg';

//Warehouse List Component

function WarehouseList() {
  // console.log(warehouseData);

  //State
  const [listData, setListData] = useState([]);

  useEffect(() => {
    //GET array of all warehouses
    const URL = "http://localhost:5050/api/";

    axios
      .get(URL + "warehouses")

      .then((res) => {
        //Store warehouse array in warehouseData
        const warehouseData = res.data;

        //Set listData to the array of warehouses
        setListData(warehouseData);
      });
  }, []);

  return (
    <div className="warehouse__list--component">
      <div className="header__wrap">
        <h1>Warehouses</h1>
        <div className="input__wrap">
          <input type="search" name="search" placeholder="Search..."></input>
          <button className="search"><img src={searchIcon} alt="" /></button>
        </div>
        <button>+Add New Warehouse</button>
      </div>

      {/* Mobile view set up */}
      <div className="warehouse__list--mobile">
        {listData.map((warehouse) => {


          return (
            <div className="warehouse__grid--mobile">
              <div className="warehouse__list--item">
                <div className="warehouse__info--wrap">
                  <div>
                    <h4>Warehouse</h4>
                    <Link to="/"><p>{warehouse.warehouse_name}<img src={forwardArrow} alt="forward arrow" /></p></Link>

                    <h4>Address</h4>
                    <p className="address">{warehouse.address}</p>
                    <p>{warehouse.city}, {warehouse.country}</p>

                  </div>

                  <div>
                    <h4>Contact Name</h4>
                    <p>{warehouse.contact_name}</p>

                    <h4>Contact Information</h4>
                    <p>{warehouse.contact_phone}</p>

                    <a href={`mailto: ${warehouse.contact_email}`}>
                      {warehouse.contact_email}
                    </a>

                  </div>
                </div>
                <div className="button__wrap">
                  <img src={deleteIcon} alt="Delete Warehouse Button" />
                  <img src={editIcon} alt="Edit Warehouse Button" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Tablet/Desktop view setup */}
      <div className="warehouse__list--tabdesc">
        <div className="warehouse__grid--container">
          <div className="grid__header--wrap">
            <h4>Warehouse</h4>
            <h4>Contact Name</h4>
            <h4>Address</h4>
            <h4>Contact Information</h4>
            <h4>Actions</h4>
          </div>

          {/* Map function to generate cards based on server information */}
          {listData.map((warehouse) => {
            return (
              <div className="warehouse__list--item">
                
                <div>
                  <Link to="/"><p>{warehouse.warehouse_name}<img src={forwardArrow} alt="forward arrow" /></p></Link>
                </div>
                
                <div>
                  <p>{warehouse.contact_name}</p>
                </div>

                <div>
                  <p className="address">{warehouse.address}</p>
                  <p>{warehouse.city}, {warehouse.country}</p>
                </div>

                <div>
                  <p className="contact__phone">{warehouse.contact_phone}</p>
                  <a href={`mailto: ${warehouse.contact_email}`}>
                    {warehouse.contact_email}</a>
                </div>

                <div className="button__wrap">
                  <img src={deleteIcon} alt="Delete Warehouse Button" />
                  <img src={editIcon} alt="Edit Warehouse Button" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default WarehouseList;