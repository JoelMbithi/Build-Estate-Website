// src/config/emailjs.js
export const emailjsConfig = {
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID,
  agentTemplateId: import.meta.env.VITE_EMAILJS_TEMPLATE_IDT,
  templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY
};

// Add validation
if (!emailjsConfig.serviceId || !emailjsConfig.templateId || !emailjsConfig.publicKey) {
  throw new Error('Missing EmailJS environment variables');
}

