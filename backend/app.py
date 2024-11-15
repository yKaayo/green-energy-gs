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
        
        emission = [0.05, 0.12, 0.10, 0.15, 0.03]
        
        total_emission = 0
        for i, resposta in enumerate(formAnswers):
            if resposta == "2":
                total_emission += emission[i]
            elif resposta == "1":
                total_emission += emission[i]
            elif resposta == "0":
                total_emission += emission[i]
    
        media_emissoes = round(total_emission / len(formAnswers), 2)
        
        print(media_emissoes)
    
        if media_emissoes >= 0.75:
            classificacao = "Gastador"
        elif media_emissoes >= 0.5 and media_emissoes <= 0.74:
            classificacao = "Mediano"
        else:
            classificacao = "Economista"
    
        print(classificacao)
        
        return jsonify({'media_emissoes': media_emissoes, 'classificacao': classificacao})
        
    except Exception as e:
        print("Erro:", str(e))
        return jsonify({'erro': str(e)}), 400

if __name__ == '__main__':
    app.run(port=5000, debug=True)