import React, { useState } from "react";

const ArrowDropDown = ({ name, data, updateData }) => {
  const options = data.length > 0 ? data : [];

  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    console.log(option);
    updateData(option);
    setIsOpen(false);
  };

  console.log(options);

  let display = (
    <div className="flex flex-col  relative w-full my-1">
      <span className="label-text ">{name}</span>

      <div className="inline-block relative w-full my-1">
        <div className="relative w-full inline-block">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="block appearance-none w-full bg-white border border-primary hover:border-primary-focus px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
          >
            {selectedOption ? (
              <div className="flex items-center">
                <img
                  src={selectedOption.icon}
                  alt="Image"
                  className="w-6 h-6 mr-2"
                />
                {selectedOption.name}
              </div>
            ) : (
              "Select an option"
            )}
          </button>
          {isOpen && (
            <div className="absolute z-10 mt-2 w-full max-h-48 overflow-y-auto">
              <div className="bg-white border border-primary divide-y divide-primary shadow-md rounded">
                {options.map((option, index) => (
                  <button
                    key={index}
                    className="flex items-center p-2 w-full hover:bg-primary-hover"
                    onClick={() =>
                      //   {
                      //   updateData(option.value);
                      //   setIsOpen(false);
                      // }
                      handleOptionClick(option)
                    }
                  >
                    <img
                      src={option.icon}
                      alt="Image"
                      className="w-6 h-6 mr-2"
                    />
                    {option.name}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg
              className="fill-current h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );

  if (options[0].icon === undefined) {
    display = (
      <div className="flex flex-row justify-around items-center relative w-full my-1">
        <span className="label-text mx-5">{name}</span>

        <div className="inline-block relative w-64 my-1">
          <select
            className="block appearance-none w-full bg-white border border-primary hover:border-primary-focus px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
            onChange={(e) => {
              updateData(e.target.value);
              console.log(e.target.value);
            }}
          >
            {options.map((option, index) => (
              <option key={index}>{option}</option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg
              className="fill-current h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
            </svg>
          </div>
        </div>
      </div>
    );
  }

  return display;
};

export default ArrowDropDown;
