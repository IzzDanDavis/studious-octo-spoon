// Main Application Logic
class ChoiceScriptIDE {
    constructor() {
        this.engine = new ChoiceScriptEngine();
        this.currentProject = null;
        this.projects = this.loadProjects();
        this.autoSaveInterval = null;
        
        this.initializeElements();
        this.attachEventListeners();
        this.updateProjectList();
        this.startAutoSave();
        
        // Load last project if available
        if (this.projects.length > 0) {
            this.loadProject(this.projects[0].id);
        }
    }

    initializeElements() {
        // Editor elements
        this.editor = document.getElementById('editor');
        this.projectNameInput = document.getElementById('projectName');
        this.gamePreview = document.getElementById('gamePreview');
        this.charCount = document.getElementById('charCount');
        this.lineCount = document.getElementById('lineCount');
        this.statusMessage = document.getElementById('statusMessage');
        this.lastSaved = document.getElementById('lastSaved');
        this.projectList = document.getElementById('projectList');

        // Buttons
        this.newProjectBtn = document.getElementById('newProjectBtn');
        this.saveBtn = document.getElementById('saveBtn');
        this.loadBtn = document.getElementById('loadBtn');
        this.exportBtn = document.getElementById('exportBtn');
        this.importBtn = document.getElementById('importBtn');
        this.runBtn = document.getElementById('runBtn');
        this.clearPreviewBtn = document.getElementById('clearPreviewBtn');
        this.fileInput = document.getElementById('fileInput');
    }

    attachEventListeners() {
        // Editor events
        this.editor.addEventListener('input', () => this.updateEditorStats());
        this.projectNameInput.addEventListener('input', () => this.markDirty());

        // Button events
        this.newProjectBtn.addEventListener('click', () => this.newProject());
        this.saveBtn.addEventListener('click', () => this.saveCurrentProject());
        this.loadBtn.addEventListener('click', () => this.showLoadDialog());
        this.exportBtn.addEventListener('click', () => this.exportProject());
        this.importBtn.addEventListener('click', () => this.fileInput.click());
        this.runBtn.addEventListener('click', () => this.runGame());
        this.clearPreviewBtn.addEventListener('click', () => this.clearPreview());
        this.fileInput.addEventListener('change', (e) => this.importProject(e));
    }

    newProject() {
        const projectName = prompt('Enter project name:', 'My ChoiceScript Game');
        if (!projectName) return;

        const project = {
            id: Date.now().toString(),
            name: projectName,
            content: '',
            created: new Date().toISOString(),
            modified: new Date().toISOString()
        };

        this.projects.push(project);
        this.saveProjects();
        this.loadProject(project.id);
        this.updateProjectList();
        this.setStatus('New project created: ' + projectName);
    }

    loadProject(projectId) {
        const project = this.projects.find(p => p.id === projectId);
        if (!project) return;

        this.currentProject = project;
        this.projectNameInput.value = project.name;
        this.editor.value = project.content;
        this.updateEditorStats();
        this.clearPreview();
        this.setStatus('Loaded project: ' + project.name);
        this.updateProjectList();
    }

    saveCurrentProject() {
        if (!this.currentProject) {
            this.newProject();
            return;
        }

        this.currentProject.name = this.projectNameInput.value || 'Untitled';
        this.currentProject.content = this.editor.value;
        this.currentProject.modified = new Date().toISOString();

        const index = this.projects.findIndex(p => p.id === this.currentProject.id);
        if (index !== -1) {
            this.projects[index] = this.currentProject;
        }

        this.saveProjects();
        this.updateProjectList();
        this.setStatus('Project saved: ' + this.currentProject.name);
        this.updateLastSaved();
    }

    deleteProject(projectId, event) {
        event.stopPropagation();
        
        const project = this.projects.find(p => p.id === projectId);
        if (!project) return;

        if (!confirm(`Delete project "${project.name}"?`)) return;

        this.projects = this.projects.filter(p => p.id !== projectId);
        this.saveProjects();
        this.updateProjectList();

        if (this.currentProject && this.currentProject.id === projectId) {
            this.currentProject = null;
            this.projectNameInput.value = '';
            this.editor.value = '';
            this.clearPreview();
        }

        this.setStatus('Project deleted: ' + project.name);
    }

    loadProjects() {
        try {
            const saved = localStorage.getItem('choicescript_projects');
            return saved ? JSON.parse(saved) : [];
        } catch (e) {
            console.error('Error loading projects:', e);
            return [];
        }
    }

    saveProjects() {
        try {
            localStorage.setItem('choicescript_projects', JSON.stringify(this.projects));
        } catch (e) {
            console.error('Error saving projects:', e);
            alert('Error saving projects. Storage may be full.');
        }
    }

    updateProjectList() {
        this.projectList.innerHTML = '';
        
        if (this.projects.length === 0) {
            this.projectList.innerHTML = '<p style="color: #999; font-size: 12px;">No projects yet</p>';
            return;
        }

        this.projects.forEach(project => {
            const item = document.createElement('div');
            item.className = 'project-item';
            if (this.currentProject && this.currentProject.id === project.id) {
                item.classList.add('active');
            }

            const nameSpan = document.createElement('span');
            nameSpan.textContent = project.name;
            nameSpan.style.flex = '1';
            
            const deleteBtn = document.createElement('button');
            deleteBtn.className = 'delete-project';
            deleteBtn.textContent = '×';
            deleteBtn.onclick = (e) => this.deleteProject(project.id, e);

            item.appendChild(nameSpan);
            item.appendChild(deleteBtn);
            item.onclick = () => this.loadProject(project.id);

            this.projectList.appendChild(item);
        });
    }

