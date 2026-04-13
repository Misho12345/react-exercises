function loadTodos() {
  const saved = localStorage.getItem("todos");
  return saved ? JSON.parse(saved) : [];
}

function saveTodos(todos) {
  localStorage.setItem("todos", JSON.stringify(todos));
}

let todos = loadTodos();
let filter = "all";

function renderTodos() {
  const list = document.querySelector("#todo-list");
  list.innerHTML = "";

  const filtered = todos.filter((todo) => {
    if (filter === "active") {
      return !todo.completed;
    }

    if (filter === "completed") {
      return todo.completed;
    }

    return true;
  });

  filtered.forEach((todo) => {
    const li = document.createElement("li");
    li.className = todo.completed ? "todo-item completed" : "todo-item";
    li.dataset.id = todo.id;

    const left = document.createElement("div");
    left.className = "todo-left";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = todo.completed;

    const text = document.createElement("span");
    text.className = "todo-text";
    text.textContent = todo.text;

    const deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.className = "delete-btn";
    deleteButton.textContent = "X";

    left.appendChild(checkbox);
    left.appendChild(text);
    li.appendChild(left);
    li.appendChild(deleteButton);

    list.appendChild(li);
  });

  const done = todos.filter((todo) => todo.completed).length;
  document.querySelector("#counter").textContent =
    done + " от " + todos.length + " задачи завършени";
}

document.querySelector("#todo-list").addEventListener("click", (event) => {
  const li = event.target.closest(".todo-item");
  if (!li) {
    return;
  }

  const id = Number(li.dataset.id);

  if (event.target.type === "checkbox") {
    todos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    saveTodos(todos);
    renderTodos();
  }

  if (event.target.classList.contains("delete-btn")) {
    todos = todos.filter((todo) => todo.id !== id);
    saveTodos(todos);
    renderTodos();
  }
});

function addTodo() {
  const input = document.querySelector("#todo-input");
  const text = input.value.trim();

  if (!text) {
    document.querySelector("#error").textContent = "Въведете задача!";
    return;
  }

  document.querySelector("#error").textContent = "";
  todos.push({ id: Date.now(), text: text, completed: false });
  saveTodos(todos);
  input.value = "";
  renderTodos();
}

document.querySelector("#add-btn").addEventListener("click", addTodo);

document.querySelector("#todo-input").addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    addTodo();
  }
});

document.querySelector("#filters").addEventListener("click", (event) => {
  const button = event.target.closest("button[data-filter]");
  if (!button) {
    return;
  }

  filter = button.dataset.filter;
  renderTodos();
});

renderTodos();
