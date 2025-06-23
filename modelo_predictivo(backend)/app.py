from flask import Flask, json,request,jsonify
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
    cursor.execute("SELECT username, nombre_completo FROM users WHERE username=%s AND password=%s", (username, password))
    user = cursor.fetchone()
    cursor.close()
    conn.close()
    
    if user:
        information={
            "username":user[0],
            "nombre_completo":user[1]
        }
        return jsonify(success=True,data=information)#Metodo que convierte un objeto de Python en una respuesta JSON.
    else:
        return jsonify(success=False,message="Credenciales incorrectas"), 401
@app.route('/api/evaluation',methods=['POST'])
def evaluation():
    data = request.json
    username = data.get('username')
    month = data.get('month')
    responses = data.get('responses')

    if not (username and month and responses):
        return jsonify(success=False, message="Faltan datos"), 400

    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT id FROM users WHERE username = %s", (username,))
    user = cursor.fetchone()

    if not user:
        cursor.close()
        conn.close()
        return jsonify(success=False, message="Usuario no encontrado"), 404

    user_id = user[0]
    responses_json = json.dumps(responses)  # Convierte lista a string JSON

    cursor.execute("""
        INSERT INTO monthly_responses (user_id, month, responses)
        VALUES (%s, %s, %s)
        ON DUPLICATE KEY UPDATE
        responses = VALUES(responses),
        submitted_at = CURRENT_TIMESTAMP
    """, (user_id, month, responses_json))

    conn.commit()
    cursor.close()
    conn.close()

    return jsonify(success=True, message="Respuestas guardadas correctamente")

@app.route('/api/evaluation/<username>/<month>', methods=['GET'])
def get_evaluation(username,month):
    conn=get_connection()
    cursor=conn.cursor()


    cursor.execute("SELECT id FROM users WHERE username = %s", (username,))
    user = cursor.fetchone()

    if not user:
        cursor.close()
        conn.close()
        return jsonify(success=False,message="Usuario no encontrado"),404
    
    user_id=user[0]

    cursor.execute("""SELECT responses FROM monthly_responses 
        WHERE user_id = %s AND month = %s""", (user_id, month))
    
    result=cursor.fetchone()

    cursor.close()
    conn.close()

    if result:
        responses=json.loads(result[0])
        return jsonify(success=True,responses=responses)
    else:
        return jsonify(success=False,message="Sin respuestas registradas")
    

@app.route('/api/datos/<username>', methods=['GET'])
def formData(username):
    conn=get_connection()
    cursor=conn.cursor()


    cursor.execute("SELECT nombre_completo,codEstudiante,facultad_id FROM users WHERE username = %s", (username,))
    user = cursor.fetchone()

    if not user:
        cursor.close()
        conn.close()
        return jsonify(success=False,message="Informacion no encontrada"),404
    
    nombre_completo=user[0]
    codEstudiante=user[1]
    facultad_id=user[2]

    cursor.execute("SELECT nombre_facultad FROM facultades WHERE id = %s", (facultad_id,))


    result=cursor.fetchone()

    cursor.close()
    conn.close()

    if result:
        responses = {
          'nom_apell': nombre_completo,
          'codigo': codEstudiante,
          'facultad': result[0],
          }
        
        return jsonify(success=True, responses=responses)

    else:
        return jsonify(success=False,message="Datos del estudiantes no encontrados")

@app.route('/api/datos_actualizados/<username>', methods=['PUT'])
def actualizar_datos(username):
    data = request.json
    nom_apell = data.get('nom_apell')
    codigo = data.get('codigo')
    facultad = data.get('facultad')

    if not (nom_apell and codigo and facultad):
        return jsonify(success=False, message="Faltan datos"), 400

    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("SELECT id FROM users WHERE username = %s", (username,))
    user = cursor.fetchone()

    if not user:
        cursor.close()
        conn.close()
        return jsonify(success=False, message="Usuario no encontrado"), 404

    cursor.execute("""
        UPDATE users 
        SET nombre_completo = %s, codEstudiante = %s, facultad_id = (
            SELECT id FROM facultades WHERE nombre_facultad = %s LIMIT 1
        )
        WHERE username = %s
    """, (nom_apell, codigo, facultad, username))

    conn.commit()
    cursor.close()
    conn.close()

    return jsonify(success=True, message="Datos actualizados correctamente")

if __name__=='__main__':
    app.run(debug=True,port=5000) #El servidor Flask se ejecutará en el puerto 5000 y con el modo de depuración activado.
# Esto permite que el servidor se reinicie automáticamente cuando se detecten cambios en el código.