    exportProject() {
        if (!this.currentProject) {
            alert('No project to export. Please create or load a project first.');
            return;
        }

        const content = this.editor.value;
        const fileName = (this.projectNameInput.value || 'game') + '.txt';
        
        const blob = new Blob([content], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = fileName;
        a.click();
        URL.revokeObjectURL(url);

        this.setStatus('Project exported: ' + fileName);
    }

    importProject(event) {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            const content = e.target.result;
            const fileName = file.name.replace(/\.[^/.]+$/, '');

            const project = {
                id: Date.now().toString(),
                name: fileName,
                content: content,
                created: new Date().toISOString(),
                modified: new Date().toISOString()
            };

            this.projects.push(project);
            this.saveProjects();
            this.loadProject(project.id);
            this.updateProjectList();
            this.setStatus('Project imported: ' + fileName);
        };

        reader.readAsText(file);
        event.target.value = ''; // Reset file input
    }

    runGame() {
        const script = this.editor.value;
        if (!script.trim()) {
            alert('Please write some ChoiceScript code first!');
            return;
        }

        try {
            this.engine.loadScript(script);
            this.renderGame();
            this.setStatus('Game running...');
        } catch (e) {
            alert('Error running game: ' + e.message);
            console.error(e);
        }
    }

    renderGame() {
        this.gamePreview.innerHTML = '';

        const output = this.engine.getOutput();
        output.forEach(item => {
            if (item.type === 'text') {
                const p = document.createElement('p');
                p.className = 'game-text';
                p.textContent = item.content;
                this.gamePreview.appendChild(p);
            } else if (item.type === 'stats') {
                this.renderStats(item.content);
            }
        });

        const choices = this.engine.getChoices();
        if (choices.length > 0) {
            choices.forEach((choice, index) => {
                const div = document.createElement('div');
                div.className = 'game-choice';
                div.textContent = choice.text;
                div.onclick = () => this.selectChoice(index);
                this.gamePreview.appendChild(div);
            });
        }

        if (this.engine.isFinished()) {
            const p = document.createElement('p');
            p.className = 'game-text';
            p.style.fontWeight = 'bold';
            p.style.textAlign = 'center';
            p.style.marginTop = '20px';
            p.textContent = '--- Game Finished ---';
            this.gamePreview.appendChild(p);
        }

        // Scroll to bottom
        this.gamePreview.scrollTop = this.gamePreview.scrollHeight;
    }

    renderStats(stats) {
        const container = document.createElement('div');
        container.className = 'stat-display';

        const title = document.createElement('h4');
        title.textContent = 'Statistics';
        title.style.marginBottom = '10px';
        container.appendChild(title);

        stats.forEach(stat => {
            const item = document.createElement('div');
            item.className = 'stat-item';

            const label = document.createElement('span');
            label.textContent = stat.name + ':';
            item.appendChild(label);

            if (stat.type === 'percent') {
                const barContainer = document.createElement('div');
                barContainer.className = 'stat-bar';
                const barFill = document.createElement('div');
                barFill.className = 'stat-fill';
                barFill.style.width = stat.value + '%';
                barContainer.appendChild(barFill);
                item.appendChild(barContainer);

                const value = document.createElement('span');
                value.textContent = stat.value + '%';
                value.style.marginLeft = '10px';
                item.appendChild(value);
            } else {
                const value = document.createElement('span');
                value.textContent = stat.value;
                item.appendChild(value);
            }

            container.appendChild(item);
        });

        this.gamePreview.appendChild(container);
    }

    selectChoice(index) {
        this.engine.selectChoice(index);
        this.renderGame();
    }

    clearPreview() {
        this.gamePreview.innerHTML = '<p class="placeholder">Click "Run Game" to preview your ChoiceScript game</p>';
        this.engine.reset();
    }

    updateEditorStats() {
        const content = this.editor.value;
        this.charCount.textContent = content.length + ' characters';
        this.lineCount.textContent = content.split('\n').length + ' lines';
        this.markDirty();
    }

    markDirty() {
        // Project has unsaved changes
    }

    setStatus(message) {
        this.statusMessage.textContent = message;
    }

    updateLastSaved() {
        const now = new Date();
        this.lastSaved.textContent = 'Last saved: ' + now.toLocaleTimeString();
    }

    startAutoSave() {
        // Auto-save every 30 seconds
        this.autoSaveInterval = setInterval(() => {
            if (this.currentProject && this.editor.value) {
                this.saveCurrentProject();
            }
        }, 30000);
    }

    showLoadDialog() {
        if (this.projects.length === 0) {
            alert('No saved projects. Create a new project first!');
            return;
        }
        this.setStatus('Select a project from the sidebar to load it');
    }
}

// Initialize the IDE when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.ide = new ChoiceScriptIDE();
});
