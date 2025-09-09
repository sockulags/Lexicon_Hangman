# Game Hub - Multiple Games Platform

A collection of classic games built with HTML, CSS and vanilla JavaScript.
Try it out [here](https://sockulags.github.io/Lexicon_Hangman/)

## Available Games

### 🎭 Hangman
Classic word guessing game where you try to guess the secret word before the hangman is complete.

### ⭕ Tic-Tac-Toe
Traditional X's and O's game for two players.

## Features

- **Landing Page**: Clean game selection interface
- **Navigation**: Easy switching between games with a persistent navbar
- **Responsive Design**: Works on desktop and mobile devices
- **Multi-language Support**: Hangman supports English and Swedish
- **Consistent Styling**: Unified dark theme across all games

## Project Structure

```
├── index.html          # Landing page with game selection
├── hangman.html        # Hangman game page
├── hangman.js          # Hangman game logic
├── tictactoe.html      # Tic-Tac-Toe game page
├── tictactoe.js        # Tic-Tac-Toe game logic
├── languageData.js     # Language data for hangman game
├── styles.css          # Shared styles for all games
└── img/               # Game icons and assets
```

## Game Details

### Hangman Game
The hangman game uses SVG graphics to display the hangman being drawn with each incorrect guess. It includes:

- Random word selection from language-specific word arrays
- Visual letter keyboard interface
- Progressive hangman drawing with each wrong guess
- Support for English and Swedish languages
- Keyboard input support

**Original Requirements:**
- Built with vanilla JavaScript (no frameworks)
- Visual indication of word length
- Letter tracking to prevent duplicate guesses
- Win/lose detection with restart functionality
- Random word selection from predefined arrays

### Tic-Tac-Toe Game
A fully functional tic-tac-toe implementation featuring:

- Two-player gameplay (X and O)
- Visual player indicators with color coding
- Win detection with highlighting of winning line
- Draw game detection
- Reset functionality for new games
- Responsive grid layout

## Technical Implementation

- **Vanilla JavaScript**: All games built without external frameworks
- **Modular Architecture**: Each game is self-contained
- **ES6 Modules**: Modern JavaScript module system for hangman
- **CSS Grid/Flexbox**: Responsive layouts
- **Progressive Enhancement**: Works without JavaScript for basic navigation

## Development

The project uses a simple static file structure that can be served with any web server:

```bash
# Serve locally with Python
python3 -m http.server 8000

# Or with Node.js
npx serve .
```

## Adding New Games

To add a new game:

1. Create `newgame.html` with the navbar structure
2. Create `newgame.js` with game logic
3. Add styles to `styles.css`
4. Update the landing page (`index.html`) to include the new game card
5. Update this README

## Browser Compatibility

- Modern browsers with ES6 support
- CSS Grid and Flexbox support required
- No external dependencies

