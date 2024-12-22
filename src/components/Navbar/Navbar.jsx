import React, { useEffect, useRef } from 'react'
import './Navbar.css'
import logo from '../../assets/logo.png'
import searchIcon from '../../assets/search_icon.svg'
import bellIcon from '../../assets/bell_icon.svg'
import profileImg from '../../assets/profile_img.png'
import caretIcon from '../../assets/caret_icon.svg'
import { logout } from '../../firebase'

const Navbar = () => {
  const navRef = useRef(); 

  useEffect(() => {
    window.addEventListener('scroll', () => {
      if(window.scrollY >= 180){
        navRef.current.classList.add('nav-dark')
      }else {
        navRef.current.classList.remove('nav-dark')
      }
    })
  },[])

  return (
    <div ref={navRef} className='navbar'>
        <div className="navbar-left">
          <img src={logo} alt="logo" />
          <ul>
            <li>Home</li>
            <li>Tv Shows</li>
            <li>Movies</li>
            <li>New & Popular</li>
            <li>My Lists</li>
            <li>Browse by Language</li>
          </ul>
        </div>
        <div className="navbar-right">
          <img src={searchIcon} alt="" className='icons'/>
          <p>Children</p>
          <img src={bellIcon} alt="" className='icons'/>
          <div className="navbar-profile">
            <img src={profileImg} alt="" className='profile' />
            <img src={caretIcon} alt="" className='profile' />
            <div className="dropDown">
              <p onClick={() => {logout()}}>Sign Out of Netflix</p>
            </div>
          </div>
        </div>
    </div>
  )
}

export default Navbar