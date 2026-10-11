(() => {
  const form = document.getElementById('feedback-form');
  const status = document.getElementById('form-status');
  const button = document.getElementById('submit-button');
  const message = document.getElementById('message');
  const counter = document.getElementById('char-count');
  const config = window.EMAILJS_CONFIG || {};
  document.getElementById('year').textContent = new Date().getFullYear();

  const updateCounter = () => { counter.textContent = `${message.value.length}/1000`; };
  message.addEventListener('input', updateCounter);
  updateCounter();

  function showStatus(kind, text) {
    status.className = `form-status ${kind}`;
    status.textContent = text;
    status.hidden = false;
    status.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    status.hidden = true;

    // Quietly discard automated submissions that fill the hidden honeypot.
    if (form.elements.company.value.trim()) {
      form.reset();
      updateCounter();
      showStatus('success', 'Thanks for your feedback!');
      return;
    }

    if (!config.publicKey || config.publicKey.includes('YOUR_') ||
        !config.serviceId || config.serviceId.includes('YOUR_') ||
        !config.templateId || config.templateId.includes('YOUR_')) {
      showStatus('error', 'Email delivery is not configured yet. Add your EmailJS public key, service ID, and template ID in email-config.js before publishing.');
      return;
    }
    if (!window.emailjs) {
      showStatus('error', 'The email service could not load. Please check your connection and try again.');
      return;
    }

    const selectedCategory = form.querySelector('input[name="category"]:checked');
    if (!selectedCategory) {
      showStatus('error', 'Please choose a feedback category.');
      return;
    }

    const templateParams = {
      from_name: form.elements.name.value.trim(),
      from_email: form.elements.email.value.trim(),
      reply_to: form.elements.email.value.trim(),
      category: selectedCategory.value,
      message: form.elements.message.value.trim(),
      to_email: config.destinationEmail || 'brobuildgames@gmail.com',
      submitted_at: new Date().toLocaleString()
    };

    button.disabled = true;
    button.textContent = 'Sending…';
    try {
      window.emailjs.init({ publicKey: config.publicKey });
      await window.emailjs.send(config.serviceId, config.templateId, templateParams);
      form.reset();
      updateCounter();
      showStatus('success', 'Thank you! Your feedback has been sent successfully.');
    } catch (error) {
      console.error('EmailJS submission failed:', error);
      showStatus('error', 'Sorry, your feedback could not be sent right now. Please try again in a moment.');
    } finally {
      button.disabled = false;
      button.innerHTML = '<span aria-hidden="true">➤</span> Send Feedback';
    }
  });
})();
