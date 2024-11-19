const {available, defaultTemperature, defaultTopK, maxTopK } = await ai.languageModel.capabilities();

if (available !== "no") {
  const session = await ai.languageModel.create();
}

document.getElementById("rewriteBtn").addEventListener("click", () => {
    const emailBody = document.getElementById("emailBody").value;
    const style = document.getElementById("style").value;
  
    let rewrittenEmail = "";
  
    if (style === "formal") {
      prompt_engineered = `Rewrite the following email body in a formal business style, suitable for communication with a client. Ensure correct grammar and spelling.
        Instructions: Maintain a professional and positive tone, while providing concrete details about the partnership's progress.
        \n\n${emailBody}\n\n
        `
      rewrittenEmail =  session.prompt(prompt_engineered);

      // session
    } else if (style === "casual") {
      prompt_engineered = `
              Rewrite the following email body in a casual style, suitable for communication with a teammate.
              Instructions: Maintain clarity while using a more conversational tone.
              \n\n${emailBody}\n\n
              `
      rewrittenEmail =  session.prompt(prompt_engineered);
    } else if (style === "concise") {
      prompt_engineered = `
              Rewrite the following email body in a concise style using bullet points.
              Instructions: Structure the information using clear bullet points.
              \n\n${emailBody}\n\n
              `
      rewrittenEmail =  session.prompt(prompt_engineered);
    }
  
    document.getElementById("rewrittenEmail").innerText = rewrittenEmail;
  });
