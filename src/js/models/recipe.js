import axios from "axios"


export default class Recipe {
    constructor(id){
        this.id = id

    }

    async getRecipe(){


        try {
            const res = await axios(`https://forkify-api.herokuapp.com/api/get?rId=${this.id}`);
            this.title = res.data.recipe.title;
            this.author = res.data.recipe.publisher;
            this.img = res.data.recipe.image_url;
            this.url = res.data.recipe.source_url;
            this.ingredients = res.data.recipe.ingredients;
        } catch (error) {
            alert(error)
            
        }
        






    }

    parseIngredients(){
        const newIngredients = this.ingredients.map(el => {
            
            
            const unitsLong = ['tablespoons', 'tablespoon', 'ounces',  'ounce', 'teaspoons', 'teaspoon', 'cups'];
            const unitsShort = ['tbsp', 'tbsp', 'oz', 'oz', 'tsp', 'tsp', 'cup'];
            const units = [...unitsShort, 'g', 'kg', 'pound'];

        //1) iniform munits 
            let ingredient = el.toLowerCase();
            unitsLong.forEach((unit, index) => {
                ingredient = ingredient.replace(unit,unitsShort[index])


                
            })

            // 2) remove paranethenses

            ingredient = ingredient.replace(/ *\(([^)]*)\) */g, ' ');

            //convert string object
            const ingArr = ingredient.split(' ');
            const unitIndex = ingArr.findIndex(word => units.includes(word));
          

            let objIng;

            if(unitIndex > -1){
                const arrCount = ingArr.slice(0,unitIndex);


                let count;
                if(arrCount.length === 1){
                    count = eval(ingArr[0]);
                }else{
                    count = eval(arrCount.join('+'))
                }

                objIng = {
                    count,
                    unit:ingArr[unitIndex],
                    ingredient: ingArr.slice(unitIndex + 1).join(' ')

                }


                
            }else if(parseInt(ingArr[0],10)){
                objIng = {
                    count: parseInt(ingArr[0],10),
                    unit: '',
                    ingredient: ingArr.slice(1).join(' ')

                }
            }




            return objIng;

       
        })

        this.ingredients = newIngredients;


        



    }

}