import './App.css';
import Registration from './components/Registration';
import Login from './components/Login';
import Routing from './components/Routing'
import { HashRouter, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';


function App() {
  if(localStorage.getItem('fname')){
    <Dashboard />   
  }
  else{
    <Routing />
  }
  return(
    <HashRouter>
      <Route exact path="/" component={Routing} />
      <Route exact path="/SignUp" component={Registration} />
      <Route exact path="/Login" component={Login} />
      <Route exact path='/Dashboard' component={Dashboard} />
    </HashRouter>    
  )
}

export default App;