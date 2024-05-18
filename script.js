fetch('data.csv')
    .then(response => response.text())
    .then(data => {
        // Parse CSV data
        const rows = data.split('\n');
        const csvData = rows.map(row => row.split(',').map(cell => cell.trim()));

        // Function to send user question and get response
        function sendQuestion() {
            var question = document.getElementById("user-input").value;
            var answer = getAnswer(question);
            displayAnswer(answer);
        }

        // Function to get response based on user question
        function getAnswer(question) {
            // Search for the most appropriate information based on the user question
            let answer = '';
            for (let i = 0; i < csvData.length; i++) {
                if (csvData[i][0].toLowerCase() === question.toLowerCase()) {
                    answer = csvData[i][1];
                    break;
                }
            }
            return answer || "Sorry, I couldn't find the information you're looking for.";
        }

        // Function to display response in the chat window
        function displayAnswer(answer) {
            var chatMessages = document.getElementById("chat-messages");
            var messageElement = document.createElement("div");
            messageElement.textContent = answer;
            chatMessages.appendChild(messageElement);
        }
    })
    .catch(error => console.error('Error loading CSV file:', error));