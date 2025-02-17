import { Routes, Route } from "react-router-dom";
import { useEffect, useRef } from "react";
import { useShallow } from "zustand/shallow";

import { Home, Management, Dashboard, Message } from "./pages";
import MainLayout from "./layouts/MainLayout";
import { Modal } from "./components";
import { useGeneralStore } from "./store";
import { Toaster } from "react-hot-toast";

const App = () => {
 const [setModalElement, isShowingModal] = useGeneralStore(
  useShallow((state) => [state.setModalElement, state.isShowingModal])
 );

 const modalRef = useRef<HTMLDialogElement | null>(null);

 useEffect(() => {
  if (modalRef.current) {
   setModalElement(modalRef.current);
  }
 }, [modalRef]);

 return (
  <div className="font-koh-santepheap">
   <Routes>
    <Route element={<MainLayout />}>
     <Route path="/" element={<Home />} />
    </Route>
    <Route path="/dashboard" element={<Dashboard />} />
    <Route path="/management" element={<Management />} />
    <Route path="/message" element={<Message />} />
   </Routes>
   <Modal ref={modalRef} />
   {!isShowingModal && <Toaster position="top-center" />}
  </div>
 );
};

export default App;
