
const eventsForm = document.getElementById("events-container");
eventsForm.addEventListener("sumbmit", handleEvents);
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