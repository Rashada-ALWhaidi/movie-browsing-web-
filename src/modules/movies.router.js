
import * as movieController from './movies.controller.js';

const router = (req, res) => {
    const { method, url } = req;
    const urlParts = url.split('/'); 
    const id = urlParts[2];

    res.setHeader('Content-Type', 'application/json');


    if (urlParts[1] === 'movies') {

        // 1.GET movies 
        if (method === 'GET' && !id) {
            return movieController.getAllMovies(req, res);
        }

        // 2.GET a movie by ID
        if (method === 'GET' && id) {
            return movieController.getMovieById(req, res, id);
        }

        // 3.add movies 
        if (method === 'POST') {
            return movieController.addMovie(req, res);
        }

        // 4.update movie
        if (method === 'PATCH' && id) {
            return movieController.updateMovie(req, res, id);
        }

        // 5.DELETE movie
        if (method === 'DELETE' && id) {
            return movieController.deleteMovie(req, res, id);
        }
    }

    // إذا المسار مش موجود (404)
    res.writeHead(404);
    res.end(JSON.stringify({ message: "Route not found" }));
};

export default router;