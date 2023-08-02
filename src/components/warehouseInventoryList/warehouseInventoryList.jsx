import { useParams } from "react-router";
import "../warehouseInventoryList/warehouseInventoryList.scss";

//Warehouse Inventory List Component

function WarehouseInventoryList() {
  const { id } = useParams();
  console.log(id);
  return (
    <div>
      <div>
        <p></p>
      </div>
    </div>
  );
}

export default WarehouseInventoryList;
