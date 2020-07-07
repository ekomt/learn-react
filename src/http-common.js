import axios from "axios";
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI3YjQyNzE4YS1iYjFiLTQ3ZWUtNzEzNy0wOGQ4MWYyNjlhNzIiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiZWtvQG1haWwuY29tIiwianRpIjoiOGMzNjAxYWQtMjczMC00YjE3LWJmNjktZDNiNjU2YzgwNmUyIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvbmFtZWlkZW50aWZpZXIiOiI3YjQyNzE4YS1iYjFiLTQ3ZWUtNzEzNy0wOGQ4MWYyNjlhNzIiLCJleHAiOjE1OTY2MzUwMDIsImlzcyI6Imh0dHA6Ly9sb2NhbGhvc3Q6NTAwMCIsImF1ZCI6Imh0dHA6Ly9sb2NhbGhvc3Q6NTAwMCJ9.vVhrXDWRQfHulVDH5YKw7vUR1GCOCKTJrwlyQuE40bc';

const http = axios.create({
  baseURL: "https://localhost:5001/api",
  headers: {
    "Content-type": "application/json"
  }
});

const securehttp = axios.create({
    baseURL: "https://localhost:5001/api",
    headers: {
      "Content-type": "application/json",
      "Authorization": `bearer ${token}`
    }
  });
  
export default {
    http, securehttp
};