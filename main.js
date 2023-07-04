var count = 0;
var students = [];

function isEmptyField(value) {
  return value === "";
}

// ...

function addStudent() {
  const nameValue = document.getElementById("sname").value;
  const emailValue = document.getElementById("email").value;
  const ageValue = document.getElementById("age").value;
  const gradeValue = document.getElementById("grade").value;
  const degreeValue = document.getElementById("degree").value;

  // Check if any field is empty
  if ([nameValue, emailValue, ageValue, gradeValue, degreeValue].some(isEmptyField)) {
    alert("All fields are required!");
    return;
  }

  count++;

  students.push({
    ID: count,
    sname: nameValue,
    email: emailValue,
    age: ageValue,
    grade: gradeValue,
    degree: degreeValue,
  });

  localStorage.setItem("students", JSON.stringify(students));

  // Clear input values
  [sname, email, age, grade, degree].forEach((input) => (input.value = ""));

  console.log(students);
  showTable();
}

function showTable() {
  const table = document.getElementById("tbody");
  table.innerHTML = "";

  students.forEach((student) => {
    const row = document.createElement("tr");

    // Generate HTML for each cell in the row
    const html = `
      <td>${student.ID}</td>
      <td>${student.sname}</td>
      <td>${student.email}</td>
      <td>${student.age}</td>
      <td>${student.grade}</td>
      <td>
        ${student.degree}
        <div class="icons">
          <a onClick="edit(${student.ID})"><i class="fa-regular fa-pen-to-square"></i></a>
          <a onClick="del(${student.ID})"><i class="fa-solid fa-trash"></i></a> 
        </div>
      </td>
    `;

    // Set the generated HTML as the innerHTML of the row
    row.innerHTML = html;

    table.appendChild(row);
  });
}

function search() {
  const input = document.getElementById("search");
  const filter = input.value.toUpperCase();
  const rows = Array.from(document.querySelectorAll("#tbody tr"));

  rows.forEach((row) => {
    const cells = Array.from(row.querySelectorAll("td"));
    const foundMatch = cells.some((cell, index) => {
      if (index > 0) {
        const cellValue = cell.textContent || cell.innerText;
        return cellValue.toUpperCase().includes(filter);
      }
    });

    row.style.display = foundMatch ? "" : "none";
  });
}

function edit(id) {
  const student = students.find((student) => student.ID === id);
  if (student) {
    const { sname, email, age, grade, degree } = student;
    document.getElementById("sname").value = sname;
    document.getElementById("email").value = email;
    document.getElementById("age").value = age;
    document.getElementById("grade").value = grade;
    document.getElementById("degree").value = degree;
    document.getElementById("submit").innerText = "Edit Student";

    document.getElementById("submit").onclick = () => {
      Object.assign(student, {
        sname: document.getElementById("sname").value,
        email: document.getElementById("email").value,
        age: document.getElementById("age").value,
        grade: document.getElementById("grade").value,
        degree: document.getElementById("degree").value,
      });

      clearForm();
      document.getElementById("submit").innerText = "Add Student";
      showTable();
    };
  }
}

function clearForm() {
  const inputs = document.querySelectorAll("#sname, #email, #age, #grade, #degree");
  inputs.forEach((input) => (input.value = ""));
}

function del(id) {
  students.forEach((student, index) => {
    if (student["ID"] == id) {
      students.splice(index, 1);
      showTable();
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  students = JSON.parse(localStorage.getItem("students")) || [];
  count = Math.max(...students.map((student) => student.ID), 0);
  showTable();
});

window.onunload = () => {
  localStorage.setItem("students", JSON.stringify(students));
};