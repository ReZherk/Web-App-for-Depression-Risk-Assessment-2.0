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

scaler=StandardScaler()
x_scaled=scaler.fit_transform(x) # Ajusta el escalador a los datos y transforma x


X_train, X_test, y_train, y_test = train_test_split(x_scaled, y, test_size=0.2, random_state=42)

print(f"X_train shape: {X_train.shape[1]}, X_test shape: {y_test.shape}")
