import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import { addPost } from "../action";

export default function FormDialog({
  onPostCreated,
}: {
  onPostCreated: Function;
}) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries((formData as any).entries());
    const title = formJson.title;
    const body = formJson.body;

    const result = await addPost({ title, body });
    if (result._id) onPostCreated();
    handleClose();
  };

  return (
    <React.Fragment>
      <Button
        variant="contained"
        onClick={handleClickOpen}
        sx={{ borderRadius: "10px" }}
      >
        Add New Post
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Post</DialogTitle>
        <DialogContent sx={{ paddingBottom: 0 }}>
          <DialogContentText>
            Add a title and a description and your post will be displayed live
          </DialogContentText>
          <form onSubmit={handleSubmit} style={{ margin: "20px 0" }}>
            <TextField
              autoFocus
              required
              margin="dense"
              id="title"
              name="title"
              label="Title"
              variant="outlined"
              type="text"
              fullWidth
            />
            <TextareaAutosize
              aria-label="Enter a description"
              minRows={3}
              minLength={10}
              placeholder="Body"
              required
              name="body"
              id="body"
              style={{
                width: "97%",
                borderRadius: "4px",
                padding: "8px",
                margin: "20px 0",
              }}
            />
            <DialogActions>
              <Button onClick={handleClose} variant="outlined">
                Cancel
              </Button>
              <Button type="submit" variant="contained">
                Submit
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}
