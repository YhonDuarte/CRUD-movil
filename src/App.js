import {BrowserRouter, Routes, Route} from 'react-router-dom'
import ShowProduct from './componentes/ShowProduct';

function App() {
  return (
  <BrowserRouter>
     <Routes>
        <Route path='/' element={<ShowProduct/>}>
        </Route>
      </Routes>
  </BrowserRouter>
  )
}

export default App;
