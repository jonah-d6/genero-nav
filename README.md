# Genero Nav

Fast structural navigation for Genero (4GL) development in Visual Studio Code.

Genero Nav provides keyboard commands for jumping between function declarations and unit test sections without opening the Find widget, modifying the search register, or displaying search highlights.

## Features

### Function Navigation

Jump directly between Genero function declarations.

Supported declarations:

```4gl
function calculate_total()

public function calculate_total()

private function calculate_total()
```

Ignored matches:

```4gl
end function
```

### Test Section Navigation

Jump between Arrange / Act / Assert sections in unit tests.

Supported markers:

```4gl
# Arrange

# Act

# Assert
```

### Region Navigation

Jump between regions in unit tests.

Supported markers:

```4gl
# region <region_name>
```

## Commands

| Command                             | Description                                     |
| ----------------------------------- | ----------------------------------------------- |
| Genero: Go to Next Function         | Jump to the next function declaration           |
| Genero: Go to Previous Function     | Jump to the previous function declaration       |
| Genero: Go to Next Test Section     | Jump to the next Arrange/Act/Assert section     |
| Genero: Go to Previous Test Section | Jump to the previous Arrange/Act/Assert section |
| Genero: Go to Next Region | Jump to the next region
| Genero: Go to Previous Region | Jump to the previous region

## VSCodeVim Example

```json
{
  "vim.normalModeKeyBindingsNonRecursive": [
    {
      "before": ["<leader>", "f"],
      "commands": ["genero-nav.nextFunction"]
    },
    {
      "before": ["<leader>", "F"],
      "commands": ["genero-nav.previousFunction"]
    },
    {
      "before": ["<leader>", "n"],
      "commands": ["genero-nav.nextTestSection"]
    },
    {
      "before": ["<leader>", "N"],
      "commands": ["genero-nav.previousTestSection"]
    },
    {
      "before": ["<leader>", "r"],
      "commands": ["genero-nav.nextRegion"]
    },
    {
      "before": ["<leader>", "R"],
      "commands": ["genero-nav.previousRegion"]
    }
  ]
}
```

## Standard VS Code Keybindings Example

```json
[
  {
    "key": "alt+]",
    "command": "genero-nav.nextFunction"
  },
  {
    "key": "alt+[",
    "command": "genero-nav.previousFunction"
  },
  {
    "key": "alt+shift+]",
    "command": "genero-nav.nextTestSection"
  },
  {
    "key": "alt+shift+[",
    "command": "genero-nav.previousTestSection"
  },
  {
    "key": "ctrl+shift+]",
    "command": "genero-nav.nextRegion"
  },
  {
    "key": "ctrl+shift+[",
    "command": "genero-nav.previousRegion"
  }
]
```

## Installation

### Install from VSIX

1. Open the Extensions view (`Ctrl+Shift+X`).
2. Open the `...` menu.
3. Select **Install from VSIX...**
4. Choose the downloaded `.vsix` file.

## Selection Commands and VSCodeVim

The `Select to ...` commands extend the current VS Code selection to the target location. When used from VSCodeVim visual mode, they may normalize the selection to character-wise visual mode, regardless of whether previously in character-wise visual mode, visual block mode, or visual line mode. This is expected because VS Code extensions do not receive or preserve VSCodeVim’s visual line/block mode metadata.

## Requirements

* Visual Studio Code 1.108 or newer

## License

MIT
