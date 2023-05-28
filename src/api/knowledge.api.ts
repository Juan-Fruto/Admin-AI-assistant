import axios from '../libs/axios';

export const getRules = async () => {
    return await axios.get('http://localhost:4000/api/knowledge/rules');
} 

export const addRule = async (rule: string) => {
    return await axios.post('http://localhost:4000/api/knowledge/rules', {rule});
} 

export const getFacts = async () => {
    return await axios.get('http://localhost:4000/api/knowledge/facts');
} 

export const addFact = async (fact: string) => {
    return await axios.post('http://localhost:4000/api/knowledge/facts', {fact});
} 