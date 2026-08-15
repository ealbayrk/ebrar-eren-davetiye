const RSVP_ENDPOINT = "https://script.google.com/macros/s/AKfycbyKdDxKEZgubhkZw_PJfF8CM1gvwCly4gWdm51uGI3DDn0eC96SHK5T8vIcotRfBBb0NA/exec";

function pad(value) {
  return String(value).padStart(2, "0");
}

function updateCountdown(element) {
  const target = new Date(element.dataset.countdown).getTime();
  const now = Date.now();
  const diff = target - now;
  const label = element.dataset.label || "Etkinliğimize";

  if (diff <= 0) {
    element.textContent = `${label} hoş geldiniz ♡`;
    return;
  }

const days = Math.floor(diff / 86400000);
const hours = Math.floor((diff % 86400000) / 3600000);
const minutes = Math.floor((diff % 3600000) / 60000);
const seconds = Math.floor((diff % 60000) / 1000);

element.textContent = `${label} ${days} gün · ${pad(hours)} saat · ${pad(minutes)} dk · ${pad(seconds)} sn kaldı`;
}

const countdowns = document.querySelectorAll("[data-countdown]");
countdowns.forEach(updateCountdown);
setInterval(() => countdowns.forEach(updateCountdown), 1000);

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.14 });

document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

const form = document.getElementById("rsvpForm");
const statusEl = document.getElementById("formStatus");
const submitButton = document.getElementById("submitButton");
const kinaKisiWrap = document.getElementById("kinaKisiWrap");
const dugunKisiWrap = document.getElementById("dugunKisiWrap");
const kinaKisiInput = document.getElementById("kinaKisi");
const dugunKisiInput = document.getElementById("dugunKisi");

function selectedValue(name) {
  return form.querySelector(`input[name="${name}"]:checked`)?.value || "";
}

function syncConditionalFields() {
  const kinaJoining = selectedValue("kinaKatilim") === "Katılacağım";
  const dugunJoining = selectedValue("dugunKatilim") === "Katılacağım";

  kinaKisiWrap.hidden = !kinaJoining;
  kinaKisiInput.required = kinaJoining;
  if (!kinaJoining) kinaKisiInput.value = "";

  dugunKisiWrap.hidden = !dugunJoining;
  dugunKisiInput.required = dugunJoining;
  if (!dugunJoining) dugunKisiInput.value = "";
}

form.addEventListener("change", syncConditionalFields);

function showStatus(message, type = "") {
  statusEl.className = `form-status ${type}`.trim();
  statusEl.textContent = message;
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  syncConditionalFields();

  if (!form.checkValidity()) {
    form.reportValidity();
    showStatus("Lütfen gerekli alanları tamamlayın.", "error");
    return;
  }

  const payload = {
    adSoyad: document.getElementById("adSoyad").value.trim(),
    kinaKatilim: selectedValue("kinaKatilim"),
    kinaKisi: kinaKisiInput.value || "",
    dugunKatilim: selectedValue("dugunKatilim"),
    dugunKisi: dugunKisiInput.value || "",
    not: document.getElementById("not").value.trim()
  };

  submitButton.disabled = true;
  submitButton.textContent = "Gönderiliyor...";
  showStatus("Katılım bilginiz gönderiliyor...");

  try {
    await fetch(RSVP_ENDPOINT, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(payload)
    });

    showStatus("Teşekkür ederiz ♡ Katılım bilginiz bize ulaştı.", "success");
    submitButton.textContent = "Bilginiz Alındı ♡";
    form.querySelectorAll("input, textarea").forEach((el) => el.disabled = true);
  } catch (error) {
    console.error(error);
    submitButton.disabled = false;
    submitButton.textContent = "Katılımımı Bildir";
    showStatus("Gönderim sırasında bir sorun oluştu. Lütfen tekrar deneyin.", "error");
  }
});
