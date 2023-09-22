const getMonthName = (monthNumber) => {
  // Create an array of month names
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // Check if the input is a valid month number (between 1 and 12)
  if (monthNumber >= 1 && monthNumber <= 12) {
    // Subtract 1 from the month number to get the correct index in the array
    const monthIndex = monthNumber - 1;

    // Return the corresponding month name
    return months[monthIndex];
  } else {
    // Handle invalid input
    return "Invalid month number";
  }
};

export default getMonthName;
