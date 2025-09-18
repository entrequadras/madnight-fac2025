// maps.js - Sistema de mapas (Revisão Alpha-03)

(function() {
    'use strict';
    
    // Função auxiliar para gerar tiles
    function generateTiles(mapWidth, mapHeight, tileSize, tileTypes) {
        const tiles = [];
        
        for (let y = 0; y < mapHeight; y += tileSize) {
            for (let x = 0; x < mapWidth; x += tileSize) {
                const randomType = tileTypes[Math.floor(Math.random() * tileTypes.length)];
                tiles.push({
                    type: randomType,
                    x: x,
                    y: y
                });
            }
        }
        
        return tiles;
    }
    
    // Definição de todos os mapas
    const mapsList = [
        // Mapa 0 - Maconhão
        {
            name: "Maconhão",
            displayName: "Maconhão",
            subtitle: "Tutorial de movimento",
            width: 1920,
            height: 1080,
            enemies: [],
            tiles: null, // Será gerado
            trees: [
                // Árvores do mapa original
                {type: 'arvore001', x: 300, y: 150},
                {type: 'arvore002', x: 1400, y: 120},
                {type: 'arvore003', x: 150, y: 700},
                {type: 'arvore004', x: 1600, y: 750},
                {type: 'arvorebloco001', x: 700, y: 50},
                {type: 'arvore002', x: 450, y: 850},
                {type: 'arvore001', x: 1200, y: 880},
                {type: 'arvore003', x: 950, y: 100},
                {type: 'arvore004', x: 100, y: 400},
                {type: 'arvore001', x: 200, y: 180},
                {type: 'arvore002', x: 1580, y: 130},
                {type: 'arvore003', x: 280, y: 780},
                {type: 'arvore004', x: 1480, y: 830},
                {type: 'arvore001', x: 1550, y: 850},
                
                // Barreira de árvores no lado esquerdo
                {type: 'arvore002', x: -80, y: -30},
                {type: 'arvore001', x: -60, y: 120},
                {type: 'arvore003', x: -90, y: 270},
                {type: 'arvore004', x: -70, y: 400},
                {type: 'arvorebloco001', x: -120, y: 550},
                {type: 'arvore002', x: -85, y: 730},
                {type: 'arvore001', x: -65, y: 880},
                {type: 'arvore003', x: -95, y: 1000},
                
                // Barreira de árvores no lado direito (com buraco para passagem)
                {type: 'arvore001', x: 1820, y: -50},
                {type: 'arvore002', x: 1850, y: 100},
                {type: 'arvore003', x: 1830, y: 250},
                {type: 'arvore004', x: 1860, y: 380},
                // BURACO - sem árvores entre Y: 490-650
                {type: 'arvore001', x: 1840, y: 720},
                {type: 'arvore002', x: 1810, y: 850},
                {type: 'arvore003', x: 1870, y: 970},
                {type: 'arvore004', x: 1820, y: 1090}
            ],
            streetLights: [
                {type: 'poste000', x: 960, y: 780, rotation: 0, lightRadius: 100, id: 'post3'},
                {type: 'poste001', x: 1400, y: 540, rotation: 0, lightRadius: 100, id: 'post4'},
                {type: 'poste000', x: 650, y: 60, rotation: 0, lightRadius: 100, id: 'post5'}
            ],
            objects: [
                {type: 'caixadeluz', x: 1750, y: 560},
                {type: 'garrafaquebrada01', x: 655, y: 240},
                {type: 'cadeiradepraia01', x: 210, y: 1000},
                {type: 'garrafaquebrada02', x: 1520, y: 1015}
            ],
            walls: [
                {x: 0, y: 0, w: 1920, h: 20, invisible: true},
                {x: 0, y: 1060, w: 1920, h: 20, invisible: true},
                {x: 0, y: 20, w: 20, h: 1040, invisible: true},
                {x: 1900, y: 20, w: 20, h: 1040, invisible: true}
            ],
            lights: [],
            shadows: [],
            playerStart: {x: 150, y: 300},
            playerStartEscape: {x: 1700, y: 540},
            exit: {x: 1800, y: 490, w: 80, h: 100},
            direction: 'right'
        },
        
        // Mapa 1 - Eixão da Morte
        {
            name: "Eixão da Morte",
            displayName: "Eixão da Morte",
            subtitle: "Túnel sob as pistas",
            width: 3000,
            height: 868,
            enemies: [],
            trees: [
                // Linha de árvores na parte inferior (530x1500 até 1130x1500)
                {type: 'arvorebloco001', x: 530, y: 1420},
                {type: 'arvore001', x: 884, y: 1450},
                {type: 'arvore003', x: 980, y: 1440},
                {type: 'arvore002', x: 1050, y: 1455},
                
                // Duas árvores no topo (1180x50)
                {type: 'arvore004', x: 1180, y: 50},
                {type: 'arvore001', x: 1280, y: 45}
            ],
            streetLights: [],
            objects: [],
            walls: [
                // Túnel em formato U
                {x: 415, y: 80, w: 40, h: 182, invisible: true},
                {x: 380, y: 632, w: 40, h: 188, invisible: true},
                {x: 0, y: 222, w: 335, h: 340, invisible: true},
                {x: 445, y: 80, w: 2335, h: 412, invisible: true},
                {x: 0, y: 562, w: 3000, h: 226, invisible: true},
                {x: 2865, y: 222, w: 135, h: 340, invisible: true},
                {x: 2745, y: 80, w: 40, h: 182, invisible: true},
                {x: 2780, y: 632, w: 40, h: 188, invisible: true},
                
                // Bordas do mapa
                {x: 0, y: 0, w: 3000, h: 80, invisible: true},
                {x: 0, y: 788, w: 3000, h: 80, invisible: true},
                {x: 0, y: 0, w: 20, h: 868, invisible: true},
                {x: 2980, y: 0, w: 20, h: 868, invisible: true}
            ],
            lights: [
                {x: 448, y: 185, radius: 100, id: 'eixao1'},
                {x: 690, y: 165, radius: 100, id: 'eixao2'},
                {x: 605, y: 348, radius: 100, id: 'eixao3'},
                {x: 647, y: 611, radius: 100, id: 'eixao4'},
                {x: 923, y: 245, radius: 100, id: 'eixao5'},
                {x: 1106, y: 569, radius: 100, id: 'eixao6'},
                {x: 1120, y: 245, radius: 100, id: 'eixao7'},
                {x: 2125, y: 584, radius: 100, id: 'eixao8'},
                {x: 2322, y: 581, radius: 100, id: 'eixao9'},
                {x: 2114, y: 249, radius: 100, id: 'eixao10'},
                {x: 2310, y: 245, radius: 100, id: 'eixao11'},
                {x: 2541, y: 171, radius: 100, id: 'eixao12'},
                {x: 2793, y: 197, radius: 100, id: 'eixao13'},
                {x: 2628, y: 350, radius: 100, id: 'eixao14'},
                {x: 2585, y: 102, radius: 100, id: 'eixao15'},
                {x: 2584, y: 605, radius: 100, id: 'eixao16'},
                {x: 2669, y: 828, radius: 100, id: 'eixao17'},
                {x: 910, y: 574, radius: 100, id: 'eixao18'},
                {x: 563, y: 834, radius: 100, id: 'eixao19'}
            ],
            shadows: [],
            playerStart: {x: 100, y: 100},
            playerStartEscape: {x: 2900, y: 190},
            exit: {x: 2950, y: 80, w: 50, h: 100},
            direction: 'right',
            hasLayers: true
        },

        // Mapa 2 - Fronteira com o Komando Satânico
        {
            name: "Fronteira com o Komando Satânico",
            displayName: "Fronteira com a KS",
            subtitle: "Primeira superquadra",
            width: 1920,
            height: 1610,
            enemies: [],
            escapeEnemies: [],
            tiles: null, // Será gerado
            hasBackground: true,
            backgroundAsset: 'entradaKS01', // PNG com transparência sobre os tiles
            buildings: [
                {
                    type: 'predio0002',
                    x: 1550,
                    y: 665,
                    collisionRects: [
                        {x: 1680, y: 1100, w: 200, h: 60},
                        {x: 1680, y: 1060, w: 220, h: 40},
                        {x: 1710, y: 1020, w: 220, h: 40},
                        {x: 1740, y: 960, w: 200, h: 60}
                    ]
                },
                {
                    type: 'predio0006',
                    x: 0,
                    y: 970,
                    collisionRects: [
                        {x: 40, y: 1280, w: 342, h: 155}
                    ]
                },
                {
                    type: 'predio0003',
                    x: 1300,
                    y: -60,
                    collisionRects: [
                        {x: 1360, y: 280, w: 210, h: 40},
                        {x: 1440, y: 320, w: 190, h: 40},
                        {x: 1490, y: 360, w: 210, h: 40},
                        {x: 1540, y: 400, w: 180, h: 40}
                    ]
                },
                {
                    type: 'predio0008',
                    x: 201,
                    y: -90,
                    collisionRects: [
                        {x: 220, y: 150, w: 350, h: 40},
                        {x: 250, y: 190, w: 300, h: 40},
                        {x: 304, y: 230, w: 160, h: 40},
                        {x: 361, y: 270, w: 160, h: 40}
                    ]
                },
                {
                    type: 'predio0008',
                    x: 550,
                    y: 50,
                    collisionRects: [
                        {x: 540, y: 290, w: 500, h: 40},
                        {x: 640, y: 330, w: 380, h: 40},
                        {x: 690, y: 370, w: 340, h: 40},
                        {x: 770, y: 410, w: 190, h: 40}
                    ]
                }
            ],
          trees: [
        // Árvore central
        {type: 'arvore006', x: 1078, y: 1077},
    
        // Linha de árvores na parte inferior (530x1500 até 1130x1500)
        {type: 'arvore001', x: 680, y: 1430},
        {type: 'arvore003', x: 780, y: 1440},
        {type: 'arvore002', x: 850, y: 1575},
        {type: 'arvore004', x: 960, y: 1425},
        {type: 'arvore001', x: 1060, y: 1445},
        {type: 'arvore003', x: 1150, y: 1630},
    
        // Três árvores no topo
        {type: 'arvore004', x: 1200, y: -10},
        {type: 'arvore003', x: 880, y: -15},
        {type: 'arvore002', x: 1100, y: -45}
        ],
            streetLights: [
                {type: 'poste000', x: 700, y: 355, rotation: 0, lightRadius: 100, id: 'ks_post1'},
                {type: 'poste000', x: 365, y: 220, rotation: 0, lightRadius: 100, id: 'ks_post2'},
                {type: 'poste001', x: 1059, y: 170, rotation: 0, lightRadius: 100, id: 'ks_post3'},
                {type: 'poste001', x: 1317, y: 637, rotation: 0, lightRadius: 100, id: 'ks_post4'},
                {type: 'poste001', x: 1729, y: 1185, rotation: 0, lightRadius: 100, id: 'ks_post5'},
                {type: 'poste001', x: 411, y: 1243, rotation: 0, lightRadius: 100, id: 'ks_post6'}
            ],
            objects: [
                {type: 'parquinho', x: 1394, y: 668, rotation: 0},
                {type: 'banco01', x: 1073, y: 544, rotation: 0}
            ],
            walls: [],
            lights: [
                {x: 360, y: 100, radius: 120, id: 'ks_window1'},
                {x: 1740, y: 290, radius: 120, id: 'ks_window2'}
            ],
            shadows: [],
            playerStart: {x: 1440, y: 1550},
            playerStartEscape: {x: 70, y: 70},
            exit: {x: 70, y: 70, w: 60, h: 60},
            orelhao: {x: 1000, y: 412, w: 40, h: 60},
            direction: 'left'
        },
        
        // Mapa 3 - Na área da KS
{
    name: "Na área da KS",
    displayName: "Na área da KS",
    subtitle: "Vai nas mocó",
    width: 1920,
    height: 3000,
    enemies: [
        {x: 100, y: 424, type: 'morcego'},
        {x: 60, y: 1040, type: 'morcego'},
        {x: 200, y: 1524, type: 'faquinha'},
        {x: 234, y: 1520, type: 'faquinha'},
        {x: 310, y: 1050, type: 'faquinha'}
    ],
    escapeEnemies: [],
    tiles: null, // Será gerado
    hasBackground: true,
    backgroundAsset: 'area_da_ks_chao', // PNG com transparência sobre os tiles
    buildings: [
        {
            type: 'predio0002_vira',
            x: 1150,
            y: 1750,
            collisionRects: [
                {x: 1190, y: 2090, w: 180, h: 50},
                {x: 1240, y: 2140, w: 200, h: 40},
                {x: 1290, y: 2180, w: 200, h: 40},
                {x: 1340, y: 2220, w: 180, h: 50}
            ]
        },
        {
            type: 'predio0005_vira',
            x: 1493,
            y: 1965,
            collisionRects: [
                {x: 1533, y: 2218, w: 200, h: 60},
                {x: 1583, y: 2278, w: 220, h: 40},
                {x: 1683, y: 2398, w: 220, h: 40},
                {x: 1633, y: 2330, w: 220, h: 60}
            ]
        },
        {
            type: 'predio0005_vira',
            x: 1150,
            y: 1019,
            collisionRects: [
                {x: 1184, y: 1365, w: 210, h: 60},
                {x: 1280, y: 1316, w: 360, h: 40},
                {x: 1430, y: 1356, w: 220, h: 40},
                {x: 1368, y: 1440, w: 256, h: 64}
            ]
        },
        {
            type: 'predio0005',
            x: 620,
            y: 645,
            collisionRects: [
                {x: 800, y: 1016, w: 244, h: 60},
                {x: 720, y: 1086, w: 244, h: 40},
                {x: 775, y: 950, w: 260, h: 40},
                {x: 635, y: 950, w: 225, h: 90}
            ]
        },
        {
            type: 'predio0002',
            x: 330,
            y: 1950,
            collisionRects: [
                {x: 439, y: 2303, w: 350, h: 50},
                {x: 465, y: 2343, w: 310, h: 50},
                {x: 480, y: 2390, w: 260, h: 50}
            ]
        },
        {
            type: 'predio0004',
            x: 352,
            y: 1298,
            collisionRects: [
                {x: 592, y: 1638, w: 200, h: 55},
                {x: 492, y: 1693, w: 220, h: 40},
                {x: 442, y: 1733, w: 220, h: 40},
                {x: 430, y: 1783, w: 190, h: 55}
            ]
        },
        {
            type: 'predio0004_vira',
            x: 166,
            y: 230,
            collisionRects: [
                {x: 320, y: 550, w: 330, h: 55},
                {x: 260, y: 605, w: 260, h: 40},
                {x: 336, y: 645, w: 260, h: 40},
                {x: 380, y: 700, w: 190, h: 55}
            ]
        }
    ],
    trees: [
        // Ipês
        {type: 'arvore006', x: 1145, y: 1689},
        {type: 'arvore006', x: 1282, y: 2580},
        {type: 'arvore007', x: 900, y: 1303},
        {type: 'arvore008', x: 1292, y: 920},
        {type: 'arvore007', x: 1421, y: 886},
        {type: 'arvore006', x: 1344, y: 600},
        {type: 'arvore008', x: 1480, y: 420},
        {type: 'arvore007', x: 1675, y: 17},
         {type: 'arvore007', x: 415, y: 29},
    
        // Linha de árvores travando estacionamento
     
        {type: 'arvorebloco001', x: -15, y: 2900},
        {type: 'arvorebloco001', x: 100, y: 2700},
        {type: 'arvorebloco001', x: 1, y: 889},
        {type: 'arvorebloco001', x: 1861, y: 1500},
        {type: 'arvorebloco001', x: 1681, y: 1940},
        {type: 'arvore002', x: 10, y: 649},
        {type: 'arvore004', x: -20, y: 819},
        {type: 'arvore004', x: -35, y: 1010},
        {type: 'arvore001', x: 280, y: 890},
        {type: 'arvore001', x: 5, y: 2590},
        {type: 'arvore003', x: 380, y: 910},
        {type: 'arvore002', x: 250, y: 800},
        {type: 'arvore004', x: 360, y: 789},
        {type: 'arvore004', x: 1440, y: 2333},
        {type: 'arvore004', x: 1550, y: 2400},
        {type: 'arvore004', x: 1410, y: 2310},
        {type: 'arvore001', x: 1470, y: 2369},
        {type: 'arvore001', x: 1500, y: 2488},
        {type: 'arvore001', x: 460, y: 778},
        {type: 'arvore003', x: 500, y: 759},
        {type: 'arvore003', x: 1740, y: 1400},
        {type: 'arvore003', x: 1500, y: 2390},
        {type: 'arvore003', x: 1740, y: 2700},
    
        // Três árvores no topo
        {type: 'arvore004', x: 100, y: -10},
        {type: 'arvore003', x: 180, y: -15},
        {type: 'arvore002', x: 60, y: -35}
        ],
    streetLights: [
            {type: 'poste000', x: 230, y: 750, rotation: 0, lightRadius: 100, id: 'ks_post1'},
            {type: 'poste000', x: 520, y: 950, rotation: 0, lightRadius: 100, id: 'ks_post2'},
            {type: 'poste001', x: 1400, y: 760, rotation: 0, lightRadius: 100, id: 'ks_post3'},
            {type: 'poste001', x: 1400, y: 1500, rotation: 0, lightRadius: 100, id: 'ks_post4'},
            {type: 'poste001', x: 640, y: 1800, rotation: 0, lightRadius: 100, id: 'ks_post5'},
            {type: 'poste001', x: 500, y: 2400, rotation: 0, lightRadius: 100, id: 'ks_post6'},
            {type: 'poste000', x: 1800, y: 150, rotation: 0, lightRadius: 100, id: 'ks_post7'},
            {type: 'poste000', x: 1240, y: 2620, rotation: 0, lightRadius: 100, id: 'ks_post8'},
            {type: 'poste000', x: 180, y: 230, rotation: 0, lightRadius: 100, id: 'ks_post9'}
            ],
    objects: [
    // Objetos de decoração
    {type: 'parquinho', x: 5, y: 1500, rotation: 0},
    {type: 'kitmalhacao', x: 1475, y: 640, rotation: 0},
        
        // Carros estacionados
    {type: 'carrolateral_09', x: 400, y: 1033, rotation: 0},
    {type: 'carrolateral_11', x: 340, y:2480, rotation: 0},
    {type: 'carrolateral_07', x: 307, y: 1847, rotation: 0},
    {type: 'carro002frente', x: 58, y: 2067, rotation: 0},
    {type: 'carrolateral_03', x: 380, y: 1372, rotation: 0},
    {type: 'carro003frente', x: 881, y: 670, rotation: 0},
    {type: 'carro004fundos', x: 664, y: 572, rotation: 0},
    {type: 'carrolateral_07', x: 567, y: 327, rotation: 0}
],
    walls: [],
    powerups: [
    {type: 'm2000power', x: 50, y: 1420, collected: false},
    {type: 'm2000power', x: 1880, y: 2900, collected: false}
],
    lights: [
    {x: 800, y: 1021, radius: 120, id: 'map3_tv1'},
    {x: 1480, y: 1510, radius: 120, id: 'map3_tv2'}
],
    shadows: [],
    playerStart: {x: 1730, y: 2800},
    playerStartEscape: {x: 1220, y: 50},
    exit: {x: 860, y: 10, w: 200, h: 30},
    direction: 'up'
},
        
        // Mapa 4 - Entre Prédios
{
    name: "Entre Prédios",
    displayName: "Entre Prédios",
    subtitle: "Muitas sombras",
    width: 1920,
    height: 3000,
    enemies: [
        {x: 150, y: 10, type: 'morcego'},
        {x: 1800, y: 1290, type: 'morcego'},
        {x: 300, y: 2800, type: 'morcego'},
        {x: 150, y: 1300, type: 'morcego'},
        {x: 1850, y: 10, type: 'faquinha'}
    ],
    escapeEnemies: [
        {x: 660, y: 1540, type: 'janis'},
        {x: 1420, y: 1340, type: 'faquinha'},
        {x: 420, y: 1100, type: 'faquinha'},
        {x: 650, y: 650, type: 'caveirinha'},
        {x: 1800, y: 1100, type: 'faquinha'},
        {x: 1750, y: 1200, type: 'morcego'},
        {x: 1600, y: 1050, type: 'caveirinha'}
    ],
    tiles: null, // Será gerado
    hasBackground: true,
    backgroundAsset: 'mapa_entre_predios', // PNG com transparência sobre os tiles
    buildings: [
    {
        type: 'predio0010',
        x: 1323,
        y: 55,
        collisionRects: [
            {x: 1360, y: 245, w: 415, h: 155}
        ]
    },
    {
        type: 'predio0010',
        x: 1326,
        y: 612,
        collisionRects: [
            {x: 1360, y: 859, w: 415, h: 155}
        ]
    },
    {
        type: 'predio0010',
        x: 1326,
        y: 1724,
        collisionRects: [
            {x: 1360, y: 1901, w: 415, h: 155}
        ]
    },
    {
        type: 'predio0010',
        x: 1320,
        y: 2236,
        collisionRects: [
            {x: 1360, y: 2430, w: 415, h: 155}
        ]
    },
    {
        type: 'predio0011',
        x: 66,
        y: 34,
        collisionRects: [
            {x: 100, y: 300, w: 400, h: 155}
        ]
    },
    {
        type: 'predio0011',
        x: 80,
        y: 608,
        collisionRects: [
            {x: 112, y: 850, w: 400, h: 155}
        ]
    },
    {
        type: 'predio0011',
        x: 109,
        y: 1705,
        collisionRects: [
            {x: 142, y: 1900, w: 400, h: 155}
        ]
    },
    {
        type: 'predio0011',
        x: 70,
        y: 2230,
        collisionRects: [
            {x: 111, y: 2420, w: 400, h: 155}
        ]
    },
    {
        type: 'predio0012',
        x: 820,
        y: 55,
        collisionRects: [
            {x: 840, y: 240, w: 400, h: 155}
        ]
    },
    {
        type: 'predio0012',
        x: 817,
        y: 612,
        collisionRects: [
            {x: 840, y: 820, w: 400, h: 155}
        ]
    },
    {
        type: 'predio0012',
        x: 861,
        y: 1724,
        collisionRects: [
            {x: 881, y: 1914, w: 400, h: 155}
        ]
    },
    {
        type: 'predio0012',
        x: 822,
        y: 2236,
        collisionRects: [
            {x: 842, y: 2450, w: 400, h: 155}
        ]
    }
],
     trees: [
        // Ipês
        {type: 'arvore006', x: 1145, y: 1489},
        {type: 'arvore007', x: 600, y: 1203},
        {type: 'arvore008', x: 1292, y: 890},
        {type: 'arvore007', x: 1421, y: 845},
        {type: 'arvore006', x: 1344, y: 600},
        {type: 'arvore008', x: 1480, y: 420},
        {type: 'arvore007', x: 1675, y: 1480},
         {type: 'arvore007', x: 2700, y: 903},
         {type: 'arvore007', x: 415, y: 360},

          // Florestinha central
        {type: 'arvore002', x: 10, y: 1649},
        {type: 'arvore004', x: -20, y: 1700},
        {type: 'arvore004', x: -35, y: 1510},
        {type: 'arvore001', x: 280, y: 1490},
        {type: 'arvore001', x: 555, y: 1390},
        {type: 'arvore003', x: 380, y: 1510},
        {type: 'arvore002', x: 950, y: 1330},
        {type: 'arvorebloco001', x: -31, y: 1330},
        {type: 'arvore004', x: 760, y: 1489},
        {type: 'arvore001', x: 1000, y: 1533},
        {type: 'arvore004', x: 1200, y: 1500},
        {type: 'arvore002', x: 1400, y: 1510},
        {type: 'arvore001', x: 1700, y: 1569},
        {type: 'arvore001', x: 1800, y: 1559},
         
         // Três árvores no topo
        {type: 'arvore004', x: 1000, y: -44},
        {type: 'arvore003', x: 1800, y: -75},
        {type: 'arvore002', x: 570, y: -55}
        ],
        
    streetLights: [
    {type: 'poste000', x: 790, y: 355, rotation: 0, lightRadius: 200, id: 'map4_post1'},
    {type: 'poste000', x: 790, y: 941, rotation: 0, lightRadius: 200, id: 'map4_post2'},
    {type: 'poste000', x: 820, y: 2038, rotation: 0, lightRadius: 200, id: 'map4_post3'},
    {type: 'poste000', x: 780, y: 2550, rotation: 0, lightRadius: 200, id: 'map4_post4'},
    {type: 'poste000', x: 1300, y: 343, rotation: 0, lightRadius: 100, id: 'map4_post5'},
    {type: 'poste000', x: 1300, y: 981, rotation: 0, lightRadius: 100, id: 'map4_post6'},
    {type: 'poste000', x: 1530, y: 2053, rotation: 0, lightRadius: 100, id: 'map4_post7'},
    {type: 'poste000', x: 1309, y: 2550, rotation: 0, lightRadius: 100, id: 'map4_post8'},
    {type: 'poste001', x: 546, y: 343, rotation: 0, lightRadius: 200, id: 'map4_post9'},
    {type: 'poste001', x: 533, y: 981, rotation: 0, lightRadius: 200, id: 'map4_post10'},
    {type: 'poste001', x: 546, y: 2053, rotation: 0, lightRadius: 200, id: 'map4_post11'},
    {type: 'poste001', x: 550, y: 2550, rotation: 0, lightRadius: 200, id: 'map4_post12'}
],
    objects: [
        //carros estacionados
         {type: 'carro004fundos', x: 374, y: 450, rotation: 0},
        {type: 'carro001fundos', x: 374, y: 450, rotation: 0},
        {type: 'carro003frente', x: 1074, y: 450, rotation: 0},
         {type: 'carro004frente', x: 1374, y: 450, rotation: 0},
        {type: 'carro003fundos', x: 1264, y: 452, rotation: 0},
        {type: 'carrolateral_11', x: 1790, y: 452, rotation: 0},
        {type: 'carrolateral_07', x: 2, y: 680, rotation: 0},

        //carros estacionados no meio mapa
        {type: 'carro003frente', x: 1000, y: 1000, rotation: 0},
        {type: 'carro001fundos', x: 1600, y: 1000, rotation: 0},
        {type: 'carro003fundos', x: 200, y: 1200, rotation: 0},
        {type: 'carro001fundos', x: 310, y: 1000, rotation: 0},
        {type: 'carrolateral_03', x: 1310, y: 2110, rotation: 0},
        
        //carros estacionados no começo do mapa
        {type: 'carro001frente', x: 1600, y: 2640, rotation: 0},
        {type: 'carro001fundos', x: 1460, y: 2852, rotation: 0},
        {type: 'carro003fundos', x: 1244, y: 2643, rotation: 0},
        {type: 'carro004fundos', x: 264, y: 2642, rotation: 0},
        {type: 'carro003frente', x: 464, y: 2644, rotation: 0}
    ],
    walls: [],
    powerups: [
    {type: 'm2000power', x: 150, y: 1420, collected: false},
    {type: 'm2000power', x: 1780, y: 1400, collected: false}
],
    lights: [],
    shadows: [],
    playerStart: {x: 400, y: 2800},
    playerStartEscape: {x: 860, y: 50},
    exit: {x: 860, y: 10, w: 200, h: 30},
    direction: 'up'
},
        
        // Mapa 5 - Ninho dos Ratos
        {
            name: "Ninho dos Ratos",
            displayName: "Ninho dos Ratos",
            subtitle: "Estacionamento da bomba",
            width: 600,
            height: 800,
            enemies: [
                {x: 200, y: 300, type: 'morcego'},
                {x: 400, y: 300, type: 'faquinha'},
                {x: 300, y: 500, type: 'janis'}
            ],
            tiles: null, // Será gerado
            trees: [],
            streetLights: [],
            objects: [],
            walls: [
                {x: 120, y: 200, w: 140, h: 80},
                {x: 340, y: 200, w: 140, h: 80},
                {x: 120, y: 400, w: 140, h: 80},
                {x: 340, y: 400, w: 140, h: 80}
            ],
            lights: [],
            shadows: [],
            playerStart: {x: 700, y: 650},
            playerStartEscape: {x: 300, y: 50},
            exit: {x: 200, y: 750, w: 150, h: 40},
            lixeira: {x: 280, y: 120, w: 40, h: 40},
            direction: 'up'
        }
    ];
    
    // Exportar módulo
MadNight.maps = {
    // Lista de mapas
    list: mapsList,
    
    // Inicializar mapas (chamado pelo game.js)
init: function() {
    console.log('Inicializando sistema de mapas...');
    
    // Mapa 0 - Maconhão
    this.list[0].tiles = generateTiles(
        1920, 1080, 120, 
        ['grama000', 'grama001', 'grama002', 'grama003', 'grama004']
    );
    
    // Mapa 1 - Eixão (não precisa de tiles, tem tráfego)
    // this.list[1].tiles = null;
    
    // Mapa 2 - Fronteira com KS
    this.list[2].tiles = generateTiles(
        1920, 1610, 120,
        ['asfaltosujo001', 'asfaltosujo002', 'asfaltosujo003', 'asfaltosujo004', 'asfaltosujo005']
    );
    
    // Mapa 3 - Na área da KS (ÍNDICE 3, NÃO 2!)
    this.list[3].tiles = generateTiles(
        1920, 3000, 120,  // ← TAMANHO CORRETO: 1920x3000
        ['asfaltosujo001', 'asfaltosujo002', 'asfaltosujo003', 'asfaltosujo004', 'asfaltosujo005']
    );
    
   // Mapa 4 - Entre Prédios
    this.list[4].tiles = generateTiles(
        1920, 3000, 120,  // ← MUDANÇA: era 600, 800
        ['asfaltosujo001', 'asfaltosujo002', 'asfaltosujo003', 'asfaltosujo004', 'asfaltosujo005']
    );

    // Mapa 5 - Ninho dos Ratos
    this.list[5].tiles = generateTiles(
        600, 800, 120,
        ['asfaltosujo001', 'asfaltosujo002', 'asfaltosujo003', 'asfaltosujo004', 'asfaltosujo005']
);
    
    console.log(`${this.list.length} mapas carregados`);
},
    
    // Obter mapa por índice
    getMap: function(index) {
        return this.list[index] || null;
    },
    
    // Obter mapa atual
    getCurrentMap: function() {
        // Se game não existe, retorna mapa 0
        if (!MadNight.game || !MadNight.game.state) {
            return this.list[0];
        }
        // Se game existe, retorna o mapa correto
        return this.list[MadNight.game.state.currentMap] || this.list[0];
    },
    
    // Obter quantidade de mapas
    getCount: function() {
        return this.list.length;
    },
    
    // Obter carros estacionados para o mapa 2
    getParkedCarsForMap2: function() {
        return [
            {type: 'carro002frente', x: 34, y: 1472},
            {type: 'carrolateral_04', x: 1770, y: 1210},
            {type: 'carrolateral_06', x: 602, y: 523},
            {type: 'carrolateral_02', x: 527, y: 474},
            {type: 'carrolateral_03', x: 299, y: 378},
            {type: 'carrolateral_07', x: 89, y: 299},
            {type: 'carrolateral_08', x: 238, y: 704}
        ];
    },
    
    // Carregar mapa atual (para respawn)
    loadCurrentMap: function(isEscape = false) {
        if (!MadNight.game || !MadNight.game.state) {
            console.error('Game não inicializado');
            return;
        }
        
        const currentMapIndex = MadNight.game.state.currentMap;
        
        // Delegar para o game.js fazer o carregamento
        if (MadNight.game.loadMap) {
            MadNight.game.loadMap(currentMapIndex, isEscape);
        }
    },
    
    // Método alternativo para carregar mapa
    loadMap: function(mapIndex, isEscape = false) {
        // Delegar para o game.js
        if (MadNight.game && MadNight.game.loadMap) {
            MadNight.game.loadMap(mapIndex, isEscape);
        }
    }
};

console.log('Módulo Maps carregado');

})();
