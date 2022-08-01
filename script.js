document.addEventListener('DOMContentLoaded', (event) => {
    var todoAddButton = document.querySelector('#todo-add-button');
    todoAddButton.addEventListener('click', todoAddButtonClicked);
    
    var todoItemsContainer = document.querySelector("#todo-list");
    todoItemsContainer.addEventListener('change', todoItemsContainerChanged);
});

function todoAddButtonClicked() {
    var todoList = document.querySelector('#todo-list');
    var todoTextInput = document.querySelector('#todo-text-input');
    if(todoTextInput.value == '')
        return;
    addTodoItem(todoTextInput.value, todoList);
    todoTextInput.value = '';
    todoTextInput.focus();
}

function todoItemsContainerChanged(container) {
    container.querySelectorAll('li').forEach(
        e => e.addEventListener('click', todoItemClicked)
    );
    
    container.querySelectorAll('button').forEach(
        e => e.addEventListener('click', removeButtonClicked)
    );
    
    if(container.querySelectorAll('li').length > 0 && document.querySelector('#empty-notice'))
        document.querySelector('#empty-notice').remove();
}

function todoItemClicked(e) {
    console.log('todoItemClicked');
    if('contenteditable' in e.target.attributes) {
        e.target.removeAttribute('contenteditable');
    }
    else {
        e.target.setAttribute('contenteditable', 'true');
        e.target.focus();
    }
}

function removeButtonClicked(e) {
    e.target.closest('li').remove();
}

function addTodoItem(item_desc, container) {
    var todoItemTemplate = document.querySelector('#todo-item-template');
    var todoItem = todoItemTemplate.content.cloneNode(true);
    var todoItemDiv = document.createElement('div');
    todoItemDiv.innerText = item_desc;
    todoItem.children[0].prepend(todoItemDiv);
    container.append(todoItem);
    
    todoItemsContainerChanged(container);
}