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

$(".form-todo").on("submit", (e) => {
  e.preventDefault();
  const taskText = $("#task").val().trim();
  addTask(taskText);
  $("#task").val("");
});


function ajaxPromise(url, options) {
  return new Promise((resolve, reject) => {
    $.ajax({
      ...options,
      url,
      success: resolve,
      error: reject
    });
  });
}

const fetchTasks = async () => {
  $(".spinner-border").show();

  try {
    const data = await ajaxPromise("https://jsonplaceholder.typicode.com/todos", {
      data: { _limit: 9 }
    });
    const tasksHtml = data.map((task) => getTaskTemplate(task.title, task.completed)).join("");
    $("#tasks-list").html(tasksHtml);
    $(".spinner-border").hide();
  
  } catch (error) {
    alert("Failed to load tasks. Please try again!");
  }

};

fetchTasks();


// const fetchTasks = () => {
//   $(".spinner-border").show(); 
//   $.ajax({
//     url: "https://jsonplaceholder.typicode.com/todos",
//     data: { _limit: 9 },
//     success: function (data) {
//       const tasksHtml = data.map((task) => getTaskTemplate(task.title, task.completed)).join("");
//       $("#tasks-list").html(tasksHtml);
//       $(".spinner-border").hide();
//     },
//     error: function () {
//       alert("Failed to load tasks. Please try again!");
//     },
//   });
// };

// fetchTasks();
