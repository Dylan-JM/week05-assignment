async function fetchEvents() {
  const response = await fetch("http://localhost:8080/events", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  console.log(data);
}
fetchEvents();
