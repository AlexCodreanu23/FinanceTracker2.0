import React from "react";
import "./Header.css";

const Header = ({user}) => {
    return(
        <header className= "app-header">
            <div className= "user-info">
                <div>
                    <h4>{`${user.firstName} ${user.lastName}`}</h4>
                </div>
            </div>
        </header>
    )
};

export default Header;