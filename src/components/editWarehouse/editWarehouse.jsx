import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import backArrow from "../../assets/icons/arrow_back-24px.svg";
import { useParams } from "react-router";
import "../editWarehouse/editWarehouse.scss";

function EditWarehouse() {
  const { id } = useParams();
  const [formData, setFormData] = useState({});

  useEffect(() => {
    const URL = `http://localhost:5050/api/warehouses/${id}`;
    axios.get(URL).then((res) => {
      const data = res.data;
      setFormData(data[0]);
    });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => {
      return { ...prevFormData, [name]: value };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);

    const URL = `http://localhost:5050/api/warehouses/${id}`;
    // const created = new Date().toISOString();
    // const updated = new Date().toISOString();
    // setFormData({ ...formData, updated_at: updated });
    axios
      .put(URL, formData)
      .then((res) => {
        console.log(res.data);
        console.log("Updated");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <section className="editInventoryItem">
      <div className="editHeader__div">
        <Link to="/inventories">
          <img src={backArrow} alt="Back Arrow" />
        </Link>
        <h1>Edit Warehouse Item</h1>
      </div>

      <form action="submit">
        <div className="form__wrap">
          <div className="details__wrap">
            <h2>W Details</h2>

            <label htmlFor="item__name">W Name</label>
            <input type="text" name="item_name" value={formData.item_name} />

            <label htmlFor="description">Street Address</label>
            <textarea
              name="description"
              id="description"
              value={formData.description}
            ></textarea>

            <label htmlFor="category">City</label>
            <div className="category">{formData.category}</div>

            <label htmlFor="category">Country</label>
            <div className="category">{formData.category}</div>
          </div>

          <div className="availability__wrap">
            <h2>Contact Details</h2>

            <div className="status__wrap">
              <label htmlFor="status">Contact Name</label>
              <div className="radio__wrap">
                <input type="text" name="status" />
              </div>
            </div>

            <label htmlFor="warehouse">Position</label>
            <div className="warehouse_name">{formData.warehouse_name}</div>
            <label htmlFor="warehouse">Phone Number</label>
            <div className="warehouse_name">{formData.warehouse_name}</div>
            <label htmlFor="warehouse">email</label>
            <div className="warehouse_name">{formData.warehouse_name}</div>
          </div>
        </div>

        <div className="button__wrap">
          <button className="cancel">Cancel</button>
          <button className="save">Save</button>
        </div>
      </form>
    </section>
  );
  //   return (
  //     <div>
  //       <h1>Edit Warehouse</h1>
  //       <form onSubmit={handleSubmit}>
  //         <div className="leftSide">
  //           <h2>Warehouse Details</h2>
  //           <div>
  //             <label htmlFor="warehouse_name">Warehouse Name</label>
  //             <input
  //               type="text"
  //               name="warehouse_name"
  //               value={formData.warehouse_name}
  //               onChange={handleChange}
  //             />
  //           </div>
  //           <div>
  //             <label htmlFor="address">Street Address</label>
  //             <input
  //               type="text"
  //               name="address"
  //               value={formData.address}
  //               onChange={handleChange}
  //             />
  //           </div>
  //           <div>
  //             <label htmlFor="city">City</label>
  //             <input
  //               type="text"
  //               name="city"
  //               value={formData.city}
  //               onChange={handleChange}
  //             />
  //           </div>
  //           <div>
  //             <label htmlFor="country">Country</label>
  //             <input
  //               type="text"
  //               name="country"
  //               value={formData.country}
  //               onChange={handleChange}
  //             />
  //           </div>
  //         </div>
  //         <div className="rightSide">
  //           <h2>Contact Details</h2>
  //           <div>
  //             <label htmlFor="contact_name">Contact Name</label>
  //             <input
  //               type="text"
  //               name="contact_name"
  //               value={formData.contact_name}
  //               onChange={handleChange}
  //             />
  //           </div>
  //           <div>
  //             <label htmlFor="contact_position">Position</label>
  //             <input
  //               type="text"
  //               name="contact_position"
  //               value={formData.contact_position}
  //               onChange={handleChange}
  //             />
  //           </div>
  //           <div>
  //             <label htmlFor="contact_phone">Phone Number</label>
  //             <input
  //               type="text"
  //               name="contact_phone"
  //               value={formData.contact_phone}
  //               onChange={handleChange}
  //             />
  //           </div>
  //           <div>
  //             <label htmlFor="contact_email">Email</label>
  //             <input
  //               type="text"
  //               name="contact_email"
  //               value={formData.contact_email}
  //               onChange={handleChange}
  //             />
  //           </div>
  //         </div>
  //         <Link to="/">
  //           <button>Cancel</button>
  //         </Link>
  //         <button type="submit">Save</button>
  //       </form>
  //     </div>
  //   );
}

export default EditWarehouse;
