# 🌐 LinguaSwift — Language Translation Tool

A simple, clean web app that translates text between 100+ languages in real time.
Built with **Flask** (Python) on the backend and vanilla **HTML/CSS/JavaScript** on the frontend.

## Features
- Enter text and pick a source & target language
- Instant translation powered by Google Translate (via `deep-translator`)
- Auto-detect source language option
- Swap source/target languages with one click
- Copy translated text to clipboard
- Listen to the translation with text-to-speech
- Responsive, modern UI

## Tech Stack
- Python, Flask
- deep-translator (Google Translate engine, no paid API key needed)
- HTML, CSS, JavaScript (Web Speech API for text-to-speech)

## Run Locally

```bash
git clone https://github.com/YOUR_USERNAME/lingua-swift.git
cd lingua-swift
python -m venv venv
venv\Scripts\activate      # Windows
pip install -r requirements.txt
python app.py
```

Then open **http://127.0.0.1:5000** in your browser.

## Live Demo
🔗 [Add your deployed Render link here]

## Deployment
Deployed on [Render](https://render.com) using `gunicorn` as the production server (see `Procfile`).

## Author
**Kavya Patel** — Software Engineer
