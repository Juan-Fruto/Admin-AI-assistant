import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { searchDevice, getDeviceSpecs, addDevice } from '../api/knowledge.api';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'animate.css';

interface SearchResult {
  id: string;
  model: string;
  image: string;
}

function Devices() {

  const hasLoaded = useRef(true);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const deviceName = queryParams.get('search');

  const [searchTerm, setSearchTerm] = useState<string>(deviceName || '');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);

  const handleSearch = async (deviceName: string) => {
    const res = await searchDevice(deviceName);
    if(res.status != 200) setSearchTerm([]);
    setSearchResults(res.data);
  };

  useEffect(() => {
    if(deviceName){
      if(hasLoaded.current){
        hasLoaded.current = false;
        handleSearch(deviceName);
      }
    }
  }, [deviceName]);

  const handleSearchClick = () => {
    handleSearch(searchTerm);
  };

  const handleSpecsClick = async (id: string) => {
    console.log(id);
    const response = await getDeviceSpecs(id);
    const specs = response.data;
    console.log(specs);

    Swal.fire({
      title: specs.model,
      html: 
        `<p>CPU: ${specs.cpu}<\p>` +
        `<p>RAM: ${specs.ram}<\p>` +
        `<p>Storage: ${specs.storage}<\p>` +
        `<p>Display: ${specs.displaySize}<\p>` +
        `<p>Display type: ${specs.displayType}<\p>` +
        `<p>Number of cameras: ${specs.cameras}<\p>` +
        `<p>Main camera: ${specs.mainCamera}<\p>` +
        `<p>Battery: ${specs.battery}<\p>` +
        `<p>Released at ${specs.released}<\p>`,
      // imageUrl: specs.image,
      // imageHeight: 170,
      showClass: {
        popup: 'animate__animated animate__fadeInDown'
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutUp'
      }
    })
  };

  const handleAddClick = async (id: string, model: string) => {
    Swal.fire({
      title: `Add ${model}`,
      text: "Insert the price",
      input: 'number',
      inputAttributes: {
        autocapitalize: 'off',
        placeholder: '$',
        min: 0.00,
        max: 99999999.99,
        step: '0.01'
      },
      showCancelButton: true,
      confirmButtonText: 'Add',
      showLoaderOnConfirm: true,
      preConfirm: async (price: string) => {
        try {
          // const response = await fetch(`//api.github.com/users/${login}`);
          // if (!response.ok) {
          //   throw new Error(response.statusText);
          // }
          // return response.json();
          const response = await addDevice(id, price)
          if (response.status != 200) {
             throw new Error(response.statusText);
          }
          console.log(price);
          return price;
        } catch (error) {
          Swal.showValidationMessage(`Request failed: ${error}`);
        }
      },
      allowOutsideClick: () => !Swal.isLoading(),
      showClass: {
        popup: 'animate__animated animate__fadeInDown'
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutUp'
      }
    }).then((result: any) => {
      if (result.status === 200) {
        Swal.fire({
          title: `Added`,
        });
      }
    });
  };

  return (
    <div className='container-cards'>
      <div className='fact-card'>
        <label htmlFor="searchInput">Buscar:</label>
        <input
          type="text"
          id="searchInput"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button type='submit' onClick={handleSearchClick}>Buscar</button>

        <div>
          <ul>
            {searchResults.map((d, index) => (
              <li key={index}>
                {d.model}
                <div className='buttons-container'>
                  <button className='buttom-search-device' onClick={() => handleSpecsClick(d.id)}>SPECS</button>
                  <button className='buttom-search-device' onClick={() => handleAddClick(d.id, d.model)}>ADD</button>
                  </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Devices;
