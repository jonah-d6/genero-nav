import * as vscode from "vscode";

const FUNCTION_RE = /^[ \t]*(testable[ \t]+)?((public|private)[ \t]+)?function[ \t]+/gim;
const TEST_SECTION_RE = /^[ \t]*#[ \t]*(Arrange|Act|Assert)\b/gim;
const REGION_RE = /^[ \t]*#[ \t]*region\b/gim;



export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.commands.registerCommand("genero-nav.nextFunction", () => {
      jump(FUNCTION_RE, "next", false);
    }),
    vscode.commands.registerCommand("genero-nav.previousFunction", () => {
      jump(FUNCTION_RE, "previous", false);
    }),
    vscode.commands.registerCommand("genero-nav.nextTestSection", () => {
      jump(TEST_SECTION_RE, "next", false);
    }),
    vscode.commands.registerCommand("genero-nav.previousTestSection", () => {
      jump(TEST_SECTION_RE, "previous", false);
    }),
    vscode.commands.registerCommand("genero-nav.nextRegion", () => {
      jump(REGION_RE, "next", false);
    }),
    vscode.commands.registerCommand("genero-nav.previousRegion", () => {
      jump(REGION_RE, "previous", false);
    }),
    vscode.commands.registerCommand("genero-nav.selectToNextFunction", () => {
      jump(FUNCTION_RE, "next", true);
    }),
    vscode.commands.registerCommand("genero-nav.selectToPreviousFunction", () => {
      jump(FUNCTION_RE, "previous", true);
    }),
    vscode.commands.registerCommand("genero-nav.selectToNextTestSection", () => {
      jump(TEST_SECTION_RE, "next", true);
    }),
    vscode.commands.registerCommand("genero-nav.selectToPreviousTestSection", () => {
      jump(TEST_SECTION_RE, "previous", true);
    }),
    vscode.commands.registerCommand("genero-nav.selectToNextRegion", () => {
      jump(REGION_RE, "next", true);
    }),
    vscode.commands.registerCommand("genero-nav.selectToPreviousRegion", () => {
      jump(REGION_RE, "previous", true);
    })
  );
}

function jump(regex: RegExp, direction: "next" | "previous", select: boolean) {
  const editor = vscode.window.activeTextEditor;

  if (!editor) {
    return;
  }

  const doc = editor.document;
  const text = doc.getText();
  const cursorOffset = doc.offsetAt(editor.selection.active);

  regex.lastIndex = 0;
  const matches = [...text.matchAll(regex)];

  if (!matches.length) {
    return;
  }

  const target =
    direction === "next"
      ? matches.find((m) => (m.index ?? 0) > cursorOffset) ?? matches[0]
      : [...matches].reverse().find((m) => (m.index ?? 0) < cursorOffset) ?? matches[matches.length - 1];

  const pos = doc.positionAt(target.index ?? 0);
  if (select) {
    editor.selection = new vscode.Selection(editor.selection.anchor, pos);
  } else {
    editor.selection = new vscode.Selection(pos, pos);
  }
  editor.revealRange(new vscode.Range(pos, pos), vscode.TextEditorRevealType.InCenterIfOutsideViewport);
}

export function deactivate() {}