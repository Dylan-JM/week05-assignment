const eventsForm = document.getElementById("create-event-form");
eventsForm.addEventListener("submit", handleEvents);

async function handleEvents(event) {
  event.preventDefault();

  const formData = new FormData(eventsForm);
  const hostName = formData.get("event-form-host-name");
  const eventName = formData.get("event-form-name");
  const eventDescription = formData.get("event-form-description");
  const category = formData.get("event-form-category");
  const date = formData.get("event-form-date");
  const time = formData.get("event-form-time");
  const location = formData.get("event-form-location");

  await fetch("http://localhost:8080/events", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      hostName,
      eventName,
      category,
      date,
      time,
      eventDescription,
      location,
    }),
  });

  eventsForm.reset();
  await fetchEvents();
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
  eventsContainer.innerHTML = "";

  for (let i = 0; i < data.length; i++) {
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
    eventLocation.textContent = `Location: ${data[i].location}`;

    const eventDate = document.createElement("p");
    eventDate.classList.add("event-date");
    eventDate.textContent = `Date: ${data[i].date}`;

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
    eventsContainer.appendChild(insertedEvent);
  }
}
fetchEvents();
