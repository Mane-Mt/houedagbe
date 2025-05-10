
function addButton(label, panel) {
    var button = BABYLON.GUI.Button.CreateImageButton(
      "button",
      label.toUpperCase(),
      "/assets/UI/menuButton.svg"
    );
    let image = button.image;
    image.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
    image.width = "300px";
    image.height = "200px";
    image.topInPixels = 0;
    let text = button.textBlock;
    text.width = "300px";
    text.zIndex = 10;
    text.topInPixels = -5;
    text.paddingRightInPixels = 50;
    text.textHorizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
    text.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_CENTER;
    button.fontSize = "26px";
    button.width = "300px";
    button.height = "100px";
    button.color = "#a6fffa";
    button.thickness = 0;
    button.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
    button.onPointerEnterObservable.add(() => {
      image.topInPixels = -100;
      button.color = "#ffffff";
    });
    button.onPointerOutObservable.add(() => {
      image.topInPixels = 0;
      button.color = "#a6fffa";
    });
    panel.addControl(button);
    return button;
  }
  
  function createTextPanel(parentGrid) {
    let textPanelUL = new BABYLON.GUI.Image(
      "bottomBarLeft",
      "/assets/UI/textPanelUL.svg"
    );
    let textPanelUC = new BABYLON.GUI.Image(
      "bottomBarCenter",
      "/assets/UI/textPanelUC.svg"
    );
    let textPanelUR = new BABYLON.GUI.Image(
      "bottomBarRight",
      "/assets/UI/textPanelUR.svg"
    );
    let textPanelCL = new BABYLON.GUI.Image(
      "bottomBarLeft",
      "/assets/UI/textPanelCL.svg"
    );
    let textPanelCC = new BABYLON.GUI.Image(
      "bottomBarCenter",
      "/assets/UI/textPanelCC.svg"
    );
    let textPanelCR = new BABYLON.GUI.Image(
      "bottomBarRight",
      "/assets/UI/textPanelCR.svg"
    );
    let textPanelLL = new BABYLON.GUI.Image(
      "bottomBarLeft",
      "/assets/UI/textPanelLL.svg"
    );
    let textPanelLC = new BABYLON.GUI.Image(
      "bottomBarCenter",
      "/assets/UI/textPanelLC.svg"
    );
    let textPanelLR = new BABYLON.GUI.Image(
      "bottomBarRight",
      "/assets/UI/textPanelLR.svg"
    );
    let grid = new BABYLON.GUI.Grid();
    grid.clipChildren = false;
    grid.addRowDefinition(170, true);
    grid.addRowDefinition(1.0, false);
    grid.addRowDefinition(220, true);
    grid.addColumnDefinition(340, true);
    grid.addColumnDefinition(1.0, false);
    grid.addColumnDefinition(440, true);
    grid.topInPixels = 50;
    grid.width = 0.9;
    grid.height = 0.8;
    grid.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
    grid.verticalAlignment = BABYLON.GUIControl.VERTICAL_ALIGNMENT_TOP;
    grid.addControl(textPanelUL, 0, 0);
    grid.addControl(textPanelUC, 0, 1);
    grid.addControl(textPanelUR, 0, 2);
    grid.addControl(textPanelCL, 1, 0);
    grid.addControl(textPanelCC, 1, 1);
    grid.addControl(textPanelCR, 1, 2);
    grid.addControl(textPanelLL, 2, 0);
    grid.addControl(textPanelLC, 2, 1);
    grid.addControl(textPanelLR, 2, 2);
    parentGrid.addControl(grid, 0, 1);
    return grid;
  }
  
  function createBottomBar(adt) {
    let bottomBarLeft = new BABYLON.GUI.Image(
      "bottomBarLeft",
      "/assets/UI/bottomBarLeft.svg"
    );
    let grid = new BABYLON.GUI.Grid();
    grid.addRowDefinition(270, true);
    grid.addColumnDefinition(645, true);
    grid.addColumnDefinition(1.0, false);
    grid.addColumnDefinition(790, true);
    grid.width = 0.914;
    grid.heightInPixels = 270;
    grid.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
    grid.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;
    grid.addControl(bottomBarLeft, 0, 0);
    adt.addControl(grid);
  }
  
  function formatButtonGrid(grid) {
    grid.addRowDefinition(1.0, false);
    grid.addRowDefinition(140, true);
    grid.addColumnDefinition(0.23, false);
    grid.addColumnDefinition(0.77, false);
    grid.width = 0.914;
    grid.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
  }
  
  function showDialog(nom, message, portraitUrl) {
    const gui = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("dialogUI");
  
    const dialogBox = new BABYLON.GUI.Rectangle();
    dialogBox.width = "35%";
    dialogBox.height = "180px";
    dialogBox.cornerRadius = 10;
    dialogBox.color = "white";
    dialogBox.background = "#2d2d2d";
    dialogBox.thickness = 2;
  
    // Position bas gauche de l'écran
    dialogBox.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
    dialogBox.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;
    dialogBox.paddingLeft = "20px";
    dialogBox.paddingBottom = "20px";
  
    gui.addControl(dialogBox);
  
    // Conteneur horizontal pour portrait + texte
    const mainPanel = new BABYLON.GUI.StackPanel();
    mainPanel.isVertical = false;
    dialogBox.addControl(mainPanel);
  
    // Image du portrait
    const image = new BABYLON.GUI.Image("portrait", portraitUrl);
    image.width = "80px";
    image.height = "80px";
    image.paddingTop = "10px";
    image.paddingLeft = "10px";
    image.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
    image.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
    mainPanel.addControl(image);
  
    // Panneau pour le nom + message
    const textPanel = new BABYLON.GUI.StackPanel();
    textPanel.width = "100%";
    textPanel.paddingLeft = "10px";
    textPanel.paddingTop = "10px";
    mainPanel.addControl(textPanel);
  
    // Nom du personnage
    const title = new BABYLON.GUI.TextBlock();
    title.text = nom;
    title.height = "30px";
    title.color = "#ffd700";
    title.fontSize = "20px";
    title.textHorizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
    textPanel.addControl(title);
  
    // Texte du message
    const text = new BABYLON.GUI.TextBlock();
    text.text = message;
    text.color = "white";
    text.fontSize = "16px";
    text.textWrapping = true;
    text.textHorizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
    text.paddingRight = "10px";
    textPanel.addControl(text);
  }
  