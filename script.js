async function uploadPDF() {
  const fileInput = document.getElementById("pdfFile");
  const status = document.getElementById("status");

  const file = fileInput.files[0];

  if (!file) {
    alert("Select PDF");
    return;
  }

  const formData = new FormData();
  formData.append("data", file);

  status.innerText = "Processing...";

  try {
    const response = await fetch(
      "https://n8n-1-b281.onrender.com/webhook/upload-eob",
      {
        method: "POST",
        body: formData
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || "n8n request failed");
    }

    const blob = await response.blob();

    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");

    a.href = url;
    a.download = "eob-output.xlsx";

    document.body.appendChild(a);
    a.click();
    a.remove();

    window.URL.revokeObjectURL(url);

    status.innerText = "Excel Downloaded";
  } catch (error) {
    status.innerText = "Error: " + error.message;
    console.error(error);
  }
}