// Camada fina sobre fetch() para conversar com a API do backend.
// Mantém o formato de retorno parecido com o antigo window.storage,
// para deixar a migração do restante do código mais direta.

export async function apiGetState() {
  const res = await fetch("/api/state");
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`Falha ao carregar estado (HTTP ${res.status})`);
  return await res.json();
}

export async function apiSetState(state) {
  const res = await fetch("/api/state", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(state),
  });
  if (!res.ok) throw new Error(`Falha ao salvar estado (HTTP ${res.status})`);
  return await res.json();
}
