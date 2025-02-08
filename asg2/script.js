AFRAME.registerComponent("movement-constraint", {
    schema: {
      minX: { type: "number", default: -35 },
      maxX: { type: "number", default: 35 },
      minY: { type: "number", default: 1 },
      maxY: { type: "number", default: 15 },
      minZ: { type: "number", default: -35 },
      maxZ: { type: "number", default: 35 },
    },
    tick: function () {
      const camera = this.el;
      const position = camera.getAttribute("position");
  
      let x = Math.min(Math.max(position.x, this.data.minX), this.data.maxX);
      let y = Math.min(Math.max(position.y, this.data.minY), this.data.maxY);
      let z = Math.min(Math.max(position.z, this.data.minZ), this.data.maxZ);
  
      camera.setAttribute("position", { x: x, y: y, z: z });
    },
  });
  
  AFRAME.registerComponent("add-classroom-items", {
    init: function () {
      const scene = this.el;
  
      const deskPositions = [
        { x: -12, y: 0, z: 12 },
        { x: 12, y: 0, z: 12 },
        { x: -12, y: 0, z: 2 },
        { x: 12, y: 0, z: 2 },
        { x: -12, y: 0, z: -8 },
        { x: 12, y: 0, z: -8 },
      ];
  
      deskPositions.forEach((position, index) => {
        const desk = document.createElement("a-entity");
        desk.setAttribute("obj-model", "obj: #deskModel");
        desk.setAttribute("position", `${position.x} ${position.y} ${position.z}`);
        desk.setAttribute("scale", "0.9 0.9 0.9");
        desk.setAttribute("material", `color: ${index % 2 === 0 ? "#1e88e5" : "#d32f2f"}`);
        scene.appendChild(desk);
      });
  
      const window = document.createElement("a-plane");
      window.setAttribute("position", "-35 8 0");
      window.setAttribute("rotation", "0 90 0");
      window.setAttribute("width", "10");
      window.setAttribute("height", "7");
      window.setAttribute("material", "src: #windowTexture; transparent: true; opacity: 0.85; side: double");
      scene.appendChild(window);
  
      const blackboard = document.createElement("a-plane");
      blackboard.setAttribute("position", "0 6 -39");
      blackboard.setAttribute("rotation", "0 0 0");
      blackboard.setAttribute("width", "15");
      blackboard.setAttribute("height", "6");
      blackboard.setAttribute("material", "color: #1b5e20");
      scene.appendChild(blackboard);
  
      const floor = document.createElement("a-plane");
      floor.setAttribute("position", "0 0.01 0");
      floor.setAttribute("rotation", "-90 0 0");
      floor.setAttribute("width", "80");
      floor.setAttribute("height", "80");
      floor.setAttribute("material", "color: #e8e8e8; side: double");
      scene.appendChild(floor);
  
      const ceiling = document.createElement("a-plane");
      ceiling.setAttribute("position", "0 16.01 0");
      ceiling.setAttribute("rotation", "90 0 0");
      ceiling.setAttribute("width", "80");
      ceiling.setAttribute("height", "80");
      ceiling.setAttribute("material", "color: #ffffff; side: front");
      scene.appendChild(ceiling);
    },
  });
  