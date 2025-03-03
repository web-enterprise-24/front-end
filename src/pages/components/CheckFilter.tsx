import { forwardRef } from "react";

type PropsType = {
 id: string;
 title: string;
 onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const CheckFilter = forwardRef<HTMLInputElement, PropsType>(
 ({ id, title, onChange }, ref) => {
  return (
   <label
    htmlFor={id}
    className="flex flex-row items-center justify-between gap-2"
   >
    <span className="font-bold text-sm">{title}</span>
    <input
     ref={ref}
     id={id}
     type="checkbox"
     className="toggle toggle-sm"
     onChange={(e) => onChange(e)}
    />
   </label>
  );
 }
);

export default CheckFilter;
