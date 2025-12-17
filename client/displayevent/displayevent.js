const commentForm = document.querySelector("#commentForm");

// get event id from the URL
const urlID = new URLSearchParams(window.location.search);
const selectedEventId = urlID.get("id");

function renderEvent(data, container) {
  container.innerHTML = "";

  const insertedEvent = document.createElement("div");
  insertedEvent.classList.add("inserted-event");

  const eventName = document.createElement("h3");
  eventName.classList.add("event-name");
  eventName.textContent = data.event_name;

  const hostName = document.createElement("p");
  hostName.classList.add("host-name");
  hostName.textContent = `Host Name: ${data.host_name}`;

  const eventDescription = document.createElement("p");
  eventDescription.classList.add("event-description");
  eventDescription.textContent = `Description: ${data.event_description}`;

  const eventLocation = document.createElement("p");
  eventLocation.classList.add("event-location");
  eventLocation.textContent = `Location: ${data.location}`;

  const eventDate = document.createElement("p");
  eventDate.classList.add("event-date");
  eventDate.textContent = `Date: ${data.date}`;

  const eventTime = document.createElement("p");
  eventTime.classList.add("event-time");
  eventTime.textContent = `Time: ${data.time}`;

  const eventCategory = document.createElement("p");
  eventCategory.classList.add("event-category");
  eventCategory.textContent = `Category: ${data.category}`;

  insertedEvent.append(
    eventName,
    hostName,
    eventDescription,
    eventLocation,
    eventDate,
    eventTime,
    eventCategory
  );
  container.appendChild(insertedEvent);
}

async function fetchEvents() {
  const response = await fetch(
    `http://localhost:8080/events/${selectedEventId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const data = await response.json();
  console.log(data);

  const eventsContainer = document.getElementById("event-details-container");
  renderEvent(data, eventsContainer);
}
fetchEvents();

async function handleSubmitCommentForm(event) {
  event.preventDefault();

  const formData = new FormData(commentForm);
  const name = formData.get("name");
  const comment = formData.get("comment");

  await fetch("http://localhost:8080/events/comments", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ selectedEventId, name, comment }),
  });

  document.getElementById("commentForm").reset();
  await fetchComments(selectedEventId);
}

commentForm.addEventListener("submit", handleSubmitCommentForm);

async function fetchComments(eventId) {
  console.log("Fetching comments for event ID:", selectedEventId);
  const response = await fetch(
    `http://localhost:8080/events/comments?event_id=${eventId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const data = await response.json();
  console.log(data);

  const list = document.getElementById("comment-list");
  list.innerHTML = "";

  data.comments.forEach((event) => {
    const listItem = document.createElement("li");

    const commentText = document.createElement("span");
    commentText.textContent = `${event.name} ${event.comment}`;

    const commentContainer = document.createElement("div");
    commentContainer.classList.add("comment-container");
    commentContainer.appendChild(commentText);
    listItem.appendChild(commentContainer);
    list.appendChild(listItem);
  });
}

fetchComments(selectedEventId);
