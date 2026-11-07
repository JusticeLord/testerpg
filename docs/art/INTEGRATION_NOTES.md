# XP Forge — RPG Lab: Integração Arte/Gameplay

**Estado:** pendências técnicas explícitas; nenhum contrato de motor validado nesta entrega.

| Tema | Evidência atual | Validação necessária antes de produção final |
| --- | --- | --- |
| Motor | feat não tem implementação | Motor/importador; PixiJS 8 só se compatível |
| Escala | Brief deixa câmera/grid em aberto | Escolher resolução, viewport, zoom, grid e proporções |
| Movimento | Oito direções aprovadas; WASD proposto | Vistas, direções de ataque, animações e espelhamento |
| Combate | Q ataca e G defende | Ações visuais, duração, feedback, colisão; sem presumir armas/escudo |
| Interação | E obrigatório | Alcance, prioridade, indicador e oclusão de objetos |
| Inventário | Avatar central, dois grupos laterais, inventário abaixo | Tipos/capacidade de slots, pilhas, estados e foco |
| Recursos | Três ferramentas/categorias; IDs propostos | Registro de fontes, elegibilidade, consumo e exaustão; sem assumir respawn |
| Couro | Javali derrotado é fonte proposta | Aceitar/rejeitar a fonte e estados de coleta |
| Receita obrigatória | Dois minérios → uma presilha, proposta | Confirmar simplificação sem refino oculto e estação |
| Outras profissões | Cinco receitas complementares ainda sem outputs | Fornecer lista para estimar arte e ícones |
| Lampião | Recompensa world_state, alvo loc_lampiao_freixo, estado aceso | Troca de sprite/luz após entrega validada; persistência |
| Caminhos | first-quest/ permanece no pacote | Definir promoção canônica ou prefixo do loader |

A Bíblia usa uma formulação plural para lampiões na premissa, enquanto o fluxo e a recompensa identificam um único alvo de reparo. Para esta entrega, representa-se somente o lampião funcional da quest, sem alterar o texto ou criar objetivos adicionais. A referência a haste quebrada e a fala sobre presilha rompida será resolvida visualmente como suporte danificado, presilha quebrada e tira rompida; confirmação de Narrative/coordenação necessária antes do objeto final.

Não há ausência documental bloqueando os conceitos. Há ausência de contrato técnico bloqueando a declaração de assets finais como integráveis. Não foi afirmado contato ou aprovação de Gameplay que não tenha ocorrido.

## Consumo entre branches

- main: ler docs/PROJECT_BRIEF.md e docs/INTEGRATION_RULES.md.
- narrative: ler os seis arquivos em first-quest/docs/narrative/ e first-quest/data/narrative/.
- art: este pacote; não possui motor nem assets finais.
- feat: destino de trabalho de Gameplay. Na auditoria, continha somente README.md.

Não assumir que arquivos de outro branch estão presentes no checkout atual. Para a implementação, buscar refs remotas e importar seletivamente cópias de leitura dos documentos, dados e conceitos necessários para feat, preservando os arquivos de origem. Registrar SHAs em docs/gameplay/SOURCE_REVISIONS.md. Não fazer merge geral, reescrever narrative/art ou publicar em main. Se main e narrative divergirem, registrar a diferença e consultar a coordenação antes de alterar conteúdo.

Para esta passagem, recomenda-se manter first-quest/data/narrative/ como caminho de entrada do loader até que uma promoção seja acordada. Documentar essa escolha; não criar cópias divergentes em data/narrative/.

## Aceite técnico a preparar pelo Gameplay

Documentar em docs/gameplay/TECHNICAL_CONTRACT.md: motor e renderer, câmera, grid, viewport/zoom, pivôs, animações/direções, colisões e sorting, formato de assets, foco de UI, slots, eventos da quest, receitas e coleta. Distinguir requisito aprovado, candidato em prova e pendência. A documentação de uma hipótese sozinha não a transforma em aprovação entre departamentos.

É possível avançar com uma prova local reversível, parametrizada, das opções de escala. Antes da produção em massa de arte final, apresentar a prova para validação. Não reduzir sprites artísticos a blocos procedurais para declarar a fidelidade visual entregue. Se faltarem assets finais, manter o loader e o catálogo preparados e relatar precisamente a lacuna.

## Validação do pacote publicado

Os quatro PNGs devem abrir, ter assinatura PNG válida, dimensões registradas e SHA-256 coincidente. O catálogo distingue arquivos existentes e planejados. Esta publicação não comprova oito direções, colisões, performance ou integração executada.
