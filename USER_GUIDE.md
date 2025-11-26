# ChoiceScript IDE User Guide

## Table of Contents
1. [Introduction](#introduction)
2. [Getting Started](#getting-started)
3. [Interface Overview](#interface-overview)
4. [Creating Games](#creating-games)
5. [Advanced Features](#advanced-features)
6. [Enterprise Workflow](#enterprise-workflow)
7. [Troubleshooting](#troubleshooting)

## Introduction

Welcome to the ChoiceScript IDE - Enterprise Edition! This guide will help you make the most of your interactive fiction development experience.

### What is ChoiceScript?

ChoiceScript is a simple scripting language for writing multiple-choice games. It's designed to be easy to learn while powerful enough to create complex, branching narratives.

### Why Use This IDE?

- **No Setup Required**: Just open the HTML file in your browser
- **Beginner Friendly**: Clear interface with helpful examples
- **Auto-Save**: Never lose your work
- **Instant Preview**: See your game come to life immediately
- **Project Management**: Organize multiple games easily

## Getting Started

### Step 1: Open the IDE

1. Navigate to the folder containing the IDE files
2. Double-click `index.html` to open it in your browser
3. The IDE loads instantly - no installation needed!

### Step 2: Create Your First Project

1. Click the **"New Project"** button (green button in top right)
2. Enter a name like "My First Adventure"
3. Click OK

Your new project is now ready to edit!

### Step 3: Write Your First Script

Copy this simple example into the editor:

```choicescript
*create health 100

You wake up in a mysterious forest.

*choice
    #Explore the forest
        You venture deeper into the woods.
        *set health 90
    #Rest by a tree
        You rest and regain your strength.
        *set health 100

Your health: ${health}

*finish
```

### Step 4: Run Your Game

1. Click the **"▶ Run Game"** button
2. Watch your game appear in the preview panel
3. Click on choices to play through your game

Congratulations! You've created your first ChoiceScript game!

## Interface Overview

### Header Bar

The purple header contains all main controls:

- **New Project**: Create a fresh game project
- **Save Project**: Manually save (auto-save runs every 30 seconds)
- **Load Project**: Reminder to use sidebar for loading
- **Export**: Download your game as a .txt file
- **Import File**: Load a ChoiceScript file from your computer

### Left Sidebar

#### Projects Section
- Shows all your saved projects
- Click any project to load it
- Active project is highlighted in purple
- × button to delete projects

#### Quick Start Section
- Basic ChoiceScript commands reference
- Always visible for quick help

### Center Panel - Editor

#### Project Name Input
- Edit your project's name at the top
- Changes save automatically

#### Code Editor
- Large text area for writing your game
- Monospace font for easy reading
- Line numbers shown in character count

#### Editor Footer
- Character count
- Line count
- Updates in real-time as you type

### Right Panel - Preview

#### Preview Header
- "Game Preview" title
- Clear button to reset the preview

#### Game Display Area
- Shows your game output
- Displays text, choices, and stats
- Scrolls automatically to latest content
- Click choices to interact with your game

### Footer Bar

Status information:
- Current operation status (left)
- Last saved timestamp (right)

## Creating Games

### Understanding Variables

Variables store information about your game state.

#### Creating Variables

```choicescript
*create playerName ""
*create gold 100
*create hasKey false
```

Always create variables at the start of your game!

#### Setting Variables

```choicescript
*set playerName "Alice"
*set gold 50
*set hasKey true
```

#### Using Variables in Text

```choicescript
Hello, ${playerName}! You have ${gold} gold pieces.
```

### Creating Choices

Choices let players make decisions:

```choicescript
What do you do?
*choice
    #Attack the dragon
        You charge at the dragon!
        *set courage 100
    #Run away
        You flee to safety!
        *set courage 0
    #Try to negotiate
        You attempt to speak with the dragon.
        *set courage 50
```

### Displaying Stats

Show player statistics with visual bars:

```choicescript
*stat_chart
    text name           # Shows text value
    percent health      # Shows percentage bar
    percent strength
    percent intelligence
```

### Ending Your Game

Always end with:

```choicescript
*finish
```

## Advanced Features

### Complex Choices

Create nested story structures:

```choicescript
*choice
    #Go to the castle
        You arrive at the castle gates.
        *choice
            #Enter boldly
                The guards let you pass.
            #Sneak in the back
                You find a hidden entrance.
    #Visit the village
        You walk into the village square.
```

### Variable Math

Modify numeric variables:

```choicescript
*set health 100
*set health 75        # Set to specific value
*set gold (gold + 50) # Add (requires parentheses in some versions)
```

### Text Interpolation

Insert variable values anywhere:

```choicescript
Your name is ${name} and you are a ${class}.
You have ${gold} gold and ${health} health points.
```

## Enterprise Workflow

### Managing Multiple Projects

#### Creating Projects
1. Start new stories as separate projects
2. Name them clearly (e.g., "Chapter 1", "Side Quest")
3. Projects appear in the sidebar immediately

#### Organizing Projects
- Keep related projects with similar names
- Delete old drafts to reduce clutter
- Use Export to archive completed projects

### Version Control Strategy

1. **Regular Exports**: Download important milestones
2. **Naming Convention**: Use dates in filenames (e.g., "game_2025-11-26.txt")
3. **Multiple Versions**: Keep old exports as backups

### Auto-Save Benefits

The IDE auto-saves every 30 seconds:
- Never lose work from browser crashes
- Switch between projects safely
- Close browser - work is saved

### Export/Import Workflow

#### Exporting
1. Click **"Export"** button
2. File downloads automatically
3. Saved as `[ProjectName].txt`

#### Importing
1. Click **"Import File"** button
2. Select your .txt file
3. New project created automatically
4. Original file unchanged

### Collaboration

To share your work:
1. Export your project
2. Send the .txt file to collaborators
3. They can import it into their IDE
4. Both can work independently
5. Manually merge changes if needed

## Troubleshooting

### Game Not Running

**Problem**: Nothing happens when clicking "Run Game"

**Solutions**:
- Make sure you've written some code
- Check for basic ChoiceScript syntax
- Look at browser console (F12) for errors

### Can't See Projects

**Problem**: Sidebar shows "No projects yet"

**Solutions**:
- Create a new project first
- Check if browser localStorage is enabled
- Try a different browser

### Lost Project

**Problem**: Can't find a project you created

**Solutions**:
- Check all projects in sidebar
- Projects are browser-specific (check same browser)
- Check if browser data was cleared
- Restore from exported .txt file if available

### Export Not Working

**Problem**: Export button doesn't download file

**Solutions**:
- Check browser download settings
- Allow pop-ups for this page
- Try a different browser
- Check if browser blocks automatic downloads

### Auto-Save Not Working

**Problem**: Changes disappear after reloading

**Solutions**:
- Click "Save Project" manually
- Check localStorage isn't full
- Export important work as backup
- Try clearing old projects to free space

### Preview Shows Errors

**Problem**: Preview shows strange output

**Solutions**:
- Click "Clear" and "Run Game" again
- Check ChoiceScript syntax
- Ensure variables are created before use
- Check that choices have proper format

## Tips for Success

### For Beginners

1. Start with the example game provided
2. Make small changes and test often
3. Use the Quick Start reference
4. Save early and often
5. Export your first complete game

### For Advanced Users

1. Plan variable structure before coding
2. Use meaningful variable names
3. Comment your code with //
4. Test all choice paths
5. Keep backup exports

### Best Practices

- **Save Often**: Click save after major changes
- **Test Frequently**: Run game after each new feature
- **Export Milestones**: Download important versions
- **Use Clear Names**: Project names should be descriptive
- **Start Simple**: Build complexity gradually

## Keyboard Shortcuts

While the IDE doesn't have custom shortcuts, you can use standard browser shortcuts:

- **Ctrl+S** (Cmd+S on Mac): May trigger save in some browsers
- **Ctrl+A** (Cmd+A): Select all text in editor
- **Ctrl+C/V** (Cmd+C/V): Copy and paste
- **Ctrl+Z** (Cmd+Z): Undo
- **Ctrl+Y** (Cmd+Y): Redo

## Getting Help

### In the IDE

- Check the Quick Start panel on the left
- Review the example game in the editor placeholder
- Use the preview to test your code

### External Resources

- ChoiceScript official documentation
- ChoiceScript community forums
- Interactive fiction communities

## Conclusion

You now have everything you need to create amazing ChoiceScript games! The IDE handles all the technical details so you can focus on storytelling.

Remember:
- ✅ The IDE auto-saves your work
- ✅ Export important projects as backup
- ✅ Test your game frequently
- ✅ Start simple and build complexity
- ✅ Have fun creating!

Happy writing! 🎮📝
