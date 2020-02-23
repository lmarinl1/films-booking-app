import React from 'react';
import './App.css';
import './components/components.css';
import Navigation from './components/Navigation';
import FilmsListContainer from './components/FilmsListContainer';
import Bookings from './components/Bookings';

function App() {

  const [filmsListMode, setView] =  React.useState(true);

  return (
    <div className="App">

      <div className="row">

        <div className="col-md-3">
          <Navigation changeView={setView}/>
        </div>

        { filmsListMode?
            <div className="col">
              <FilmsListContainer />
            </div>
            :
            <div className="col">
              <Bookings />
            </div>
        }
      </div>
    </div>
  );
}


export default App;
