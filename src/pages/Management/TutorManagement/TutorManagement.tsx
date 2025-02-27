import { useEffect } from "react";
import { Table } from "../../../components";
import { useManagementStore } from "../../../store";
import Header from "../../components/HeaderManagementUser";

const TutorManagement = () => {
 const getUserLists = useManagementStore((state) => state.getUserLists);

 useEffect(() => {
  getUserLists("TUTOR");

  // eslint-disable-next-line react-hooks/exhaustive-deps
 }, []);

 return (
  <div className="w-full h-full">
   <Header title="All Tutors" />
   <Table role="TUTOR" />
  </div>
 );
};

export default TutorManagement;
