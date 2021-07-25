console.log('Notes App');
let objNotes = [];
// Get Notes
showNotes()
// Add Note Button
let btnAdd = document.getElementById('btnAdd');
btnAdd.addEventListener('click', function (e) {
    // console.log('Tapped');
    // TextAre
    let addNoteTxt = document.getElementById('txtNote');
    // Retrive Notes Key Data from Local Storage
    let notesData = localStorage.getItem('notes');
    // Check if Notes are Null
    if (notesData == null) {
        // Initialize Notes Object
        objNotes = [];
    } else {
        // Parse String to get Array
        objNotes = JSON.parse(notesData);
    }
    // Add New Note Data in Notes Array
    objNotes.push(addNoteTxt.value);
    // Update Data in Local Storage
    localStorage.setItem('notes', JSON.stringify(objNotes));
    // Make Value of TextArea Empty because Note is Added
    addNoteTxt.value = "";
    console.log(objNotes);
    showNotes();
});

// Function call to show Notes on UI
function showNotes() {
    // Get All Notes From Local Storage
    let notesData = localStorage.getItem('notes');
    // Check if Notes are Null
    if (notesData == null) {
        // Initialize Notes Object
        objNotes = [];
    } else {
        // Parse String to get Array
        objNotes = JSON.parse(notesData);
    }

    let html = ``;
    // Create HTML - n Divs containing Notes
    objNotes.forEach(function (element, index) {
        html += `
        <div class="card my-3 mx-3 noteCard" style="width: 18rem;">
                <div class="card-body">
                    <h5 class="card-title">Note ${index + 1}</h5>
                    <p class="card-text">${element}</p>
                    <a id="${index}" class="btn btn-primary" onclick="deleteNote(this.id)">Delete note</a>
                </div>
            </div>
        `
    })
    // Check if atleast 1 note is present or not and Render UI Respectively
    let displaynotesElement = document.getElementById('displayNotes');
    if (objNotes.length != 0) {
        // Display Notes
        displaynotesElement.innerHTML = html;
    } else {
        // Display No Notes Present
        displaynotesElement.innerHTML = `You have no notes, Notes you Add will be Displayed Here !!!!`;
    }
}

// Function Call to Delete a Note
function deleteNote(index) {
    console.log("Delete = " + index);
    // Fetch Notes from Local Storage
    let notesData = localStorage.getItem('notes');
    // Check if Notes are Null
    if (notesData == null) {
        // Initialize Notes Object
        objNotes = [];
    } else {
        // Parse String to get Array
        objNotes = JSON.parse(notesData);
    }
    // Remove Note(index) from Array
    objNotes.splice(index,1);
    // Update Local Storage
    localStorage.setItem('notes',JSON.stringify(objNotes));
    showNotes();
}