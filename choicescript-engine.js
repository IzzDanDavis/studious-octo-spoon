// ChoiceScript Engine - Simplified interpreter for ChoiceScript
class ChoiceScriptEngine {
    constructor() {
        this.variables = {};
        this.lines = [];
        this.currentLine = 0;
        this.output = [];
        this.choices = [];
        this.gameState = 'running';
    }

    reset() {
        this.variables = {};
        this.currentLine = 0;
        this.output = [];
        this.choices = [];
        this.gameState = 'running';
    }

    loadScript(script) {
        this.reset();
        this.lines = script.split('\n').map(line => line.trim());
        this.processScript();
    }

    processScript() {
        while (this.currentLine < this.lines.length && this.gameState === 'running') {
            const line = this.lines[this.currentLine];
            
            if (!line || line.startsWith('//')) {
                this.currentLine++;
                continue;
            }

            if (line.startsWith('*')) {
                this.processCommand(line);
            } else {
                // Regular text output
                this.output.push({ type: 'text', content: this.interpolate(line) });
                this.currentLine++;
            }

            // Stop at choices or finish
            if (this.choices.length > 0 || this.gameState !== 'running') {
                break;
            }
        }
    }

    processCommand(line) {
        const parts = line.substring(1).split(' ');
        const command = parts[0].toLowerCase();

        switch (command) {
            case 'create':
                this.handleCreate(parts.slice(1));
                break;
            case 'set':
                this.handleSet(parts.slice(1));
                break;
            case 'choice':
                this.handleChoice();
                return;
            case 'finish':
                this.gameState = 'finished';
                this.output.push({ type: 'text', content: 'THE END' });
                return;
            case 'stat_chart':
                this.handleStatChart();
                break;
            default:
                // Unknown command, skip
                break;
        }
        
        this.currentLine++;
    }

    handleCreate(parts) {
        const varName = parts[0];
        let value = parts.slice(1).join(' ');
        
        // Remove quotes
        value = value.replace(/^["']|["']$/g, '');
        
        // Parse numeric values
        if (!isNaN(value) && value !== '') {
            value = parseFloat(value);
        }
        
        this.variables[varName] = value;
    }

    handleSet(parts) {
        const varName = parts[0];
        let value = parts.slice(1).join(' ');
        
        // Remove quotes
        value = value.replace(/^["']|["']$/g, '');
        
        // Parse numeric values or expressions
        if (!isNaN(value) && value !== '') {
            value = parseFloat(value);
        } else {
            // Try to evaluate simple expressions
            value = this.interpolate(value);
        }
        
        this.variables[varName] = value;
    }

    handleChoice() {
        this.currentLine++;
        this.choices = [];
        
        while (this.currentLine < this.lines.length) {
            const line = this.lines[this.currentLine].trim();
            
            if (line.startsWith('#')) {
                const choiceText = line.substring(1).trim();
                const choiceIndex = this.currentLine + 1;
                this.choices.push({
                    text: choiceText,
                    index: choiceIndex
                });
                
                // Skip to next choice or end
                this.currentLine++;
                while (this.currentLine < this.lines.length) {
                    const nextLine = this.lines[this.currentLine].trim();
                    if (nextLine.startsWith('#') || nextLine.startsWith('*')) {
                        break;
                    }
                    this.currentLine++;
                }
            } else if (line.startsWith('*') || !line) {
                break;
            } else {
                this.currentLine++;
            }
        }
    }

    handleStatChart() {
        this.currentLine++;
        const stats = [];
        
        while (this.currentLine < this.lines.length) {
            const line = this.lines[this.currentLine].trim();
            
            if (line.startsWith('*') || !line) {
                break;
            }
            
            const parts = line.split(' ');
            const type = parts[0];
            const varName = parts[1];
            
            if (this.variables.hasOwnProperty(varName)) {
                stats.push({
                    type: type,
                    name: varName,
                    value: this.variables[varName]
                });
            }
            
            this.currentLine++;
        }
        
        if (stats.length > 0) {
            this.output.push({ type: 'stats', content: stats });
        }
    }

    selectChoice(index) {
        if (index < 0 || index >= this.choices.length) {
            return;
        }

        const choice = this.choices[index];
        this.currentLine = choice.index;
        this.choices = [];
        
        // Process the consequence of the choice
        while (this.currentLine < this.lines.length) {
            const line = this.lines[this.currentLine].trim();
            
            // Stop at next choice or command that's not set/create
            if (line.startsWith('#')) {
                break;
            }
            
            if (line.startsWith('*')) {
                const cmd = line.substring(1).split(' ')[0].toLowerCase();
                if (cmd !== 'set' && cmd !== 'create') {
                    break;
                }
            }
            
            if (line.startsWith('*')) {
                this.processCommand(line);
            } else if (line) {
                this.output.push({ type: 'text', content: this.interpolate(line) });
            }
            
            this.currentLine++;
        }
        
        // Continue processing
        this.processScript();
    }

    interpolate(text) {
        // Replace ${varName} with variable values
        return text.replace(/\$\{(\w+)\}/g, (match, varName) => {
            return this.variables.hasOwnProperty(varName) ? this.variables[varName] : match;
        });
    }

    getOutput() {
        return this.output;
    }

    getChoices() {
        return this.choices;
    }

    isFinished() {
        return this.gameState === 'finished';
    }

    getVariables() {
        return this.variables;
    }
}
