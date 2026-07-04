export const DATA = [
  {
    id: "t1", label: "T1", title: "Fundamentos sólidos", subtitle: "Deep Learning + Matemática aplicada",
    why: "Sem entender a mecânica interna (embeddings, atenção, gradiente) você fica refém de tutoriais e não consegue debugar problemas reais em produção — exatamente o tipo de trabalho que você já faz com o GABI.",
    topics: [
      { title: "Álgebra linear e cálculo aplicados a ML", subtopics: [
        { title: "Vetores, matrizes e operações básicas", links: [
          { name: "3Blue1Brown — Vectors, what even are they? (Essence of Linear Algebra, cap. 1)", url: "https://www.youtube.com/watch?v=fNk_zzaMoSs", type: "free" },
          { name: "3Blue1Brown — Linear transformations and matrices (Essence of Linear Algebra, cap. 3)", url: "https://www.youtube.com/watch?v=kYB8IZa5AuE", type: "free" },
          { name: "3Blue1Brown — Essence of Linear Algebra (playlist completa)", url: "https://www.youtube.com/playlist?list=PLZHQObOWTQDPD3MizzM2xVFitgF8hE_ab", type: "free" }
        ]},
        { title: "Derivadas parciais e gradiente", links: [
          { name: "Khan Academy — Introduction to partial derivatives (artigo)", url: "https://www.khanacademy.org/math/multivariable-calculus/multivariable-derivatives/partial-derivative-and-gradient-articles/a/introduction-to-partial-derivatives", type: "free" },
          { name: "Khan Academy — Gradient (vídeo)", url: "https://www.khanacademy.org/math/multivariable-calculus/partial_derivatives_topic/gradient", type: "free" }
        ]},
        { title: "Intuição geométrica de otimização (gradient descent)", links: [
          { name: "3Blue1Brown — Gradient descent, how neural networks learn (Deep Learning, cap. 2)", url: "https://www.youtube.com/watch?v=IHZwWFHWa-w", type: "free" }
        ]}
      ]},
      { title: "Redes neurais: perceptron, MLP e backpropagation", subtopics: [
        { title: "Perceptron e camadas densas", links: [
          { name: "StatQuest — Basics of Neural Networks, Clearly Explained (Perceptrons e MLP)", url: "https://www.youtube.com/watch?v=MxVXIeOj-EY", type: "free" }
        ]},
        { title: "Backpropagation passo a passo", links: [
          { name: "3Blue1Brown — What is backpropagation really doing? (Deep Learning, cap. 3)", url: "https://www.3blue1brown.com/lessons/backpropagation", type: "free" },
          { name: "3Blue1Brown — Backpropagation calculus (Deep Learning, cap. 4)", url: "https://www.youtube.com/watch?v=tIeHLnjs5U8", type: "free" }
        ]},
        { title: "Funções de ativação (ReLU, sigmoid, softmax)", links: [
          { name: "Activation Functions Explained: Sigmoid, ReLU, Softmax & More! (Neural Networks Guide)", url: "https://www.youtube.com/watch?v=dQvPywlQ9Kg", type: "free" }
        ]},
        { title: "Overfitting, regularização e dropout", links: [
          { name: "StatQuest — Machine Learning Fundamentals: Bias and Variance", url: "https://www.youtube.com/watch?v=EuBBz3bI-aA", type: "free" },
          { name: "Srivastava et al. — Dropout: A Simple Way to Prevent Neural Networks from Overfitting (paper original)", url: "https://www.cs.toronto.edu/~rsalakhu/papers/srivastava14a.pdf", type: "free" }
        ]}
      ]},
      { title: "Deep learning aplicado a sequências", subtopics: [
        { title: "Redes recorrentes (RNN, LSTM, GRU) e suas limitações", links: [
          { name: "StatQuest — Recurrent Neural Networks (RNNs), Clearly Explained", url: "https://www.youtube.com/watch?v=AsNTP8Kwu80", type: "free" },
          { name: "StatQuest — Long Short-Term Memory (LSTM), Clearly Explained", url: "https://www.youtube.com/watch?v=YCzL96nL7j0", type: "free" },
          { name: "d2l.ai — Gated Recurrent Units (GRU)", url: "https://d2l.ai/chapter_recurrent-modern/gru.html", type: "free" }
        ]},
        { title: "Por que Transformers substituíram RNNs em sequências longas", links: [
          { name: "Baeldung — From RNNs to Transformers", url: "https://www.baeldung.com/cs/rnns-transformers-nlp", type: "free" },
          { name: "StatQuest — Transformer Neural Networks, ChatGPT's Foundation, Clearly Explained", url: "https://www.youtube.com/watch?v=zxQyTK8quyY", type: "free" }
        ]}
      ]},
      { title: "Transformers em detalhe", subtopics: [
        { title: "Self-attention e multi-head attention", links: [
          { name: "Jay Alammar — The Illustrated Transformer", url: "https://jalammar.github.io/illustrated-transformer/", type: "free" },
          { name: "3Blue1Brown — Attention in transformers, step-by-step (Deep Learning, cap. 6)", url: "https://www.3blue1brown.com/lessons/attention", type: "free" },
          { name: "StatQuest — Attention for Neural Networks, Clearly Explained", url: "https://www.youtube.com/watch?v=PSs6nxngL6k", type: "free" }
        ]},
        { title: "Positional encoding", links: [
          { name: "Amirhossein Kazemnejad — Transformer Architecture: The Positional Encoding", url: "https://kazemnejad.com/blog/transformer_architecture_positional_encoding/", type: "free" },
          { name: "Jay Alammar — The Illustrated Transformer (seção de positional encoding)", url: "https://jalammar.github.io/illustrated-transformer/", type: "free" }
        ]},
        { title: "Encoder-decoder vs decoder-only (GPT-style)", links: [
          { name: "StatQuest — Decoder-Only Transformers, ChatGPT's Specific Transformer, Clearly Explained", url: "https://www.youtube.com/watch?v=bQ5BoolX9Ag", type: "free" },
          { name: "StatQuest — Encoder-Only Transformers (like BERT) for RAG, Clearly Explained", url: "https://www.youtube.com/watch?v=GDN649X_acE", type: "free" },
          { name: "Jay Alammar — The Illustrated GPT-2 (Visualizing Transformer Language Models)", url: "https://jalammar.github.io/illustrated-gpt2/", type: "free" }
        ]}
      ]},
      { title: "Séries temporais e forecast moderno", subtopics: [
        { title: "Modelos estatísticos clássicos (ARIMA, Prophet)", links: [
          { name: "Forecasting: Principles and Practice — Chapter 8, ARIMA models", url: "https://otexts.com/fpp2/arima.html", type: "free" },
          { name: "Prophet — Quick Start (documentação oficial)", url: "https://facebook.github.io/prophet/docs/quick_start.html", type: "free" }
        ]},
        { title: "Modelos baseados em redes neurais (N-BEATS, Temporal Fusion Transformer)", links: [
          { name: "Oreshkin et al. — N-BEATS: Neural Basis Expansion Analysis for Interpretable Time Series Forecasting (paper, arXiv)", url: "https://arxiv.org/abs/1905.10437", type: "free" },
          { name: "Nikos Kafritsas — Temporal Fusion Transformer: Time Series Forecasting with Deep Learning, Complete Tutorial", url: "https://towardsdatascience.com/temporal-fusion-transformer-time-series-forecasting-with-deep-learning-complete-tutorial-d32c1e51cd91/", type: "free" },
          { name: "Nixtla — NBEATS model docs (neuralforecast)", url: "https://nixtlaverse.nixtla.io/neuralforecast/models.nbeats.html", type: "free" }
        ]},
        { title: "Comparação prática de acurácia e custo computacional", links: [
          { name: "Comparing Prophet and Deep Learning to ARIMA in Forecasting Wholesale Food Prices (paper)", url: "https://arxiv.org/pdf/2107.12770", type: "free" },
          { name: "Wielding Occam's razor: Fast and frugal retail forecasting (arXiv)", url: "https://arxiv.org/pdf/2102.13209", type: "free" }
        ]}
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
      { title: "Como LLMs são treinados", subtopics: [
        { title: "Pré-treinamento em larga escala (next-token prediction)", links: [
          { name: "How does next-token prediction train a large language model? (Sebastian Raschka)", url: "https://sebastianraschka.com/faq/docs/next-token-prediction.html", type: "free" },
          { name: "Let's build GPT: from scratch, in code, spelled out (Andrej Karpathy)", url: "https://www.youtube.com/watch?v=kCc8FmEb1nY", type: "free" }
        ]},
        { title: "Fine-tuning supervisionado (SFT)", links: [
          { name: "Supervised Fine-Tuning (SFT) for LLMs — GeeksforGeeks", url: "https://www.geeksforgeeks.org/artificial-intelligence/supervised-fine-tuning-sft-for-llms/", type: "free" },
          { name: "TRL SFTTrainer documentation (Hugging Face)", url: "https://huggingface.co/docs/trl/main/en/sft_trainer", type: "free" }
        ]},
        { title: "RLHF e DPO", links: [
          { name: "Illustrating Reinforcement Learning from Human Feedback (RLHF) — Hugging Face blog", url: "https://huggingface.co/blog/rlhf", type: "free" },
          { name: "RLHF in 2024 with DPO & Hugging Face (Philipp Schmid)", url: "https://www.philschmid.de/dpo-align-llms-in-2024-with-trl", type: "free" },
          { name: "DPO Trainer — TRL documentation (Hugging Face)", url: "https://huggingface.co/docs/trl/main/en/dpo_trainer", type: "free" }
        ]}
      ]},
      { title: "Fine-tuning eficiente", subtopics: [
        { title: "Conceito de LoRA", links: [
          { name: "Mastering Low-Rank Adaptation (LoRA) — DataCamp Tutorial", url: "https://www.datacamp.com/tutorial/mastering-low-rank-adaptation-lora-enhancing-large-language-models-for-efficient-adaptation", type: "free" },
          { name: "Low-Rank Adaptation (LoRA) Explained — Docker Blog", url: "https://www.docker.com/blog/lora-explained/", type: "free" }
        ]},
        { title: "QLoRA e quantização", links: [
          { name: "QLoRA: Efficient Finetuning of Quantized LLMs — repositório oficial", url: "https://github.com/artidoro/qlora", type: "free" },
          { name: "What is QLoRA?: A Visual Guide to Efficient Finetuning of Quantized LLMs", url: "https://codecompass00.substack.com/p/qlora-visual-guide-finetune-quantized-llms-peft", type: "free" },
          { name: "Parameter-Efficient Fine-Tuning of LLMs with LoRA and QLoRA — Analytics Vidhya", url: "https://www.analyticsvidhya.com/blog/2023/08/lora-and-qlora/", type: "free" }
        ]},
        { title: "Quando vale fine-tuning vs prompt/RAG", links: [
          { name: "RAG vs fine-tuning vs prompt engineering — IBM Think", url: "https://www.ibm.com/think/topics/rag-vs-fine-tuning-vs-prompt-engineering", type: "free" },
          { name: "RAG vs fine-tuning vs prompt engineering: And the winner is... — K2view", url: "https://www.k2view.com/blog/rag-vs-fine-tuning-vs-prompt-engineering/", type: "free" }
        ]}
      ]},
      { title: "Embeddings e busca semântica", subtopics: [
        { title: "Como texto vira vetor", links: [
          { name: "Vector embeddings — OpenAI API guide", url: "https://developers.openai.com/api/docs/guides/embeddings", type: "free" },
          { name: "OpenAI Text Embedding Models: A Beginner's Guide — The New Stack", url: "https://thenewstack.io/beginners-guide-to-openai-text-embedding-models/", type: "free" }
        ]},
        { title: "Similaridade de cosseno e distância euclidiana", links: [
          { name: "Vector Similarity Explained — Pinecone Learn", url: "https://www.pinecone.io/learn/vector-similarity/", type: "free" },
          { name: "Measuring Similarity and Distance between Embeddings — Dataquest", url: "https://www.dataquest.io/blog/measuring-similarity-and-distance-between-embeddings/", type: "free" }
        ]},
        { title: "Bancos vetoriais: pgvector, Qdrant, Chroma, Weaviate", links: [
          { name: "Exploring Vector Databases: Pinecone, Chroma, Weaviate, Qdrant, Milvus, PgVector, and Redis", url: "https://mehmetozkaya.medium.com/exploring-vector-databases-pinecone-chroma-weaviate-qdrant-milvus-pgvector-and-redis-f0618fe9e92d", type: "free" },
          { name: "pgvector — repositório oficial e docs", url: "https://github.com/pgvector/pgvector", type: "free" }
        ]}
      ]},
      { title: "RAG completo", subtopics: [
        { title: "Estratégias de chunking", links: [
          { name: "Chunking Strategies for LLM Applications — Pinecone Learn", url: "https://www.pinecone.io/learn/chunking-strategies/", type: "free" },
          { name: "Breaking up is hard to do: Chunking in RAG applications — Stack Overflow Blog", url: "https://stackoverflow.blog/2024/12/27/breaking-up-is-hard-to-do-chunking-in-rag-applications/", type: "free" }
        ]},
        { title: "Indexação e retrieval", links: [
          { name: "Build a RAG agent — LangChain official docs", url: "https://docs.langchain.com/oss/python/langchain/rag", type: "free" },
          { name: "RAG From Scratch — LangChain (notebooks + playlist sobre indexing e retrieval)", url: "https://github.com/langchain-ai/rag-from-scratch", type: "free" }
        ]},
        { title: "Reranking", links: [
          { name: "Master Reranking with Cohere Models — Cohere docs", url: "https://docs.cohere.com/docs/reranking-with-cohere", type: "free" },
          { name: "Improve RAG performance using Cohere Rerank — AWS Machine Learning Blog", url: "https://aws.amazon.com/blogs/machine-learning/improve-rag-performance-using-cohere-rerank/", type: "free" }
        ]},
        { title: "Geração aumentada por contexto recuperado", links: [
          { name: "Introduction to LLM RAG — Retrieval Augmented Generation Explained (Weaviate)", url: "https://weaviate.io/blog/introduction-to-rag", type: "free" },
          { name: "Retrieval-Augmented Generation (RAG) — Pinecone Learn", url: "https://www.pinecone.io/learn/retrieval-augmented-generation/", type: "free" }
        ]}
      ]},
      { title: "Modelos abertos vs fechados", subtopics: [
        { title: "Trade-offs de custo, privacidade e controle", links: [
          { name: "LLMs Explained: Open-Source Vs Proprietary AI Models — AceCloud", url: "https://acecloud.ai/blog/open-source-vs-proprietary-llms/", type: "free" },
          { name: "Open-Source vs Closed-Source LLM Software: Pros and Cons — Charter Global", url: "https://www.charterglobal.com/open-source-vs-closed-source-llm-software-pros-and-cons/", type: "free" }
        ]},
        { title: "Llama/Mistral local vs API Anthropic/OpenAI", links: [
          { name: "Ollama — site oficial (rodar Llama, Mistral e outros modelos abertos localmente)", url: "https://ollama.com/", type: "free" },
          { name: "Local LLM vs Cloud API: When to Use Each (Trade-offs)", url: "https://www.promptquorum.com/local-llms/local-llm-limitations", type: "free" }
        ]},
        { title: "Implicações para dados sensíveis de hóspedes/hotéis", links: [
          { name: "5-Minute Guide: Make Your LLM App GDPR-Compliant With PII Scrubbing", url: "https://dev.to/tiamatenity/5-minute-guide-make-your-llm-app-gdpr-compliant-with-pii-scrubbing-1deb", type: "free" },
          { name: "Building LLMs with sensitive data: a practical guide to privacy and security (PII/PHI) — Sigma AI", url: "https://sigma.ai/llm-privacy-security-phi-pii-best-practices/", type: "free" }
        ]}
      ]}
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
      { title: "Técnicas de prompt", subtopics: [
        { title: "Few-shot e zero-shot", links: [
          { name: "Anthropic Docs — Use examples (multishot prompting)", url: "https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/multishot-prompting", type: "free" },
          { name: "Prompt Engineering Guide — Zero-Shot Prompting", url: "https://www.promptingguide.ai/techniques/zeroshot", type: "free" }
        ]},
        { title: "Chain-of-thought e self-consistency", links: [
          { name: "Anthropic Docs — Let Claude think (chain of thought prompting)", url: "https://docs.anthropic.com/en/docs/let-claude-think", type: "free" },
          { name: "Self-Consistency Improves Chain of Thought Reasoning in Language Models (Wang et al., arXiv)", url: "https://arxiv.org/abs/2203.11171", type: "free" },
          { name: "Prompt Engineering Guide — Self-Consistency", url: "https://www.promptingguide.ai/techniques/consistency", type: "free" }
        ]},
        { title: "Prompt chaining", links: [
          { name: "Anthropic Docs — Chain complex prompts for stronger performance", url: "https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/chain-prompts", type: "free" },
          { name: "Anthropic Cookbook — Chaining Prompts (notebook)", url: "https://github.com/aws-samples/prompt-engineering-with-anthropic-claude-v-3/blob/main/10_1_Appendix_Chaining_Prompts.ipynb", type: "free" }
        ]},
        { title: "Uso de tags XML para estruturar saída", links: [
          { name: "Anthropic Docs — Use XML tags to structure your prompts", url: "https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/use-xml-tags", type: "free" }
        ]}
      ]},
      { title: "Prompt engineering para tarefas estruturadas", subtopics: [
        { title: "Extração de dados estruturados (JSON)", links: [
          { name: "Anthropic Cookbook — Extracting structured JSON using tool use", url: "https://github.com/anthropics/anthropic-cookbook/blob/main/tool_use/extracting_structured_json.ipynb", type: "free" },
          { name: "Claude Platform Docs — Structured outputs", url: "https://platform.claude.com/docs/en/build-with-claude/structured-outputs", type: "free" }
        ]},
        { title: "Classificação com poucos exemplos", links: [
          { name: "Claude Platform Docs — Prompting best practices (multishot para classificação/extração)", url: "https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices", type: "free" },
          { name: "Anthropic Docs — Use examples (multishot prompting)", url: "https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/multishot-prompting", type: "free" }
        ]},
        { title: "Geração de código assistida", links: [
          { name: "Anthropic Claude Cookbooks (GitHub) — code generation e tool-use recipes", url: "https://github.com/anthropics/claude-cookbooks", type: "free" },
          { name: "Anthropic — Effective context engineering for AI agents", url: "https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents", type: "free" }
        ]}
      ]},
      { title: "Avaliação de LLMs", subtopics: [
        { title: "Construção de datasets de avaliação", links: [
          { name: "Hamel Husain — Your AI Product Needs Evals", url: "https://hamel.dev/blog/posts/evals/index.html", type: "free" },
          { name: "Hamel Husain — Why is error analysis so important in LLM evals, and how is it performed?", url: "https://hamel.dev/blog/posts/evals-faq/why-is-error-analysis-so-important-in-llm-evals-and-how-is-it-performed.html", type: "free" }
        ]},
        { title: "Métricas automáticas", links: [
          { name: "Hamel Husain — Should I use \"ready-to-use\" evaluation metrics?", url: "https://hamel.dev/blog/posts/evals-faq/should-i-use-ready-to-use-evaluation-metrics.html", type: "free" },
          { name: "Understanding LLM Evaluation Metrics: BLEU, ROUGE, Exact Match, and BERTScore", url: "https://medium.com/@pur4v/understanding-llm-evaluation-metrics-bleu-rouge-exact-match-and-bertscore-716487e40bdd", type: "free" }
        ]},
        { title: "LLM-as-judge", links: [
          { name: "Hamel Husain — Using LLM-as-a-Judge For Evaluation: A Complete Guide", url: "https://hamel.dev/blog/posts/llm-judge/index.html", type: "free" }
        ]},
        { title: "Detecção de regressão entre versões de prompt", links: [
          { name: "Ship Prompts Like Software: Regression Testing for LLMs", url: "https://www.anup.io/ship-prompts-like-software-regression-testing-for-llms/", type: "free" },
          { name: "Braintrust — What is prompt evaluation? How to test prompts with metrics and judges", url: "https://www.braintrust.dev/articles/what-is-prompt-evaluation", type: "free" }
        ]}
      ]},
      { title: "Guardrails e segurança de prompt", subtopics: [
        { title: "Prompt injection", links: [
          { name: "Anthropic — Mitigating the risk of prompt injections in browser use", url: "https://www.anthropic.com/research/prompt-injection-defenses", type: "free" },
          { name: "OWASP — LLM01:2025 Prompt Injection", url: "https://genai.owasp.org/llmrisk/llm01-prompt-injection/", type: "free" }
        ]},
        { title: "Jailbreak e mitigação", links: [
          { name: "Claude Docs — Mitigate jailbreaks and prompt injections", url: "https://docs.anthropic.com/en/docs/test-and-evaluate/strengthen-guardrails/mitigate-jailbreaks", type: "free" },
          { name: "OWASP Gen AI Security Project — LLM Top 10 Risks", url: "https://genai.owasp.org/llm-top-10/", type: "free" }
        ]},
        { title: "Sanitização de entrada e saída", links: [
          { name: "OWASP — LLM Prompt Injection Prevention Cheat Sheet", url: "https://cheatsheetseries.owasp.org/cheatsheets/LLM_Prompt_Injection_Prevention_Cheat_Sheet.html", type: "free" },
          { name: "OWASP Gen AI — LLM05:2025 Improper Output Handling", url: "https://genai.owasp.org/llmrisk/llm052025-improper-output-handling/", type: "free" },
          { name: "Claude Docs — Reduce hallucinations", url: "https://docs.claude.com/en/docs/test-and-evaluate/strengthen-guardrails/reduce-hallucinations", type: "free" }
        ]}
      ]},
      { title: "Observabilidade", subtopics: [
        { title: "Logging estruturado de prompts/respostas", links: [
          { name: "Langfuse Docs — LLM Observability & Application Tracing (Open Source)", url: "https://langfuse.com/docs/observability/overview", type: "free" },
          { name: "Vellum — A Guide to LLM Observability", url: "https://www.vellum.ai/blog/a-guide-to-llm-observability", type: "free" }
        ]},
        { title: "Versionamento de prompts", links: [
          { name: "Agenta — Prompt Versioning: The Complete Guide", url: "https://agenta.ai/blog/prompt-versioning-guide", type: "free" },
          { name: "LaunchDarkly — Prompt Versioning & Management Guide for Building AI Features", url: "https://launchdarkly.com/blog/prompt-versioning-and-management/", type: "free" }
        ]}
      ]}
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
      { title: "Arquitetura de agentes", subtopics: [
        { title: "Padrão ReAct (reasoning + acting)", links: [
          { name: "ReAct: Synergizing Reasoning and Acting in Language Models (paper original, arXiv)", url: "https://arxiv.org/abs/2210.03629", type: "free" },
          { name: "Building Effective AI Agents — Anthropic (padrões de agentic loop, incluindo ReAct)", url: "https://www.anthropic.com/research/building-effective-agents", type: "free" },
          { name: "ysymyth/ReAct — repositório oficial com código de referência do paper", url: "https://github.com/ysymyth/ReAct", type: "free" }
        ]},
        { title: "Tool use / function calling", links: [
          { name: "Tool use with Claude — Claude Platform Docs", url: "https://platform.claude.com/docs/en/agents-and-tools/tool-use/overview", type: "free" },
          { name: "Writing effective tools for AI agents — Anthropic Engineering", url: "https://www.anthropic.com/engineering/writing-tools-for-agents", type: "free" },
          { name: "Introducing advanced tool use on the Claude Developer Platform — Anthropic", url: "https://www.anthropic.com/engineering/advanced-tool-use", type: "free" }
        ]},
        { title: "Agentes multi-etapa e loops de decisão", links: [
          { name: "Building Effective AI Agents — Anthropic (workflows vs. agentes autônomos, loops de decisão)", url: "https://www.anthropic.com/research/building-effective-agents", type: "free" },
          { name: "LangGraph Tutorial: Self-Correcting AI Agents and Agent Loops — ActiveWizards", url: "https://activewizards.com/blog/a-deep-dive-into-langgraph-for-self-correcting-ai-agents/", type: "free" }
        ]}
      ]},
      { title: "Frameworks de orquestração", subtopics: [
        { title: "LangGraph", links: [
          { name: "LangGraph overview — Docs by LangChain", url: "https://docs.langchain.com/oss/python/langgraph/overview", type: "free" },
          { name: "langchain-ai/langgraph — repositório oficial no GitHub", url: "https://github.com/langchain-ai/langgraph", type: "free" },
          { name: "LangGraph: Build Stateful AI Agents in Python — Real Python", url: "https://realpython.com/langgraph-python/", type: "free" }
        ]},
        { title: "CrewAI", links: [
          { name: "CrewAI Documentation (guias oficiais de agentes, tasks e tools)", url: "https://docs.crewai.com/", type: "free" },
          { name: "Build your First CrewAI Agents — CrewAI Blog", url: "https://blog.crewai.com/getting-started-with-crewai-build-your-first-crew/", type: "free" }
        ]},
        { title: "Implementação própria enxuta (sem framework)", links: [
          { name: "Building Effective AI Agents — Anthropic (recomenda começar sem framework, usando a API diretamente)", url: "https://www.anthropic.com/research/building-effective-agents", type: "free" },
          { name: "Building Effective AI Agents — PDF com padrões de arquitetura e frameworks de implementação (Anthropic Resources)", url: "https://resources.anthropic.com/hubfs/Building%20Effective%20AI%20Agents-%20Architecture%20Patterns%20and%20Implementation%20Frameworks.pdf", type: "free" }
        ]}
      ]},
      { title: "MCP (Model Context Protocol)", subtopics: [
        { title: "Conceito e motivação", links: [
          { name: "What is the Model Context Protocol (MCP)? — modelcontextprotocol.io", url: "https://modelcontextprotocol.io/docs/getting-started/intro", type: "free" },
          { name: "Introducing the Model Context Protocol — Anthropic", url: "https://www.anthropic.com/news/model-context-protocol", type: "free" }
        ]},
        { title: "Conectar um agente a uma ferramenta externa via MCP", links: [
          { name: "Build an MCP server — Model Context Protocol (quickstart)", url: "https://modelcontextprotocol.io/quickstart/server", type: "free" },
          { name: "Build an MCP client — Model Context Protocol", url: "https://modelcontextprotocol.io/docs/develop/build-client", type: "free" },
          { name: "modelcontextprotocol/quickstart-resources — servidores e clientes de exemplo (GitHub)", url: "https://github.com/modelcontextprotocol/quickstart-resources", type: "free" }
        ]}
      ]},
      { title: "LLMOps", subtopics: [
        { title: "Prompt caching", links: [
          { name: "Prompt caching — Claude Platform Docs (Anthropic)", url: "https://docs.anthropic.com/en/docs/build-with-claude/prompt-caching", type: "free" },
          { name: "claude-cookbooks: prompt_caching.ipynb — exemplo prático (Anthropic)", url: "https://github.com/anthropics/anthropic-cookbook/blob/main/misc/prompt_caching.ipynb", type: "free" }
        ]},
        { title: "Roteamento entre modelos por complexidade", links: [
          { name: "Multi-LLM routing strategies for generative AI applications on AWS — AWS ML Blog", url: "https://aws.amazon.com/blogs/machine-learning/multi-llm-routing-strategies-for-generative-ai-applications-on-aws/", type: "free" },
          { name: "LLM routing in production: Choosing the right model for every request — LogRocket Blog", url: "https://blog.logrocket.com/llm-routing-right-model-for-requests/", type: "free" }
        ]},
        { title: "Monitoramento de latência e qualidade em produção", links: [
          { name: "What is LLMOps? LLM Operations Guide — MLflow AI Platform", url: "https://mlflow.org/llmops", type: "free" },
          { name: "Logging and Observability Platforms in LLMOps — apxml (curso)", url: "https://apxml.com/courses/mlops-for-large-models-llmops/chapter-5-llm-monitoring-observability-maintenance/llm-logging-observability", type: "free" }
        ]}
      ]},
      { title: "Integração com dados corporativos", subtopics: [
        { title: "Conectar agentes a bancos de dados", links: [
          { name: "Build a SQL agent — Docs by LangChain", url: "https://docs.langchain.com/oss/python/langchain/sql-agent", type: "free" }
        ]},
        { title: "Integração com APIs internas e Azure DevOps", links: [
          { name: "microsoft/azure-devops-mcp — servidor MCP oficial para Azure DevOps (GitHub)", url: "https://github.com/microsoft/azure-devops-mcp", type: "free" },
          { name: "Enable AI assistance with the Azure DevOps MCP Server — Microsoft Learn", url: "https://learn.microsoft.com/en-us/azure/devops/mcp-server/mcp-server-overview?view=azure-devops", type: "free" },
          { name: "Set up the remote Azure DevOps MCP Server (preview) — Microsoft Learn", url: "https://learn.microsoft.com/en-us/azure/devops/mcp-server/remote-mcp-server?view=azure-devops", type: "free" }
        ]}
      ]}
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
      { title: "Governança de IA", subtopics: [
        { title: "Frameworks de risco (NIST AI RMF)", links: [
          { name: "NIST AI Risk Management Framework (AI RMF 1.0) — documento oficial completo", url: "https://nvlpubs.nist.gov/nistpubs/ai/nist.ai.100-1.pdf", type: "free" },
          { name: "AI RMF Playbook — ações práticas por função (Govern, Map, Measure, Manage)", url: "https://airc.nist.gov/airmf-resources/playbook/", type: "free" },
          { name: "NIST — página oficial do AI Risk Management Framework", url: "https://www.nist.gov/itl/ai-risk-management-framework", type: "free" }
        ]},
        { title: "Model cards", links: [
          { name: "Model Cards for Model Reporting (Mitchell et al., paper original do Google)", url: "https://research.google/pubs/model-cards-for-model-reporting/", type: "free" },
          { name: "Google Model Cards — explorador interativo com exemplos reais", url: "https://modelcards.withgoogle.com/explore-a-model-card", type: "free" },
          { name: "Create a Custom Model Card with Google's Model Card Toolkit (tutorial prático)", url: "https://towardsdatascience.com/create-a-custom-model-card-with-googles-model-card-toolkit-a1e89a7887b5/", type: "free" }
        ]},
        { title: "Auditoria de decisões automatizadas", links: [
          { name: "Da regulamentação de decisões automatizadas e IA pela ANPD (ConJur)", url: "https://www.conjur.com.br/2024-nov-27/riscos-e-oportunidades-da-regulamentacao-de-decisoes-automatizadas-e-inteligencia-artificial-pela-anpd/", type: "free" },
          { name: "O papel crucial da auditoria em algoritmos e modelos de IA (Migalhas)", url: "https://www.migalhas.com.br/depeso/419877/o-papel-crucial-da-auditoria-em-algoritmos-e-modelos-de-ia", type: "free" }
        ]}
      ]},
      { title: "Vieses e fairness", subtopics: [
        { title: "Identificação de viés em modelos de forecast/pricing", links: [
          { name: "Utility Fairness in Contextual Dynamic Pricing with Demand Learning (paper acadêmico, não específico de hotelaria)", url: "https://arxiv.org/pdf/2311.16528", type: "free" },
          { name: "Forecast Bias vs Accuracy in Demand Forecasting", url: "https://www.forthcast.io/blog/bias-vs-accuracy-explainable-ai-demand-forecasting", type: "free" }
        ]},
        { title: "Mitigação de vieses em contexto hoteleiro", links: [
          { name: "Algorithmic pricing in hospitality and tourism: call for research on ethics, consumer backlash and CSR (artigo acadêmico específico de hotelaria/turismo)", url: "https://www.sciencedirect.com/science/article/pii/S2514979222000015", type: "free" },
          { name: "Ethical AI Pricing: Avoiding Bias and Discrimination in Algorithmic Pricing (guia geral, não específico de hotéis)", url: "https://www.getmonetizely.com/articles/ethical-ai-pricing-avoiding-bias-and-discrimination-in-algorithmic-pricing", type: "free" }
        ]}
      ]},
      { title: "Privacidade e dados sensíveis", subtopics: [
        { title: "Anonimização de dados", links: [
          { name: "Estudo Técnico sobre Anonimização de Dados na LGPD: Análise Jurídica (ANPD, documento oficial)", url: "https://www.gov.br/anpd/pt-br/centrais-de-conteudo/documentos-tecnicos-orientativos/estudo_tecnico_sobre_anonimizacao_de_dados_na_lgpd___analise_juridica.pdf/@@display-file/file", type: "free" },
          { name: "Artigo 12: Anonimização dos dados pessoais — LGPD Brasil", url: "https://lgpd-brasil.info/capitulo_02/artigo_12", type: "free" }
        ]},
        { title: "LGPD aplicada a sistemas de IA", links: [
          { name: "ANPD — Documentos Técnicos e Orientativos (inclui Nota Técnica sobre IA e decisões automatizadas)", url: "https://www.gov.br/anpd/pt-br/centrais-de-conteudo/documentos-tecnicos-orientativos", type: "free" },
          { name: "ANPD apresenta resultados da Tomada de Subsídios sobre Inteligência Artificial e Revisão de Decisões Automatizadas", url: "https://www.gov.br/anpd/pt-br/assuntos/noticias/anpd-apresenta-resultados-da-tomada-de-subsidios-sobre-tratamento-automatizado-de-dados-pessoais", type: "free" }
        ]}
      ]},
      { title: "Escalabilidade", subtopics: [
        { title: "Custo por inferência", links: [
          { name: "LLM Inference Cost — Complete Pricing Guide", url: "https://aisuperior.com/llm-token-cost/", type: "free" },
          { name: "LLM Cost Optimization: 10 Tips to Reduce AI Inference & Token Costs (nOps)", url: "https://www.nops.io/blog/llm-cost-optimization-tips/", type: "free" }
        ]},
        { title: "Cache e quantização de modelos", links: [
          { name: "KV Caching in LLM Inference: A Comprehensive Review", url: "https://www.rohan-paul.com/p/kv-caching-in-llm-inference-a-comprehensive", type: "free" },
          { name: "LLM Inference and KV Cache Complete Guide — como funciona a geração de tokens e cache", url: "https://qubittool.com/blog/llm-inference-kv-cache-guide", type: "free" },
          { name: "A Survey on Model Compression for Large Language Models (inclui quantização)", url: "https://arxiv.org/pdf/2308.07633", type: "free" }
        ]},
        { title: "Roteamento multi-modelo", links: [
          { name: "Multi-Model API Cost Governance with the Inference Router (DigitalOcean, tutorial prático)", url: "https://www.digitalocean.com/community/tutorials/inference-router-multi-model-api-cost-governance", type: "free" },
          { name: "The Right Model for the Right Job: A Practical Guide to Multi-Model Routing in AI Orchestration", url: "https://mindra.co/blog/multi-model-routing-how-to-choose-the-right-llm-for-every-task", type: "free" },
          { name: "Towards Efficient Multi-LLM Inference: Characterization and Analysis of LLM Routing and Hierarchical Techniques (paper, inclui FrugalGPT e RouteLLM)", url: "https://arxiv.org/html/2506.06579v1", type: "free" }
        ]}
      ]}
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
      { title: "Arquitetura de sistemas de dados/IA em produção", subtopics: [
        { title: "Ingestão e processamento", links: [
          { name: "Self-serve feature platforms: architectures and APIs (Chip Huyen)", url: "https://huyenchip.com/2023/01/08/self-serve-feature-platforms.html", type: "free" },
          { name: "Introduction to streaming for data scientists (Chip Huyen)", url: "https://huyenchip.com/2022/08/03/stream-processing-for-data-scientists.html", type: "free" }
        ]},
        { title: "Camada de modelo/serving", links: [
          { name: "Machine learning is going real-time (Chip Huyen)", url: "https://huyenchip.com/2020/12/27/real-time-machine-learning.html", type: "free" },
          { name: "Real-time machine learning: challenges and solutions (Chip Huyen)", url: "https://huyenchip.com/2022/01/02/real-time-machine-learning-challenges-and-solutions.html", type: "free" },
          { name: "Designing Machine Learning Systems (livro, capítulo sobre model serving) — Chip Huyen", url: "https://www.oreilly.com/library/view/designing-machine-learning/9781098107956/", type: "paid" }
        ]},
        { title: "Monitoramento contínuo", links: [
          { name: "Data Distribution Shifts and Monitoring (Chip Huyen)", url: "https://huyenchip.com/2022/02/07/data-distribution-shifts-and-monitoring.html", type: "free" }
        ]}
      ]},
      { title: "Comunicação técnica para stakeholders", subtopics: [
        { title: "Tradução de métricas técnicas para linguagem de negócio", links: [
          { name: "When Translation Problems Arise Between Data Scientists and Business Stakeholders, Revisit Your Metrics (Harvard Data Science Review)", url: "https://hdsr.mitpress.mit.edu/pub/bfeyfx22", type: "free" },
          { name: "Translating data science capabilities into business ROI (CIO.com)", url: "https://www.cio.com/article/4137995/translating-data-science-capabilities-into-business-roi.html", type: "free" }
        ]},
        { title: "Apresentação de resultados de IA para áreas não técnicas", links: [
          { name: "How to Present Machine Learning Results to Non-Technical People (Towards Data Science)", url: "https://towardsdatascience.com/how-to-present-machine-learning-results-to-non-technical-people-e096cc1b9f76/", type: "free" },
          { name: "A Data Scientist's Guide to Communicating Results (Comet)", url: "https://medium.com/comet-ml/a-data-scientists-guide-to-communicating-results-c79a5ef3e9f1", type: "free" }
        ]}
      ]},
      { title: "Mentoria e revisão técnica", subtopics: [
        { title: "Revisão de arquitetura de colegas", links: [
          { name: "Google Engineering Practices — Code Review: Introduction", url: "https://google.github.io/eng-practices/review/", type: "free" },
          { name: "Design Docs at Google (Malte Ubl, Industrial Empathy)", url: "https://www.industrialempathy.com/posts/design-docs-at-google/", type: "free" }
        ]},
        { title: "Feedback estruturado", links: [
          { name: "Our Approach: Kim Scott's Feedback Framework (Radical Candor)", url: "https://www.radicalcandor.com/our-approach", type: "free" },
          { name: "Use Situation-Behavior-Impact (SBI) to Understand Intent (Center for Creative Leadership)", url: "https://www.ccl.org/articles/leading-effectively-articles/closing-the-gap-between-intent-vs-impact-sbii/", type: "free" }
        ]}
      ]},
      { title: "Tendências emergentes", subtopics: [
        { title: "Modelos multimodais", links: [
          { name: "Multimodal Alignment and Fusion: A Survey (arXiv)", url: "https://arxiv.org/abs/2411.17040", type: "free" },
          { name: "Multimodal AI and Vision-Language Models — panorama de tendências (Zylos Research)", url: "https://zylos.ai/research/2026-01-13-multimodal-ai-vision-language-models", type: "free" }
        ]},
        { title: "Agentes com memória de longo prazo", links: [
          { name: "From context to dreams: architecting memory for AI agents (Red Hat Emerging Technologies)", url: "https://next.redhat.com/2026/06/01/from-context-to-dreams-architecting-memory-for-ai-agents/", type: "free" },
          { name: "State of AI Agent Memory: Progress Benchmark Report (Mem0)", url: "https://mem0.ai/blog/state-of-ai-agent-memory-2026", type: "free" }
        ]},
        { title: "Redução de custo de inferência", links: [
          { name: "LLM Inference Optimization: Cut Cost & Latency at Every Layer (Morph)", url: "https://www.morphllm.com/llm-inference-optimization", type: "free" },
          { name: "Gartner Predicts LLM Inference Cost Will Drop Significantly by 2030", url: "https://www.gartner.com/en/newsroom/press-releases/2026-03-25-gartner-predicts-that-by-2030-performing-inference-on-an-llm-with-1-trillion-parameters-will-cost-genai-providers-over-90-percent-less-than-in-2025", type: "free" }
        ]}
      ]}
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
