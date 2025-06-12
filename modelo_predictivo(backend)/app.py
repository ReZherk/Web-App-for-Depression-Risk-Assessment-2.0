from flask import Flask,request,jsonify
from flask_cors import CORS
from database.db import get_connection

app=Flask(__name__)
CORS(app)

@app.route('/api/login', methods=['POST'])
def login():
    data = request.json
    username = data.get('username')
    password = data.get('password')

    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM users WHERE username=%s AND password=%s", (username, password))
    user = cursor.fetchone()
    cursor.close()
    conn.close()
    
    if user:
        return jsonify(success=True,message="Login exitoso")#Metodo que convierte un objeto de Python en una respuesta JSON.
    else:
        return jsonify(success=False,message="Credenciales incorrectas"), 401

if __name__=='__main__':
    app.run(debug=True,port=5000) #El servidor Flask se ejecutará en el puerto 5000 y con el modo de depuración activado.
# Esto permite que el servidor se reinicie automáticamente cuando se detecten cambios en el código.
