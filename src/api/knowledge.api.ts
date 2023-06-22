import axios from '../libs/axios';

export const getRules = async () => {
    return await axios.get('http://localhost:4000/api/knowledge/rules');
} 

export const addRule = async (rule: string) => {
    return await axios.post('http://localhost:4000/api/knowledge/rules', {rule});
}  

export const deleteRule = async (id: string) => {
    return await axios.delete(`http://localhost:4000/api/knowledge/rules/${id}`,);
} 

export const getDevices = async () => {
    return await axios.get('http://localhost:4000/api/knowledge/devices');
} 

export const deleteDevice = async (id: string) => {
    return await axios.delete(`http://localhost:4000/api/knowledge/devices/${id}`,);
} 

export const searchDevice = async (device: string) => {
    return await axios.get(`http://localhost:4000/api/knowledge/devices/search/${device}`);
}

export const getDeviceSpecs = async (id: string) => {
    return await axios.get(`http://localhost:4000/api/knowledge/devices/specs/${id}`);
}

export const addDevice = async (id:string, price: string) => {
    return await axios.post('http://localhost:4000/api/knowledge/devices', {id, price});
} 

// deprecated

export const getFacts = async () => {
    return await axios.get('http://localhost:4000/api/knowledge/facts');
} 

export const addFact = async (fact: string) => {
    return await axios.post('http://localhost:4000/api/knowledge/facts', {fact});
}