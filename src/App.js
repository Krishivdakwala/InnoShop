import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import {Navbar} from './components/navbar';
import { Home } from './pages/home/home';
import { Cart } from './pages/cart/cart';

function App() {
  return (
    <div className="App">

      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/cart" element={<Cart />}/>
        </Routes>
      </Router>

    </div>
  );
}

export default App;
