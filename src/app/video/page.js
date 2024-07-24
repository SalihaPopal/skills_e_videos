"use client";

import { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";


export default function Login() {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");

  async function handleAddingVideo(e) {
    e.preventDefault();

    try {
      await fetch("/api/video", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newVideo),
      })
        .then((response) => response.json())
        .then((response) => {
          alert("Video added successful");
          setTitle("");
          setUrl("");
          setOpen(close);
        });
    } catch (error) {
      console.log("Failed adding video", error);
      alert("An error occurred while adding video. Please try again.", error);
    }
  }

  // const handleClickOpen = () => {
  //   setOpen(true);
  // };

  // const handleClose = () => {
  //   setOpen(false);
  // };

  return (
    <div className="w-full max-w-md">
      <Button variant="outlined" onClick={handleClickOpen}>
        Sign in
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{ style: { height: "280px" } }}
      >
        <form onSubmit={handleAddingVideo}>
          <DialogTitle>Sign in</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              required
              margin="dense"
              id="title"
              name="title"
              label="Video title"
              type="text"
              fullWidth
              variant="standard"
              value={title}
              onChange={(e) =>
                setTitle({ ...title, title: e.target.value })
              }
            />
            <TextField
              autoFocus
              required
              margin="dense"
              id="url"
              name="url"
              label="Video url"
              type="text"
              fullWidth
              variant="standard"
              value={url}
              onChange={(e) =>
                setLoginUser({ ...url, url: e.target.value })
              }
            />
          </DialogContent>
          <DialogActions>
            {/* <Button onClick={handleClose}>Cancel</Button> */}
            <Button type="submit" className="btn btn-outline btn-primary w-full text-white-400 bg-sky-500/100">Sign in</Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}
