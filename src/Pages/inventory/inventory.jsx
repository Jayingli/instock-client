import "../inventory/inventory.scss";
import InventoryList from "../../components/inventoryList/inventoryList";
// import DeleteItem from "../../components/deleteItem/deleteItem";

//Inventory Page

function Inventory() {

    // function showComponent() {
    //     // const component = <DeleteItem />;

    //     // if (component.style.display === 'none') {
    //     //     component.style.display ='flex';
    //     // } else 

    //     component.style.display == 'none' ? component.style.display = 'flex' : component.style.display = 'none'
    // }

    return (
        <section id="inventory">
            <InventoryList />
            {/* <DeleteItem 
            obj="television"
            page="inventory"
            /> */}
        </section>
    )
}

export default Inventory;