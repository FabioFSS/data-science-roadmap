export function formatSeconds(totalSec) {
  const h = Math.floor(totalSec / 3600);
  const m = Math.floor((totalSec % 3600) / 60);
  if (h > 0) return `${h}h ${m}m`;
  return `${m}m`;
}

export function downloadFile(filename, content, mime) {
  const blob = new Blob([content], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// Botão de confirmação em duas etapas: primeiro clique arma a confirmação
// por alguns segundos, segundo clique executa a ação. Evita diálogos nativos
// bloqueantes (confirm()/alert()) para ações destrutivas.
export function bindConfirmButton(btn, confirmLabel, onConfirm) {
  let armed = false;
  let timeoutId = null;
  const originalLabel = btn.textContent;
  const originalClass = btn.className;
  btn.addEventListener("click", () => {
    if (!armed) {
      armed = true;
      btn.textContent = confirmLabel;
      btn.classList.add("danger");
      timeoutId = setTimeout(() => {
        armed = false;
        btn.textContent = originalLabel;
        btn.className = originalClass;
      }, 4000);
    } else {
      clearTimeout(timeoutId);
      onConfirm();
    }
  });
}
