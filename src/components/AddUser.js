// src/components/AddUser.js
import React, { useState } from "react";
import { createItem } from "../services/dynamoDbService";

const AddUser = () => {
  const [userData, setUserData] = useState({
    question: "",
    options: {
      option1: "",
      option2: "",
      option3: "",
      option4: "",
    },
    name: "",
    email: "",
    username: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleOptionChange = (e, optionNumber) => {
    const { value } = e.target;

    setUserData((prevData) => ({
      ...prevData,
      options: {
        ...prevData.options,
        [`option${optionNumber}`]: value,
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Validate question and options before proceeding
      if (
        !userData.question ||
        userData.question.trim() === "" ||
        Object.values(userData.options).some((option) => option.trim() === "")
      ) {
        throw new Error("Question and options cannot be empty");
      }

      // Use the question as the primary key
      userData.userId = userData.question;

      await createItem(userData);
      alert("User added successfully!");
      setUserData({
        question: "",
        options: {
          option1: "",
          option2: "",
          option3: "",
          option4: "",
        },
        name: "",
        email: "",
        username: "",
      });
    } catch (error) {
      console.error("Error adding user:", error);
      alert("Error adding user. Please try again.");
    }
  };

  return (
    <div>
      <h2>Add User</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Question:
          <input
            type="text"
            name="question"
            value={userData.question}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Option 1:
          <input
            type="text"
            name="option1"
            value={userData.options.option1}
            onChange={(e) => handleOptionChange(e, 1)}
          />
        </label>
        <br />
        <label>
          Option 2:
          <input
            type="text"
            name="option2"
            value={userData.options.option2}
            onChange={(e) => handleOptionChange(e, 2)}
          />
        </label>
        <br />
        <label>
          Option 3:
          <input
            type="text"
            name="option3"
            value={userData.options.option3}
            onChange={(e) => handleOptionChange(e, 3)}
          />
        </label>
        <br />
        <label>
          Option 4:
          <input
            type="text"
            name="option4"
            value={userData.options.option4}
            onChange={(e) => handleOptionChange(e, 4)}
          />
        </label>
        <br />
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={userData.name}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Email:
          <input
            type="text"
            name="email"
            value={userData.email}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Username:
          <input
            type="text"
            name="username"
            value={userData.username}
            onChange={handleChange}
          />
        </label>
        <br />
        <button type="submit">Add User</button>
      </form>
    </div>
  );
};

export default AddUser;
