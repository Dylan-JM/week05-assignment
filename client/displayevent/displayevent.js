const commentForm = document.querySelector("#commentForm");

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
    body: JSON.stringify({ name, comment }),
  });

  document.getElementById("commentForm").reset();
  await fetchComments();
}

commentForm.addEventListener("submit", handleSubmitCommentForm);

async function fetchComments(eventId) {
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

fetchComments(2);
