// Interface for Resume Data
interface ResumeData {
    username: string;
    name: string;
    email: string;
    education: string;
    experience: string;
    skills: string;
    description: string;
}

// Event Listener for DOM Content Loaded
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("resumeForm") as HTMLFormElement;
    const resumeOutput = document.getElementById("resumeOutput") as HTMLDivElement;
    const resumeContent = document.getElementById("resume-content") as HTMLDivElement;
    const shareableLinkElement = document.getElementById("sharable-link") as HTMLAnchorElement;
    const downloadPDFButton = document.getElementById("download-pdf") as HTMLButtonElement;

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        // Collect form data
        const data: ResumeData = {
            username: (document.getElementById("username") as HTMLInputElement).value,
            name: (document.getElementById("name") as HTMLInputElement).value,
            email: (document.getElementById("email") as HTMLInputElement).value,
            education: (document.getElementById("education") as HTMLInputElement).value,
            experience: (document.getElementById("experience") as HTMLInputElement).value,
            skills: (document.getElementById("skills") as HTMLInputElement).value,
            description: (document.getElementById("description") as HTMLInputElement).value,
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
        const printContent = document.getElementById("resume-content") as HTMLElement;
        const newWindow = window.open("", "_blank")!;
        newWindow.document.write(printContent.outerHTML);
        newWindow.document.close();
        newWindow.print();
    });
});

// Generate Resume Content
function generateResume(data: ResumeData, outputElement: HTMLDivElement): void {
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
