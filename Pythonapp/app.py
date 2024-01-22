from flask import Flask, jsonify
import random

app = Flask(__name__)

@app.route('/')
def random_number():
    return jsonify({"random_number": random.randint(1, 10000)})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
