# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is the "Non-Transitive Dice" project, a part of the Mr Lash Maths educational website (IGGS-tlelacheur.github.io). The project currently contains only an Excel spreadsheet (`Non-Transitive Dice.xlsx`) that appears to be educational material about non-transitive dice concepts.

## Repository Structure

This is part of a larger GitHub Pages site (`IGGS-tlelacheur.github.io`) that hosts multiple interactive mathematics learning tools:

- **Main site**: Root `index.html` serves as homepage linking to all tools
- **light-bot/**: Programming logic puzzle game (HTML + Flash SWF)
- **regression/**: Interactive linear regression analysis tool (standalone HTML)
- **pseudocode/**: Pseudocode workshop with Python server (HTML + Python)
- **chaoticballs/**: Physics simulation of bouncing balls (HTML + JavaScript + Python)
- **pi-estimator/**: Multiple methods for estimating π (standalone HTML)
- **venn-diagrams/**: Contains Excel file for Venn diagram activities
- **non-transitive_dice/**: Current directory with Excel educational material

## Development Approach

This is primarily a static educational website with self-contained tools. Each subdirectory represents an independent learning module:

### Running Individual Tools
- Most tools are standalone HTML files that can be opened directly in browsers
- For tools with Python components (like pseudocode), run the Python server first
- No global build process - each tool is self-contained

### Common Patterns
- Each tool typically consists of a single `index.html` file with embedded CSS and JavaScript
- Interactive elements use vanilla JavaScript or libraries like Chart.js
- Responsive design with CSS Grid/Flexbox for mobile compatibility
- Educational focus with step-by-step learning interfaces

## Current Project Status

The non-transitive_dice directory currently only contains an Excel file. To develop this into a web-based tool like the other modules, you would typically:

1. Create an `index.html` file with interactive dice simulation
2. Implement JavaScript for dice rolling and probability visualization
3. Follow the same responsive design patterns as other tools
4. Potentially reference the Excel content for educational objectives

## Site Navigation

The main site uses a card-based layout where each tool is accessible via navigation. Any new web-based implementation should integrate with the main site's navigation structure.