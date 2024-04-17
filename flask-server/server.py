from flask import Flask, request, jsonify
import json

app = Flask(__name__)

# Carregar membros do arquivo members.py
@app.route('/members', methods=['GET'])
def load_members():
    with open('members.py', 'r') as file:
        members_data = file.read()
        return json.loads(members_data)


# Rota para adicionar membros
@app.route('/add_member', methods=['POST'])
def add_member():
    new_member = request.json['member']
    members = load_members()
    members['members'].append(new_member)
    with open('members.py', 'w') as file:
        json.dump(members, file)
    return jsonify({'message': 'Member added successfully'})


@app.route('/idade', methods=['GET'])
def load_idade():
    with open('idade.py', 'r') as file:  # Alterado para o arquivo correto
        idade_data = file.read()
        return json.loads(idade_data)
    
@app.route('/add_idade', methods=['POST'])
def add_idade():
    new_idade = request.json['idade']
    idade = load_idade()
    idade['idade'].append(new_idade)
    with open('idade.py', 'w') as file:
        json.dump(idade, file)
    return jsonify({'message': 'Idade added successfully'})

if __name__ == '__main__':
    app.run(debug=True)
