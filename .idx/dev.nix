
{ pkgs, ... }: {
  # NixOS channel to use.
  channel = "stable-24.05";

  # Packages to make available in the environment.
  packages = [
    pkgs.nodejs_20  # Node.js for React development
  ];

  # VS Code extensions to install.
  idx.extensions = [
    "dbaeumer.vscode-eslint" # ESLint for code quality
  ];

  # Workspace lifecycle hooks.
  idx.workspace = {
    # Runs when the workspace is first created.
    onCreate = {
      # Use Vite to create a new React project in the current directory.
      init = "npm create vite@latest . -- --template react";
      # Install project dependencies.
      npm-install = "npm install";
      # Install additional packages for Firebase and UI.
      install-deps = "npm install firebase react-bootstrap bootstrap react-router-dom";
    };

    # Runs every time the workspace is (re)started.
    onStart = {
      # Start the development server.
      dev-server = "npm run dev";
    };
  };

  # Configure a web preview for the application.
  idx.previews = {
    enable = true;
    previews = {
      web = {
        # Command to start the dev server and expose it on $PORT.
        command = ["npm" "run" "dev" "--" "--port" "$PORT"];
        manager = "web";
      };
    };
  };
}
