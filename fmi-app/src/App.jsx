// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <div>
//         <a href="https://vite.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Syahrul</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.jsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }

// export default App

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// import React from 'react';
// // Mengimpor komponen HelloWorld dari folder pertemuan-2
// import HelloWorld from './pertemuan-2/HelloWorld';

// function App() {
//   return (
//     <div>
//       <HelloWorld />
//     </div>
//   );
// }

// export default App;


////////////////////////////////////////////// Pertemuan2 ////////////////////////////////////////////////////////////////////////////////
// import React from 'react';
// import BiodataDiri from './pertemuan-2/BiodataDiri';

// function App() {
//   return (
//     <div>
//       <BiodataDiri />
//     </div>
//   );
// }

// export default App;


// import Pertemuan4Latihan from "./pertemuan-4-latihan";

// function App() {
//   return <Pertemuan4Latihan />;
// }

// export default App;

// import "./assets/tailwind.css";
// import Sidebar from "./layouts/Sidebar";
// import Header from "./layouts/Header";
// import Dashboard from "./pages/Dashboard";

// export default function App() {
//   return (
//     <div className="flex min-h-screen bg-gray-100">
//       <Sidebar />
//       <div className="flex-1 ml-64">
//         <Header />
//         <main className="p-6">
//           <Dashboard />
//         </main>
//       </div>
//     </div>
//   );
// }



import "./assets/tailwind.css";
import { Routes, Route } from "react-router-dom";

import { MainLayout } from "./layouts/MainLayout";
import AuthLayout from "./layouts/AuthLayout";

import React, { Suspense } from "react";

const Sidebar = React.lazy(() => import("./layouts/Sidebar"))
const Header = React.lazy(() => import("./layouts/Header"))

const Dashboard = React.lazy(() => import("./pages/main/Dashboard"))
const Orders = React.lazy(() => import("./pages/main/Orders"))
const Customers = React.lazy(() => import("./pages/main/Customers"))
const NotFound = React.lazy(() => import("./pages/main/NotFound"))
const Error400 = React.lazy(() => import("./pages/main/Error400"))
const Error401 = React.lazy(() => import("./pages/main/Error401"))
const Error403 = React.lazy(() => import("./pages/main/Error403"))

const Login = React.lazy(() => import("./pages/auth/Login"))
const Register = React.lazy(() => import("./pages/auth/Register"))
const Forgot = React.lazy(() => import("./pages/auth/Forgot"))

const Loading = React.lazy(() => import("./components/Loading"))

export default function App() {
  return (
    <Suspense fallback={<Loading/>}>
        <Routes>
          <Route element={<MainLayout/>}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/error-400" element={<Error400 />} />
            <Route path="/error-401" element={<Error401 />} />
            <Route path="/error-403" element={<Error403 />} />
            <Route path="*" element={<NotFound />} />
          </Route>

          <Route element={<AuthLayout/>}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register/>} />
            <Route path="/forgot" element={<Forgot/>} />
        </Route>

        </Routes>
    </Suspense>
  );
} 