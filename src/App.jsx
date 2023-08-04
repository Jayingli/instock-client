import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import WarehousesPage from './pages/WarehousesPage/WarehousesPage';
import InventoryPage from './pages/InventoryPage/InventoryPage';

// import WarehouseDetails from './components/WarehouseDetails/WarehouseDetails';
// import EditInventoryItem from './components/EditInventoryItem/EditInventoryItem';
import InventoryDetails from './components/InventoryDetails/InventoryDetails';

import './App.scss';

import AddNewInventoryItem from './components/AddNewInventoryItem/AddNewInventoryItem';
import Button from './components/Button/Button';
import SearchHeader from './components/SearchHeader/SearchHeader';
import SearchBar from './components/SearchBar/SearchBar';

/*
 * App.jsx
 * - Represents the main component of the application
 * - Contains header, footer and defines routes for different pages
 */

function App() {
    return (
        <BrowserRouter>
            <div className="App">
                {/* Header Component */}
                <Header />
                {/* <SearchHeader />
                <SearchBar /> */}

                {/* Define routes for different pages */}
                <div className="App__page">
                    <Routes>
                        {/* Home Page */}
                        <Route path="/" element={<Navigate to="/warehouses" />} />

                        {/* Warehouses Page */}
                        {/* <Route path="/warehouses" element={<WarehousesPage />} /> */}
                        <Route path="/warehouses" element={<AddNewInventoryItem  />} />

                        {/* Single Warehouse Page */}
                        {/* <Route path="/warehouses/:id" element={<WarehousesPage />} /> */}
                        {/* <Route path="/warehouses/:id" element={<WarehousesDetails />} /> */}

                        {/* Inventories of Individual Warehouse Page*/}
                        {/* <Route path="/warehouses/:id/inventories" element={<WarehousesPage />} /> */}

                        {/* Inventory Page */}
                        <Route path="/inventories" element={<InventoryPage />} />

                        {/* Single Inventory Page */}
                        {/* <Route path="/inventories/:id" element={<InventoryPage />} /> */}
                        <Route path="/inventories/:id" element={<InventoryDetails />} />

                        {/* Catch-all to redirect to Home Page */}
                        <Route path="*" element={<Navigate to="/" />} />
                    </Routes>
                </div>

                {/* Footer Component */}
                <Footer />
            </div>
        </BrowserRouter>
    );
}

export default App;