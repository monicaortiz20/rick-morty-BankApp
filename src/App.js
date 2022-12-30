import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import Footer from './components/Footer/footer'
import Init from './pages/Init/Init';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Transactions from './pages/home/Transactions';
import Register from './pages/register/Register';
import Reset from './pages/reset/Reset';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
    return (
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route exact path='/' element={<Init/>} />
            <Route exact path='/home' element={<Home/>} />
            <Route path='/login' element={<Login/>} />
            <Route path='/register' element={<Register/>} />
            <Route path='/reset' element={<Reset/>} />
            <Route path='/transactions/:id' element={<Transactions/>} />
        </Routes>
        <Footer />
      </BrowserRouter>
    );
  
}

export default App;
