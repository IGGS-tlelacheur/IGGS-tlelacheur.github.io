# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is the "Mr Lash Maths" educational website (IGGS-tlelacheur.github.io), a GitHub Pages site hosting interactive mathematics learning tools for Ivanhoe Girls' Grammar School. The site consists of multiple self-contained educational modules, each focusing on different mathematical concepts.

## Repository Structure

The repository follows a modular structure where each subdirectory represents an independent learning tool:

- **Root `index.html`**: Homepage with card-based navigation to all tools
- **light-bot/**: Programming logic puzzle game using Flash/Ruffle emulation
- **regression/**: Interactive linear regression analysis tool
- **pseudocode/**: Pseudocode workshop with Python development server
- **chaoticballs/**: Physics simulation of bouncing balls with JavaScript and Python versions
- **pi-estimator/**: Multiple methods for estimating π
- **venn-diagrams/**: Excel-based Venn diagram activities
- **non-transitive_dice/**: Excel-based non-transitive dice educational material

## Development Approach

### Running Individual Tools

Most tools are standalone HTML applications:
- Open `index.html` directly in a web browser
- Or use any static file server (e.g., `python -m http.server`)

For tools with Python components:
- **pseudocode/**: Run `python simple_server.py` to start development server on port 8000
- **chaoticballs/**: Contains both JavaScript (web) and Python (standalone) versions

### Architecture Patterns

All web-based tools follow consistent patterns:
- **Single HTML file structure**: Each tool is typically one `index.html` with embedded CSS and JavaScript
- **Responsive design**: CSS Grid/Flexbox layouts for mobile compatibility
- **Vanilla JavaScript or minimal libraries**: Chart.js for data visualization, Ruffle for Flash content
- **Educational focus**: Step-by-step interfaces designed for learning
- **Self-contained modules**: No shared dependencies between tools

### Common Code Patterns

**Main page navigation**: Card-based layout where tools are displayed as interactive cards with icons, descriptions, and links

**Tool structure**: Each tool follows this pattern:
```html
<!DOCTYPE html>
<html>
<head>
    <!-- Embedded CSS for styling -->
</head>
<body>
    <!-- Interactive content -->
    <script>
        // Embedded JavaScript for functionality
    </script>
</body>
</html>
```

**Interactive elements**: Most tools use vanilla JavaScript for:
- DOM manipulation and event handling
- Mathematical calculations and algorithms
- Canvas-based graphics and animations
- Form validation and user input processing

### Development Commands

**No build process**: This is a static site with no package management or build tools

**Testing tools locally**:
- Static tools: Open HTML files directly in browser
- Tools with servers: `cd [tool-directory] && python simple_server.py`

**Adding new tools**:
1. Create new subdirectory with `index.html`
2. Follow existing responsive design patterns
3. Update main `index.html` navigation to include new tool
4. Use `addTool()` JavaScript function for dynamic tool addition

## Educational Context

This site serves as a teaching resource for mathematics education, with tools designed for:
- Computational thinking and programming logic
- Statistical analysis and data visualization
- Mathematical modeling and simulation
- Algorithm design and pseudocode development
- Interactive exploration of mathematical concepts

Each tool is designed to be pedagogically sound and accessible to students at various levels.