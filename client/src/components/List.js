import React from "react";
import { BiTrash } from "react-icons/bi";
const obj = [
  {
    name: "Savings",
    color: "rgb(255, 99, 132)",
  },
  {
    name: "Investment",
    color: "#f9c74f",
  },
  {
    name: "Expense",
    color: "rgb(54, 162, 235)",
  },
];

const List = () => {
  return (
    <div className='flex flex-col py-6 gap-3'>
      <h1 className='py-4 font-bold text-xl'>History</h1>
      {obj.map((v, i) => (
        <Transaction key={i} category={v} />
      ))}
    </div>
  );
};

function Transaction({ category }) {
  if (!category) return null;
  return (
    <div
      className='item flex justify-center bg-gray-50 py-2 rounded-r'
      style={{ borderRight: `8px solid ${category.color ?? "#e5e5e5"}` }}
    >
      <button className='px-3'>
        <BiTrash
          data-id={category._id ?? ""}
          color={category.color ?? "#e5e5e5"}
          size='15px'
        />
      </button>
      <span className='block w-full'>{category.name ?? ""}</span>
    </div>
  );
}
export default List;
