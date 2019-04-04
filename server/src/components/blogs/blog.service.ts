import { Blog } from "./blog";
import { BlogRepo } from './blog.repo';

interface IBlogServiceContext {
    blogRepo: BlogRepo;
}

class BlogService {

    constructor(private context: IBlogServiceContext){
        
    }

    getBlogs() : Promise<Blog[]> {
        return new Promise<Blog[]>(async (resolve, reject) => {
            
            resolve(await this.context.blogRepo.getBlogs());
        }); 
    }
}

export { BlogService };