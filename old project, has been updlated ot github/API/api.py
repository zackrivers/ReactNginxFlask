# api.py
from flask import Flask, request, jsonify
from flask_cors import CORS  # new import
import sqlite3

app = Flask(__name__)
CORS(app)  # allow CORS for all routes

@app.route('/data', methods=['GET', 'POST'])
def handle_data():
    conn = sqlite3.connect('../Database/SQLDB/database.db')
    c = conn.cursor()

    if request.method == 'POST':
        data = request.get_json()
        c.execute("INSERT INTO data VALUES (?, ?)", (data['id'], data['text']))
        conn.commit()
        return jsonify({"status": "success"}), 201

    elif request.method == 'GET':
        c.execute("SELECT * FROM data")
        data = c.fetchall()
        return jsonify(data)

@app.route('/new_data', methods=['GET', 'POST'])
def handle_new_data():
    conn = sqlite3.connect('../Database/SQLDB/database.db')
    c = conn.cursor()

    if request.method == 'POST':
        data = request.get_json()
        c.execute("INSERT INTO new_data (id, customer_number, user_name, column_4, column_5) VALUES (?, ?, ?, ?, ?)", 
                  (data['id'], data['customer_number'], data['user_name'], data['column_4'], data['column_5']))
        conn.commit()
        return jsonify({"status": "success"}), 201

    elif request.method == 'GET':
        c.execute("SELECT * FROM new_data")
        data = c.fetchall()
        return jsonify(data)
if __name__ == '__main__':
    app.run(debug=True)
