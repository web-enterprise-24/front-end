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
 TutorManagement,
 AllocationManagement,
} from "./pages";
import { MainLayout, LayoutSidebar } from "./layouts";
import { Modal } from "./components";
import { useAuthStore, useGeneralStore } from "./store";
import { Loader } from "lucide-react";
import ChangePasswordForm from "./components/ChangePasswordForm";

const App = () => {
 const [isCheckingAuth, checkAuth, accessToken, authUser] = useAuthStore(
  useShallow((state) => [
   state.isCheckingAuth,
   state.checkAuth,
   state.accessToken,
   state.authUser,
  ])
 );
 const [setModalElement, isShowingModal, isClosingModal, setModalFor] =
  useGeneralStore(
   useShallow((state) => [
    state.setModalElement,
    state.isShowingModal,
    state.isClosingModal,
    state.setModalFor,
   ])
  );

 const modalRef = useRef<HTMLDialogElement | null>(null);

 useEffect(() => {
  checkAuth(accessToken);
 }, [accessToken, checkAuth]);

 useEffect(() => {
  if (!isClosingModal) {
   setModalFor(null);
  }
 }, [isClosingModal]);

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

 if (authUser?.requiredPasswordChange) {
  return (
   <div className="w-screen h-screen flex flex-col justify-center items-center gap-14 max-md:p-4">
    <Toaster position="top-center" />
    <div className="size-40">
     <img src="/logo.webp" alt="Logo" />
    </div>
    <h1 className="font-bold text-xl">
     Please change your password at the first access!
    </h1>
    <ChangePasswordForm />
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
      <Route path="tutor-management" element={<TutorManagement />} />
      <Route path="allocation-management" element={<AllocationManagement />} />
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
