import { Route, Routes } from "react-router-dom";
import Home from "./components/pages/Home";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import PriveteRoutes from "./components/user/PrivetRoutes";
import UserDashboard from './components/user/UserDashboard';
import Profile from "./components/user/Profile";
import Update from "./components/user/Update";
 
import Alldata from "./components/pages/StudentList";
import SingleProfile from "./components/pages/SingleProfile";
import AdminRoutes from "./components/admin/AdminRoutes";
import Dashboard from "./components/admin/Dashboard";
import AdminProfile from "./components/admin/adminProfile";
import AdminUpdate from "./components/admin/AdminUpdate";
import CreateGalary from "./components/admin/CreateGalary";
import Galary from "./components/pages/Galary";
import Carosel from "./components/admin/Carosel";
import SendEmail from './components/admin/SendEmail';
 
 
 

function App() {
  return (
    <>
 
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/galary" element={<Galary />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/studentList" element={<Alldata />} />
        <Route path="/profile/:id" element={<SingleProfile />} />

        {/* Admin Routes */}
        <Route path="/dashboard" element={<AdminRoutes />}>
          <Route path="admin" element={< Dashboard/>} /> {/* Default child */}
          <Route path="admin/profile" element={< AdminProfile />} />
          <Route path="admin/update-profile/:id" element={<AdminUpdate />} />
          <Route path="admin/create-gallery" element={<CreateGalary />} />
          <Route path="admin/create-carousel" element={<Carosel />} />
          <Route path="admin/sendemail" element={<SendEmail />} />
        </Route>
        {/* Private Routes */}
        <Route path="/dashboard" element={<PriveteRoutes />}>
          <Route path="user" element={< UserDashboard/>} /> {/* Default child */}
          <Route path="user/profile" element={<Profile />} />
          <Route path="user/update-profile/:id" element={<Update />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
