import startingNames from './names.json';

const addNameToList = (name) => {
  const li = document.createElement('li');
  const p = document.createElement('p');
  const button = document.createElement('button');
  p.textContent = name
  button.textContent = 'delete';
  li.append(p, button);
  document.querySelector('ul').appendChild(li)
}

// empty the entire list
// re-render the entire list
const renderAllData = () => {
  document.querySelector('ul').innerHTML = '';

  const existingNames = JSON.parse(localStorage.getItem('names'));
  existingNames.forEach((name) => addNameToList(name))
}

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

  // if i want to add the name to a list
  // i have to first get the existing array from LS
  const existingNames = JSON.parse(localStorage.getItem('names'));

  // make a new array from the old one plus the new name
  const newNamesList = [...existingNames, formObj.name]

  // replace the old value in LS with the new array
  localStorage.setItem('names', JSON.stringify(newNamesList))

  console.log(JSON.parse(localStorage.getItem('names')));

  // whenever a form is submitted, create a single li for
  // that new data and append it to the ul
  // addNameToList(formObj.name);

  // this skips localStorage
  // it just uses the form Data to determine what to add to the ul

  // empty out all list items
  // re-render everything from localStorage
  renderAllData()

  form.reset();
}

// should delete the whole li (parent) that the button is in from the DOM
// remove the name from the sibling p tag from localStorage
const handleDeleteName = (e) => {
  if (e.target.matches('button')) {

    const nameToRemove = e.target.previousSibling.textContent;

    // remove from LocalStorage
    const existingNames = JSON.parse(localStorage.getItem('names'));
    const newNamesList = existingNames.filter((name) => name !== nameToRemove);
    localStorage.setItem('names', JSON.stringify(newNamesList))

    // 1. get from local storage
    // 2. modify it (in this case, we're deleting)
    // 3. set it back in local storage

    renderAllData()
  }

}

// set everything up
const init = () => {
  document.querySelector('form').addEventListener('submit', handleSubmit);
  document.querySelector('ul').addEventListener('click', handleDeleteName);

  // i need to initialize the names localStorage value before i do anything else
  const existingNames = JSON.parse(localStorage.getItem('names'));
  if (!existingNames) {
    localStorage.setItem('names', JSON.stringify(startingNames));
  }

  // render all existing localStorage elements first
  renderAllData();
}



init();