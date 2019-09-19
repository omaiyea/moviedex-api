const app = require('./app'); //file with controller code

const PORT = 8000;

app.listen(8000, () => {
    console.log(`express sever is listening on port ${PORT}`);
});