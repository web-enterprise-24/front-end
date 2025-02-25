import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useRef } from "react";
import { useShallow } from "zustand/shallow";
import { Toaster } from "react-hot-toast";

import {
 Home,
 Management,
 Dashboard,
 Message,
 AddNew,
 Profile,
 StudentManagement,
} from "./pages";
import { MainLayout, LayoutSidebar } from "./layouts";
import { Modal } from "./components";
import { useAuthStore, useGeneralStore } from "./store";
import { Loader } from "lucide-react";

const App = () => {
 const [isCheckingAuth, checkAuth, accessToken] = useAuthStore(
  useShallow((state) => [
   state.isCheckingAuth,
   state.checkAuth,
   state.accessToken,
  ])
 );
 const [setModalElement, isShowingModal, isClosingModal] = useGeneralStore(
  useShallow((state) => [
   state.setModalElement,
   state.isShowingModal,
   state.isClosingModal,
  ])
 );

 const modalRef = useRef<HTMLDialogElement | null>(null);

 useEffect(() => {
  checkAuth(accessToken);
 }, []);

 useEffect(() => {
  if (!isCheckingAuth && modalRef.current) {
   setModalElement(modalRef.current);
  }
 }, [isCheckingAuth, modalRef, setModalElement]);

 if (isCheckingAuth) {
  return (
   <div className="w-screen h-screen flex items-center justify-center">
    <Loader className="size-30 animate-spin" />
   </div>
  );
 }

 return (
  <div className="font-koh-santepheap">
   <Routes>
    <Route element={<MainLayout />}>
     <Route path="/" element={<Home />} />
     <Route path="/message" element={<Message />} />
    </Route>
    <Route element={<LayoutSidebar />}>
     <Route path="/management" element={<Management />}>
      <Route index element={<Navigate to="add-user" />} />
      <Route path="add-user" element={<AddNew />} />
      <Route path="student-management" element={<StudentManagement />} />
      <Route path="tutor-management" element={<p>Tutor management</p>} />
     </Route>
     <Route path="/dashboard" element={<Dashboard />}>
      <Route index element={<Navigate to="profile" />} />
      <Route path="profile" element={<Profile />} />
     </Route>
    </Route>
   </Routes>
   <Modal ref={modalRef} />
   {!isShowingModal && (
    <Toaster
     position="top-center"
     toastOptions={{
      style: {
       display: isClosingModal ? "none" : "",
      },
     }}
    />
   )}
  </div>
 );
};

export default App;
