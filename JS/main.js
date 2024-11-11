// Function to fetch tasks from the API
const userID = localStorage.getItem("userID");

if (userID) {
  // Function to fetch tasks from the API using the userID
  function fetchTasks() {
    fetch(`https://todoliist.runasp.net/api/List/AllTask?UserID=${userID}`)
      .then((response) => response.json()) // Parse the JSON from the response
      .then((data) => {
        renderTasks(data); // Render tasks once data is fetched
      })
      .catch((error) => {
        console.error("Error fetching tasks:", error);
      });
  }

  // Function to render tasks in the table
  function renderTasks(tasks) {
    const taskTable = document.getElementById("taskTable").querySelector("tbody");
    taskTable.innerHTML = ""; // Clear the current tasks

    tasks.forEach((task) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${task.task}</td>
        <td>${task.status ? "Completed" : "Incomplete"}</td>
        <td><button class="deleteBtn" data-id="${task.id}">Delete</button></td>
      `;

      // Add event listener for the delete button
      row.querySelector(".deleteBtn").addEventListener("click", () => {
        deleteTask(task.id);
      });

      taskTable.appendChild(row);
    });
  }

  // Initial fetch of tasks when the page loads
  fetchTasks();
} else {
  // Redirect to login page if no userID is found
  window.location.href = "login.html";
}

// Function to add a new task (this will send a POST request to your API)
// Function to add a new task (this will send a POST request to your API)
addTaskBtn.addEventListener('click', () => {
    const taskText = taskInput.value.trim();

    if (taskText !== '') {
        const listDTO = {
            id: 0,  // Assuming id is auto-generated on the server
            UserID: userID,
            task: taskText,
            status: false // Assuming status is a boolean (false = Incomplete)
        };

        // Send a POST request to the server to add the new task
        fetch('https://todoliist.runasp.net/api/List/AddNewTask', {
            method: 'POST',
            headers: {
                'accept': 'text/plain', // Adjusted header as per the cURL example
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(listDTO)
        })
        
        
        .then(response => {
            if (!response.ok) {
                // If the response status is not OK (not in the 2xx range), throw an error
                return response.text().then(text => {
                    throw new Error(`Failed to add task: ${text || response.statusText}`);
                });
            }
            return response.text(); // Read response as text if successful
        })
        .then(data => {
            console.log(data); // Log the success message or server response
            fetchTasks(); // Re-fetch the tasks after adding a new one
            taskInput.value = ''; // Clear the input field only after success
        })
        .catch(error => {
            console.error('Error adding task:', error);
        });
    }
});


// Function to delete a task (this will send a DELETE request to your API)
// Function to delete a task (this will send a DELETE request to your API)
function deleteTask(taskId) {
    fetch(`https://todoliist.runasp.net/api/List/DeleteTask?id=${taskId}`, {
        method: 'DELETE',
    })
    .then(response => {
        // Check if the response is successful (status code 200)
        if (!response.ok) {
            throw new Error('Failed to delete task');
        }
        
        // Check if the response is plain text (for success message)
        return response.text(); // Read response as text instead of JSON
    })
    .then(data => {
        console.log(data); // Log the response text (e.g., "Task with id X deleted successfully")
        fetchTasks(); // Re-fetch the tasks after deleting one
    })
    .catch(error => {
        console.error('Error deleting task:', error);
    });
}



// Initial fetch of tasks when the page loads
fetchTasks();
