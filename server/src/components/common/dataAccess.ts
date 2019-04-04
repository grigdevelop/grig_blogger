import { Blog } from "./../blogs/blog";

interface IDataSet<TEntity>{
    executeQueryWithResult(query: string): Promise<TEntity[]>;
    create(entity: TEntity):Promise<TEntity>;
    update(entity: TEntity):Promise<TEntity>;
    delete(id: number):Promise<void>;
    getById(id: number):Promise<TEntity>;
    getAll(): Promise<TEntity[]>;
}

class InMemoryDataSet<TEntity> implements IDataSet<TEntity>{
    
    private list: TEntity[];
    private index: number = 1;
    
    constructor(list?: TEntity[]){
        if(list == null) list = [];
        this.list = list;
    }
    
    executeQueryWithResult(query: string): Promise<TEntity[]> {
        throw new Error("Method not implemented.");
    }    
    
    create(entity: TEntity): Promise<TEntity> {
        return new Promise<TEntity>( ( resolve, reject ) => {
            entity['id'] = this.index++;
            this.list.push(entity);
            resolve(entity);
        } );
    }
    update(entity: TEntity): Promise<TEntity> {
        return new Promise<TEntity>( (resolve, reject) => {
            // getting database item
            let dbEntity = this.list.find(item => item['id'] === entity['id']);
            if(!dbEntity) {
                reject(new Error('Item not found'));
                return;
            };

            // removing from db
            const index = this.list.indexOf(dbEntity, 0);
            if (index > -1) {
                this.list.splice(index, 1);
            } else {
                reject(new Error('Item not found'));
                return;
            }

            // adding updated one
            this.list.push(entity);
            resolve(entity);
        } );
    }
    delete(id: number): Promise<void> {
        return new Promise<void>( (resolve, reject) => {

            let dbEntity = this.list.find(item => item['id'] === id);
            if(!dbEntity) {
                reject(new Error('Item not found'));
                return;
            }

            // removing from db
            const index = this.list.indexOf(dbEntity, 0);
            if (index > -1) {
                this.list.splice(index, 1);
            } else {
                reject(new Error('Item not found'));
                return;
            }

            resolve();

        } );
    }
    getById(id: number): Promise<TEntity> {
        return new Promise<TEntity>( (resolve, reject) => {
            let entity = this.list.find(item => item['id'] === id);
            resolve(entity);
        });
    }
    getAll(): Promise<TEntity[]> {
        return new Promise<TEntity[]>( (resolve, reject) => {
            resolve(this.list);
        } );
    }
    
    
}

class DataSet<TEntity>{
    constructor(private tableName: string, private database: IDatabase){
        
    }
    
    executeQueryWithResult(query: string): Promise<TEntity[]>{
        return new Promise<TEntity[]>( (resolve, reject) => {
            
        } );
    }
    
    create(entity: TEntity):Promise<TEntity>{
        return new Promise<TEntity>( (resolve, reject) => {
            
            // TODO: Implement
            resolve(entity);
        } );
    }
    
    update(entity: TEntity):Promise<TEntity>{
        return new Promise<TEntity>( (resolve, reject) => {
            
            // TODO: Implement
            resolve(entity);
        } );
    }
    
    delete(id: number):Promise<void>{
        return new Promise<void>( (resolve, reject) => {
            
            // TODO: Implement
            resolve();
        } );
    }
    
    getById(id: number):Promise<TEntity>{
        return new Promise<TEntity>( (resolve, reject) => {
            
            // TODO: Implement
            reject(new Error("Not implemented"));
        } );
        
    }
    
    getAll(): Promise<TEntity[]> {
        return new Promise<TEntity[]>( (resolve, reject) => {
            
            // TODO: Implement
            resolve([]);
        } );
    }
}

interface IDatabase {
    blogs : IDataSet<Blog>;
}

let zBlogs : Blog[] = [
    {id: 1, title: 'test title 1', content: 'test content 1'},
    {id: 2, title: 'test title 2', content: 'test content 2'},
    {id: 3, title: 'test title 3', content: 'test content 3'},
    {id: 4, title: 'test title 4', content: 'test content 4'},
];


class InMemoryDatabase implements IDatabase {
    blogs: IDataSet<Blog>;
    
    constructor(){
        this.blogs = new InMemoryDataSet<Blog>(zBlogs)
    }
}

class DataAccess{
    private static instance : IDatabase;

    constructor(){
        if(DataAccess.instance == null){
            DataAccess.instance = new InMemoryDatabase();
        }        
    }

    getInstance() : Promise<IDatabase> {
        return new Promise<IDatabase>( ( resolve, reject) => {
            // TODO: Do connection and this kind of things
            resolve(DataAccess.instance);
        } );
    }
}

export { DataAccess }