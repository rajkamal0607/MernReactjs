import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js'
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
// import Navbaar from './components/Navbaar';
import Home from './components/Home';
import Register from './components/Register';
import Edit from './components/Edit';
import Login from './components/Login';
import UserList from './components/UserList';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/home" element={<Navbaar />} /> */}
        <Route path="/" element={<Home />} />
        <Route path="/userslist" element={<UserList />} />
        <Route path="/register" element={<Register />} />
        <Route path="/edit/:id" element={<Edit />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
