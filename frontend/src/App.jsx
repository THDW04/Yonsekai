import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { Register } from './pages/Register';
import { Login } from './pages/Login';
import { Profile } from './pages/Profile';
import { Admin } from './pages/Admin';

function App() {

  return (
    <>
      <main>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/inscription" element={<Register />} />
            <Route path="/connexion" element={<Login />} />
            <Route path="/profil" element={<Profile />} />
            <Route path="/administration" element={<Admin />} />
          </Routes>
        </BrowserRouter>
      </main>
    </>
  )
}

export default App
