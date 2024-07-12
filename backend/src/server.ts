import express from 'express';
import bodyParser from 'body-parser';
import userRoutes from "./routes/userRoutes";
import {registerUser} from "./controllers/userController";
import router from "./routes/userRoutes";

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.get('/health', (req, res) => {
    res.send('Server is healthy');
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

router.post('/register', registerUser);
