import React from 'react'
import DocNavbar from './DocNavbar';
import { Outlet } from 'react-router-dom';
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
