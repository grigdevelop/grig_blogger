import * as express from 'express';
const app : express.Express = express();
const port : number = 7777;
import blogs from './components/blogs';

app.get('/', (req, res) => res.send('Hello, World from Node'));
app.use('/blogs', blogs);

app.listen(port, () => console.log(`Listening port ${port}`));