import Header from "../../components/HeaderManagementUser";
import { Table } from "../../../components";
import { useEffect } from "react";
import { useManagementStore } from "../../../store";

const StudentManagement = () => {
 const getUserLists = useManagementStore((state) => state.getUserLists);
 useEffect(() => {
  getUserLists("STUDENT");
 }, []);

 return (
  <div className="w-full h-full">
   <Header title="All Students" />
   <Table />
  </div>
 );
};

export default StudentManagement;
