import { Blog } from "./blog";
import { DataAccess, IDatabase } from "./../common/dataAccess";

class BlogRepo {
    private readonly db: IDatabase;

    constructor(db: IDatabase){
        this.db = db;
    }

    async getBlogs(): Promise<Blog[]> {
        return this.db.blogs.getAll();
    }

    async createBlog(blog: Blog): Promise<Blog> {
        return this.db.blogs.create(blog);
    }
}

export { BlogRepo };