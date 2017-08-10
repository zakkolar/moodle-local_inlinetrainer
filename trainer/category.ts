import {Action} from "./action";
import {Slugify} from "./helpers/slugify";

export class Category{
    name: string;
    description: string;
    subCategories: Category[];
    actions: Action[];
    constructor(name:string, description?: string){
        this.name=name;
        this.description=description || null;
        this.subCategories = [];
        this.actions = [];
    }

    addSubcategories(categories:Category[]){
        for(let i=0; i<categories.length; i++){
            this.subCategories.push(categories[i]);
        }
        return this;
    }

    addActions(actions:Action[]){
        for(let i=0; i<actions.length; i++){
            this.actions.push(actions[i]);
        }
        return this;
    }

    identifier(){
        return Slugify(this.name);
    }

}