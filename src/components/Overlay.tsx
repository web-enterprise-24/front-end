import { Loader } from "lucide-react";

type PropsType = {
 isOpenLoader?: boolean;
};

const Overlay = ({ isOpenLoader = false }: PropsType) => {
 return (
  <div className="fixed inset-0 bg-gray-400/30 z-[9999] flex items-center justify-center">
   {isOpenLoader && <Loader className="animate-spin text-primary-content" />}
  </div>
 );
};

export default Overlay;
