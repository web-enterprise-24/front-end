import { useEffect, useState } from "react";
import AddUserForm from "./AddUserForm";
import { useGeneralStore } from "../../../store";

const AddNew = () => {
 const getProvinces = useGeneralStore((state) => state.getProvinces);

 useEffect(() => {
  getProvinces();
 }, [getProvinces]);

 const [tabActive, setTabActive] = useState(1);
 return (
  <div className="w-full flex flex-col items-center justify-center gap-8 mt-4">
   <div role="tablist" className="tabs tabs-boxed font-bold">
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
   <div className="w-full p-4 xl:p-0 xl:w-3/5 mx-auto">
    {
     <AddUserForm
      role={tabActive === 1 ? "STUDENT" : tabActive === 2 ? "TUTOR" : "STAFF"}
     />
    }
   </div>
  </div>
 );
};

export default AddNew;
