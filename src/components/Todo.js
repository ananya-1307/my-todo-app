import React, { useState, useEffect } from 'react'
import "./style.css"

const getLocalData = () => {
  const lists = localStorage.getItem("myTodoList");
  if (lists) {
    return JSON.parse(lists);
  }
  else {
    return [];
  }
}

const Todo = () => {
  const [inputData, setInputData] = useState("");
  const [items, setItems] = useState(getLocalData());
  const [isEditItem, setIsEditItem] = useState("");
  const [toggleButton, setToggleButton] = useState(false);

  //add the items 
  const addItems = () => {
    if (!inputData) {
      alert("please fill the data")
    }
    else if (inputData && toggleButton) {
      setItems(
        items.map((currEle) => {
          if (currEle.id === isEditItem) {
            return { ...currEle, name: inputData }
          }
          return currEle;
        })
      );
      setInputData("");
      setIsEditItem(null);
      setToggleButton(false);
    }
    else {
      const myNewInputData = {
        id: new Date().getTime().toString(),
        name: inputData,
      }
      setItems([...items, myNewInputData])
      setInputData("");
    }
  }

  //editItems
  const editItems = (index) => {
    const edit_item = items.find((currEle) => {
      return currEle.id === index;
    });
    setInputData(edit_item.name);
    setIsEditItem(index);
    setToggleButton(true);

  }

  //delete item
  const deleteItem = (index) => {
    const updatedItems = items.filter((currEle) => {
      return currEle.id !== index;
    });
    setItems(updatedItems);
  }

  // delete all items
  const removeAll = () => {
    setItems([]);
  }

  //adding local storage
  useEffect(() => {
    localStorage.setItem("myTodoList", JSON.stringify(items));
  }, [items])








  return (
    <>
      <div className="main-div">
        <div className="child-div">
          <figure>
            <img src="./images/todo.svg" alt="todologo"></img>
            <figcaption>Add your list here ✌️ </figcaption>
            <div className="addItems"></div>
          </figure>
          <div className="addItems">
            <input type="text" placeholder='✍️ ADD ITEMS'
              className="form-control" value={inputData} onChange={(event) => setInputData(event.target.value)} />

            {toggleButton ? (
              <i className="far fa-edit add-btn" aria-hidden="true" onClick={addItems} ></i>
            ) : (
              <i className="fa fa-plus add-btn" aria-hidden="true" onClick={addItems} ></i>
            )
            }

          </div>
          {/* show items */}
          <div className="showItems">
            {items.map((currEle) => {
              return (
                <div className="eachItem" key={currEle.id}>
                  <h3>{currEle.name}</h3>
                  <div className="todo-btn">
                    <i className="far fa-edit add-btn" aria-hidden="true" onClick={() => editItems(currEle.id)}></i>
                    <i className="far fa-trash-alt add-btn" aria-hidden="true" onClick={() => deleteItem(currEle.id)}></i>
                  </div>
                </div>
              );
            })}


          </div >
          <div className="showItems"><button className='btn effect04' onClick={removeAll} >
            <span>Check List</span>
          </button>
          </div>
        </div>


      </div>
    </>
  )
}

export default Todo
