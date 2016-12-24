# dnd-yml2svg
Transforms special yml constructs to svg via graphviz's dot


## Requirements
- `Node` and `npm`: https://nodejs.org/en/
- `dot`, an executable, being in the `PATH`: http://www.graphviz.org/

## Installation
- `clone` this repo
- `npm install` to install packages

## Usage


- `gulp [build]` looks for `.yml` files in the root directory of the folder and creates the `svgs` in `./build/`.
- `gulp watch` continuously builds the `svgs` when the `.yml` source changes.
