import './App.css'
import { BrowserRouter, Routes, Route} from 'react-router';
import Header from './components/header';
import Home from './pages/home';
import Posts from './pages/posts';
import Post from './pages/post';
import Login from './pages/login.jsx';
import LogToggler from "./components/logToggler.jsx";
import {LoginProvider} from './contexts/LoginProvider.jsx';

export default function App() {

  return (
    <>
      <LoginProvider>
        <Header />
        <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/posts" element={<Posts />} />
              <Route path="/posts/:id" element={<Post />} />
              <Route path="/logToggler" element={<LogToggler />} />
              <Route path="/login" element={<Login />} />
            </Routes>
          </BrowserRouter>
      </LoginProvider>
    </>
  )
}