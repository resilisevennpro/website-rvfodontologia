# Análise comparativa — landings de lentes em resina

> Avaliação de 4 sites de referência contra a nossa landing `/lentes`.
> **Nenhuma alteração foi feita no projeto.** Este documento é insumo de decisão.

**Data:** 21/08/2026

**Sites analisados:**

| Site | Perfil | Observação |
|---|---|---|
| `dragabrielleleao.com` | Marca pessoal, Brasília-DF | É o código-fonte que copiamos; SPA que não renderiza para crawler |
| `drasheilaconte.com.br` | Marca pessoal, SC | O mais enxuto dos quatro |
| `alinerech.vercel.app` | Marca pessoal, SC | O mais completo estruturalmente |
| `pamelaalmeida.com.br` | Marca pessoal, RS | O mais agressivo em prova social |

---

## 1. O denominador comum

Estas seções aparecem em **todos ou quase todos** os concorrentes. São o padrão
esperado da categoria:

| Seção | Gabrielle | Sheila | Aline | Pamela | **Nós** |
|---|:--:|:--:|:--:|:--:|:--:|
| Hero com CTA | ✅ | ✅ | ✅ | ✅ | ✅ |
| Identificação de dor ("você tem estas queixas?") | ✅ | ✅ | ✅ | ✅ | ✅ |
| Explicação da técnica | ✅ | ✅ | ✅ | ✅ | ✅ |
| Processo em etapas | ✅ | ✅ | ✅ | ✅ | ✅ |
| **Antes e depois (galeria)** | ✅ | ⚠️ | ✅ 9 casos | ✅ múltiplas | ⚠️ placeholder |
| **Depoimentos** | ✅ | ✅ | ✅ | ✅ +1.250 | ❌ |
| **Números de prova social** | ✅ +500 | ✅ +600 | ✅ 2.500+ | ✅ +20.000 | ❌ |
| **Sobre o profissional / equipe** | ✅ | ✅ | ✅ | ✅ | ❌ |
| FAQ | ✅ | ❌ | ✅ 10 | ✅ 15 | ✅ 6 |
| WhatsApp flutuante | ✅ | — | ✅ | — | ❌ |
| Instagram integrado | ✅ feed | ✅ link | ✅ | ✅ | ✅ link |
| CTAs repetidos ao longo da página | ✅ | 3 | 6+ | 6 | 2 |

### O que temos e eles não

- **Assinatura legal completa** (RT + CRO + EPAO). Pamela **não exibe CRO nenhum** —
  irregular. Nossa conformidade com o CFO é superior à de 3 dos 4.
- **Copy sem promessa de resultado.** Os concorrentes usam "sorriso dos sonhos",
  "sem imperfeições", "transforme sua vida" — linguagem que o CFO restringe.
- **JSON-LD por rota** com `FAQPage`. Nenhum concorrente demonstrou isso.
- **Arquitetura multi-rota** com hub de links — os quatro são single-page.

---

## 2. Lacunas reais da nossa landing

Ordenadas por impacto sobre conversão.

### 🔴 Crítico

