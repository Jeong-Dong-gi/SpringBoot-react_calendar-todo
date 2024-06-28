import * as React from "react";
import dayjs from "dayjs";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import TodoCard from "./TodoCard";

export default function DateCalendarValue() {
  const [value, setValue] = React.useState(dayjs);

  let val = JSON.stringify(value);

  let date = val.toString().substring(1, 11);

  return (
    <div className="all">
      <div className="calendar">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={["DateCalendar"]}>
            <DemoItem>
              <DateCalendar
                value={value}
                onChange={(newValue) => setValue(newValue)}
              />
            </DemoItem>
          </DemoContainer>
        </LocalizationProvider>
      </div>
      <div className="card">
        <TodoCard value={date} />
      </div>
    </div>
  );
}
