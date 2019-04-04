import { Blog } from "./blog";
import { DataAccess } from "./../common/dataAccess";

class BlogRepo {
    async getBlogs(): Promise<Blog[]> {
        const db = await (new DataAccess().getInstance());
        return db.blogs.getAll();
    }
}

export { BlogRepo };