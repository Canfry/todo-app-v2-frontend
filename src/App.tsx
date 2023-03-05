import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from './components/Header';
import Register from './pages/Register';
import Login from './pages/Login';
import Todos from './pages/Todos';
import NewTodo from './pages/NewTodo';

function App() {
  const [isDarkmode, setIsDarkmode] = useState(false);
  return (
    <div className={`h-full ${isDarkmode === true ? 'dark' : ''}`}>
      <Router>
        <Header isDarkmode={isDarkmode} setIsDarkmode={setIsDarkmode} />
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/todos' element={<Todos />} />
          <Route path='/todos/new' element={<NewTodo />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
