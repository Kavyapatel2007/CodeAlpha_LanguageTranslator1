from flask import Flask, render_template, request, jsonify
from deep_translator import GoogleTranslator
from deep_translator.constants import GOOGLE_LANGUAGES_TO_CODES

app = Flask(__name__)

# Dict like {"english": "en", "hindi": "hi", "french": "fr", ...}
LANGUAGES = GOOGLE_LANGUAGES_TO_CODES


@app.route("/")
def index():
    """Render the main page with language dropdowns."""
    sorted_languages = dict(sorted(LANGUAGES.items()))
    return render_template("index.html", languages=sorted_languages)


@app.route("/translate", methods=["POST"])
def translate():
    """Receive text + source/target language codes, return translated text."""
    data = request.get_json(silent=True) or {}
    text = data.get("text", "").strip()
    source = data.get("source", "auto")
    target = data.get("target", "en")

    if not text:
        return jsonify({"error": "Please enter some text to translate."}), 400

    try:
        translated_text = GoogleTranslator(source=source, target=target).translate(text)
        return jsonify({"translated_text": translated_text})
    except Exception as e:
        return jsonify({"error": f"Translation failed: {str(e)}"}), 500


if __name__ == "__main__":
    app.run(debug=True)
