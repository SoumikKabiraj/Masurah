import React from 'react'
import '../styles/LayoutStyles.css'
import '../styles/LayoutStyles2.css'
import { adminMenu, userMenu } from '../Data/data'
import { Badge, message } from 'antd'
import { Link,useLocation, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Card } from 'antd';


const Dash = () => {
    const {user} = useSelector(state => state.user)
  const location = useLocation()
  const navigate = useNavigate()

  const handleLogout=()=>{
    localStorage.clear();
    message.success('Logout Successfully')
    navigate('/login');
  }

  
  // const doctorMenu =[
  //   {
  //       name:'Dashboard',
  //       path: '/',
  //       icon: 'fa-solid fa-tachograph-digital'
  //   },
  //   {
  //       name:'Home',
  //       path: '/home',
  //       icon: 'fa-solid fa-house'
  //   },
  //   {
  //       name: 'Appointments',
  //       path: '/doctor-appointments',
  //       icon: 'fa-solid fa-list'
  //   },
  //   {
  //       name: 'Pescription',
  //       path: '/postpescription',
  //       icon: 'fa-solid fa-prescription-bottle-medical'
  //   },
  //   {
  //       name: 'Profile',
  //       path: `/doctor/profile/${user?.id}`,
  //       icon: 'fa-solid fa-address-card'
  //   }
  // ]
  


  //Menu List
  // const SidebarMenu = user?.isAdmin ? adminMenu : user?.isDoctor?doctorMenu:userMenu;
    const SidebarMenu = user?.isAdmin ? adminMenu : userMenu;
  return (
    <>
      <div className="main">
        <div className="header">
          <div className="logo">
            <h5>
              <i class="fa-light fa-mortar-pestle"></i> Masura
            </h5>
          </div>
          <div className="user-profile2" style={{ display: 'flex', alignItems: 'center' }}>
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
          <div className="logout" onClick={handleLogout}>
            <div><i className="fa-solid fa-right-from-bracket" style={{color:"black"}} /></div>
          </div>
        </div>
            <div className="bdy">
              {SidebarMenu.map((menu) => {
                const isActive = location.pathname === menu.path;
                return (
                  <React.Fragment key={menu.name}>
                    <div className="">
                      <Card className="menu-card mnu-item">
                        <i className={menu.icon}></i>
                        <Link to={menu.path}>{menu.name}</Link>
                      </Card>
                    </div>
                  </React.Fragment>
                );
                })}
            </div>
      </div>
    </>
  )
}

export default Dash