
interface LabelledInputType {
    label:string;
    type?:string;
    placeholder:string;
    onchange: (e: React.ChangeEvent<HTMLInputElement>)=>void;
}

const LabelledInput = ({label, type, placeholder, onchange}: LabelledInputType) => {
  return (
    <div>
       <label className="block mb-2 text-sm font-medium text-gray-900 pt-4">{label}</label>
       <input type={type || 'text'} id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder={placeholder} onChange={onchange} />
    </div>
  )
}
export {LabelledInput}