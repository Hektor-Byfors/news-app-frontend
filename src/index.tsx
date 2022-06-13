import React from 'react';
import ReactDOMClient from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { Login } from './components/login/login';
import { Create } from './components/create-user/create';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { Home } from './components/home/home';

const container = document.getElementById("root");
const root = ReactDOMClient.createRoot(container as Element);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />}/>
        <Route path="/create" element={<Create />}/>
        <Route path="/home" element={<Home />}/>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
