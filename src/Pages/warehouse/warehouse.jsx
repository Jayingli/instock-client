import WarehouseList from "../../components/warehouseList/warehouseList";
import '../warehouse/warehouse.scss';
import warehouseData from "../../Data/warehouseData.json";

//Warehouse Page

function Warehouse() {


    return (
        <section id="warehouse__main">
            <WarehouseList warehouseData={warehouseData}/>
        </section>
    )
}

export default Warehouse;