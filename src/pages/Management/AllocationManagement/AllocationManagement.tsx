import { useEffect, useRef, useState } from "react";
import Selection from "./Selection";
import { AllocateSendType, UserType } from "../../../types";
import { useManagementStore } from "../../../store";
import { useShallow } from "zustand/shallow";
import { useDebounce } from "../../../hooks";
import ConfirmModal from "../../../components/ConfirmModal";
import { LoaderCircle } from "lucide-react";

const AllocationManagement = () => {
 const [
  getUserLists,
  isGettingTutorLists,
  isGettingStudentLists,
  tutorLists,
  studentLists,
  setCurrentPageTutor,
  setCurrentPageStudent,
  totalPageTutor,
  totalPageStudent,
  currentPageTutor,
  currentPageStudent,
  setSearchResult,
  setTutorLists,
  setStudentLists,
  allocateStudent,
  isAllocating,
  setAllocation,
 ] = useManagementStore(
  useShallow((state) => [
   state.getUserLists,
   state.isGettingTutorLists,
   state.isGettingStudentLists,
   state.tutorLists,
   state.studentLists,
   state.setCurrentPageTutor,
   state.setCurrentPageStudent,
   state.totalPageTutor,
   state.totalPageStudent,
   state.currentPageTutor,
   state.currentPageStudent,
   state.setSearchResult,
   state.setTutorLists,
   state.setStudentLists,
   state.allocateStudent,
   state.isAllocating,
   state.setAllocation,
  ])
 );
 const [tutor, setTutor] = useState<UserType>({} as UserType);
 const [students, setStudents] = useState<UserType[]>([]);
 const [tutorSearch, setTutorSearch] = useState("");
 const [studentSearch, setStudentSearch] = useState("");

 const tutorSearchDebounce = useDebounce(tutorSearch, 1500);
 const studentSearchDebounce = useDebounce(studentSearch, 1500);

 const dialogConfirmRef = useRef<HTMLDialogElement | null>(null);

 //  useEffect(() => {
 //   getUserLists("TUTOR", true);
 //   getUserLists("STUDENT", true);
 //   // eslint-disable-next-line react-hooks/exhaustive-deps
 //  }, []);

 useEffect(() => {
  // reset previous value
  setTutorLists();
  setCurrentPageTutor(0, true);
  setAllocation("unallocated");

  setSearchResult(tutorSearchDebounce);
  getUserLists("TUTOR", true);
 }, [
  getUserLists,
  setAllocation,
  setCurrentPageTutor,
  setSearchResult,
  setTutorLists,
  tutorSearchDebounce,
 ]);

 useEffect(() => {
  // reset previous value
  setStudentLists();
  setCurrentPageStudent(0, true);

  setSearchResult(studentSearchDebounce);
  getUserLists("STUDENT", true);
 }, [
  getUserLists,
  setCurrentPageStudent,
  setSearchResult,
  setStudentLists,
  studentSearchDebounce,
 ]);

 const handleClickTutor = (tutorInput: UserType) => {
  if (tutor.id === tutorInput.id) {
   setTutor({} as UserType);
   return;
  }

  setTutor(tutorInput);
 };

 const handleClickStudent = (studentInput: UserType) => {
  let index = 0;
  let checkExist = false;

  students.forEach((student, i) => {
   if (student.id === studentInput.id) {
    index = i;
    checkExist = true;
   }
  });

  if (checkExist) {
   const modifyStudents = [...students];
   modifyStudents.splice(index, 1);
   setStudents(modifyStudents);
   return;
  }

  setStudents([...students, studentInput]);
 };

 const getUsersOnScroll = (role: "TUTOR" | "STUDENT") => {
  if (role === "TUTOR") {
   if (isGettingTutorLists) return;
   if (totalPageTutor === currentPageTutor) return;

   //    Call API
   setCurrentPageTutor(1);
   getUserLists(role, true);
  } else if (role === "STUDENT") {
   if (isGettingStudentLists) return;
   if (totalPageStudent === currentPageStudent) return;

   //    Call API
   setCurrentPageStudent(1);
   getUserLists(role, true);
  }
 };

 const handleSearchTutor = (e: React.ChangeEvent<HTMLInputElement>) => {
  setTutorSearch(e.target.value);
 };

 const handleChangeStudent = (e: React.ChangeEvent<HTMLInputElement>) => {
  setStudentSearch(e.target.value);
 };

 const handleClickConfirmAllocation = () => {
  let data: AllocateSendType = {} as AllocateSendType;
  const tutorId = tutor.id;
  const studentIds = students.map((student) => student.id);
  data = {
   tutorId,
   studentIds,
  };

  //   call api
  allocateStudent(data);
  setTutorSearch("");
  setStudentSearch("");
  setTutor({} as UserType);
  setStudents([]);
 };

 return (
  <div className="w-full h-full p-6">
   <ConfirmModal
    ref={dialogConfirmRef}
    title="Please confirm your action."
    events={[handleClickConfirmAllocation]}
   />
   <div className="w-full h-full flex flex-col gap-10">
    <div className="flex flex-row max-[1025px]:flex-col max-[1025px]:gap-6 justify-around">
     {/* Choose tutor */}
     <Selection
      title="Please choose tutor"
      isLoading={isGettingTutorLists}
      data={tutorLists}
      selectedUser={tutor}
      searchText={tutorSearch}
      getUserOnScroll={getUsersOnScroll}
      onClick={handleClickTutor}
      onChange={handleSearchTutor}
     />
     {/* Choose students */}
     <Selection
      title="Please choose student(s)"
      isLoading={isGettingStudentLists}
      data={studentLists}
      selectedUser={students}
      searchText={studentSearch}
      getUserOnScroll={getUsersOnScroll}
      onClick={handleClickStudent}
      onChange={handleChangeStudent}
     />
    </div>
    <div className="w-full text-center">
     <button
      className="btn btn-secondary"
      onClick={() =>
       dialogConfirmRef.current && dialogConfirmRef.current.showModal()
      }
      disabled={!!tutor.id && !!students[0] ? false : true}
     >
      {isAllocating ? <LoaderCircle className="animate-spin" /> : "Submit"}
     </button>
    </div>
   </div>
  </div>
 );
};

export default AllocationManagement;
