import * as React from "react";
import AspectRatio from "@mui/joy/AspectRatio";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import Typography from "@mui/joy/Typography";
import { DataGrid } from "@mui/x-data-grid";

import { useState,useEffect } from "react";
import InputTodo from "./inputTodo";
import { Box } from "@mui/material";
import Edit from "./edit";
import Delete from "./delete" ;
import Complete from "./complete";

export default function TodoCard({ value }) {

  // 목록 선택에 따라 필터를 조정할 변수 선언
  const [filter, setFilter] = useState({
    filterField: "doing",
    filterValue: value
  })

  useEffect(()=>{
    if(filter.filterValue!==true && filter.filterValue!=="-") {
      setFilter({...filter, filterValue: value})
    }
  },[value])

  let fField = `${filter.filterField}`
  let fValue = `${filter.filterValue}`

  // 날짜에 포함된 할일 출력
  const todoDay = () => {
    setFilter({ filterField:"doing", filterValue: value })
    console.log("테스트1")
  }

  // 완료 목록 출력
  const complDay = () =>{
    return (
    setFilter({ filterField:"complete", filterValue: true}),
    console.log("테스트2")
    )
  }

  // 전체 목록 출력
  const totalDay = () => {
    setFilter({ filterField:"doing", filterValue:"-" })
    console.log("테스트3")
  }

  const [todos, setTodos] = useState([])

  const fetchTodo=()=>{
    fetch("http://localhost:8080/api/cals")
      .then(response => response.json())
      .then(data=> setTodos(data._embedded.cals))
      .catch(err=>console.error(err))
  }

  useEffect(()=>{
    fetchTodo()
  })

  const columns=[
    {field:"title", headerName:"Title", width:300, filterable:false},
    {field:"detail", headerName:"Detail", width:700, filterable:false},
    {field:"startDay", headerName:"StartDay", width:120,filterable:false},
    {field:"endDay", headerName:"EndDay", width:120, filterable:false},
    {field:"doing", headerName:"", filterable:false},
    {field:"complete", headerName:"", filterable:false},
    {
      field:"edit",
      headerName:"",
      width:70,
      sortable:false,
      filterable:false,
      renderCell:(row)=>
        <Edit 
          data={row}
          fetchTodo={fetchTodo}
        />
    },
    {
      field:"compl",
      headerName:"",
      width:70,
      sortable:false,
      filterable:false,
      renderCell:(row)=>
      <Complete
        data={row}
        fetchTodo={fetchTodo}
      />
    },
    {
      field:"delete",
      headerName:"",
      width:70,
      sortable:false,
      filterable:false,
      renderCell:(row)=>
        <Delete 
          data={row}
          fetchTodo={fetchTodo}
        />
    }
  ]
  
  return (
    <>
    <Card sx={{ width: 1500, height: 600 }}>

      <CardContent orientation="horizontal" className="cardTop">
        <button className="todoList" onClick={()=>todoDay()}>
          할일 목록
        </button>
        <button className="completeList" onClick={()=>complDay()}>
          완료 목록
        </button>
        <button className="todoList" onClick={()=>totalDay()}>
          전체 목록
        </button>
      <div className="title">
        <Typography level="title-lg" fontSize={45}>{value}
        <InputTodo fetchTodo={fetchTodo} value={value} />
        </Typography>
      </div>
      </CardContent>

      <AspectRatio minHeight="500px" maxHeight="500px" color="primary">
      <Box sx={{ height: 600, width: '100%' }}>
      
      <DataGrid className="data"
        columns={columns}
        rows={todos}
        getRowId={row=>row._links.self.href}
        filterModel={{
          items: [{ field: `${fField}`, operator: 'contains', value: `${fValue}` }],
        }}
        initialState={{
          columns: {
            // 컬럼 숨기기
            columnVisibilityModel: {
              doing: false,
              complete: false
            },
          },
          sorting: {
            sortModel: [{ field:"complete", sort: "asc"}],
          },
          pagination: {
            paginationModel: {
              pageSize: 7,
            },
          },
        }}
        pageSizeOptions={[7]}
        disableRowSelectionOnClick={true}
        />
      </Box>
      </AspectRatio>
      
    </Card>
    </>
    
  );
}
