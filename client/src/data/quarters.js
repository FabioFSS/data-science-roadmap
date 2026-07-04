export const DATA = [
  {
    id: "t1", label: "T1", title: "Fundamentos sólidos", subtitle: "Deep Learning + Matemática aplicada",
    why: "Sem entender a mecânica interna (embeddings, atenção, gradiente) você fica refém de tutoriais e não consegue debugar problemas reais em produção — exatamente o tipo de trabalho que você já faz com o GABI.",
    topics: [
      { title: "Álgebra linear e cálculo aplicados a ML", subtopics: [
        "Vetores, matrizes e operações básicas", "Derivadas parciais e gradiente", "Intuição geométrica de otimização (gradient descent)"
      ]},
      { title: "Redes neurais: perceptron, MLP e backpropagation", subtopics: [
        "Perceptron e camadas densas", "Backpropagation passo a passo", "Funções de ativação (ReLU, sigmoid, softmax)", "Overfitting, regularização e dropout"
      ]},
      { title: "Deep learning aplicado a sequências", subtopics: [
        "Redes recorrentes (RNN, LSTM, GRU) e suas limitações", "Por que Transformers substituíram RNNs em sequências longas"
      ]},
      { title: "Transformers em detalhe", subtopics: [
        "Self-attention e multi-head attention", "Positional encoding", "Encoder-decoder vs decoder-only (GPT-style)"
      ]},
      { title: "Séries temporais e forecast moderno", subtopics: [
        "Modelos estatísticos clássicos (ARIMA, Prophet)", "Modelos baseados em redes neurais (N-BEATS, Temporal Fusion Transformer)", "Comparação prática de acurácia e custo computacional"
      ]}
    ],
    resources: [
      { name: "Deep Learning Specialization — Andrew Ng (Coursera)", url: "https://www.coursera.org/specializations/deep-learning", type: "mixed" },
      { name: "Practical Deep Learning for Coders (fast.ai)", url: "https://course.fast.ai/", type: "free" },
      { name: "Dive into Deep Learning — livro com código (d2l.ai)", url: "https://d2l.ai/", type: "free" },
      { name: "\"Attention Is All You Need\" — paper original dos Transformers", url: "https://arxiv.org/abs/1706.03762", type: "free" },
      { name: "3Blue1Brown — série visual sobre redes neurais", url: "https://www.3blue1brown.com/topics/neural-networks", type: "free" },
      { name: "StatQuest — canal com explicações intuitivas de estatística e ML", url: "https://www.youtube.com/@statquest", type: "free" },
      { name: "Nixtla neuralforecast — docs e exemplos de forecast com redes neurais", url: "https://nixtlaverse.nixtla.io/neuralforecast/", type: "free" },
      { name: "Darts — biblioteca de forecast (estatístico + deep learning)", url: "https://unit8co.github.io/darts/", type: "free" }
    ],
    deliverable: "Comparar, num notebook fora de produção, o modelo estatístico clássico de forecast já em uso com um modelo baseado em Transformer para séries temporais (ex: neuralforecast ou darts), usando os dados de RMS/GABI."
  },
  {
    id: "t2", label: "T2", title: "LLMs na prática", subtitle: "Arquitetura, fine-tuning, embeddings e RAG",
    why: "Entender como LLMs são treinados e como RAG funciona por dentro é o que separa quem usa API de forma superficial de quem consegue debugar alucinação, custo e latência em produção.",
    topics: [
      { title: "Como LLMs são treinados", subtopics: [ "Pré-treinamento em larga escala (next-token prediction)", "Fine-tuning supervisionado (SFT)", "RLHF e DPO" ]},
      { title: "Fine-tuning eficiente", subtopics: [ "Conceito de LoRA", "QLoRA e quantização", "Quando vale fine-tuning vs prompt/RAG" ]},
      { title: "Embeddings e busca semântica", subtopics: [ "Como texto vira vetor", "Similaridade de cosseno e distância euclidiana", "Bancos vetoriais: pgvector, Qdrant, Chroma, Weaviate" ]},
      { title: "RAG completo", subtopics: [ "Estratégias de chunking", "Indexação e retrieval", "Reranking", "Geração aumentada por contexto recuperado" ]},
      { title: "Modelos abertos vs fechados", subtopics: [ "Trade-offs de custo, privacidade e controle", "Llama/Mistral local vs API Anthropic/OpenAI", "Implicações para dados sensíveis de hóspedes/hotéis" ]}
    ],
    resources: [
      { name: "LLM University (Cohere) — curso completo sobre LLMs", url: "https://cohere.com/llmu", type: "free" },
      { name: "Hugging Face NLP Course", url: "https://huggingface.co/learn/nlp-course", type: "free" },
      { name: "Anthropic — documentação de prompt engineering e tool use", url: "https://docs.claude.com/en/docs/build-with-claude/prompt-engineering/overview", type: "free" },
      { name: "Andrej Karpathy — \"Let's build GPT from scratch\" (vídeo)", url: "https://www.youtube.com/watch?v=kCc8FmEb1nY", type: "free" },
      { name: "Hands-On Large Language Models — livro (Jay Alammar & Maarten Grootendorst)", url: "https://www.oreilly.com/library/view/hands-on-large-language/9781098150952/", type: "paid" },
      { name: "Repositório de código do livro acima (exemplos práticos)", url: "https://github.com/HandsOnLLM/Hands-On-Large-Language-Models", type: "free" },
      { name: "DeepLearning.AI — catálogo de cursos curtos sobre LLMs, RAG e embeddings", url: "https://www.deeplearning.ai/short-courses/", type: "free" },
      { name: "Qdrant — documentação e tutoriais de banco vetorial", url: "https://qdrant.tech/documentation/", type: "free" }
    ],
    deliverable: "Protótipo de RAG rodando localmente (Bazzite + Podman) sobre a documentação interna do GABI ou os relatórios de entrega mensais. Stack sugerida: embeddings open-source (bge-small/nomic-embed-text), Qdrant ou Chroma, geração via API Anthropic ou Ollama local."
  },
  {
    id: "t3", label: "T3", title: "Prompt engineering + Avaliação", subtitle: "Da intuição à medição sistemática",
    why: "O que separa júnior de sênior em LLM não é escrever um prompt esperto — é saber avaliar sistematicamente se um prompt/sistema funciona, com métricas reproduzíveis, não 'parece que ficou melhor'.",
    topics: [
      { title: "Técnicas de prompt", subtopics: [ "Few-shot e zero-shot", "Chain-of-thought e self-consistency", "Prompt chaining", "Uso de tags XML para estruturar saída" ]},
      { title: "Prompt engineering para tarefas estruturadas", subtopics: [ "Extração de dados estruturados (JSON)", "Classificação com poucos exemplos", "Geração de código assistida" ]},
      { title: "Avaliação de LLMs", subtopics: [ "Construção de datasets de avaliação", "Métricas automáticas", "LLM-as-judge", "Detecção de regressão entre versões de prompt" ]},
      { title: "Guardrails e segurança de prompt", subtopics: [ "Prompt injection", "Jailbreak e mitigação", "Sanitização de entrada e saída" ]},
      { title: "Observabilidade", subtopics: [ "Logging estruturado de prompts/respostas", "Versionamento de prompts" ]}
    ],
    resources: [
      { name: "Anthropic — guia de prompt engineering", url: "https://docs.claude.com/en/docs/build-with-claude/prompt-engineering/overview", type: "free" },
      { name: "Anthropic — tutorial interativo de prompt engineering (GitHub)", url: "https://github.com/anthropics/prompt-eng-interactive-tutorial", type: "free" },
      { name: "Anthropic Cookbook — exemplos práticos de código", url: "https://github.com/anthropics/anthropic-cookbook", type: "free" },
      { name: "AI Evals for Engineers & PMs — Hamel Husain & Shreya Shankar (Maven)", url: "https://maven.com/parlance-labs/evals", type: "paid" },
      { name: "Hamel Husain — blog com artigos gratuitos sobre avaliação de LLMs", url: "https://hamel.dev/", type: "free" },
      { name: "OWASP Top 10 para aplicações com LLM (segurança)", url: "https://owasp.org/www-project-top-10-for-large-language-model-applications/", type: "free" }
    ],
    deliverable: "Pipeline de avaliação para o protótipo de RAG do T2: 30-50 perguntas com respostas esperadas, script que roda o pipeline, compara com um LLM-juiz e gera relatório de acurácia."
  },
  {
    id: "t4", label: "T4", title: "Agentes e LLMOps", subtitle: "Orquestração e operação em produção",
    why: "Agentes bem desenhados resolvem tarefas de múltiplas etapas com ferramentas reais — mas exigem controle de custo, latência e falhas, que é o que LLMOps endereça.",
    topics: [
      { title: "Arquitetura de agentes", subtopics: [ "Padrão ReAct (reasoning + acting)", "Tool use / function calling", "Agentes multi-etapa e loops de decisão" ]},
      { title: "Frameworks de orquestração", subtopics: [ "LangGraph", "CrewAI", "Implementação própria enxuta (sem framework)" ]},
      { title: "MCP (Model Context Protocol)", subtopics: [ "Conceito e motivação", "Conectar um agente a uma ferramenta externa via MCP" ]},
      { title: "LLMOps", subtopics: [ "Prompt caching", "Roteamento entre modelos por complexidade", "Monitoramento de latência e qualidade em produção" ]},
      { title: "Integração com dados corporativos", subtopics: [ "Conectar agentes a bancos de dados", "Integração com APIs internas e Azure DevOps" ]}
    ],
    resources: [
      { name: "Anthropic — \"Building Effective Agents\" (artigo de engenharia)", url: "https://www.anthropic.com/engineering/building-effective-agents", type: "free" },
      { name: "Model Context Protocol — documentação oficial", url: "https://modelcontextprotocol.io/", type: "free" },
      { name: "LangGraph — documentação", url: "https://langchain-ai.github.io/langgraph/", type: "free" },
      { name: "AI Agents in LangGraph — curso curto (DeepLearning.AI)", url: "https://www.deeplearning.ai/short-courses/ai-agents-in-langgraph/", type: "free" },
      { name: "CrewAI — documentação", url: "https://docs.crewai.com/", type: "free" },
      { name: "Anthropic Cookbook — exemplos de agentes e tool use", url: "https://github.com/anthropics/anthropic-cookbook", type: "free" }
    ],
    deliverable: "Agente que, dada uma reclamação de forecast (ex: Rede Manaus), consulta os dados do RMS/GABI, identifica se a discrepância é de dados de entrada ou de modelo, e gera um resumo estruturado."
  },
  {
    id: "t5", label: "T5", title: "Segurança e governança", subtitle: "2027 H1 — escala responsável",
    why: "Sistemas de IA que influenciam decisões de negócio (pricing, alocação) precisam de governança explícita — é isso que projeta você como alguém que pensa em risco, não só em modelo.",
    topics: [
      { title: "Governança de IA", subtopics: [ "Frameworks de risco (NIST AI RMF)", "Model cards", "Auditoria de decisões automatizadas" ]},
      { title: "Vieses e fairness", subtopics: [ "Identificação de viés em modelos de forecast/pricing", "Mitigação de vieses em contexto hoteleiro" ]},
      { title: "Privacidade e dados sensíveis", subtopics: [ "Anonimização de dados", "LGPD aplicada a sistemas de IA" ]},
      { title: "Escalabilidade", subtopics: [ "Custo por inferência", "Cache e quantização de modelos", "Roteamento multi-modelo" ]}
    ],
    resources: [
      { name: "NIST AI Risk Management Framework", url: "https://www.nist.gov/itl/ai-risk-management-framework", type: "free" },
      { name: "Google PAIR — People + AI Guidebook", url: "https://pair.withgoogle.com/guidebook/", type: "free" },
      { name: "Anthropic — página de notícias e políticas de segurança", url: "https://www.anthropic.com/news", type: "free" },
      { name: "Autoridade Nacional de Proteção de Dados (LGPD) — guias oficiais", url: "https://www.gov.br/anpd/pt-br", type: "free" }
    ],
    deliverable: "Documento de avaliação de risco para um sistema de IA real da bebook (ex: o próprio GABI): decisões influenciadas, pontos de falha, monitoramento, plano de contingência para erro de modelo."
  },
  {
    id: "t6", label: "T6", title: "Liderança técnica", subtitle: "2027 H2 — arquitetura e influência",
    why: "Sênior de verdade projeta sistemas completos e influencia decisões além do próprio código — este trimestre é sobre consolidar isso.",
    topics: [
      { title: "Arquitetura de sistemas de dados/IA em produção", subtopics: [ "Ingestão e processamento", "Camada de modelo/serving", "Monitoramento contínuo" ]},
      { title: "Comunicação técnica para stakeholders", subtopics: [ "Tradução de métricas técnicas para linguagem de negócio", "Apresentação de resultados de IA para áreas não técnicas" ]},
      { title: "Mentoria e revisão técnica", subtopics: [ "Revisão de arquitetura de colegas", "Feedback estruturado" ]},
      { title: "Tendências emergentes", subtopics: [ "Modelos multimodais", "Agentes com memória de longo prazo", "Redução de custo de inferência" ]}
    ],
    resources: [
      { name: "Designing Machine Learning Systems — livro (Chip Huyen)", url: "https://www.oreilly.com/library/view/designing-machine-learning/9781098107956/", type: "paid" },
      { name: "Chip Huyen — blog com artigos gratuitos sobre sistemas de ML/IA", url: "https://huyenchip.com/blog/", type: "free" },
      { name: "The Batch — newsletter semanal (DeepLearning.AI)", url: "https://www.deeplearning.ai/the-batch/", type: "free" },
      { name: "Papers with Code — acompanhar tendências e benchmarks", url: "https://paperswithcode.com/", type: "free" }
    ],
    deliverable: "Design doc completo (arquitetura, decisões, trade-offs) de um sistema de IA end-to-end para a bebook — evolução do GABI ou detecção automática de discrepâncias de forecast entre RMS e Qlik BI."
  }
];
