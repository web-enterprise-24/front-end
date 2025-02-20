import { useState } from "react";
import AddStudentForm from "./AddUserForm";

const AddNew = () => {
 const [tabActive, setTabActive] = useState(1);
 return (
  <div className="flex flex-col items-center justify-center gap-8 mt-6">
   <div role="tablist" className="tabs tabs-boxed font-bold ">
    <a
     role="tab"
     className={`tab ${tabActive === 1 && "tab-active"}`}
     onClick={() => {
      setTabActive(1);
     }}
    >
     Student
    </a>

    <a
     role="tab"
     className={`tab ${tabActive === 2 && "tab-active"}`}
     onClick={() => {
      setTabActive(2);
     }}
    >
     Tutor
    </a>
    <a
     role="tab"
     className={`tab ${tabActive === 3 && "tab-active"}`}
     onClick={() => {
      setTabActive(3);
     }}
    >
     Staff
    </a>
   </div>
   <div className="w-3/5 mx-auto">
    {
     <AddStudentForm
      role={tabActive === 1 ? "STUDENT" : tabActive === 2 ? "TUTOR" : "STAFF"}
     />
    }
   </div>
  </div>
 );
};

export default AddNew;
