const addForm = document.querySelector(".add");
const todosList = document.querySelector(".todos-list");
const search = document.querySelector(".search");

//Funtion to generate the HTML list item to add to the browser
const generateTodoTemplate = todo => {
    const html = `
        <li class="list-group-item list-group-item-light d-flex justify-content-between align-items-center">
            <span>${todo}</span>
            <i class="far fa-trash-alt delete"></i>
        </li>`;
    todosList.innerHTML += html;
};

//To add a new todo:
//Get the event of submitting a new todo
addForm.addEventListener("submit", event => {
    event.preventDefault(); //To prevent the page to refresh when submitting the data
    //Get the new todo
    const newTodo = addForm.todoToBeAdded.value.trim();
    //.trim(); trims any whitespace before and after the actual string
    if(newTodo.length >0){
        generateTodoTemplate(newTodo);
        addForm.reset();//To clear the form
    }
});

//Now we need to add the functionality to delete a todo
//Attaching an event listener to each trashcan on the list could affect the performance of the site.
//We could use event delegation. We could attach an event to the list (ul), then whenever anything is clicked the callback function will be fired. In this function we could detect if the tag element that has been clicked is the trashcan, and if is the case, then call the function to remove that element

todosList.addEventListener("click", event => {
    //Check if the thing clicked is a trashcan
    //The trashcan has a "delete" class
    if(event.target.classList.contains("delete")){//this gets the actual element that has been clicked, and then checks the class
        event.target.parentElement.remove();
    }
});

//Filtering:
//We need a key up event listener in the search bar. This will, then, filter the TODOs and show only the ones containing the text in the search area
// If the todo doesn't match the search criteria, we want to hide it, so we will create a class that will do so.
search.addEventListener("keyup", event => {
    const searchTerm = event.target.value;
    filterTodos(searchTerm);
}
);

//filter method for search
// we need an array that contains the li tags so we can take the text to filter and add the class to the li element
const filterTodos = (term) => {
    //Convert to an array
    Array.from(todosList.children)
        //Remember that when we use filter method, this will go through all the items inside that array, and it is going to fire a callback function for each one. The filter methods returns a new array, this new array is going to be whatever items we keep in it, how? by returning true. We will filter out by returning false
        //We want to filter IN the ones that don't have a match.
        .filter(todo =>  !todo.textContent.toLowerCase().includes(term.toLowerCase()))
        .forEach(todo => {
            todo.classList.add("filtered");            
        });

        //We now need to to the opposite of before, so we will filter the array, and if it does contain the matching term, we will remove the filtered class:
        Array.from(todosList.children)
        .filter(todo =>  todo.textContent.includes(term))
        .forEach(todo => {
            todo.classList.remove("filtered");            
        });

}
