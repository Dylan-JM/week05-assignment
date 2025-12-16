async function fetchEvents() {
  const response = await fetch("https://localhost:8080/events", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  console.log(data);
}
