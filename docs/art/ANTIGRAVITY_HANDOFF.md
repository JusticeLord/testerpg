# Prompt de implementação — Antigravity

Atue como responsável por Gameplay e integração do protótipo interno **XP Forge — RPG Lab**, no repositório:
https://github.com/JusticeLord/testerpg

Implemente uma versão jogável e verificável da questline **A Luz do Caminho**, respeitando a narrativa e a direção visual aprovadas. Comece pela inspeção do repositório e avance com trabalho concreto; não entregue somente um plano.

## 1. Branches, preparação e fontes

- Faça fetch e inspecione mudanças locais antes de trocar de branch. Preserve trabalho existente; não use reset destrutivo.
- Trabalhe no branch `feat`. Se for necessário isolar trabalho, use uma branch de implementação derivada de `origin/feat` e registre isso.
- Não altere nem faça push para `main`, `narrative` ou `art`; não execute merge geral desses branches.
- Leia e siga eventuais AGENTS.md reais do checkout.
- Leia em `origin/main`: `docs/PROJECT_BRIEF.md` e `docs/INTEGRATION_RULES.md`.
- Leia em `origin/narrative`: `first-quest/docs/narrative/NARRATIVE_BIBLE.md`, `CHARACTERS.md`, `QUESTS.md`, `DATA_SCHEMA.md`; e `first-quest/data/narrative/dialogues.json`, `quests.json`.
- Leia em `origin/art`: `docs/art/ART_BIBLE.md`, `ASSET_MANIFEST.md`, `INTEGRATION_NOTES.md`, `AUDIT_AND_PLAN.md`.
- Abra e inspecione os quatro PNGs de `origin/art:concept-art/first-quest/`: `01_brumaflor_v2.png`, `02_mata_freixo_v2.png`, `03_personagens_v1.png`, `04_interface_v2.png`. Confira `manifest.json`.

Esses arquivos estão em branches distintos: não presuma presença no diretório atual. Traga seletivamente para a branch de implementação os documentos, dados e referências necessários, sem modificar seus originais. Registre as revisões e os caminhos em `docs/gameplay/SOURCE_REVISIONS.md`. Preserve o prefixo `first-quest/data/narrative/` para o loader inicial, documentando a decisão; não mantenha duas cópias divergentes.

Na auditoria de 07/11/2026, `feat` continha apenas README.md. Verifique o estado atual e não invente uma engine ou implementação preexistente. Se ainda estiver vazio, proponha uma base web em TypeScript, Vite e PixiJS 8, verificando documentação oficial das APIs escolhidas. Não substitua uma stack funcional já existente sem necessidade.

## 2. O que foi aprovado e o que continua aberto

Gabriel aprovou a direção visual e os quatro conceitos. Eles são o padrão artístico a perseguir. **Não são assets finais:** faltam tiles repetíveis, spritesheets, oito direções, animações, pivôs e atlas. Não trate os caminhos planejados do catálogo como arquivos existentes.

Resolução, escala, grid, câmera, quantidade/tipos de slots e contrato de eventos continuam propostas. Prepare `docs/gameplay/TECHNICAL_CONTRACT.md` distinguindo requisitos, candidatos e pendências. Use uma prova local reversível e parametrizada para comparar as opções de escala propostas pela Arte; apresente-a para validação antes de consolidar dimensões ou iniciar arte em massa. Não trate a simples escrita do contrato como aprovação entre departamentos.

Avance nas partes independentes dessa validação: carregadores, estado de quest, validação de IDs, inventário/coleta/crafting e uma prova de integração. Se faltar asset final, registre a lacuna e mantenha recursos temporários explicitamente marcados como diagnóstico. Não apresente um piloto com formas procedurais simplificadas como acabamento aprovado.

## 3. Direção artística a preservar

Pixel art original de fantasia medieval acolhedora, top-down em três quartos, chão e fachadas visíveis, madeira castanha, reboco creme, telhas de barro, vegetação verde, sombras frias e luz âmbar. Recursos distinguíveis pela forma e contraste, sem depender só da cor.

