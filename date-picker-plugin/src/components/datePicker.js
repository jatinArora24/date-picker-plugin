"use client"
import React, { useState } from 'react';

import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

const RecurringDatePicker = ({ onChange }) => {
  const [startDate, setStartDate] = useState(new Date());
  const [recurrence, setRecurrence] = useState('none');
  const [daysOfWeek, setDaysOfWeek] = useState([]);
  const [day,setDay] = useState("");
  const handleDateChange = (date) => {
    console.log(date);
    setStartDate(date);
    onChange({ date, recurrence, daysOfWeek });
  };

  const handleRecurrenceChange = (e) => {
    setRecurrence(e.target.value);
    if (e.target.value === 'none') {
      setDaysOfWeek([]);
    }
    onChange({ date: startDate, recurrence: e.target.value, daysOfWeek });
  };
  const handleDayOftheMonth = (e) => {
    setDay(e.target.value);

  };

  const handleDaysChange = (day) => {
    let updatedDays = [...daysOfWeek];
    if (updatedDays.includes(day)) {
      updatedDays = updatedDays.filter((d) => d !== day);
    } else {
      updatedDays.push(day);
    }
    setDaysOfWeek(updatedDays);
    onChange({ date: startDate, recurrence, daysOfWeek: updatedDays });
  };

  return (
    <div>
      <DatePicker
        selected={startDate}
        onChange={handleDateChange}
        dateFormat="yyyy/MM/dd"
        maxDate={"2025/01/01"}
        minDate={new Date()}
        inline
      />

      <div style={{ marginTop: '10px' }}>
        <label>
          Recurrence: 
          <select value={recurrence} onChange={handleRecurrenceChange}>
            <option value="none">None</option>
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>

          </select>
        </label>
      </div>
      {recurrence === 'daily' && (
        <div>
          <label className='flex justify-content-center'> {Array.from({ length: 31 }, (_, i) => (
 <div  key={i}>  <input type='checkbox' defaultChecked={true} value={i+1}>
    </input> {i+1} </div> 
  ))}</label>
        </div>
      )}
      {recurrence === 'weekly' && (
        <div>
          <label>Select Days of the Week:</label>
          <div>
            {['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map((day, index) => (
              <label key={index}>
                <input
                  type="checkbox"
                  checked={daysOfWeek.includes(index)}
                  onChange={() => handleDaysChange(index)}
                />
                {day}
              </label>
            ))}
          </div>
        </div>
      )}
       
 {recurrence === 'monthly' && (
        <div>
          <label>Monthly date: <select value={day} onChange={handleDayOftheMonth}>
          {Array.from({ length: 31 }, (_, i) => (
    <option key={i} value={i+1}>
      {i+1}
    </option>
  ))}
          </select></label>
          {day == 29 || day ==30||day ==31 && 
                  <label>  <input type='checkbox'></input>
Use last day of the Month if the given does not exist.</label>}
        </div>
      )}
      {recurrence === 'yearly' && (
        <div>
          <label>Every Year on  {startDate.getDate()}/{startDate.getMonth()+1}</label>
        </div>
      )}
    </div>
    
  );
};

export default RecurringDatePicker;
