// src/components/UserList.js
import React, { useState, useEffect } from "react";
import { getAllItems } from "../services/dynamoDbService";

const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const result = await getAllItems();
      setUsers(result.Items);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div>
      <h2>User List</h2>
      <button onClick={fetchData}>Retrieve Data</button>
      {users.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>Question</th>
              <th>Option 1</th>
              <th>Option 2</th>
              <th>Option 3</th>
              <th>Option 4</th>
              <th>Name</th>
              <th>Email</th>
              <th>Username</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.question}>
                <td>{user.question}</td>
                <td>{user.options.option1}</td>
                <td>{user.options.option2}</td>
                <td>{user.options.option3}</td>
                <td>{user.options.option4}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.username}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UserList;
