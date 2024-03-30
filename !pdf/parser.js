function getPdfContent(fileUrl) {
    // Initialize PDF.js
    return new Promise((resolve, reject) => {
        pdfjsLib.getDocument(fileUrl).promise.then(function (pdf) {
            // Initialize an array to store promises for text content retrieval
            var pageTextPromises = [];

            // Iterate through each page of the PDF
            for (var pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
                // Retrieve text content of each page
                pageTextPromises.push(
                    pdf.getPage(pageNum).then(function (page) {
                        return page.getTextContent();
                    })
                );
            }

            // Wait for all promises to resolve
            Promise.all(pageTextPromises).then(function (allTextContents) {
                resolve(allTextContents);
            });
        });
    });
}

// Listen for file input change
document
    .getElementById("fileInput")
    .addEventListener("change", function (event) {
        var file = event.target.files[0];
        var fileUrl = URL.createObjectURL(file); // Get the URL of the selected file
        getPdfContent(fileUrl).then((d) => {
            extract(d[2].items);
        });
    });

function clumpText(data) {
    let groups = [];
    let currentGroup = [];
    let currentLine = [];

    // Helper function to check if two text elements are on the same line
    function areOnSameLine(text1, text2) {
        const threshold = 20; // Adjust as needed
        return Math.abs(text1.transform[5] - text2.transform[5]) < threshold;
    }

    // Loop through the data to clump text elements together
    for (let i = 0; i < data.length; i++) {
        const text = data[i];
        const previousText = data[i - 1];

        if (!previousText || areOnSameLine(previousText, text)) {
            // Add text to current line
            currentLine.push(text.str);
        } else {
            // Start a new line
            currentGroup.push(currentLine);
            currentLine = [text.str];
        }
    }

    // Add the last line
    if (currentLine.length > 0) {
        currentGroup.push(currentLine);
    }

    // Push the current group to groups
    if (currentGroup.length > 0) {
        groups.push(currentGroup);
    }

    return groups;
}
