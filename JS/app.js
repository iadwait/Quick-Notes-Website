console.log('Notes App');
let objNotes = [];
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
    localStorage.setItem('notes',JSON.stringify(objNotes));
    // Make Value of TextArea Empty because Note is Added
    addNoteTxt.value = "";
    console.log(objNotes);
});