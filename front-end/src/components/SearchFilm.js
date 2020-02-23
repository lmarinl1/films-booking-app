import React from 'react';
import FormatDateFunction from '../utils/FormatDateFunction';
import DateRangePicker from 'react-bootstrap-daterangepicker';
import NavigationFunction from '../utils/NavigationFunction'
import 'bootstrap-daterangepicker/daterangepicker.css';


function SearchFilm(props){ 
    
    let refDate = React.createRef();
    let {updateFilmsFunction} = props;
    let oneMonthLater = new Date();
    oneMonthLater.setMonth((oneMonthLater.getMonth() + 1) % 11);
    let toDay = new Date();

    function handleOnApply(event, picker){
        event.preventDefault();
        refDate.current.value = FormatDateFunction(picker.startDate.toDate()) + " - " + FormatDateFunction(picker.endDate.toDate())
        NavigationFunction('GET','/films/' + picker.startDate.format('YYYY-MM-DD') + '/' + picker.endDate.format('YYYY-MM-DD'))
        .then((films) => {
            updateFilmsFunction(films[0],films[1]);
        });
    }

    return(
        <> 
            <div className="col-md-3 specialFont">Seleccionar Fecha:</div> 
            
            <div className="col-md-3">
                <DateRangePicker name="datepicker" startDate={toDay} endDate={oneMonthLater} onApply={handleOnApply}>
                    <input className="rounded-search-input" type="text" defaultValue={FormatDateFunction(toDay) + " - " + FormatDateFunction(oneMonthLater)} ref={refDate}  readOnly />
                </DateRangePicker>
            </div>
        </>
    );
}

export default SearchFilm;