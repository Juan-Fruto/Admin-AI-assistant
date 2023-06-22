import React, { useState, useEffect } from 'react';
import { setup } from '../api/auth.api'; 
import {
  getRules,
  addRule,
  deleteRule,
  getDevices,
  deleteDevice
} from '../api/knowledge.api';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/auth';
import Swal from 'sweetalert2';
import sleep from '../utils/sleeper';

function Admin() {

  const [renderSetup, setRenderSetup] = useState<Promise<boolean>>();
  const [rules, setRules] = useState<string[]>([]);
  const [devices, setDevices] = useState<string[]>([]);
  const [newRule, setNewRule] = useState<string>('');
  const [searchDevice, setSearchDevice] = useState<string>('');

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
  const handleSearchDevice = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const username =  (e.currentTarget.elements[0] as HTMLInputElement).value
    navigate(`/devices?search=${searchDevice}`);
  };

  // Función para recuperar los datos existentes de la base de datos
const fetchData = async () => {
  try {
    const rulesResponse = await getRules();
    setRules(rulesResponse.data.rules);

    const devicesResponse = await getDevices();
    // change the any type
    const devicesDB = (devicesResponse.data.devices).map((d: any) => {
      const price = d.price

      if(price % 100 == 0) return {id: d.id, name: d.name, price:`$${(d.price)/100}.00`}
      
      return {id: d.id, name: d.name, price:`$${(d.price)/100}`}
      // if(price % 100 == 0) return `${d.name} $${(d.price)/100}.00`
      
      // return `${d.name} $${(d.price)/100}`
    });

    setDevices(devicesDB); 
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const handleDeleteClick = async (id: string, model: string, deleteFunc: (id: string) => Promise<void>) => {
  Swal.fire({
    title: `Are you sure to delete ${model}?`,
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#091d2b',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        await deleteFunc(id);
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        );
        await sleep(2000);
        window.location.reload();
      } catch (error) {
        console.log(error);
        Swal.fire(
          'Error!',
          'An error occurred while deleting the item.',
          'error'
        );
      }
    }
  });
};

 
  // Utiliza useEffect para cargar los datos existentes al cargar la página
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="container">
      <div className="container-cards">

        <div className="rule-card">
          <h1>Devices</h1>
          <ul>
            {devices.map((device, index) => (
              <li key={index}>
                {device.name + " " + device.price}
                <button className='buttom-search-device' onClick={() => 
                  handleDeleteClick(device.id, device.name, deleteDevice)}>
                  <i className="fi fi-rs-trash"/>
                </button>
              </li>
            ))}
          </ul>
          <form onSubmit={handleSearchDevice}>
            <input type="text" value={searchDevice} onChange={(e) => setSearchDevice(e.target.value)} />
            <button type="submit">SEARCH AND ADD</button>
          </form>
        </div>
    
        <div className="fact-card">
          <h1>Rules</h1>
          <ul>
            {rules.map((rule, index) => (
              <li key={index}>
                <p className='rule-content'>{rule.content}</p>
                <button className='buttom-search-device' onClick={() => 
                  handleDeleteClick(rule._id, "this rule", deleteRule)}>
                  <i className="fi fi-rs-trash"/>
                </button>
              </li>
            ))}
          </ul>
          <form onSubmit={handleSubmitRule}>
            <input type="text" value={newRule} onChange={(e) => setNewRule(e.target.value)} />
            <button type="submit">ADD</button>
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