import React from 'react'
import '../styles/LayoutStyles.css'
import { adminMenu, userMenu } from '../Data/data'
import { Badge, message } from 'antd'
import { Link,useLocation, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Layout = ({children}) => {
  const {user} = useSelector(state => state.user)
  const location = useLocation()
  const navigate = useNavigate()

  const handleLogout=()=>{
    localStorage.clear();
    message.success('Logout Successfully')
    navigate('/login');
  }

  const doctorMenu =[
    {
        name:'Home',
        path: '/home',
        icon: 'fa-solid fa-house'
    },
    {
        name: 'Appointments',
        path: '/doctor-appointments',
        icon: 'fa-solid fa-list'
    },
    {
        name: 'Pescription',
        path: '/postpescription',
        icon: 'fa-solid fa-prescription-bottle-medical'
    },
    {
        name: 'Profile',
        path: `/doctor/profile/${user?.id}`,
        icon: 'fa-solid fa-address-card'
    }
  ]

  //Menu List
  const SidebarMenu = user?.isAdmin ? adminMenu : user?.isDoctor?doctorMenu:userMenu;
  return (
    <>
      <div className="main">
        <div className="header">
          <div className="logo">
            <h5>
              <i class="fa-solid fa-mortar-pestle"></i> MASURAH
            </h5>
          </div>
          <div className="user-profile" style={{ display: 'flex', alignItems: 'center' }}>
            <Badge
              size="medium"
              count={user && user.notification.length}
              style={{ cursor: "pointer" }}
              onClick={() => {
                navigate("/notification");
              }}
            >
              <i className="fa-regular fa-bell" style={{ fontSize: '16px' }} />
            </Badge>
            <Link to="/profile" style={{ color: 'antiquewhite', marginLeft: '10px' }}>{user?.name}</Link>
          </div>
        </div>
  <div className="layout">
    <div className="sidebar">
        {/* <div className="user-profile">
          <Badge
            size="medium"
            count={user && user.notification.length}
            style={{ cursor: "pointer" }}
            onClick={() => {
              navigate("/notification");
            }}
          >
            <i className="fa-regular fa-bell" style={{ fontSize: '16px' }} />
          </Badge>
          <Link Link to="/profile">{user?.name}</Link>
          <div className="menu-item" onClick={handleLogout}>
            <i className="fa-solid fa-right-from-bracket" />
            <Link to="/login">Log Out</Link>
          </div>
        </div> */}
      <div className="menu">
        {SidebarMenu.map((menu) => {
          const isActive = location.pathname === menu.path;
          return (
            <React.Fragment key={menu.name}>
              <div className={`menu-item ${isActive && "active"}`}>
                <i className={menu.icon}></i>
                <Link to={menu.path}>{menu.name}</Link>
              </div>
            </React.Fragment>
          );
        })}
        <div className="menu-item" onClick={handleLogout}>
        <i className="fa-solid fa-right-from-bracket" />
        <Link to="/login">Log Out</Link>
      </div>
      </div>
    </div>
    <div className="content">{children}</div>
  </div>
</div>;

    </>
  )
}

export default Layout