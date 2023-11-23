// src/services/dynamoDbService.js
import AWS from "aws-sdk";
import { awsConfig } from "../awsconfig";

AWS.config.update(awsConfig);

const dynamoDB = new AWS.DynamoDB.DocumentClient();
const tableName = "dyn_data";

export const createItem = async (userData) => {
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

  const params = {
    TableName: tableName,
    Item: userData,
  };

  return dynamoDB.put(params).promise();
};

export const getItem = async (question) => {
  const params = {
    TableName: tableName,
    Key: {
      question: question,
    },
  };

  return dynamoDB.get(params).promise();
};

export const getAllItems = async () => {
  const params = {
    TableName: tableName,
  };

  return dynamoDB.scan(params).promise();
};

export const updateItem = async (question, updatedData) => {
  // Validate question before proceeding
  if (!question || question.trim() === "") {
    throw new Error("Question cannot be empty");
  }

  const params = {
    TableName: tableName,
    Key: {
      question: question,
    },
    UpdateExpression:
      "set #name = :name, #email = :email, #username = :username",
    ExpressionAttributeNames: {
      "#name": "name",
      "#email": "email",
      "#username": "username",
    },
    ExpressionAttributeValues: {
      ":name": updatedData.name,
      ":email": updatedData.email,
      ":username": updatedData.username,
    },
    ReturnValues: "UPDATED_NEW",
  };

  return dynamoDB.update(params).promise();
};

export const deleteItem = async (question) => {
  // Validate question before proceeding
  if (!question || question.trim() === "") {
    throw new Error("Question cannot be empty");
  }

  const params = {
    TableName: tableName,
    Key: {
      question: question,
    },
  };

  return dynamoDB.delete(params).promise();
};
