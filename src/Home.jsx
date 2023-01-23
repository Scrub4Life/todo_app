import React, { useCallback, useReducer } from "react";
import sunIcon from "./images/icon-sun.svg";

const initialState = {
  items: [],
  input: "",
  checkedItems: [],
  completedItems: [],
  displayedItems: [],
  displayAll: true,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_ITEM":
      return {
        ...state,
        items: state.items.concat(action.payload),
        displayedItems: state.items.concat(action.payload),
        input: "",
      };
    case "REMOVE_ITEM":
      return {
        ...state,
        items: state.items.filter((item, index) => index !== action.payload),
        displayedItems: state.items.filter(
          (item, index) => index !== action.payload
        ),
        checkedItems: state.checkedItems.filter(
          (item) => item !== action.payload
        ),
      };
    case "FILTER_CHECKED":
      return {
        ...state,
        displayedItems: state.items.filter((item, index) =>
          state.checkedItems.includes(index)
        ),
        displayAll: false,
      };
    case "FILTER_UNCHECKED":
      return {
        ...state,
        displayedItems: state.items.filter(
          (item, index) => !state.checkedItems.includes(index)
        ),
        checkedItems: state.checkedItems.filter(
          (item) => !state.displayedItems.includes(state.items[item])
        ),
        displayAll: false,
      };
    case "DISPLAY_ALL":
      return {
        ...state,
        displayedItems: [...state.items],
        displayAll: true,
      };
    case "HANDLE_CHECK":
      let updatedCheckedItems = [...state.checkedItems];
      let updatedCompletedItems = [...state.completedItems];
      if (action.payload.checked) {
        updatedCheckedItems.push(action.payload.index);
        updatedCompletedItems.push(action.payload.index);
      } else {
        updatedCheckedItems.splice(
          updatedCheckedItems.indexOf(action.payload.index),
          1
        );
        updatedCompletedItems.splice(
          updatedCompletedItems.indexOf(action.payload.index),
          1
        );
      }
      return {
        ...state,
        checkedItems: updatedCheckedItems,
        completedItems: updatedCompletedItems,
        displayedItems: state.displayAll ? state.items : state.displayedItems,
      };
    case "HANDLE_CHANGE":
      return {
        ...state,
        input: action.payload,
      };
    case "CLEAR_COMPLETED":
      return {
        ...state,
        completedItems: action.payload,
      };
    case "CLEAR_CHECKED":
      const newCompletedItems = completedItems.filter(
        (item) => !action.payload.includes(state.items[item])
      );
      handleClearCompleted(completedItems, newCompletedItems);
      return {
        ...state,
        items: action.payload,
        displayedItems: action.payload,
        checkedItems: [],
      };

    default:
      return state;
  }
};

const Home = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { items, input, checkedItems, displayedItems, displayAll } = state;

  const handleCheckboxChange = (e, index) => {
    dispatch({
      type: "HANDLE_CHECK",
      payload: { checked: e.target.checked, index },
    });
  };

  const filterCheckedItems = () => {
    dispatch({ type: "FILTER_CHECKED" });
  };

  const filterUncheckedItems = () => {
    dispatch({ type: "FILTER_UNCHECKED" });
  };

  const displayAllItems = () => {
    dispatch({ type: "DISPLAY_ALL" });
  };

  const handleChange = (event) => {
    dispatch({ type: "HANDLE_CHANGE", payload: event.target.value });
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      dispatch({ type: "ADD_ITEM", payload: input });
    }
  };

  const handleRemoveItem = useCallback(
    (index) => {
      dispatch({ type: "REMOVE_ITEM", payload: index });
    },
    [dispatch]
  );

  const handleClearChecked = () => {
    const newItems = items.filter(
      (item, index) => !checkedItems.includes(index)
    );
    dispatch({ type: "CLEAR_CHECKED", payload: newItems });
  };

  const handleClearCompleted = (completedItems, newCompletedItems) => {
    dispatch({ type: "CLEAR_COMPLETED", payload: newCompletedItems });
  };

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
      <div className="bg-listBgColor rounded-md">
        <div>
          <input type="checkbox" className="mx-3" />
          <input
            type="text"
            value={input}
            placeholder="Enter your Todo"
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            className="m-4 ml-0"
          />
        </div>
        <div className="">
          <ul className="todo-list">
            {displayedItems.map((item, index) => (
              <li
                key={index}
                className={`flex border-b-2 border-b-white py-3 todo-item ${
                  state.completedItems.includes(index) ? "line-through" : ""
                }`}
              >
                <input
                  type="checkbox"
                  checked={state.checkedItems.includes(index)}
                  onChange={(e) => handleCheckboxChange(e, index)}
                  className="mr-3 rounded-full ml-3"
                />
                <label
                  className={`text ${
                    completedItems.includes(index) ? "line-through" : ""
                  }`}
                  htmlFor={`checkbox-${index}`}
                >
                  <span className="text-lg ">{item}</span>
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
        </div>
        <div className="flex justify-between mx-3 my-2">
          <div className="counter">{displayedItems.length} items left</div>
          <button onClick={filterCheckedItems} className="text-sm">
            Filter Checked
          </button>
          <button onClick={filterUncheckedItems} className="text-sm">
            Filter Unchecked
          </button>
          <button onClick={displayAllItems} className="text-sm">
            Display All
          </button>
          <div>
            <button className="clear" onClick={handleClearChecked}>
              Clear Checked
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
