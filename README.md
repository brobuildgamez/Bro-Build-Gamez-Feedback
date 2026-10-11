# Bro Build Gamez — Feedback Website

A responsive, static feedback website themed around the Bro Build Gamez forest-green and lime-green brand. It uses the supplied logo artwork and includes required name/email/message fields, a single-choice radio category group, a character counter, a honeypot spam check, and status messages.

## EmailJS configuration

The form is wired for EmailJS, but it will not send until the account-specific values are set in `email-config.js`:

- `publicKey`
- `serviceId`
- `templateId`

Set up the EmailJS template to email **brobuildgames@gmail.com** and include these template variables:

- `{{from_name}}`
- `{{from_email}}`
- `{{reply_to}}`
- `{{category}}`
- `{{message}}`
- `{{to_email}}`
- `{{submitted_at}}`

Set the template's reply-to field to `{{reply_to}}` if supported by the connected email service. Use EmailJS's current dashboard settings and limits. The form deliberately does not pretend to send while placeholder values remain.

## Files

- `index.html` — page structure and form
- `styles.css` — responsive styling and colors
- `script.js` — validation, EmailJS send logic, feedback states, and honeypot check
- `email-config.js` — your public EmailJS configuration values
- `assets/` — supplied Bro Build Gamez branding images

No hosting walkthrough is included, as requested. Keep within the free-tier limits of whichever services you choose. Do not place email passwords or other private secrets in this static website.
