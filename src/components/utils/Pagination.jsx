import React, { useState } from "react";

const Pagination = ({ curPage, pageNum }) => {
  let [num, setNum] = useState(1);
  let [cur, setCur] = useState(1);
  // console.log(pageNum);

  const pages = [
    { page: num },
    { page: num + 1 },
    { page: num + 2 },
    { page: num + 3 },
  ];

  function Next() {
    // console.log(`the pageNum is ${pageNum.length} and the num is ${num}`);
    if (num + 3 < pageNum.length) setNum(++num);
  }

  function Back() {
    num > 1 && setNum(--num);
  }

  const updatePage = (page) => {
    curPage(page);
    setCur(page);
  };

  return (
    <div className="flex items-center justify-center p-4 rounded-lg">
      <button
        onClick={Back}
        className="h-12 border-2  border-primary
        px-4 rounded-l-lg hover:bg-primary hover:text-white"
      >
        <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
          <path
            d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
            clipRule="evenodd"
            fillRule="evenodd"
          ></path>
        </svg>
      </button>

      {pages.map((pg, i) => (
        <button
          key={i}
          onClick={() => updatePage(pg.page)}
          className={`h-12 border-2 border-r-0 border-primary w-12 ${
            cur === pg.page && "bg-primary text-white"
          }`}
        >
          {pg.page}
        </button>
      ))}

      <button
        onClick={Next}
        className="h-12 border-2  border-primary
               px-4 rounded-r-lg hover:bg-primary hover:text-white"
      >
        <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
          <path
            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
            clipRule="evenodd"
            fillRule="evenodd"
          ></path>
        </svg>
      </button>
    </div>
  );
};

export default Pagination;
