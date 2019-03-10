import React from 'react';
import './Header.scss';

class Header extends React.Component {
    render() {
        return (
            <div className="header">
                <h5>Finding Falcone!</h5>
                <nav>
                    <a href="/">Reset</a>
                    <a href="https://www.geektrust.in">Geektrust Home</a>
                </nav>
            </div>
        )
    }
}

export default Header;