import logo from './logo.svg';
import './App.css';
import WarehouseList from './components/warehouseList/warehouseList';
import WarehouseDetails from './components/warehouseDetails/warehouseDetails';
import Inventory from './Pages/inventory/inventory';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/* <WarehouseList /> */}
        {/* <WarehouseDetails /> */}
        <Inventory />

        {/* <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a> */}
      </header>

      
    </div>
  );
}

export default App;
