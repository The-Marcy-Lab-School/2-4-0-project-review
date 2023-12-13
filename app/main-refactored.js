import { getNames, addName, removeName, initializeNames } from './local-storage';

///////////////////////////////////
// DOM Render Helpers
///////////////////////////////////

const createElement = (elementType) => {
  return document.createElement(elementType);
}

const addNameToList = (name) => {
  const li = createElement('li');
  const p = createElement('p');
  const button = createElement('button');
  p.textContent = name
  button.textContent = 'delete';

  li.append(p, button);
  document.querySelector('ul').appendChild(li)
}

// empty the entire list
// re-render the entire list
const renderAllData = () => {
  document.querySelector('ul').innerHTML = '';

  const existingNames = getNames();
  existingNames.forEach((name) => addNameToList(name))
}

///////////////////////////////////
// Event Handler Helpers
///////////////////////////////////

// handles the form:
// - Extracts data from form
// - Adds data to localStorage
// - Re-Renders the data from localStorage
const handleSubmit = (e) => {
  e.preventDefault();

  const form = e.target;
  const formData = new FormData(form);
  const formObj = Object.fromEntries(formData);
  console.log(formObj);

  addName(formObj.name)
  renderAllData()

  form.reset();
}

// should delete the whole li (parent) that the button is in from the DOM
// remove the name from the sibling p tag from localStorage
const handleDeleteName = (e) => {
  if (e.target.matches('button')) {

    const nameToRemove = e.target.previousSibling.textContent;
    removeName(nameToRemove)

    // Either remove the parent Element of the button or remove all and re-render. 
    // which do you prefer?

    renderAllData()
    // e.target.parentElement.remove()
  }
}

///////////////////////////////////
// Setup
///////////////////////////////////

// set everything up
const init = () => {
  document.querySelector('form').addEventListener('submit', handleSubmit);
  document.querySelector('ul').addEventListener('click', handleDeleteName);

  // i need to initialize the names localStorage value before i do anything else
  if (!getNames()) { initializeNames() }

  // render all existing localStorage elements first
  renderAllData();
}

init();