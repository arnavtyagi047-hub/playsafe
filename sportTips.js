// Verify with NHS, Mayo Clinic or sports medicine sources. General guidance only.

/**
 * PlaySafe Recovery Hub - Sport-Specific Guidance & Return-to-Play Notes
 * Evidence-informed common injuries, preventive habits, and objective return criteria.
 */

const sportTips = {
  "Cricket": {
    commonInjuries: [
      "Hamstring strains while sprinting between wickets",
      "Lumbar spine stress fractures from fast bowling",
      "Rotator cuff tendinitis from repeated throwing"
    ],
    tip: "Warm up your shoulders and spine with dynamic rotations before bowling, and monitor weekly bowling workloads to prevent spinal stress.",
    returnNote: "Ensure you can throw with full velocity from the boundary and bowl at match intensity without lower back or shoulder soreness."
  },
  "Football": {
    commonInjuries: [
      "Ankle inversion sprains from tackles or uneven turf",
      "Hamstring tears during sudden counter-attack sprints",
      "Knee ligament injuries (ACL or MCL) from pivoting"
    ],
    tip: "Incorporate neuromuscular balance and cutting drills (like FIFA 11+) twice weekly to protect your knees and ankles.",
    returnNote: "You should be able to sprint at top speed, decelerate abruptly, and strike a ball with both feet pain-free."
  },
  "Basketball": {
    commonInjuries: [
      "Ankle sprains from landing on another player's foot",
      "Patellar tendinopathy (Jumper's Knee)",
      "Finger jammed or sprained by the basketball"
    ],
    tip: "Focus on soft double-leg landing mechanics with flexed knees and hips to absorb impact shock effectively.",
    returnNote: "Confirm you can perform maximum vertical jumps, land softly, and cut defensively side-to-side without knee or ankle giving way."
  },
  "Volleyball": {
    commonInjuries: [
      "Finger sprains and jams from blocking",
      "Ankle sprains from net landings",
      "Shoulder impingement and rotator cuff pain from spiking"
    ],
    tip: "Strengthen your scapular stabilizers and rotator cuff with resistance bands, and use buddy taping for vulnerable finger joints.",
    returnNote: "Make sure you can jump and land on both feet without pain, and spike or serve without shoulder pain."
  },
  "Badminton": {
    commonInjuries: [
      "Achilles tendinitis from explosive lunges",
      "Tennis elbow (lateral epicondylitis) from backhand shots",
      "Rotator cuff overload from repetitive overhead smashes"
    ],
    tip: "Maintain court-specific non-slip footwear and focus on rhythmic split-step footwork to avoid overreaching lunges.",
    returnNote: "You must be able to lunge deeply in all four corners of the court and execute overhead smashes without elbow or Achilles pain."
  },
  "Tennis": {
    commonInjuries: [
      "Tennis elbow (lateral epicondylalgia)",
      "Wrist extensor tenosynovitis or TFCC sprain",
      "Calf muscle strain (Tennis Leg) from sudden split-steps"
    ],
    tip: "Match your racquet grip size and string tension appropriately, and initiate groundstrokes from your core and hips rather than solely the wrist.",
    returnNote: "Ensure you can serve at full power and hit continuous forehands and backhands with zero forearm or wrist twinges."
  },
  "Table Tennis": {
    commonInjuries: [
      "Wrist flexor and extensor strains from rapid top-spin flicking",
      "Lumbar strain from low-crouched asymmetric twisting",
      "Shoulder impingement from repetitive forehand loops"
    ],
    tip: "Strengthen core rotational endurance and perform forearm mobility stretches before fast multitrack rallying.",
    returnNote: "Verify you can maintain a low ready-stance and execute rapid multi-ball counter-attacks without lower back or wrist irritation."
  },
  "Hockey": {
    commonInjuries: [
      "Hamstring and groin strains from constant low-crouched running",
      "Lower back lumbar stiffness from asymmetric posture",
      "Finger and hand contusions from stick and ball impacts"
    ],
    tip: "Practice posture-switching drills and build lumbar extensor endurance to counteract the prolonged forward-bent playing position.",
    returnNote: "Ensure you can dribble in a low bent position, sprint, and hit slapshots with full power pain-free."
  },
  "Kabaddi": {
    commonInjuries: [
      "Knee ligament ruptures (ACL/MCL) from sudden ankle-holds and turns",
      "Shoulder dislocations and AC joint separations from heavy tackles",
      "Ankle sprains from sudden mat or soil grip"
    ],
    tip: "Emphasize multi-directional agility, neck stability exercises, and safe breakaway mechanics to absorb contact safely.",
    returnNote: "Confirm you can bear full body weight while pivoting violently, withstand contact, and break out of holds with zero joint instability."
  },
  "Kho-Kho": {
    commonInjuries: [
      "Knee meniscus tears and patellar strains from sudden zigzag diving",
      "Ankle inversion sprains during abrupt directional changes",
      "Wrist sprains from pole diving or hand-touch ground contacts"
    ],
    tip: "Train single-leg deceleration control and practice ground diving technique with proper forward shoulder rolls.",
    returnNote: "Check that you can sprint at maximum velocity, execute quick dodges, and rise rapidly from the chaser crouch without knee or ankle pain."
  },
  "Handball": {
    commonInjuries: [
      "Shoulder anterior instability and thrower's shoulder",
      "Finger dislocations and sprains from high-speed ball contact",
      "Patellar tendinitis and ACL sprains from jump-shots"
    ],
    tip: "Implement regular eccentric rotator cuff conditioning and safe single-leg jump landing protocols.",
    returnNote: "Confirm you can throw with full force and jump-stop safely without shoulder catching or knee instability."
  },
  "Athletics or Running": {
    commonInjuries: [
      "Medial tibial stress syndrome (Shin Splints)",
      "Plantar fasciitis (heel and arch pain)",
      "Iliotibial (IT) band friction syndrome at the outer knee"
    ],
    tip: "Increase your weekly mileage by no more than 10% each week and rotate between well-cushioned running shoes.",
    returnNote: "You should be able to complete a brisk 30-minute run at training pace without next-morning joint swelling or stiffness."
  },
  "Gym or Weightlifting": {
    commonInjuries: [
      "Lumbar disc and paraspinal strains from deadlifts or squats",
      "Pectoralis major and anterior shoulder impingement from heavy benching",
      "Patellar tendon irritation from deep knee flexion under heavy load"
    ],
    tip: "Prioritize neutral spine mechanics over lifting heavier weights, and incorporate warm-up sets with controlled tempos.",
    returnNote: "Ensure you can perform bodyweight squats, hinges, and push-ups with full range of motion before reloading the barbell."
  },
  "Swimming": {
    commonInjuries: [
      "Swimmer's shoulder (subacromial impingement)",
      "Breaststroker's knee (medial collateral ligament stress)",
      "Cervical spine stiffness from unilateral breathing"
    ],
    tip: "Alternate breathing sides to balance neck strain and incorporate scapular retraction exercises to prevent rounded forward shoulders.",
    returnNote: "Confirm you can swim several continuous laps of your primary stroke without shoulder pinching or neck restriction."
  },
  "Boxing": {
    commonInjuries: [
      "Boxer's fracture of the 4th or 5th metacarpal neck",
      "Wrist sprains from misaligned punches",
      "Rotator cuff and bicipital tendinitis from repeated snapping jabs"
    ],
    tip: "Always use proper hand wraps that support the wrist and knuckle line, and avoid hitting heavy bags without full wraps and gloves.",
    returnNote: "Ensure you can execute strong punches against resistance without wrist collapsing or shoulder discomfort."
  },
  "Wrestling": {
    commonInjuries: [
      "Cervical spine sprains and burner/stinger nerve pinches",
      "Shoulder AC joint sprains from mat slams",
      "Knee collateral ligament tears from takedown entanglement"
    ],
    tip: "Develop deep neck isometric strength, bridge safely with proper coach supervision, and master safe breakfalling.",
    returnNote: "Verify you can bridge, bear an opponent's weight, and scramble on the mat without neck or joint pain."
  },
  "Cycling": {
    commonInjuries: [
      "Patellofemoral knee pain from improper saddle height",
      "Neck and upper back stiffness from prolonged aerodynamic posture",
      "Ulnar nerve compression (handlebar palsy / numbness in fingers)"
    ],
    tip: "Get a professional bike fit to optimize your saddle height and reach, and frequently alter hand positions on the handlebars.",
    returnNote: "Make sure you can pedal at standard cadence for 45 minutes without knee ache, neck tension, or finger numbness."
  },
  "Skating": {
    commonInjuries: [
      "Distal radius wrist fractures and sprains from falls onto outstretched hands (FOOSH)",
      "Ankle sprains from boot stiffness or unexpected edge catching",
      "Tailbone (coccyx) contusion from backward falls"
    ],
    tip: "Wear certified wrist guards, knee pads, and a helmet, and practice knee-bending to keep your center of gravity low.",
    returnNote: "You should be able to balance on one leg, glide smoothly, and execute a full emergency stop without ankle hesitation or wrist pain."
  },
  "Yoga": {
    commonInjuries: [
      "Hamstring origin tears from aggressive overstretching in forward folds",
      "Wrist hyperextension sprains from prolonged downward dogs and arm balances",
      "Lumbar or cervical facet irritation from forced backbends"
    ],
    tip: "Micro-bend your knees in forward folds to safeguard the hamstring attachments, and spread fingers wide to distribute wrist pressure.",
    returnNote: "Ensure you can move through gentle Sun Salutations and weight-bear on your hands without joint pinching or tendon pain."
  }
};
