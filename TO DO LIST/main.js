const inputValue = document.querySelector(".input-value");
const ul = document.querySelector("ul");

// Load tasks from local storage on page load
document.addEventListener("DOMContentLoaded", loadTasks);

function addToDo() {
    if (inputValue.value === "") {
        // selecting popup
       let popupContainer = document.querySelector(".popup-container");
       popupContainer.style.display="block";

       let popupClose = document.querySelector(".popupClose");
       popupClose.addEventListener("click", function(){
        popupContainer.style.display= "none"
       })

    } else {
        let li = document.createElement("li");
        ul.appendChild(li); // Make and append li element

        li.innerHTML = `<input type="checkbox" class="checkbox">` + `<p class="result"></p>` + `<img src="./images/delete.svg" alt="">`; //`<button>Delete</button>`;

        let result = li.querySelector(".result");
        result.innerText = inputValue.value; // Put the input value

        let checkBox = li.querySelector(".checkbox"); // Selecting checkbox from li element
        checkBox.type = 'checkbox';
        checkBox.value = 'checkMe';
        checkBox.name = 'myCheckbox';

        checkBox.addEventListener('change', function () {
            if (checkBox.checked) {
                result.style.textDecoration = "line-through";
            }
            else {
                result.style.textDecoration = "none";
            }
            updateLocalStorage();
        });

        let delButton = li.querySelector("img"); // Remove button
        delButton.src = "./images/delete.svg";
        delButton.addEventListener("click", remove);
        function remove() {
            li.remove();
            updateLocalStorage();
        }

        updateLocalStorage();
    }
    inputValue.value = ""; // When I write some text in the input field and click add button to display clear
}


// press enter to create li
function handleKeyPress(event) {
    if (event.key === "Enter") {
        addToDo();
    }
}




// Function to load tasks from local storage
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(task => {
        let li = document.createElement("li");
        ul.appendChild(li);

        li.innerHTML = `<input type="checkbox" class="checkbox">` + `<p class="result"></p>` + `<img src="./images/delete.svg" alt="">`;

        let result = li.querySelector(".result");
        result.innerText = task.value;

        let checkBox = li.querySelector(".checkbox");
        checkBox.checked = task.checked;
        result.style.textDecoration = task.checked ? "line-through" : "none";

        let delButton = li.querySelector("img");
        delButton.src = "./images/delete.svg";
        delButton.addEventListener("click", remove);
        function remove() {
            li.remove();
            updateLocalStorage();
        }
        ////////
        checkBox.addEventListener("change", function () {
            if (checkBox.checked) {
                result.style.textDecoration = "line-through";
            } else {
                result.style.textDecoration = "none";
            }
            updateLocalStorage()
        });
        ///////////
    });
}

// Function to update local storage
function updateLocalStorage() {
    const tasks = Array.from(ul.children).map(li => ({
        value: li.querySelector(".result").innerText,
        checked: li.querySelector(".checkbox").checked
    }));
    localStorage.setItem("tasks", JSON.stringify(tasks));
}






























