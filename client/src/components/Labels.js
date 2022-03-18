import React from "react";
import { getLabels } from "../helper/helper";
import { default as api } from "../store/apiSlice";

// const obj = [
//   {
//     type: "Savings",
//     color: "rgb(255, 99, 132)",
//     percent: 45,
//   },
//   {
//     type: "Investment",
//     color: "#f9c74f",
//     percent: 20,
//   },
//   {
//     type: "Expense",
//     color: "rgb(54, 162, 235)",
//     percent: 10,
//   },
// ];

const Labels = () => {
  const { data, isFetching, isSuccess, isError } = api.useGetLabelsQuery();
  let Transactions;

  if (isFetching) {
    Transactions = <p>Fetching...</p>;
  } else if (isSuccess) {
    console.log();
    Transactions = getLabels(data, "type").map((v, l) => <LabelComponent key={l} data={v} />);
  } else if (isError) {
    Transactions = <p>Error</p>;
  }
  return <>{Transactions}</>;
};

export default Labels;

function LabelComponent({ data }) {
  if (!data) return <></>;
  return (
    <div className='labels flex justify-between'>
      <div className='flex gap-2'>
        <div
          className='w-2 h-2 rounded py-3'
          style={{ background: data.color ?? "#f9c74f" }}
        ></div>
        <h3 className='text-md'>{data.type ?? ""}</h3>
      </div>
      <h3 className='font-bold'>{Math.round(data.percent) ?? 0}%</h3>
    </div>
  );
}
