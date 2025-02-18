import { Routes, Route } from "react-router-dom";
import { useEffect, useRef } from "react";
import { useShallow } from "zustand/shallow";
import { Toaster } from "react-hot-toast";

import { Home, Management, Dashboard, Message } from "./pages";
import { MainLayout, LayoutSidebar } from "./layouts";
import { Modal } from "./components";
import { useGeneralStore } from "./store";

const App = () => {
 const [setModalElement, isShowingModal] = useGeneralStore(
  useShallow((state) => [state.setModalElement, state.isShowingModal])
 );

 const modalRef = useRef<HTMLDialogElement | null>(null);

 useEffect(() => {
  if (modalRef.current) {
   setModalElement(modalRef.current);
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
 }, [modalRef]);

 return (
  <div className="font-koh-santepheap">
   <Routes>
    <Route element={<MainLayout />}>
     <Route path="/" element={<Home />} />
     <Route path="/message" element={<Message />} />
    </Route>
    <Route element={<LayoutSidebar />}>
     <Route path="/management" element={<Management />}>
      <Route path="add-user" element={<p>Add new user</p>} />
      <Route path="student-management" element={<p>Student management</p>} />
      <Route path="tutor-management" element={<p>Tutor management</p>} />
     </Route>
    </Route>
    <Route path="/dashboard" element={<Dashboard />} />
   </Routes>
   <Modal ref={modalRef} />
   {!isShowingModal && <Toaster position="top-center" />}
  </div>
 );
};

export default App;
