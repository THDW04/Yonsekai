import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { Register } from './pages/Register';
import { Login } from './pages/Login';
import { Profile } from './pages/Profile';

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
          </Routes>
        </BrowserRouter>
      </main>
    </>
  )
}

export default App
