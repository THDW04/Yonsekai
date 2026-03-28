import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import { Header } from './components/Header/header';
import { Home } from './pages/Home';
import { Register } from './pages/Register';
import { Login } from './pages/Login';
import { Reservation } from './pages/Reservation';
import { Profile } from './pages/Profile';
import { Admin } from './pages/Admin';
import { AudioExperience } from './components/AudioExperience';
import { AudioModal } from './components/AudioModal';
import './assets/css/style.css'

function App() {
  const [isStarted, setIsStarted] = useState(false);
  const [hasAudio, setHasAudio] = useState(false);

  const handleStart = (useAudio) => {
    setHasAudio(useAudio);
    setIsStarted(true);
  };

  return (
    <>
      <BrowserRouter>
        {!isStarted && <AudioModal onStart={handleStart} />}

        {isStarted && hasAudio && <AudioExperience isStarted={isStarted} />}

        {isStarted && (
          <>
            <Header hasAudio={hasAudio} setHasAudio={setHasAudio} />
            <AudioExperience />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/inscription" element={<Register />} />
              <Route path="/connexion" element={<Login />} />
              <Route path="/reservation" element={<Reservation />} />
              <Route path="/profil" element={<Profile />} />
              <Route path="/administration" element={<Admin />} />
            </Routes>
          </>
        )}
      </BrowserRouter>
    </>
  )
}

export default App