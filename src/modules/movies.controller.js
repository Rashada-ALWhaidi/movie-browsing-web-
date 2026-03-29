
import * as movieService from './movieService.js';

 
export const getAllMovies = (req, res) => {
    try {
        const movies = movieService.fetchAllMovies();
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(movies));
    } catch (error) {
        res.writeHead(500);
        res.end(JSON.stringify({ message: "Internal Server Error" }));
    }
};


export const getMovieById = (req, res, id) => {
    const movie = movieService.fetchMovieById(id);
    
    if (!movie) {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ message: "Movie not found" }));
    }

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(movie));
};


export const addMovie = (req, res) => {
    let body = '';
    req.on('data', chunk => body += chunk.toString());
    req.on('end', () => {
        try {
            const movieData = JSON.parse(body);
            const newMovie = movieService.createMovie(movieData);
            res.writeHead(201, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(newMovie));
        } catch (error) {
            res.writeHead(400);
            res.end(JSON.stringify({ message: "Invalid JSON data" }));
        }
    });
};


export const  updateMovie= (req, res, id) => {
    let body = '';
    req.on('data', chunk => body += chunk.toString());
    req.on('end', () => {
        try {
            const updates = JSON.parse(body);
            const updatedMovie = movieService.updateMovie(id, updates);

            if (!updatedMovie) {
                res.writeHead(404, { 'Content-Type': 'application/json' });
                return res.end(JSON.stringify({ message: "Movie not found" }));
            }

            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(updatedMovie));
        } catch (error) {
            res.writeHead(400);
            res.end(JSON.stringify({ message: "Invalid JSON data" }));
        }
    });
};


export const deleteMovie = (req, res, id) => {
    const isDeleted = movieService.removeMovie(id);

    if (!isDeleted) {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ message: "Movie not found to delete" }));
    }

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: "Movie deleted successfully" }));
};