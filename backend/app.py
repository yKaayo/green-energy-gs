from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/calcular', methods=['POST'])
def calcular():
    try:
        dados = request.get_json()
        firstQuestion = dados.get('answer1')
        
        print("Dados recebidos!")
        print(f"Resposta: {firstQuestion}")
        
        return jsonify({
            'status': 'sucesso',
            'resposta': firstQuestion,
            'mensagem': f'Você selecionou a opção com valor {firstQuestion}'
        })
        
    except Exception as e:
        print("Erro:", str(e))
        return jsonify({'erro': str(e)}), 400

if __name__ == '__main__':
    app.run(port=5000, debug=True)