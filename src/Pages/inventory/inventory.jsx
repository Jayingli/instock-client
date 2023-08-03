import "../inventory/inventory.scss";
import InventoryList from "../../components/inventoryList/inventoryList";
// import DeleteItem from "../../components/deleteItem/deleteItem";

//Inventory Page

function Inventory() {

    return (
        <section id="inventory">
            <InventoryList />
            {/* <DeleteItem /> */}
        </section>
    )
}

export default Inventory;