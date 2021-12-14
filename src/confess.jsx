import { Button, ListItem, ListItemText, Fab } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import React from "react";
import { db } from "./firebase_config";
import './confess.css'

export default function Confess({ confession, guilty_or_not, id }) {


  function toggleProcess() {
   db.collection("confess").doc(id).update({
     guilty_or_not:!guilty_or_not
   })
  }

  return (
    <div className="confess">
      <ListItem>
        <ListItemText
          primary={confession}
          secondary={guilty_or_not ? "Yes sometimes..." : "IDGAF"}
        />
      </ListItem>
      <Button onClick={toggleProcess}>{guilty_or_not ? "Good" : "Bad"}</Button>
    </div>
  );
}
