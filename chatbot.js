
const toggleBtn = document.getElementById("chatbot-toggle");
const chatbot = document.getElementById("chatbot");
const closeBtn = document.getElementById("chatbot-close");
const sendBtn = document.getElementById("chatbot-send");
const input = document.getElementById("chatbot-input");
const messages = document.getElementById("chatbot-messages");

toggleBtn.onclick = () => chatbot.style.display = "flex";
closeBtn.onclick = () => chatbot.style.display = "none";

sendBtn.onclick = sendMessage;
input.addEventListener("keypress", e => {
  if (e.key === "Enter") sendMessage();
});

function sendMessage() {
  const text = input.value.trim();
  if (!text) return;

  addMessage(text, "chat-user");
  input.value = "";

  setTimeout(() => {
    addMessage(getBotReply(text), "chat-bot");
  }, 500);
}

function addMessage(text, type) {
  const div = document.createElement("div");
  div.className = `chat-msg ${type}`;
  div.textContent = text;
  messages.appendChild(div);
  messages.scrollTop = messages.scrollHeight;
}
function getBotReply(msg) {
  msg = msg.toLowerCase();

  // Greetings
  if (msg.includes("hello") || msg.includes("hi") || msg.includes("hey"))
    return "Hello 👋 Welcome to AALI TRUSTZ. How can I help you today?";

  // About AALI TRUSTZ
  if (msg.includes("aali") || msg.includes("trust") || msg.includes("about"))
    return "AALI TRUSTZ is a charitable trust working for Education, Healthcare, Food Support and Women Empowerment to help underprivileged communities in India.";

  // Programs
  if (msg.includes("program") || msg.includes("services") || msg.includes("help"))
    return "We run programs in Education Support, Healthcare Camps, Food Distribution and Women Empowerment.";

  // Education
  if (msg.includes("education") || msg.includes("school") || msg.includes("students"))
    return "Our Education Program helps poor children with school fees, books, uniforms and learning support.";

  // Health
  if (msg.includes("health") || msg.includes("medical") || msg.includes("hospital"))
    return "Our Healthcare Program provides free medical camps, surgeries, medicines and health guidance for needy people.";

  // Food
  if (msg.includes("food") || msg.includes("hunger") || msg.includes("meal"))
    return "Through our Food Support Program, we provide free meals and ration kits to poor and hungry families.";

  // Women / Empowerment
  if (msg.includes("women") || msg.includes("empower") || msg.includes("skills"))
    return "Our Women Empowerment program helps women with skill training, financial support and self-employment opportunities.";

  // Donation
  if (msg.includes("donate") || msg.includes("donation") || msg.includes("support"))
    return "You can donate via Bank Transfer, UPI or Online Payment. Your donation supports education, health and food programs.";

  // Bank details
  if (msg.includes("bank") || msg.includes("account") || msg.includes("ifsc"))
    return "Bank Details:\nAccount Name: Aali Trustz\nAccount No: 123456789012\nBank: State Bank of India\nIFSC: SBIN0001234\nBranch: Guntur";

  // UPI
  if (msg.includes("upi") || msg.includes("qr"))
    return "Our UPI ID is: donate@aalitrustz. You can scan the QR code or send directly via UPI.";

  // 80G / Tax
  if (msg.includes("80g") || msg.includes("tax"))
    return "Yes, your donation is eligible for 50% tax exemption under Section 80G. Receipt will be sent by email within 7 working days.";

  // Receipt
  if (msg.includes("receipt"))
    return "Your 80G tax receipt will be emailed within 7 working days after your donation is verified.";

  // Contact
  if (msg.includes("contact") || msg.includes("phone") || msg.includes("email"))
    return "You can contact AALI TRUSTZ through the Contact Us page on our website or email us for any support.";

  // Location
  if (msg.includes("location") || msg.includes("address"))
    return "AALI TRUSTZ operates from Guntur, Andhra Pradesh, India.";

  // Volunteer
  if (msg.includes("volunteer"))
    return "You can join AALI TRUSTZ as a volunteer by filling the Volunteer form on our website.";
 if (msg.includes("okay") || msg.includes("ok"))
   return "Thank you for reaching out. Please visit the Contact section for detailed queries.";
  // Default
  return "I'm here to help 😊 Please ask about donations, programs, education, healthcare, or contact details.";
}