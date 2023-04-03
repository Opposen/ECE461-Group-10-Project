function handleFormSubmit(event: Event) {
    const errorElement = document.getElementById("error") as HTMLFormElement;
    const username = document.getElementById("username") as HTMLInputElement;
    const password = document.getElementById("password") as HTMLInputElement;
    let messages: string[] = [];
    if (username.value === "" || username.value === null) {
        messages.push("Username is required");
    }
    if (password.value.length < 5) {
        messages.push("Password should be at least 5 chacaters");
    }
    if (messages.length > 0) {
        event.preventDefault();
        errorElement.innerText = messages.join(",");
    } else {
        event.preventDefault();
        window.location.href = "search/try.html";
    }
}

const form = document.getElementById("form");
form.addEventListener("submit", handleFormSubmit);
