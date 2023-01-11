import React from 'react';
import ReactDOM from 'react-dom';
import AuthProvider from './Context/AuthContext_consumer';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from "react-router-dom";
import FoodItem from './components/foodItem';
import VendorListing from './components/vendorListing';


// ReactDOM.render(
//   <React.StrictMode>
//     <BrowserRouter>
//     <AuthProvider>
//         <App/>
//     </AuthProvider>
//     </BrowserRouter>
//   </React.StrictMode>,
//   document.getElementById('root')
// );

ReactDOM.render(<AuthProvider><App /></AuthProvider>, document.getElementById('root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
