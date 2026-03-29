import http from 'http';
import router from './src/modules/movies.router.js'; 

const PORT = 3000;

const server = http.createServer((req, res) => {
    router(req, res);
});

server.listen(PORT, () => {
    console.log(`Server running on port:${PORT}`);
});