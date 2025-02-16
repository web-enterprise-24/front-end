import { Routes, Route } from "react-router-dom";

import { Home, Management, Dashboard } from "./pages";
import MainLayout from "./layouts/MainLayout";

const App = () => {
 return (
  <div className="font-koh-santepheap">
   <Routes>
    <Route element={<MainLayout />}>
     <Route path="/" element={<Home />} />
     <Route path="/dashboard" element={<Dashboard />} />
     <Route path="/management" element={<Management />} />
    </Route>
   </Routes>
  </div>
 );
};

export default App;
