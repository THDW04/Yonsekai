import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState, useEffect, lazy } from 'react';
import { HelmetProvider } from 'react-helmet-async';

import { Header } from './components/Header/header';
import { AudioExperience } from './components/AudioExperience';
import { AudioModal } from './components/AudioModal';
import './assets/css/style.css'
import "./i18n";

const Home = lazy(() => import('./pages/Home'));
const Register = lazy(() => import('./pages/Register'));
const Login = lazy(() => import('./pages/Login'));
const Reservation = lazy(() => import('./pages/Reservation'));
const Profile = lazy(() => import('./pages/Profile'));
const Admin = lazy(() => import('./pages/Admin'));
const Error403 = lazy(() => import('./pages/Error403'));
const Error404 = lazy(() => import('./pages/Error404'));

function App() {
  const [isStarted, setIsStarted] = useState(false);
  const [hasAudio, setHasAudio] = useState(false);

  const handleStart = (useAudio) => {
    setHasAudio(useAudio);
    setIsStarted(true);
  };

  useEffect(() => {
    import('./pages/Home');
  }, []);

  return (
    <>
      <HelmetProvider>
        <BrowserRouter>
          {!isStarted && <AudioModal onStart={handleStart} />}
          {isStarted && hasAudio && <AudioExperience isStarted={isStarted} />}
          {isStarted && (
            <>
              <Header
                hasAudio={hasAudio}
                setHasAudio={setHasAudio}
              />
              <AudioExperience />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/inscription" element={<Register />} />
                <Route path="/connexion" element={<Login />} />
                <Route path="/reservation" element={<Reservation />} />
                <Route path="/profil" element={<Profile />} />
                <Route path="/administration" element={<Admin />} />
                <Route path="/error403" element={<Error403 />} />
                <Route path="/error404" element={<Error404 />} />
              </Routes>
            </>
          )}
        </BrowserRouter>
      </HelmetProvider>
    </>
  )
}

export default App