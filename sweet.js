// ── Sticky header shadow on scroll ──
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 20);
});

// ── Scroll reveal with staggered product cards ──
const revealEls = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const isCard = entry.target.closest('.product-grid');
      const delay = isCard
        ? Array.from(entry.target.parentElement.children).indexOf(entry.target) * 60
        : 0;
      setTimeout(() => entry.target.classList.add('visible'), delay);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealEls.forEach(el => observer.observe(el));

// ── Toast notification ──
function showToast(message, success = true) {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.style.background = success ? '#2b1a1f' : '#c9536a';
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 4000);
}

// ── EmailJS contact form ──
emailjs.init("EFHxysK6d2MYYm82E");

document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const btn = this.querySelector('.form-submit');
  btn.textContent = 'Sending…';
  btn.disabled = true;

  const params = {
    name:    document.getElementById("name").value,
    email:   document.getElementById("email").value,
    phone:   document.getElementById("phone").value,
    message: document.getElementById("message").value
  };

  emailjs.send("service_shl6spl", "template_k4fwj6c", params)
    .then(() => {
      showToast("Message sent! We'll be in touch soon 🎂");
      this.reset();
    })
    .catch(() => {
      showToast("Couldn't send message. Please try again.", false);
    })
    .finally(() => {
      btn.textContent = 'Send Message';
      btn.disabled = false;
    });
});
