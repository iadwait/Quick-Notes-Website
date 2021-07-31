console.log('Notes App');
let objNotes = [];
// Get Notes
showNotes()
// Add Note Button
let btnAdd = document.getElementById('btnAdd');
btnAdd.addEventListener('click', function (e) {
    // console.log('Tapped');
    // Text Title
    let addNoteTitle = document.getElementById('txtTitle');
    // TextAre
    let addNoteTxt = document.getElementById('txtNote');
    // Retrive Notes Title Key Data from Local Storage
    let notesTitle = localStorage.getItem('title');
    // Retrive Notes Key Data from Local Storage
    let notesData = localStorage.getItem('notes');
    // Check if Notes are Null
    if (notesData == null) {
        // Initialize Notes Object
        objTitle = [];
        objNotes = [];
    } else {
        // Parse String to get Array
        objTitle = JSON.parse(notesTitle);
        objNotes = JSON.parse(notesData);
    }
    // Add New Note Data in Notes Array
    if (addNoteTitle.value.length != 0) {
        objTitle.push(addNoteTitle.value);
    } else {
        objTitle.push(`Note ${objTitle.length + 1}`);
    }
    objNotes.push(addNoteTxt.value);
    // Update Data in Local Storage
    localStorage.setItem('title',JSON.stringify(objTitle));
    localStorage.setItem('notes', JSON.stringify(objNotes));
    // Make Value of TextArea Empty because Note is Added
    addNoteTitle.value = "";
    addNoteTxt.value = "";
    console.log(objNotes);
    showNotes();
});

// Function call to show Notes on UI
function showNotes() {
    // Get All Notes From Local Storage
    let notesData = localStorage.getItem('notes');
    let notesTitle = localStorage.getItem('title');
    // Check if Notes are Null
    if (notesData == null) {
        // Initialize Notes Object
        objNotes = [];
    } else {
        // Parse String to get Array
        objNotes = JSON.parse(notesData);
    }

    objTitle = JSON.parse(notesTitle);

    let html = ``;
    // Create HTML - n Divs containing Notes
    objNotes.forEach(function (element, index) {
        html += `
        <div class="card my-3 mx-3 noteCard" style="width: 18rem;">
                <div class="card-body">
                    <h5 class="card-title">${objTitle[index]}</h5>
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
    let notesTitle = localStorage.getItem('title');
    // Check if Notes are Null
    if (notesData == null) {
        // Initialize Notes Object
        objNotes = [];
        objTitle = [];
    } else {
        // Parse String to get Array
        objNotes = JSON.parse(notesData);
        objTitle = JSON.parse(notesTitle);
    }
    // Remove Note(index) from Array
    objNotes.splice(index,1);
    objTitle.splice(index,1);
    // Update Local Storage
    localStorage.setItem('notes',JSON.stringify(objNotes));
    localStorage.setItem('title',JSON.stringify(objTitle));
    showNotes();
}

// Search Functionality
let search = document.getElementById('searchTxt');
search.addEventListener('input',function(){
    let searchValue = search.value;
    // console.log('Text Entered ' + searchValue); 
    // Get All Note Cards
    let cardNotes = document.getElementsByClassName('noteCard');
    Array.from(cardNotes).forEach(function(element){
        let cardTxt = element.getElementsByTagName('p')[0].innerText;
        // console.log(cardTxt);
        // Check If Each Note contain Search value with Case Insensitive
        if(cardTxt.toLowerCase().includes(searchValue.toLowerCase())){
            element.style.display = "block";
        } else {
            element.style.display = "none";
        }
    });
});

/*
Pending Features:-
1. Add Title
2. Add Button to mark a Note as Important
3. Seperate Notes by User / Add Authentication before showing Notes
4. Alerts - Note Added/Deleted Messages
*/