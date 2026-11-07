# XP Forge — RPG Lab: Art Bible v0.1

**Status:** direção visual e quatro samples aprovados por Gabriel em 07/11/2026; publicação autorizada no branch art.
**Contrato técnico:** ainda proposto. A aprovação visual não define dimensões finais, motor, FPS, quantidade de slots, eventos ou colisões.
**Referência narrativa:** quest_luz_caminho — A Luz do Caminho.

## Direção visual

**Conceito:** o cuidado material mantém a comunidade viva. A vila transmite trabalho, abrigo e familiaridade; a mata oferece exploração e risco local; o lampião restaurado torna visível o resultado da ajuda.

- **Perspectiva candidata:** top-down em três quartos, projeção ortográfica, chão e fachadas visíveis; sem grade isométrica em losangos. Os samples exploram essa linguagem; não constituem câmera calibrada.
- **Linguagem:** pixel art com agrupamentos de cor deliberados, silhuetas expressivas, volume por luz e sombra, contornos seletivos. A resolução das imagens de apresentação não define a resolução dos sprites.
- **Arquitetura:** bases de pedra, madeira castanha, reboco creme, telhas de barro; volumes modestos com telhados e chaminés distintos. Nenhuma construção decorativa autoriza comércio ou novo NPC.
- **Terreno:** trilha de terra ocre com margens irregulares; grama em massas, variações controladas e transições naturais. Centro de circulação limpo; maior densidade de detalhes nas bordas.
- **Vegetação:** freixos estilizados e folhagem verde, raízes, arbustos e vegetação rasteira; copas em massas legíveis. A diversidade será principalmente de forma, altura e valor.
- **Iluminação:** luz suave do alto à esquerda, sombras azul-ardósia e contato consistente. Bruma discreta na periferia, sem encobrir objetos ou percursos. Luz âmbar reservada ao fogo e ao lampião restaurado.
- **Hierarquia:** ator e objeto interativo se destacam do chão; decoração recua. Erva-cinza se distingue por folhas prateadas serrilhadas; minério por veios ferruginosos angulosos. Evitar depender somente de cor ou brilho.
- **Originalidade:** referências de atmosfera e legibilidade não transferem mapas, silhuetas distintivas, símbolos, personagens ou assets de outras franquias.

### Paleta de trabalho — proposta, não paleta indexada final

| Função | Cor candidata | Uso |
| --- | --- | --- |
| Sombra profunda | `#252C38` | Contato e separação pontual |
| Ardósia | `#596579` | Sombras frias, ferro |
| Madeira | `#694735` | Vigas, armações, ferramentas |
| Telha | `#B85C3D` | Coberturas |
| Terra | `#B88D58` | Caminhos |
| Reboco/linho | `#E7D2AB` | Fachadas e tecidos claros |
| Verde escuro | `#344C37` | Copas e sombra vegetal |
| Verde médio | `#71824B` | Vegetação exposta |
| Cinza vegetal | `#B2BDB0` | Erva-cinza |
| Âmbar | `#E1AE51` | Lampião e seleção |
| Azul-petróleo | `#48666D` | Exemplo do protagonista |

Os códigos orientam a próxima revisão; não são uma medição das imagens geradas. A paleta final requer testes de contraste e leitura no tamanho de jogo.

## Espaço, escala e camadas

Brumaflor deve se organizar em torno de uma praça irregular, com a oficina num lado e o canteiro de Iria no outro. Mara ocupa a circulação próxima à saída. A trilha conduz a uma curva reconhecível com o único lampião da missão, e depois à borda da mata. A clareira permite contornar obstáculos nas diagonais; minério e erva ficam fora da faixa principal de passagem. A área do javali oferece espaço de leitura e reposicionamento, sem definir alcances ou hitboxes.

O lampião visto nos dois samples é uma referência ao MESMO ponto `loc_lampiao_freixo`; não são dois objetos exigidos pela narrativa. A conexão espacial exata entre os enquadramentos precisa ser resolvida no mapa de Gameplay. Os quadros de antes/depois na mata são comparação de arte e não duplicação do objeto no mundo.

| Decisão | Candidato para teste | Condição de aceite |
| --- | --- | --- |
| Grid | Tiles de 32 × 32 px | Validar colisão diagonal, transições, composição e custo de mapa |
| Personagem, opção A | Canvas de 48 × 64 px | Comparar detalhe, leitura, custo de animação e densidade da vila |
| Personagem, opção B | Canvas de 32 × 48 px | Comparar legibilidade de rostos, ferramentas e silhuetas |
| Proporção | Aproximadamente quatro cabeças no sprite de referência | Reavaliar nas duas opções; não redimensionar samples para declarar sprite final |
| Câmera | Ortográfica, três quartos | Testar sobreposição de fachadas/copas e visibilidade dos pés |
| Ampliação | Fatores inteiros, amostragem nearest-neighbor | Verificar nitidez no viewport escolhido |
| Colisão | Volume funcional definido por Gameplay | Não deduzir colisão pelo tamanho do desenho |
| Pivô visual | Referência de contato no chão | Fixar coordenadas somente com escala e importador aprovados |

