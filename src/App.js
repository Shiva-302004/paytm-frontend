
import './App.css';
import { Route,Routes } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import AddMoney from './pages/AddMoney';
import SendAnotheruser from './pages/SendAnotheruser';
import Hi from './pages/Hi';

function App() {
  return (
    <div className="App">
      <Navbar/>
      
      <Routes>
        <Route exact path='/' element={<Hi/>} />
        <Route exact path='/home' element={<Home/>} />
        <Route exact path='/login' element={<Login/>} />
        <Route exact path='/signup' element={<Signup/>}/>
        <Route exact path='/addmoney' element={<AddMoney/>}/>
        <Route exact path='/sendmoney/:id' element={<SendAnotheruser/>}/>
      </Routes>
      
    </div>
  );
}

export default App;
