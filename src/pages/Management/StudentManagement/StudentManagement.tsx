import Header from "../../components/HeaderManagementUser";
import { Table } from "../../../components";
import { useEffect } from "react";
import { useManagementStore } from "../../../store";

const StudentManagement = () => {
 const getUserLists = useManagementStore((state) => state.getUserLists);
 useEffect(() => {
  getUserLists("STUDENT");
  // eslint-disable-next-line react-hooks/exhaustive-deps
 }, []);

 return (
  <div className="w-full h-full overflow-x-auto">
   <Header title="All Students" />
   <Table role="STUDENT" />
  </div>
 );
};

export default StudentManagement;
