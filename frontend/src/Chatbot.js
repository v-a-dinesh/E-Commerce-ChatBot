import React, { useState } from 'react';
import axios from 'axios';

const Chatbot = () => {
    const [messages, setMessages] = useState([]);
    const [query, setQuery] = useState("");

    const handleSend = async () => {
        if (!query.trim()) return;

        const userMessage = { sender: "User", text: query };
        setMessages((prev) => [...prev, userMessage]);

        try {
            const token = localStorage.getItem("token");
            const response = await axios.post(
                'http://127.0.0.1:5000/search',
                { query },
                { headers: { Authorization: token } }
            );

            const products = response.data;
            const botMessage = {
                sender: "Bot",
                text: products.length
                    ? products.map(
                          (p) => `${p.name} - $${p.price} (${p.stock} in stock)`
                      ).join("\n")
                    : "No products found.",
            };

            setMessages((prev) => [...prev, botMessage]);
        } catch (error) {
            console.error("Error fetching data:", error);
            setMessages((prev) => [
                ...prev,
                { sender: "Bot", text: "Error fetching data. Check console for details." },
            ]);
        }

        setQuery("");
    };

    return (
        <div style={styles.container}>
            <div style={styles.chatBox}>
                {messages.map((msg, index) => (
                    <div
                        key={index}
                        style={{
                            textAlign: msg.sender === "User" ? "right" : "left",
                            marginBottom: '15px',
                        }}
                    >
                        <p style={msg.sender === "User" ? styles.userMessage : styles.botMessage}>
                            <b>{msg.sender}:</b> {msg.text}
                        </p>
                    </div>
                ))}
            </div>
            <div style={styles.inputContainer}>
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Type your query"
                    style={styles.input}
                />
                <button onClick={handleSend} style={styles.button}>
                    Send
                </button>
            </div>
        </div>
    );
};

const styles = {
    container: {
        padding: "20px",
        maxWidth: "600px",
        margin: "auto",
        backgroundColor: '#f9f9f9',
        borderRadius: '8px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    },
    chatBox: {
        border: "1px solid #ccc",
        padding: "15px",
        height: "400px",
        overflowY: "scroll",
        marginBottom: "20px",
        backgroundColor: "#fff",
        borderRadius: "8px",
    },
    userMessage: {
        backgroundColor: "#e1ffc7",
        padding: "8px",
        borderRadius: "8px",
        maxWidth: "70%",
        margin: "5px 0",
        display: "inline-block",
        fontSize: "14px",
    },
    botMessage: {
        backgroundColor: "#f1f1f1",
        padding: "8px",
        borderRadius: "8px",
        maxWidth: "70%",
        margin: "5px 0",
        display: "inline-block",
        fontSize: "14px",
    },
    inputContainer: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
    },
    input: {
        width: "80%",
        padding: "12px",
        border: "1px solid #ddd",
        borderRadius: "8px",
        fontSize: "14px",
        outline: "none",
    },
    button: {
        padding: "12px 20px",
        backgroundColor: "#4CAF50",
        color: "white",
        border: "none",
        borderRadius: "8px",
        cursor: "pointer",
        transition: "background-color 0.3s",
    },
    buttonHover: {
        backgroundColor: "#45a049",
    },
};

export default Chatbot;
