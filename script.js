"use strict";
// Event Listener for DOM Content Loaded
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("resumeForm");
    const resumeOutput = document.getElementById("resumeOutput");
    const resumeContent = document.getElementById("resume-content");
    const shareableLinkElement = document.getElementById("sharable-link");
    const downloadPDFButton = document.getElementById("download-pdf");
    form.addEventListener("submit", (event) => {
        event.preventDefault();
        // Collect form data
        const data = {
            username: document.getElementById("username").value,
            name: document.getElementById("name").value,
            email: document.getElementById("email").value,
            education: document.getElementById("education").value,
            experience: document.getElementById("experience").value,
            skills: document.getElementById("skills").value,
            description: document.getElementById("description").value,
        };
        // Generate Resume
        generateResume(data, resumeContent);
        // Generate Shareable URL
        const shareableURL = `${window.location.origin}?username=${encodeURIComponent(data.username)}`;
        shareableLinkElement.href = shareableURL;
        shareableLinkElement.textContent = shareableURL;
        // Display the Output Section
        resumeOutput.style.display = "block";
    });
    // Download as PDF
    downloadPDFButton.addEventListener("click", () => {
        const printContent = document.getElementById("resume-content");
        const newWindow = window.open("", "_blank");
        newWindow.document.write(printContent.outerHTML);
        newWindow.document.close();
        newWindow.print();
    });
});
// Generate Resume Content
function generateResume(data, outputElement) {
    outputElement.innerHTML = `
        <p><strong>Username:</strong> ${data.username}</p>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Education:</strong> ${data.education}</p>
        <p><strong>Experience:</strong> ${data.experience}</p>
        <p><strong>Skills:</strong> ${data.skills}</p>
        <p><strong>Description:</strong> ${data.description}</p>
    `;
}
