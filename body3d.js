/**
 * PlaySafe Recovery Hub - 3D Body Engine (Three.js & OrbitControls)
 * Builds an interactive, stylized human anatomical figure using Three.js primitives.
 * Features:
 * - OrbitControls with 360-degree rotation, zoom boundaries, and vertical limit
 * - Auto-rotation with 3-second resume after user interaction
 * - Camera view angle presets (Front, Back, Left, Right)
 * - Male / Female proportions morphing with smooth animations
 * - Precision Raycaster with drag-vs-tap filter (<= 6px threshold)
 * - Front vs. Back anatomical region discrimination based on Z-plane
 * - Animated glowing pulsing pinpoint indicator
 * - Dynamic mesh highlighting with material restoration
 * - Hover tooltip and cursor feedback for desktop users
 * - Full responsive canvas resize handling
 */

class Body3DEngine {
  constructor(canvasContainerId, options = {}) {
    this.container = document.getElementById(canvasContainerId);
    if (!this.container) {
      console.error(`Container #${canvasContainerId} not found.`);
      return;
    }

    this.onSelect = options.onSelect || null;
    this.onHover = options.onHover || null;

    // State
    this.gender = "male"; // "male" or "female"
    this.isAutoRotateEnabled = true;
    this.userPaused = false;
    this.resumeTimeout = null;
    this.clickableMeshes = [];
    this.selectedMesh = null;
    this.hoveredMesh = null;

    // Pointer tracking for tap vs drag discrimination
    this.pointerDownPos = { x: 0, y: 0 };
    this.isPointerDown = false;

    // Camera animation state
    this.isCameraAnimating = false;
    this.cameraTargetPos = null;

    // Morph animation targets
    this.morphProgress = 1.0;
    this.morphValues = {
      chestScaleX: 1.15,
      chestScaleZ: 1.05,
      shoulderOffsetX: 0.62,
      hipScaleX: 0.94,
      hipScaleZ: 0.95
    };
    this.targetMorphValues = { ...this.morphValues };

    // Default & Highlight Materials
    this.defaultMaterial = new THREE.MeshStandardMaterial({
      color: 0xc7d2fe, // Soft athletic periwinkle/cyan tone
      roughness: 0.45,
      metalness: 0.08,
      flatShading: false
    });

    this.highlightMaterial = new THREE.MeshStandardMaterial({
      color: 0xf97316, // Vibrant recovery orange
      roughness: 0.35,
      metalness: 0.15,
      emissive: 0x7c2d12,
      emissiveIntensity: 0.3
    });

    this.hoverMaterial = new THREE.MeshStandardMaterial({
      color: 0x93c5fd, // Soft hover blue
      roughness: 0.4,
      metalness: 0.1
    });

    this.init();
  }

  init() {
    const width = this.container.clientWidth || window.innerWidth;
    const height = this.container.clientHeight || window.innerHeight;

    // 1. Scene
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0xf8fafc); // Matches brand off-white

    // 2. Camera
    this.camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    this.camera.position.set(0, 1.6, 5.0); // Focus at anatomical center

    // 3. Renderer
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.container.appendChild(this.renderer.domElement);