Nenhum valor desta tabela está fixado como contrato. A recomendação inicial é comparar A e B com a mesma pequena composição de chão, árvore, porta e lampião. Não há engine ou equipe externa contatada nesta execução; a aprovação técnica permanece pendente.

### Camadas propostas

1. Solo base e transições.
2. Detalhes baixos sem obstrução.
3. Bases de construções, troncos e objetos.
4. Atores e volumes ordenados pela referência no chão.
5. Copas/telhados com tratamento de oclusão a acordar.
6. Efeitos de estado/luz, sem comprometer a leitura.
7. Interface em espaço de tela.

Essa ordem é conceitual. Sorting, recorte de telhados, sombras e colisões dependem do motor; a Arte não implementa automaticamente esses sistemas.

## Personagens e criatura

| Entidade | Silhueta e roupa | Paleta/identificador | Animações previstas para estudo |
| --- | --- | --- | --- |
| Mara — `npc_mara` | Adulta; capa curta gasta sobre roupa reforçada; postura resoluta | Ocre e marrom, cabelo preso, corda/chaveiro | Idle e reação de conversa; locomoção somente se Gameplay necessitar |
| Dario — `npc_dario` | Adulto; tronco amplo, avental de trabalho com fuligem, ferramentas simples | Azul-ardósia e couro escuro; avental retangular | Idle, conversa e gesto de trabalho se utilizado; não pressupõe crafting automático do NPC |
| Iria — `npc_iria` | Adulta; roupas de fibras claras manchadas de vegetais, cesto | Linho, verde-sálvia, trança e cesto arredondado | Idle e conversa; gesto de cuidado do canteiro opcional |
| Protagonista — sem ID narrativo | Exemplo de viajante em túnica simples; identidade não fixada | Azul-petróleo, marrom, botas práticas | Idle, caminhada, ataque, defesa, dano e derrota conforme sistema |
| Javali — `enemy_javali_freixo` | Corpo baixo, dorso eriçado, presas curtas, ameaça territorial | Marrom escuro com focinho e presas contrastantes | Idle/alerta, movimento, ataque, dano e derrota sem gore |

As aparências propostas para cabelo e fisionomia são estudos, não acréscimos à história. O protagonista mostrado não fixa gênero, raça, classe, origem ou personalização. Os retratos são estudos opcionais; não obrigam a implementação de retratos no diálogo.

**Oito direções:** movimento do jogador exige N, NE, E, SE, S, SO, O e NO. A proposta de melhor consistência é produzir vistas dedicadas. Espelhamento só pode ser aceito após demonstrar que mantém luz, roupa, objetos e ação corretos; não basta um sprite frontal. Não presumir arma, escudo ou animação de classe para representar Q/G. Quantidade de quadros, duração e direção de ataque aguardam Gameplay.

O javali deve ter orientação compatível com seu movimento e ataque; o conjunto exato de vistas depende da lógica aprovada. O estado de derrota não declara automaticamente a fonte esfolável. A apresentação de esfolamento será não gráfica, sem órgãos ou sangue; sinal de elegibilidade e término de coleta dependem da regra aprovada.

## Referências aprovadas

| Referência | Arquivo |
| --- | --- |
| Vila Brumaflor, revisão 2 | [01_brumaflor_v2.png](../../concept-art/first-quest/01_brumaflor_v2.png) |
| Mata do Freixo, revisão 2 | [02_mata_freixo_v2.png](../../concept-art/first-quest/02_mata_freixo_v2.png) |
| Personagens, revisão 1 | [03_personagens_v1.png](../../concept-art/first-quest/03_personagens_v1.png) |
| Interface, revisão 2 | [04_interface_v2.png](../../concept-art/first-quest/04_interface_v2.png) |

As imagens são referências aprovadas de aparência, sem spritesheets, oito direções exportadas, tiles repetíveis ou atlas de runtime. A interface mostra quantidade de slots apenas ilustrativa. O avatar de inventário tem proporção de apresentação diferente do sprite; padronizar a adaptação com Gameplay. Não recortar a cena inteira como fundo com colisões artificiais para declarar integração concluída.

Para a produção final, usar o protagonista da prancha como referência única: túnica simples, sem identidade fixa. O acessório visível no viajante da vila não cria item equipável. O lampião mostrado em vila/mata representa o mesmo ponto narrativo. A versão técnica do suporte deve ser unificada antes da exportação.

## Pipeline

Conceito aprovado → produção artística específica de cada asset → limpeza de pixels e revisão → exportação com metadados → teste no motor. Ferramentas procedurais podem organizar/compor camadas e variações; não substituir a arte por formas simplificadas. PixiJS 8 depende da escolha técnica de Gameplay.

Veja [ASSET_MANIFEST.md](ASSET_MANIFEST.md), [INTEGRATION_NOTES.md](INTEGRATION_NOTES.md) e [ANTIGRAVITY_HANDOFF.md](ANTIGRAVITY_HANDOFF.md).
