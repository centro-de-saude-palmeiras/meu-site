function toggle(id) {
  const elemento = document.getElementById(id);

  if (elemento.style.display === "block") {
    elemento.style.display = "none";
  } else {
    elemento.style.display = "block";
  }
}
const url = "https://docs.google.com/spreadsheets/d/1mDXBTgqbxCKEq07Xub-8GR-0QoFO7k38sAoJOZM0ldY/export?format=csv";