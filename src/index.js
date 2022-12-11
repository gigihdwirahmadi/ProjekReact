import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import BookPages from './Pages/BookPages';
import BookData from './Pages/BookData';
import Navbar from './component/Navbar';
import App from './App';
import DetailBook from './Pages/DetailBook'
import AuthorData from './Pages/AuthorData'
import reportWebVitals from './reportWebVitals';
import {BrowserRouter, Routes, Route} from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <Navbar/>
    <Routes>
    <Route path='/' element={<BookPages />} />
    <Route path='/BookData' element={<BookData />} />
    <Route path='/AuthorData' element={<AuthorData />} />
    <Route path='/:id' element={<DetailBook />} />
      </Routes>
      </BrowserRouter>

  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
