
import React, { useState } from 'react'
import DateFnsUtils from '@date-io/date-fns'
import {
  DatePicker,
  TimePicker,
  DateTimePicker,
  MuiPickersUtilsProvider
} from '@material-ui/pickers'
export default function BasicDatePicker() {
  const [selectedDate, handleDateChange] = useState(null)

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <DatePicker value={selectedDate} onChange={handleDateChange} />
      
      
    </MuiPickersUtilsProvider>
  )
}
