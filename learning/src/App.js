
import './App.css';
import Main from './Components/MainComponent';
import { BrowserRouter } from 'react-router-dom';
import { Component } from 'react';
import { Provider } from 'react-redux';
import { configureStore } from './redux/configureStore';

const store = configureStore();

class App extends Component {


  render() {
    return (
      <Provider store = {store}>

      <BrowserRouter>

        <div className="App">
          <Main />

        </div>
      </BrowserRouter>
      </Provider>
    );
  }
}


export default App;
