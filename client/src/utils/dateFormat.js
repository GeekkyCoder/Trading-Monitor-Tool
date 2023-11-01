export const dateFormat = (date) => {
  const originalDate = new Date(date);

  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const day = originalDate.getDate();
  const month = originalDate.getMonth(); // 0-based index
  const year = originalDate.getFullYear();
  const dayName = originalDate.toLocaleString("en-US", { weekday: "long" }); // Full day name

  // formating date
  const formattedDate = `${(month + 1).toString().padStart(2, "0")}-${day
    .toString()
    .padStart(2, "0")}-${year} (${dayName})`;

  return formattedDate; // Output: "11-01-2023 (Wednesday)"
};
