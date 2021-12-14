import React, { useState,useEffect } from "react";
import "./app.css";
import TextField from "@mui/material/TextField";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import Button from "@mui/material/Button";
import { db } from "./firebase_config";
import Confess from './confess'
import Footer from './footer'



function App() {
  const [state, setState] = useState("");
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    getTodo();
  }, []);
  function getTodo() {
    db.collection("confess").onSnapshot(function (querySnapshot){
      setTodos(                                                                                                                                                 
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          confession: doc.data().confession,
          guilty_or_not: doc.data().guilty_or_not,
          // timestamps:doc.data().timestamps
        }))
      );
    });
  }

  function handleChange(event) {
    setState(event.target.value);
  }

  function addTodo(event) {
    event.preventDefault();

    db.collection("confess").add({
      guilty_or_not: true,
      timestamps: firebase.firestore.FieldValue.serverTimestamp(),
      confession: state,
    });
    setState("");
  }

  return (
    <section>
    <div className="app">
      <h1>Confess your SECRETS</h1>
      <div className="sub_app">
        <form>
        <TextField
            id="standard-basic"
            label="Spit it out"
            value={state}
            style={{ width: "90vw", maxWidth: "500px" }}
            onChange={handleChange}
          />
          
          <Button
            onClick={addTodo}
            style={{ display: "none" }}
            type="submit"
            variant="contained"
          >
            Add
          </Button>
        </form>
        {todos.map((todo) => (
          <Confess confession={todo.confession}
          guilty_or_not={todo.guilty_or_not}
          id={todo.id}
          />
        ))}
      </div>
      <hr />
      <div>
        <Footer />
      </div>
    </div>
    </section>
  );
}
export default App;
