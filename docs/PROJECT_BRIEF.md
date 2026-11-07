# XP Forge — RPG Lab
## PROJECT BRIEF

**Status:** especificação funcional inicial aprovada pelo responsável do projeto; detalhes técnicos pendentes de validação pelos departamentos.
**Branch de referência:** `main`
**Natureza:** protótipo técnico interno; não é um jogo completo nem um produto comercial.

## 1. Visão

Desenvolver um protótipo de RPG **2D em pixel art**, ambientado em fantasia medieval, com inspiração na sensação de exploração e na legibilidade de **World of Warcraft**. A experiência deve ser **original**: não reutilizar nomes, personagens, mapas, histórias, ícones, músicas nem outros elementos protegidos de Warcraft/MU.

O objetivo é testar, num mesmo espaço jogável, movimentação, exploração, interação, diálogos, combate, inventário/equipamentos, coleta de recursos, ofícios/crafting e progressão narrativa. O funcionamento integrado e o encerramento da narrativa são mais importantes que a quantidade de conteúdo.

## 2. Espaço e direção artística

- **Área jogável:** um único vilarejo medieval original, maior e mais diversificado que a referência de escala de Goldshire, e seus arredores imediatos (caminhos, borda da floresta e áreas de recursos/inimigos).
- **Inspiração visual:** ambiente acolhedor, construções de fantasia medieval com silhuetas reconhecíveis, trilhas, iluminação e cores que facilitem a exploração. Usar pixel art 2D original e consistente com o ponto de vista adotado pelo departamento de Arte.
- **Referência de atmosfera:** a sensação de um povoado inicial de World of Warcraft, **sem reproduzir Goldshire** ou seus elementos distintivos.
- **Limite espacial:** nenhuma segunda cidade, região distante, dungeon extensa ou mundo aberto.
- **Nome do povoado e topônimos:** a definir pelo departamento Narrativo, com aprovação antes da consolidação dos assets.
- **Escala exata do mapa, resolução, tamanho de tiles, câmera e camadas:** decisões de Arte/Gameplay a documentar antes da implementação final.

## 3. Controles e interação — requisitos de experiência

| Entrada | Ação | Comportamento esperado |
| --- | --- | --- |
| WASD (proposta padrão, a confirmar) | Mover | Suportar oito direções, inclusive diagonais, com velocidade normalizada. |
| E | Interagir | Acionar NPC, objeto, recurso ou ponto de crafting elegível em alcance. |
| Q | Atacar | Executar a ação de ataque do sistema de combate. |
| G | Defender | Executar a ação de defesa do sistema de combate. |
| I | Inventário | Abrir/fechar a interface de inventário e equipamentos. |

**Decisão confirmada:** movimento em oito direções e teclas `E`, `Q`, `G`, `I` com as funções acima. **Proposta a validar:** uso de WASD; direção do ataque, cooldown, dano, defesa, alcance, colisão, tratamento de teclas com janelas abertas e suporte a controles alternativos são regras de Gameplay, não da Narrativa.

Interações devem apresentar um indicativo discreto quando disponíveis e não disparar duas vezes pelo mesmo pressionamento. Enquanto um diálogo ou inventário exigir foco, Gameplay define e documenta quais ações do mundo ficam bloqueadas.

## 4. Conversas e apresentação narrativa

- Diálogos **breves, naturais e situados**, como conversas entre pessoas com objetivos e personalidades próprias; evitar explicações expositivas artificiais, falas genéricas e repetição das instruções da interface.
- Três NPCs narrativamente relevantes na primeira missão/questline; outros figurantes só se houver necessidade técnica e aprovação.
- O jogador deve compreender o problema, a razão para sair do vilarejo, o que fazer e por que voltar.
- No máximo **uma escolha narrativa simples**, sem ramificações longas ou finais alternativos extensos.
- Texto, gatilhos e condições devem estar em dados separados da lógica de interface e gameplay.

## 5. Inventário e equipamentos

A tecla `I` abre um painel inspirado **na organização funcional** de inventário/equipamentos de MU, sem copiar sua arte: **personagem centralizado**, quadro/área do avatar em destaque, slots de equipamentos distribuídos em **dois grupos laterais** (aproximadamente metade de cada lado) e **slots de inventário abaixo** desse quadro. O jogador deve distinguir claramente itens carregados, itens equipados e quantidades.

O departamento de Gameplay define a estrutura e o comportamento dos slots, equipar/desequipar, empilhamento, capacidade, seleção e persistência. O departamento de Arte define a apresentação original, proporções e estados visuais. Número e tipos exatos de slots, mochila, drag-and-drop e sistema de atributos **não estão especificados**; não pressupor sua existência nas quests.

## 6. Coleta de recursos

