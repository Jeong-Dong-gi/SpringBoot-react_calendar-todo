import TaskIcon from '@mui/icons-material/Task';
import { gridColumnsTotalWidthSelector } from '@mui/x-data-grid';
import { useState } from 'react';

export default function Complete ({data, fetchTodo}) {

  const [todo, setTodo] = useState({
    title: data.row.title,
    detail: data.row.detail,
    startDay : data.row.startDay,
    endDay : data.row.endDay,
    doing : data.row.doing,
    complete: data.row.complete
  })

  function completeChange () {
    todo.complete = !todo.complete
    return todo.complete
  }

  const completeClick = (url) => {
    // 완료하려고 하는 경우
    if(todo.complete===false && window.confirm("완료하겠습니까?")) {
        setTodo({...todo, complete:completeChange()})
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
    // 완료를 하지 못한 경우
    else if(todo.complete===true && window.confirm("완료를 취소하겠습니까?")) {
      setTodo({...todo, complete:completeChange()})
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
  }

  return (
    <>
      <TaskIcon onClick={()=>{completeClick(data.id)}}/>
    
    </>
  )
}