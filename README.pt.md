# Roadmap Tracker — IA/LLMs para Cientista de Dados Sênior

[English version](README.md)

Aplicação self-hosted para acompanhar o roadmap de estudos: progresso por
tópico/subtópico, prazos, tempo de estudo, certificações, flashcards com
repetição espaçada, cursos pessoais, estatísticas e backup.

## Arquitetura

```
roadmap-tracker/
├── client/
│   └── src/
│       ├── data/                → catálogo estático (roadmap, glossário, etc.)
│       ├── state/               → lógica de domínio (persistência, tópicos, timer,
│       │                          estatísticas, flashcards, cursos)
│       ├── views/
│       │   ├── quarter/         → template + interações da tela principal
│       │   └── flashcards/      → gerenciamento de cartões
│       ├── state.js             → fachada de compatibilidade (re-export)
│       └── ...
├── server/
│   └── src/
│       ├── app.js               → composição da aplicação Express
│       ├── config/              → configuração de ambiente
│       ├── modules/state/       → rotas do módulo de estado
│       ├── repositories/        → acesso ao arquivo JSON de persistência
│       └── index.js             → bootstrap HTTP
├── Dockerfile
└── docker-compose.yml
```

- **Frontend**: JavaScript puro em módulos ES (`client/src/`), sem React/Vue,
  com responsabilidades separadas em camadas: catálogo (`data/`), regras de
  negócio (`state/`) e renderização/interações (`views/`). O arquivo
  `state.js` foi mantido como fachada para preservar compatibilidade de imports.
- **Backend**: Express organizado em camadas simples: bootstrap (`index.js`),
  composição (`app.js`), configuração (`config/`), módulo de API
  (`modules/state/`) e persistência (`repositories/`). A API continua com as
  mesmas rotas (`GET /api/state`, `PUT /api/state`) e persiste em `data/state.json`.
- **Sem autenticação**: como você vai acessar apenas pela rede local, não há
  login nem token. Não exponha essa porta diretamente para a internet sem
  adicionar alguma proteção antes (ver seção "Segurança" abaixo).

## Rodando com Podman (Bazzite)

```bash
cd roadmap-tracker
podman-compose up -d --build
```

Isso builda a imagem (compila o cliente com Vite e empacota com o servidor)
e sobe o container em segundo plano, escutando na porta `8080`.

Para ver os logs:
```bash
podman-compose logs -f
```

Para parar:
```bash
podman-compose down
```

Se preferir Docker puro, os comandos são idênticos trocando `podman-compose`
por `docker compose`.

## Acessando de outros dispositivos na rede local

1. Descubra o IP da máquina que está rodando o container:
   ```bash
   ip addr show | grep "inet "
   ```
2. Em qualquer dispositivo na mesma rede (celular, notebook, etc.), acesse:
   ```
   http://<IP-DA-MAQUINA>:8080
   ```

Todos os dispositivos vão ler e escrever o mesmo arquivo de estado no
servidor — ou seja, o progresso fica sincronizado entre eles automaticamente
(sem precisar exportar/importar backup entre aparelhos).

## Solução de problemas comuns

**"bind: address already in use"** — outra coisa já está usando a porta.
Troque a porta da esquerda em `docker-compose.yml` (ex: `"8090:8080"`) e rode
`podman-compose up -d --build` de novo.

**"Não foi possível salvar — verifique a conexão com o servidor"** (aparece
na barra lateral, mas a página carrega normalmente) — isso indica que o
container não conseguiu *escrever* no arquivo `data/state.json`, geralmente
por causa do SELinux no Fedora/Bazzite bloqueando escrita em pastas montadas
do host. A correção é o sufixo `:Z` no volume (já incluso no
`docker-compose.yml` deste projeto). Se mesmo assim persistir:
```bash
podman-compose down
rm -rf data          # remove qualquer estado com permissão inconsistente
podman-compose up -d --build
podman-compose logs -f   # confira se aparece algum erro de permissão
```

**Quero confirmar que o backend está respondendo** — direto na máquina que
roda o container:
```bash
curl http://localhost:8090/api/health
```
Deve retornar `{"ok":true}`. Se isso falhar, o problema é no container/porta,
não no navegador.

## Backup e persistência dos dados

O `docker-compose.yml` monta uma pasta local `./data` dentro do container,
onde fica o arquivo `state.json` com todo o seu progresso. Esse arquivo:

- Sobrevive a `podman-compose down` / `up` e a rebuilds da imagem.
- Pode ser copiado manualmente para backup:
  ```bash
  cp data/state.json data/state.backup-$(date +%Y%m%d).json
  ```
- Também pode ser baixado a qualquer momento pela própria aplicação, na
  seção **"Dados e backup"** (exporta um `.json` completo ou um `.md` legível).

## Atualizando a aplicação

Se você (ou eu, numa próxima conversa) alterar o código do roadmap, dos
flashcards, etc., basta reconstruir a imagem — o arquivo de estado em
`./data` não é afetado:

```bash
podman-compose up -d --build
```

## Desenvolvimento local (sem Docker)

Útil se você quiser mexer no código e ver o resultado rapidamente, com
hot-reload do Vite.

Terminal 1 — backend:
```bash
cd server
npm install
npm start
```

Terminal 2 — frontend (com hot-reload, proxy automático para a API):
```bash
cd client
npm install
npm run dev
```

Acesse `http://localhost:5173` (o Vite dev server) — as chamadas a `/api`
são redirecionadas automaticamente para o backend em `:8080` (ver
`client/vite.config.js`).

## Segurança

Como combinado, esta versão **não tem autenticação** — ela assume que só
dispositivos da sua rede local vão acessá-la. Se em algum momento você quiser:

- **Acessar de fora de casa**: prefira usar sua VPN WireGuard já configurada
  em vez de expor a porta 8080 diretamente na internet.
- **Adicionar uma camada simples de proteção**: dá para colocar um proxy
  reverso (Caddy ou Nginx) na frente exigindo autenticação básica (HTTP Basic
  Auth), sem precisar mexer no código da aplicação.

## Estrutura de dados (para referência)

O `state.json` guarda um único objeto com:

| Campo | Descrição |
|---|---|
| `subtopics` | progresso e anotações por subtópico |
| `topicNotes` / `quarterNotes` | anotações gerais |
| `quarterDeadlines` | prazos por trimestre |
| `studyTime` | segundos de estudo acumulados por trimestre |
| `customTopics` | tópicos adicionados manualmente |
| `myCourses` | cursos pessoais com status |
| `customCards` / `cardEdits` / `removedCards` / `cardProgress` | flashcards e progresso de repetição espaçada |
| `log` | histórico das últimas 30 atividades |

Esse é o mesmo formato usado na versão anterior (HTML único), então um backup
`.json` exportado de lá pode ser importado aqui pela seção "Dados e backup".