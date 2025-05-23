import React, { useState } from 'react';
import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero/Hero';
import Background from './components/Background/Background';
import Model from './components/Hero/pages/Model';
import History from './components/Hero/pages/History';
import Discover from './components/Hero/pages/Discover';
import Cp from './components/Hero/pages/Cp';
import Viewthecart from './components/Hero/pages/Viewthecart';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const App = () => {
  let heroData = [
    {text1:"Dive into",text2:"what you love"},
    {text1:"make into possible",text2:"what you love"},
    {text1:"connect with futhure",text2:"what you love"},
  ];
  const [heroCount, setHeroCount] = useState(0);
  const [playStatus, setPlayStatus] = useState(false);

  return (
    <Router>
      <Background playStatus={playStatus} heroCount={heroCount}/>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <Hero
              setPlayStatus={setPlayStatus}
              heroData={heroData[heroCount]}
              heroCount={heroCount}
              setHeroCount={setHeroCount}
              playStatus={playStatus}
            />
          }
        />
        <Route path="/model" element={<Model />} />
        <Route path="/history" element={<History />} />
        <Route path="/discover" element={<Discover />} />
        <Route path="/cp" element={<Cp />} />
        <Route path="/viewthecart" element={<Viewthecart />} />
      </Routes>
    </Router>
  );
};

export default App;
