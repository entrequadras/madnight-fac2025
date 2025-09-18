// menu.js - Sistema de Menu Principal (v1.64 - Menu com Arte)

(function() {
    'use strict';
    
    MadNight.menu = {
        active: true,
        currentOption: 0,
        currentScreen: 'main', // 'main', 'rankings', 'credits', 'newRecord', 'enterName'
        options: ['JOGAR', 'RANKINGS', 'CRÉDITOS', 'SAIR'],
        keys: {},
        lastKeyTime: 0,
        keyDelay: 200,
        
        // Animação do background
        bgFrame: 0,
        bgAnimTimer: 0,
        bgAnimDelay: 500, // Trocar frame a cada 500ms
        
        // Para entrada de nome
        playerName: '',
        nameCharIndex: 0,
        alphabet: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789 ',
        maxNameLength: 10,
        pendingReport: null,
        pendingRecords: null,
        
        // Imagens do menu
        backgrounds: {
            main: [null, null], // Dois frames para animação
            scores: null,
            credits: null
        },
        
        // Inicializar menu
        init: function() {
            console.log('🎮 Menu inicializado');
            this.setupInputHandlers();
            this.loadMenuAssets();
            this.playMenuMusic();
        },
        
        // Carregar assets do menu
        loadMenuAssets: function() {
            // Carregar backgrounds do menu principal (2 frames)
            const bgFrame1 = new Image();
            bgFrame1.src = 'assets/menu/menu_bg_frame1.png';
            bgFrame1.onload = () => {
                this.backgrounds.main[0] = bgFrame1;
                console.log('Menu BG frame 1 carregado');
            };
            
            const bgFrame2 = new Image();
            bgFrame2.src = 'assets/menu/menu_bg_frame2.png';
            bgFrame2.onload = () => {
                this.backgrounds.main[1] = bgFrame2;
                console.log('Menu BG frame 2 carregado');
            };
            
            // Carregar background dos scores
            const scoresBg = new Image();
            scoresBg.src = 'assets/menu/scores_bg.png';
            scoresBg.onload = () => {
                this.backgrounds.scores = scoresBg;
                console.log('Scores BG carregado');
            };
            
            // Carregar background dos créditos
            const creditsBg = new Image();
            creditsBg.src = 'assets/menu/credits_bg.png';
            creditsBg.onload = () => {
                this.backgrounds.credits = creditsBg;
                console.log('Credits BG carregado');
            };
        },
        
        // Tocar música do menu
        playMenuMusic: function() {
            if (MadNight.audio && MadNight.audio.playMusic) {
                MadNight.audio.playMusic('menu');
            }
        },
        
        // Parar música do menu
        stopMenuMusic: function() {
            if (MadNight.audio && MadNight.audio.stopMusic) {
                MadNight.audio.stopMusic();
            }
        },
        
        // Configurar handlers de input
        setupInputHandlers: function() {
            window.addEventListener('keydown', (e) => this.handleKeyDown(e));
            window.addEventListener('keyup', (e) => this.handleKeyUp(e));
        },
        
        handleKeyDown: function(e) {
            if (!this.active) return;
            
            const now = Date.now();
            if (now - this.lastKeyTime < this.keyDelay) return;
            
            this.keys[e.key] = true;
            
            if (this.currentScreen === 'enterName') {
                this.handleNameInput(e);
                return;
            }
            
            switch(e.key) {
                case 'ArrowUp':
                    this.navigateUp();
                    this.lastKeyTime = now;
                    break;
                case 'ArrowDown':
                    this.navigateDown();
                    this.lastKeyTime = now;
                    break;
                case 'Enter':
                case ' ':
                    this.selectOption();
                    this.lastKeyTime = now;
                    break;
                case 'Escape':
                    this.goBack();
                    this.lastKeyTime = now;
                    break;
            }
        },
        
        handleKeyUp: function(e) {
            this.keys[e.key] = false;
        },
        
        handleNameInput: function(e) {
            const now = Date.now();
            if (now - this.lastKeyTime < 150) return;
            
            switch(e.key) {
                case 'ArrowLeft':
                    if (this.playerName.length > 0) {
                        this.playerName = this.playerName.slice(0, -1);
                    }
                    this.lastKeyTime = now;
                    break;
                    
                case 'ArrowRight':
                    if (this.playerName.length < this.maxNameLength) {
                        this.playerName += this.alphabet[this.nameCharIndex];
                    }
                    this.lastKeyTime = now;
                    break;
                    
                case 'ArrowUp':
                    this.nameCharIndex = (this.nameCharIndex + 1) % this.alphabet.length;
                    this.lastKeyTime = now;
                    break;
                    
                case 'ArrowDown':
                    this.nameCharIndex = (this.nameCharIndex - 1 + this.alphabet.length) % this.alphabet.length;
                    this.lastKeyTime = now;
                    break;
                    
                case 'Enter':
                    if (this.playerName.trim().length > 0) {
                        this.saveHighScore();
                    }
                    this.lastKeyTime = now;
                    break;
                    
                case 'Escape':
                    this.currentScreen = 'main';
                    this.playerName = '';
                    this.nameCharIndex = 0;
                    this.lastKeyTime = now;
                    break;
                    
                default:
                    // Permitir digitação direta
                    if (e.key.length === 1 && this.playerName.length < this.maxNameLength) {
                        const char = e.key.toUpperCase();
                        if (this.alphabet.includes(char)) {
                            this.playerName += char;
                            this.lastKeyTime = now;
                        }
                    }
                    break;
            }
        },
        
        navigateUp: function() {
            if (this.currentScreen === 'main') {
                this.currentOption = (this.currentOption - 1 + this.options.length) % this.options.length;
            }
        },
        
        navigateDown: function() {
            if (this.currentScreen === 'main') {
                this.currentOption = (this.currentOption + 1) % this.options.length;
            }
        },
        
        selectOption: function() {
    if (this.currentScreen !== 'main') {
        if (this.currentScreen === 'rankings' || this.currentScreen === 'credits') {
            this.currentScreen = 'main';
        }
        return;
    }
    
    switch(this.options[this.currentOption]) {
        case 'JOGAR':
            this.startGame();
            break;
        case 'RANKINGS':
            // DESABILITADO - não faz nada
            console.log('Rankings desabilitado na versão demo');
            break;
        case 'CRÉDITOS':
            // DESABILITADO - não faz nada
            console.log('Créditos desabilitado na versão demo');
            break;
        case 'SAIR':
            // DESABILITADO - não faz nada
            console.log('Sair desabilitado na versão demo');
            break;
    }
},
        
        startGame: function() {
    console.log('🎮 Iniciando jogo...');
    this.active = false;
    
    // Parar música do menu
    if (MadNight.audio) {
        MadNight.audio.stopMusic();
    }
    
    // IMPORTANTE: SEMPRE resetar o jogo ao clicar em JOGAR
    if (MadNight.game && MadNight.game.restart) {
        console.log('Resetando jogo para nova partida...');
        MadNight.game.restart();
    }

    // Limpar TODAS as mensagens da UI
    if (MadNight.ui && MadNight.ui.clearAllMessages) {
        MadNight.ui.clearAllMessages();
    }

    // Chamar função do main.js para iniciar o jogo
    if (window.MadNightMain && window.MadNightMain.startGame) {
        window.MadNightMain.startGame();
    } else {
        console.error('❌ MadNightMain.startGame não encontrado!');
    }

    // Iniciar música do jogo DEPOIS de chamar startGame
    setTimeout(() => {
    if (MadNight.audio) {
        MadNight.audio.playAmbient(0.15);
        MadNight.audio.playMusic('inicio');
    }
}, 100);
},
        
        showRankings: function() {
            this.currentScreen = 'rankings';
        },
        
        showCredits: function() {
            this.currentScreen = 'credits';
        },
        
        quitGame: function() {
            if (confirm('Deseja realmente sair?')) {
                window.close();
            }
        },
        
        // Mostrar tela de novo recorde
        showNewRecord: function(report, newRecords) {
            this.active = true;
            this.currentScreen = 'enterName';
            this.pendingReport = report;
            this.pendingRecords = newRecords;
            this.playerName = '';
            this.nameCharIndex = 0;
        },
        
        // Salvar high score
        saveHighScore: function() {
            if (MadNight.stats && this.pendingReport) {
                MadNight.stats.addHighScore(this.playerName, this.pendingReport);
            }
            
            // Voltar ao menu principal
            this.currentScreen = 'rankings';
            this.playerName = '';
            this.pendingReport = null;
            this.pendingRecords = null;
            
            // Mostrar rankings por 5 segundos, depois voltar ao menu
            setTimeout(() => {
                this.currentScreen = 'main';
            }, 5000);
        },
        
        // Update para animação
        update: function(deltaTime) {
            if (!this.active) return;
            
            // Atualizar animação do background
            this.bgAnimTimer += deltaTime || 16;
            if (this.bgAnimTimer > this.bgAnimDelay) {
                this.bgAnimTimer = 0;
                this.bgFrame = (this.bgFrame + 1) % 2;
            }
        },
        
        // Renderizar menu
        render: function(ctx) {
            if (!this.active) return;
            
            // Limpar tela
            ctx.fillStyle = '#000';
            ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
            
            switch(this.currentScreen) {
                case 'main':
                    this.renderMainMenu(ctx);
                    break;
                case 'rankings':
                    this.renderRankings(ctx);
                    break;
                case 'credits':
                    this.renderCredits(ctx);
                    break;
                case 'enterName':
                    this.renderEnterName(ctx);
                    break;
            }
        },
        
        renderMainMenu: function(ctx) {
    // Renderizar background animado
    if (this.backgrounds.main[this.bgFrame]) {
        ctx.drawImage(this.backgrounds.main[this.bgFrame], 0, 0, 1920, 1080);
    } else {
        ctx.fillStyle = '#111';
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    }
            
    const menuX = ctx.canvas.width / 2 - 230;
    ctx.font = '24px "Press Start 2P"';
    ctx.textAlign = 'left';
    
    this.options.forEach((option, index) => {
        if (index === this.currentOption) {
            if (option === 'JOGAR') {
                // JOGAR ativo
                ctx.fillStyle = '#ff0';
                ctx.fillText('→ ' + option, menuX - 30, 350 + index * 60);
            } else {
                // Outros botões selecionados mas desabilitados
                ctx.fillStyle = '#666'; // Cor cinza para indicar desabilitado
                ctx.fillText('→ ' + option + ' (DEMO)', menuX - 30, 350 + index * 60);
            }
        } else {
            if (option === 'JOGAR') {
                // JOGAR normal
                ctx.fillStyle = '#fff';
                ctx.fillText(option, menuX, 350 + index * 60);
            } else {
                // Outros botões normais mas desabilitados
                ctx.fillStyle = '#444'; // Cor mais escura para indicar desabilitado
                ctx.fillText(option + ' (DEMO)', menuX, 350 + index * 60);
            }
        }
    });
            
            // Instruções
    ctx.fillStyle = '#888';
    ctx.font = '10px "Press Start 2P"';
    ctx.textAlign = 'center';
    ctx.fillText('Use ↑↓ para navegar, ENTER para selecionar', ctx.canvas.width / 2, ctx.canvas.height - 40);
    
    // Versão DEMO
    ctx.fillStyle = '#ff0';
    ctx.font = '8px "Press Start 2P"';
    ctx.textAlign = 'right';
    ctx.fillText('VERSÃO DEMO v1.64', ctx.canvas.width - 10, ctx.canvas.height - 10);
}
        
        renderCredits: function(ctx) {
            // Renderizar background dos créditos
            if (this.backgrounds.credits) {
    ctx.drawImage(this.backgrounds.credits, 0, 0, 1920, 1080);
} else {
                ctx.fillStyle = '#010';
                ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
            }
            
            ctx.fillStyle = '#ff0';
            ctx.font = '32px "Press Start 2P"';
            ctx.textAlign = 'center';
            ctx.fillText('CRÉDITOS', ctx.canvas.width / 2, 100);
            
            const credits = [
                { role: 'GAME DESIGN', name: 'Brasília Underground' },
                { role: 'PROGRAMAÇÃO', name: 'JavaScript Warriors' },
                { role: 'ARTE', name: 'Pixel Prophets' },
                { role: 'MÚSICA', name: '8-bit Cerrado' },
                { role: 'SFX', name: 'Noise Makers BSB' }
            ];
            
            ctx.font = '14px "Press Start 2P"';
            credits.forEach((credit, index) => {
                const y = 200 + index * 60;
                
                ctx.fillStyle = '#0ff';
                ctx.fillText(credit.role, ctx.canvas.width / 2, y);
                
                ctx.fillStyle = '#fff';
                ctx.font = '12px "Press Start 2P"';
                ctx.fillText(credit.name, ctx.canvas.width / 2, y + 25);
                
                ctx.font = '14px "Press Start 2P"';
            });
            
            // Dedicatória
            ctx.fillStyle = '#f00';
            ctx.font = '10px "Press Start 2P"';
            ctx.fillText('Dedicado aos pixadores de Brasília', ctx.canvas.width / 2, ctx.canvas.height - 80);
            ctx.fillText('dos anos 80 e 90', ctx.canvas.width / 2, ctx.canvas.height - 60);
            
            // Instruções
            ctx.fillStyle = '#888';
            ctx.fillText('Pressione ESC para voltar', ctx.canvas.width / 2, ctx.canvas.height - 20);
        },
        
        renderEnterName: function(ctx) {
            // Usar background principal ou preto
            if (this.backgrounds.main[0]) {
                ctx.drawImage(this.backgrounds.main[0], 0, 0, ctx.canvas.width, ctx.canvas.height);
                // Escurecer para destacar texto
                ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
                ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
            } else {
                ctx.fillStyle = '#000';
                ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
            }
            
            ctx.fillStyle = '#ff0';
            ctx.font = '32px "Press Start 2P"';
            ctx.textAlign = 'center';
            ctx.fillText('NOVO RECORDE!', ctx.canvas.width / 2, 100);
            
            // Mostrar conquistas
            if (this.pendingRecords) {
                ctx.fillStyle = '#0ff';
                ctx.font = '16px "Press Start 2P"';
                this.pendingRecords.forEach((record, index) => {
                    ctx.fillText(record, ctx.canvas.width / 2, 160 + index * 30);
                });
            }
            
            // Input do nome
            ctx.fillStyle = '#fff';
            ctx.font = '20px "Press Start 2P"';
            ctx.fillText('DIGITE SEU NOME:', ctx.canvas.width / 2, 280);
            
            // Nome atual
            ctx.fillStyle = '#ff0';
            ctx.font = '24px "Press Start 2P"';
            const displayName = this.playerName + (this.playerName.length < this.maxNameLength ? '_' : '');
            ctx.fillText(displayName, ctx.canvas.width / 2, 330);
            
            // Caractere selecionado
            if (this.playerName.length < this.maxNameLength) {
                ctx.fillStyle = '#666';
                ctx.font = '16px "Press Start 2P"';
                ctx.fillText('↑', ctx.canvas.width / 2 + (this.playerName.length * 24), 360);
                ctx.fillText(this.alphabet[this.nameCharIndex], ctx.canvas.width / 2 + (this.playerName.length * 24), 380);
                ctx.fillText('↓', ctx.canvas.width / 2 + (this.playerName.length * 24), 400);
            }
            
            // Instruções
            ctx.fillStyle = '#888';
            ctx.font = '10px "Press Start 2P"';
            ctx.fillText('↑↓ - Mudar letra  ←→ - Adicionar/Remover', ctx.canvas.width / 2, 460);
            ctx.fillText('ENTER - Confirmar  ESC - Cancelar', ctx.canvas.width / 2, 480);
            ctx.fillText('Ou digite diretamente no teclado', ctx.canvas.width / 2, 500);
            
            // Estatísticas do jogo
            if (this.pendingReport) {
                ctx.fillStyle = '#0f0';
                ctx.font = '10px "Press Start 2P"';
                ctx.fillText(`Tempo: ${this.pendingReport.timeFormatted}`, ctx.canvas.width / 2, 540);
                ctx.fillText(`Kills: ${this.pendingReport.kills.total}`, ctx.canvas.width / 2, 560);
                ctx.fillText(`Mortes: ${this.pendingReport.deaths}`, ctx.canvas.width / 2, 580);
            }
        }
    };
    
    console.log('Módulo Menu carregado');
    
})();
