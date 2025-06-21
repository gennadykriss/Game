import { BrowserRouter, Route, Routes } from "react-router-dom"
import MenuScreen from "./components/MenuScreen"
import Navbar from "./components/Navbar"

function App() {
  return (
    <> 
      <BrowserRouter>
          <Routes>
            <Route index element={<MenuScreen />}/>
          </Routes>
      </BrowserRouter>
    </>
  )
}

export default App