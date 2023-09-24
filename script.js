let clutter = '';

// Function to handle button clicks for encryption and decryption
function buttonClick() {
    // Event listener for the "Decrypt" button
    document.querySelector("#decrypt-btn").addEventListener("click", function () {
        // Show the decryption panel
        document.querySelector("#decryption").style.display = "block";
        // Highlight the "Decrypt" button
        document.querySelector("#decrypt-btn").style.backgroundColor = "#333";
        // Hide the encryption panel
        document.querySelector("#encryption").style.display = "none";
        // Unhighlight the "Encrypt" button
        document.querySelector("#encrypt-btn").style.backgroundColor = "#222";
        // Rotate the arrow image
        document.querySelector('#main>h1 span img').style.transform = "rotate(180deg)";
        // Hide the result container
        document.querySelector('#result').style.display = 'none';
    })

    // Event listener for the "Encrypt" button
    document.querySelector("#encrypt-btn").addEventListener("click", function () {
        // Show the encryption panel
        document.querySelector("#encryption").style.display = "block";
        // Highlight the "Encrypt" button
        document.querySelector("#encrypt-btn").style.backgroundColor = "#333";
        // Hide the decryption panel
        document.querySelector("#decryption").style.display = "none";
        // Unhighlight the "Decrypt" button
        document.querySelector("#decrypt-btn").style.backgroundColor = "#222";
        // Rotate the arrow image back to the default position
        document.querySelector('#main>h1 span img').style.transform = "rotate(0deg)";
    })

    // Event listener for the encryption button within the encryption panel
    document.querySelector('#encryption-btn').addEventListener('click', function () {
        // Display the result container
        document.querySelector('#result').style.display = 'block';
    })
}
buttonClick();

// Function for encryption logic
function encryption() {
    document.querySelector("#encryption-btn").addEventListener('click', function () {
        // Get user input
        let input = document.getElementById('txtmsg').value;
        // Get the password
        let passInput = document.getElementById('password-input').value;
        // Split the input text into an array of characters
        const arrayOfData = input.split("");

        // Convert each character to its Emoji equivalent using ASCII codes
        arrayOfData.forEach(dataItem => {
            clutter += `&#128${dataItem.charCodeAt()} `
        });

        // Display the encrypted result
        document.querySelector('#result').innerHTML = clutter;

        // Store user data in local storage
        let userDataArray = [];

        if (JSON.parse(localStorage.getItem('dataPerUser'))) {
            userDataArray = JSON.parse(localStorage.getItem('dataPerUser'))
            userDataArray.push({ 'pass': passInput, 'input': input, 'clutter': clutter })
        } else {
            userDataArray = [{ 'pass': passInput, 'input': input, 'clutter': clutter }];
        }

        localStorage.setItem('dataPerUser', JSON.stringify(userDataArray));
    })
}
encryption();

// Function for decryption logic
function decryption() {
    let emoclutter = '';

    document.querySelector("#decryption-btn").addEventListener('click', function () {
        // Get the Emoji input
        let emoInput = document.querySelector('#enc_emo').value;
        // Get the password
        let passCheckInput = document.querySelector('#password-input').value;
        // Retrieve user data from local storage
        let user = JSON.parse(localStorage.getItem('dataPerUser'));

        let arrayOfEmo = emoInput.split(' ');

        // Convert each Emoji back to its corresponding character using codePointAt
        arrayOfEmo.forEach(emoItem => {
            emoclutter += `&#${emoItem.codePointAt(0)} `
        });

        let found;
        for (let i of user) {
            if (i.clutter == emoclutter) {
                found = i;
            }
        }

        // Display the decrypted result or a message for incorrect password
        if (found && found.clutter === emoclutter) {
            document.querySelector('#result').style.display = 'block';
            document.querySelector('#result').style.color = '#eee';
            document.querySelector('#result').innerHTML = found.input;
        } else {
            document.querySelector('#result').style.display = 'block';
            document.querySelector('#result').style.color = '#eee';
            document.querySelector('#result').innerHTML = 'Wrong Password!!!';
        }
    })
}
decryption();