| Recurso | Ferramenta exigida | Resultado funcional |
| --- | --- | --- |
| Minérios | Picareta | Extrair minério de um depósito elegível. |
| Ervas | Pá | Coletar ervas de um ponto elegível. |
| Couro | Faca de esfolamento | Obter couro de fonte elegível após a condição definida em Gameplay. |

As três categorias, suas ferramentas e a verificação de ferramenta são requisitos. Fonte específica de couro (por exemplo, criatura derrotada), consumo/desgaste de ferramentas, quantidade por nó, respawn e raridade ficam pendentes de definição técnica. Todos os recursos e ferramentas terão IDs compartilhados entre Narrative/Gameplay/Arte.

## 7. Profissões e crafting

| Base de material | Profissões |
| --- | --- |
| Mineração | Ferreiro, Engenheiro, Joalheiro |
| Ervas | Escriba, Alquimista |
| Esfolamento/coleta de couro | Coureiro |

O protótipo deve permitir **verificar o funcionamento de cada uma das seis profissões**, com pelo menos uma receita demonstrativa viável por profissão, sujeita à validação das mecânicas e do esforço de implementação. Nenhuma árvore de progressão, níveis de profissão, mercado, economia complexa ou sistema extenso de equipamentos é necessária. As receitas devem usar materiais reconhecidos pelo inventário e produzir saídas verificáveis.

A questline poderá solicitar diretamente **um crafting obrigatório** para demonstrar o fluxo narrativo completo; as demais receitas podem integrar uma lista de testes funcionais, sem inflar a história.

## 8. Estrutura narrativa de teste

- **Escopo:** uma missão principal curta ou uma questline curta e linear, com início, desenvolvimento e conclusão.
- **Conteúdo:** três NPCs relevantes; motivo claro para explorar a floresta/arredores; encontro(s) de combate; coleta de materiais; fabricação de pelo menos um item; retorno ao povoado e encerramento.
- **Escolhas:** no máximo uma escolha simples, sem comprometer a possibilidade de concluir os testes.
- **Integração:** objetivos e condições devem ser realizáveis com sistemas aprovados; dependências não implementadas precisam ser sinalizadas, nunca presumidas.
- **Duração-alvo:** experiência compacta; minutagem exata será definida após playtest.

A Narrativa define personagens, contexto, objetivos, falas e relações causais. Gameplay define eventos, estados, validação e recompensas técnicas. Arte define cenários, sprites, retratos e elementos de interface, respeitando os IDs e necessidades do conteúdo.

## 9. Fora do escopo

Não desenvolver mundo aberto, facções, classes adicionais, lore enciclopédica, múltiplas cidades, grandes ramificações, cadeias extensas de missões, cinematics, multiplayer, economia de produção ou estrutura comercial. Não adicionar sistemas apenas para justificar uma cena.

## 10. Critérios de conclusão

O protótipo será considerado concluído **quando a narrativa curta puder ser terminada do começo ao fim e os testes previstos forem executados com sucesso**. Checklist mínimo:

1. Movimento em oito direções, inclusive diagonais.
2. `E` permite interagir com NPCs e elementos pertinentes.
3. Conversas com os três NPCs são exibidas corretamente e permitem avançar nos objetivos.
4. `Q` realiza ataque e `G` realiza defesa durante um encontro válido.
5. `I` abre/fecha o inventário; avatar central, equipamentos nas laterais e itens abaixo.
6. Picareta/minério, pá/ervas e faca/couro são testados, inclusive bloqueio sem ferramenta necessária.
7. Inventário recebe/consome materiais conforme as operações; seis profissões possuem receitas de demonstração testáveis.
8. Pelo menos um item é criado como requisito narrativo; a questline registra objetivos e encerra sem bloqueios.
9. Estados de conclusão e recompensa são exibidos/registrados conforme regras aprovadas.
10. O fluxo foi exercitado em playtest; falhas bloqueadoras corrigidas e critérios de aceitação registrados.

## 11. Decisões em aberto (não autorizar suposições)

- Perspectiva/câmera e grade de tiles; dimensões e densidade do vilarejo.
- Teclas exatas de movimentação (WASD é proposta), suporte adicional a setas e remapeamento.
- Modelo de combate: alcance, defesa, inimigos, valores e efeitos.
- Tipos/quantidades de slots, pilhas, persistência e interação com equipamentos.
- Regras de extração/esfolamento, origem do couro e comportamento dos nós.
- Receitas, estações e outputs concretos das seis profissões.
- Contrato técnico de eventos e estados da questline e versão efetivamente implementada.

**Regra de ouro:** uma exigência narrativa só vira dado ou condição de conclusão depois de existir (ou ser formalmente aceita) a capacidade correspondente em Gameplay.
