# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a single-page web application for least squares regression analysis. The project consists of a standalone HTML file (`index.html`) that provides an interactive tool for:
- Inputting X and Y variable data 
- Calculating linear regression statistics (slope, intercept, correlation, R-squared)
- Visualizing data with scatter plots and regression lines using Chart.js

## Development

This is a static HTML application with no build process, dependencies, or package management. All development is done directly on the single HTML file.

### Running the Application
- Open `index.html` directly in a web browser
- Or serve via any static file server (e.g., `python -m http.server`)

### Code Structure
- **HTML**: Basic page structure with input forms and results display
- **CSS**: Embedded styles for responsive grid layout and visual design
- **JavaScript**: 
  - `parseData()`: Parses comma-separated input values
  - `calculateRegression()`: Implements least squares regression algorithm
  - `generateGraph()`: Main function that orchestrates data validation, calculation, and chart rendering
  - Chart.js integration for scatter plots with regression lines

### Key Functions
- Data validation ensures equal-length datasets and prevents division by zero
- Regression calculations follow standard statistical formulas
- Chart rendering uses Chart.js scatter plot with overlay line dataset
- Error handling displays user-friendly messages for invalid inputs

This is educational/demonstration software focused on statistical computation and data visualization.