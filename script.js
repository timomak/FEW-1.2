function changeSize() {
    console.log("Size changed!")

    // get the text inputs
    var width = document.getElementById("width-input").value;
    var height = document.getElementById("height-input").value;

    // Set minimum height and width
    if (width < "10") {
        width = 10
    }
    if (height < "10") {
        height = 10
    }

    // update labels with height and width
    document.getElementById('width-label').textContent = width + "px"
    document.getElementById('height-label').textContent = height + "px"

    // Set the box height and width
    document.getElementById('color-box').style.width = width
    document.getElementById('color-box').style.height = height
}

function changeColor() {
    console.log("Change color!")

    // get the color input
    var color = document.getElementById("color-input").value;

    // update labels with color name
    document.getElementById('color-label').textContent = color

    // Set the box height and width
    document.getElementById('color-box').style.backgroundColor = color
}