# app.py
from flask import Flask, jsonify
import random

app = Flask(__name__)

@app.route('/api/')
def random_number():
    return jsonify({'random_number': random.randint(1, 100)})

if __name__ == '__main__':
    app.run(host='0.0.0.0')
