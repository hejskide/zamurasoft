const nav = document.querySelector("[data-nav]");
const toggle = document.querySelector("[data-nav-toggle]");
const form = document.querySelector("[data-form]");
const status = document.querySelector("[data-form-status]");
const year = document.querySelector("[data-year]");

if (year) {
  year.textContent = String(new Date().getFullYear());
}

function setMenu(open) {
  nav?.classList.toggle("open", open);
  toggle?.classList.toggle("is-open", open);
  toggle?.setAttribute("aria-expanded", String(open));
  toggle?.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
}

toggle?.addEventListener("click", () => {
  setMenu(!nav?.classList.contains("open"));
});

nav?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => setMenu(false));
});

form?.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = new FormData(form);
  const name = String(data.get("name") || "").trim();
  const email = String(data.get("email") || "").trim();
  const type = String(data.get("type") || "").trim();
  const message = String(data.get("message") || "").trim();

  const subject = encodeURIComponent(`Proyecto Zamurasoft — ${type}`);
  const body = encodeURIComponent(
    `Nombre: ${name}\nCorreo: ${email}\nTipo: ${type}\n\n${message}`
  );

  window.location.href = `mailto:hola@zamurasoft.com?subject=${subject}&body=${body}`;

  if (status) {
    status.hidden = false;
    status.textContent =
      "Se abrió tu cliente de correo. Si no ocurre, escríbenos a hola@zamurasoft.com.";
  }

  form.reset();
});
