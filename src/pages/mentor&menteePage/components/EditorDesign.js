import { loader } from "@monaco-editor/react";

export const setupMonacoEditorDesign = () => {
  loader.init().then((monaco) => {
    // Python
    monaco.languages.setMonarchTokensProvider("python", {
      tokenizer: {
        root: [
          [/(#.*$)/, "comment"],
          [/\b(print)(?=\s*\()/, "function"],
          [/\b(not|and|or|is|in|lambda)\b/, "operator"],
          [/\b(import|from|def|class|return|if|else|elif|try|except|raise|with|as|pass|break|continue|yield|while|for)\b/, "keyword"],
          [/\b(True|False|None)\b/, "constant"],
          [/\d+/, "number"],
          [/".*?"|'.*?'/, "string"],
          [/\b[a-zA-Z_][\w$]*(?=\s*\()/, "function"],
          [/[a-zA-Z_][\w$]*/, "identifier"],
          [/[{}()\[\]]/, "@brackets"],
        ],
      },
    });

    // Java
    monaco.languages.setMonarchTokensProvider("java", {
      tokenizer: {
        root: [
          [/\/\/.*$/, "comment"],
          [/\b(System|out|println)(?=\s*\()/, "function"],
          [/\b(public|private|protected|class|static|void|int|double|boolean|char|if|else|for|while|do|switch|case|default|return|new|try|catch|finally|throw|throws|import|package)\b/, "keyword"],
          [/\b(true|false|null)\b/, "constant"],
          [/\d+/, "number"],
          [/".*?"|'.*?'/, "string"],
          [/\b[a-zA-Z_][\w$]*(?=\s*\()/, "function"],
          [/[a-zA-Z_][\w$]*/, "identifier"],
          [/[{}()\[\]]/, "@brackets"],
          [/[=+\-*/%&|<>!]=?/, "operator"],
        ],
      },
    });

    // C
    monaco.languages.setMonarchTokensProvider("c", {
      tokenizer: {
        root: [
          [/\/\/.*$/, "comment"],
          [/\b(printf|scanf)(?=\s*\()/, "function"],
          [/\b(include|define|int|char|float|double|void|return|if|else|for|while|do|switch|case|default|break|continue)\b/, "keyword"],
          [/\b(true|false|NULL)\b/, "constant"],
          [/\d+/, "number"],
          [/".*?"|'.*?'/, "string"],
          [/\b[a-zA-Z_][\w$]*(?=\s*\()/, "function"],
          [/[a-zA-Z_][\w$]*/, "identifier"],
          [/[{}()\[\]]/, "@brackets"],
          [/[=+\-*/%&|<>!]=?/, "operator"],
        ],
      },
    });
    // C++
    monaco.languages.setMonarchTokensProvider("cpp", {
        tokenizer: {
        root: [
            [/\/\/.*$/, "comment"],
            [/\b(cout|cin|printf|scanf)(?=\s*\()/, "function"],
            [/\b(include|define|using|namespace|std|int|char|float|double|void|return|if|else|for|while|do|switch|case|default|break|continue|class|public|private|protected|new|delete|try|catch|throw)\b/, "keyword"],
            [/\b(true|false|nullptr|NULL)\b/, "constant"],
            [/\d+/, "number"],
            [/".*?"|'.*?'/, "string"],
            [/\b[a-zA-Z_][\w$]*(?=\s*\()/, "function"],
            [/[a-zA-Z_][\w$]*/, "identifier"],
            [/[{}()\[\]]/, "@brackets"],
            [/[=+\-*/%&|<>!]=?/, "operator"],
        ],
        },
    });

    // Custom Theme
    monaco.editor.defineTheme("myDarkTheme", {
      base: "vs-dark",
      inherit: true,
      rules: [
        { token: "comment", foreground: "6A9955" },
        { token: "keyword", foreground: "C586C0" },
        { token: "constant", foreground: "569CD6" },
        { token: "number", foreground: "B5CEA8" },
        { token: "string", foreground: "CE9178" },
        { token: "operator", foreground: "569CD6" },
        { token: "identifier", foreground: "9CDCFE" },
        { token: "function", foreground: "DCDCAA" },
      ],
      colors: {
        "editor.background": "#1E1E1E",
        "editor.foreground": "#D4D4D4",
        "editor.selectionBackground": "#264F78",
        "editor.lineHighlightBackground": "#2A2A2A",
        "editorCursor.foreground": "#AEAFAD",
        "editorIndentGuide.background": "#404040",
        "editorIndentGuide.activeBackground": "#707070",
      },
    });
  });
};
