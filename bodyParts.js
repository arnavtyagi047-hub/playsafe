// Verify this medical information with Mayo Clinic, Kenhub or NHS.

/**
 * PlaySafe Recovery Hub - Anatomical & Sports Injury Knowledge Base
 * Defines anatomical structures, joint/bone landmarks, innervation,
 * muscular complexes, and prevalent athletic injuries for every region.
 */

const BODY_PARTS_DATA = {
  // ---------------- Head & Neck ----------------
  head: {
    id: "head",
    name: "Head & Cranium",
    bonesOrJoint: "Cranial bones (frontal, parietal, temporal, occipital)",
    mainMuscles: ["Temporalis", "Masseter", "Occipitofrontalis", "Facial expression muscles"],
    mainNerve: "Trigeminal nerve (CN V) & Facial nerve (CN VII)",
    commonSportsInjuries: [
      "Sports concussion (Mild Traumatic Brain Injury)",
      "Post-impact contusion or laceration",
      "Temporomandibular joint (TMJ) strain"
    ]
  },
  neck_front: {
    id: "neck_front",
    name: "Front of Neck",
    bonesOrJoint: "Cervical vertebrae (C1-C7), Hyoid bone",
    mainMuscles: ["Sternocleidomastoid", "Scalene anterior & medius", "Suprahyoid & Infrahyoid"],
    mainNerve: "Cervical plexus (C1-C4) & Spinal accessory nerve (CN XI)",
    commonSportsInjuries: [
      "Whiplash hyperextension strain",
      "Anterior cervical muscular spasm",
      "Direct impact contusion (laryngeal/tracheal)"
    ]
  },
  neck_back: {
    id: "neck_back",
    name: "Back of Neck (Cervical Spine)",
    bonesOrJoint: "Cervical facet joints (C1-C7), Occipitoatlantal joint",
    mainMuscles: ["Trapezius (upper)", "Splenius capitis & cervicis", "Levator scapulae", "Suboccipitals"],
    mainNerve: "Greater occipital nerve & Dorsal rami of cervical nerves",
    commonSportsInjuries: [
      "Acute cervical facet lock / wry neck",
      "Cervical paraspinal muscle strain",
      "Burner / Stinger syndrome (brachial plexus stretch)"
    ]
  },

  // ---------------- Torso / Trunk ----------------
  chest: {
    id: "chest",
    name: "Chest (Pectoral Region)",
    bonesOrJoint: "Sternum, Ribs (1-10), Sternocostal & Costochondral joints",
    mainMuscles: ["Pectoralis major", "Pectoralis minor", "Serratus anterior", "Intercostals"],
    mainNerve: "Medial and lateral pectoral nerves, Intercostal nerves",
    commonSportsInjuries: [
      "Pectoralis major tendon tear / strain (bench press)",
      "Costochondritis (rib cartilage inflammation)",
      "Rib contusion or intercostal muscle strain"
    ]
  },
  abdomen: {
    id: "abdomen",
    name: "Abdomen & Core",
    bonesOrJoint: "Costal margin, Pubic symphysis, Linea alba",
    mainMuscles: ["Rectus abdominis", "External & Internal obliques", "Transversus abdominis"],
    mainNerve: "Thoracoabdominal nerves (T7-T11) & Subcostal nerve (T12)",
    commonSportsInjuries: [
      "Rectus abdominis muscle strain",
      "Side strain (internal oblique tear from bowling/throwing)",
      "Athletic pubalgia / Sports hernia"
    ]
  },
  upper_back: {
    id: "upper_back",
    name: "Upper Back (Thoracic Spine & Scapulae)",
    bonesOrJoint: "Thoracic vertebrae (T1-T12), Scapulae, Costovertebral joints",
    mainMuscles: ["Trapezius (mid/lower)", "Rhomboid major & minor", "Latissimus dorsi", "Thoracic erector spinae"],
    mainNerve: "Dorsal scapular nerve, Thoracodorsal nerve, Thoracic spinal nerves",
    commonSportsInjuries: [
      "Rhomboid interscapular myofascial spasm",
      "Thoracic costovertebral joint dysfunction",
      "Scapular dyskinesis & postural overuse"
    ]
  },
  lower_back: {
    id: "lower_back",
    name: "Lower Back (Lumbar Spine)",
    bonesOrJoint: "Lumbar vertebrae (L1-L5), Sacroiliac (SI) joints",
    mainMuscles: ["Erector spinae (longissimus, iliocostalis)", "Multifidus", "Quadratus lumborum", "Psoas major"],
    mainNerve: "Lumbar spinal nerves & posterior primary rami",
    commonSportsInjuries: [
      "Acute lumbar paraspinal strain (heavy lifting/twisting)",
      "Lumbar disc bulge / herniation (sciatica)",
      "Spondylolysis / stress fracture (fast bowlers, gymnasts)"
    ]
  },

  // ---------------- Shoulders ----------------
  left_shoulder_front: {
    id: "left_shoulder_front",
    name: "Front of Left Shoulder",
    bonesOrJoint: "Glenohumeral joint, Acromioclavicular (AC) joint, Clavicle",
    mainMuscles: ["Anterior deltoid", "Subscapularis", "Pectoralis major (clavicular head)", "Biceps long head"],
    mainNerve: "Axillary nerve & Musculocutaneous nerve",
    commonSportsInjuries: [
      "AC joint sprain / separation",
      "Biceps tendinopathy & SLAP labral tear",
      "Anterior glenohumeral instability / subluxation"
    ]
  },
  left_shoulder_back: {
    id: "left_shoulder_back",
    name: "Back of Left Shoulder",
    bonesOrJoint: "Posterior glenohumeral joint, Scapular spine",
    mainMuscles: ["Posterior deltoid", "Infraspinatus", "Teres minor", "Supraspinatus"],
    mainNerve: "Suprascapular nerve & Axillary nerve",
    commonSportsInjuries: [
      "Rotator cuff tendinitis / tear (supraspinatus/infraspinatus)",
      "Subacromial impingement syndrome",
      "Posterior capsule tightness / throwing overload"
    ]
  },
  right_shoulder_front: {
    id: "right_shoulder_front",
    name: "Front of Right Shoulder",
    bonesOrJoint: "Glenohumeral joint, Acromioclavicular (AC) joint, Clavicle",
    mainMuscles: ["Anterior deltoid", "Subscapularis", "Pectoralis major (clavicular head)", "Biceps long head"],
    mainNerve: "Axillary nerve & Musculocutaneous nerve",
    commonSportsInjuries: [
      "AC joint sprain / separation",
      "Biceps tendinopathy & SLAP labral tear",
      "Anterior glenohumeral instability / subluxation"
    ]
  },
  right_shoulder_back: {
    id: "right_shoulder_back",
    name: "Back of Right Shoulder",
    bonesOrJoint: "Posterior glenohumeral joint, Scapular spine",
    mainMuscles: ["Posterior deltoid", "Infraspinatus", "Teres minor", "Supraspinatus"],
    mainNerve: "Suprascapular nerve & Axillary nerve",
    commonSportsInjuries: [
      "Rotator cuff tendinitis / tear (supraspinatus/infraspinatus)",
      "Subacromial impingement syndrome",
      "Posterior capsule tightness / throwing overload"
    ]
  },

  // ---------------- Upper Arms ----------------
  left_upper_arm_front: {
    id: "left_upper_arm_front",
    name: "Front of Left Upper Arm (Biceps)",
    bonesOrJoint: "Humerus shaft",
    mainMuscles: ["Biceps brachii", "Brachialis", "Coracobrachialis"],
    mainNerve: "Musculocutaneous nerve",
    commonSportsInjuries: [
      "Distal biceps tendon strain / partial tear",
      "Biceps muscle belly tear (eccentric overload)",
      "Contusion / deep hematoma"
    ]
  },
  left_upper_arm_back: {
    id: "left_upper_arm_back",
    name: "Back of Left Upper Arm (Triceps)",
    bonesOrJoint: "Humerus (posterior shaft)",
    mainMuscles: ["Triceps brachii (long, lateral, medial heads)"],
    mainNerve: "Radial nerve",
    commonSportsInjuries: [
      "Triceps tendinopathy / strain",
      "Radial nerve neuropraxia (spiral groove compression)",
      "Muscle contusion / cork arm"
    ]
  },
  right_upper_arm_front: {
    id: "right_upper_arm_front",
    name: "Front of Right Upper Arm (Biceps)",
    bonesOrJoint: "Humerus shaft",
    mainMuscles: ["Biceps brachii", "Brachialis", "Coracobrachialis"],
    mainNerve: "Musculocutaneous nerve",
    commonSportsInjuries: [
      "Distal biceps tendon strain / partial tear",
      "Biceps muscle belly tear (eccentric overload)",
      "Contusion / deep hematoma"
    ]
  },
  right_upper_arm_back: {
    id: "right_upper_arm_back",
    name: "Back of Right Upper Arm (Triceps)",
    bonesOrJoint: "Humerus (posterior shaft)",
    mainMuscles: ["Triceps brachii (long, lateral, medial heads)"],
    mainNerve: "Radial nerve",
    commonSportsInjuries: [
      "Triceps tendinopathy / strain",
      "Radial nerve neuropraxia (spiral groove compression)",
      "Muscle contusion / cork arm"
    ]
  },

  // ---------------- Elbows ----------------
  left_elbow: {
    id: "left_elbow",
    name: "Left Elbow",
    bonesOrJoint: "Humeroulnar, Humeroradial, & Proximal radioulnar joints, Olecranon",
    mainMuscles: ["Brachioradialis", "Pronator teres", "Common extensor & flexor tendons"],
    mainNerve: "Ulnar nerve (cubital tunnel), Radial nerve, Median nerve",
    commonSportsInjuries: [
      "Lateral epicondylitis (Tennis Elbow)",
      "Medial epicondylitis (Golfer's Elbow)",
      "Ulnar collateral ligament (UCL) sprain / tear",
      "Olecranon bursitis (student's / turf elbow)"
    ]
  },
  right_elbow: {
    id: "right_elbow",
    name: "Right Elbow",
    bonesOrJoint: "Humeroulnar, Humeroradial, & Proximal radioulnar joints, Olecranon",
    mainMuscles: ["Brachioradialis", "Pronator teres", "Common extensor & flexor tendons"],
    mainNerve: "Ulnar nerve (cubital tunnel), Radial nerve, Median nerve",
    commonSportsInjuries: [
      "Lateral epicondylitis (Tennis Elbow)",
      "Medial epicondylitis (Golfer's Elbow)",
      "Ulnar collateral ligament (UCL) sprain / tear",
      "Olecranon bursitis (student's / turf elbow)"
    ]
  },

  // ---------------- Forearms ----------------
  left_forearm: {
    id: "left_forearm",
    name: "Left Forearm",
    bonesOrJoint: "Radius and Ulna shafts, Interosseous membrane",
    mainMuscles: ["Flexor carpi radialis/ulnaris", "Extensor digitorum", "Pronator quadratus", "Supinator"],
    mainNerve: "Median nerve & Radial nerve (posterior interosseous)",
    commonSportsInjuries: [
      "Forearm compartment tightness / exertional syndrome",
      "Direct impact contusion / nightstick fracture",
      "Forearm flexor/extensor muscle strain"
    ]
  },
  right_forearm: {
    id: "right_forearm",
    name: "Right Forearm",
    bonesOrJoint: "Radius and Ulna shafts, Interosseous membrane",
    mainMuscles: ["Flexor carpi radialis/ulnaris", "Extensor digitorum", "Pronator quadratus", "Supinator"],
    mainNerve: "Median nerve & Radial nerve (posterior interosseous)",
    commonSportsInjuries: [
      "Forearm compartment tightness / exertional syndrome",
      "Direct impact contusion / nightstick fracture",
      "Forearm flexor/extensor muscle strain"
    ]
  },

  // ---------------- Wrists ----------------
  left_wrist: {
    id: "left_wrist",
    name: "Left Wrist",
    bonesOrJoint: "Radiocarpal joint, Distal radioulnar joint, Carpal bones (scaphoid, lunate)",
    mainMuscles: ["Wrist flexor & extensor tendons", "Abductor pollicis longus"],
    mainNerve: "Median nerve (carpal tunnel) & Ulnar nerve (Guyon's canal)",
    commonSportsInjuries: [
      "FOOSH hyperextension ligament sprain",
      "Scaphoid bone fracture",
      "De Quervain's tenosynovitis (thumb extensor sheath)",
      "TFCC (Triangular Fibrocartilage Complex) tear"
    ]
  },
  right_wrist: {
    id: "right_wrist",
    name: "Right Wrist",
    bonesOrJoint: "Radiocarpal joint, Distal radioulnar joint, Carpal bones (scaphoid, lunate)",
    mainMuscles: ["Wrist flexor & extensor tendons", "Abductor pollicis longus"],
    mainNerve: "Median nerve (carpal tunnel) & Ulnar nerve (Guyon's canal)",
    commonSportsInjuries: [
      "FOOSH hyperextension ligament sprain",
      "Scaphoid bone fracture",
      "De Quervain's tenosynovitis (thumb extensor sheath)",
      "TFCC (Triangular Fibrocartilage Complex) tear"
    ]
  },

  // ---------------- Hands & Fingers ----------------
  left_hand: {
    id: "left_hand",
    name: "Left Hand & Fingers",
    bonesOrJoint: "Metacarpals, Metacarpophalangeal (MCP) & Interphalangeal (IP) joints",
    mainMuscles: ["Thenar & Hypothenar muscles", "Lumbricals", "Interossei"],
    mainNerve: "Median nerve & Ulnar nerve (digital branches)",
    commonSportsInjuries: [
      "Gamekeeper's / Skier's thumb (UCL sprain of 1st MCP)",
      "Mallet finger (extensor tendon rupture)",
      "Boxer's fracture (5th metacarpal neck)",
      "Finger collateral ligament sprain / dislocation"
    ]
  },
  right_hand: {
    id: "right_hand",
    name: "Right Hand & Fingers",
    bonesOrJoint: "Metacarpals, Metacarpophalangeal (MCP) & Interphalangeal (IP) joints",
    mainMuscles: ["Thenar & Hypothenar muscles", "Lumbricals", "Interossei"],
    mainNerve: "Median nerve & Ulnar nerve (digital branches)",
    commonSportsInjuries: [
      "Gamekeeper's / Skier's thumb (UCL sprain of 1st MCP)",
      "Mallet finger (extensor tendon rupture)",
      "Boxer's fracture (5th metacarpal neck)",
      "Finger collateral ligament sprain / dislocation"
    ]
  },

  // ---------------- Pelvis & Hips ----------------
  left_hip: {
    id: "left_hip",
    name: "Left Hip & Groin",
    bonesOrJoint: "Acetabulofemoral (hip) joint, Pelvis (ilium, ischium, pubis)",
    mainMuscles: ["Gluteus medius & minimus", "Tensor fasciae latae (TFL)", "Adductor longus/brevis/magnus", "Iliopsoas"],
    mainNerve: "Femoral nerve & Superior gluteal nerve",
    commonSportsInjuries: [
      "Adductor groin strain (soccer, hockey)",
      "Femoroacetabular Impingement (FAI) & Labral tear",
      "Greater trochanteric pain syndrome (hip bursitis)",
      "Hip flexor (iliopsoas) strain"
    ]
  },
  right_hip: {
    id: "right_hip",
    name: "Right Hip & Groin",
    bonesOrJoint: "Acetabulofemoral (hip) joint, Pelvis (ilium, ischium, pubis)",
    mainMuscles: ["Gluteus medius & minimus", "Tensor fasciae latae (TFL)", "Adductor longus/brevis/magnus", "Iliopsoas"],
    mainNerve: "Femoral nerve & Superior gluteal nerve",
    commonSportsInjuries: [
      "Adductor groin strain (soccer, hockey)",
      "Femoroacetabular Impingement (FAI) & Labral tear",
      "Greater trochanteric pain syndrome (hip bursitis)",
      "Hip flexor (iliopsoas) strain"
    ]
  },

  // ---------------- Thighs (Front: Quad, Back: Hamstring) ----------------
  left_thigh_front: {
    id: "left_thigh_front",
    name: "Front of Left Thigh (Quadriceps)",
    bonesOrJoint: "Femur shaft, Patellofemoral articulation",
    mainMuscles: ["Quadriceps femoris (rectus femoris, vastus lateralis/medialis/intermedius)", "Sartorius"],
    mainNerve: "Femoral nerve",
    commonSportsInjuries: [
      "Quadriceps muscle strain (kicking / sprinting)",
      "Thigh contusion (charley horse / cork thigh)",
      "Myositis ossificans risk from blunt hematoma"
    ]
  },
  left_thigh_back: {
    id: "left_thigh_back",
    name: "Back of Left Thigh (Hamstring)",
    bonesOrJoint: "Femur (posterior), Ischial tuberosity",
    mainMuscles: ["Biceps femoris (long & short heads)", "Semitendinosus", "Semimembranosus"],
    mainNerve: "Sciatic nerve (tibial and common fibular divisions)",
    commonSportsInjuries: [
      "Hamstring strain / tear (high-speed sprinting)",
      "Proximal hamstring avulsion (tendon origin overload)",
      "Sciatic nerve irritation / neural tension"
    ]
  },
  right_thigh_front: {
    id: "right_thigh_front",
    name: "Front of Right Thigh (Quadriceps)",
    bonesOrJoint: "Femur shaft, Patellofemoral articulation",
    mainMuscles: ["Quadriceps femoris (rectus femoris, vastus lateralis/medialis/intermedius)", "Sartorius"],
    mainNerve: "Femoral nerve",
    commonSportsInjuries: [
      "Quadriceps muscle strain (kicking / sprinting)",
      "Thigh contusion (charley horse / cork thigh)",
      "Myositis ossificans risk from blunt hematoma"
    ]
  },
  right_thigh_back: {
    id: "right_thigh_back",
    name: "Back of Right Thigh (Hamstring)",
    bonesOrJoint: "Femur (posterior), Ischial tuberosity",
    mainMuscles: ["Biceps femoris (long & short heads)", "Semitendinosus", "Semimembranosus"],
    mainNerve: "Sciatic nerve (tibial and common fibular divisions)",
    commonSportsInjuries: [
      "Hamstring strain / tear (high-speed sprinting)",
      "Proximal hamstring avulsion (tendon origin overload)",
      "Sciatic nerve irritation / neural tension"
    ]
  },

  // ---------------- Knees (Front & Back) ----------------
  left_knee_front: {
    id: "left_knee_front",
    name: "Front of Left Knee",
    bonesOrJoint: "Patella, Tibiofemoral joint, Patellofemoral joint",
    mainMuscles: ["Quadriceps tendon", "Patellar tendon", "Vastus medialis oblique (VMO)"],
    mainNerve: "Femoral nerve (saphenous branch)",
    commonSportsInjuries: [
      "Anterior Cruciate Ligament (ACL) rupture (pivoting/deceleration)",
      "Patellar tendinopathy (Jumper's Knee)",
      "Patellofemoral Pain Syndrome (Runner's Knee)",
      "Medial/Lateral Meniscus tear"
    ]
  },
  left_knee_back: {
    id: "left_knee_back",
    name: "Back of Left Knee (Popliteal Fossa)",
    bonesOrJoint: "Posterior knee capsule, Tibiofemoral posterior joint line",
    mainMuscles: ["Popliteus", "Gastrocnemius heads", "Plantaris", "Biceps femoris tendon"],
    mainNerve: "Tibial nerve & Common fibular nerve",
    commonSportsInjuries: [
      "Posterior Cruciate Ligament (PCL) sprain/tear (dashboard injury)",
      "Popliteal / Baker's cyst distension",
      "Popliteus tendinitis",
      "Posterolateral corner (PLC) ligament complex injury"
    ]
  },
  right_knee_front: {
    id: "right_knee_front",
    name: "Front of Right Knee",
    bonesOrJoint: "Patella, Tibiofemoral joint, Patellofemoral joint",
    mainMuscles: ["Quadriceps tendon", "Patellar tendon", "Vastus medialis oblique (VMO)"],
    mainNerve: "Femoral nerve (saphenous branch)",
    commonSportsInjuries: [
      "Anterior Cruciate Ligament (ACL) rupture (pivoting/deceleration)",
      "Patellar tendinopathy (Jumper's Knee)",
      "Patellofemoral Pain Syndrome (Runner's Knee)",
      "Medial/Lateral Meniscus tear"
    ]
  },
  right_knee_back: {
    id: "right_knee_back",
    name: "Back of Right Knee (Popliteal Fossa)",
    bonesOrJoint: "Posterior knee capsule, Tibiofemoral posterior joint line",
    mainMuscles: ["Popliteus", "Gastrocnemius heads", "Plantaris", "Biceps femoris tendon"],
    mainNerve: "Tibial nerve & Common fibular nerve",
    commonSportsInjuries: [
      "Posterior Cruciate Ligament (PCL) sprain/tear (dashboard injury)",
      "Popliteal / Baker's cyst distension",
      "Popliteus tendinitis",
      "Posterolateral corner (PLC) ligament complex injury"
    ]
  },

  // ---------------- Lower Leg (Front: Shin, Back: Calf) ----------------
  left_shin: {
    id: "left_shin",
    name: "Front of Left Lower Leg (Shin)",
    bonesOrJoint: "Tibia (anterior border), Fibula shaft",
    mainMuscles: ["Tibialis anterior", "Extensor digitorum longus", "Extensor hallucis longus"],
    mainNerve: "Deep fibular (peroneal) nerve",
    commonSportsInjuries: [
      "Medial Tibial Stress Syndrome (Shin Splints)",
      "Tibial bone stress reaction / fracture",
      "Anterior exertional compartment syndrome"
    ]
  },
  left_calf: {
    id: "left_calf",
    name: "Back of Left Lower Leg (Calf)",
    bonesOrJoint: "Posterior Tibia, Fibula, Calcaneal alignment",
    mainMuscles: ["Gastrocnemius (medial/lateral)", "Soleus", "Plantaris"],
    mainNerve: "Tibial nerve",
    commonSportsInjuries: [
      "Medial gastrocnemius tear (Tennis Leg)",
      "Soleus strain (long-distance runners)",
      "Mid-portion Achilles tendinitis"
    ]
  },
  right_shin: {
    id: "right_shin",
    name: "Front of Right Lower Leg (Shin)",
    bonesOrJoint: "Tibia (anterior border), Fibula shaft",
    mainMuscles: ["Tibialis anterior", "Extensor digitorum longus", "Extensor hallucis longus"],
    mainNerve: "Deep fibular (peroneal) nerve",
    commonSportsInjuries: [
      "Medial Tibial Stress Syndrome (Shin Splints)",
      "Tibial bone stress reaction / fracture",
      "Anterior exertional compartment syndrome"
    ]
  },
  right_calf: {
    id: "right_calf",
    name: "Back of Right Lower Leg (Calf)",
    bonesOrJoint: "Posterior Tibia, Fibula, Calcaneal alignment",
    mainMuscles: ["Gastrocnemius (medial/lateral)", "Soleus", "Plantaris"],
    mainNerve: "Tibial nerve",
    commonSportsInjuries: [
      "Medial gastrocnemius tear (Tennis Leg)",
      "Soleus strain (long-distance runners)",
      "Mid-portion Achilles tendinitis"
    ]
  },

  // ---------------- Ankles ----------------
  left_ankle: {
    id: "left_ankle",
    name: "Left Ankle & Achilles",
    bonesOrJoint: "Talocrural joint, Subtalar joint, Medial & Lateral malleoli",
    mainMuscles: ["Achilles tendon (calcaneal)", "Peroneus longus/brevis", "Tibialis posterior"],
    mainNerve: "Tibial nerve & Superficial / Deep fibular nerves",
    commonSportsInjuries: [
      "Lateral inversion ankle sprain (ATFL / CFL ligaments)",
      "Achilles tendon acute rupture",
      "High ankle sprain (syndesmosis rupture)",
      "Peroneal tendon subluxation / tendinitis"
    ]
  },
  right_ankle: {
    id: "right_ankle",
    name: "Right Ankle & Achilles",
    bonesOrJoint: "Talocrural joint, Subtalar joint, Medial & Lateral malleoli",
    mainMuscles: ["Achilles tendon (calcaneal)", "Peroneus longus/brevis", "Tibialis posterior"],
    mainNerve: "Tibial nerve & Superficial / Deep fibular nerves",
    commonSportsInjuries: [
      "Lateral inversion ankle sprain (ATFL / CFL ligaments)",
      "Achilles tendon acute rupture",
      "High ankle sprain (syndesmosis rupture)",
      "Peroneal tendon subluxation / tendinitis"
    ]
  },

  // ---------------- Feet ----------------
  left_foot: {
    id: "left_foot",
    name: "Left Foot & Arch",
    bonesOrJoint: "Tarsal bones (talus, calcaneus, navicular), Metatarsals, MTP joints",
    mainMuscles: ["Plantar fascia", "Flexor digitorum brevis", "Abductor hallucis"],
    mainNerve: "Medial & lateral plantar nerves, Sural nerve",
    commonSportsInjuries: [
      "Plantar fasciitis (heel spur syndrome)",
      "Metatarsal stress fracture (March fracture / 5th metatarsal Jones fracture)",
      "Turf Toe (1st MTP hyperextension sprain)",
      "Morton's neuroma"
    ]
  },
  right_foot: {
    id: "right_foot",
    name: "Right Foot & Arch",
    bonesOrJoint: "Tarsal bones (talus, calcaneus, navicular), Metatarsals, MTP joints",
    mainMuscles: ["Plantar fascia", "Flexor digitorum brevis", "Abductor hallucis"],
    mainNerve: "Medial & lateral plantar nerves, Sural nerve",
    commonSportsInjuries: [
      "Plantar fasciitis (heel spur syndrome)",
      "Metatarsal stress fracture (March fracture / 5th metatarsal Jones fracture)",
      "Turf Toe (1st MTP hyperextension sprain)",
      "Morton's neuroma"
    ]
  }
};

