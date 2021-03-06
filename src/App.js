import React, { useState, useEffect } from "react";
import api from './services/api';

import "./styles.css";

function App() {

  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
      api.get('repositories').then(response => {
          setRepositories(response.data);
      })
  }, []);

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title:`repositorio ${Date.now()}`,
    });

    const repo = response.data;

    setRepositories([...repositories, repo]);
  }

  async function handleRemoveRepository(id) {   
    const response = await api.delete(`repositories/${id}`);  
    let repoIndex = repositories.findIndex(item => item.id === id);   
    if (response.status === 204){ 
      repositories.splice(repoIndex,1);
      setRepositories([...repositories]);
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(item => 
          <li key={item.id}>
            {item.title}
            <button onClick={() => handleRemoveRepository(item.id)}>
              Remover
            </button>        
          </li>       
         )
        }
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
