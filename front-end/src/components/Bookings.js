import React,{ Component } from "react";
import NavigationFunction from '../utils/NavigationFunction';
import SearchBooking from "./SearchBooking";
import { ThreeHorseLoading } from 'react-loadingg';

class Bookings extends Component{

  constructor(props){
      super(props);
      this.state = {
        bookings: null
      }

      this.updateBookingsFunction = this.updateBookingsFunction.bind( this );
  }

  updateBookingsFunction(bookings){
    this.setState({bookings})
  }


  componentDidMount(){
    const convert = (date) => {
      return date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate()
    }
  
    let oneMonthLater = new Date();
    oneMonthLater.setMonth((oneMonthLater.getMonth() + 1) % 11);
    let toDay = new Date();
  
    NavigationFunction('GET','/bookings/' + convert(toDay) + '/' + convert(oneMonthLater))
    .then((bookings) => {
        if(bookings === undefined) return;
        this.setState({ bookings });
    });
  }

  render(){
      return(
        this.state.bookings === null? <div className="loading"><ThreeHorseLoading /></div>:
        
        <div className="container p-5">
            <div className="row">
                <p className="title-films-list"><strong>Reservas Realizadas</strong></p>
            </div>
            
            <div className="row search-film mt-5">
                <SearchBooking updateBookingsFunction={this.updateBookingsFunction}/>
            </div>

            <div className="table-responsive row">
              <table className="table table-hover mt-5">
                <thead>
                  <tr>
                    <th>Película</th>
                    <th>Dia</th>
                    <th>Nombre reservante</th>
                    <th>Correo electrónico</th>
                    <th>Cédula</th>
                    <th>Celular</th>
                  </tr>
                </thead>

                { this.state.bookings === null? <></> :
                  <tbody>
                    {this.state.bookings.map((booking, index) =>
                      <tr>
                        <td>{booking.tittle}</td>
                        <td>{booking.day}</td>
                        <td>{booking.nombre}</td>
                        <td>{booking.correo}</td>
                        <td>{booking.cedula}</td>
                        <td>{booking.celular}</td>
                      </tr>
                    )}
                  </tbody>
                }
              </table>
            </div>

        </div>
      );
  }


}

export default Bookings;