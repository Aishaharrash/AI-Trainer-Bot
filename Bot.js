const chatWindow = document.getElementById("chat-window");
const input = document.getElementById("chat-input");
const sendBtn = document.getElementById("send-btn");

// Function to append message
function appendMessage(sender, message, type) {
    const msgDiv = document.createElement("div");
    msgDiv.classList.add("message");
    msgDiv.classList.add(type === "user" ? "user-msg" : "bot-msg");
    msgDiv.innerHTML = `<strong>${sender}:</strong> ${message}`;
    chatWindow.appendChild(msgDiv);
    chatWindow.scrollTop = chatWindow.scrollHeight;
}

// Send message function
async function sendMessage() {
    const msg = input.value.trim();
    if (!msg) return;

    appendMessage("You", msg, "user");
    input.value = "";

    try {
        const res = await fetch("https://namou.app.n8n.cloud/webhook-test/Bot", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({message: msg})
        });

        const data = await res.json();
        appendMessage("AI Trainer Bot", data.reply_text || "No response from bot", "bot");
    } catch (error) {
        appendMessage("Error", "Could not reach the bot. Please try again.", "bot");
        console.error("Error:", error);
    }
}

// Event listeners
sendBtn.addEventListener("click", sendMessage);
input.addEventListener("keypress", function(e) {
    if (e.key === "Enter") sendMessage();
});
