function renderEvents(data, container) {
  container.innerHTML = "";

  for (let i = 0; i < data.length; i++) {
    const link = document.createElement("a");
    link.href = `/displayevent/?id=${data[i].id}`;
    link.classList.add("event-link");

    const insertedEvent = document.createElement("div");
    insertedEvent.classList.add("inserted-event");

    const eventName = document.createElement("h3");
    eventName.classList.add("event-name");
    eventName.textContent = data[i].event_name;

    const hostName = document.createElement("p");
    hostName.classList.add("host-name");
    hostName.textContent = `Host Name: ${data[i].host_name}`;

    const eventDescription = document.createElement("p");
    eventDescription.classList.add("event-description");
    eventDescription.textContent = `Description: ${data[i].event_description}`;

    const eventLocation = document.createElement("p");
    eventLocation.classList.add("event-location");
    const str = data[i].location;
    const locationStr = str[0].toUpperCase() + str.slice(1).toLowerCase();
    eventLocation.textContent = `Location: ${locationStr}`;

    const eventDate = document.createElement("p");
    eventDate.classList.add("event-date");
    const formattedDate = new Date(data[i].date).toLocaleDateString("en-GB");
    eventDate.textContent = `Date: ${formattedDate}`;

    const eventTime = document.createElement("p");
    eventTime.classList.add("event-time");
    eventTime.textContent = `Time: ${data[i].time}`;

    const eventCategory = document.createElement("p");
    eventCategory.classList.add("event-category");
    eventCategory.textContent = `Category: ${data[i].category}`;

    insertedEvent.append(
      eventName,
      hostName,
      eventDescription,
      eventLocation,
      eventDate,
      eventTime,
      eventCategory
    );
    link.appendChild(insertedEvent);
    container.appendChild(link);
  }
}

async function fetchEvents() {
  const response = await fetch("http://localhost:8080/events", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  console.log(data);

  const eventsContainer = document.getElementById("events-container");
  renderEvents(data, eventsContainer);
}
fetchEvents();

const categorySelect = document.getElementById("filter-select");
const resultsList = document.getElementById("events-container");

categorySelect.addEventListener("change", async (event) => {
  const category = event.target.value;
  const response = await fetch(
    `http://localhost:8080/events?category=${category}`
  );
  const data = await response.json();
  renderEvents(data, resultsList);
});
