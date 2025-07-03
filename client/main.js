const tasksList = document.getElementById("tasks-list");
const form = document.getElementById("form");
const tab = document.getElementById("tab");
const modalOpenBtn = document.getElementById("modal-open");
const modal = document.getElementById("modal");
const searchInput = document.getElementById("search-input");
const reverseBtn = document.getElementById("reverse-btn");

const actionTypes = {
  set: "set",
  get: "get",
  clear: "clear",
};

const useLSTasks = (actionType, obj) => {
  if (actionType === actionTypes.get)
    return JSON.parse(localStorage.getItem("tasks"));

  if (actionType === actionTypes.set)
    localStorage.setItem("tasks", JSON.stringify(obj));

  if (actionType === actionTypes.clear) localStorage.clear();
};

let tasks = [
  {
    title: "Example task title",
    desc: "Lorem ipsum dolor sit amet.",
    id: 1,
    isArchived: false,
    completed: false,
  },
];

let isArchivedTab = false;
let isReverse = false;
let searchTerm = "";

const lsTasks = useLSTasks(actionTypes.get);
tasks = lsTasks ? lsTasks : tasks;
useLSTasks(actionTypes.set, tasks);

tab.addEventListener("click", (e) => {
  if (e.target.textContent.trim() === "Tasks") {
    isArchivedTab = false;
    e.target.parentElement.children[0].classList.add("bg-slate-600");
    e.target.parentElement.children[1].classList.remove("bg-slate-600");
  }

  if (e.target.textContent.trim() === "Archived") {
    isArchivedTab = true;
    e.target.parentElement.children[0].classList.remove("bg-slate-600");
    e.target.parentElement.children[1].classList.add("bg-slate-600");
  }

  writeToDoc();
});

searchInput.addEventListener("input", (e) => {
  searchTerm = e.target.value.toLowerCase().trim();
  writeToDoc();
});

reverseBtn.addEventListener("click", () => {
  isReverse = !isReverse;
  reverseBtn.textContent = isReverse ? "Normal" : "Reverse";
  writeToDoc();
});

function sortTasks(tasksArr, reverse = false) {
  const sorted = [...tasksArr].sort((a, b) => b.id - a.id);
  return reverse ? sorted.reverse() : sorted;
}

function writeToDoc() {
  tasksList.innerHTML = "";

  let readyArray = sortTasks(tasks, isReverse)
    .filter((task) => (isArchivedTab ? task.isArchived : !task.isArchived))
    .filter(
      (task) =>
        task.title.toLowerCase().includes(searchTerm) ||
        task.desc.toLowerCase().includes(searchTerm)
    );

  if (!readyArray.length) {
    tasksList.innerHTML =
      '<p class="text-center text-slate-500 text-lg border py-2 rounded border-slate-400">Empty</p>';
    return;
  }

  readyArray.forEach((task) => {
    tasksList.innerHTML += `
      <div class="border p-2 rounded border-slate-400">
        <p class="font-bold text-lg ${task.completed ? "line-through" : ""}">${task.title}</p>
        <p class="text-sm text-slate-400 mb-2">${task.desc}</p>
        <button onclick="changeStatus(${task.id}, 'completed')" ${task.completed ? "disabled" : ""} class="bg-slate-600 text-white px-2 py-1 rounded text-sm">
          ${task.completed ? "Completed" : "Complete"}
        </button>
        <button onclick="deleteTask(${task.id})" class="bg-red-400 text-white px-2 py-1 rounded text-sm">Delete</button>
        <button onclick="changeStatus(${task.id}, 'isArchived')" class="bg-indigo-400 text-white px-2 py-1 rounded text-sm">
          ${task.isArchived ? "Unarchive" : "Archive"}
        </button>
        <button onclick="editTask(${task.id})" class="bg-yellow-500 text-white px-2 py-1 rounded text-sm">Edit</button>
      </div>
    `;
  });
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const mode = form.dataset.mode;
  const id = parseInt(e.target.id.value);

  if (mode === "edit") {
    tasks = tasks.map((task) => {
      if (task.id === id) {
        return {
          ...task,
          title: e.target.title.value,
          desc: e.target.desc.value,
        };
      }
      return task;
    });
  } else {
    tasks.push({
      title: e.target.title.value,
      desc: e.target.desc.value,
      id: tasks.length ? Math.max(...tasks.map((t) => t.id)) + 1 : 1,
      completed: false,
      isArchived: false,
    });
  }

  form.reset();
  form.dataset.mode = "add";
  useLSTasks(actionTypes.set, tasks);
  writeToDoc();
  modal.classList.add("hidden");
});

function changeStatus(taskId, key) {
  tasks = tasks.map((task) => {
    if (task.id === taskId) {
      task = {
        ...task,
        [key]: key === "isArchived" ? !task.isArchived : true,
      };
    }
    return task;
  });

  useLSTasks(actionTypes.set, tasks);
  writeToDoc();
}

function deleteTask(taskId) {
  if (confirm("Are you sure to delete this task?")) {
    tasks = tasks.filter((task) => task.id !== taskId);
    useLSTasks(actionTypes.set, tasks);
    writeToDoc();
  }
}

function editTask(taskId) {
  const task = tasks.find((t) => t.id === taskId);
  if (!task) return;

  form.title.value = task.title;
  form.desc.value = task.desc;
  form.id.value = task.id;

  form.dataset.mode = "edit";
  modal.classList.remove("hidden");
}

modalOpenBtn.addEventListener("click", () => {
  form.reset();
  form.dataset.mode = "add";
  modal.classList.remove("hidden");
});

modal.querySelector("#modal-close").addEventListener("click", () => {
  modal.classList.add("hidden");
  form.reset();
  form.dataset.mode = "add";
});
