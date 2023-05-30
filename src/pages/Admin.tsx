import React, { useState, useEffect } from 'react';
import { setup } from '../api/auth.api'; 
import {
  getRules,
  addRule,
  getFacts,
  addFact
} from '../api/knowledge.api';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/auth';

function Admin() {

  const [renderSetup, setRenderSetup] = useState<Promise<boolean>>();
  const [rules, setRules] = useState<string[]>([]);
  const [facts, setFacts] = useState<string[]>([]);
  const [newRule, setNewRule] = useState<string>('');
  const [newFact, setNewFact] = useState<string>('');

  const navigate = useNavigate();
  const logout = useAuthStore((state) => state.logout); 

  // Función para enviar la nueva regla al servidor
  const handleSubmitRule = () => {
    addRule(newRule)
      .then(response => {
        setRules([...rules, response.data]);
        setNewRule('');
      })
      .catch(error => {
        console.log(error);
      });
  };

  // Función para enviar el nuevo hecho al servidor
  const handleSubmitaddFact = () => {
    addFact(newFact)
      .then(response => {
        setFacts([...facts, response.data]);
        setNewFact('');
      })
      .catch(error => {
      console.log(error);
      });
  };

  // Función para recuperar los datos existentes de la base de datos
  const fetchData = () => {
    getRules()
      .then(response => {
        setRules(response.data.rules);
      })
      .catch(error => {
        console.log(error);
      });

    getFacts()
      .then(response => {
          setFacts(response.data.facts);
      })
      .catch(error => {
          console.log(error);
      });
  };

  const validateSetup = async () => {
    try {
      const {status} = await setup();
      
      //if(status == 100) return false;
      
      if(status == 204){
        console.log(true);
        return true;
      }
      
      console.log(false);
      return false;

      
      } catch (error) {
        console.error(error);
        throw error;
      }
    };
  // Utiliza useEffect para cargar los datos existentes al cargar la página
  useEffect(() => {
    validateSetup()
      .then((result) => {
        setRenderSetup(result)
      })
        .then(() => fetchData());
      
    //validateSetup().then(() => fetchData());
  }, []);

  // if(renderSetup === true){
  //   return (<GetStarted/>)
  // }

  return (
    <div className="container">
      <div className="container-cards">
        {/* <h1 className='tittle'>Admin dashboard brand name</h1> */}
        <div className="rule-card">
          <h1>Rules</h1>
          <ul>
            {rules.map((rule, index) => (
              <li key={index}>{rule}</li>
            ))}
          </ul>
          <form onSubmit={handleSubmitRule}>
            <input type="text" value={newRule} onChange={(e) => setNewRule(e.target.value)} />
            <button type="submit">AGREGAR</button>
          </form>
        </div>
    
        <div className="fact-card">
          <h1>Facts</h1>
          <ul>
            {facts.map((fact, index) => (
              <li key={index}>{fact}</li>
            ))}
          </ul>
          <form onSubmit={handleSubmitaddFact}>
            <input type="text" value={newFact} onChange={(e) => setNewFact(e.target.value)} />
            <button type="submit">AGREGAR</button>
          </form>
        </div>
      </div>
      <button onClick={() => {
        logout();
        navigate('/login');
      }}>Exit</button>
    </div>
  );
}

export default Admin;