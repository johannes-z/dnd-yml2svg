# dnd-yml2svg
Transforms special yml constructs to svg via graphviz's dot


## Requirements
- `Node` and `npm`: https://nodejs.org/en/
- `dot`, an executable, being in the `PATH`: part of http://www.graphviz.org/

## Installation
- `clone` this repo
- `npm install` to install packages

## Usage
- `gulp [build]` looks for `.yml` files in the root directory of the folder and creates the `svgs` in `./build/`.
- `gulp watch` continuously builds the `svgs` when the `.yml` source changes.

## Customization
### SVG Output
You can change the `template.dot`, a `nunjucks` template, to adjust the generated graph to your needs. 
### File location
The gulpfile looks for `.yml` files from `./` by default. You can change the glob in `gulpfile.js`, if for example you want to make a subdirectory with your files.

## Example

### YML Definition File
Some of the content presented is part of the 'd20 System', a trademark of Wizards of the Coast, Inc. and are used according to the terms of the d20 System License version 6.0.
A copy of this License can be found at www.wizards.com/d20.

```yml
name: Test

doors:
  - &wooden_simple
    name: Simple wooden door
    hardness: 5
    hitpoints: 10
    href: "http://www.d20srd.org/srd/epic/obstacles.htm#doors"
  - &hidden_hatch
    name: Hidden hatch
    hardness: 5
    hitpoints: 10

traps:
  - &trap_basic-arrow
    name: Basic Arrow Trap
    type: mechanical
    attack: +10 ranged
    damage: 1d6 / x3, arrow
    search: 20
    disable: 20
    href: "http://www.d20srd.org/srd/traps.htm#cr1BasicArrowTrap"

rooms:
  - &kitchen
    name: Kitchen
  - &foyer
    name: Foyer
  - &hallway
    name: Hallway
  - &cellar
    name: Cellar

connections:
  - from: *kitchen
    to: *foyer
    via: 
      - <<: *wooden_simple
        twoway: true
        traps:
          - *trap_basic-arrow

  - from: *foyer
    to: *hallway
    via: 
      - <<: *wooden_simple
        twoway: true
        locked: 20
        traps:
          - *trap_basic-arrow

  - from: *kitchen
    to: *hallway
    via: 
      - <<: *wooden_simple
        twoway: true
        traps:
          - *trap_basic-arrow

  - from: *kitchen
    to: *cellar
    via:
      - <<: *hidden_hatch
        hidden: 25
        locked: 17
        traps:
          - *trap_basic-arrow
      - <<: *wooden_simple
        twoway: true
        
```

### Output
This is a preview of the above code as a `.png`. This tool created `.svg` though, so links that appear in the image will be clickable.

![alt text](https://cloud.githubusercontent.com/assets/9069888/21466990/1462ad42-c9dd-11e6-9296-d68d9262fd03.png "Example 1")

