import React, { useState, useEffect } from "react";

function App() {
  const [membersData, setMembersData] = useState({ members: [] });
  const [idadesData, setIdadesData] = useState({ idade: [] });
  const [newIdade, setNewIdade] = useState("");
  const [newMember, setNewMember] = useState("");

  const loadMembers = () => {
    fetch("/members")
      .then((res) => res.json())
      .then((data) => {
        setMembersData(data);
        console.log("Membros carregados:", data);
      })
      .catch((error) => {
        console.error("Erro ao carregar membros:", error);
      });
  };

  useEffect(() => {
    loadMembers();
  }, []);

  const loadIdades = () => {
    fetch("/idade")
      .then((res) => res.json())
      .then((idadesData) => {
        setIdadesData(idadesData);
        console.log("Idades carregadas:", idadesData);
      })
      .catch((error) => {
        console.error("Erro ao carregar idades:", error);
      });
  };

  useEffect(() => {
    loadIdades();
  }, []);

  const handleAddMember = () => {
    fetch("/add_member", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ member: newMember }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Resposta ao adicionar membro:", data);
        setNewMember("");
        // Carregar membros novamente após adicionar um novo membro
        loadMembers();
      })
      .catch((error) => {
        console.error("Erro ao adicionar membro:", error);
      });
  };

  const handleAddIdade = () => {
    fetch("/add_idade", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ idade: newIdade }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Resposta ao adicionar idade:", data);
        setNewIdade("");

        loadIdades();
      })
      .catch((error) => {
        console.error("Erro ao adicionar idade:", error);
      });
  };

  return (
    <div>
      <h1>Members</h1>
      <div>
        {membersData.members.map((member, i) => (
          <p key={i}>{member}</p>
        ))}
      </div>
      <input
        type="text"
        value={newMember}
        onChange={(e) => setNewMember(e.target.value)}
      />
      <button onClick={handleAddMember}>Add Member</button>
      <h1>Idades</h1>
      <div>
        {idadesData.idade.map((idade, i) => (
          <p key={i}>{idade}</p>
        ))}
      </div>
      <input
        type="number"
        value={newIdade}
        onChange={(e) => setNewIdade(e.target.value)}
      />
      <button onClick={handleAddIdade}>Add Idade</button>
    </div>
  );
}

export default App;
