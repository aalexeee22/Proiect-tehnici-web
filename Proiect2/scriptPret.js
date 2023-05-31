
function pret()
{
    const inp1=document.getElementById("pret_pe_ora-input");
    const inp2=document.getElementById("nr_ore-input")
    const outp=parseFloat(inp1.value)*parseFloat(inp2.value);
    const divi=document.getElementById("solution");
    divi.innerText=outp.toFixed(2)+' lei';
}

const btn3=document.getElementById("pret-button");
btn3.addEventListener("click",function(){pret();})

function handleKeyPress(event) {
    if (event.keyCode === 13) {
      document.getElementById("pret-button").click();
    }
  }

document.onkeydown = handleKeyPress;