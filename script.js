const recipeForm=document.getElementById("recipeForm");
const recipeList=document.getElementById("recipeList");

//storing in the localStorge

recipeForm.addEventListener("submit",function(event)
{
    event.preventDefault(); // Prevent page reload
    // Check if the form is valid before saving
    if (!recipeForm.checkValidity()) {
        recipeForm.reportValidity(); // show the browser's validation message
        return; // stop here, don't save or reset
    }
    const recipeName=document.getElementById("recipeName").value;
    const ingredients=document.getElementById("ingredients").value;
    const description=document.getElementById("description").value;
    const image=document.getElementById("image").value;
    

    //create object
    const recipe={recipeName,ingredients,description,image};
    //save to local Storage
    saveRecipe(recipe);

    //reset the form
    recipeForm.reset();

     //displayrecipe
    displayRecipe();
})


function saveRecipe(recipe)
{
    let recipes=JSON.parse(localStorage.getItem("recipes")) || [];
    recipes.push(recipe);
    localStorage.setItem("recipes",JSON.stringify(recipes));
    console.log("saving");
}

function displayRecipe() {
    let recipes = JSON.parse(localStorage.getItem("recipes")) || [];
    recipeList.innerHTML = "";

    recipes.forEach((recipe, index) => {
        const col = document.createElement("div"); 
        col.classList.add("col-md-6", "col-lg-4", "mb-3");

        col.innerHTML = `
            <div class="card mb-3" style="max-width: 540px;">
                <div class="row g-0">
                    <div class="col-md-4">
                        <img src="${recipe.image}" class="img-fluid rounded-start" alt="Recipe image">
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <h5 class="card-title">${recipe.recipeName}</h5>
                            <p class="card-text"><strong>Ingredients:</strong> ${recipe.ingredients}</p>
                            <p class="card-text">
                                <small class="text-body-secondary">
                                    <strong>Description:</strong> ${recipe.description}
                                </small>
                            </p> 
                             <button class="btn btn-warning  btn-sm mt-2" onclick="deleteRecipe(${index})">Delete</button>
                             <button class="btn btn-warning  btn-sm mt-2" onclick="editRecipe(${index})">Edit</button>
                        </div>
                    </div>
                </div>
            </div>
        `;

        recipeList.appendChild(col);
    });
}

function deleteRecipe(index) {
    let recipes = JSON.parse(localStorage.getItem("recipes")) || [];
    recipes.splice(index, 1); // Remove the recipe at that index
    localStorage.setItem("recipes", JSON.stringify(recipes));
    displayRecipe(); // Refresh the list
}


// Example starter JavaScript for disabling form submissions if there are invalid fields
(() => {
  'use strict'

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll('.needs-validation')

  // Loop over them and prevent submission
  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
      if (!form.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()
      }

      form.classList.add('was-validated')
    }, false)
  })
})()


window.onload=displayRecipe;



