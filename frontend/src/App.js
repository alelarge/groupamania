import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
//import logo from './logo.svg';
import './App.scss';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Homepage from './pages/Homepage';
import { AddPost } from './pages/Post';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/create-account" element={<Signup />} />
            <Route path="/homepage" element={<Homepage />} />
            <Route path="/post/create" element={<AddPost />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
