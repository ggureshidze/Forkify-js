// Global app controller




import Recipe from "./models/recipe";
import Search from "./models/search";
import { clearLoader, elements, renderLoader } from "./view/base";
import * as searchView from "./view/searchView";
import * as recipeView from "./view/recipeView";



const state = {};
window.state = state;



const controlSearch = async () => {

    const query =  searchView.getInput();

    if(query){
        searchView.clearResults();
        searchView.clearInput();
        renderLoader(elements.searchResList);

        state.search = new Search(query);
        await state.search.getResults()
        
        clearLoader();

        searchView.renderResult(state.search.result);
 
    }

    
    
}



elements.searchForm.addEventListener('submit', (e) => {
    e.preventDefault();

    controlSearch();

})


// Recipe 

const controlRecipe = async () => {
    const id = window.location.hash.replace("#", '');

    if(id){
        // Prepare UI

        recipeView.clearRecipe();

        renderLoader(elements.recipe);

         state.search && searchView.activeLinkStyle(id);

        // create new Recipe object

        state.recipe = new Recipe(id);

        try {


            


            await state.recipe.getRecipe();
        } catch (error) {
            alert('Recipe Error')
        }

        state.recipe.parseIngredients();

        
        clearLoader();
        recipeView.renderRecipe(state.recipe);


    }
}


elements.searchResPages.addEventListener('click', e => {
    const btn = e.target.closest('.btn-inline');


    if(btn){
        const goToPage = +btn.dataset.goto;
        searchView.clearResults();
        searchView.renderResult(state.search.result, goToPage)
    }

});


window.addEventListener('hashchange', () => {
    controlRecipe();
});

window.addEventListener('load', () => {
    controlRecipe();
})