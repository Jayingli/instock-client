import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import './App.scss';

/*
App.jsx
- Represents the main component of the application
- Contains header, footer and defines routes for different pages
*/

function App() {
    return (
        <BrowserRouter>
            <div className="App">
                {/* Header Component */}
                <Header />

                {/* Define routes for different pages */}
                <Routes>
                    {/* Home Page */}
                    {/* <Route path="/" element={<WarehousesPage />} /> */}

                    {/* Warehouses Page */}
                    {/* <Route path="/warehouses" element={<WarehousesPage />} /> */}

                    {/* Individual Warehouse Page */}
                    {/* <Route path="/warehouses/:id" element={<WarehousesPage />} /> */}

                    {/* Inventory Page */}
                    {/* <Route path="/inventory" element={<InventoryPage />} /> */}

                    {/* Individual Inventory Page */}
                    {/* <Route path="/inventory/:id" element={<InventoryPage />} /> */}

                    {/* Catch-all to redirect to Home Page */}
                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>

                {/* Footer Component */}
                <Footer />
            </div>
        </BrowserRouter>
    );
}

export default App;
