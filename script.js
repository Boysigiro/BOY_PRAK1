// To-Do List
const inputTodo = document.getElementById("newItem");
const btnAdd = document.getElementById("btnAdd");
const todoList = document.getElementById("todoList");

btnAdd.addEventListener("click", () => {
    if (inputTodo.value.trim() !== "") {
        const li = document.createElement("li");
        li.textContent = inputTodo.value;

        li.addEventListener("click", () => {
            li.classList.toggle("completed");
            saveTodo();
        });

        const delBtn = document.createElement("button");
        delBtn.textContent = "Hapus";
        delBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            li.remove();
            saveTodo();
        });

        li.appendChild(delBtn);
        todoList.appendChild(li);
        inputTodo.value = "";
        saveTodo();
    }
});

function saveTodo() {
    const items = [];
    todoList.querySelectorAll("li").forEach(li => {
        items.push({
            text: li.firstChild.textContent,
            completed: li.classList.contains("completed")
        });
    });
    localStorage.setItem("todoItems", JSON.stringify(items));
}

function loadTodo() {
    const items = JSON.parse(localStorage.getItem("todoItems"));
    if (items) {
        items.forEach(item => {
            const li = document.createElement("li");
            li.textContent = item.text;

            if (item.completed) {
                li.classList.add("completed");
            }

            li.addEventListener("click", () => {
                li.classList.toggle("completed");
                saveTodo();
            });

            const delBtn = document.createElement("button");
            delBtn.textContent = "Hapus";
            delBtn.addEventListener("click", (e) => {
                e.stopPropagation();
                li.remove();
                saveTodo();
            });

            li.appendChild(delBtn);
            todoList.appendChild(li);
        });
    }
}
loadTodo();

// Kalkulator
const angka1 = document.getElementById("angka1");
const angka2 = document.getElementById("angka2");
const hasil = document.getElementById("hasil");

document.getElementById("btnPangkat").addEventListener("click", () => {
    hasil.textContent = Math.pow(Number(angka1.value), Number(angka2.value));
});

document.getElementById("btnAkar").addEventListener("click", () => {
    hasil.textContent = Math.sqrt(Number(angka1.value)).toFixed(2);
});

document.getElementById("btnModulus").addEventListener("click", () => {
    hasil.textContent = Number(angka1.value) % Number(angka2.value);
});

// Validasi
const formValidasi = document.getElementById("formValidasi");
const inputNama = document.getElementById("nama");
const inputEmail = document.getElementById("email");
const inputPassword = document.getElementById("password");
const errorNama = document.getElementById("errorNama");
const errorEmail = document.getElementById("errorEmail");
const errorPassword = document.getElementById("errorPassword");

formValidasi.addEventListener("submit", (e) => {
    e.preventDefault();
    let valid = true;

    // Reset pesan error
    errorNama.textContent = "";
    errorEmail.textContent = "";
    errorPassword.textContent = "";

    if (inputNama.value.trim().length < 4) {
        errorNama.textContent = "Nama harus lebih dari 3 karakter.";
        valid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(inputEmail.value.trim())) {
        errorEmail.textContent = "Email tidak valid.";
        valid = false;
    }

    if (inputPassword.value.length < 8) {
        errorPassword.textContent = "Password minimal 8 karakter.";
        valid = false;
    }

    if (valid) {
        alert("Form berhasil divalidasi!");
        formValidasi.reset();
    }
});
