document.addEventListener('DOMContentLoaded', (event) => {
	var todoAddButton = document.querySelector('#todo-add-button');
	todoAddButton.addEventListener('click', todoAddButtonClicked);
	
	var todoItemsContainer = document.querySelector("#todo-list");
	todoItemsContainer.addEventListener('change', todoItemsContainerChanged);
});

function todoAddButtonClicked() {
	var todoList = document.querySelector('#todo-list');
	var todoTextInput = document.querySelector('#todo-text-input');
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
	todoItem.children[0].prepend(item_desc);
	container.append(todoItem);
	
	todoItemsContainerChanged(container);
}