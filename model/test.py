import requests

# Ganti URL ini dengan URL publik dari Replit kamu
url = "http://0.0.0.0:5001/chat"

# Ubah pertanyaan sesuai yang didukung model kamu
payload = {"message": "bagaimana cara daftar"}

response = requests.post(url, json=payload)

# Cetak hasil balasan dari chatbot
print("Bot:", response.json().get("response"))
