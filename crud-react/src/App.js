import logo from './logo.svg';
import Navbar from './Navbar';
import User from './users';
import UserCreate from './userCreate';
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div >
     <Navbar />
     <Routes>
        <Route path="/" element={<User />} />
        <Route path="create" element={<UserCreate />} />
      </Routes>
     
    </div>
  );
}

export default App;
