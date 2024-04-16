import React from 'react';

const DateFormatter = ({ date }) => {
  // Create a new Date object using the input date
  const dateObj = new Date(date);

  // Format the date using toLocaleDateString method
  const formattedDate = dateObj.toLocaleDateString('en-US', {
    month: 'short', // Abbreviated month (e.g. "Apr")
    day: 'numeric', // Numeric day (e.g. "4")
    year: 'numeric' // Numeric year (e.g. "2024")
  });

  return (
    <p className=''>
      <span className=''>Date:</span> {formattedDate}
    </p>
  );
};

export default DateFormatter;
