const getTaskTemplate = (title) => `
  <li>
    <input type="checkbox" class="task-checkbox" id="${title}">
    <label for="${title}"></label>
    <span class="task-text">${title}</span>
    <button class="delete-task">❌</button>
  </li>
`;

const addTask = (title) => {
  const taskHtml = getTaskTemplate(title);
  $("#tasks-list").append(taskHtml);
};

$("#tasks-list").on("click", ".delete-task", function () {
  $(this).closest("li").remove();
});

$("#add").on("click", function () {
  const taskText = $("#task").val().trim();
  if (taskText) {
    addTask(taskText);
    $("#task").val("");
  }
});

$(".input-container").on("keydown", function(e){
    if(e.which === 13){
        addTask()
    }
});


const fetchTasks = async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/todos?_limit=9");
  const data = await response.json();
  const tasksHtml = data.map((task) => getTaskTemplate(task.title)).join("");
//   console.log(tasksHtml);
  $("#tasks-list").html(tasksHtml);
};

fetchTasks();
