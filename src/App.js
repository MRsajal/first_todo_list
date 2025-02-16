import { useState } from "react";

export default function App() {
  const [list, setList] = useState([]);
  function handleAddList(listItem) {
    setList((list) => [...list, listItem]);
    console.log(list);
  }
  function handleDeleteItems(id) {
    setList((items) => items.filter((item) => item.id !== id));
  }
  function handleToggleList(id) {
    setList((items) =>
      items.map((item) =>
        item.id === id ? { ...item, done: !item.done } : item
      )
    );
  }
  function handleClearList() {
    const confirmed = window.confirm(
      "Are you sure you want ot delete all items?"
    );
    if (confirmed) setList([]);
  }
  return (
    <>
      <Header />
      <AddingItem addItem={handleAddList} />
      <List
        items={list}
        deleteItem={handleDeleteItems}
        toggleItem={handleToggleList}
        clearList={handleClearList}
      />
      <Footer />
    </>
  );
}

function Header() {
  return (
    <header>
      <div className="header">
        <h1>Todo-List</h1>
      </div>
    </header>
  );
}

function AddingItem({ addItem }) {
  const [quantity, setQuantity] = useState("0h");
  const [description, setDescription] = useState("");
  function handleSubmit(e) {
    e.preventDefault();
    if (!description) return;
    const newItem = { description, quantity, done: false, id: Date.now() };
    addItem(newItem);
    setDescription("");
    setQuantity("0h");
  }
  return (
    <form onSubmit={handleSubmit} className="form">
      <select
        className="form-select"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
      >
        {Array.from({ length: 24 }, (_, i) => `${i}h`).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        className="input-form"
        type="text"
        placeholder="Todo"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button>Add</button>
    </form>
  );
}

function List({ items, deleteItem, toggleItem, clearList }) {
  const [sortBy, setSortBy] = useState("input");
  let sortedList;
  if (sortBy === "input") sortedList = items;
  if (sortBy === "description")
    sortedList = items
      .slice()
      .sort((a, b) => a.description.localeCompare(b.description));
  if (sortBy === "done")
    sortedList = items.slice().sort((a, b) => Number(a.done) - Number(b.done));
  return (
    <div className="List">
      <ul>
        {sortedList.map((item) => (
          <Item
            item={item}
            deleteItem={deleteItem}
            toggleItem={toggleItem}
            key={item.id}
          />
        ))}
      </ul>
      <div className="sorting">
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="input">Sort by input order</option>
          <option value="description">Sort by description</option>
          <option value="done">Sort by done status</option>
        </select>
        <button onClick={clearList}>Clear List</button>
      </div>
    </div>
  );
}
function Item({ item, deleteItem, toggleItem }) {
  return (
    <li>
      <input
        type="checkbox"
        value={item.done}
        onChange={() => toggleItem(item.id)}
      />
      <span style={item.done ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}
      </span>
      <button style={{ margin: "2px" }} onClick={() => deleteItem(item.id)}>
        ❌
      </button>
    </li>
  );
}
function Footer() {
  return (
    <footer>
      <h2>Track your daily activity here.</h2>
    </footer>
  );
}
