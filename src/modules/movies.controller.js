
import * as movieService from './movies.service.js';

 
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

            //(Validation)
            const errors = [];

            // 1
            if (!movieData.title || movieData.title.trim() === "") {
                errors.push("Title is required and cannot be empty.");
            }

            // 2.
            if (movieData.year !== undefined && typeof movieData.year !== 'number') {
                errors.push("Year must be a number.");
            }

            // 3.
            if (movieData.rating !== undefined && typeof movieData.rating !== 'number') {
                errors.push("Rating must be a number if provided.");
            }

            // 4.
            if (errors.length > 0) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                return res.end(JSON.stringify({ 
                    status: "fail", 
                    message: "Validation failed", 
                    errors: errors 
                }));
            }

            
            const newMovie = movieService.createMovie(movieData);
            res.writeHead(201, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(newMovie));

        } catch (error) {
            res.writeHead(400);
            res.end(JSON.stringify({ message: "Invalid JSON format" }));
        }
    });
};


export const updateMovie = (req, res, id) => {
    let body = '';
    req.on('data', chunk => body += chunk.toString());
    
    req.on('end', () => {
        try {
            const updates = JSON.parse(body);
            const errors = []; // مصفوفة لتجميع الأخطاء

            // --- هون بنحط الـ Validation ---
            
            // 1. فحص السنة (إذا بعتها المستخدم، لازم تكون رقم)
            if (updates.year !== undefined && typeof updates.year !== 'number') {
                errors.push("Year must be a number.");
            }

            // 2. فحص التقييم (إذا بعته المستخدم، لازم يكون رقم)
            if (updates.rating !== undefined && typeof updates.rating !== 'number') {
                errors.push("Rating must be a number.");
            }

            // إذا في أخطاء، بنرد فوراً بـ 400 وبنوقف
            if (errors.length > 0) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                return res.end(JSON.stringify({ status: "fail", errors }));
            }

            // إذا كل شيء تمام، بننادي السيرفس
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