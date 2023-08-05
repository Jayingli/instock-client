import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import deleteIcon from "../../assets/icons/delete_outline-24px.svg";
import editIcon from "../../assets/icons/edit-24px.svg";
import forwardArrowIcon from "../../assets/icons/chevron_right-24px.svg";
import sortIcon from "../../assets/icons/sort-24px.svg";
import './InventoryList.scss';

/* 
 * Inventory List Component
 * - Represents the whole list of inventory
 * - Includes item name, category, status, quantity, warehouse
 * - Has delete & editing functions for the inventory items
 * - Has a search bar & add new item button
 */

function InventoryList() {
    //State
    const [listData, setListData] = useState([]);
    
    //GET request
    useEffect(() => {
        //GET array of all inventories
        const inventoriesURL = "http://localhost:5050/api/inventories";
        axios.get(inventoriesURL)
            .then((response) => {
                setListData(response.data);
            });
    }, []);

    return (
        <div className="inventory-list">
            <table className="inventory-list__table">
                <thead className="inventory-list__header">
                    <tr className="inventory-list__row">
                        <div className="inventory-list__column">
                            <th>
                                <div className="inventory-list__item">
                                    <h2 className="inventory-list__title">Inventory Item</h2>
                                    <img className="inventory-list__icon" src={sortIcon} alt="sort icon" />
                                </div>
                            </th>
                            <th>
                                <div className="inventory-list__category">
                                    <h2 className="inventory-list__title">Category</h2>
                                    <img className="inventory-list__icon" src={sortIcon} alt="sort icon" />
                                </div>
                            </th>
                        </div>
                        <div className="inventory-list__column">
                            <th>
                                <div className="inventory-list__status">
                                    <h2 className="inventory-list__title">Status</h2>
                                    <img className="inventory-list__icon" src={sortIcon} alt="sort icon" />
                                </div>
                            </th>
                            <th>
                                <div className="inventory-list__qty">
                                    <h2 className="inventory-list__title">QTY</h2>
                                    <img className="inventory-list__icon" src={sortIcon} alt="sort icon" />
                                </div>
                            </th>
                            <th>
                                <div className="inventory-list__warehouse">
                                    <h2 className="inventory-list__title">Warehouse</h2>
                                    <img className="inventory-list__icon" src={sortIcon} alt="sort icon" />
                                </div>
                            </th>
                            <th>
                                <div className="inventory-list__actions">
                                    <h2 className="inventory-list__title">Actions</h2>
                                </div>
                            </th>
                        </div>
                    </tr>
                </thead>
                <tbody>
                    {listData.map((item) => (
                        <tr className="inventory-list__row" key={item.id}>
                            <div className="inventory-list__container">
                            <div className="inventory-list__column">
                                <td className="inventory-list__data">
                                    <div className="inventory-list__item">
                                        <div className="inventory__div">
                                            <h2 className="inventory-list__title-mobile">Inventory Item</h2>
                                            <div className="inventory-list__name">
                                                <Link className="inventory-list__link" to={`/inventories/${item.id}`}>
                                                    <p className="inventory-list__paragraph">{item.item_name}</p><img className="inventory-list__link-icon" src={forwardArrowIcon} alt="forward arrow" />
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td className="inventory-list__data">
                                    <h2 className="inventory-list__title-mobile">Category</h2>
                                    <p className="inventory-list__paragraph">{item.category}</p>
                                </td>
                            </div>
                            <div className="inventory-list__column">
                                <td className="inventory-list__data">
                                    <h2 className="inventory-list__title-mobile">Status</h2>
                                    <div className={item.status === 'In Stock' ? 'inventory-list__in-stock' : 'inventory-list__out-of-stock'}>
                                        <p className="inventory-list__status">{item.status}</p>
                                    </div>
                                </td>
                                <td className="inventory-list__data">
                                    <h2 className="inventory-list__title-mobile">Quantity</h2>
                                    <p className="inventory-list__paragraph">{item.quantity}</p>
                                </td>
                                <td className="inventory-list__data">
                                    <h2 className="inventory-list__title-mobile">Warehouse</h2>
                                    <p className="inventory-list__paragraph">{item.warehouse_name}</p>
                                </td>
                            </div>
                            </div>
                                <td className="inventory-list__data">
                                    <div className="inventory-list__buttons">
                                        <img className="inventory-list__delete" src={deleteIcon} alt="Delete Inventory Button" />
                                        <Link to={`/inventories/${item.id}/edit`}>
                                            <img className="inventory-list__edit" src={editIcon} alt="Edit Inventory Button" />
                                        </Link>
                                    </div>
                                </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    

        // <div className="inventory__list">
        //     <div className="inventory__list--mobile">
        //         {listData.map((item) => {
        //         return (
        //             <div className="inventory__grid--mobile" key={item.id}>
        //                 <div className="inventory__grid--item">
        //                     <div className="item__info--wrap">
        //                         <div className="inventory__div">
        //                             <h4>Inventory Item</h4>
        //                             <div className="inventory__name">
        //                                 <Link to={`/inventories/${item.id}`}>
        //                                     <p>
        //                                     {item.item_name}
        //                                     <img src={forwardArrowIcon} alt="forward arrow" />
        //                                     </p>
        //                                 </Link>
        //                             </div>

        //                             <h4>Category</h4>
        //                             <p>{item.category}</p>
        //                         </div>
        //                     <div>

        //                     <h4>Status</h4>
        //                     <div className={item.status == 'In Stock' ? 'inStock' : 'outOfStock'}>
        //                         <p>{item.status}</p>
        //                     </div>

        //                     <h4>QTY</h4>
        //                     <p>{item.quantity}</p>

        //                     <h4>Warehouse</h4>
        //                     <p>{item.warehouse_name}</p>
        //                 </div>
        //             </div>

        //             <div className="button__wrap">
        //                 <img src={deleteIcon} alt="Delete Warehouse Button" />
        //                 <Link to={`/inventories/${item.id}/edit`}>
        //                     <img src={editIcon} alt="Edit Warehouse Button" />
        //                 </Link>
        //             </div>
        //             </div>
        //             </div>
        //         );
        //         })}
        //     </div>

        //     <div className="inventory__list--tabdesc">
        //         <div className="inventory__grid--container">
        //         <div className="grid__header--wrap">
        //             <div>
        //             <h4>Inventory Item</h4>
        //             <img src={sortIcon} alt="sort icon" />
        //             </div>

        //             <div>
        //             <h4>Category</h4>
        //             <img src={sortIcon} alt="sort icon" />
        //             </div>

        //             <div>
        //             <h4>Status</h4>
        //             <img src={sortIcon} alt="sort icon" />
        //             </div>

        //             <div>
        //             <h4>QTY</h4>
        //             <img src={sortIcon} alt="sort icon" />
        //             </div>

        //             <div>
        //             <h4>Warehouse</h4>
        //             <img src={sortIcon} alt="sort icon" />
        //             </div>

        //             <div>
        //             <h4>Actions</h4>
        //             </div>
        //         </div>

        //         {listData.map((item) => {
        //             return (
        //             <div className="inventory__grid--item" key={item.id}>
        //                 <div className="inventory__item">
        //                 <Link to={`/inventories/${item.id}`}>
        //                     <p>
        //                     {item.item_name}
        //                     <img src={forwardArrowIcon} alt="forward arrow" />
        //                     </p>
        //                 </Link>
        //                 </div>

        //                 <div>
        //                 <p>{item.category}</p>
        //                 </div>

        //                 <div className={item.status == 'In Stock' ? 'inStock' : 'outOfStock'}>
        //                 <p >{item.status}</p>
        //                 </div>

        //                 <div>
        //                 <p>{item.quantity}</p>
        //                 </div>

        //                 <div>
        //                 <p>{item.warehouse_name}</p>
        //                 </div>

        //                 <div className="button__wrap">
        //                 <img src={deleteIcon} alt="Delete Warehouse Button" />
        //                 <Link to={`/inventories/${item.id}/edit`}>
        //                     <img src={editIcon} alt="Edit Warehouse Button" />
        //                 </Link>
        //                 </div>
        //             </div>
        //             );
        //         })}
        //         </div>
        //     </div>
        // </div>
    );
}
  
export default InventoryList;