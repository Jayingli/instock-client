import WarehouseList from "../../components/warehouseList/warehouseList";
import "../warehouse/warehouse.scss";
import warehouseData from "../../Data/warehouseData.json";

//Warehouse Page

function Warehouse() {
  return (
    <section id="warehouse__main">
      <div className="warehouse__list">
        <WarehouseList warehouseData={warehouseData} />
      </div>
    </section>
  );
}

export default Warehouse;
