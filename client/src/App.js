import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Register from './pages/Register';
import Login from './pages/Login';
import { useSelector } from 'react-redux';
import Spinner from './components/Spinner';
import ProtectedRoute from './components/ProtectedRoute';
import PublicRoute from './components/PublicRoute';


import ApplyDoctor from './pages/ApplyDoctor';


import NotificationPage from './pages/NotificationPage';

import EditItem from './pages/admin/EditItem';

import Users from './pages/admin/Users';
import Doctors from './pages/admin/Doctors';
import Profile from './pages/doctor/Profile';
import BookingPage from './pages/BookingPage';
import Appointments from './pages/Appointments';
import DoctorAppointments from './pages/doctor/DoctorAppointments';
import ProfileUser from './pages/ProfileUser';
import Medicene from './pages/Medicene';
import MediceneBuyingPage from './pages/MediceneBuyingPage';
// Admin Side all orders list
import Orders from './pages/Orders';
// User Side Cart
import Cart from './pages/Cart'

import Allorders from './pages/admin/Allorders';



import Postpescription from './pages/doctor/Postpescription';
import Pescription from './pages/doctor/Pescription';
import UserPescription from './pages/UserPescription';
import AddCategory from './pages/admin/AddCategory';
import AddItem from './pages/admin/AddItem';
import Inventory from './pages/admin/Inventory';
//importing Item sorted by category
import ItemCatWise from './pages/ItemCatWise';
import AllItems from './pages/AllItems';
import OrderItem from './pages/OrderItem';
import Stats from './pages/admin/Stats';


function App() {
    const {loading} = useSelector(state => state.alerts)
  return (
    <>
      <BrowserRouter>
        {loading?
          (<Spinner />):
          (<Routes>
            <Route path='/' element={
              <ProtectedRoute>
                <HomePage/>
              </ProtectedRoute>
            } />
            <Route path='/home' element={
              <ProtectedRoute>
                <HomePage/>
              </ProtectedRoute>
            } />
            
            <Route path='/apply-doctor' element={
              <ProtectedRoute>
                <ApplyDoctor />
              </ProtectedRoute>
            } />
            <Route path='/notification' element={
              <ProtectedRoute>
                <NotificationPage/>
              </ProtectedRoute>
            } />
            <Route path='/admin/users' element={
              <ProtectedRoute>
                  <Users />
              </ProtectedRoute>
            } />
            <Route path='/admin/doctors' element={
              <ProtectedRoute>
                <Doctors />
              </ProtectedRoute>
            } />
            <Route path='/doctor/profile/:id' element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } />
            <Route path='/doctor/book-appointment/:id' element={
              <ProtectedRoute>
                <BookingPage />
              </ProtectedRoute>
            } />
            <Route path='/appointments' element={
              <ProtectedRoute>
                <Appointments/>
              </ProtectedRoute>
            } />
            <Route path='/doctor-appointments' element={
              <ProtectedRoute>
                <DoctorAppointments/>
              </ProtectedRoute>
            } />
            <Route path='/profile' element={
              <ProtectedRoute>
                <ProfileUser/>
              </ProtectedRoute>
            } />


            {/* //Adding Category */}
            <Route path='/admin/AddCategory' element={
              <ProtectedRoute>
                <AddCategory/>
              </ProtectedRoute>
            } />

            {/* //Adding Item */}
            <Route path='/admin/AddItem' element={
              <ProtectedRoute>
                <AddItem/>
              </ProtectedRoute>
            } />




            <Route path='/doctor/book-appointment/:id' element={
              <ProtectedRoute>
                <BookingPage />
              </ProtectedRoute>
            } />



            {/* Admin side get Items to a certain Catregory */}

            <Route path='/admin/itemlist/:category' element={
              <ProtectedRoute>
                <ItemCatWise />
              </ProtectedRoute>
            } />

            {/* Edit Item Id Wise */}
            <Route path='/admin/editItem/:id' element={
              <ProtectedRoute>
                <EditItem />
              </ProtectedRoute>
            } />

            <Route path='/medicene' element={
              <ProtectedRoute>
                <Medicene />
              </ProtectedRoute>
            } />


            <Route path='/inventory' element={
              <ProtectedRoute>
                  <Inventory />
              </ProtectedRoute>
            } />

            {/* Cart List for user side*/}
            <Route path='/Cart' element={
              <ProtectedRoute>
                {/* <AccessRoute> */}
                  <Cart/>
                {/* </AccessRoute> */}
                
              </ProtectedRoute>
            } />

            {/* orders list for admin side */}
            <Route path='/orders' element={
              <ProtectedRoute>
                <Orders/>
              </ProtectedRoute>
            } />

            {/* All Items List user side */}
            <Route path='/items' element={
              <ProtectedRoute>
                {/* <AccessRoute> */}
                  <AllItems/>
                {/* </AccessRoute> */}
              </ProtectedRoute>
            } />


            {/* Add Item to Cart */}
            <Route path='/orderItem/:id' element={
              <ProtectedRoute>
                {/* <AccessRoute> */}
                  <OrderItem />
                {/* </AccessRoute> */}
              </ProtectedRoute>
            } />

            {/* Admin Side Stats */}
            <Route path='/admin/stats' element={
              <ProtectedRoute>
                <Stats />
              </ProtectedRoute>
            } />


            <Route path='/meds/buy_meds/:id' element={
              <ProtectedRoute>
                <MediceneBuyingPage />
              </ProtectedRoute>
            } />
            <Route path='/allorders' element={
              <ProtectedRoute>
                <Allorders />
              </ProtectedRoute>
            } />
            <Route path='/postpescription' element={
              <ProtectedRoute>
                <Postpescription/>
              </ProtectedRoute>
            } />
            <Route path='/doctor/postpescription/pescription/:id' element={
              <ProtectedRoute>
                <Pescription />
              </ProtectedRoute>
            } />
            <Route path='/pescriptions' element={
              <ProtectedRoute>
                <UserPescription/>
              </ProtectedRoute>
            } />
            <Route path='/login' element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            } />
            <Route path='/register' element={
              <PublicRoute>
                <Register />
              </PublicRoute>
            } />
          </Routes>)
        }
      </BrowserRouter>
    </>
  );
}

export default App;
