import * as express from 'express';
import { BlogService } from './blog.service';
import { BlogRepo } from './blog.repo';

const router = express.Router();

router.get('/',async (req : express.Request, resp : express.Response) => {
    const service = new BlogService({ blogRepo: new BlogRepo()});
    resp.send(await service.getBlogs());
});

router.get('/:id', (req: express.Request, resp: express.Response) => {
    var id = req.params.id;
    resp.send(`here will blog with ${id} identifier`);
});

export default router;