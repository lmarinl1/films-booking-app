import React,{ Component } from "react";
import { ThreeHorseLoading } from 'react-loadingg';
import SearchFilm from './SearchFilm';
import NavigationFunction from './../utils/NavigationFunction';
import FilmList from "./FilmList";
import CreateModal from './CreateModal';
import DateRangePicker from 'react-bootstrap-daterangepicker';
import FormatDateFunction from '../utils/FormatDateFunction';
import 'bootstrap-daterangepicker/daterangepicker.css';


class FilmListContainer extends Component{

  constructor(props){
      super(props);
      this.state = { 
          modalCreate: false,
          currentFilms: null,
          isLokedList: null,
          newFilms: []
      }

      this.updateFilmsFunction = this.updateFilmsFunction.bind( this );
      this.showModalCreate = this.showModalCreate.bind( this );
      this.handleOnSave = this.handleOnSave.bind( this );
  }

  handleOnSave(event){
    event.preventDefault();

    const body = {
      tittle: event.target.tittle.value, 
      synopsis: event.target.sinopsis.value, 
      image: event.target.poster.value,
      startDay: event.target.startDate.value,
      endDate: event.target.endDate.value
    }
    NavigationFunction('POST','/films/create',body)
    .then( (film) => {
      this.setState({newFilms: this.state.newFilms.concat([film]), modalCreate: false})
    })
    
  }

  updateFilmsFunction(films, isLokedList){
    this.setState({currentFilms: films, isLokedList, newFilms: []})
  }

  showModalCreate(){
    this.setState({modalCreate: true})
  }
  
  componentDidMount(){
    const convert = (date) => {
      return date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate()
    }
  
    let oneMonthLater = new Date();
    oneMonthLater.setMonth((oneMonthLater.getMonth() + 1) % 11);
    let toDay = new Date();
  
    NavigationFunction('GET','/films/' + convert(toDay) + '/' + convert(oneMonthLater))
    .then((films) => {
        if (films === undefined) return;
        this.setState({ currentFilms: films[0], isLokedList: films[1]});
    });
  }

  render(){
    let oneMonthLater = new Date();
    oneMonthLater.setMonth((oneMonthLater.getMonth() + 1) % 11);
    let toDay = new Date();

    let refDate = React.createRef();
    let refSDate = React.createRef();
    let refEDate = React.createRef();
    
    const handleOnApply = (event, picker) => {
      event.preventDefault();
      const sdate = picker.startDate;
      const edate = picker.endDate;
      refDate.current.value = FormatDateFunction(sdate.toDate()) + " - " + FormatDateFunction(edate.toDate());
      refSDate.current.value = sdate.format('YYYY-MM-DD');
      refEDate.current.value = edate.format('YYYY-MM-DD');
    }

    return (
        this.state.currentFilms === null?  <div className="loading"><ThreeHorseLoading /></div>:
        
        <div className="container p-5">
            <div className="row">
                <p className="col-md-1 title-films-list"><strong>Películas</strong></p>
                <button className="create-film-button col-md-3 offset-md-8 btn" onClick={this.showModalCreate} >+ Crear Nueva Película</button>
            </div>
            <div className="row search-film mt-5">
                <SearchFilm updateFilmsFunction={this.updateFilmsFunction}/>
            </div>

            {this.state.newFilms.length > 0? 
              <div className="row new-list">
                <FilmList films={this.state.newFilms} isLokedList={[false]}/>
              </div>
            : <></> }

            <div className="row film-list">
                <FilmList films={this.state.currentFilms} isLokedList={this.state.isLokedList}/>
            </div>
            
            <CreateModal showModal={this.state.modalCreate} modalTittle={'Crear Película'} onSubmit={this.handleOnSave}>
                <div className="form-group row">
                  <div className="offset-md-1 col-md-3">Título*</div>
                  <div className="col-md-6"><input name="tittle" type="text" className="placeit-input" required/></div>
                </div>

                <div className="form-group row">
                  <div className="offset-md-1 col-md-3">Sinopsis*</div>
                  <div className="col-md-6"><textarea name="sinopsis" className="placeit-input" rows={3} required/></div>
                </div>

                <div className="form-group row">
                  <div className="offset-md-1 col-md-3">Póster Url*</div>
                  <div className="col-md-6"><input name="poster" type="text" className="placeit-input" required/></div>
                </div>

                <div className="form-group row">
                  <div className="offset-md-1 col-md-3">Fechas*</div>
                  <div className="col-md-6">
                    <DateRangePicker className="placeit-input" name="datepicker" startDate={toDay} endDate={oneMonthLater} onApply={handleOnApply}>
                        <input className="placeit-input" ref={refDate} type="text" required/>
                    </DateRangePicker>
                    <input ref={refSDate} name="startDate" type="date" hidden/>
                    <input ref={refEDate} name="endDate" type="date" hidden/>
                  </div>
                </div>
            </CreateModal>

        </div>
        );
  }
}

export default FilmListContainer;