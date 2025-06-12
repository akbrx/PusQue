from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle
import os

# Load model
with open("chatbot_model.pkl", "rb") as f:
    model = pickle.load(f)

with open("vectorizer.pkl", "rb") as f:
    vectorizer = pickle.load(f)

with open("responses.pkl", "rb") as f:
    responses = pickle.load(f)

app = Flask(__name__)
CORS(app) 

@app.route("/")
def index():
    return "✅ Chatbot Puskesmas API Aktif."

@app.route("/chat", methods=["POST"])
def chat():
    user_input = request.json.get("message")
    if not user_input:
        return jsonify({"error": "Silakan masukkan pesan."})

    input_vec = vectorizer.transform([user_input])
    intent = model.predict(input_vec)[0]
    response = responses.get(intent, "Maaf, saya tidak mengerti pertanyaan Anda.")

    return jsonify({"response": response})

port = int(os.environ.get("PORT", 5001))
app.run(host="0.0.0.0", port=port)
