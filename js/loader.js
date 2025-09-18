// loader.js - Sistema de Carregamento Progressivo (v1.61 - Otimização de Loading)

(function() {
    'use strict';
    
    MadNight.loader = {
        // Estado do carregamento
        state: {
            isLoading: false,
            currentPhase: 'idle',
            progress: 0,
            loadedMaps: new Set(),
            assetsToLoad: [],
            assetsLoaded: 0,
            totalAssets: 0
        },
        
        // Assets base (sempre carregados no início)
        baseAssets: [
            // Sprites do player
            'player_idle', 'player_walk1', 'player_walk2', 'player_dash',
            'player_death1', 'player_death2', 'player_death3', 'player_death4',
            
            // Inimigos básicos
            'faquinha', 'morcego', 'caveirinha', 'janis', 'chacal',
            
            // Tiles comuns
            'grama000', 'grama001', 'grama002', 'grama003', 'grama004',
            'asfaltosujo001', 'asfaltosujo002', 'asfaltosujo003', 'asfaltosujo004', 'asfaltosujo005',
            
            // UI e objetos comuns
            'orelhao001', 'setadireita', 'setaesquerda', 'setanorte', 'setasul',
            
            // Árvores (usadas em vários mapas)
            'arvore001', 'arvore002', 'arvore003', 'arvore004',
            'arvore006', 'arvore007', 'arvore008', 'arvorebloco001'
        ],
        
        // Assets específicos por mapa
        mapAssets: {
            0: [ // Maconhão
                'campo', 'campoTraves',
                'poste000', 'poste001',
                'caixadeluz', 'banco03', 'banco04',
                'garrafaquebrada01', 'garrafaquebrada02',
                'cadeiradepraia01'
            ],
            1: [ // Eixão
                'eixaoCamada1', 'eixaoCamada2'
            ],
            2: [ // Entrada KS
                'entradaKS01',
                'predio0002', 'predio0003', 'predio0006', 'predio0008',
                'parquinho', 'banco01',
                'carro002frente', 'carrolateral_02', 'carrolateral_03',
                'carrolateral_04', 'carrolateral_06', 'carrolateral_07', 'carrolateral_08'
            ],
            3: [ // Na área da KS
        'area_da_ks_chao',
        'predio0002', 'predio0004', 'predio0005',
        'predio0002_vira', 'predio0004_vira', 'predio0005_vira'
            ],
            4: [], // Placeholder
            5: []  // Placeholder
        },
        
        // Inicializar sistema de loading
        init: function() {
            console.log('Sistema de Loading inicializado');
        },
        
// Carregar assets base + primeiro mapa
loadInitial: function(callback) {
    console.log('🎮 Iniciando carregamento...');
    this.state.isLoading = true;
    this.state.currentPhase = 'initial';
    this.state.progress = 0;
    
    // Marcar mapas como carregados
    for (let i = 0; i <= 5; i++) {
        this.state.loadedMaps.add(i);
    }
    
    // Verificar carregamento REAL dos assets
    const checkAssetsLoaded = () => {
        if (MadNight.assets && MadNight.assets.images) {
            const totalAssets = Object.keys(MadNight.assets.images).length;
            const loadedAssets = Object.values(MadNight.assets.images)
                .filter(img => img && img.loaded).length;
            
            this.state.progress = Math.floor((loadedAssets / totalAssets) * 100);
            
            // Se carregou pelo menos 80% ou passou 3 segundos, continuar
            if (loadedAssets >= totalAssets * 0.8 || Date.now() - startTime > 3000) {
                this.state.isLoading = false;
                console.log(`✅ Carregamento completo! ${loadedAssets}/${totalAssets} assets`);
                if (callback) callback();
            } else {
                // Verificar novamente em 100ms
                setTimeout(checkAssetsLoaded, 100);
            }
        } else {
            // Se não tem assets, continuar após 500ms
            setTimeout(() => {
                this.state.isLoading = false;
                console.log('✅ Carregamento completo (sem assets para verificar)');
                if (callback) callback();
            }, 500);
        }
    };
    
    const startTime = Date.now();
    checkAssetsLoaded();
},
        
        // Carregar batch de assets (REMOVIDO DELAY)
        loadAssetBatch: function(assetList, callback) {
            // Carregamento instantâneo
            this.state.progress = 100;
            if (callback) callback();
        },
        
        // Pré-carregar próximo mapa
        preloadMap: function(mapIndex) {
            // Já está tudo carregado
            this.state.loadedMaps.add(mapIndex);
        },
        
        // Verificar se um mapa está carregado
        isMapLoaded: function(mapIndex) {
            return true; // Sempre retorna true agora
        },
        
        // Forçar carregamento de um mapa específico
        loadMapAssets: function(mapIndex, callback) {
            // Carregamento instantâneo
            this.state.loadedMaps.add(mapIndex);
            if (callback) callback();
        },
        
        // Limpar assets não utilizados (desativado por enquanto)
        cleanupUnusedAssets: function(currentMapIndex) {
            // Não fazer nada por enquanto
        },
        
        // Obter estado do loading
        getLoadingState: function() {
            return {
                isLoading: false,
                progress: 100,
                phase: 'complete'
            };
        },
        
        // Criar tela de loading
        renderLoadingScreen: function(ctx, canvas) {
            // Background
            ctx.fillStyle = '#000';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            // Logo
            ctx.fillStyle = '#f00';
            ctx.font = '48px "Press Start 2P"';
            ctx.textAlign = 'center';
            ctx.fillText('MAD NIGHT', canvas.width / 2, canvas.height / 2 - 100);
            
            // Loading rápido
            ctx.fillStyle = '#fff';
            ctx.font = '16px "Press Start 2P"';
            ctx.fillText('Carregando...', canvas.width / 2, canvas.height / 2);
        }
    };
    
    console.log('Módulo Loader carregado');
    
})();
