import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';


const App = React.lazy(()=> import('./components/App.jsx'))
const Activity = React.lazy(()=> import('./components/Activity.jsx'))
const PageNotFound = React.lazy(()=> import('./components/PageNotFound.jsx'))
const Spinner = React.lazy(()=> import('./components/Spinner.jsx'))


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      
    <React.Suspense fallback={<Spinner />}>
      <Routes>
        <Route path='/activity-app/' element={<App />}>
          <Route path=':id' element={<Activity/>} />
          <Route path='' element={<h3 style={{
            fontSize:"2rem",
            marginTop:"4rem"
          }}>Select a category</h3>} />
        </Route>
        <Route path='*' element={<PageNotFound/>}/>
      </Routes>

      </React.Suspense>
    </Router>
  </React.StrictMode>
);