    // 4. Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.75);
    this.scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 0.7);
    keyLight.position.set(4, 8, 6);
    keyLight.castShadow = true;
    this.scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xdbeafe, 0.4);
    fillLight.position.set(-4, 4, -5);
    this.scene.add(fillLight);

    // 5. Controls
    this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.08;
    this.controls.target.set(0, 1.6, 0); // Torso center
    this.controls.minDistance = 2.4;
    this.controls.maxDistance = 7.5;
    this.controls.enablePan = false; // Disable panning as requested
    // Restrict polar angle so figure cannot flip upside down
    this.controls.minPolarAngle = Math.PI * 0.18;
    this.controls.maxPolarAngle = Math.PI * 0.78;
    // Auto-rotation setup
    this.controls.autoRotate = true;
    this.controls.autoRotateSpeed = 1.2;

    // 6. Build Scene Objects (Floor & Body Figure)
    this.buildEnvironment();
    this.buildBody();
    this.createPulsingPin();

    // 7. Raycaster Setup
    this.raycaster = new THREE.Raycaster();
    this.pointer = new THREE.Vector2();

    // 8. Event Listeners
    this.setupEventListeners();

    // 9. Start Clock & Render Loop
    this.clock = new THREE.Clock();
    this.animate = this.animate.bind(this);
    requestAnimationFrame(this.animate);
  }

  buildEnvironment() {
    // Subtle floor shadow disc beneath feet
    const shadowGeo = new THREE.CircleGeometry(1.25, 48);
    const shadowMat = new THREE.MeshBasicMaterial({
      color: 0x0f172a,
      transparent: true,
      opacity: 0.07,
      depthWrite: false
    });
    const shadowMesh = new THREE.Mesh(shadowGeo, shadowMat);
    shadowMesh.rotation.x = -Math.PI / 2;
    shadowMesh.position.y = 0.005;
    this.scene.add(shadowMesh);
  }

  buildBody() {
    this.bodyGroup = new THREE.Group();
    this.scene.add(this.bodyGroup);

    // Helper for adding labeled parts
    const addMesh = (geo, regionId, x = 0, y = 0, z = 0, rotX = 0, rotY = 0, rotZ = 0) => {
      const mesh = new THREE.Mesh(geo, this.defaultMaterial.clone());
      mesh.position.set(x, y, z);
      mesh.rotation.set(rotX, rotY, rotZ);
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      mesh.userData = { regionId: regionId };
      this.clickableMeshes.push(mesh);
      return mesh;
    };

    // --- Head & Neck ---
    // Head: slightly elongated sphere
    const headGeo = new THREE.SphereGeometry(0.24, 28, 28);
    headGeo.scale(0.85, 1.1, 0.95);
    this.headMesh = addMesh(headGeo, "head", 0, 3.12, 0);
    this.bodyGroup.add(this.headMesh);

    // Neck: cylinder
    const neckGeo = new THREE.CylinderGeometry(0.11, 0.13, 0.22, 24);
    this.neckMesh = addMesh(neckGeo, "neck", 0, 2.82, 0);
    this.bodyGroup.add(this.neckMesh);

    // --- Torso & Spine ---
    // Chest / Upper Torso
    this.chestGeo = new THREE.CylinderGeometry(0.38, 0.32, 0.44, 28);
    this.chestGeo.scale(1.15, 1.0, 0.78);
    this.chestMesh = addMesh(this.chestGeo, "torso_upper", 0, 2.52, 0);
    this.bodyGroup.add(this.chestMesh);

    // Abdomen / Lower Torso
    const abdomenGeo = new THREE.CylinderGeometry(0.31, 0.34, 0.36, 28);
    abdomenGeo.scale(1.02, 1.0, 0.75);
    this.abdomenMesh = addMesh(abdomenGeo, "torso_lower", 0, 2.14, 0);
    this.bodyGroup.add(this.abdomenMesh);

    // Pelvis / Hips
    this.pelvisGeo = new THREE.CylinderGeometry(0.34, 0.28, 0.32, 28);
    this.pelvisGeo.scale(1.05, 1.0, 0.82);
    this.pelvisMesh = addMesh(this.pelvisGeo, "left_hip", 0, 1.82, 0);
    // Notice: Raycasting splits hip by x coordinate (left vs right)
    this.bodyGroup.add(this.pelvisMesh);

    // --- Shoulders ---
    this.shoulderJointGeo = new THREE.SphereGeometry(0.14, 20, 20);

    // Left Shoulder
    this.leftShoulder = addMesh(this.shoulderJointGeo, "left_shoulder", -0.58, 2.64, 0);
    this.bodyGroup.add(this.leftShoulder);

    // Right Shoulder
    this.rightShoulder = addMesh(this.shoulderJointGeo, "right_shoulder", 0.58, 2.64, 0);
    this.bodyGroup.add(this.rightShoulder);

    // --- Arms (Angled outward ~22 degrees in athletic A-pose) ---
    const armAngle = 0.38; // ~22 degrees
    const armRadiusTop = 0.105;
    const armRadiusBottom = 0.09;
    const upperArmLength = 0.44;

    // Left Upper Arm
    const leftArmGeo = new THREE.CylinderGeometry(armRadiusTop, armRadiusBottom, upperArmLength, 20);
    this.leftUpperArm = addMesh(leftArmGeo, "left_upper_arm", -0.76, 2.34, 0, 0, 0, -armAngle);
    this.bodyGroup.add(this.leftUpperArm);

    // Right Upper Arm
    const rightArmGeo = new THREE.CylinderGeometry(armRadiusTop, armRadiusBottom, upperArmLength, 20);
    this.rightUpperArm = addMesh(rightArmGeo, "right_upper_arm", 0.76, 2.34, 0, 0, 0, armAngle);
    this.bodyGroup.add(this.rightUpperArm);

    // Elbows
    const elbowGeo = new THREE.SphereGeometry(0.095, 16, 16);
    this.leftElbow = addMesh(elbowGeo, "left_elbow", -0.93, 2.06, 0);
    this.rightElbow = addMesh(elbowGeo, "right_elbow", 0.93, 2.06, 0);
    this.bodyGroup.add(this.leftElbow);
    this.bodyGroup.add(this.rightElbow);

    // Forearms
    const forearmLength = 0.40;
    const leftForearmGeo = new THREE.CylinderGeometry(0.085, 0.075, forearmLength, 20);
    this.leftForearm = addMesh(leftForearmGeo, "left_forearm", -1.09, 1.78, 0, 0, 0, -armAngle * 0.9);
    this.bodyGroup.add(this.leftForearm);

    const rightForearmGeo = new THREE.CylinderGeometry(0.085, 0.075, forearmLength, 20);
    this.rightForearm = addMesh(rightForearmGeo, "right_forearm", 1.09, 1.78, 0, 0, 0, armAngle * 0.9);
    this.bodyGroup.add(this.rightForearm);

    // Wrists
    const wristGeo = new THREE.SphereGeometry(0.075, 16, 16);
    this.leftWrist = addMesh(wristGeo, "left_wrist", -1.23, 1.52, 0);
    this.rightWrist = addMesh(wristGeo, "right_wrist", 1.23, 1.52, 0);
    this.bodyGroup.add(this.leftWrist);
    this.bodyGroup.add(this.rightWrist);

    // Hands
    const handGeo = new THREE.SphereGeometry(0.09, 16, 16);
    handGeo.scale(0.85, 1.35, 0.6);
    this.leftHand = addMesh(handGeo, "left_hand", -1.31, 1.35, 0, 0, 0, -armAngle * 0.8);
    this.rightHand = addMesh(handGeo, "right_hand", 1.31, 1.35, 0, 0, 0, armAngle * 0.8);
    this.bodyGroup.add(this.leftHand);
    this.bodyGroup.add(this.rightHand);

    // --- Legs (Athletic Stance, slightly abducted ~7 degrees) ---
    const legAngle = 0.11; // ~6.5 degrees
    const thighLength = 0.58;
    const thighRadiusTop = 0.17;
    const thighRadiusBottom = 0.13;

    // Thighs
    const leftThighGeo = new THREE.CylinderGeometry(thighRadiusTop, thighRadiusBottom, thighLength, 24);
    this.leftThigh = addMesh(leftThighGeo, "left_thigh", -0.27, 1.44, 0, 0, 0, -legAngle);
    this.bodyGroup.add(this.leftThigh);

    const rightThighGeo = new THREE.CylinderGeometry(thighRadiusTop, thighRadiusBottom, thighLength, 24);
    this.rightThigh = addMesh(rightThighGeo, "right_thigh", 0.27, 1.44, 0, 0, 0, legAngle);
    this.bodyGroup.add(this.rightThigh);

    // Knees
    const kneeGeo = new THREE.SphereGeometry(0.13, 20, 20);
    kneeGeo.scale(1.0, 1.05, 1.05);
    this.leftKnee = addMesh(kneeGeo, "left_knee", -0.34, 1.08, 0);
    this.rightKnee = addMesh(kneeGeo, "right_knee", 0.34, 1.08, 0);
    this.bodyGroup.add(this.leftKnee);
    this.bodyGroup.add(this.rightKnee);

    // Shins / Calves (Lower Legs)
    const shinLength = 0.58;
    const shinRadiusTop = 0.125;
    const shinRadiusBottom = 0.095;

    const leftShinGeo = new THREE.CylinderGeometry(shinRadiusTop, shinRadiusBottom, shinLength, 24);
    this.leftLowerLeg = addMesh(leftShinGeo, "left_lower_leg", -0.37, 0.72, 0, 0, 0, -legAngle * 0.4);
    this.bodyGroup.add(this.leftLowerLeg);

    const rightShinGeo = new THREE.CylinderGeometry(shinRadiusTop, shinRadiusBottom, shinLength, 24);
    this.rightLowerLeg = addMesh(rightShinGeo, "right_lower_leg", 0.37, 0.72, 0, 0, 0, legAngle * 0.4);
    this.bodyGroup.add(this.rightLowerLeg);

    // Ankles
    const ankleGeo = new THREE.SphereGeometry(0.095, 16, 16);
    this.leftAnkle = addMesh(ankleGeo, "left_ankle", -0.39, 0.38, 0);
    this.rightAnkle = addMesh(ankleGeo, "right_ankle", 0.39, 0.38, 0);
    this.bodyGroup.add(this.leftAnkle);
    this.bodyGroup.add(this.rightAnkle);

    // Feet (pointing slightly forward/outward)
    const footGeo = new THREE.BoxGeometry(0.16, 0.11, 0.38);
    // Align foot pivot so bottom touches ground
    footGeo.translate(0, 0, 0.08);
    this.leftFoot = addMesh(footGeo, "left_foot", -0.41, 0.16, 0, 0, -0.15, 0);
    this.rightFoot = addMesh(footGeo, "right_foot", 0.41, 0.16, 0, 0, 0.15, 0);
    this.bodyGroup.add(this.leftFoot);
    this.bodyGroup.add(this.rightFoot);
  }

  createPulsingPin() {
    this.pinGroup = new THREE.Group();
    this.pinGroup.visible = false;

    // Glowing core sphere
    const pinCoreGeo = new THREE.SphereGeometry(0.045, 16, 16);
    const pinCoreMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const pinCore = new THREE.Mesh(pinCoreGeo, pinCoreMat);
    this.pinGroup.add(pinCore);

    // Outer pulsing ring
    const pinRingGeo = new THREE.RingGeometry(0.05, 0.085, 32);
    this.pinRingMat = new THREE.MeshBasicMaterial({
      color: 0xf97316,
      transparent: true,
      opacity: 0.85,
      side: THREE.DoubleSide
    });
    this.pinRing = new THREE.Mesh(pinRingGeo, this.pinRingMat);
    this.pinGroup.add(this.pinRing);

    // Soft outer glow sphere
    const glowGeo = new THREE.SphereGeometry(0.085, 16, 16);
    this.glowMat = new THREE.MeshBasicMaterial({
      color: 0xf97316,
      transparent: true,
      opacity: 0.4
    });
    this.pinGlow = new THREE.Mesh(glowGeo, this.glowMat);
    this.pinGroup.add(this.pinGlow);

    this.scene.add(this.pinGroup);
  }

  setGender(gender) {
    if (gender === this.gender) return;
    this.gender = gender;

    if (gender === "male") {
      // Broader shoulders & chest, narrower hips
      this.targetMorphValues = {
        chestScaleX: 1.15,
        chestScaleZ: 1.05,
        shoulderOffsetX: 0.62,
        hipScaleX: 0.94,
        hipScaleZ: 0.95
      };
    } else {
      // Narrower shoulders, wider hips & pelvis
      this.targetMorphValues = {
        chestScaleX: 0.94,
        chestScaleZ: 0.98,
        shoulderOffsetX: 0.51,
        hipScaleX: 1.18,
        hipScaleZ: 1.10
      };
    }
  }

  updateMorph(delta) {
    // Smooth lerp interpolation for morphing proportions
    const lerpSpeed = Math.min(delta * 6.0, 1.0);
    let changed = false;

    for (const key in this.targetMorphValues) {
      const diff = this.targetMorphValues[key] - this.morphValues[key];
      if (Math.abs(diff) > 0.001) {
        this.morphValues[key] += diff * lerpSpeed;
        changed = true;
      } else {
        this.morphValues[key] = this.targetMorphValues[key];
      }
    }

    if (changed) {
      // Apply chest scale
      this.chestMesh.scale.set(this.morphValues.chestScaleX, 1.0, this.morphValues.chestScaleZ);

      // Apply shoulder position offset
      this.leftShoulder.position.x = -this.morphValues.shoulderOffsetX;
      this.rightShoulder.position.x = this.morphValues.shoulderOffsetX;

      // Adjust upper arm attachment points to meet shoulders
      this.leftUpperArm.position.x = -this.morphValues.shoulderOffsetX - 0.18;
      this.rightUpperArm.position.x = this.morphValues.shoulderOffsetX + 0.18;

      // Apply pelvis/hips scale
      this.pelvisMesh.scale.set(this.morphValues.hipScaleX, 1.0, this.morphValues.hipScaleZ);
    }
  }

  setupEventListeners() {
    const domElement = this.renderer.domElement;

    // Track pointerdown coordinates to filter drag vs tap
    domElement.addEventListener("pointerdown", (e) => {
      this.isPointerDown = true;
      this.pointerDownPos = { x: e.clientX, y: e.clientY };

      // Temporarily halt auto-rotation on touch/drag
      this.pauseAutoRotateTemporarily();
    });

    // Detect tap on pointerup if movement <= 6px
    domElement.addEventListener("pointerup", (e) => {
      this.isPointerDown = false;
      const dx = e.clientX - this.pointerDownPos.x;
      const dy = e.clientY - this.pointerDownPos.y;
      const distance = Math.hypot(dx, dy);

      // If movement is within 6px threshold, treat as an intentional TAP
      if (distance <= 6) {
        this.handleTap(e.clientX, e.clientY);
      }

      // Schedule auto-rotation resume after 3 seconds of no interaction
      this.scheduleAutoRotateResume();
    });

    // Desktop hover tooltip & cursor styling
    domElement.addEventListener("pointermove", (e) => {
      // Only check hover when not dragging
      if (!this.isPointerDown) {
        this.handlePointerHover(e.clientX, e.clientY);
      }
    });

    domElement.addEventListener("pointerleave", () => {
      if (this.onHover) this.onHover(null);
      domElement.style.cursor = "default";
      this.clearHoverHighlight();
    });

    // Responsive window & orientation resize handling
    window.addEventListener("resize", () => this.handleResize());
  }

  handleResize() {
    if (!this.container || !this.renderer || !this.camera) return;
    const width = this.container.clientWidth;
    const height = this.container.clientHeight;

    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  }

  pauseAutoRotateTemporarily() {
    this.controls.autoRotate = false;
    if (this.resumeTimeout) {
      clearTimeout(this.resumeTimeout);
      this.resumeTimeout = null;
    }
  }

  scheduleAutoRotateResume() {
    if (this.userPaused || !this.isAutoRotateEnabled) return;
    if (this.resumeTimeout) clearTimeout(this.resumeTimeout);

    // 3 seconds of inactivity resume
    this.resumeTimeout = setTimeout(() => {
      if (!this.userPaused && this.isAutoRotateEnabled) {
        this.controls.autoRotate = true;
      }
    }, 3000);
  }

  toggleAutoRotate() {
    this.userPaused = !this.userPaused;
    this.controls.autoRotate = !this.userPaused;
    return !this.userPaused;
  }

  setCameraPreset(viewName) {
    this.pauseAutoRotateTemporarily();
    const distance = 4.8;
    const yTarget = 1.6;

    let targetCoords = { x: 0, y: yTarget, z: distance };
    switch (viewName.toLowerCase()) {
      case "front":
        targetCoords = { x: 0, y: yTarget, z: distance };
        break;
      case "back":
        targetCoords = { x: 0, y: yTarget, z: -distance };
        break;
      case "left":
        targetCoords = { x: -distance, y: yTarget, z: 0 };
        break;
      case "right":
        targetCoords = { x: distance, y: yTarget, z: 0 };
        break;
    }

    this.cameraTargetPos = targetCoords;
    this.isCameraAnimating = true;
    this.scheduleAutoRotateResume();
  }

  handleTap(clientX, clientY) {
    const rect = this.renderer.domElement.getBoundingClientRect();
    this.pointer.x = ((clientX - rect.left) / rect.width) * 2 - 1;
    this.pointer.y = -((clientY - rect.top) / rect.height) * 2 + 1;

    this.raycaster.setFromCamera(this.pointer, this.camera);
    const intersects = this.raycaster.intersectObjects(this.clickableMeshes, false);

    if (intersects.length > 0) {
      const hit = intersects[0];
      const mesh = hit.object;
      let regionId = mesh.userData.regionId;

      // Special resolution for pelvis / hips based on left vs right X-axis
      if (regionId === "left_hip" || regionId === "right_hip") {
        regionId = hit.point.x < 0 ? "left_hip" : "right_hip";
      }

      // Determine Front vs Back based on Z-plane coordinate relative to body center
      // z >= 0 is Anterior (Front), z < 0 is Posterior (Back)
      const isBack = hit.point.z < 0;

      // Position glowing pinpoint indicator along normal
      const normal = hit.face ? hit.face.normal.clone().transformDirection(mesh.matrixWorld) : new THREE.Vector3(0, 0, 1);
      const pinPos = hit.point.clone().add(normal.multiplyScalar(0.035));
      this.pinGroup.position.copy(pinPos);
      this.pinGroup.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), normal);
      this.pinGroup.visible = true;

      // Highlight selected mesh
      this.highlightMesh(mesh);

      // Invoke external selection callback
      if (this.onSelect) {
        this.onSelect({
          regionId: regionId,
          isBack: isBack,
          point: hit.point,
          mesh: mesh
        });
      }
    }
  }

  highlightMesh(mesh) {
    // Restore previous mesh material
    if (this.selectedMesh && this.selectedMesh !== mesh) {
      this.selectedMesh.material = this.defaultMaterial.clone();
    }

    this.selectedMesh = mesh;
    this.selectedMesh.material = this.highlightMaterial;
  }

  clearSelection() {
    if (this.selectedMesh) {
      this.selectedMesh.material = this.defaultMaterial.clone();
      this.selectedMesh = null;
    }
    this.pinGroup.visible = false;
  }

  handlePointerHover(clientX, clientY) {
    const rect = this.renderer.domElement.getBoundingClientRect();
    this.pointer.x = ((clientX - rect.left) / rect.width) * 2 - 1;
    this.pointer.y = -((clientY - rect.top) / rect.height) * 2 + 1;

    this.raycaster.setFromCamera(this.pointer, this.camera);
    const intersects = this.raycaster.intersectObjects(this.clickableMeshes, false);

    if (intersects.length > 0) {
      const hit = intersects[0];
      let regionId = hit.object.userData.regionId;
      if (regionId === "left_hip" || regionId === "right_hip") {
        regionId = hit.point.x < 0 ? "left_hip" : "right_hip";
      }
      const isBack = hit.point.z < 0;

      this.renderer.domElement.style.cursor = "pointer";

      if (this.onHover) {
        this.onHover({
          regionId: regionId,
          isBack: isBack,
          screenX: clientX,
          screenY: clientY
        });
      }
    } else {
      this.renderer.domElement.style.cursor = "default";
      if (this.onHover) {
        this.onHover(null);
      }
    }
  }

  clearHoverHighlight() {
    if (this.hoveredMesh && this.hoveredMesh !== this.selectedMesh) {
      this.hoveredMesh.material = this.defaultMaterial.clone();
      this.hoveredMesh = null;
    }
  }

  animate() {
    requestAnimationFrame(this.animate);
    const delta = this.clock.getDelta();
    const elapsedTime = this.clock.getElapsedTime();

    // 1. Update OrbitControls
    this.controls.update();

    // 2. Update Proportions Morph
    this.updateMorph(delta);

    // 3. Smooth Camera Preset Animation
    if (this.isCameraAnimating && this.cameraTargetPos) {
      this.camera.position.lerp(this.cameraTargetPos, delta * 5.0);
      this.controls.target.set(0, 1.6, 0);

      const dist = this.camera.position.distanceTo(
        new THREE.Vector3(this.cameraTargetPos.x, this.cameraTargetPos.y, this.cameraTargetPos.z)
      );
      if (dist < 0.05) {
        this.isCameraAnimating = false;
        this.cameraTargetPos = null;
      }
    }

    // 4. Animate Pulsing Pin Indicator
    if (this.pinGroup && this.pinGroup.visible) {
      const pulseScale = 1.0 + 0.25 * Math.sin(elapsedTime * 6.0);
      this.pinRing.scale.set(pulseScale, pulseScale, pulseScale);
      this.pinRingMat.opacity = 0.5 + 0.4 * Math.cos(elapsedTime * 6.0);
      this.pinGlow.scale.set(pulseScale * 1.1, pulseScale * 1.1, pulseScale * 1.1);
    }

    // 5. Render Scene
    this.renderer.render(this.scene, this.camera);

    // 6. Dismiss loading spinner on first completed frame
    if (!this._loaderDismissed) {
      this._loaderDismissed = true;
      const loader = document.getElementById('canvas-loader');
      if (loader) loader.style.display = 'none';
    }
  }
}
