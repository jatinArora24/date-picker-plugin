"use client"
import RecurringDatePicker from '../components/datePicker';

export default function Home() {
  type RecurrenceType = 'none' | 'daily' | 'weekly' | 'yearly' | 'monthly';

  const handleDateChange = (data: { date: Date | null; recurrence: RecurrenceType; daysOfWeek: number[] }) => {
    console.log('Selected Date and Recurrence:', data);
  };
  return (
    <div className="bg-white grid grid-rows-[20px_1fr_20px] text-black justify-content-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <RecurringDatePicker onChange={()=>handleDateChange}/>
    </div>
  );
}
