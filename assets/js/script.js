let text = document.getElementById('txt');
let addNew = document.getElementById('new');
let generateNew = document.getElementById('generate');
let copyClipboard = document.getElementById('copy');
let addNewForm = document.getElementById('addNewForm');

function createHttpRequest(method, url, callback) {
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var data = JSON.parse(xhr.responseText);
            callback(data)
        }
    };
    xhr.open(method, url, true);
    xhr.send();
}

const generate = () => {
    //Fetch a data in api.
    createHttpRequest("GET", "https://liby0.libyzxy0.repl.co/cpstn/titles", (data) => {
        text.innerHTML=data.text;
    })
}
window.onload = generate;
generateNew.addEventListener('click', () => {
    generate()
});

//Copy a text on clipboad.
copyClipboard.addEventListener('click', () => {
    let copyText = text.innerText;
    navigator.clipboard.writeText(copyText);
    alert("Successfully copied to clipboard!");
});

addNew.addEventListener('click', () => {
    let modal = document.querySelector("[data-addnew-toggle]");
    modal.classList.toggle('active');
})

addNewForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let dataText = document.getElementById('addNewValue').value;
    createHttpRequest("GET", `https://liby0.libyzxy0.repl.co/cpstn/titles/add?txt=${dataText}`, (data) => {
        console.log(data)
        addNewForm.reset();
    })
})
