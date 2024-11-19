(async () => {
  const { available, defaultTemperature, defaultTopK, maxTopK } = await ai.languageModel.capabilities();

  let session;
  if (available !== "no") {
    session = await ai.languageModel.create();
  } else {
    console.error("Language model is not available.");
    return;
  }

  document.getElementById("rewriteBtn").addEventListener("click", async () => {
    const emailBody = document.getElementById("emailBody").value;
    const style = document.getElementById("style").value;

    if (!emailBody.trim()) {
      alert("Please enter the email body.");
      return;
    }

    const rewrittenEmailElement = document.getElementById("rewrittenEmail");
    rewrittenEmailElement.innerText = "Loading..."; // Show loading text
    // rewrittenEmailElement.style.textAlign = "center"; // Center the text horizontally
    rewrittenEmailElement.style.fontStyle = "italic"; // Optional: Make the text look distinct


    let promptEngineered = "";
    let rewrittenEmail = "";

    try {
      if (style === "formal") {
        promptEngineered = `
          Rewrite the following email body in a formal business style, suitable for communication with a client.
          Instructions: Maintain a professional and positive tone, while providing concrete details about the partnership's progress.
          \n\n${emailBody}\n\n
        `;
      } else if (style === "casual") {
        promptEngineered = `
          Rewrite the following email body in a casual style, suitable for communication with a teammate.
          Instructions: Maintain clarity while using a more conversational tone.
          \n\n${emailBody}\n\n
        `;
      } else if (style === "concise") {
        promptEngineered = `
          Rewrite the following email body in a concise style using bullet points.
          Instructions: Structure the information using clear bullet points.
          \n\n${emailBody}\n\n
        `;
      } else {
        alert("Please select a valid style.");
        rewrittenEmailElement.innerText = ""; // Clear loading text if invalid input
        return;
      }

      // Use the session to generate the rewritten email
      rewrittenEmail = await session.prompt(promptEngineered);
    } catch (error) {
      console.error("Error generating rewritten email:", error);
      rewrittenEmailElement.innerText = "An error occurred. Please try again."; // Show error message
      return;
    }

    rewrittenEmailElement.innerText = rewrittenEmail; // Show the result
  });
})();
