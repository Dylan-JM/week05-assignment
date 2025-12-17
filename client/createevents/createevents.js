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
  const time = `${formData.get("event-form-time-start")} to ${formData.get(
    "event-form-time-end"
  )}`;
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
}
