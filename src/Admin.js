import React, { useState } from 'react';
import axios from 'axios';
import './Admin.css'; // Import the CSS file for styling

const Admin = () => {
  const [users, setUsers] = useState([]);
  const [displayUsers, setDisplayUsers] = useState(false); // State to control user display
  const [userType, setUserType] = useState('');
  const [orders, setOrders] = useState([]);
  const [orderId, setOrderId] = useState('');
  const [deliveryStatus, setDeliveryStatus] = useState('');
  const [updateOrderView, setUpdateOrderView] = useState(false);
  const [deleteView, setdeleteView] = useState(false);
  const [idView, setidView] = useState(false);
  const [MenuView, setMenuView] = useState(false);

  const [restaurants, setrestaurants] = useState([]);
  const [restaurantId, setRestaurantId] = useState('');
  const [deleteRestaurantId, setDeleteRestaurantId] = useState('');
  const [displayRestaurants, setDisplayRestaurants] = useState(false);
  const [displaymenu, setdisplaymenu] = useState(false);
  const [menu, setMenu] = useState(null); // State to store the menu data

  const [error, setError] = useState(null); // State to store error, if any
  const Viewmenu = async () => {
   
    
     
    try {
      const response = await fetch('http://localhost:3000/menus');
      if (response.ok) {
        const menuData = await response.json();
        setMenu(menuData); // Set menu data in state
        console.log("this is the menu data of all resturants",menuData);
        setdisplaymenu(true);
        setDisplayRestaurants(false);
      setDisplayUsers(false);  
      setOrders([]); 
      setUpdateOrderView(false);
      setidView(false);
      setMenuView(false);


      } else {
        const errorData = await response.json();
        setError(errorData.message); // Set error message in state
      }
    } catch (error) {
      setError('Error fetching menu'); // Set error message in state for network errors
    }
  };


  const handleViewMenu = async () => {
    // Replace with the actual restaurant ID
    try {
      const response = await fetch(`http://localhost:3000/res/${restaurantId}/menu`);
      if (response.ok) {
        const menuData = await response.json();
        setMenu(menuData);
        setdisplaymenu(true);  
        setDisplayRestaurants(false);
      setDisplayUsers(false);  
      setOrders([]); 
      setUpdateOrderView(false);
      setidView(false);
      setMenuView(false);

      } else {
        const errorData = await response.json();
        setError(errorData.message); // Set error message in state
      }
    } catch (error) {
      setError('Error fetching menu'); // Set error message in state for network errors
    }
  };

  const fetchAllRestaurants = async () => {
    try {
      const response = await axios.get('http://localhost:3000/res');
      setrestaurants(response.data);
      //console.log("here is the restaurants which we got  " + restaurants);
      setDisplayRestaurants(true);
      setDisplayUsers(false); // Display users when fetched
       
      setOrders([]); // Clear orders when fetching users
      setUpdateOrderView(false);
      setidView(false);
      setdeleteView(false); 
      setMenuView(false);
      setMenu([]);
      setdisplaymenu(false);
       
    } catch (error) {
      console.error('Error fetching restaurants:', error);
    }
  };

  const fetchRestaurantById = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/res/${restaurantId}`);
      console.log(response.data); // Do something with the data
      setrestaurants([response.data]); // Wrap the single object in an array

      console.log("here is the restaurants which we got ", restaurants);

      setDisplayRestaurants(true);
      setUpdateOrderView(false);
      setdeleteView(false);
      setMenuView(false);
      setMenu([]);
      setdisplaymenu(false);
      setidView(false);
     
     

    } catch (error) {
      console.error('Error fetching restaurant by ID:', error);
    }
  };

  const deleteRestaurant = async () => {
    try {
      
      setDisplayRestaurants(false);
      const response = await axios.delete(`http://localhost:3000/res/${deleteRestaurantId}`);
       
      setDisplayUsers(false); // Display users when fetched
      setOrders([]); // Clear orders when fetching users
      setUpdateOrderView(false);
      setidView(false);
      setMenuView(false);
      setMenu([]);
      setdisplaymenu(false);

      alert("Restaurant Deleted Successfully");
    } catch (error) {
      console.error('Error deleting restaurant:', error);
    }
  };

  const fetchOrders = async () => {
    try {
      const response = await axios.get('http://localhost:3000/order');
      setOrders(response.data);
      setDisplayUsers(false);
      setUpdateOrderView(false); 
      setDisplayRestaurants(false);
      setMenuView(false);
      setMenu([]);
      setdisplaymenu(false);
      
      
      // Clear update order view on fetching orders
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const updateOrder = async () => {
    try {
      await axios.put(`http://localhost:3000/order/${orderId}`, { status: deliveryStatus });
      setUpdateOrderView(false);
      setOrders([]); 
      clearDisplay(); 
      alert("Order has been updated succussfully");
      fetchOrders();
      setMenuView(false);
      setMenu([]);
      setdisplaymenu(false);

    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };

  const fetchUsers = async (type) => {
    try {
      const response = await axios.get(`http://localhost:3000/users/${type}`);
      setUsers(response.data);
      setDisplayUsers(true); // Display users when fetched
      setUserType(type); // Set user type for dynamic header
      setOrders([]); // Clear orders when fetching users
      setUpdateOrderView(false);
      setidView(false);
      setdeleteView(false); 
      setDisplayRestaurants(false);
      setMenuView(false);
      setMenu([]);
      setdisplaymenu(false);
      
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };
  const updateState = () => {
    setDisplayRestaurants(false);
    
    setidView(true);
    setdeleteView(false);
    setMenuView(false);
    setMenu([]);
    setDisplayUsers(false); // Display users when fetched
      // Set user type for dynamic header
    setOrders([]); // Clear orders when fetching users
    setUpdateOrderView(false);
     
    
    setdeleteView(false); 
    setdisplaymenu(false);
    
  };
  const updateState2 = () => {
     
    setidView(false);
    setDisplayRestaurants(false);
    
    setdeleteView(true);
    setMenuView(false);
    setMenu([]);
    setDisplayUsers(false);
    setdisplaymenu(false);  
  
    setOrders([]);  
    setUpdateOrderView(false);
    setidView(false);
    setdisplaymenu(false);
   
    
    setMenuView(false);
    setMenu([]);
  };
  const updateState3 = () => {
     
    setMenuView(true)
    setidView(false);
    setDisplayRestaurants(true);
    setdeleteView(false);
    
    setMenu([]);
    setDisplayUsers(false);
    setdisplaymenu(false);  
  
    setOrders([]);  
    setUpdateOrderView(false);
    setidView(false);
    setdisplaymenu(false);
   
    
    
    setMenu([]);
  };

  const clearDisplay = () => {
    setDisplayUsers(false);
    setdisplaymenu(false);
    setOrders([]); // Clear orders on other button click
    setMenu([]);
    
  };

  return (
    <div className="admin-container">
      <nav className="navbar">
        <div className="brand">Admin Panel</div>
        <div className="button-container">
          <div className="dropdown">
            <button className="admin-button">View Users</button>
            <div className="dropdown-content">
              <button className="admin-button dropdown-item" onClick={() => fetchUsers('all')}>View All Users</button>
              <button className="admin-button dropdown-item" onClick={() => fetchUsers('customer')}>View Customers</button>
              <button className="admin-button dropdown-item" onClick={() => fetchUsers('owner')}>View Restaurant Owners</button>
              <button className="admin-button dropdown-item" onClick={() => fetchUsers('rider')}>View Riders</button>
            </div>
          </div>
           
         
      
        <div className="dropdown">
          <button className="admin-button">Manage Restaurants</button>
          <div className="dropdown-content">
            <button className="admin-button dropdown-item" onClick={fetchAllRestaurants}>
              Get All Restaurants
            </button>
            <button className="admin-button dropdown-item" onClick={updateState }>
              Get Restaurant by ID
            </button>
            <div>
              
              <button className="admin-button" onClick={updateState2 }> Delete Restaurant </button>
            </div>
          </div>
          </div>
          <div className="dropdown">
            <button className="admin-button">Manage Orders</button>
            <div className="dropdown-content">
              <button className="admin-button dropdown-item" onClick={fetchOrders}>Get All Orders</button>
              <button className="admin-button dropdown-item" onClick={() => setUpdateOrderView(true)}>Update Order Status</button>
            </div>
          </div>
          <div className="dropdown">
            <button className="admin-button">View Menu</button>
            <div className="dropdown-content">
              <button className="admin-button dropdown-item" onClick={Viewmenu}>View Menu of All</button>
              <button className="admin-button dropdown-item" onClick={updateState3}>View Menu of particular resturnat</button>
            </div>
          </div>

          
         
        </div>
      </nav>
      {displaymenu && (
  <div>
    <ul>
      <h1>Menu</h1>
      {Array.isArray(menu) ? (
        // For multiple restaurants
        menu.map((restaurantMenu, index) => (
          <div key={index}>
             
            <ul>
              {Array.isArray(restaurantMenu) ? (
                restaurantMenu.map((menuItem, itemIndex) => (
                  <li key={itemIndex}>
                    {menuItem.name}: ${menuItem.price}
                  </li>
                ))
              ) : (
                <li>
                  {restaurantMenu.name}: ${restaurantMenu.price}
                </li>
              )}
            </ul>
          </div>
        ))
      ) : (
        // For a single restaurant
        <ul>
          {menu.map((menuItem, index) => (
            <li key={index}>
              {menuItem.name}: ${menuItem.price}
            </li>
          ))}
        </ul>
      )}
    </ul>
  </div>
)}



      {displayRestaurants && (
  <div className="restaurants-list">
    <h2>All Restaurants</h2>
    <table className="restaurant-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Location</th>
          <th>Contact</th>
          <th>Ratings</th>
          {/* Add more table headers as needed */}
        </tr>
      </thead>
      <tbody>
        {restaurants.map((restaurant) => (
          <tr key={restaurant._id}>
            <td>{restaurant._id}</td>
            <td>{restaurant.name}</td>
            <td>{restaurant.location}</td>
            <td>{restaurant.contact}</td>
            <td>{restaurant.ratings}</td>
            {/* Add more table cells for additional restaurant data */}
          </tr>
        ))}
      </tbody>

    </table>
  </div>
)}












       


      {/* Display orders */}
      {!displayUsers && orders.length > 0 && (
      <div className="orders-list">
        <h2>All Orders</h2>
        <div className="order-table-container">
          <table className="order-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    )}

      
{updateOrderView && (
  <div className="update-order">
    <label>Enter Order ID:</label>
    <input type="text" value={orderId} onChange={(e) => setOrderId(e.target.value)} />
    <label>Enter Delivery Status:</label>
    <input type="text" value={deliveryStatus} onChange={(e) => setDeliveryStatus(e.target.value)} />
    <div className="button-container">
      <button onClick={updateOrder}>Update Status</button>
    </div>
  </div>
)}



{idView && (
  
  <div className="update-order">
   <label>Enter Restaurant ID to get Restaurant:</label>
              <input
                type="text"
                value={restaurantId}
                onChange={(e) => setRestaurantId(e.target.value)}
              />
     
     
    <div className="button-container">
      <button onClick={fetchRestaurantById}>Enter</button>
    </div>
  </div>
)}
{deleteView && (
  <div className="update-order">
     
  
   <label>Enter Restaurant ID to Delete:</label>
              <input
                type="text"
                value={deleteRestaurantId}
                onChange={(e) => setDeleteRestaurantId(e.target.value)}
              />
     
     
    <div className="button-container">
      <button onClick={deleteRestaurant}>Delete</button>
    </div>
  </div>
)}
{MenuView && (
  
  <div className="update-order">
   <label>Enter Restaurant ID to get Menu:</label>
              <input
                type="text"
                value={restaurantId}
                onChange={(e) => setRestaurantId(e.target.value)}
              />
     
     
    <div className="button-container">
      <button onClick={handleViewMenu}>Enter</button>
    </div>
  </div>
)}

      {/* Display users */}
      {displayUsers && (
        <div className="users-list">
          <h2 className="user-header">{userType === 'all' ? 'Users' : userType === 'customer' ? 'All customers' : userType === 'owner' ? 'Restaurant Owners' : 'Riders'}</h2>
          <table className="user-table">
            <thead>
              <tr>
                <th>Username</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Admin;
