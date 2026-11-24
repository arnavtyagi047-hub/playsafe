// Verify this medical information with NHS, Mayo Clinic or Kenhub. General guidance only.

/**
 * PlaySafe Recovery Hub - Clinical Injuries Knowledge Base (injuries.js)
 * Defines evidence-informed injury rehabilitation data for 6 core sports injury categories:
 * - shoulderPain
 * - kneePain
 * - ankleSprain
 * - hamstringStrain
 * - wristSprain
 * - lowerBackPain
 *
 * Includes mapping from all 3D anatomical body regions to these injury profiles.
 */

const injuriesData = {
  shoulderPain: {
    title: "Shoulder Pain & Rotator Cuff Strain",
    likelyCause: "This may be an irritation or micro-strain of the rotator cuff tendons (supraspinatus, infraspinatus), a mild sprain of the acromioclavicular ligament, or muscular overuse from repetitive overhead throwing, serving, or lifting. It may also stem from sudden pulling forces or landing onto an outstretched arm during contact sports.",
    firstAid: [
      "Protect: Rest the arm from overhead reaching, throwing, or heavy lifting for the first 24 to 48 hours.",
      "Elevate: Keep your upper body comfortably propped up with pillows when resting or sleeping to assist lymphatic drainage.",
      "Avoid anti-inflammatories: Avoid anti-inflammatory tablets during the first 48 hours to preserve the natural cellular healing cascade.",
      "Compress: Apply gentle support with an elastic shoulder wrap or light sling if the arm feels heavy or vulnerable.",
      "Educate: Understand that active, gradual recovery restores tendon strength far more effectively than complete passive rest.",
      "Load: Gradually reintroduce gentle arm movements within a pain-free zone as acute discomfort settles.",
      "Optimism: Stay positive; most soft-tissue shoulder strains improve steadily with progressive conditioning.",
      "Vascularisation: Perform brisk lower-body walking or stationary cycling to boost systemic circulation and recovery.",
      "Exercise: Gradually introduce rotator cuff and scapular stabilizing exercises to restore full shoulder function."
    ],
    exercises: {
      "Day 1-3": [
        {
          name: "Pendulum swings",
          sets: "2-3 sets",
          reps: "10-15 circles",
          howTo: "Lean forward supporting your good arm on a table and let the injured arm dangle freely, gently swaying in small circles."
        },
        {
          name: "Scapular pinches",
          sets: "2-3 sets",
          reps: "10 reps (5-sec hold)",
          howTo: "Sit upright with your arms relaxed by your sides and gently squeeze your shoulder blades together without shrugging."
        },
        {
          name: "Supported table slide",
          sets: "2 sets",
          reps: "8-10 reps",
          howTo: "Place both hands on a smooth table on a towel and slide your hands forward gently within a comfortable range."
        }
      ],
      "Week 1": [
        {
          name: "Isometric external rotation",
          sets: "3 sets",
          reps: "10 reps (5-sec hold)",
          howTo: "Stand beside a wall with your elbow bent at 90 degrees and gently press the back of your wrist outward against the wall without moving."
        },
        {
          name: "Fingertip wall crawling",
          sets: "2-3 sets",
          reps: "8-10 reps",
          howTo: "Face a wall and use your fingertips to slowly walk your hand upward to a comfortable height, then walk back down."
        },
        {
          name: "Side-lying external rotation (no weight)",
          sets: "2-3 sets",
          reps: "10-12 reps",
          howTo: "Lie on your uninjured side with your top elbow tucked against your ribs and rotate your forearm upward toward the ceiling."
        }
      ],
      "Week 2 and beyond": [
        {
          name: "Resistance band rows",
          sets: "3 sets",
          reps: "12-15 reps",
          howTo: "Anchor an elastic resistance band at chest height and pull your elbows back, focusing on squeezing your shoulder blades."
        },
        {
          name: "Resistance band external rotation",
          sets: "3 sets",
          reps: "10-12 reps",
          howTo: "Hold a light resistance band with your elbow bent at 90 degrees and rotate your hand outward away from your stomach."
        },
        {
          name: "Wall push-ups (plus)",
          sets: "3 sets",
          reps: "10-12 reps",
          howTo: "Perform a controlled push-up against a wall, pushing away an extra inch at the top to engage your serratus anterior muscle."
        }
      ]
    },
    tapingGuide: [
      "1. Clean and dry the skin over the front, side, and back of the shoulder.",
      "2. Cut a Y-strip and anchor the base on the outer upper arm (deltoid tuberosity) with zero stretch.",
      "3. Bring your arm back across your chest and apply the posterior tail around the back edge of the shoulder with 25-50% tension.",
      "4. Move your arm slightly backward and lay the anterior tail around the front of the shoulder toward the collarbone.",
      "5. Apply a horizontal decompression strip across the top of the shoulder joint with 50% tension in the middle and no tension on the ends.",
      "Note: Learn the technique from a physio or a trusted video before trying it."
    ],
    medicineInfo: "General pain-relief options include over-the-counter pain-relief gels applied directly to the skin and common over-the-counter pain relievers taken by mouth to help manage daily discomfort. Ask a pharmacist or doctor before taking any medicine, especially if you have allergies, stomach problems, asthma, or are under 18.",
    restDuration: {
      mild: "3 to 7 days of relative rest",
      moderate: "2 to 4 weeks with guided rehabilitation",
      severe: "6 to 12 weeks with clinical physiotherapy support"
    },
    returnToPlayChecklist: [
      "Zero pain when resting or sleeping on the shoulder",
      "Full, equal range of motion in overhead reaching compared to the uninjured arm",
      "Rotator cuff strength equal to the uninjured side on manual muscle testing",
      "Able to complete 15 push-ups against a wall or floor without shoulder catching",
      "Pain-free performance during throwing, bowling, or overhead swinging simulations",
      "Passes a functional shoulder stability test with no apprehension",
      "Confidence during full-contact athletic training drills"
    ],
    mistakesToAvoid: [
      "Completely immobilizing the arm in a sling for weeks, which leads to joint stiffness and frozen shoulder",
      "Returning directly to full-speed overhead smashes, serves, or bowling before rebuilding rotator cuff strength",
      "Ignoring severe pain that repeatedly wakes you up in the middle of the night",
      "Lifting heavy weights overhead while your shoulder clicks or pinches painfully"
    ],
    seeDoctorIf: [
      "Inability to lift your arm away from your side or raise your hand above your waist",
      "Visible deformity, hollow contour, or shoulder dislocation after a fall",
      "Pins, needles, numbness, or weakness shooting down your arm into your hand",
      "Severe, unremitting night pain that does not settle with rest"
    ]
  },

  kneePain: {
    title: "Knee Pain & Ligament Strain",
    likelyCause: "This may be an irritation of the patellofemoral cartilage behind the kneecap, a mild sprain of the collateral ligaments (MCL or LCL), or minor patellar tendon overload. It commonly develops following a sudden pivot, awkward landing from a jump, rapid deceleration, or repetitive running on hard ground.",
    firstAid: [
      "Protect: Unload the knee by avoiding deep squats, heavy jumping, or sudden pivoting for the first 2-3 days.",
      "Elevate: Prop your leg up on cushions so your knee rests above hip level when seated or resting.",
      "Avoid anti-inflammatories: Avoid anti-inflammatory tablets during the first 48 hours to allow the initial tissue repair phase.",
      "Compress: Apply an elastic tubular bandage or supportive knee sleeve to control joint fluid buildup.",
      "Educate: Understand that passive rest alone causes quick muscle loss; early quadriceps firing speeds up healing.",
      "Load: Gradually bear weight as tolerated, walking with a natural heel-to-toe gait without limping.",
      "Optimism: Stay positive; the majority of soft-tissue knee strains resolve well with structured rehabilitation.",
      "Vascularisation: Engage in gentle non-impact cardio, such as stationary cycling with low resistance once bending allows.",
      "Exercise: Progress from quad sets and straight leg raises to closed-chain squats and balance drills."
    ],
    exercises: {
      "Day 1-3": [
        {
          name: "Quad sets (towel under knee)",
          sets: "3 sets",
          reps: "10 reps (5-sec hold)",
          howTo: "Sit with your leg straight and tighten your front thigh muscle, gently pressing the back of your knee into a small rolled towel."
        },
        {
          name: "Heel slides",
          sets: "2-3 sets",
          reps: "8-10 reps",
          howTo: "Lie on your back and slowly slide your heel along the floor toward your buttocks, bending your knee as far as comfortable, then slide back."
        },
        {
          name: "Straight leg raises",
          sets: "2-3 sets",
          reps: "8-10 reps",
          howTo: "Lie on your back with the other knee bent, lock your injured knee straight, and raise your leg 10-12 inches off the ground, holding for 2 seconds."
        }
      ],
      "Week 1": [
        {
          name: "Short arc quads",
          sets: "3 sets",
          reps: "10-12 reps",
          howTo: "Lie down with a foam roller or rolled towel under your knee and straighten your lower leg, holding for 3 seconds before lowering."
        },
        {
          name: "Terminal knee extensions",
          sets: "3 sets",
          reps: "12-15 reps",
          howTo: "Stand with an elastic band looped behind your knee anchored in front, and straighten your knee against the band resistance."
        },
        {
          name: "Supported mini wall-squats",
          sets: "2-3 sets",
          reps: "8-10 reps",
          howTo: "Lean your back against a smooth wall and slide down into a shallow 30-degree mini-squat, holding for 3 seconds."
        }
      ],
      "Week 2 and beyond": [
        {
          name: "Step-ups on low platform",
          sets: "3 sets",
          reps: "10 reps per leg",
          howTo: "Step onto a 4-to-6 inch step, keeping your knee aligned over your second toe, and step down slowly with control."
        },
        {
          name: "Single-leg balance (micro-bend)",
          sets: "3 sets",
          reps: "30-sec hold",
          howTo: "Stand on your injured leg with a slight micro-bend in the knee and balance steadily without letting your knee wobble inward."
        },
        {
          name: "Hamstring curls with band",
          sets: "3 sets",
          reps: "12-15 reps",
          howTo: "Lie on your stomach or stand and curl your heel toward your buttocks against light resistance."
        }
      ]
    },
    tapingGuide: [
      "1. Sit with your knee bent at approximately 30 degrees and clean the skin.",
      "2. Apply an anchor strip below the kneecap onto the tibial tuberosity with zero stretch.",
      "3. Guide two curved strips around the inner and outer borders of the kneecap with 30-50% tension to support patellar tracking.",
      "4. Anchor the ends above the kneecap on the quadriceps tendon without any stretch.",
      "5. Rub the tape gently to activate the heat-sensitive adhesive.",
      "Note: Learn the technique from a physio or a trusted video before trying it."
    ],
    medicineInfo: "General pain-relief options include over-the-counter pain-relief gels applied directly to the skin and common over-the-counter pain relievers taken by mouth to help manage daily discomfort. Ask a pharmacist or doctor before taking any medicine, especially if you have allergies, stomach problems, asthma, or are under 18.",
    restDuration: {
      mild: "1 to 2 weeks of modified activity",
      moderate: "3 to 6 weeks of structured rehabilitation",
      severe: "8 to 16 weeks requiring orthopedic examination"
    },
    returnToPlayChecklist: [
      "Zero pain during normal daily walking and stair climbing",
      "Full knee extension (straightening) and flexion (bending) equal to the uninjured side",
      "No visible joint swelling or fluid ballooning after exercise",
      "Quadriceps and hamstring strength at least 90% of the opposite leg",
      "Can perform 10 single-leg mini-squats without shaking or inward knee collapse",
      "Passed a single-leg hop test with no pain or feeling of instability",
      "Completed full sprint, deceleration, and cutting drills in practice"
    ],
    mistakesToAvoid: [
      "Pushing through sharp pain when bending or pivoting on the knee",
      "Remaining completely inactive in bed for days, which causes quick quadriceps muscle wasting",
      "Neglecting hip and glute strength, which directly stabilizes knee alignment",
      "Returning to contact games while the knee still feels wobbly or gives way"
    ],
    seeDoctorIf: [
      "Inability to walk 4 steps immediately after the injury and right now",
      "A loud pop was heard followed by rapid joint ballooning within 2 hours",
      "The knee is locked in place and cannot be straightened or bent",
      "Visible bone dislocation or unnatural joint angle"
    ]
  },

  ankleSprain: {
    title: "Ankle Sprain & Ligament Tear",
    likelyCause: "This may be an inversion sprain affecting the outer ligaments (such as the anterior talofibular or calcaneofibular ligament), or a strain of the surrounding peroneal tendons. It commonly happens when stepping into a pothole, landing on another player's foot, or rolling the ankle outward during quick changes of direction.",
    firstAid: [
      "Protect: Unload the ankle by limiting walking on uneven ground and using crutches if putting weight causes sharp pain.",
      "Elevate: Keep your ankle elevated above heart level whenever resting to drain pooling fluid.",
      "Avoid anti-inflammatories: Avoid anti-inflammatory tablets during the first 48 hours to preserve natural healing signaling.",
      "Compress: Wrap the foot and ankle in a snug, supportive elastic bandage from toes toward the calf.",
      "Educate: Recognize that early controlled movement restores joint receptors much faster than prolonged casting.",
      "Load: Start bearing partial weight as tolerated within a pain-free threshold.",
      "Optimism: Stay positive; mild-to-moderate ankle sprains respond reliably to early balance rehabilitation.",
      "Vascularisation: Perform upper-body workouts or gentle stationary cycling with light heel pressure.",
      "Exercise: Begin gentle ankle alphabet circles and progress to calf raises and single-leg balance."
    ],
    exercises: {
      "Day 1-3": [
        {
          name: "Ankle alphabet",
          sets: "2-3 sets",
          reps: "A to Z letters",
          howTo: "Sit with your leg elevated and draw the letters of the alphabet in the air with your big toe, moving only your ankle joint."
        },
        {
          name: "Ankle pumps",
          sets: "3 sets",
          reps: "15-20 reps",
          howTo: "Gently point your toes down away from you and then pull your toes up toward your shin, pulsing slowly."
        },
        {
          name: "Towel scrunches",
          sets: "2-3 sets",
          reps: "10-12 scrunches",
          howTo: "Place a towel flat on the floor and use your toes to scrunch the towel toward you while seated."
        }
      ],
      "Week 1": [
        {
          name: "Resistance band dorsiflexion",
          sets: "3 sets",
          reps: "12-15 reps",
          howTo: "Loop a resistance band over your forefoot anchored in front, and pull your toes up against the resistance."
        },
        {
          name: "Resistance band eversion",
          sets: "3 sets",
          reps: "12-15 reps",
          howTo: "Turn your foot outward against light elastic band resistance to strengthen the outer peroneal tendons."
        },
        {
          name: "Double-leg calf raises",
          sets: "3 sets",
          reps: "12-15 reps",
          howTo: "Stand near a wall for balance and slowly rise onto the balls of both feet, pausing at the top before lowering."
        }
      ],
      "Week 2 and beyond": [
        {
          name: "Single-leg calf raises",
          sets: "3 sets",
          reps: "10-12 reps per leg",
          howTo: "Stand on the injured foot only and slowly raise your heel off the ground, controlling the descent."
        },
        {
          name: "Single-leg balance on balance pad or pillow",
          sets: "3 sets",
          reps: "30-sec hold",
          howTo: "Stand on a pillow or soft mat on the injured foot and maintain your balance without touching the floor."
        },
        {
          name: "Agility ladder & zigzag hops",
          sets: "3 sets",
          reps: "6-8 passes",
          howTo: "Perform light, controlled hops forward and side-to-side, focusing on landing softly with good ankle alignment."
        }
      ]
    },
    tapingGuide: [
      "1. Position the foot at a 90-degree right angle (neutral dorsiflexion) and clean the skin.",
      "2. Place an anchor strip across the lower calf, 3-4 inches above the ankle bones.",
      "3. Apply a stirrup strip starting from the inner anchor, down under the heel, and pull firmly up the outer ankle to resist rolling.",
      "4. Apply a figure-of-eight or heel lock strip around the ankle joint to secure stability.",
      "5. Ensure the tape is supportive without being tight enough to restrict blood flow or cause tingling in toes.",
      "Note: Learn the technique from a physio or a trusted video before trying it."
    ],
    medicineInfo: "General pain-relief options include over-the-counter pain-relief gels applied directly to the skin and common over-the-counter pain relievers taken by mouth to help manage daily discomfort. Ask a pharmacist or doctor before taking any medicine, especially if you have allergies, stomach problems, asthma, or are under 18.",
    restDuration: {
      mild: "1 to 2 weeks of protective activity",
      moderate: "3 to 5 weeks with progressive balance training",
      severe: "6 to 12 weeks with clinical physiotherapy support"
    },
    returnToPlayChecklist: [
      "Zero swelling or tenderness around the malleoli (ankle bones)",
      "Normal, limp-free walking on flat surfaces, inclines, and stairs",
      "Full range of motion in pulling toes upward and pointing downward",
      "Single-leg balance on the injured foot matches the uninjured side (30+ seconds)",
      "Able to perform 20 single-leg calf raises pain-free",
      "Can jog, sprint, and complete figure-8 cutting drills at full speed without hesitation",
      "Passes a single-leg forward and crossover hop test"
    ],
    mistakesToAvoid: [
      "Stopping rehabilitation as soon as the pain subsides without retraining balance and proprioception",
      "Wearing loose, unsupportive footwear while the ankle ligaments are still remodeling",
      "Returning directly to high-risk cutting sports (football, basketball) without supportive taping or bracing initially",
      "Ignoring repeated minor ankle rolls, which leads to chronic ankle instability"
    ],
    seeDoctorIf: [
      "Inability to walk 4 steps immediately after the sprain and at this moment (Ottawa Ankle Rule)",
      "Severe bone tenderness directly over the bony bumps of the ankle or the base of the 5th metatarsal",
      "Severe tingling, numbness, or pale/cold toes",
      "Visible bone dislocation or unnatural joint angle"
    ]
  },

  hamstringStrain: {
    title: "Hamstring Strain & Muscle Tear",
    likelyCause: "This may be a muscle strain or micro-tear of the biceps femoris, semitendinosus, or semimembranosus muscle fibers along the back of the thigh. It typically occurs during maximum-speed sprinting, lunging, high kicking, or sudden forceful hip flexion with an extended knee.",
    firstAid: [
      "Protect: Stop sprinting and avoid stretching the back of your thigh aggressively during the first 48 hours.",
      "Elevate: Lie down with a pillow under your hips or legs to minimize dependent edema.",
      "Avoid anti-inflammatories: Avoid anti-inflammatory tablets in the first 48 hours to allow the early cellular healing response.",
      "Compress: Apply an elastic thigh sleeve or compression bandage around the thigh muscle belly.",
      "Educate: Understand that gentle early movement and progressive isometric contractions rebuild muscle fiber alignment.",
      "Load: Begin pain-free isometric contractions and gentle walking once the sharp grab subsides.",
      "Optimism: Muscle tissue has a rich blood supply and responds very well to structured eccentric loading.",
      "Vascularisation: Engage in gentle upright stationary cycling with a high saddle to promote muscle blood flow.",
      "Exercise: Progress from isometric bridge holds to eccentric hamstring sliders and Nordic curls."
    ],
    exercises: {
      "Day 1-3": [
        {
          name: "Submaximal prone isometric holds",
          sets: "3 sets",
          reps: "5 reps (5-sec hold)",
          howTo: "Lie on your stomach, bend your knee to 45 degrees, and have a partner or strap provide gentle resistance while you hold."
        },
        {
          name: "Glute bridges (double leg)",
          sets: "3 sets",
          reps: "10-12 reps",
          howTo: "Lie on your back with knees bent and feet flat, lift your hips toward the ceiling squeezing your glutes, hold for 2 seconds."
        },
        {
          name: "Gentle nerve flossing",
          sets: "2 sets",
          reps: "10 reps",
          howTo: "Sit on a chair, slump slightly forward, straighten your knee while looking up, then bend your knee while tucking your chin."
        }
      ],
      "Week 1": [
        {
          name: "Single-leg glute bridge",
          sets: "3 sets",
          reps: "8-10 reps per leg",
          howTo: "Lie on your back, lift your uninjured leg off the ground, and push through your injured-side heel to raise your hips."
        },
        {
          name: "Hamstring bridge on gym ball or slider",
          sets: "3 sets",
          reps: "8-10 reps",
          howTo: "Place your heels on a slider or ball, bridge up, and slowly slide your heels forward away from your body with control."
        },
        {
          name: "Standing hip extension with resistance band",
          sets: "3 sets",
          reps: "12-15 reps",
          howTo: "Stand facing a wall with a band around your ankle, kick your leg straight backward squeezing your glute and upper hamstring."
        }
      ],
      "Week 2 and beyond": [
        {
          name: "Nordic hamstring lowers (partner assisted)",
          sets: "3 sets",
          reps: "5-6 reps",
          howTo: "Kneel with your feet held by a partner or anchored, slowly lean your body forward controlling the descent with your hamstrings."
        },
        {
          name: "Single-leg Romanian deadlift (dumbbell)",
          sets: "3 sets",
          reps: "8-10 reps per leg",
          howTo: "Stand on the injured leg, hinge at your hips keeping your back flat, reach toward the floor, and return to standing."
        },
        {
          name: "High-speed sprint buildup drills",
          sets: "4-5 sets",
          reps: "40-meter runs",
          howTo: "Gradually accelerate from 50% to 70%, 85%, and finally 95% speed on a flat pitch, focusing on smooth stride mechanics."
        }
      ]
    },
    tapingGuide: [
      "1. Stand with your knee slightly bent and heel resting on a small step, cleaning the back of the thigh.",
      "2. Apply two parallel anchor strips below the buttock fold and above the back of the knee.",
      "3. Apply overlapping X-shaped strips over the tender muscle area with 40-50% tension to support muscle fibers.",
      "4. Finish with two circular anchor bands around the thigh, ensuring they are not tight enough to restrict circulation.",
      "5. Smooth down the tape firmly to activate the adhesive.",
      "Note: Learn the technique from a physio or a trusted video before trying it."
    ],
    medicineInfo: "General pain-relief options include over-the-counter pain-relief gels applied directly to the skin and common over-the-counter pain relievers taken by mouth to help manage daily discomfort. Ask a pharmacist or doctor before taking any medicine, especially if you have allergies, stomach problems, asthma, or are under 18.",
    restDuration: {
      mild: "1 to 3 weeks of modified training",
      moderate: "4 to 8 weeks with progressive eccentric strengthening",
      severe: "8 to 16 weeks requiring specialist ultrasound/MRI review"
    },
    returnToPlayChecklist: [
      "Zero pain on manual palpation (pressing) of the hamstring muscle belly",
      "Full active knee extension with hip flexed at 90 degrees equal to the uninjured leg",
      "Hamstring strength on isometric testing at 90° and 30° flexion equal to the opposite side",
      "Able to perform 10 single-leg Romanian deadlifts with good form",
      "Passes a backward sprint and high-knee skipping drill without catching",
      "Completed 3 full-speed sprint sessions (100% effort) with zero post-session soreness or tightness"
    ],
    mistakesToAvoid: [
      "Aggressively stretching the hamstring immediately after the injury, which tears healing scar tissue",
      "Returning to high-speed sprinting too early when you only feel good jogging at 50% pace",
      "Skipping eccentric (lengthening) strengthening exercises, which are essential to prevent re-tears",
      "Ignoring pelvic and core stability, which puts excess strain on hamstring attachments"
    ],
    seeDoctorIf: [
      "A distinct popping or tearing sensation occurred near the sitting bone (ischial tuberosity)",
      "Visible large dark bruise (hematoma) spreading down the entire back of the leg to the calf",
      "Significant loss of muscle bulk or a visible dent / gap in the muscle belly",
      "Numbness, tingling, or weakness extending down past the knee into the foot"
    ]
  },

  wristSprain: {
    title: "Wrist Sprain & Ligament Injury",
    likelyCause: "This may be a ligament sprain of the radiocarpal or intercarpal joints, or an irritation of the wrist flexor or extensor tendon sheaths. It most frequently occurs after a fall onto an outstretched hand (FOOSH), direct impact from a ball, or forceful twisting during sports like gymnastics, boxing, tennis, or skating.",
    firstAid: [
      "Protect: Rest the wrist from gripping, push-ups, or heavy lifting for the first 48 hours.",
      "Elevate: Keep your hand and wrist elevated on a pillow or resting on your chest to assist fluid drainage.",
      "Avoid anti-inflammatories: Avoid anti-inflammatory medications during the initial 48 hours so early healing can proceed naturally.",
      "Compress: Apply an elastic wrist wrap or supportive splint to stabilize the joint and minimize swelling.",
      "Educate: Gentle finger and thumb mobility should be maintained early to prevent finger joint stiffness.",
      "Load: Gradually reintroduce gentle wrist movements within a comfortable, pain-free range.",
      "Optimism: Most minor wrist ligament strains heal cleanly with targeted mobility and progressive grip loading.",
      "Vascularisation: Perform brisk walking or stationary cycling to stimulate systemic healing circulation.",
      "Exercise: Progress from tendon glides and gentle active wrist circles to grip strength and weight-bearing."
    ],
    exercises: {
      "Day 1-3": [
        {
          name: "Finger tendon glides",
          sets: "3 sets",
          reps: "10 reps",
          howTo: "Move your fingers smoothly from an open hand to a hook fist, full fist, and flat tabletop hand to keep tendons gliding."
        },
        {
          name: "Gentle wrist flexion & extension",
          sets: "2-3 sets",
          reps: "8-10 reps",
          howTo: "Rest your forearm on a table with your hand over the edge and gently move your wrist up and down within a pain-free range."
        },
        {
          name: "Thumb active circles",
          sets: "2-3 sets",
          reps: "10 circles each way",
          howTo: "Make smooth, circular motions with your thumb, touching the tip of each finger one by one."
        }
      ],
      "Week 1": [
        {
          name: "Isometric wrist extension",
          sets: "3 sets",
          reps: "8 reps (5-sec hold)",
          howTo: "Place your palm face down on a table and gently push the back of your hand against your other hand without allowing movement."
        },
        {
          name: "Isometric wrist flexion",
          sets: "3 sets",
          reps: "8 reps (5-sec hold)",
          howTo: "Place your palm face up on a table and gently press your palm upward against resistance without moving the joint."
        },
        {
          name: "Forearm pronation & supination",
          sets: "3 sets",
          reps: "10-12 reps",
          howTo: "Rest your elbow on a table holding a light pen or ruler, slowly rotate your palm to face up, then rotate to face down."
        }
      ],
      "Week 2 and beyond": [
        {
          name: "Wrist curls with light dumbbell (or water bottle)",
          sets: "3 sets",
          reps: "12-15 reps",
          howTo: "Support your forearm on your thigh holding a light weight and slowly curl your wrist upward, then lower with control."
        },
        {
          name: "Grip strengthener / stress ball squeeze",
          sets: "3 sets",
          reps: "12-15 reps (3-sec hold)",
          howTo: "Squeeze a soft stress ball or therapy putty firmly, hold for 3 seconds, and release slowly."
        },
        {
          name: "Weight-bearing wall presses",
          sets: "3 sets",
          reps: "10 reps",
          howTo: "Place your palms flat on a wall at shoulder height and gently lean your body weight forward, gradually loading the wrist."
        }
      ]
    },
    tapingGuide: [
      "1. Keep your wrist in a neutral straight position with fingers relaxed and clean the skin.",
      "2. Wrap an anchor strip around the forearm about 2 inches below the wrist joint.",
      "3. Apply a figure-of-eight strip through the space between thumb and index finger, crossing over the back of the wrist with 30-40% tension.",
      "4. Apply an overlapping circular support band around the wrist crease to provide stability against hyperextension.",
      "5. Check that your fingers remain warm with normal skin color and no numbness.",
      "Note: Learn the technique from a physio or a trusted video before trying it."
    ],
    medicineInfo: "General pain-relief options include over-the-counter pain-relief gels applied directly to the skin and common over-the-counter pain relievers taken by mouth to help manage daily discomfort. Ask a pharmacist or doctor before taking any medicine, especially if you have allergies, stomach problems, asthma, or are under 18.",
    restDuration: {
      mild: "1 to 2 weeks of protective activity",
      moderate: "3 to 6 weeks with progressive wrist rehabilitation",
      severe: "6 to 12 weeks with clinical examination for scaphoid or TFCC injury"
    },
    returnToPlayChecklist: [
      "Zero pain when gripping, turning a doorknob, or carrying everyday objects",
      "Full wrist flexion and extension range equal to the uninjured side",
      "Grip strength measured with a dynamometer or ball squeeze matches the opposite hand",
      "Able to bear full body weight in a floor push-up position without pain",
      "Can catch a firm ball or strike an athletic implement (racquet, stick, punch) without hesitation",
      "No tenderness in the anatomical snuffbox (base of thumb)"
    ],
    mistakesToAvoid: [
      "Ignoring pain in the anatomical snuffbox near the thumb base, which can signal a scaphoid bone fracture",
      "Tying wraps or tape too tightly around the wrist, which compresses the median and ulnar nerves",
      "Returning to heavy bench presses or gymnastics tumbling while wrist extension is still stiff and painful",
      "Allowing fingers to become stiff through complete lack of movement"
    ],
    seeDoctorIf: [
      "Severe tenderness in the hollow 'anatomical snuffbox' at the base of the thumb (possible scaphoid fracture)",
      "Visible deformity, crookedness, or bone protrusion",
      "Numbness, loss of sensation, or electrical shooting sensations into the fingers",
      "Inability to move the fingers or thumb"
    ]
  },

  lowerBackPain: {
    title: "Lower Back Strain & Lumbar Sprain",
    likelyCause: "This may be a muscle strain of the lumbar erector spinae, an irritation of the sacroiliac (SI) joints, or mild mechanical facet joint stiffness from heavy lifting, twisting, or sudden impact. It commonly develops from bowling, prolonged crouched positions, sudden torsion, or lifting with a rounded spine.",
    firstAid: [
      "Protect: Avoid heavy lifting, forward bending with rounded back, or sudden high-impact twisting for 48 hours.",
      "Elevate: Lie flat with your lower legs elevated on a chair or pillows ('90-90 position') to decompress the lumbar spine.",
      "Avoid anti-inflammatories: Avoid relying on anti-inflammatory pills in the initial days; allow natural protective repair processes.",
      "Compress: Apply gentle warmth or a supportive abdominal brace during short walking periods if spasm is intense.",
      "Educate: Bed rest beyond 24-48 hours worsens back stiffness; gentle, frequent walking is the best early medicine.",
      "Load: Gradually reintroduce neutral spine hip-hinging and gentle spinal mobility.",
      "Optimism: Back pain is very common and usually improves significantly within 2 to 4 weeks with active movement.",
      "Vascularisation: Take short 10-15 minute walks on flat surfaces 2 to 3 times a day to pump healing fluids.",
      "Exercise: Progress through cat-cow stretches, bird-dogs, bridges, and core bracing."
    ],
    exercises: {
      "Day 1-3": [
        {
          name: "Pelvic tilts",
          sets: "2-3 sets",
          reps: "10 reps",
          howTo: "Lie on your back with knees bent and gently flatten your lower back into the floor by tightening your abdominal muscles, holding for 3 seconds."
        },
        {
          name: "Knee-to-chest stretch (single leg)",
          sets: "2-3 sets",
          reps: "8-10 reps (5-sec hold)",
          howTo: "Lie on your back and gently draw one knee up toward your chest with your hands, keeping the other foot flat on the floor."
        },
        {
          name: "Gentle Cat-Cow mobility",
          sets: "2 sets",
          reps: "8-10 slow cycles",
          howTo: "On hands and knees, slowly round your spine toward the ceiling like a cat, then gently lower your belly and look forward."
        }
      ],
      "Week 1": [
        {
          name: "Bird-Dog (quadruped opposite arm/leg)",
          sets: "3 sets",
          reps: "8-10 reps per side",
          howTo: "On hands and knees, reach your right arm forward and left leg backward keeping your spine completely level, hold 3 seconds."
        },
        {
          name: "Glute bridges with neutral spine",
          sets: "3 sets",
          reps: "10-12 reps",
          howTo: "Lie on your back with knees bent, push through your heels to raise your hips while keeping your ribs and pelvis aligned."
        },
        {
          name: "Modified side plank on knees",
          sets: "3 sets",
          reps: "15-20 sec hold per side",
          howTo: "Lie on your side supported on your forearm and bent knees, lift your hips so your body forms a straight line."
        }
      ],
      "Week 2 and beyond": [
        {
          name: "Pallof press with resistance band",
          sets: "3 sets",
          reps: "10 reps (3-sec hold)",
          howTo: "Stand holding a band anchored to the side, press the band straight forward from your chest and resist torso rotation."
        },
        {
          name: "Deadbug core activation",
          sets: "3 sets",
          reps: "10-12 reps per side",
          howTo: "Lie on your back with arms up and knees at 90 degrees, slowly lower opposite arm and leg toward the floor without arching your back."
        },
        {
          name: "Hip hinge with dowel / bodyweight RDL",
          sets: "3 sets",
          reps: "10-12 reps",
          howTo: "Stand tall, push your hips backward with a slight knee bend, maintaining a straight neutral spine, then drive hips forward."
        }
      ]
    },
    tapingGuide: [
      "1. Stand bending slightly forward from the hips with hands supported on a table to place lower back muscles on gentle stretch.",
      "2. Apply two vertical strips running upward parallel to the spine along the paraspinal muscles with 25-30% tension.",
      "3. Apply a horizontal decompression strip across the lower lumbar region (belt line) with 50-75% tension in the center and zero tension on the anchors.",
      "4. Rub the strips thoroughly to activate the heat-sensitive adhesive.",
      "5. Stand upright and ensure the tape provides comfortable support without pulling skin painfully.",
      "Note: Learn the technique from a physio or a trusted video before trying it."
    ],
    medicineInfo: "General pain-relief options include over-the-counter pain-relief gels applied directly to the skin and common over-the-counter pain relievers taken by mouth to help manage daily discomfort. Ask a pharmacist or doctor before taking any medicine, especially if you have allergies, stomach problems, asthma, or are under 18.",
    restDuration: {
      mild: "3 to 7 days of active walking and gentle mobility",
      moderate: "2 to 6 weeks with core and hip rehabilitation",
      severe: "6 to 12 weeks requiring clinical physiotherapy or medical imaging"
    },
    returnToPlayChecklist: [
      "Zero pain when sitting, standing, or walking for 45 continuous minutes",
      "Full spinal forward bending and backward extension without catching or muscle spasm",
      "Core and glute endurance on side planks and bird-dogs meets baseline targets",
      "Able to perform bodyweight squats and hip hinges with a neutral spine pain-free",
      "Can jog, sprint, and change direction without jarring the lower back",
      "No radiating sensations or numbness in the legs or feet"
    ],
    mistakesToAvoid: [
      "Staying in bed for multiple consecutive days, which weakens core musculature and increases stiffness",
      "Immediately lifting heavy weights or fast bowling before rebuilding deep abdominal and glute control",
      "Ignoring pain that shoots past the knee into the calf, foot, or toes",
      "Sitting slumped in soft couches for hours without lower back support"
    ],
    seeDoctorIf: [
      "Numbness around your groin, buttocks, or saddle area (saddle anesthesia)",
      "Sudden loss of bowel or bladder control (emergency Cauda Equina Syndrome red flag)",
      "Progressive weakness in the leg (such as foot drop or tripping when walking)",
      "Unbearable pain radiating down the back of the leg past the knee (sciatica)"
    ]
  }
};

