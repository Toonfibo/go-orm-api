import Navbar from './Navbar';
import User from './users';
import UserCreate from './userCreate';
import { Routes, Route } from "react-router-dom";
import UserUpdate from './userUpdate';

function App() {
  return (
    <div >
     <Navbar />
     <Routes>
        <Route path="/" element={<User />} />
        <Route path="create" element={<UserCreate />} />
        <Route path="users/update/:id" element={<UserUpdate />} />
      </Routes>
     
    </div>
  );
}

export default App;