/**
 * Helper to resolve region details based on base region ID and front/back orientation
 * @param {string} regionId - Base region id assigned to mesh userData
 * @param {boolean} isBack - True if tapped point is on the posterior/back half of the body
 * @returns {object|null} - Anatomical region data object
 */
function resolveBodyPart(regionId, isBack) {
  if (!regionId) return null;

  // If already specific, check direct key
  if (BODY_PARTS_DATA[regionId]) {
    return BODY_PARTS_DATA[regionId];
  }

  // Attempt to resolve front vs back suffix
  const suffix = isBack ? "_back" : "_front";
  const testKey = regionId + suffix;
  if (BODY_PARTS_DATA[testKey]) {
    return BODY_PARTS_DATA[testKey];
  }

  // For shin / calf:
  if (regionId === "left_lower_leg" || regionId === "left_leg_lower") {
    return isBack ? BODY_PARTS_DATA["left_calf"] : BODY_PARTS_DATA["left_shin"];
  }
  if (regionId === "right_lower_leg" || regionId === "right_leg_lower") {
    return isBack ? BODY_PARTS_DATA["right_calf"] : BODY_PARTS_DATA["right_shin"];
  }

  // For torso:
  if (regionId === "torso_upper" || regionId === "chest_back") {
    return isBack ? BODY_PARTS_DATA["upper_back"] : BODY_PARTS_DATA["chest"];
  }
  if (regionId === "torso_lower" || regionId === "abdomen_back") {
    return isBack ? BODY_PARTS_DATA["lower_back"] : BODY_PARTS_DATA["abdomen"];
  }

  // Return base if exists
  return BODY_PARTS_DATA[regionId] || null;
}
