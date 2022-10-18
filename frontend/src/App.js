import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap';
import "bootstrap-icons/font/bootstrap-icons.css";
import Login from './pages/Login';
import Signup from './pages/Signup';
import Homepage from './pages/Homepage';
import { AddPost } from './pages/Post';
import { ModifyPost } from './pages/Post';
//import PostManager from './pages/PostManager';


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
            <Route path="/post/:postId/modify" element={<ModifyPost />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
