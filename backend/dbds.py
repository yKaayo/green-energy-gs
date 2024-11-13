import pandas as pd
from sklearn.linear_model import LinearRegression
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_squared_error

df = pd.read_csv('GERACAO_USINA-2_2024_01.csv', delimiter=';')

df['din_instante'] = pd.to_datetime(df['din_instante'])

# Extrair recursos adicionais a partir da data (ano, mês e hora)
df['ano'] = df['din_instante'].dt.year
df['mes'] = df['din_instante'].dt.month
df['hora'] = df['din_instante'].dt.hour

# Converter colunas categóricas para variáveis dummies (one-hot encoding)
df = pd.get_dummies(df, columns=['id_subsistema', 'nom_subsistema', 'id_estado', 'cod_modalidadeoperacao', 
                                 'nom_tipousina', 'nom_tipocombustivel', 'nom_usina', 'id_ons'], drop_first=True)

# Definir a variável de entrada (X) e a variável alvo (y)
X = df.drop(columns=['val_geracao', 'din_instante', 'nom_estado', 'ceg'])
y = df['val_geracao']

# Dividir os dados em treino e teste
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Criar o modelo de regressão linear e treiná-lo
model = LinearRegression()
model.fit(X_train, y_train)

# Prever no conjunto de teste e calcular o erro médio quadrático
y_pred = model.predict(X_test)
mse = mean_squared_error(y_test, y_pred)
print("Erro médio quadrático:", mse)

# Exibir o coeficiente de regressão para cada variável
coef_df = pd.DataFrame(model.coef_, X.columns, columns=['Coeficiente'])
print(coef_df)