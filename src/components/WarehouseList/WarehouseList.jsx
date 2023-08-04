import { Link } from "react-router-dom";
import Warehouse from "../../Pages/warehouse/warehouse";

import "../../styles/partials/_global.scss";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import searchIcon from "../../assets/icons/search-24px.svg";
import forwardArrow from "../../assets/icons/chevron_right-24px.svg";
import deleteIcon from "../../assets/icons/delete_outline-24px.svg";
import editIcon from "../../assets/icons/edit-24px.svg";
import sortIcon from "../../assets/icons/sort-24px.svg";
import SearchHeader from '../SearchHeader/SearchHeader';
import "./WarehouseList.scss";

/* 
 * Warehouse List Component
 * 
 */

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
      <SearchHeader 
        obj='warehouse'
        page='Warehouses'
      />

      {/* Mobile view set up */}
      <div className="warehouse__list--mobile">
        {listData.map((warehouse) => {
          return (
            <div className="warehouse__grid--mobile" key={warehouse.id}>
              <div className="warehouse__list--item">
                <div className="warehouse__info--wrap">
                  <div className="warehouse__div">
                    <h4>Warehouse</h4>
                    <div className="warehouse__name">
                      <Link to={`/warehouses/${warehouse.id}`}>
                        <p>
                          {warehouse.warehouse_name}
                          <img src={forwardArrow} alt="forward arrow" />
                        </p>
                      </Link>
                    </div>

                    <h4>Address</h4>
                    <p className="address">{warehouse.address}</p>
                    <p>
                      {warehouse.city}, {warehouse.country}
                    </p>
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
            <div>
              <h4>Warehouse</h4>
              <img src={sortIcon} alt="" />
            </div>

            <div>
              <h4>Contact Name</h4>
              <img src={sortIcon} alt="" />
            </div>

            <div>
              <h4>Address</h4>
              <img src={sortIcon} alt="" />
            </div>

            <div>
              <h4>Contact Information</h4>
              <img src={sortIcon} alt="" />
            </div>

            <div>
              <h4>Actions</h4>
            </div>
          </div>

          {/* Map function to generate cards based on server information */}
          {listData.map((warehouse) => {
            return (
              <div className="warehouse__list--item" key={warehouse.id}>
                <div>
                  <Link to={`/warehouses/${warehouse.id}`}>
                    <p>
                      {warehouse.warehouse_name}
                      <img
                        className="forward__arrow"
                        src={forwardArrow}
                        alt="forward arrow"
                      />
                    </p>
                  </Link>
                </div>

                <div>
                  <p className="address">{warehouse.address}</p>
                  <p>
                    {warehouse.city}, {warehouse.country}
                  </p>
                </div>

                <div>
                  <p>{warehouse.contact_name}</p>
                </div>

                <div>
                  <p className="contact__phone">{warehouse.contact_phone}</p>
                  <a href={`mailto: ${warehouse.contact_email}`}>
                    {warehouse.contact_email}
                  </a>
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