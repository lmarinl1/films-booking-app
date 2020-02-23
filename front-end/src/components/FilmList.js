import React, { Component } from 'react';
import CreateModal from './CreateModal';
import NavigationFunction from '../utils/NavigationFunction';

class FilmList extends Component {

    constructor(props){
        super(props);

        this.state = {
            modalCreate: false,
            film: null
        }

        this.handleShowModal = this.handleShowModal.bind( this );
        this.handleOnSave = this.handleOnSave.bind( this );
    }

    handleShowModal(film){
        this.setState({modalCreate: true, film});
    }

    handleOnSave(event){
        event.preventDefault();
        const body = {
            "film_id": this.state.film.id,
            "day": event.target.date.value,
            "cedula": event.target.cedula.value,
            "nombre": event.target.name.value,
            "correo": event.target.email.value,
            "celular": event.target.cellphone.value
        }
        NavigationFunction('POST','/bookings/create', body);
    }

    render(){
        const {films, isLokedList} = this.props;
        return(
            <div className="container">
                <div className="row">
                    {
                        films.map((film, index) => 
                            <div key={film.id} className="container-film col-sm-3">

                                <img className="image-film" alt={film.tittle} src={film.image}/>
                                <div className="middle">
                                    {isLokedList[index]?
                                        <p className="plenty">Agotada</p>
                                        :<div className="btn create-film-button" onClick={() => this.handleShowModal(film)}>Reservar</div>
                                    }
                                </div>
                                
                            </div>
                        )
                    }
                </div>
                {!this.state.modalCreate? <></>:
                    <CreateModal showModal={this.state.modalCreate} modalTittle={'Reservar'} onSubmit={this.handleOnSave}>
                        <div className="form-group row">
                            <div className="offset-md-1 col-md-5">
                                <label>Nombre Completo*</label>
                                <input name="name" type="text" className="placeit-input" required/>
                            </div>

                            <div className="col-md-5">
                                <label>Celular*</label>
                                <input name="cellphone" type="number" className="placeit-input" required/>
                            </div>      
                        </div>

                        <div className="form-group row">
                            <div className="offset-md-1 col-md-5">
                                <label>Cédula*</label>
                                <input name="cedula" type="number" className="placeit-input" required/>
                            </div>

                            <div className="col-md-5">
                                <label>Correo*</label>
                                <input name="email" type="email" className="placeit-input" required/>
                            </div>  
                        </div>

                        <div className="form-group row">
                            <div className="offset-md-1 col-md-5">
                                <label>Fecha*</label>
                                <input name="date" type="date" className="placeit-input" min={(this.state.film.startDay).split("T")[0]} max={(this.state.film.endDate).split("T")[0]} required/>
                            </div>
                        </div>            
                    </CreateModal>
                }
            </div>
        );
    }
}

export default FilmList;