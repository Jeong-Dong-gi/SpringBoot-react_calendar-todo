import BackspaceIcon from '@mui/icons-material/Backspace';

export default function Delete ({ data, fetchTodo }) {
  
  const deleteClick=(url)=>{
    if(window.confirm("삭제하시겠습니까?")) {
    fetch(url,{method:"delete"})
      .then(()=>{
        fetchTodo()
      })
      .catch(err=>console.error(err))
    }
  }

  return (
    <>
      <BackspaceIcon onClick={()=>deleteClick(data.id)}/>
    </>
  )
}