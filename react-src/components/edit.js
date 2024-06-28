import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { useState } from "react";
import EditNoteIcon from '@mui/icons-material/EditNote';

export default function Edit ({data, fetchTodo}) {
  var doday = []
  const [open, setOpen] = useState(false);
  const [todo, setTodo] = useState({
    title: "",
    detail: "",
    startDay : "",
    endDay : "",
    doing : "",
    complete : ""
  })

  const handleClickOpen = () => {
    setTodo({
    title: data.row.title,
    detail: data.row.detail,
    startDay : data.row.startDay,
    endDay : data.row.endDay,
    doing : data.row.doing,
    complete: data.row.complete
    })
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  function daydiff(startDay, endDay) {
    if(typeof(startDay)==="string" && typeof(endDay)==="string") {
      var arr1 = startDay.split('-')
      var arr2 = endDay.split('-')
      var start = new Date(arr1[0], arr1[1]-1, arr1[2])
      var end = new Date(arr2[0], arr2[1]-1, arr2[2])
      var day = start.getTime() - end.getTime()
      var daysub = Math.abs(day / (1000 * 60 * 60 * 24))
  
      for(let i = 0; i<=daysub ; i++) {
        doday[i] = new Date(start.setDate(start.getDate() + 1))
      }
    }
    return doday
  }

  const doingendDayChange = (e) =>{
    if(e.target.value.replace(/-/g,"")-todo.startDay.replace(/-/g,"")>=0) {
      setTodo({...todo, endDay:e.target.value,  doing:daydiff(todo.startDay, e.target.value)})
    }
    else {
      alert("시작 날짜보다 더 늦은 날짜를 선택해주세요")
    }
  }

  const doingstartDayChange = (e) =>{
    if(e.target.value.replace(/-/g,"")-todo.endDay.replace(/-/g,"")<=0) {
      setTodo({...todo, startDay:e.target.value, doing:daydiff(e.target.value, todo.endDay)})
    }
    else {
      alert("마지막 날짜보다 더 빠른 날짜를 선택해주세요")
    }
  }

  const contentChange = (e) => {
    setTodo({...todo, [e.target.name]:e.target.value})
  }

  const updateTodo = (url) => {
    setTodo({...todo, doing:daydiff()})
    fetch(url,{
      method: "PUT",
      headers : { "Content-Type":"application/json"},
      body: JSON.stringify(todo),
    })
      .then(()=>{
        fetchTodo();
      })
      .catch(err=>console.error(err))
  }

  const handleSave = () => {
    updateTodo(data.id);
    handleClose();
  }

  return (
    <>
      <EditNoteIcon onClick={handleClickOpen}/>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: (event) => {
            event.preventDefault();
            handleClose();
          },
        }}
      >
        <DialogTitle><p className="Ti">Todo</p></DialogTitle>
        <DialogContent>
          <p className="tp">Title</p>
          <TextField className="todoTitle"
            autoFocus
            required
            margin="dense"
            id="title"
            name="title"
            type="text"
            value={todo.title}
            onChange={contentChange}
            variant="standard"
          />
          <p className="dp">Detail</p>
          <TextField className="detail"
            margin="dense"
            id="detail"
            name="detail"
            type="text"
            value={todo.detail}
            onChange={contentChange}
            variant="standard"
          />
          <div>
            <p className="sp">StartDay</p>
            <TextField className="startDay"
            margin="dense"
            id="startDay"
            name="startDay"
            type="date"
            value={todo.startDay}
            onChange={doingstartDayChange}
            variant="standard"
          />
          </div>
          <p className="ep">EndDay</p>
          <TextField className="endDay"
            margin="dense"
            id="endDay"
            name="endDay"
            type="date"
            value={todo.endDay}
            onChange={doingendDayChange}
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}