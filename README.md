# ChoiceScript IDE - Enterprise Edition

A comprehensive, easy-to-use Integrated Development Environment for creating ChoiceScript interactive fiction games with enterprise-grade features.

## 🚀 Features

### Core Functionality
- **Full-Featured Code Editor**: Write ChoiceScript code with a clean, intuitive interface
- **Live Game Preview**: Test your game in real-time as you write
- **Save/Load System**: Automatically saves projects to browser storage
- **Project Management**: Create, organize, and manage multiple game projects
- **Export/Import**: Export games as `.txt` files and import existing ChoiceScript files

### Enterprise Features
- **Auto-Save**: Automatically saves your work every 30 seconds
- **Project Dashboard**: Visual project management with quick access
- **Character & Line Counter**: Track your script size in real-time
- **Quick Reference Guide**: Built-in ChoiceScript command reference
- **Version Control**: Each project tracks creation and modification dates

## 🎮 Getting Started

### Opening the IDE

1. Simply open `index.html` in any modern web browser
2. No installation, server, or dependencies required!
3. Works completely offline after the first load

### Creating Your First Game

1. Click **"New Project"** in the header
2. Enter a project name (e.g., "My Adventure")
3. Start writing your ChoiceScript code in the editor
4. Click **"▶ Run Game"** to preview your game
5. Your project auto-saves every 30 seconds

### Example Game

Here's a simple example to get started:

```choicescript
*create name ""
*create class ""
*create strength 50
*create intelligence 50

Welcome to the Adventure!

What is your name?
*set name "Hero"

Choose your class:
*choice
    #Warrior
        *set class "Warrior"
        *set strength 80
        *set intelligence 30
        You are a mighty warrior!
    #Mage
        *set class "Mage"
        *set strength 30
        *set intelligence 80
        You are a powerful mage!
    #Rogue
        *set class "Rogue"
        *set strength 60
        *set intelligence 60
        You are a cunning rogue!

Your adventure as ${name} the ${class} begins!

*stat_chart
    text name
    text class
    percent strength
    percent intelligence

*finish
```

## 📚 ChoiceScript Commands Reference

### Variables
- `*create varName value` - Create a new variable
- `*set varName value` - Set or update a variable value
- `${varName}` - Insert variable value in text

### Choices
```choicescript
*choice
    #Option 1
        Text for option 1
    #Option 2
        Text for option 2
```

### Stats
```choicescript
*stat_chart
    text varName      # Display as text
    percent varName   # Display as percentage bar
```

### Control
- `*finish` - End the game

## 💾 Save & Load

### Saving Projects
- **Auto-Save**: Projects automatically save every 30 seconds
- **Manual Save**: Click "Save Project" button anytime
- Projects are stored in browser's localStorage

### Loading Projects
- Click on any project in the sidebar to load it
- Projects are automatically available across browser sessions
- Click "Load Project" for a reminder to use the sidebar

### Export/Import
- **Export**: Download your project as a `.txt` file
- **Import**: Load ChoiceScript files from your computer
- Great for backup and sharing with others

## 🎯 Enterprise Workflow Features

### Project Management
- View all projects in the left sidebar
- Quick-switch between projects with one click
- Delete unwanted projects with the × button
- Active project is highlighted

### Status Monitoring
- Real-time character and line count
- Status messages for all operations
- Last saved timestamp
- Ready/Running status indicator

### Data Safety
- Auto-save prevents data loss
- Export regularly for external backups
- Browser localStorage is persistent

## 🛠️ Technical Details

### Browser Compatibility
- Works in all modern browsers (Chrome, Firefox, Safari, Edge)
- Requires JavaScript enabled
- Uses localStorage for data persistence

### File Structure
```
.
├── index.html              # Main application HTML
├── styles.css              # Complete styling
├── app.js                  # IDE application logic
├── choicescript-engine.js  # ChoiceScript interpreter
└── README.md              # This file
```

### Technologies Used
- Pure HTML5, CSS3, JavaScript (ES6+)
- No external dependencies
- LocalStorage API for persistence
- File API for import/export

## 🔒 Privacy & Security

- All data stored locally in your browser
- No server communication required
- No data collection or tracking
- Complete offline functionality

## 📖 ChoiceScript Language Guide

### Basic Structure
Every ChoiceScript game follows this pattern:
1. Create variables with `*create`
2. Display text and choices
3. Update variables with `*set`
4. Show stats with `*stat_chart`
5. End with `*finish`

### Best Practices
- Always initialize variables before using them
- Use meaningful variable names
- Test frequently with the preview panel
- Save often (or rely on auto-save)
- Export important projects for backup

## 🚀 Quick Tips

1. **Fast Testing**: Edit code and immediately click "Run Game"
2. **Multiple Projects**: Keep different story branches in separate projects
3. **Export Often**: Download important projects as backup files
4. **Use the Sidebar**: Quick reference guide is always visible
5. **Auto-Save**: Don't worry about losing work - it saves automatically

## 🎨 Customization

The IDE features:
- Beautiful gradient theme
- Smooth animations
- Responsive design
- Clean, professional interface
- Accessibility-friendly colors

## 📝 License

Open source - feel free to use, modify, and distribute.

## 🤝 Support

For ChoiceScript language questions, refer to the official ChoiceScript documentation.
For IDE issues, check the browser console for error messages.

---

**Made for game creators who want a simple, powerful, and reliable ChoiceScript development environment.**
