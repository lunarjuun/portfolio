from flask import Flask, render_template, request
import mysql.connector

app = Flask(__name__, static_folder='static', template_folder='templates')


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/blackjack')
def blackjack():
    return render_template('blackjack.html')

@app.route('/howtoplay')
def howtoplay():
    return render_template('howtoplay.html')


@app.route('/save_score', methods=['POST']) 
def score():
    username = request.form.get('name')  # henter data fra det som sier "name" (samme som id på js)
    score = request.form.get('score')

    # ta i mot data fra html-form
    # lagre data i sql-databasen

    # Connect to the database
    conn = mysql.connector.connect(
        host="10.2.3.89",
        user="dom",
        password="dom123",
        database="leaderboard",
        port=3306
    )

    cursor = conn.cursor()
    cursor.execute("INSERT INTO leaderboard (name, score) VALUES (%s, %s)", (username, score))
    conn.commit()

    cursor.close()
    conn.close()

    return f"Score for {username} saved!"

if __name__ == '__main__':
    app.run(debug=True)

# get: spørre/hente
# post: bruk i tvil