/**
 * Mapping table from EVERY body region ID in bodyParts.js and 3D body models
 * to one of the 6 core clinical injury categories (or null if no direct match).
 */
const regionToInjury = {
  // Head & Neck (No direct match -> null)
  head: null,
  neck_front: null,
  neck_back: null,
  neck: null,

  // Torso / Trunk
  chest: "shoulderPain",
  upper_back: "shoulderPain",
  torso_upper: "shoulderPain",
  abdomen: null,
  torso_lower: "lowerBackPain",
  lower_back: "lowerBackPain",

  // Shoulders (Shoulder Pain)
  left_shoulder_front: "shoulderPain",
  left_shoulder_back: "shoulderPain",
  right_shoulder_front: "shoulderPain",
  right_shoulder_back: "shoulderPain",
  left_shoulder: "shoulderPain",
  right_shoulder: "shoulderPain",

  // Upper Arms (Shoulder Pain)
  left_upper_arm_front: "shoulderPain",
  left_upper_arm_back: "shoulderPain",
  right_upper_arm_front: "shoulderPain",
  right_upper_arm_back: "shoulderPain",
  left_upper_arm: "shoulderPain",
  right_upper_arm: "shoulderPain",

  // Elbows & Forearms (Wrist Sprain / Upper extremity tendon category)
  left_elbow: "wristSprain",
  right_elbow: "wristSprain",
  left_forearm: "wristSprain",
  right_forearm: "wristSprain",

  // Wrists & Hands (Wrist Sprain)
  left_wrist: "wristSprain",
  right_wrist: "wristSprain",
  left_hand: "wristSprain",
  right_hand: "wristSprain",

  // Hips & Pelvis (Lower Back Pain / Lumbo-pelvic hip complex)
  left_hip: "lowerBackPain",
  right_hip: "lowerBackPain",

  // Thighs (Front Thigh -> kneePain / Patellofemoral; Back Thigh -> hamstringStrain)
  left_thigh_front: "kneePain",
  right_thigh_front: "kneePain",
  left_thigh: "kneePain",
  right_thigh: "kneePain",
  left_thigh_back: "hamstringStrain",
  right_thigh_back: "hamstringStrain",

  // Knees (Knee Pain)
  left_knee_front: "kneePain",
  left_knee_back: "kneePain",
  right_knee_front: "kneePain",
  right_knee_back: "kneePain",
  left_knee: "kneePain",
  right_knee: "kneePain",

  // Lower Legs (Shin & Calf -> Ankle Sprain / Lower kinetic chain)
  left_shin: "ankleSprain",
  right_shin: "ankleSprain",
  left_calf: "ankleSprain",
  right_calf: "ankleSprain",
  left_lower_leg: "ankleSprain",
  right_lower_leg: "ankleSprain",

  // Ankles & Feet (Ankle Sprain)
  left_ankle: "ankleSprain",
  right_ankle: "ankleSprain",
  left_foot: "ankleSprain",
  right_foot: "ankleSprain"
};
