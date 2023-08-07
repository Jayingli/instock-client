import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import deleteIcon from "../../assets/icons/delete_outline-24px.svg";
import editIcon from "../../assets/icons/edit-24px.svg";
import forwardArrowIcon from "../../assets/icons/chevron_right-24px.svg";
import sortIcon from "../../assets/icons/sort-24px.svg";
import "./WarehouseList.scss";

/* 
 * Warehouse List Component
 * - Represents the whole list of warehouses
 * - Includes warehouse name, address, contact name, contact info
 * - Has delete & editing functions for the each warehouse
 */

function WarehouseList() {
    //State
    const [listData, setListData] = useState([]);

    //Query States
    const [sortBy, setSortBy] = useState("");
    const [orderBy, setOrderBy] = useState("");

    //GET request
    useEffect(() => {
        //GET array of all warehouses
        const warehousesURL = "http://localhost:5050/api/warehouses";
        axios.get(`${warehousesURL}?sort_by=${sortBy}&order_by=${orderBy}`)
          .then((response) => {
            setListData(response.data);
          });
    }, [sortBy, orderBy]);

    //Query change handler
    const orderByToggle = () => {
        if (orderBy === "asc") {
            setOrderBy("desc");
        } else {
            setOrderBy("asc");
        }
    };

    const sortHandlerWarehouse = () => {
        orderByToggle();
        setSortBy("warehouse_name");
    };
    
    const sortHandlerContactName = () => {
        orderByToggle();
        setSortBy("contact_name");
    };
    
    const sortHandlerAddress = () => {
        orderByToggle();
        setSortBy("address");
    };
    
    const sortHandlerContactInfo = () => {
        orderByToggle();
        setSortBy("contact_email");
    };

    return (
        <div className="warehouse-list">
            <table className="warehouse-list__table">
                <thead className="warehouse-list__header">
                    <tr className="warehouse-list__row-header">
                        <th>
                            <div className="warehouse-list__column-header">
                                <h2 className="warehouse-list__title">Warehouse</h2>
                                <img className="warehouse-list__icon" src={sortIcon} alt="sort icon" onClick={sortHandlerWarehouse}/>
                            </div>
                        </th>
                        <th>
                            <div className="warehouse-list__column-header">
                                <h2 className="warehouse-list__title">Address</h2>
                                <img className="warehouse-list__icon" src={sortIcon} alt="sort icon" onClick={sortHandlerContactName}/>
                            </div>
                        </th>
                        <th>
                            <div className="warehouse-list__column-header">
                                <h2 className="warehouse-list__title">Contact Name</h2>
                                <img className="warehouse-list__icon" src={sortIcon} alt="sort icon" onClick={sortHandlerAddress}/>
                            </div>
                        </th>
                        <th>
                            <div className="warehouse-list__column-header">
                                <h2 className="warehouse-list__title">Contact Information</h2>
                                <img className="warehouse-list__icon" src={sortIcon} alt="sort icon" onClick={sortHandlerContactInfo}/>
                            </div>
                        </th>
                        <th>
                            <div className="warehouse-list__column-header">
                                <h2 className="warehouse-list__title">Actions</h2>
                            </div>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {listData.map((warehouse) => (
                        <tr className="warehouse-list__row-body" key={warehouse.id}>
                            <div className="warehouse-list__content">
                                <div className="warehouse-list__column-body">
                                    <td className="warehouse-list__data">
                                        <h2 className="warehouse-list__title-mobile">Warehouse</h2>
                                        <div>
                                            <Link className="warehouse-list__link" to={`/warehouses/${warehouse.id}`}>
                                                <p className="warehouse-list__name">{warehouse.warehouse_name}</p>
                                                <img
                                                    className="warehouse-list__link-icon"
                                                    src={forwardArrowIcon}
                                                    alt="Foward Arrow Icon"
                                                />
                                            </Link>
                                        </div>
                                    </td>
                                    <td className="warehouse-list__data">
                                        <h2 className="warehouse-list__title-mobile">Address</h2>
                                        <p className="warehouse-list__address">{warehouse.address}<br />
                                            {warehouse.city}, {warehouse.country}
                                        </p>
                                    </td>
                                </div>
                                <div className="warehouse-list__column-body">
                                    <td className="warehouse-list__data">
                                        <h2 className="warehouse-list__title-mobile">Contact Name</h2>
                                        <p className="warehouse-list__contact-name">{warehouse.contact_name}</p>
                                    </td>
                                    <td className="warehouse-list__data">
                                        <h2 className="warehouse-list__title-mobile">Contact Information</h2>
                                        <p className="warehouse-list__contact-info">{warehouse.contact_phone}<br />
                                            <a className="warehouse-list__email" href={`mailto: ${warehouse.contact_email}`}>
                                            {warehouse.contact_email}</a>
                                        </p>
                                    </td>
                                </div>
                            </div>
                            <div>
                                <td className="warehouse-list__action-icons">
                                    <div className="warehouse-list__buttons">
                                        <img className="warehouse-list__delete" src={deleteIcon} alt="Delete Warehouse Button" />
                                        <Link to={`/warehouses/${warehouse.id}/edit`}>
                                            <img className="warehouse-list__edit" src={editIcon} alt="Edit Warehouse Button" />
                                        </Link>
                                    </div>
                                </td>
                            </div>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default WarehouseList;