import React from 'react'
// import NavLink from 'react-router-dom'
import DocNavbar from './DocNavbar';
import { NavLink, Outlet } from 'react-router-dom';
// import Footer from './Footer';
import DocFooter from './DocFooter';

function DocHome() {
  return (
    <div>
      <DocNavbar/>
      <Outlet/>
      <DocFooter/>
    </div>
  )
}

export default DocHome;
