import React, { useState, useEffect, useCallback } from "react";
import sunIcon from "./images/icon-sun.svg";

const Home = () => {
  // usestates
  const [items, setItems] = useState([]);
  const [input, setInput] = useState("");
  const [checkedItems, setCheckedItems] = useState([]);
  const [displayedItems, setDisplayedItems] = useState(items);
  const [displayAll, setDisplayAll] = useState(true);

  const handleCheckboxChange = (e, index) => {
    const updatedCheckedItems = [...checkedItems];
    if (e.target.checked) {
      updatedCheckedItems.push(index);
    } else {
      updatedCheckedItems.splice(updatedCheckedItems.indexOf(index), 1);
    }
    setCheckedItems(updatedCheckedItems);

    if (displayAll) {
      setDisplayedItems(items);
    } else {
      setDisplayedItems(
        items.filter((item, index) => checkedItems.includes(index))
      );
    }
  };

  // all button
  const displayAllItems = () => {
    setDisplayedItems(items);
    setDisplayAll(true);
  };

  // active button
  const filterUncheckedItems = () => {
    setDisplayedItems(
      items.filter((item, index) => !checkedItems.includes(index))
    );
    setDisplayAll(false);
  };

  //  completed button
  const filterCheckedItems = () => {
    setDisplayedItems(
      items.filter((item, index) => checkedItems.includes(index))
    );
    setDisplayAll(false);
  };

  // remove individual item function
  const handleRemoveItem = useCallback(
    (index) => {
      const newList = [...items];
      newList.splice(index, 1);
      setItems(newList);
    },
    [items]
  );

  const handleChange = (event) => {
    setInput(event.target.value);
  };

  const handleKeyDown = (event) => {
    // event.preventDefault();

    if (event.key === "Enter") {
      setItems(items.concat(input));
      setInput("");
    }
  };

  // useEffect
  useEffect(() => {
    if (displayAll) {
      setDisplayedItems(items);
    } else {
      setDisplayedItems(
        items.filter((item, index) => checkedItems.includes(index))
      );
    }
  }, [items, checkedItems, displayAll]);

  return (
    <div className="w-1/3 m-auto flex flex-col">
      <div className="font-body flex justify-between">
        <p className="uppercase tracking-wider text-xl font-bold inline-block">
          todo
        </p>
        <button className="inline-block">
          <img src={sunIcon} alt="sun icon" />
        </button>
      </div>
      {/* todo list input */}
      <div className="bg-listBgColor rounded-md">
        <div>
          <input
            type="checkbox"
            // name={}
            // value={}
            className="mx-3"
          />
          <input
            type="text"
            value={input}
            placeholder="Enter your Todo"
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            className="m-4 ml-0"
          />
        </div>
        {/* displaying the todo list */}
        <div className="">
          <ul className="">
            {displayedItems.map((item, index) => (
              <li key={item} className="flex border-b-2 border-b-white py-3">
                {/* checkbox */}
                <input
                  type="checkbox"
                  id={`checkbox-${index}`}
                  checked={checkedItems.includes(index)}
                  onChange={(e) => handleCheckboxChange(e, index)}
                  className="mr-3 rounded-full ml-3"
                />
                <label
                  className={`text ${
                    checkedItems.includes(index) ? "line-through" : ""
                  }`}
                  htmlFor={`checkbox-${index}`}
                >
                  {item}
                </label>

                <button
                  className="ml-auto mr-3"
                  onClick={() => handleRemoveItem(index)}
                >
                  X
                </button>
              </li>
            ))}
          </ul>
          <div className="flex justify-between mx-3 my-2">
            <div className="">{displayedItems.length} items left</div>
            <div className="">
              <button className="mx-2 ml-0" onClick={displayAllItems}>
                All
              </button>
              <button className="mx-2" onClick={filterUncheckedItems}>
                Active
              </button>
              <button className="mx-2 mr-0" onClick={filterCheckedItems}>
                Completed
              </button>
            </div>
            <div>
              <button className="">clear completed</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
