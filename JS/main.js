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
  // دالة لعرض المهام في الجدول
  function renderTasks(tasks) {
    const taskTable = document.getElementById("taskTable").querySelector("tbody");
    taskTable.innerHTML = "";  // Clear the current tasks

    if (tasks.length === 0) {
        const row = document.createElement("tr");
        row.innerHTML = `<td colspan="3">No tasks available. Add a new task!</td>`;
        taskTable.appendChild(row);
    } else {
        tasks.forEach((task) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${task.task}</td>
                <td>${task.status ? "Completed" : "Incomplete"}</td>
                <td>
                    <button class="doneBtn" data-id="${task.id}" ${task.status ? "disabled" : ""}>Done</button>
                </td>
                <td>
                    <button class="deleteBtn" data-id="${task.id}">Delete</button>
                </td>
            `;

            // Event listener for marking the task as done
            row.querySelector(".doneBtn").addEventListener("click", () => {
                updateTaskStatus(task.id, row);
            });

            // Event listener for deleting the task
            row.querySelector(".deleteBtn").addEventListener("click", () => {
                deleteTask(task.id, row);
            });

            taskTable.appendChild(row);
        });
    }
}

// Function to update task status
async function updateTaskStatus(taskId, row) {
    try {
        const response = await fetch(`https://localhost:7246/api/List/UpdateTask?id=${taskId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id: taskId,
                userID: 0,  // Set appropriate userID here
                task: row.querySelector("td:first-child").textContent,
                status: true
            }),
        });

        if (response.ok) {
            // Update the row to show task as completed
            row.querySelector("td:nth-child(2)").textContent = "Completed";
            row.querySelector(".doneBtn").disabled = true;
            document.getElementById('task-th').style.backgroundColor="Green";
        } else {
            console.error("Failed to update task status:", response.statusText);
        }
    } catch (error) {
        console.error("Error updating task status:", error);
    }
}

// Dummy function to delete the task
// function deleteTask(taskId, row) {
//     // Implement task deletion logic here
//     console.log(`Delete task with ID ${taskId}`);
//     row.remove();  // Remove the row from the table as an example
// }



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
// حذف مهمة
// حذف مهمة
function deleteTask(taskId, rowElement) {
    fetch(`https://todoliist.runasp.net/api/List/DeleteTask?id=${taskId}`, {
        method: 'DELETE',
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to delete task');
        }
        return response.text();
    })
    .then(data => {
        console.log(data);  // طباعة الاستجابة بنجاح
        // إزالة صف المهمة المحذوفة مباشرة من الجدول
        rowElement.remove();  // حذف صف المهمة من DOM
        fetchTasks();  // إعادة تحميل المهام بعد الحذف
    })
    .catch(error => {
        console.error('Error deleting task:', error);
    });
}




// Initial fetch of tasks when the page loads
fetchTasks();
