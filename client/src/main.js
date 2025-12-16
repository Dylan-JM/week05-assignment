
const eventsForm = document.getElementById("events-container");
eventsForm.addEventListener("submit", handleEvents);
function handleEvents(event)  {
    event.preventDefault();
    const formDataTemplate = new FormData(eventsForm);
    const formValues = Object.fromEntries(formDataTemplate);
    fetch("http://localhost:8080/events", {
        method: "POST",
        headers:    {
            "Content-type": "application/json",
        },
        body: JSON.stringify({ formValues }),
    });
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
  for (let i=0; i<data.length; i++)   {
    const insertedEvent = document.createElement("div");
    insertedEvent.classList.add("inserted-event");

    const eventName = document.createElement("h3");
    eventName.classList.add("event-name");
    eventName.textContent = data[i].event_name;

    const hostName = document.createElement("p");
    hostName.classList.add("host-name");
    hostName.textContent = `Host Name: ${data[i].host_name}`;

    const eventDescription = document.createElement("p");
    eventDescription.classList.add("event-name");
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
    
    insertedEvent.append(eventName, hostName, eventDescription, eventLocation, eventDate, eventTime, eventCategory);
    eventsContainer.appendChild(insertedEvent);
    }
}
fetchEvents();