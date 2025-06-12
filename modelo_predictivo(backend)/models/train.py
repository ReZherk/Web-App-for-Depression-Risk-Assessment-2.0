import tensorflow as tf
import joblib
import pandas as pd
from sklearn.model_selection import train_test_split # Importa la función para dividir datos en entrenamiento y prueba
from sklearn.preprocessing import StandardScaler # Permite normalizar los valores de los datos para que tengan una escala uniforme



df=pd.read_csv('trainer_data.csv') # Carga el archivo CSV en un DataFrame de pandas
#Un dataframe es una estructura de datos bidimensional que se asemeja a una tabla, donde cada columna puede tener un tipo de dato diferente (números, cadenas, etc.).

x=df.iloc[:,0:9] # Selecciona todas las filas y las columnas de la 0 a la 8
#iloc es un método de pandas que permite seleccionar filas y columnas por sus índices.La coma indica que se seleccionan todas las filas, y el rango 0:9 indica que se seleccionan las columnas desde la 0 hasta la 8 (sin incluir la 9).

y=df['depresion']#Selecciona toda la columna 'depresion' del DataFrame df.


# Se usa StandardScaler cuando las variables tienen escalas muy diferentes (ej. Edad: 20-50 vs. Ingresos: 10,000-100,000)Como inputs obviamente.
# StandardScaler ajusta los datos para que tengan una media de 0 y una desviación estándar de 1,
# evitando que algunas variables influyan más que otras en el modelo.
scaler=StandardScaler()
x_scaled=scaler.fit_transform(x) # Ajusta el escalador a los datos y transforma x

# Guarda el scaler para reutilizarlo y asegurar la misma normalización en futuras predicciones
joblib.dump(scaler, 'scaler.save')
# Un scaler ajusta y transforma datos a una escala uniforme, evitando valores desbalanceados
# joblib es una librería para guardar y cargar objetos en Python, incluyendo modelos y scalers
# joblib.dump() es un método que guarda el scaler para reutilizarlo en futuras predicciones


# train_test_split toma los datos y los divide en entrenamiento y prueba de manera aleatoria.
# Devuelve cuatro partes: X_train y X_test (datos de entrada) y y_train y y_test (resultados esperados).
#No buscar logica, el metodo train_test_split divide los datos en dos conjuntos: uno para entrenar el modelo y otro para probar su rendimiento.
X_train, X_test, y_train, y_test = train_test_split(x_scaled, y, test_size=0.2, random_state=42)
# test_size=0.2: Porcentaje de datos reservados para prueba (20%) y random_state fija la división de datos para que siempre sea la misma en cada ejecución.Se usa para asegurar que los resultados sean reproducibles. 


# Modelo con tres capas densas: 16 y 8 neuronas (ReLU) + 1 neurona (Sigmoid) para clasificación binaria
#Se usa ReLU (Rectified Linear Unit) como función de activación en las primeras capas para introducir no linealidades y Sigmoid en la última capa para obtener una probabilidad entre 0
# y 1.Lo que significa que la salida del modelo será un valor entre 0 y 1, lo que es adecuado para problemas de clasificación binaria.

model=tf.keras.Sequential([

tf.keras.layers.Dense(16, activation='relu', input_shape=(X_train.shape[1],)), # Capa de entrada con 16 neuronas y activación ReLU
tf.keras.layers.Dense(8, activation='relu'), # Capa oculta con 8 neuronas y activación ReLU
tf.keras.layers.Dense(1, activation='sigmoid') # Capa de salida con 1 neurona y activación Sigmoid
# ReLU introduce no linealidades, permitiendo al modelo aprender relaciones complejas entre entrada.

])

model.compile(optimizer='adam', loss='binary_crossentropy', metrics=['accuracy'])
# Compila el modelo con el optimizador Adam, la función de pérdida de entropía cruzada binaria y la métrica de precisión
model.fit(X_train, y_train, epochs=500, batch_size=8, validation_split=0.1)
#Entrena el modelo con los datos de entrenamiento durante 50 épocas, con un tamaño de lote de 8 y un 10% de los datos para validación.La validacion_split separa un porcentaje de los datos de entrenamiento para evaluar el rendimiento del modelo durante el entrenamiento.


#Es un método de Keras que evalúa el rendimiento del modelo entrenado usando datos que nunca vio.
loss, acc = model.evaluate(X_test, y_test)
print(f"Precisión: {acc:.2f}")
# Evalúa el modelo con los datos de prueba y devuelve la pérdida (loss) y precisión (acc)
# Luego imprime la precisión con dos decimales

model.save('depression_model.h5')