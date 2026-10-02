// import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// import { useState, useEffect } from "react";
// import "./themes/themes.css";
// import Login from "./pages/Login";
// import Dashboard from "./pages/Dashboard";
// import Layout from "./components/Layout";
// import Articles from "./pages/Articles";
// // App.jsx
// import "./styles/global.css";


// function App() {
//   const [theme, setTheme] = useState(
//     localStorage.getItem("theme") || "light-simple"
//   );
//   const [isAuth, setIsAuth] = useState(
//     !!sessionStorage.getItem("token")
//   );
//   useEffect(() => {
//     document.documentElement.setAttribute("data-theme", theme);
//     localStorage.setItem("theme", theme);
//   }, [theme]);
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route
//           path="/login"
//           element={
//             isAuth ? (
//               <Navigate to="/dashboard" />
//             ) : (
//               <Login setIsAuth={setIsAuth} />
//             )
//           }
//         />
//         <Route
//           path="/*"
//           element={
//             isAuth ? (
//               <Layout theme={theme} setTheme={setTheme} setIsAuth={setIsAuth}>
//                 <Routes>
//                   <Route path="/dashboard" element={<Dashboard />} />
//                 </Routes>
//               </Layout>
//             ) : (
//               <Navigate to="/login" />
//             )
//           }
//         />
//         <Route 
//             path="/articles"
//             element = {<Articles />}
        
//         />
//       </Routes>
//     </BrowserRouter>
//   );
// }
// export default App;

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "./themes/themes.css";
import Accueil    from "./pages/Accueil";
import Login      from "./pages/Login";
import Inscription from "./pages/Inscription";
import Dashboard  from "./pages/Dashboard";
import Categories from "./pages/Categories";
import Entrepots from "./pages/Entrepots";
import Articles   from "./pages/Articles";
import Mouvements from "./pages/Mouvements";
import Statistiques from "./pages/Statistiques";
import UsersPage  from "./pages/Utilisateurs";
import Details from "./pages/Details";
import Detailscarousel from "./pages/DetailsCarousel";
import Parametres from "./pages/Parametre";
import ArchivesMouvements from "./pages/ArchivesMouvements";
import AuditLogs from "./pages/AuditLogs";
import Layout     from "./components/Layout";

// import AuditLogs from "./pages/AuditLog";
import { MessageProvider } from "./components/MessageBox";

function App() {
  const [theme, setTheme] = useState(
    sessionStorage.getItem("theme") || "light-simple"
  );
  const [isAuth, setIsAuth] = useState(
    !!sessionStorage.getItem("token")
  );
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    sessionStorage.setItem("theme", theme);
  }, [theme]);
  return (
    <BrowserRouter>
      <MessageProvider>
        <Routes>
        {/* Pages publiques */}
        <Route path="/"           element={<Accueil />} />
        <Route path="/login"      element={
          isAuth ? <Navigate to="/dashboard" /> : <Login setIsAuth={setIsAuth} />
        } />
        <Route path="/inscription" element={<Inscription />} />
        {/* Pages protégées */}
        <Route path="/*" element={
          isAuth ? (
            <Layout theme={theme} setTheme={setTheme} setIsAuth={setIsAuth}>
              <Routes>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/categories" element={<Categories />} />
                <Route path="/entrepots" element ={<Entrepots />} />
                <Route path="/articles"  element={<Articles />} />
                <Route path="/mouvements"  element={<Mouvements />} />
                <Route path="/users"  element={<UsersPage />} />
                <Route path="/parametres"  element={<Parametres />} />
                <Route path="/statistiques"  element={<Statistiques />} />
                <Route path="/details/:type/all"  element={<Detailscarousel />} />
                <Route path="/details/:type/:id"  element={<Details />} />
                <Route path="/archives-mouvements"  element={<ArchivesMouvements />} />
                <Route path="/audit-logs"  element={<AuditLogs />} />
              </Routes>
            </Layout>
          ) : (
            <Navigate to="/login" />
            )
          } />
        </Routes>
      </MessageProvider>
      
    </BrowserRouter>
  );
}
export default App;
