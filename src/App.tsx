import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from './components/Header';
import Home from './pages/Home';

function App() {
  const [isDarkmode, setIsDarkmode] = useState(false);
  return (
    <div className={isDarkmode === true ? 'dark' : ''}>
      <Router>
        <Header isDarkmode={isDarkmode} setIsDarkmode={setIsDarkmode} />
        <Routes>
          <Route path='/' element={<Home />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
