import { Blog } from "./blog";
import { BlogRepo } from './blog.repo';
import * as Joi from 'joi';

interface IBlogServiceContext {
    blogRepo: BlogRepo;
}

class BlogService {

    constructor(private context: IBlogServiceContext){
        
    }

    getBlogs() : Promise<Blog[]> {
        return new Promise<Blog[]>(async (resolve, reject) => {
            const blogs = await this.context.blogRepo.getBlogs(); 
            resolve(blogs); 
        }); 
    }

    createBlog(blog: Blog) : Promise<Blog> {
        return new Promise<Blog>( async (resolve, reject) => {

            const schema = {
                title: Joi.string().not().empty().min(3),
                content: Joi.string()
            };
            
            const { error, value } = Joi.validate(blog, schema);
            if( error ){
                reject(error);
                return;
            }

            blog = await this.context.blogRepo.createBlog(blog);
            resolve(blog);
        });
    }
} 

export { BlogService };