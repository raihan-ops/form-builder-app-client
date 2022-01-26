import './App.css';
import Header from './Component/Header';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import { lazy, Suspense } from 'react';






const Home = lazy(() => import('./Component/Home'));
const CreateForm = lazy(() => import('./Component/CreateForm'));
const UserSelectionForm = lazy(() => import('./Component/UserSelectionForm'));
const Details = lazy(() => import('./Component/Details'));

function App() {
  return (
    <div className="App">
    
    <BrowserRouter>
    <Suspense fallback={<p>Loading...</p>}>
    <Header/>
    <Routes>



    <Route path="/" element={<Home/>}/>
    <Route path="/form" element={<CreateForm/>}/>
    <Route path="/userSelect" element={<UserSelectionForm/>}/>
    <Route path="/details/:eid" element={<Details/>}/>


    </Routes>
    </Suspense>
     </BrowserRouter>
    
    </div>
  );
}

export default App;
