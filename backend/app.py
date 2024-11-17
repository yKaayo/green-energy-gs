from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/calcular', methods=['POST'])
def calcular():
    try:
        dados = request.get_json()
        formQuestions = dados.get('question')
        formAnswers = dados.get('answer')
        
        print("Dados recebidos!")
        print(f"Pergunta: {formQuestions}")
        print(f"Resposta: {formAnswers}")
        
        total_emission = 0
        for i, resposta in enumerate(formAnswers):
            if resposta == "2":
                total_emission += [0.1, 0.5, 7, 1.5, 0.2, 2][i]
            elif resposta == "1":
                total_emission += [0.5, 3.5, 1, 1, 0.6, 1][i]
            elif resposta == "0":
                total_emission += [1, 5, 0.5, 0.5, 1, 0.5][i]
    
        mean_emission = total_emission / 5
        
        print(mean_emission)
    
        if mean_emission >= 2:
            rating = "Gastador"
        elif mean_emission >= 1.4 and mean_emission < 2:
            rating = "Mediano"
        else:
            rating = "Economista"
    
        print(rating)
        
        return jsonify({'media_emissoes': mean_emission, 'rating': rating})
        
    except Exception as e:
        print("Erro:", str(e))
        return jsonify({'erro': str(e)}), 400

if __name__ == '__main__':
    app.run(port=5000, debug=True)
    