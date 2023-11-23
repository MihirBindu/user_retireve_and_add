// src/App.js
import React from "react";
import AddUser from "./components/AddUser";
import UserList from "./components/UserList";

function App() {
  return (
    <div className="App">
      <AddUser />
      <UserList />
    </div>
  );
}

export default App;