**1. Nenhuma prova social.** É a diferença mais visível. Todos os quatro lideram com
número: 600, 2.500, 20.000. Nossa página não afirma nada sobre experiência da clínica.
Numa decisão de saúde estética, o paciente compara — e a ausência lê como inexperiência.
→ *Depende de dado real do cliente (pendência #3 do plano).*

**2. Sem depoimentos.** Todos têm. Pamela usa +1.250 como argumento central. É a prova
social de maior peso na categoria, porque vem de terceiros.
→ *Depende de depoimentos reais + autorização (pendência #7).*

**3. Antes e depois em placeholder.** Aline tem 9 casos, Pamela tem galerias múltiplas.
Numa landing de estética, é a seção que o visitante mais procura — ele quer ver
resultado antes de decidir.
→ *Depende de fotos + autorização escrita das pacientes (pendência #6).*

**4. Sem apresentação da equipe.** Os quatro apresentam o profissional com foto,
formação e credenciais. Nós temos uma foto excelente dos três dentistas — usada só na
home, ausente na landing. Somos os únicos com **equipe** em vez de profissional solo,
e isso é diferencial de confiança que não está sendo usado.
→ *Temos a foto; falta a copy institucional e os CROs (pendências #4 e #9).*

### 🟡 Importante

**5. Poucos CTAs.** Temos 2 (hero e final). Aline tem 6+, Pamela 6. Numa página longa,
o visitante decide em pontos diferentes — se não houver botão perto, ele rola até
perder o impulso.
→ *Resolvível agora, sem depender do cliente.*

**6. Sem WhatsApp flutuante.** Gabrielle e Aline têm botão fixo acompanhando a rolagem.
É o padrão da categoria em mobile.
→ *Resolvível agora.*

**7. FAQ mais curto.** Temos 6, Aline tem 10, Pamela 15. FAQ extenso serve a dois fins:
elimina objeção e alimenta o `FAQPage` do JSON-LD, aumentando presença em busca.
→ *Resolvível agora — dá para escrever mais perguntas sem inventar dados.*

### 🟢 Diferencial competitivo

**8. Seção "Desvendando mitos" (Aline).** Endereça crenças erradas — "lente estraga o
dente", "fica artificial". Nós já fazemos isso na landing de implantes, com a seção de
objeções. **Não fazemos em lentes**, onde as objeções são igualmente fortes.
→ *Resolvível agora — o componente `Objections` já existe e está pronto.*

**9. Protocolo com nome próprio (Pamela: "Brilliance®").** Transforma commodity em
método proprietário. É a jogada de posicionamento mais forte entre os quatro.
→ *Decisão do cliente — exige que a clínica tenha um método nomeável.*

**10. Comparativo resina × porcelana.** Temos isso escondido numa pergunta do FAQ. É
uma das principais dúvidas de quem pesquisa, e mereceria seção própria com tabela.
→ *Resolvível agora — o conteúdo já está escrito.*

**11. Vídeo.** Aline e Pamela têm. Alto custo de produção, e o retorno em landing de
clínica local é discutível.
→ *Baixa prioridade.*

---

## 3. O que NÃO devemos copiar

Três dos quatro operam em zona de risco perante o Código de Ética Odontológica:

| Prática observada | Problema |
|---|---|
| "Conquiste um sorriso **sem imperfeições**" (Pamela) | Promessa de resultado |
| "Transforme seu sorriso, **transforme sua vida**" (Aline) | Sensacionalismo |
| "**Tratamento 100% sem dor**" (Pamela) | Garantia absoluta sobre experiência clínica |
| "**+20.000 lentes realizadas**" sem CRO visível (Pamela) | Publicidade sem identificação profissional |
| "Resultado em **única consulta**" (Aline) | Promessa de prazo |
| "**Não adie mais**" (Sheila) | Pressão sobre decisão de saúde |

Nossa copy foi escrita deliberadamente fora dessas construções. **Manter assim.** O
diferencial de sobriedade combina com a identidade monocromática da marca — e é
defensável se houver questionamento do conselho.

---

## 4. Recomendação de prioridade

**Executável agora, sem depender do cliente:**

1. Adicionar seção de objeções em `/lentes` (componente já existe)
2. Ampliar o FAQ de 6 para 10–12 perguntas
3. Inserir CTAs intermediários ao longo da página
4. WhatsApp flutuante
5. Seção comparativa resina × porcelana
6. Seção de equipe usando a foto que já temos (sem números, só institucional)

**Bloqueado por material do cliente:**

7. Números de prova social → pendência #3
8. Depoimentos → pendência #7
9. Galeria antes/depois → pendência #6
10. CROs dos 3 profissionais → pendência #9

**Decisão de posicionamento:**

11. Nomear um protocolo próprio da RVF

---

## 5. Leitura de conjunto

A nossa landing está **estruturalmente sólida e eticamente superior**, mas
**comercialmente tímida**. A diferença entre ela e a da Aline Rech não está em
qualidade de código ou design — está em **densidade de prova**.

Os concorrentes compensam copy fraca com volume de evidência: números, rostos,
depoimentos, casos. Nós temos copy melhor e nenhuma evidência. Num mercado onde o
paciente abre 4 abas e compara, a página mais honesta perde para a mais convincente se
não tiver o que mostrar.

O caminho não é afrouxar a ética da copy — é **preencher as pendências de material**.
As quatro maiores lacunas (números, depoimentos, casos, equipe) dependem inteiramente
de dados que o cliente precisa fornecer, não de trabalho de desenvolvimento.

**Prioridade de negócio:** cobrar do cliente o material das pendências #3, #6, #7 e #9.
É o que separa a landing atual de uma competitiva.
