async function uploadPDF(){

    const fileInput =
    document.getElementById("pdfFile");

    const file =
    fileInput.files[0];

    if(!file){

        alert("Select PDF");

        return;
    }

    const formData =
    new FormData();

    formData.append(
        "data",
        file
    );

    document.getElementById(
        "status"
    ).innerText =
    "Processing...";

    try{

        const response =
        await fetch(
        "https://YOUR-N8N-URL/webhook/upload-eob",
        {
            method:"POST",
            body:formData
        });

        const blob =
        await response.blob();

        const url =
        window.URL.createObjectURL(blob);

        const a =
        document.createElement("a");

        a.href=url;

        a.download=
        "eob-output.xlsx";

        a.click();

        document.getElementById(
        "status"
        ).innerText =
        "Excel Downloaded";

    }
    catch(error){

        document.getElementById(
        "status"
        ).innerText =
        "Error";

        console.log(error);
    }
}