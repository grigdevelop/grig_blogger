import 'mocha';
import { expect } from 'chai';
import * as TypeMoq from 'typemoq';

import { BlogRepo } from './blog.repo';
import { BlogService } from './blog.service';
import { Blog } from './blog';

describe('BlogService', () => {
    it('should get blogs', async () => {
        const blogs : Blog[] = [
            {id: 1, title: 'test blog 1', content: 'test content 1'},
            {id: 2, title: 'test blog 2', content: 'test content 2'}
        ];
        const blogsPromise: Promise<Blog[]> = new Promise<Blog[]>( (resolve, reject) => {
            resolve(blogs);
        } );
        
        const mock: TypeMoq.IMock<BlogRepo> = TypeMoq.Mock.ofType(BlogRepo);
        mock.setup( repo => repo.getBlogs()).returns(() => blogsPromise);
        
        const blogService = new BlogService({blogRepo: mock.object});
        
        const result = await blogService.getBlogs();
        expect(result.length).to.equal(2);
        expect(result[0].id).to.equal(blogs[0].id);
        expect(result).to.equal(blogs);
    });
    
    it('should create blog', async () => {
        
        // mock
        const dbBlogs = [];
        let index = 1;        
                
        const mock: TypeMoq.IMock<BlogRepo> = TypeMoq.Mock.ofType(BlogRepo);
        mock.setup( repo => repo.createBlog( TypeMoq.It.isAny() ) )  
        .callback( (blog) => {
            blog.id = index++;
            dbBlogs.push(blog);
        })     
        .returns( (blog) =>  new Promise<Blog>( (resolve, reject) => {
            resolve(blog);
        } ) );

        // act
        const service : BlogService = new BlogService( { blogRepo: mock.object });
        const expectedBlog : Blog = { id: 0, title: 'Some title', content: 'Some content' };
        const response = await service.createBlog(expectedBlog);

        // assert
        expect(dbBlogs.length).to.be.equal(1);
        expect(dbBlogs[0].id).not.to.be.equal(0);
        expect(dbBlogs[0].title).to.be.equals(expectedBlog.title);
        expect(dbBlogs[0].content).to.be.equals(expectedBlog.content);
    });

    it('should validate blog', ( done ) => {
        const mock: TypeMoq.IMock<BlogRepo> = TypeMoq.Mock.ofType(BlogRepo);
        mock.setup( repo => repo.createBlog( TypeMoq.It.isAny() ) )
        .returns(blog => new Promise<Blog>((resolve, reject) => resolve(blog)));
        const blogService : BlogService = new BlogService( { blogRepo: mock.object });

        const blog : Blog = { id: 0, title: null, content: null };
        
        blogService.createBlog(blog)
        .then( blog => expect(null).to.not.null('create blog not throws invalid error'))
        .catch( error => console.log('method error: ', error))
        .finally(done);
        
    });
});