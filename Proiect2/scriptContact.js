// Obțineți elementul <main>
var mainElement = document.querySelector("main");

// Crearea paragrafelor pentru datele de contact
var phoneNumberParagraph = document.createElement("p");
phoneNumberParagraph.textContent = "Număr de telefon: 1234567890";

var emailParagraph = document.createElement("p");
emailParagraph.textContent = "Adresă de email: contact@redreefsolutions.com";

var locationParagraph = document.createElement("p");
locationParagraph.textContent = "Adresă locație centrală: Strada Exemplu, Nr. 123, Orașul Imaginar";

// Adăugarea paragrafelor în <main>
mainElement.appendChild(phoneNumberParagraph);
mainElement.appendChild(emailParagraph);
mainElement.appendChild(locationParagraph);





function addLucrare()
{
    const nume=document.getElementById("nu").value;
    const nr_tel=document.getElementById("nt").value;
    const adr_mail=document.getElementById("adrm").value;
    const adresa=document.getElementById("adr").value;
    const Lucrare={
        nume:nume,numar_telefon:nr_tel,adresa_mail:adr_mail,adresa:adresa
    };
    fetch("http://localhost:3000/formular",{
        method:'POST',
        headers:{
        'Content-Type':'application/json'},
        body: JSON.stringify(Lucrare)
    }).then(function(response)
    {
        if(response.status==200)
        {
            window.location.reload();
        }
        else
        {
            alert("Nu ati introdus date.");
        }
    })

}

