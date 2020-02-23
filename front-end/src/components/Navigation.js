import React, { Component } from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faCalendar } from '@fortawesome/fontawesome-free-regular'
import { faFilm } from "@fortawesome/free-solid-svg-icons"

class Navigation extends Component {
    render() {
         const {changeView} = this.props;
        return (
            <div className="sidenav">
                <h1 className="specialFont font-italic"><strong>Place</strong>it</h1>
                <br />
                <br />
                <a className="row select-sidenav" href="#" onClick={() => changeView(false)}>
                    <div className="offset-md-3">
                        <FontAwesomeIcon icon={faCalendar} className="iconMargin" />  
                    </div> 
                    <div className="offset-md-2">
                        Reservas
                    </div>
                </a>
                <a className="row select-sidenav" href="#" onClick={() => changeView(true)}>
                    <div className="offset-md-3">
                        <FontAwesomeIcon icon={faFilm} className="iconMargin" />
                    </div>
                    <div className="offset-md-2">
                        Películas
                    </div>
                </a>
            </div>
        )
    }
}

export default Navigation;