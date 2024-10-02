"use client";
import { useState } from "react";

interface TodoItem {
  list: string;
  id: number;
}

export default function TodoApp() {
  // Define states
  const [todo, setTodo] = useState<TodoItem[]>([
    { list: "learning next.js", id: 1 },
    { list: "watching movie", id: 2 },
  ]);
  const [inputStat, setInput] = useState<string>("");
  const [id, setId] = useState<number>(0);
  const [expandedItems, setExpandedItems] = useState<number[]>([]); 

  // Add function
  const addItem = () => {
    if (inputStat.trim() === "") return;

    if (id !== 0) {
      const arr = todo.map((item) =>
        item.id === id ? { list: inputStat, id: id } : item
      );
      setTodo(arr);
      setInput("");
      setId(0);
    } else {
      // Adding new item with a unique id
      const newId = new Date().getTime();
      setTodo([...todo, { list: inputStat, id: newId }]);
      setInput("");
    }
  };

  // Delete function
  const deleteItem = (id: number) => {
    const arr = todo.filter((item) => item.id !== id);
    setTodo(arr);
  };

  // Edit function
  const editItem = (id: number) => {
    const obj = todo.find((item) => item.id === id);
    if (obj) {
      setInput(obj.list);
      setId(obj.id);
    }
  };

  // Toggle expanded/collapsed state
  const toggleExpand = (id: number) => {
    if (expandedItems.includes(id)) {
      setExpandedItems(expandedItems.filter((itemId) => itemId !== id));
    } else {
      setExpandedItems([...expandedItems, id]);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-5 md:p-10 mt-7 font-serif">
      {/* Heading */}
      <h1 className="text-center md:text-[50px] text-3xl font-medium">
        To-do App
      </h1>

      {/* Input div */}
      <div className="flex flex-wrap justify-between items-center mt-8 gap-3 md:gap-6">
        <input
          type="text"
          placeholder="Name of items"
          value={inputStat}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 px-7 py-3 min-w-[60%] rounded-2xl focus:outline-none border-2 border-blue-800 capitalize"
        />

        {/* Add button */}
        <button
          onClick={addItem}
          className="bg-blue-800 hover:bg-blue-900 duration-500 text-white px-7 py-3 rounded-xl w-full md:w-auto"
        >
          Add
        </button>
      </div>

      {/* Task lists */}
      <div className="mt-12">
        <div className="grid grid-cols-1 gap-4 justify-center mt-4">
          {todo.map((item, i) => {
            const isExpanded = expandedItems.includes(item.id);
            return (
              <div
                className="border-2 shadow-sm bg-white p-4 rounded-xl flex flex-wrap justify-between items-center gap-3"
                key={item.id} // Use item.id as the key
              >
                <span className="text-gray-800 font-medium text-lg">{i + 1}</span>

                {/* Toggle content based on expanded state */}
                <div className="text-xl text-gray-800 leading-7 break-words flex-1 overflow-hidden">
                  {isExpanded ? (
                    <div>
                      {item.list}
                      <button
                        onClick={() => toggleExpand(item.id)}
                        className="text-blue-500 ml-2"
                      >
                        .....
                      </button>
                    </div>
                  ) : (
                    <div>
                      {item.list.length > 40
                        ? `${item.list.substring(0, 40)}...`
                        : item.list}
                      {item.list.length > 40 && (
                        <button
                          onClick={() => toggleExpand(item.id)}
                          className="text-blue-500 text-sm ml-2"
                        >
                          read more
                        </button>
                      )}
                    </div>
                  )}
                </div>

                {/* Delete, Edit buttons */}
                <div className="flex gap-3 md:w-auto justify-end">
                  <button
                    onClick={() => editItem(item.id)}
                    className="bg-blue-800 hover:bg-blue-900 duration-500 text-white text-sm p-2 px-5 rounded-xl"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteItem(item.id)}
                    className="bg-red-500 hover:bg-red-600 duration-500 text-white text-sm p-2 px-5 rounded-xl"
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
