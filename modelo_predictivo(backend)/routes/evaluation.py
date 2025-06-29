from flask import json, request, jsonify
from database.db import get_connection

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