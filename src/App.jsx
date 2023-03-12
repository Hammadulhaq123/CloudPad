

// import './App.css'
import Navbar from './components/Navbar'
// import Home from './components/Home'
import Main from './components/Main'
import About from "./components/About"
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import NoteState from './context/notes/NoteState';
import Sidebar from './components/Sidebar';



function App() {

  return (
    <>
      <NoteState>
        <Router>
          <Navbar />
          <Routes>
            <Route exact path='/' element={
              <>
                <Main />
                <Sidebar />
              </>
            } />
            <Route path='/about' element={
              <>
                <About />
              </>
            } />
          </Routes>

        </Router>
      </NoteState>
    </>
  )
}

export default App