Construa Vila Brumaflor, oficina de Dario, canteiro de Iria, praça, Trilha do Freixo e borda da mata como um espaço conectado. O lampião visto nos dois conceitos é o mesmo alvo narrativo. Preserve a identidade de Mara, Dario e Iria e a neutralidade do protagonista. Não copie assets de Warcraft/MU nem adicione lojas, classes, facções, regiões ou NPCs relevantes.

Não use o cenário inteiro como imagem de fundo com colisões artificiais para declarar o mapa concluído. Não recorte personagens das cenas e suponha que isso fornece todas as animações. Use o sprite-base aprovado como referência única e organize recursos visuais separadamente da lógica.

## 4. Requisitos funcionais

- Movimento em oito direções com diagonais normalizadas e colisões coerentes. WASD é candidato padrão; registre a escolha. Direções e eventual espelhamento precisam ser documentados.
- E interage uma vez por pressionamento; Q ataca; G defende; I abre/fecha o inventário. Defina o foco de janelas para impedir ataques e interações acidentais.
- Inventário com avatar central, dois grupos laterais de equipamentos e itens abaixo. Quantidades/tipos de slots no conceito são ilustrativos; separe configuração de apresentação. Não invente atributos ou equipamento obrigatório.
- Carregue os diálogos e a quest a partir dos JSONs, preservando texto e IDs. Implemente/adapte o formato proposto explicitamente: ele não é uma API já pronta.
- Registre os três NPCs e as entidades externas aceitas por Gameplay, preservando os IDs narrativos. Não use caminhos de imagem como ID de entidade.
- Execute a sequência: Mara → Dario → Iria → borda da mata → combate e três coletas em ordem livre → fabricar presilha → entregar a Mara → lampião restaurado e encerramento.
- Picareta para minério, pá para erva-cinza e faca para couro; bloqueie coleta sem ferramenta e defina um modo de disponibilizá-las sem nova loja/NPC.
- Javali territorial, combate sem gore. A fonte de couro no javali derrotado é uma proposta a validar/documentar. Defesa é teste funcional, não condição que possa bloquear a quest após a derrota do javali.
- Receita proposta de Ferreiro: 2 `resource_minerio_ferro` → 1 `item_presilha_trilha`; não acrescente refino oculto.
- Entrega final: uma presilha, um couro cru e uma erva-cinza. Valide e consuma atomicamente, sem perda parcial ou conclusão falsa.
- `reward_lampiao_aceso` muda o mesmo `loc_lampiao_freixo` ao estado `aceso`, uma única vez. Não conceda moedas, XP ou equipamento inventados.
- Preserve uma única escolha de tom no diálogo inicial, com reconvergência. Os outcomes automáticos de retorno não são uma segunda escolha.
- O brief também exige demonstrações das seis profissões. As outras cinco receitas não têm outputs aprovados: registre as propostas mínimas e a necessidade de validação, sem inserir nova história ou apresentar conteúdo inventado como aprovado.

## 5. Entregas e verificação

Entregue código organizado, configuração, README com instalação/execução/build, contrato técnico, registro das fontes e relatório do que funciona e do que depende de arte/validação.

Verifique com testes relevantes e execução real: diagonais; interação por pressionamento; foco de UI; referências dos JSONs; escolha reconvergente; coleta bloqueada sem ferramenta; quantidades suficientes; crafting sem material; retorno incompleto; inventário cheio sem perda silenciosa; entrega atômica; encerramento e recompensa sem duplicação. Teste também troca visual do lampião e a possibilidade de terminar a quest.

Execute typecheck/build e teste o protótipo no navegador. Registre evidências visuais e falhas restantes. Diferencie **sistemas funcionais**, **arte provisória** e **arte final integrada**. Não declare fidelidade visual nem conclusão total sem comprovação.

Ao final, apresente arquivos alterados, comandos de validação, resultados, pendências e uma versão local executável para avaliação. Não faça push, merge ou publicação sem autorização específica de Gabriel para a implementação.
