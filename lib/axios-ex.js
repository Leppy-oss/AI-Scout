import axios from 'axios';
import { error } from './swal';

export async function fetchWithHandling(url, config={}) {
    try {
        return await axios.get(url, config);
    } catch(e) { error(`Error fetching from ${url}`, e); }
}

export async function postWithHandling (url, data, config={}) {
    try {
        return await axios.post(url, data, config);
    } catch(e) { error(`Error communicating with ${url}`, e); }
}