
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_PATH = path.join(__dirname, '..', 'data', 'movies.json');

const readData = () => JSON.parse(fs.readFileSync(DATA_PATH, 'utf8'));
const writeData = (data) => fs.writeFileSync(DATA_PATH, JSON.stringify(data, null, 2));

export const fetchAllMovies = () => {
    return readData();
};

export const fetchMovieById = (id) => {
    const movies = readData();
    return movies.find(m => m.id === parseInt(id));
};

export const createMovie = (movieData) => {
    const movies = readData();
    const newMovie = { 
        id: movies.length > 0 ? movies[movies.length - 1].id + 1 : 1, 
        ...movieData 
    };
    movies.push(newMovie);
    writeData(movies);
    return newMovie;
};

export const updateMovie = (id, updates) => {
    const movies = readData();
    const index = movies.findIndex(m => m.id === parseInt(id));

    if (index === -1) return null; 

    movies[index] = { ...movies[index], ...updates };
    writeData(movies);
    return movies[index];
};


export const removeMovie = (id) => {
    const movies = readData();
    const initialLength = movies.length;
    const filteredMovies = movies.filter(m => m.id !== parseInt(id));

    if (filteredMovies.length === initialLength) return false; 

    writeData(filteredMovies);
    return true;
};