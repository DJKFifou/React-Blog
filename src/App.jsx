import './App.css'
import { BrowserRouter, Routes, Route} from 'react-router';
import Header from './components/header';
import Home from './pages/home';
import Posts from './pages/posts';
import Post from './pages/post';

export default function App() {

  return (
    <>
      <Header />
      <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/posts" element={<Posts />} />
            <Route path="/posts/:id" element={<Post />} />
          </Routes>
        </BrowserRouter>
    </>
  )
}