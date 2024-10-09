import './App.css';
import React from 'react';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from './Components/Dashboard/Dashboard';
import Care from './Components/Care/Care';
import Header from './Components/Essentials/Header';
import Footer from './Components/Essentials/Footer';
import Forms from './Components/Forms/Forms';
import NurseProfile from './Components/Care/CompanionProfile/Nurse';
import LoginSignup from './Components/LoginSignup/LoginSignup';
import Booking from './Components/Booking/Booking';
import PatientDetails from './Components/PatientDetails/PatientDetails';
import Confirmation from './Components/Confirmation/Confirmation';
import store from './store/store';
import { Provider } from "react-redux";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginSignup />
  },
  {
    path: "/dashboard",
    element: <Dashboard />
  },
  {
    path: "/care/:type",
    element: <Care />
  },
  {
    path: "/care/:type/:id",
    element: <NurseProfile />
  },
  {
    path: "/register/:type",
    element: <Forms />
  },
  {
    path: "/booking",
    element: <Booking />
  },
  {
    path: "/patient-details",
    element: <PatientDetails />
  },
  {
    path: "/confirmation",
    element: <Confirmation />
  }
]);

function App() {
  return (
    <React.StrictMode>
      <Provider store={store}>

      <main className='mb-0'>
        <RouterProvider router={router} />
      </main>
      
      </Provider>
    </React.StrictMode>
  );
}

export default App;