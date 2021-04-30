
import './App.css';

import {Route,Switch} from 'react-router-dom'
import Home from './components/Home/Home';
import Addproduct from './components/Addproduct/Addproduct';
import Sales from './components/Sales/Sales';
import Editproduct from './components/Editproduct/Editproduct';
import Updatesale from './components/Updatesales/Updatesale';
import table from './components/Sales/table';
function App() {
  return (
    <div className="App">
      <Switch>
      
        <Route exact path='/' component={Home}/>
        <Route exact path='/add_product' component={Addproduct}/>
        <Route exact path='/sales' component={Sales}/>
        <Route exact path='/edit/:id' component={Editproduct}/>
        <Route exact path='/update_sales' component={Updatesale}/>
        <Route exact path='/table' component={table}/>
      </Switch>
    </div>
  );
}

export default App;
