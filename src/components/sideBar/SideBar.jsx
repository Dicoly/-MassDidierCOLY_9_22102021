import React from 'react';
import yoga from '../../assets/yoga.svg';
import swim from '../../assets/swim.svg';
import bike from '../../assets/bike.svg';
import bodybuilding from '../../assets/bodybuilding.svg';
import './SideBar.css'

function SideBar() {

    const arrayImg = [yoga, swim, bike, bodybuilding];

    return (
        <div className="sideBarContent">
            <nav className="sideBarNav">
                {arrayImg.map((data) => (
                    <div className="sideBarNavLink" key={data}>
                        <img className="sideBarNavLinkImg"src={data} alt={data}/>
                    </div>
                ))}
            </nav>
            <p className="sideBarText">Copyright, SportSee 2020</p>
        </div>
    );
}

export default SideBar;