// Module reference data for ModularManuals.

const MODULES = [
  {
    "id": "gliss",
    "name": "GLISS",
    "manufacturer": "Bela",
    "hp": 4,
    "tagline": "Touch-controlled CV recorder, slew, quantizer and gestural modulation source in 4HP.",
    "image": "images/gliss.png",
    "hotspots": {
      "strip": {
        "x": 0.51,
        "y": 0.57,
        "rx": 0.055,
        "ry": 0.24
      },
      "button": {
        "x": 0.51,
        "y": 0.16,
        "rx": 0.04,
        "ry": 0.05
      },
      "input": {
        "x": 0.485,
        "y": 0.235,
        "rx": 0.035,
        "ry": 0.045
      },
      "output": {
        "x": 0.535,
        "y": 0.27,
        "rx": 0.035,
        "ry": 0.06
      }
    },
    "manualUrl": "https://bela.io/products/gliss/",
    "overview": "A 4HP touch strip that turns finger position and pressure into CV — touch controller, gesture recorder/LFO, signal processor and keyboard/sequencer, in four modes.",
    "specs": {
      "Width": "4 HP",
      "Depth": "26 mm",
      "Power": "+12V 150mA / -12V 20mA",
      "Max recording": "75 seconds of gesture",
      "Sensing": "High-resolution capacitive touch (Trill)",
      "Firmware": "Web-upgradeable (v2, Oct 2024)"
    },
    "sections": [
      {
        "title": "What GLISS is",
        "body": [
          "A 4HP capacitive touch strip that turns finger gestures into CV — it reads finger position and touch size (like pressure), with 23 LEDs for feedback.",
          "One button, one input and two outputs cover four modes: Control, Record, Signal and Notes."
        ],
        "controls": [
          {
            "name": "Touch Strip",
            "type": "switch",
            "desc": "Large capacitive surface sensing finger position with sub-millimetre accuracy plus touch size (pressure). Reads single or multiple touches depending on the Mode.",
            "tip": "Touch size is your second expressive dimension — map it to a VCA for dynamics even when position controls pitch."
          },
          {
            "name": "23-LED column",
            "type": "switch",
            "desc": "LEDs backlight the Touch Strip and give per-Mode feedback: tracking your finger, replaying recorded gestures, or acting as an oscilloscope/level meter.",
            "tip": "Adjust their brightness in Global Settings for outdoor or dim stages."
          },
          {
            "name": "The Button",
            "type": "button",
            "desc": "Single illuminated button that glows green, red or yellow. Used both for Mode-specific actions and for navigating the Menu and Global Settings.",
            "tip": "Watch its colour — it tells you which sub-state you are in (e.g. yellow = clock tick, red = editing)."
          },
          {
            "name": "Input",
            "type": "jack-in",
            "desc": "One mono 3.5mm input for clocks, triggers, V/oct and CV. Full range -5V to +10V; ±10V safe. Trigger threshold is 2V.",
            "tip": ""
          },
          {
            "name": "Top Output / Output 1",
            "type": "jack-out",
            "desc": "Mono 3.5mm CV/gate/trigger output. Range -5V to +10V, individually configurable per Mode.",
            "tip": ""
          },
          {
            "name": "Bottom Output / Output 2",
            "type": "jack-out",
            "desc": "Second mono 3.5mm output carrying the related second stream of control (e.g. touch size, the inverse signal, or a trigger). Range -5V to +10V, configurable per Mode.",
            "tip": ""
          }
        ],
        "howtos": [
          {
            "goal": "Hear finger position and touch size right after install",
            "steps": [
              "Power up; GLISS starts in Control Mode (no menu needed).",
              "Patch the Top Output to a VCO's frequency input and slide your finger up and down the strip to sweep pitch.",
              "Patch the Bottom Output to a VCA's CV input and vary how hard you press to change amplitude.",
              "Both outputs default to a 0V to +10V range, so the VCA may get loud — start gently."
            ]
          }
        ]
      },
      {
        "title": "The button & menus",
        "body": [
          "With a single button, everything is done by finger-counts and holds.",
          "Hold the button + a two-finger tap opens the current mode's menu; a three-finger tap opens global settings."
        ],
        "controls": [
          {
            "name": "Mode Selector",
            "type": "mode",
            "desc": "Green selector at the top of the Menu. Tap to step through Control → Record → Signal → Notes. Hold 2 seconds to enter Calibration Mode.",
            "tip": "A tap during the mode animation skips straight to the next mode."
          },
          {
            "name": "Settings Selectors",
            "type": "mode",
            "desc": "Two or three per Mode. Discrete ones step through a group of options (colour shows position); continuous ones act as sliders you set by sliding a point.",
            "tip": "Hold any selector for 3 seconds to reset it to factory default."
          },
          {
            "name": "Voltage Range Selector",
            "type": "mode",
            "desc": "Blue/white selector at the bottom of the Menu. Opens Input / Top Out / Bottom Out range editors. Tap a sub-selector for presets; hold it to set a custom range manually.",
            "tip": "Ranges are saved per Mode and survive power-off."
          },
          {
            "name": "Global Settings",
            "type": "mode",
            "desc": "Module-wide settings: Touch Sensitivity, LED Brightness, Menu Animations toggle and Module Orientation. Entered with a three-finger gesture.",
            "tip": "Set Touch Sensitivity to maximum to unlock the gesture-length GATE trick in Record Mode."
          }
        ],
        "howtos": [
          {
            "goal": "Switch from one Performance Mode to another",
            "steps": [
              "From the active Mode, hold the Button, tap the strip with 2 fingers, then release the Button — you are now in the Menu.",
              "Tap the green Mode Selector at the top to step Control -> Record -> Signal -> Notes (tap again to skip the animation).",
              "Tap the Button to enter the chosen Mode's active state."
            ]
          },
          {
            "goal": "Set a custom voltage range for an Output in the current Mode",
            "steps": [
              "From the active Mode, hold the Button, tap the strip with 2 fingers, then release to open the Menu.",
              "Tap the blue/white Voltage Range Selector at the bottom of the Menu.",
              "Tap a preset on the Top or Bottom Output sub-selector, or hold the sub-selector to drag its two range points manually in 1V steps (red points mark -5V/0V/+5V/+10V).",
              "Tap the Button to save; the range is remembered for this Mode even after power-off."
            ]
          },
          {
            "goal": "Open Global Settings",
            "steps": [
              "From any active Mode, hold the Button.",
              "Tap the Touch Strip with 3 fingers.",
              "Release the Button — the three orange selectors (Touch Sensitivity, LED Brightness, Menu Animations) and the red Orientation selector appear."
            ]
          }
        ]
      },
      {
        "title": "Control mode",
        "body": [
          "Live touch-to-CV: finger position on one output, touch size on the other.",
          "Pick single/dual sliders or pads, choose how it latches when you lift off, and add per-output attack/release slew."
        ],
        "controls": [
          {
            "name": "Selector 1: Touch Input Type",
            "type": "mode",
            "desc": "Single Slider (position + touch size), Dual Slider (two positions), Dual Touch (two touch sizes), or Slider + Touch (position slider plus pad).",
            "tip": "Slider + Touch is great when you want independent pitch and a pressure pad for dynamics or gates."
          },
          {
            "name": "Selector 2: Latching",
            "type": "mode",
            "desc": "Unlatched (both outputs to 0V on release), Latched (hold both), or Latch Position (hold position, drop touch size to 0V).",
            "tip": "Latch Position turns touch size into a natural GATE that's high only while pressed."
          },
          {
            "name": "Selector 3: Slew Rate (v2)",
            "type": "mode",
            "desc": "Sub-menu of four slews — attack and release for each Output — from 0 to 100s, set by sliding a point. Replaces the old instant jump behaviour.",
            "tip": "No separate ADSR needed for simple shaped touches."
          },
          {
            "name": "Button",
            "type": "button",
            "desc": "Toggles on-the-fly latching of both outputs while a finger is on the strip.",
            "tip": "Tap it repeatedly while sliding for a manual sample-and-hold."
          },
          {
            "name": "Input",
            "type": "jack-in",
            "desc": "Accepts a trigger signal (min 2V) to latch/unlatch instead of the Button.",
            "tip": ""
          }
        ],
        "howtos": [
          {
            "goal": "Play pitch with position and trigger an envelope with touch",
            "steps": [
              "Be in Control Mode (the power-on default; if elsewhere, open the Menu by holding the Button + 2-finger tap + release, tap the green Mode Selector to Control, tap the Button).",
              "Open the Control Menu (hold Button, 2-finger tap, release) and tap Selector 1 (Touch Input Type) to Single Slider.",
              "Tap Selector 2 (Latching) to Latch Position, then tap the Button to return to active Mode.",
              "Patch Top Output to a VCO's V/oct and Bottom Output to your envelope's gate input.",
              "Slide to choose a pitch (held when you lift); press your finger to send the touch-size gate that fires the envelope for as long as you hold."
            ]
          },
          {
            "goal": "Create a tactile sample-and-hold",
            "steps": [
              "Be in Control Mode (power-on default; otherwise open the Menu with hold-Button + 2-finger tap + release, set the green Mode Selector to Control, tap the Button).",
              "Open the Control Menu (hold Button, 2-finger tap, release), tap Selector 2 (Latching) to Unlatched, then tap the Button to return to active Mode.",
              "Move your finger along the strip.",
              "Press the Button to 'sample' and hold the current value.",
              "Press the Button again (or touch the strip) to release/update."
            ]
          },
          {
            "goal": "Add a slow attack and release to your touches",
            "steps": [
              "Be in Control Mode (power-on default; otherwise open the Menu with hold-Button + 2-finger tap + release, set the green Mode Selector to Control, tap the Button).",
              "Open the Control Menu (hold Button, 2-finger tap, release).",
              "Tap Selector 3 (Slew Rate) to open the Slew sub-menu of four attack/release points.",
              "Tap Top Output attack and slide the point up (0-1s in the first 40% of the strip).",
              "Tap Top Output release and set the fall time the same way.",
              "Tap the Button to leave; the orange point now ramps toward your finger."
            ]
          }
        ]
      },
      {
        "title": "Record mode",
        "body": [
          "Draw a gesture (up to 150s) and replay it as a looping LFO, a triggered envelope, a wavetable oscillator or a waveshaper.",
          "Recording starts when you touch the strip and saves when you lift."
        ],
        "controls": [
          {
            "name": "Selector 1: Touch Input Type",
            "type": "mode",
            "desc": "Single Slider, Dual Slider, Dual Touch or Slider + Touch — record one combined gesture or two independent gestures on the strip halves.",
            "tip": ""
          },
          {
            "name": "Selector 2: Playback",
            "type": "mode",
            "desc": "Loop, Trigger, Clock, Wavetable or Waveshaper — the five ways a recorded gesture is played back.",
            "tip": "Dual Slider + Trigger gives two custom-shaped envelope generators fired together."
          },
          {
            "name": "Button",
            "type": "button",
            "desc": "Context-sensitive: triggers/erases loops and records discrete gestures (Loop), triggers/marks attack point (Trigger), starts/stops/arms recording and erases (Clock), and toggles in/out-point editing (Wavetable/Waveshaper).",
            "tip": "Watch its colour — red while recording, yellow per clock tick, green while editing in/out points."
          },
          {
            "name": "Input",
            "type": "jack-in",
            "desc": "Trigger signal (Loop/Trigger), clock (Clock), V/oct (Wavetable) or scrubbing CV (Waveshaper). Trigger threshold 2V.",
            "tip": ""
          },
          {
            "name": "Top Output",
            "type": "jack-out",
            "desc": "Carries position (Single/Slider+Touch slider position), or top/left gesture for Dual types.",
            "tip": ""
          },
          {
            "name": "Bottom Output",
            "type": "jack-out",
            "desc": "Carries touch size (Single/Slider+Touch), or bottom/right gesture for Dual types.",
            "tip": ""
          }
        ],
        "howtos": [
          {
            "goal": "Record a looping custom LFO",
            "steps": [
              "Open the Menu (hold Button, 2-finger tap, release), tap the green Mode Selector to Record, tap the Button to enter Record's active Mode.",
              "Open the Record Menu (hold Button, 2-finger tap, release), tap Selector 2 (Playback) to Loop, tap the Button to return to active Mode.",
              "Place a finger on the strip and draw your modulation shape.",
              "Lift your finger — the gesture loops at its recorded speed.",
              "Re-draw at any time to overwrite, or hold the Button 3 seconds to erase."
            ]
          },
          {
            "goal": "Make two custom envelopes triggered together",
            "steps": [
              "Open the Menu (hold Button, 2-finger tap, release), tap the green Mode Selector to Record, tap the Button to enter Record's active Mode.",
              "Open the Record Menu (hold Button, 2-finger tap, release), tap Selector 1 (Touch Input Type) to Dual Slider and Selector 2 (Playback) to Trigger, tap the Button to return.",
              "On each strip half, draw the envelope, pressing the Button (finger down) to mark the attack/release split if desired.",
              "Patch a gate into the Input (or press the Button) to fire both attacks on the rising edge and both releases on the falling edge.",
              "Route Output 1 to a VCA and Output 2 to a filter cutoff."
            ]
          },
          {
            "goal": "Use a recorded gesture as a wavetable oscillator",
            "steps": [
              "Open the Menu (hold Button, 2-finger tap, release), tap the green Mode Selector to Record, tap the Button to enter Record's active Mode.",
              "Open the Record Menu (hold Button, 2-finger tap, release), tap Selector 2 (Playback) to Wavetable; then tap the blue/white Voltage Range Selector at the bottom and set the Output to the -5V to +5V preset.",
              "Tap the Button to return to active Mode, then draw a single-cycle-style gesture (start and end at the same point for a smooth tone).",
              "Patch a V/oct signal into the Input and an Output into a mixer/audio path.",
              "Tap the Button to enter in/out editing and drag the green points to trim the waveform for new timbres."
            ]
          }
        ]
      },
      {
        "title": "Signal mode",
        "body": [
          "A CV/audio utility: scale, offset, clip, smooth and invert an incoming signal.",
          "It also visualises it — CV as a moving point, audio as a level meter."
        ],
        "controls": [
          {
            "name": "Selector 1: Input signal",
            "type": "mode",
            "desc": "Control Voltage (DC, shown as an oscilloscope point) or Audio Signal (AC, shown as a level meter with a 12ms RMS window).",
            "tip": ""
          },
          {
            "name": "Selector 2: Output type",
            "type": "mode",
            "desc": "Signal/Inverted signal, Signal/Envelope detector, or Envelope detector/Inverted envelope detector — sets what each Output carries.",
            "tip": "Pick an envelope-detector output to follow the amplitude of audio or a busy CV."
          },
          {
            "name": "Selector 3: Envelope decay",
            "type": "mode",
            "desc": "Continuous control for how much smoothing is applied to the envelope detector's fall — slide down for fast, up for slow.",
            "tip": ""
          },
          {
            "name": "Button",
            "type": "button",
            "desc": "In Active Mode, tap to enter/exit clipping editing — it turns red and two red clip points appear on the strip.",
            "tip": ""
          },
          {
            "name": "Input",
            "type": "jack-in",
            "desc": "The CV or audio signal to be processed. Range is fully customisable for Signal Mode.",
            "tip": "Match the Input range to your source for the most useful scaling."
          },
          {
            "name": "Touch Strip (2-finger gesture)",
            "type": "switch",
            "desc": "Place two fingers to scale (slide apart/together) and offset (slide both) the incoming signal; values store when you lift.",
            "tip": ""
          }
        ],
        "howtos": [
          {
            "goal": "Scale and offset an incoming CV on the fly",
            "steps": [
              "Open the Menu (hold Button, 2-finger tap, release), tap the green Mode Selector to Signal, tap the Button to enter Signal's active Mode.",
              "Open the Signal Menu (hold Button, 2-finger tap, release), tap Selector 1 (Input signal) to Control Voltage, tap the Button to return.",
              "Patch your CV source into the Input, then place one finger near the top and one near the bottom of the strip.",
              "Slide the gold points together/apart to scale, and drag both up/down to offset.",
              "Lift your fingers to store the result; the green point shows the live input between your fingertips."
            ]
          },
          {
            "goal": "Use clipping as audio distortion",
            "steps": [
              "Open the Menu (hold Button, 2-finger tap, release), tap the green Mode Selector to Signal, tap the Button to enter Signal's active Mode.",
              "Open the Signal Menu (hold Button, 2-finger tap, release), tap Selector 1 (Input signal) to Audio Signal, tap the Button to return.",
              "Feed audio into the Input, then tap the Button (it turns red) to show the two clip points.",
              "Slide the points inward to clip the positive and negative halves independently.",
              "Adjust to taste — point position changes the harmonics and character of the distortion."
            ]
          },
          {
            "goal": "Follow the amplitude of a drum with an envelope",
            "steps": [
              "Open the Menu (hold Button, 2-finger tap, release), tap the green Mode Selector to Signal, tap the Button to enter Signal's active Mode.",
              "Open the Signal Menu (hold Button, 2-finger tap, release), tap Selector 1 (Input signal) to Audio Signal and Selector 2 (Output type) to an Envelope detector output.",
              "Tap Selector 3 (Envelope decay) and slide the point up for a slower fall, then tap the Button to return.",
              "Patch the audio into the Input and the envelope Output to a VCA or filter; the animated LED point previews the envelope shape."
            ]
          }
        ]
      },
      {
        "title": "Notes mode",
        "body": [
          "Turns the strip into up to five tunable notes — play them as a keyboard, or step them from a clock as a sequencer.",
          "Tune by hand or from a V/Oct source, with optional quantising to a scale."
        ],
        "controls": [
          {
            "name": "Selector 1: Play type",
            "type": "mode",
            "desc": "Keyboard (touch-played notes with vibrato and glissando) or Sequencer (notes stepped by an incoming clock).",
            "tip": ""
          },
          {
            "name": "Selector 2: Quantisation",
            "type": "mode",
            "desc": "ON snaps manual tuning to 12-TET semitones; OFF allows free microtonal voltages.",
            "tip": ""
          },
          {
            "name": "Selector 3: Variable setting",
            "type": "mode",
            "desc": "Continuous control — vibrato depth in Keyboard, glide amount in Sequencer. Slide the point to set it.",
            "tip": ""
          },
          {
            "name": "Button",
            "type": "button",
            "desc": "Three rapid presses enter/exit Tuning; two presses enter note/step configuration (choose keys, or set step states).",
            "tip": "Store a precise manual tuning by pressing the Button while your finger is still on the strip."
          },
          {
            "name": "Top Output / Output 1",
            "type": "jack-out",
            "desc": "Pitch (V/oct) of the current note or step. Default range 0V to +2V for two octaves of easy tuning.",
            "tip": ""
          },
          {
            "name": "Bottom Output / Output 2",
            "type": "jack-out",
            "desc": "Touch size in Keyboard; a per-step trigger in Sequencer (+10V on step 1, +5V on others).",
            "tip": ""
          },
          {
            "name": "Input",
            "type": "jack-in",
            "desc": "V/oct source for CV tuning, or the clock that advances the Sequencer.",
            "tip": ""
          }
        ],
        "howtos": [
          {
            "goal": "Tune the keyboard from an external sequencer (CV tuning)",
            "steps": [
              "Open the Menu (hold Button, 2-finger tap, release), tap the green Mode Selector to Notes, tap the Button to enter Notes' active Mode.",
              "Press the Button rapidly 3 times — notes pulse and the Button turns red (Tuning).",
              "Patch a V/oct source into the Input and play the note you want.",
              "Press the strip note you want to assign that pitch to; repeat for each note.",
              "Press the Button once to return to active Mode."
            ]
          },
          {
            "goal": "Play an expressive keyboard with dynamics",
            "steps": [
              "Open the Menu (hold Button, 2-finger tap, release), tap the green Mode Selector to Notes, tap the Button to enter Notes' active Mode.",
              "Open the Notes Menu (hold Button, 2-finger tap, release), tap Selector 1 (Play type) to Keyboard, dial vibrato depth on Selector 3 (Variable setting), tap the Button to return.",
              "Patch Top Output to a VCO's V/oct and Bottom Output to a VCA's CV.",
              "Tap notes for pitch, press harder for louder dynamics, wiggle a held finger for vibrato, slide for glissando."
            ]
          },
          {
            "goal": "Build a sequence with a rest and a shorter loop",
            "steps": [
              "Open the Menu (hold Button, 2-finger tap, release), tap the green Mode Selector to Notes, tap the Button to enter Notes' active Mode.",
              "Open the Notes Menu (hold Button, 2-finger tap, release), tap Selector 1 (Play type) to Sequencer, tap the Button to return, then patch a clock into the Input.",
              "Press the Button twice so the steps pulse.",
              "Tap a step to cycle its state — set one to Mute for a 0V rest, or Skip to drop it and shorten the loop.",
              "Press the Button once to confirm; tap any step live to jump the sequence there."
            ]
          }
        ]
      },
      {
        "title": "Inputs, outputs & ranges",
        "body": [
          "One input and two outputs, all -5V to +10V, with a voltage range you set per mode.",
          "What each output carries depends on the mode and the chosen input type."
        ],
        "controls": [
          {
            "name": "Input",
            "type": "jack-in",
            "desc": "Mono 3.5mm. -5V to +10V usable, ±10V safe, 2V trigger threshold. Customisable in Record/Signal; fixed or unused in Control/Notes.",
            "tip": ""
          },
          {
            "name": "Top Output / Output 1",
            "type": "jack-out",
            "desc": "Primary output — position, processed signal, or pitch depending on Mode. -5V to +10V, configured per Mode.",
            "tip": ""
          },
          {
            "name": "Bottom Output / Output 2",
            "type": "jack-out",
            "desc": "Secondary output — touch size, inverse/envelope signal, or trigger depending on Mode. -5V to +10V, configured per Mode.",
            "tip": ""
          },
          {
            "name": "Voltage presets",
            "type": "mode",
            "desc": "0V to +10V (default), -5V to +5V, 0V to +5V, -1V to +1V (v2), and a custom range, selected by tapping a range selector.",
            "tip": "The -1V to +1V preset suits video synths and mod-wheel-style interaction."
          }
        ],
        "howtos": [
          {
            "goal": "Match an Output to a module that wants 0V to +5V",
            "steps": [
              "Enter the Mode you want to configure (open the Menu with hold-Button + 2-finger tap + release, tap the green Mode Selector to that Mode, tap the Button), then re-open the Menu (hold Button, 2-finger tap, release).",
              "Tap the blue/white Voltage Range Selector at the bottom of the Menu.",
              "Tap the Top or Bottom Output sub-selector to cycle to the 0V to +5V preset.",
              "Tap the Button to save — the range applies only to this Mode and is remembered after power-off."
            ]
          }
        ]
      },
      {
        "title": "Firmware v2, calibration & reset",
        "body": [
          "Firmware v2 (Oct 2024) is a free upgrade, flashed from Chrome over USB.",
          "Calibration, factory reset and a hardware test mode are reached with button + finger gestures."
        ],
        "controls": [
          {
            "name": "Web flashing tool",
            "type": "mode",
            "desc": "Browser-based upgrade at bela.io/upgrade-gliss; uses WebMIDI over micro-USB, so requires Chrome. Flashing erases all stored settings.",
            "tip": "Re-run calibration after flashing — GLISS usually enters Calibration Mode automatically on reconnection."
          },
          {
            "name": "Calibration Mode",
            "type": "mode",
            "desc": "Voltage-accuracy routine entered by holding the green Mode Selector for 2 seconds. Connect Top Output to Input (in that order) when prompted.",
            "tip": "Must be done with GLISS installed in the rack and all other cables unplugged."
          },
          {
            "name": "Reset all settings",
            "type": "mode",
            "desc": "Hold Button + 5 fingers for 10s, then place one finger on each half of the strip. Restores factory defaults and resets calibration.",
            "tip": "Deliberately awkward to avoid accidental wipes."
          },
          {
            "name": "Factory Test Mode",
            "type": "mode",
            "desc": "Seven-phase hardware diagnostic for LEDs, capacitive pads and the I/O, entered after a reset or via the Button + 5-finger gesture.",
            "tip": "Unresponsive pads usually mean a loose faceplate pin near the strip ends."
          }
        ],
        "howtos": [
          {
            "goal": "Upgrade an existing GLISS to firmware v2",
            "steps": [
              "Open Chrome and go to bela.io/upgrade-gliss.",
              "Connect GLISS to the computer with a micro-USB cable and follow the web tool's prompts (flashing erases all stored settings).",
              "Reinstall GLISS in your rack; it should enter Calibration Mode automatically — run the one-minute calibration.",
              "Re-enter any custom voltage ranges and settings, since flashing erased them."
            ]
          },
          {
            "goal": "Recalibrate voltage accuracy",
            "steps": [
              "With GLISS in your rack and all jacks unplugged, open any Mode's Menu (hold Button, 2-finger tap, release).",
              "Hold the green Mode Selector at the top of the Menu for 2 seconds to enter Calibration Mode.",
              "Press the Button; when the strip centre blinks orange, patch Top Output to Input (Top Output end first).",
              "Wait for the green Button / orange-red stepping point, then tap the Button to save."
            ]
          },
          {
            "goal": "Factory-reset the module",
            "steps": [
              "Hold the Button and place 5 fingers on the strip; keep holding 10 seconds until it blinks gold (top) and red (bottom).",
              "Release, then put one finger on the top half and one on the bottom half.",
              "When the strip fills green from the centre outward, the reset is complete and GLISS enters Factory Test Mode."
            ]
          }
        ]
      }
    ],
    "trivia": [
      {
        "title": "Born from Trill sensors",
        "fact": "Gliss reuses the high-resolution capacitive sensing Bela developed for its Trill touch sensors, which is why a single finger can report both position and contact size with sub-millimeter accuracy."
      },
      {
        "title": "Free firmware glow-up",
        "fact": "Bela shipped a major free firmware v2 in October 2024, adding modes and features to already-purchased modules — flashed straight from a web browser."
      },
      {
        "title": "Reversible faceplate",
        "fact": "The module ships with a second faceplate in the opposite orientation, so you can mount the touch strip and jacks to suit your case layout or playing hand."
      },
      {
        "title": "Not an Endorphin.es module",
        "fact": "Despite often being grouped with other gestural CV tools, Gliss is made by Bela (bela.io), the UK team behind the Bela embedded audio platform and Trill sensors."
      }
    ],
    "outcomes": [
      {
        "title": "Play notes with your finger",
        "si": 2,
        "hi": 0
      },
      {
        "title": "Record a custom LFO",
        "si": 3,
        "hi": 0
      },
      {
        "title": "Play an expressive keyboard",
        "si": 5,
        "hi": 1
      },
      {
        "title": "Turn a gesture into an oscillator",
        "si": 3,
        "hi": 2
      },
      {
        "title": "Build a tactile sample-and-hold",
        "si": 2,
        "hi": 1
      },
      {
        "title": "Trigger two recorded envelopes",
        "si": 3,
        "hi": 1
      },
      {
        "title": "Smooth touches into slow swells",
        "si": 2,
        "hi": 2
      },
      {
        "title": "Scale and offset any CV",
        "si": 4,
        "hi": 0
      },
      {
        "title": "Get an envelope from drums",
        "si": 4,
        "hi": 2
      }
    ]
  },
  {
    "id": "arbhar",
    "name": "Arbhar v2+",
    "manufacturer": "Instruō",
    "hp": 18,
    "tagline": "Polyphonic granular audio processor with built-in microphone and onset-based capture.",
    "image": "images/arbhar.jpg",
    "hotspots": {
      "capture": {
        "x": 0.27,
        "y": 0.83,
        "r": 0.06
      },
      "shift": {
        "x": 0.165,
        "y": 0.815,
        "r": 0.05
      },
      "spray": {
        "x": 0.565,
        "y": 0.725,
        "r": 0.06
      },
      "scan": {
        "x": 0.745,
        "y": 0.745,
        "r": 0.075
      },
      "intensity": {
        "x": 0.47,
        "y": 0.575,
        "r": 0.06
      },
      "sense": {
        "x": 0.34,
        "y": 0.235,
        "r": 0.05
      },
      "layer": {
        "x": 0.295,
        "y": 0.745,
        "r": 0.075
      },
      "pitch": {
        "x": 0.15,
        "y": 0.565,
        "r": 0.05
      },
      "output": {
        "x": 0.84,
        "y": 0.115,
        "r": 0.045
      }
    },
    "manualUrl": "https://www.instruomodular.com/wp-content/uploads/2023/10/Arbhar-Manual-Firmware-2.0-A5.pdf",
    "overview": "Granular processor with a built-in mic: capture six 10-second layers and scatter them as up to 88 grains, with onset detection, Follow/Wavetable playback and USB storage.",
    "specs": {
      "Width": "18 HP",
      "Depth": "42 mm",
      "Power": "+12V 250mA / -12V 30mA",
      "Polyphony": "Up to 88 grains across two engines",
      "Buffers": "6 × 10-second audio buffers",
      "Includes": "2HP CV expander, 2HP USB expander, 4GB USB drive"
    },
    "sections": [
      {
        "title": "Granular concept",
        "body": [
          "Arbhar captures a live or acoustic source, then chops it into tiny grains it can scatter, re-pitch, reverse and layer.",
          "Each grain locks its own settings at birth, so tweaking controls over overlapping grains builds true polyphonic textures."
        ],
        "controls": [
          {
            "name": "Granular Stream Display",
            "type": "mode",
            "desc": "Horizontal LED strip showing layer colour, per-grain amplitudes, Scan position, grain length, spray spread, and record/playhead position."
          },
          {
            "name": "Shift Button",
            "type": "button",
            "desc": "Accesses secondary features, modes and controls. While held, the Granular Stream Display turns red with white ends.",
            "tip": "Almost every hidden mode is a Shift + something gesture; learn to keep Shift held while reaching for the second control."
          },
          {
            "name": "Dry/Wet Knob",
            "type": "knob",
            "desc": "Equal-power crossfade between the dry input signal and the wet granular engines."
          },
          {
            "name": "Output Level Knob",
            "type": "knob",
            "desc": "Sets the level of the signal at the Outputs."
          }
        ],
        "howtos": []
      },
      {
        "title": "Inputs, mic & outputs",
        "body": [
          "Three ways in: built-in mic, Input and Onset Input, normalled so the mic works instantly. The Input preamp saturates musically rather than clipping.",
          "Dry/Wet crossfades grains against the dry signal; Output 2 is normalled and phase-inverted into Output 1 for mono."
        ],
        "controls": [
          {
            "name": "Condenser Microphone",
            "type": "jack-in",
            "desc": "On-panel mic for capturing audio. Normalled through the Onset Input to the Input when nothing is patched."
          },
          {
            "name": "Input (In)",
            "type": "jack-in",
            "desc": "AC-coupled audio input with analogue preamp and limiter; saturates instead of clipping on hot signals."
          },
          {
            "name": "Input Level Knob",
            "type": "knob",
            "desc": "Sets the level of the Input signal including the normalled microphone.",
            "tip": "Unity is around 10:00; go past it to drive the preamp into saturation."
          },
          {
            "name": "Input Indicator",
            "type": "mode",
            "desc": "Amber LED whose brightness tracks the amplitude of the input signal."
          },
          {
            "name": "Dry/Wet Knob",
            "type": "knob",
            "desc": "Equal-power crossfade between dry input and the granular engines."
          },
          {
            "name": "Output Level Knob",
            "type": "knob",
            "desc": "Master level for both outputs."
          },
          {
            "name": "Output 1 (Out)",
            "type": "jack-out",
            "desc": "Main audio output. Use this alone for mono; Output 2 sums into it when unpatched."
          },
          {
            "name": "Output 2 (Out)",
            "type": "jack-out",
            "desc": "Second output. Patching it enables stereo imaging and per-output effects; phase-inverted from Output 1 by default."
          }
        ],
        "howtos": [
          {
            "goal": "Capture sound with no cables patched",
            "steps": [
              "Leave the Input and Onset Input jacks empty so the built-in condenser microphone normals through to the Input.",
              "Set the Input Level Knob near 10:00 for unity and watch the amber Input Indicator track the level.",
              "Speak, play, or make sound near the panel and press the Capture Button to record it into the current layer."
            ]
          },
          {
            "goal": "Monitor in stereo",
            "steps": [
              "Patch both Output 1 and Output 2 to your mixer or interface.",
              "Press and hold the Shift Button and the Capture Button together, then turn the Hold Knob fully clockwise to set phase-corrected output; release the buttons.",
              "Grains now coin-toss left/right for a stereo field, with independent effect processing on each output."
            ]
          }
        ]
      },
      {
        "title": "Capturing audio",
        "body": [
          "Capture records the Input into a layer, auto-stopping when the ten-second buffer fills. The Capture Pulse Input triggers recording as momentary, latching or retrigger.",
          "The Dub Knob sets sound-on-sound mix, and Accumulative mode stitches separate takes into one layer."
        ],
        "controls": [
          {
            "name": "Capture Button",
            "type": "button",
            "desc": "Starts and stops recording of the Input into the current layer; lit amber while recording, dark when the layer fills."
          },
          {
            "name": "Capture Pulse Input",
            "type": "jack-in",
            "desc": "Triggers recording from gates/triggers. Behaves as Momentary, Latching or Retrigger depending on Capture Mode."
          },
          {
            "name": "Dub Knob",
            "type": "knob",
            "desc": "Attenuates existing layer audio before mixing in the new recording: anticlockwise replaces, centre halves and sums, clockwise sums at full level.",
            "tip": "Keep it fully clockwise to build up dense accumulating overdubs."
          },
          {
            "name": "Shift Button",
            "type": "button",
            "desc": "Held alongside Capture and a knob, sets capture-related modes."
          }
        ],
        "howtos": [
          {
            "goal": "Record a ten-second sample manually",
            "steps": [
              "Turn the Layer Knob to the layer you want to record into.",
              "Set the Dub Knob fully anticlockwise so the new recording overwrites cleanly.",
              "Press the Capture Button to start; it lights amber.",
              "Let the ten-second buffer fill (auto-stops) or press Capture again to stop early."
            ]
          },
          {
            "goal": "Set Momentary vs Latching capture from the panel",
            "steps": [
              "Press and hold the Shift Button and the Capture Button together.",
              "Turn the Dub Knob from its centre position while holding both.",
              "Fully anticlockwise = Momentary Capture Mode; fully clockwise = Latching Capture Mode. Release the buttons to confirm."
            ]
          },
          {
            "goal": "Build an accumulative collage in one layer",
            "steps": [
              "Turn the Layer Knob to the layer you want to build in.",
              "Press and hold the Capture Button, then press the Shift Button to enable Accumulative Capture Mode (Capture pulses amber when the head is paused).",
              "Press Capture to record a fragment, then press Capture again to pause the record head.",
              "Repeat to stitch further fragments onto the paused positions.",
              "To place the next fragment precisely, set the Scan Knob to the target position, double-press and hold the Shift Button, then press the Strike Button to move the record head there."
            ]
          }
        ]
      },
      {
        "title": "Layers & omega",
        "body": [
          "Six colour-coded ten-second buffers (alpha to zeta) selected by the Layer Knob; omega chains all six into one sixty-second timeline.",
          "Record Destination Lock lets you capture into one layer while monitoring another, and layers can be cloned."
        ],
        "controls": [
          {
            "name": "Layer Knob",
            "type": "knob",
            "desc": "Selects the active layer (alpha–zeta), or omega fully clockwise to link all six layers as one Scan timeline."
          },
          {
            "name": "Layer Indicators",
            "type": "mode",
            "desc": "Ring of LEDs around the Layer Knob showing the selected layer; in omega they track which layer the Scan position is in."
          },
          {
            "name": "Layer CV Input",
            "type": "jack-in",
            "desc": "Bipolar CV for layer selection. 0 to +5V cycles clockwise through all six layers twice; 0 to -5V cycles anticlockwise twice."
          }
        ],
        "howtos": [
          {
            "goal": "Scan across all your recorded material at once",
            "steps": [
              "Turn the Layer Knob fully clockwise until the omega indicator lights, chaining all six layers into one sixty-second timeline.",
              "Sweep the Scan Knob slowly to move through all six layers consecutively.",
              "Watch the display colours blend and the Layer Indicators change as you cross each layer's region."
            ]
          },
          {
            "goal": "Record into one layer while playing another",
            "steps": [
              "Press and hold the Shift Button and turn the Layer Knob to choose the record destination (it lights amber).",
              "Release Shift; the monitored playback layer stays lit white.",
              "Press the Capture Button to record into the amber layer while you keep hearing the white layer.",
              "To recouple record and playback, hold Shift and turn the Layer Knob fully clockwise to omega."
            ]
          }
        ]
      },
      {
        "title": "The granular engines",
        "image": "images/arbhar/grains.png",
        "imageCaption": "Scan = position, Length = grain size, Intensity = grain count, Spray = scatter. (Instruō manual)",
        "body": [
          "Two engines sound up to 88 grains: continuous (clocked by Length and Intensity) and Strike (hand- or pulse-fired, 15% louder).",
          "Grain Window, Direction, Length, Scan and Spray shape and place each grain, locking their values at birth."
        ],
        "controls": [
          {
            "name": "Intensity Knob",
            "type": "knob",
            "desc": "Sets grain count and rate of the continuous engine: max at centre, even/synchronous anticlockwise, random/asynchronous clockwise, off at the extremes.",
            "tip": "Park it at either extreme to silence the continuous engine and play only with Strike."
          },
          {
            "name": "Intensity CV Input",
            "type": "jack-in",
            "desc": "Bipolar 10Vpp CV summed with the Intensity knob."
          },
          {
            "name": "Strike Button",
            "type": "button",
            "desc": "Fires a single grain from the Strike engine, 15% louder than continuous grains."
          },
          {
            "name": "Strike Input",
            "type": "jack-in",
            "desc": "Pulse input that fires one Strike grain per trigger or gate."
          },
          {
            "name": "Grain Window Knob",
            "type": "knob",
            "desc": "Morphs the grain envelope: square (anticlockwise) → Gaussian (centre) → descending sawtooth (clockwise)."
          },
          {
            "name": "Grain Direction Knob",
            "type": "knob",
            "desc": "Forward/reverse playback probability: 100% forward fully anticlockwise, 50/50 centre, 100% reverse fully clockwise."
          },
          {
            "name": "Grain Direction Indicators",
            "type": "mode",
            "desc": "Show grain direction (left=forward, right=reverse); white for continuous grains, amber for Strike grains."
          },
          {
            "name": "Length Knob",
            "type": "knob",
            "desc": "Grain duration ~4ms–3s, exponential, 750ms at centre. Fully anticlockwise crosses into Wavetable Mode."
          },
          {
            "name": "Length CV Input",
            "type": "jack-in",
            "desc": "Bipolar CV (about -/+5V at centre) summed with the Length knob."
          },
          {
            "name": "Scan Knob",
            "type": "knob",
            "desc": "Sets the grain generation position within the layer. Becomes a speed control in Follow Mode."
          },
          {
            "name": "Scan CV Input",
            "type": "jack-in",
            "desc": "Bipolar -/+5V CV for Scan; centre the knob to give CV the full layer."
          },
          {
            "name": "Spray Knob",
            "type": "knob",
            "desc": "Random deviation of grain start position, biased after the Scan position, wrapping around at the layer end; fully random at max."
          },
          {
            "name": "Pulse Output",
            "type": "jack-out",
            "desc": "+5V triggers (10ms) or gates depending on the Onset Control Mode."
          }
        ],
        "howtos": [
          {
            "goal": "Make a smooth frozen drone",
            "steps": [
              "Turn the Layer Knob to a free layer, set the Dub Knob fully anticlockwise, press the Capture Button to record a sustained note or texture, and let it fill or press Capture again to stop.",
              "Set the Grain Window Knob to centre (Gaussian) and the Length Knob from centre toward fully clockwise for long grains.",
              "Set the Intensity Knob slightly clockwise of centre for a few random-amplitude grains.",
              "Add a touch of Spray with the Spray Knob so no two grains are identical, then hold the Scan Knob still to freeze the tone."
            ]
          },
          {
            "goal": "Get a stutter / beat-repeat effect",
            "steps": [
              "Turn the Intensity Knob to a low setting (near an extreme) so very few grains generate.",
              "Turn the Grain Window Knob anticlockwise toward square (or clockwise toward sawtooth for a percussive edge).",
              "Turn the Spray Knob to near zero.",
              "Use the Length Knob to set the repeat speed."
            ]
          },
          {
            "goal": "Play accents over a texture with Strike",
            "steps": [
              "Turn the Intensity Knob to one extreme to keep only a sparse continuous texture, or fully to the extreme to disable the continuous engine.",
              "Press the Strike Button (or feed a trigger into the Strike Input) to fire single grains 15% louder than continuous grains as accents."
            ]
          }
        ]
      },
      {
        "title": "Pitch & deviation",
        "body": [
          "The Pitch Knob transposes grains with 1V/oct tracking; since pitch locks per grain, modulating it layers chords from overlapping grains.",
          "Pitch Deviation adds unquantised random detuning anticlockwise or quantised musical intervals clockwise, customisable in preset.txt."
        ],
        "controls": [
          {
            "name": "Pitch Knob",
            "type": "knob",
            "desc": "Transposes the grains; per-grain pitch latching means modulating it layers multiple pitches polyphonically."
          },
          {
            "name": "1V/Octave Input",
            "type": "jack-in",
            "desc": "Bipolar -/+5V pitch CV summed with the Pitch knob for 1V/oct tracking."
          },
          {
            "name": "Pitch Deviation Knob",
            "type": "knob",
            "desc": "Per-grain intervallic offset: unquantised random anticlockwise, none at centre, quantised random of widening intervals clockwise."
          },
          {
            "name": "Pitch Deviation CV Input",
            "type": "jack-in",
            "desc": "Bipolar CV (10V range, -/+5V at centre) summed with the Pitch Deviation knob."
          }
        ],
        "howtos": [
          {
            "goal": "Play arbhar melodically from a sequencer",
            "steps": [
              "Patch a 1V/oct pitch CV from your sequencer into the 1V/Octave Input.",
              "Set the Pitch Knob to taste as a tuning offset.",
              "Set the Length Knob short for snappy note changes, or longer for overlapping chordal smears."
            ]
          },
          {
            "goal": "Add organic detuning to a drone",
            "steps": [
              "Turn the Layer Knob to a free layer, set the Dub Knob fully anticlockwise, and press Capture to record a sustained sound.",
              "Set Grain Window to centre (Gaussian), Length long, and Intensity slightly clockwise of centre.",
              "Turn the Pitch Deviation Knob anticlockwise from centre for a continuous random detune smear.",
              "Or turn the Pitch Deviation Knob clockwise from centre to spread grains across quantised musical intervals."
            ]
          }
        ]
      },
      {
        "title": "Onset detection",
        "body": [
          "The Onset Input listens for attacks and can auto-trigger Capture or emit pulses, letting arbhar sample itself hands-free.",
          "Sensitivity sets responsiveness and Hold sets debounce, record length or pulse spacing depending on mode."
        ],
        "controls": [
          {
            "name": "Onset Input",
            "type": "jack-in",
            "desc": "AC-coupled analysis input listening for spectral attacks; normalled to the Input; becomes the right input in Stereo Mode."
          },
          {
            "name": "Onset Indicator",
            "type": "mode",
            "desc": "Shows detection state and consequence: lit=armed, dark=just detected/held off; amber=will trigger record, white=will not."
          },
          {
            "name": "Sensitivity Knob (Sense)",
            "type": "knob",
            "desc": "Sets onset detector responsiveness (clockwise=more sensitive); doubles as the Input 2 level in Stereo Mode."
          },
          {
            "name": "Hold Knob",
            "type": "knob",
            "desc": "Debounce/min-record/min-pulse time, 5ms–10s exponential (~2.5s centre); also sets loop length in Follow Mode.",
            "tip": "Patch Pulse Output to Capture Pulse Input and set Hold near your record length for hands-free self-sampling."
          }
        ],
        "howtos": [
          {
            "goal": "Let arbhar sample itself on every attack",
            "steps": [
              "Press and hold the Shift Button and the Capture Button together, turn the Layer Knob to the alpha or beta position to select an Onset Control Mode that triggers recording, then release the buttons.",
              "Feed a source into the Input or Onset Input (or leave them unpatched to use the built-in mic).",
              "Patch the Pulse Output to the Capture Pulse Input.",
              "Turn the Sensitivity Knob clockwise until attacks register on the Onset Indicator, and set the Hold Knob to your desired record length."
            ]
          },
          {
            "goal": "Tune the detector to a busy source",
            "steps": [
              "Watch the Onset Indicator while audio plays into the Input or mic.",
              "Turn the Sensitivity Knob clockwise until attacks reliably darken the indicator.",
              "Turn the Hold Knob up to raise the debounce time and ignore rapid repeated transients you do not want."
            ]
          }
        ]
      },
      {
        "title": "Onset control modes",
        "body": [
          "Six modes (alpha to zeta) set what an onset does and what the Pulse Output emits, chosen with Shift+Capture and the Layer Knob.",
          "In Stereo Capture Mode onset-to-capture triggering is disabled, so alpha and beta behave like gamma and delta."
        ],
        "controls": [
          {
            "name": "Onset Control Mode select",
            "type": "mode",
            "desc": "Hold Shift + Capture and turn the Layer Knob to choose alpha, beta, gamma, delta, epsilon or zeta."
          }
        ],
        "howtos": [
          {
            "goal": "Set the Onset Control Mode",
            "steps": [
              "Press and hold the Shift Button and the Capture Button together.",
              "Turn the Layer Knob; each layer position selects one mode (alpha through zeta).",
              "Release the buttons to confirm the mode."
            ]
          },
          {
            "goal": "Clock other modules from a Follow loop",
            "steps": [
              "Press and hold the Shift Button and the Capture Button together and turn the Scan Knob fully anticlockwise to enter Follow Mode (the Strike Button lights white); release the buttons.",
              "Press and hold Shift and Capture again and turn the Layer Knob to the zeta position to select Onset Control Mode zeta; release the buttons.",
              "Set the loop length with the Hold Knob.",
              "Patch the Pulse Output to the rest of your patch to clock it from the end-of-cycle trigger."
            ]
          }
        ]
      },
      {
        "title": "Scan, Follow & Wavetable",
        "image": "images/arbhar/follow-mode.png",
        "imageCaption": "Follow mode: Scan sets playhead direction and speed; Hold sets loop length. (Instruō manual)",
        "body": [
          "Scan freezes a fixed playback position; Follow turns Scan into a 20x-to-1/20th speed control with independent pitch.",
          "Wavetable (Length fully anticlockwise) treats the layer as a tunable single-cycle oscillator pitched to C at centre."
        ],
        "controls": [
          {
            "name": "Scan/Follow select",
            "type": "mode",
            "desc": "Hold Shift + Capture and turn the Scan Knob from centre: anticlockwise = Follow (Strike lit white), clockwise = Scan (Strike dark)."
          },
          {
            "name": "Scan Knob (Follow)",
            "type": "knob",
            "desc": "In Follow Mode becomes playback speed/direction: 20x fully anticlockwise to 1/20th fully clockwise (behaviour configurable in preset)."
          },
          {
            "name": "Wavetable Mode",
            "type": "mode",
            "desc": "Turn the Length Knob fully anticlockwise to crossfade into a wavetable oscillator from a single-cycle loop of the layer; both direction LEDs glow amber."
          },
          {
            "name": "Grain Direction Knob (Wavetable)",
            "type": "knob",
            "desc": "In Wavetable Mode sets the interpolation speed between successive wavetables across the layer."
          }
        ],
        "howtos": [
          {
            "goal": "Switch between Scan and Follow Mode",
            "steps": [
              "Press and hold the Shift Button and the Capture Button together.",
              "Turn the Scan Knob fully anticlockwise to enter Follow Mode (the Strike Button lights white).",
              "Turn the Scan Knob fully clockwise to return to Scan Mode (the Strike Button goes dark). Release the buttons."
            ]
          },
          {
            "goal": "Play a captured loop at variable speed, fixed pitch",
            "steps": [
              "Press and hold the Shift Button and the Capture Button together, turn the Scan Knob fully anticlockwise to enter Follow Mode (Strike Button lights white), then release the buttons.",
              "Press the Strike Button (or feed a trigger into the Strike Input) to launch playback from the start of the layer.",
              "Turn the Scan Knob to slow down or speed up playback (20x anticlockwise to 1/20th clockwise) while the Pitch Knob still sets pitch independently."
            ]
          },
          {
            "goal": "Turn a captured sound into a tunable oscillator",
            "steps": [
              "Turn the Layer Knob to a free layer, set the Dub Knob fully anticlockwise, press the Capture Button to record a sustained sound, and let it fill or press Capture again to stop.",
              "Turn the Length Knob fully anticlockwise to crossfade into Wavetable Mode (both grain-direction LEDs go amber).",
              "Play it with the Pitch Knob or a CV in the 1V/Octave Input (centre Pitch = C2), move the Scan and Spray Knobs to pick the wavetable position, and use the Grain Direction Knob to set the interpolation speed."
            ]
          }
        ]
      },
      {
        "title": "Track and Hold, erase, undo",
        "body": [
          "Double-press and hold Shift to set Window, Pitch, Pitch Deviation and Intensity silently, applying them all on release; Pitch becomes a quantised semitone selector.",
          "Hold Shift and watch Strike: amber undoes the last overdub, white erases the buffer."
        ],
        "controls": [
          {
            "name": "Track and Hold Mode",
            "type": "mode",
            "desc": "Double-press and hold Shift to defer Grain Window, Pitch, Pitch Deviation and Intensity changes until release; display turns green."
          },
          {
            "name": "Pitch Knob (Track and Hold)",
            "type": "knob",
            "desc": "Quantised semitone pitch selection with Layer Indicator feedback (white = up, amber = down, omega = original/octaves)."
          },
          {
            "name": "Undo / Erase via Strike",
            "type": "button",
            "desc": "With Shift held, Strike flashes amber to Undo the last overdub or white to Erase the buffer."
          }
        ],
        "howtos": [
          {
            "goal": "Make several changes hit at once",
            "steps": [
              "Double-press and hold the Shift Button (the display turns green) to enter Track and Hold Mode.",
              "While still holding Shift, set the Grain Window, Pitch, Pitch Deviation, and/or Intensity Knobs (changes are deferred and silent).",
              "Release the Shift Button to apply all the changes simultaneously."
            ]
          },
          {
            "goal": "Undo an overdub",
            "steps": [
              "After stopping a recording, press and hold the Shift Button.",
              "If the Strike Button flashes amber, press the Strike Button while still holding Shift.",
              "The layer returns to its last manually recorded or loaded state; release Shift."
            ]
          },
          {
            "goal": "Erase a layer",
            "steps": [
              "Turn the Layer Knob to the layer you want to clear, then press and hold the Shift Button.",
              "If the Strike Button flashes white, press the Strike Button while still holding Shift.",
              "The audio in the current layer is erased; release Shift."
            ]
          }
        ]
      },
      {
        "title": "Mono/stereo & phase",
        "body": [
          "Stereo Input Mode makes Input left and Onset Input right, with Sensitivity becoming the right-channel level. Set it with Shift+Capture and the Grain Window Knob.",
          "Output 2 is phase-inverted for mono out; switch it to phase-corrected for any two-output patch."
        ],
        "controls": [
          {
            "name": "Mono/Stereo Input select",
            "type": "mode",
            "desc": "Hold Shift + Capture and turn Grain Window from centre: anticlockwise = Mono (amber Onset), clockwise = Stereo (white Onset)."
          },
          {
            "name": "Sensitivity Knob (Stereo role)",
            "type": "knob",
            "desc": "In Stereo Input Mode this knob sets the right (Input 2 / Onset) input level instead of onset sensitivity."
          },
          {
            "name": "Phase Switch",
            "type": "mode",
            "desc": "Hold Shift + Capture and turn Hold fully clockwise for phase-corrected, fully anticlockwise for phase-inverted (default).",
            "tip": "Use phase-corrected whenever you patch both outputs; phase-inverted for pure mono."
          }
        ],
        "howtos": [
          {
            "goal": "Switch to Stereo Input Mode",
            "steps": [
              "Press and hold the Shift Button and the Capture Button together.",
              "Turn the Grain Window Knob fully clockwise (the Onset Indicator turns white), then release the buttons.",
              "Now the Input is left, the Onset Input is right, and the Sensitivity Knob controls the right (Input 2) level instead of onset sensitivity."
            ]
          },
          {
            "goal": "Set the output phase for a stereo patch",
            "steps": [
              "Press and hold the Shift Button and the Capture Button together.",
              "Turn the Hold Knob fully clockwise to set phase-corrected output.",
              "Turn the Hold Knob fully anticlockwise to return to the default phase-inverted setting for mono. Release the buttons."
            ]
          }
        ]
      },
      {
        "title": "Effects & Mod CV",
        "body": [
          "The Mod CV Input controls one of four internal processors chosen in preset.txt: Panning, Hold, Reverb or Feedback/Delay.",
          "Each gives bipolar control, from stereo width and reverb freeze to 80ms echoes or short Karplus-Strong shimmer."
        ],
        "controls": [
          {
            "name": "Mod CV Input",
            "type": "jack-in",
            "desc": "Bipolar CV whose target (Panning, Hold, Reverb, or Feedback/Delay) is set in preset.txt."
          },
          {
            "name": "Dry/Wet CV Input",
            "type": "jack-in",
            "desc": "Bipolar CV (10V range, -/+5V at centre) summed with the Dry/Wet knob."
          }
        ],
        "howtos": [
          {
            "goal": "Voltage-control the internal reverb",
            "steps": [
              "On the USB flash drive, edit preset.txt and set the ModCV parameter to Reverb (factory preset 1 'arbhar Classic' already does this), place it in the drive root, and insert the drive to load it.",
              "Patch a CV source into the Mod CV Input on the CV expander.",
              "Positive voltage blends reverb with the dry signal (freezing at +5V); negative voltage passes only the shimmering wet reverb."
            ]
          },
          {
            "goal": "Get echo or Karplus-Strong from the delay",
            "steps": [
              "On the USB flash drive, edit preset.txt and set ModCV to Delay (factory preset 2 'arbhar Delay' already does this), place it in the drive root, and insert the drive to load it.",
              "Patch both Output 1 and Output 2 (Output 2 carries the wet signal in mono mode).",
              "Apply positive CV to the Mod CV Input for 80-1000ms echoes at 67% feedback, or negative CV for 1-25ms times at 99% feedback."
            ]
          }
        ]
      },
      {
        "title": "CV & USB expanders",
        "body": [
          "A CV expander adds eight bipolar inputs (summed with their knobs) for parameters lacking panel jacks, plus the Mod CV.",
          "The USB expander and 4GB drive hold the library, scenes and preset.txt, unlocking 42 scenes and 36 sample slots."
        ],
        "controls": [
          {
            "name": "Spray CV Input",
            "type": "jack-in",
            "desc": "Bipolar CV summed with the Spray knob (10V range, -/+5V at centre)."
          },
          {
            "name": "Layer CV Input",
            "type": "jack-in",
            "desc": "Bipolar -/+5V CV for layer selection with more than 360° of travel (two cycles each direction)."
          },
          {
            "name": "Grain Direction CV Input",
            "type": "jack-in",
            "desc": "Bipolar CV summed with the Grain Direction knob (10V range, -/+5V at centre)."
          },
          {
            "name": "Grain Window CV Input",
            "type": "jack-in",
            "desc": "Bipolar CV summed with the Grain Window knob (10V range, -/+5V at centre)."
          },
          {
            "name": "Pitch Deviation CV Input",
            "type": "jack-in",
            "desc": "Bipolar CV summed with the Pitch Deviation knob (10V range, -/+5V at centre)."
          },
          {
            "name": "Dub CV Input",
            "type": "jack-in",
            "desc": "Bipolar CV summed with the Dub knob (10V range, -/+5V at centre)."
          },
          {
            "name": "Mod CV Input",
            "type": "jack-in",
            "desc": "Bipolar CV routed to Panning, Hold, Reverb, or Feedback/Delay per preset.txt."
          },
          {
            "name": "Dry/Wet CV Input",
            "type": "jack-in",
            "desc": "Bipolar CV summed with the Dry/Wet knob (10V range, -/+5V at centre)."
          },
          {
            "name": "USB Port (USB Expander)",
            "type": "jack-in",
            "desc": "Panel-accessible USB connection (mini-USB to the rear socket) for loading and saving via the flash drive."
          }
        ],
        "howtos": [
          {
            "goal": "Install the expanders",
            "steps": [
              "Power off the case.",
              "Connect the 12-pin IDC cable between arbhar and the CV Expansion Module, matching the red stripe to the white stripe on each.",
              "Connect the mini-USB cable between the USB Expansion Module and the USB socket on the back of arbhar.",
              "Mount all modules and power the system back on."
            ]
          }
        ]
      },
      {
        "title": "Library management",
        "body": [
          "The three-page Load/Save Menu (Shift, Capture, Strike) clones layers, loads layers and scenes, and saves scenes via double-tap Shift.",
          "Cloning needs no USB; loading and saving use the drive's library and 42 scene slots non-destructively."
        ],
        "controls": [
          {
            "name": "Load/Save Menu",
            "type": "mode",
            "desc": "Three-page menu entered/exited by holding Shift, Capture, Strike in that order; navigate pages with Capture and Strike."
          },
          {
            "name": "Clone (page 1)",
            "type": "mode",
            "desc": "Magenta+violet page with omega white: set source then destination with the Layer Knob, double-tap Shift to clone."
          },
          {
            "name": "Load Layers (page 1)",
            "type": "mode",
            "desc": "Move Layer Knob past clone indicators to amber omega for 6 banks × 6 samples; hold Shift to preview, double-tap Shift to load."
          },
          {
            "name": "Load Scenes (page 2)",
            "type": "mode",
            "desc": "Yellow+red page; choose a scene slot and double-tap Shift to load (loads and exits)."
          },
          {
            "name": "Save Scenes (page 3)",
            "type": "mode",
            "desc": "Orange+green page; choose a slot and double-tap Shift to save non-destructively (auto-exits when done)."
          }
        ],
        "howtos": [
          {
            "goal": "Clone one layer to another",
            "steps": [
              "Turn the Layer Knob to the source layer.",
              "Hold Shift, then Capture, then Strike (in that order) to enter the Load/Save Menu.",
              "Check the display is magenta/violet with omega white; if not, page with Capture/Strike.",
              "Turn the Layer Knob to the destination layer.",
              "Double-tap the Shift Button to clone (a white LED sweep confirms); repeat for more clones, then exit by holding Shift, Capture, Strike again."
            ]
          },
          {
            "goal": "Load a sample from the USB library",
            "steps": [
              "Turn the Layer Knob to the destination layer, then press and hold Shift, then Capture, then Strike in that order to enter the Load/Save Menu.",
              "On the magenta/violet page, turn the Layer Knob past the clone indicators until omega glows amber to reveal the banks.",
              "Turn the Layer Knob to select bank and slot (white = selected) and hold the Shift Button to preview.",
              "Double-tap the Shift Button to load; the menu exits automatically."
            ]
          },
          {
            "goal": "Save the current state as a scene",
            "steps": [
              "Press and hold Shift, then Capture, then Strike in that order to enter the Load/Save Menu, then press Capture/Strike to navigate to the orange/green Save page.",
              "Turn the Layer Knob to the desired scene slot (past the local six for the USB banks).",
              "Double-tap the Shift Button to save; saving is non-destructive and the menu exits when finished."
            ]
          }
        ]
      },
      {
        "title": "Presets & firmware",
        "body": [
          "The preset.txt file unlocks deep settings like input mode, capture and Follow behaviour, ModCV target and the quantise table; six factory presets ship as starting points.",
          "Factory Reset is Shift+Capture then seven Strikes; firmware updates drop a .gz in the _updater folder."
        ],
        "controls": [
          {
            "name": "preset.txt",
            "type": "mode",
            "desc": "USB-root configuration file exposing all deep settings; renamed preset_was_loaded.txt after loading. Load Configuration selects Preset/Layers/Scene."
          },
          {
            "name": "Factory Reset",
            "type": "mode",
            "desc": "Hold Shift + Capture, then press Strike seven times fast to clear layers, reset modes, reinitialise scenes 1–6, and reboot.",
            "tip": "Back up any layers you want to keep before resetting — it clears all audio."
          },
          {
            "name": "_updater folder",
            "type": "mode",
            "desc": "USB folder for firmware .gz updater files, used only after the V2 microSD image has been flashed."
          }
        ],
        "howtos": [
          {
            "goal": "Load a configuration without changing your audio",
            "steps": [
              "On the USB flash drive, edit preset.txt and set Load Configuration to 'Load Preset'.",
              "Place the file in the root directory of the USB flash drive.",
              "Insert the drive; on successful load it is renamed preset_was_loaded.txt and your layer audio is preserved."
            ]
          },
          {
            "goal": "Perform a factory reset",
            "steps": [
              "Press and hold the Shift Button and the Capture Button together.",
              "Press the Strike Button seven times in fast succession.",
              "arbhar clears all layers, resets modes, reinitialises the first six scenes, and reboots automatically."
            ]
          }
        ]
      }
    ],
    "trivia": [
      {
        "title": "Name meaning",
        "fact": "'arbhar' is an agricultural noun meaning a grain, a very small amount of a quantity, or natural patterns in the surface of wood or cloth — fitting for a granular processor."
      },
      {
        "title": "Complete rewrite",
        "fact": "Version 2 firmware (2023) was a ground-up rewrite of the entire codebase, adding six audio layers, scenes, accumulative recording and stereo configurations."
      },
      {
        "title": "Lexer method",
        "fact": "The arbhar's granular approach is built around the 'Lexer method' of granular synthesis, capturing real-world audio through its panel-mounted condenser microphone."
      },
      {
        "title": "Onset detection",
        "fact": "Six selectable onset control modes (Alpha through Zeta) analyse incoming audio for spectral changes to auto-trigger capture and generate trigger/gate signals at the Pulse Output."
      }
    ],
    "outcomes": [
      {
        "title": "Sample something instantly (built-in mic)",
        "si": 1,
        "hi": 0
      },
      {
        "title": "Auto-sample on every hit",
        "si": 6,
        "hi": 0
      },
      {
        "title": "Make a frozen drone",
        "si": 4,
        "hi": 0
      },
      {
        "title": "Stutter / beat-repeat",
        "si": 4,
        "hi": 1
      },
      {
        "title": "Play it like a synth (1V/oct)",
        "si": 5,
        "hi": 0
      },
      {
        "title": "Spread grains into chords",
        "si": 5,
        "hi": 1
      },
      {
        "title": "Loop a take at variable speed",
        "si": 8,
        "hi": 1
      },
      {
        "title": "Turn a sample into an oscillator",
        "si": 8,
        "hi": 2
      },
      {
        "title": "Collage several takes into one layer",
        "si": 2,
        "hi": 2
      },
      {
        "title": "Clock your patch from the loop",
        "si": 7,
        "hi": 1
      }
    ]
  },
  {
    "id": "plaits",
    "name": "Plaits",
    "manufacturer": "Mutable Instruments",
    "hp": 12,
    "tagline": "A compact macro-oscillator with 16+ synthesis models in a single voice.",
    "image": "images/plaits.jpg",
    "manualUrl": "https://pichenettes.github.io/mutable-instruments-documentation/modules/plaits/manual/",
    "overview": "A macro-oscillator: 24 synthesis models in three LED banks, shaped by HARMONICS, TIMBRE and MORPH — with a built-in envelope and low-pass gate, it is a full voice from one trigger.",
    "specs": {
      "Width": "12 HP",
      "Depth": "25 mm",
      "Power": "+12V 50mA / -12V 5mA",
      "Processor": "Cortex-M4 ARM",
      "Outputs": "48kHz, 16-bit, DC-coupled",
      "Models": "16 in firmware 1.0, 24 with firmware 1.2"
    },
    "sections": [
      {
        "title": "What Plaits is",
        "body": [
          "A macro-oscillator: one digital voice holding many synthesis models, with a built-in low-pass gate and decay envelope.",
          "OUT carries the main sound; AUX a variant, both sharing pitch, model and the three timbre knobs."
        ],
        "controls": [
          {
            "name": "OUT",
            "type": "jack-out",
            "desc": "The primary synthesized signal for the selected model.",
            "tip": "If you only patch one cable, take it from OUT."
          },
          {
            "name": "AUX",
            "type": "jack-out",
            "desc": "A variant or by-product of the main signal — sub-osc, hard-synced layer, alternate filter slope, raw exciter, etc., depending on the model.",
            "tip": "Pan OUT and AUX hard left/right for an instant stereo image from a single module."
          }
        ],
        "howtos": [
          {
            "goal": "Get a full sound from a single Plaits without external mixing",
            "steps": [
              "Patch the OUT jack and the AUX jack to two separate channels of your mixer.",
              "Pan the two channels apart and blend levels to taste; many models put a sub-octave or a detuned/hard-synced layer on AUX.",
              "Patch a gate or trigger to the TRIG input so the built-in low-pass gate and decay envelope shape both OUT and AUX together on every note."
            ]
          }
        ]
      },
      {
        "title": "Selecting models",
        "body": [
          "Left button steps the green bank, right button the red bank; the lit LED shows position, colour shows bank.",
          "Briefly press both buttons for prev/next mode to reach the third orange bank; MODEL CV can modulate too."
        ],
        "controls": [
          {
            "name": "Left button",
            "type": "button",
            "desc": "Steps through the first bank (LEDs green). In the both-buttons navigation mode it selects the previous model across all banks.",
            "tip": ""
          },
          {
            "name": "Right button",
            "type": "button",
            "desc": "Steps through the second bank (LEDs red). In navigation mode it selects the next model across all banks.",
            "tip": ""
          },
          {
            "name": "MODEL CV",
            "type": "jack-in",
            "desc": "Voltage control of model selection; sweeps around the button-set model as a centre. Can be sampled-and-held by TRIG.",
            "tip": "Patch a slow LFO or sequencer here for evolving timbres; use TRIG sample-and-hold to lock one model per note."
          },
          {
            "name": "Model LEDs",
            "type": "mode",
            "desc": "Eight LEDs whose colour indicates the bank (green / red / orange-yellow) and whose lit position indicates the active model.",
            "tip": ""
          }
        ],
        "howtos": [
          {
            "goal": "Reach the firmware 1.2 third (orange) bank of models",
            "steps": [
              "Briefly press both the left and right buttons at the same time (under one second). Do not hold them, a long hold starts V/OCT calibration.",
              "Plaits enters prev/next navigation: the left button now selects the previous model and the right button the next model, across all banks.",
              "Tap the right button to step forward past the eight green (bank A) and eight red (bank B) models until the eight LEDs glow orange/yellow, then stop on the model you want."
            ]
          },
          {
            "goal": "Sequence the model itself without glitching mid-note",
            "steps": [
              "Patch a sequencer or LFO to the MODEL CV input.",
              "Patch your note gates to the TRIG input; each trigger samples-and-holds the MODEL voltage so the model only changes at note starts.",
              "Pick a starting model with the left/right buttons (the LED shows it); the MODEL CV now offsets around that model as a centre, latched once per note."
            ]
          }
        ]
      },
      {
        "title": "Timbre controls",
        "body": [
          "HARMONICS sets frequency spread, TIMBRE sweeps dark to bright, MORPH explores sideways variations.",
          "Each has a CV input with attenuverter; left unpatched with TRIG connected, it routes the internal envelope to that parameter."
        ],
        "controls": [
          {
            "name": "HARMONICS",
            "type": "knob",
            "desc": "Frequency spread or balance between the sound's constituents — detuning, ratios, partial count, chord type, or filter character depending on model.",
            "tip": ""
          },
          {
            "name": "TIMBRE",
            "type": "knob",
            "desc": "Sweeps spectral content from dark/sparse to bright/dense.",
            "tip": ""
          },
          {
            "name": "MORPH",
            "type": "knob",
            "desc": "Lateral timbral variation — a sideways move through the model rather than simply brighter/darker.",
            "tip": ""
          },
          {
            "name": "HARMONICS / TIMBRE / MORPH attenuverters",
            "type": "knob",
            "desc": "Bipolar attenuverters scaling the CV (or the internal envelope, when the jack is empty and TRIG is patched) applied to each timbre parameter.",
            "tip": "With the CV jack empty and TRIG patched, the attenuverter becomes a per-note envelope-amount knob for that parameter."
          },
          {
            "name": "HARMONICS / TIMBRE(FM) / MORPH CV",
            "type": "jack-in",
            "desc": "CV inputs for the three timbre parameters; the TIMBRE jack doubles as the FM input.",
            "tip": ""
          }
        ],
        "howtos": [
          {
            "goal": "Make a plucked note sweep its brightness automatically",
            "steps": [
              "Leave the TIMBRE CV input (the middle CV jack, also the FM input) unpatched.",
              "Patch a gate or trigger to the TRIG input so the internal decay envelope fires on each note.",
              "Turn the TIMBRE attenuverter (the small knob above the TIMBRE CV jack) clockwise past centre; the internal envelope now sweeps TIMBRE on every note. Turn it counter-clockwise below centre to invert the sweep."
            ]
          }
        ]
      },
      {
        "title": "Pitch",
        "body": [
          "FREQUENCY sets the root over 8 octaves (narrowable to 14 semitones); V/OCT tracks 1V/oct and can be calibrated.",
          "The FM input shares the TIMBRE jack and attenuverter, so you choose pitch or timbre at patch time."
        ],
        "controls": [
          {
            "name": "FREQUENCY",
            "type": "knob",
            "desc": "Sets the root note. Default range is 8 octaves; can be narrowed to a 14-semitone window for fine tuning.",
            "tip": "Narrow the range when you want the knob to act as a fine-tune rather than a wide sweep."
          },
          {
            "name": "V/OCT",
            "type": "jack-in",
            "desc": "1V/octave pitch input, transposing from −3 to +7 octaves relative to the FREQUENCY knob.",
            "tip": "Calibrate it (see hidden settings) for accurate tracking across many octaves."
          },
          {
            "name": "FM input (shared with TIMBRE)",
            "type": "jack-in",
            "desc": "Linear frequency-modulation input; depth and polarity set by the TIMBRE attenuverter.",
            "tip": "Audio-rate FM into model 1 or 3 yields rich metallic and clangorous tones."
          }
        ],
        "howtos": [
          {
            "goal": "Narrow the FREQUENCY knob to a 14-semitone fine-tune range",
            "steps": [
              "Press and hold the right button (the one that steps the red bank).",
              "While still holding it, slowly turn the HARMONICS knob to step through the frequency-range options shown on the LEDs.",
              "Options run from 'C0 ±7 semitones' (narrowest) up to the full 8-octave C0–C8 range.",
              "Stop on a narrow option for stable fine tuning, then release the button."
            ]
          }
        ],
        "image": "images/plaits/adjust_frequency.png",
        "imageCaption": "Holding the right button and turning HARMONICS steps the FREQUENCY knob range. (Mutable Instruments manual)"
      },
      {
        "title": "Playing as a voice",
        "body": [
          "TRIG fires the envelope, excites physical models, strikes the LPG and latches MODEL CV.",
          "LEVEL opens the LPG directly for amplitude and brightness; hold the left button and turn TIMBRE/MORPH to shape the LPG and decay."
        ],
        "controls": [
          {
            "name": "TRIG",
            "type": "jack-in",
            "desc": "Fires the internal envelope, excites physical/percussive models, strikes the LPG (when LEVEL is unpatched), and samples-and-holds the MODEL CV.",
            "tip": "One gate to TRIG is enough to turn Plaits into a self-contained plucked voice."
          },
          {
            "name": "LEVEL",
            "type": "jack-in",
            "desc": "Opens the internal low-pass gate, controlling amplitude and brightness together; acts as an accent control on physical/percussive models.",
            "tip": "Patch a full ADSR here for expressive pad-like dynamics that also open up the tone."
          },
          {
            "name": "Internal LPG",
            "type": "mode",
            "desc": "Built-in low-pass gate, adjustable from VCFA to VCA; disabled for models 12–16 which use their own envelopes/filters.",
            "tip": ""
          },
          {
            "name": "Internal envelope",
            "type": "mode",
            "desc": "Decaying envelope fired by TRIG; its decay time is set together with the LPG ringing time.",
            "tip": ""
          }
        ],
        "howtos": [
          {
            "goal": "Adjust the LPG character and envelope decay",
            "steps": [
              "Press and hold the left button (the one that steps the green bank).",
              "While holding it, turn the TIMBRE knob to set the low-pass gate response from VCFA (filter-like, opens brightness) to VCA (amplitude-only).",
              "Still holding, turn the MORPH knob to set the LPG ringing time and the internal envelope decay together. The four yellow LEDs display both values; release the button to exit."
            ]
          },
          {
            "goal": "Turn Plaits into a one-cable plucked voice",
            "steps": [
              "Leave the LEVEL input unpatched so TRIG drives the internal envelope into the LPG.",
              "Patch a gate or trigger to the TRIG input; each trigger fires the envelope and strikes the low-pass gate.",
              "Set the decay length: hold the left button and turn the MORPH knob, short for a tight pluck, longer for a swell, then release. Take OUT as your voice."
            ]
          }
        ],
        "image": "images/plaits/adjust_lpg.png",
        "imageCaption": "Hold left button: TIMBRE = LPG response, MORPH = ring/decay time. (Mutable manual)"
      },
      {
        "title": "Bank A models",
        "body": [
          "Eight pitched engines on green: virtual analogue, waveshaping, 2-op FM, grain/formant, additive, wavetable, chords, and speech.",
          "HARMONICS, TIMBRE and MORPH map to engine-specific parameters; AUX gives a variant like a sub, sync layer or root note."
        ],
        "controls": [
          {
            "name": "Pair of Classic Waveforms",
            "type": "model",
            "desc": "Detuned/synced classic waves. HARMO: detune; TIMBRE: pulse width; MORPH: notched saw. AUX: hard sync.",
            "tip": ""
          },
          {
            "name": "Waveshaping Oscillator",
            "type": "model",
            "desc": "Asymmetric triangle through waveshaper+wavefolder. HARMO: shaper wave; TIMBRE: fold amount; MORPH: asymmetry. AUX: alt fold curve.",
            "tip": ""
          },
          {
            "name": "Two-Operator FM",
            "type": "model",
            "desc": "Two phase-modulating sines. HARMO: ratio; TIMBRE: mod index; MORPH: feedback. AUX: sub-oscillator.",
            "tip": ""
          },
          {
            "name": "Granular Formant Oscillator",
            "type": "model",
            "desc": "Formants from sine segments. HARMO: formant ratio; TIMBRE: formant freq; MORPH: width/shape. AUX: filtered-wave sim.",
            "tip": ""
          },
          {
            "name": "Harmonic Oscillator",
            "type": "model",
            "desc": "Stacked harmonic sines. HARMO: bump count; TIMBRE: prominent harmonic; MORPH: bump shape. AUX: organ drawbars.",
            "tip": ""
          },
          {
            "name": "Wavetable Oscillator",
            "type": "model",
            "desc": "4 banks of 8x8 waves. HARMO: bank; TIMBRE: row; MORPH: column. AUX: 5-bit lo-fi.",
            "tip": ""
          },
          {
            "name": "Chords",
            "type": "model",
            "desc": "Four-note chords. HARMO: chord type; TIMBRE: inversion/transpose; MORPH: waveform. AUX: root note.",
            "tip": ""
          },
          {
            "name": "Vowel & Speech Synthesis",
            "type": "model",
            "desc": "Formant/SAM/LPC speech. HARMO: algorithm crossfade; TIMBRE: species; MORPH: phoneme/word. AUX: raw vocal cords.",
            "tip": "Patch a slow LFO to MORPH for muttering, evolving vocal textures."
          }
        ],
        "howtos": [
          {
            "goal": "Coax words out of the speech model",
            "steps": [
              "Select the green bank: tap the left button until the eight LEDs glow green, then step to the 8th model (Vowel & Speech Synthesis).",
              "Turn the HARMONICS knob toward its fully clockwise end to cross-fade into the LPC algorithm, which holds the vowel and word banks.",
              "Turn the MORPH knob to choose the phoneme or word segment, and turn the TIMBRE knob to change the voice 'species'. Patch a gate to TRIG to retrigger words."
            ]
          }
        ]
      },
      {
        "title": "Bank B models",
        "body": [
          "Eight noise and percussion engines on red: granular swarm, filtered noise, particle noise, modal, string, kick, snare, and hi-hat.",
          "Models 12-16 bypass the internal LPG, using their own envelopes and filters with TRIG as the strike."
        ],
        "controls": [
          {
            "name": "Granular Cloud",
            "type": "model",
            "desc": "8 enveloped saw grains. HARMO: pitch randomness; TIMBRE: density; MORPH: grain length/overlap. AUX: sine variant.",
            "tip": ""
          },
          {
            "name": "Filtered Noise",
            "type": "model",
            "desc": "Variable-clock noise + resonant filter. HARMO: LP→BP→HP; TIMBRE: clock freq; MORPH: resonance. AUX: two-BP variant.",
            "tip": ""
          },
          {
            "name": "Harmonic Noise",
            "type": "model",
            "desc": "Dust through all-pass/band-pass nets. HARMO: freq randomness; TIMBRE: density; MORPH: filter type. AUX: raw dust.",
            "tip": ""
          },
          {
            "name": "Inharmonic String Modeling",
            "type": "model",
            "desc": "Mini-Rings string. HARMO: inharmonicity; TIMBRE: exciter brightness; MORPH: decay. AUX: raw exciter. LPG disabled.",
            "tip": ""
          },
          {
            "name": "Modal Resonator",
            "type": "model",
            "desc": "Mini-Rings modal (24 partials). HARMO: material; TIMBRE: exciter brightness; MORPH: decay. AUX: raw exciter. LPG disabled.",
            "tip": "Leave TRIG unpatched for a self-exciting dust-driven drone."
          },
          {
            "name": "Analog Bass Drum Model",
            "type": "model",
            "desc": "Analog kick model. HARMO: attack/overdrive; TIMBRE: brightness; MORPH: decay. AUX: FM sine. Free-runs without TRIG.",
            "tip": "Unpatch TRIG to use it as a clean sine bass oscillator."
          },
          {
            "name": "Analog Snare Drum Model",
            "type": "model",
            "desc": "Analog snare/tom. HARMO: harmonic-vs-noise; TIMBRE: mode balance; MORPH: decay. AUX: FM sines + HP noise.",
            "tip": ""
          },
          {
            "name": "Analog Hi-hat Model",
            "type": "model",
            "desc": "Metallic squares + clocked noise. HARMO: metal-vs-noise; TIMBRE: HP cutoff; MORPH: decay. AUX: ring-modded squares.",
            "tip": ""
          }
        ],
        "howtos": [
          {
            "goal": "Build a quick drum voice from models 14 to 16",
            "steps": [
              "Select the red bank: tap the right button until the eight LEDs glow red, then step to model 14 (analog bass drum), 15 (analog snare/tom) or 16 (analog hi-hat).",
              "Patch a trigger to the TRIG input to strike the drum; these models use their own internal envelopes, so the held-left-button LPG settings have no effect.",
              "Optionally patch an envelope or velocity CV to the LEVEL input for accented, dynamic hits, and turn the MORPH knob to set the decay length."
            ]
          }
        ]
      },
      {
        "title": "Firmware 1.2 bank",
        "body": [
          "A third orange bank adds eight pitched models: filtered analogue, phase distortion, a 6-operator DX7 FM synth, wave terrain, string machine, and chord/arp voice.",
          "It also enables audio data loading via TIMBRE and improves knob response and synthesis filters."
        ],
        "controls": [
          {
            "name": "Classic waveshapes with filter",
            "type": "model",
            "desc": "Analog waves + switchable filter. HARMO: resonance/slope (24 vs 12 dB); TIMBRE: cutoff; MORPH: wave + sub. OUT: LP, AUX: HP.",
            "tip": ""
          },
          {
            "name": "Phase distortion & modulation",
            "type": "model",
            "desc": "CZ-style phase distortion. HARMO: distortion freq; TIMBRE: amount; MORPH: asymmetry. AUX: free-running carrier.",
            "tip": ""
          },
          {
            "name": "2-voice, 6-operator FM synth (32 presets)",
            "type": "model",
            "desc": "2-voice 6-operator FM (DX7), bass and synth presets. HARMO: preset; TIMBRE: modulator level; MORPH: envelope/time stretch. LEVEL acts as velocity."
          },
          {
            "name": "same",
            "type": "model",
            "desc": "HARMO: preset; TIMBRE: modulator level; MORPH: envelope/time stretch. Keyboard, plucked-string & percussion preset bank."
          },
          {
            "name": "same",
            "type": "model",
            "desc": "HARMO: preset; TIMBRE: modulator level; MORPH: envelope/time stretch. Organ, pad, string & brass preset bank."
          },
          {
            "name": "Wave terrain synthesis",
            "type": "model",
            "desc": "Path over interpolated 2D terrains. HARMO: terrain; TIMBRE: path radius; MORPH: path offset. AUX: terrain-as-phase-distortion.",
            "tip": ""
          },
          {
            "name": "String machine emulation",
            "type": "model",
            "desc": "String ensemble + stereo filter/chorus. HARMO: chord; TIMBRE: chorus/filter; MORPH: waveform. OUT: voices 1+3, AUX: 2+4.",
            "tip": "Take OUT and AUX as a stereo pair for a wide ensemble."
          },
          {
            "name": "Four square voices for chords/ arps",
            "type": "model",
            "desc": "Four square voices. HARMO: chord; TIMBRE: arp pattern/inversion; MORPH: PW/sync. AUX: NES triangle. TRIG clocks the arp.",
            "tip": ""
          }
        ],
        "howtos": [
          {
            "goal": "Play the DX7-style FM synth with velocity",
            "steps": [
              "Briefly press both buttons together (under 1s) to enter navigation mode.",
              "Tap the right button past the green and red banks until the LEDs glow orange/yellow; stop on one of the three FM slots.",
              "Turn the HARMONICS knob to choose a preset, the TIMBRE knob for modulator level/brightness, and the MORPH knob to stretch the envelopes.",
              "Patch note gates to the TRIG input (the two voices alternate per note) and patch an envelope or velocity CV to the LEVEL input, which acts as velocity, for dynamic touch-sensitive FM."
            ]
          },
          {
            "goal": "Load your own DX7 patches or wavetables",
            "steps": [
              "On a computer, open Mutable Instruments' online Plaits editor and load your DX7 SysEx, wave-terrain or wavetable data into it.",
              "Unplug Plaits' inputs, set the FREQUENCY knob to 12 o'clock, and patch your computer/audio-interface output into the TIMBRE CV input (the middle CV jack).",
              "Play the audio file the editor generates at a healthy level to transfer the data into Plaits."
            ]
          }
        ]
      },
      {
        "title": "Hidden settings",
        "body": [
          "Hold the left button to edit the LPG; hold the right and turn HARMONICS to set the frequency range.",
          "V/OCT calibration is a two-point 1V/3V procedure; firmware loads via audio into the MODEL CV input."
        ],
        "controls": [
          {
            "name": "LPG / envelope editor",
            "type": "mode",
            "desc": "Hold left button; TIMBRE = LPG VCFA→VCA response, MORPH = LPG ring time + envelope decay. Shown on four yellow LEDs.",
            "tip": ""
          },
          {
            "name": "Frequency-range setting",
            "type": "mode",
            "desc": "Hold right button + turn HARMONICS to set the FREQUENCY knob span from ±7 semitones up to the full 8 octaves.",
            "tip": ""
          },
          {
            "name": "Calibration mode",
            "type": "mode",
            "desc": "Long-hold both buttons (LED blinks green) to run the two-point 1.000 V / 3.000 V V/OCT calibration.",
            "tip": "Do not confuse the long hold with the brief both-button tap used to switch banks."
          },
          {
            "name": "Audio bootloader",
            "type": "mode",
            "desc": "Power on with the left button held, audio into MODEL CV, FREQUENCY at noon — LEDs show VU and packet progress while the firmware file plays.",
            "tip": ""
          }
        ],
        "howtos": [
          {
            "goal": "Calibrate V/OCT for accurate pitch tracking",
            "steps": [
              "Disconnect every CV and gate cable, then patch a precise 1V/oct source into the V/OCT input only.",
              "Press and hold both buttons together for several seconds until the first LED blinks green (this is calibration mode, not the brief both-button tap).",
              "Send exactly 1.000 V and press any button (the LED blinks orange), then send exactly 3.000 V and press any button again to save and exit."
            ]
          },
          {
            "goal": "Flash new firmware",
            "steps": [
              "Unplug all cables, then connect your computer or audio-interface output to the MODEL CV input and set the FREQUENCY knob to 12 o'clock.",
              "Power the module on while holding the left button (the green-bank button) to enter the audio bootloader.",
              "Play the firmware .wav file at a healthy level and watch the LEDs: the first four show input VU, the last four show packet progress, until the flash completes."
            ]
          }
        ]
      }
    ],
    "trivia": [
      {
        "title": "Designed by Émilie Gillet",
        "fact": "Plaits was created by Émilie Gillet, the sole designer behind Mutable Instruments, and is widely seen as the spiritual successor to her best-selling Braids macro-oscillator — minus the screen, plus more CV inputs."
      },
      {
        "title": "Open-source by design",
        "fact": "Like all Mutable Instruments modules, Plaits' hardware and firmware are open-source, which is why its code and panels can be freely studied, modified and rebuilt."
      },
      {
        "title": "Spawned many clones",
        "fact": "Its open-source nature led to countless clones and DIY builds, and Mutable's synthesis code lives on in other modules and desktop derivatives."
      },
      {
        "title": "Firmware 1.2 doubled the models",
        "fact": "The free firmware 1.2 update (December 2022) added a second set of eight models including a 6-operator FM synth with DX7-style presets, wave terrain synthesis, and a string-machine emulation."
      }
    ],
    "outcomes": [
      {
        "title": "Get a full voice, no mixer",
        "si": 0,
        "hi": 0
      },
      {
        "title": "Unlock the hidden orange bank",
        "si": 1,
        "hi": 0,
        "hidden": true
      },
      {
        "title": "Plucks that sweep themselves",
        "si": 2,
        "hi": 0
      },
      {
        "title": "Shape the pluck and decay",
        "si": 4,
        "hi": 0
      },
      {
        "title": "Play a voice from one cable",
        "si": 4,
        "hi": 1
      },
      {
        "title": "Make it speak words",
        "si": 5,
        "hi": 0
      },
      {
        "title": "Build a drum voice",
        "si": 6,
        "hi": 0
      },
      {
        "title": "Load your own DX7 patches",
        "si": 7,
        "hi": 1,
        "hidden": true
      },
      {
        "title": "Track pitch perfectly in tune",
        "si": 8,
        "hi": 0
      }
    ],
    "hotspots": {
      "frequency": {
        "x": 0.25,
        "y": 0.19,
        "r": 0.13
      },
      "harmonics": {
        "x": 0.75,
        "y": 0.19,
        "r": 0.13
      },
      "timbre": {
        "x": 0.16,
        "y": 0.38,
        "r": 0.1
      },
      "morph": {
        "x": 0.84,
        "y": 0.38,
        "r": 0.1
      },
      "left button": {
        "x": 0.42,
        "y": 0.115,
        "r": 0.05
      },
      "right button": {
        "x": 0.58,
        "y": 0.115,
        "r": 0.05
      },
      "trig": {
        "x": 0.11,
        "y": 0.655,
        "r": 0.06
      },
      "level": {
        "x": 0.26,
        "y": 0.655,
        "r": 0.06
      },
      "v/oct": {
        "x": 0.41,
        "y": 0.655,
        "r": 0.06
      },
      "out": {
        "x": 0.7,
        "y": 0.655,
        "r": 0.06
      },
      "aux": {
        "x": 0.87,
        "y": 0.655,
        "r": 0.06
      }
    }
  },
  {
    "id": "pams",
    "name": "Pam's Pro Workout",
    "manufacturer": "ALM Busy Circuits",
    "hp": 8,
    "tagline": "Programmable clocked CV/modulation source — 8 outputs synced to a master BPM clock.",
    "image": "images/pams.png",
    "manualUrl": "https://busycircuits.com/pages/alm034",
    "overview": "Eight programmable outputs from one BPM clock — triggers, LFOs, envelopes, Euclidean patterns, random and quantised melodic CV, all tempo-locked.",
    "specs": {
      "Width": "8 HP",
      "Depth": "32 mm",
      "Power": "+12V 60mA / -12V 10mA",
      "Outputs": "8 × 0–5V buffered, 12-bit",
      "Tempo": "10–303 BPM",
      "Inputs": "Up to 4 CV + Clock + Run"
    },
    "sections": [
      {
        "title": "What it is",
        "body": [
          "A compact 8HP clocked CV and modulation source built around one BPM master clock.",
          "Eight outputs each give triggers, LFOs, envelopes, Euclidean rhythms, quantised pitch or random, all locked to that tempo."
        ],
        "controls": [
          {
            "name": "8 Outputs (1-8)",
            "type": "jack-out",
            "desc": "Eight buffered 0-5V CV/gate outputs, each independently programmable and synced to the master clock. Each has a green LED indicating its current output level.",
            "tip": "All outputs share one master tempo but are otherwise fully independent in division, waveform and pattern."
          },
          {
            "name": "Master BPM clock",
            "type": "mode",
            "desc": "A single internal BPM-based clock (approx. 10-330 BPM) that every output derives its timing from via divisors and multipliers (/16384 to x192)."
          }
        ],
        "howtos": [
          {
            "goal": "Confirm you are running the PRO and not the NEW Workout",
            "steps": [
              "Power on; look at the display: the PRO has a full-colour high-resolution screen, the NEW Workout had a small monochrome display.",
              "Check the four upper input jacks read Clk, Run, CV 1 and CV 2 (the PRO can use all four as CV inputs).",
              "From the BPM screen, turn the encoder to an output screen and long-hold (~1s) to open Extended Parameters.",
              "PRO-only entries to look for: Cross Op, Flex, and a Euclidean grid with a Pad parameter."
            ]
          }
        ]
      },
      {
        "title": "Interface & display",
        "body": [
          "One blue click-encoder runs everything: turn to move between screens, click to edit, long-hold to go deeper.",
          "Start/Stop runs the clock; values save instantly and persist across power cycles."
        ],
        "controls": [
          {
            "name": "Program knob (blue click-encoder)",
            "type": "knob",
            "desc": "The primary control. Turn to navigate or change values, push to select/edit/deselect, long-hold (~1s) to enter Extended Parameters from an output screen or Settings from the BPM screen.",
            "tip": "Adjust the long-hold registration time in Settings > Enc Hold Time if accidental holds occur."
          },
          {
            "name": "Start / Stop button",
            "type": "button",
            "desc": "Clicking starts the master clock at the displayed BPM; clicking again stops and resets the clock. Also acts as a modifier for shortcuts.",
            "tip": "Hold Start/Stop + turn knob to edit one parameter across outputs; hold Start/Stop + click to mute the active output."
          },
          {
            "name": "Full-colour LCD display",
            "type": "mode",
            "desc": "High-resolution colour screen showing the BPM, per-output modifier/parameter screens, Euclidean grids and the real-time scope. Theme is selectable in Settings."
          }
        ],
        "howtos": [
          {
            "goal": "Navigate from tempo to an output's deep parameters",
            "steps": [
              "Starting at the BPM home screen, turn the blue click-encoder until the desired output number screen appears.",
              "Push and hold the encoder for just over one second to enter that output's Extended Parameters.",
              "Turn the encoder to step through Shape, Width, Level, Offset, Phase, Probability, Euclidean, Loops, Cross Op, Flex, Invert, Quantiser, Scope, Load/Save/Reset.",
              "Long-hold the encoder again to return to the output modifier screen."
            ]
          },
          {
            "goal": "Copy one output's full setup to another",
            "steps": [
              "From the BPM home screen, turn the encoder to the source output screen and long-hold (~1s) to enter its Extended Parameters.",
              "Turn the encoder to Save and click to save the output's parameters.",
              "Long-hold to exit, turn the encoder to the destination output screen, then long-hold to enter its Extended Parameters.",
              "Turn to Load and click to load the saved setup; this copy/pastes the entire output configuration."
            ]
          }
        ]
      },
      {
        "title": "Tempo & external sync",
        "body": [
          "Set BPM on the main screen (~10-330); Start/Stop runs and resets the clock.",
          "External sync needs a 24 PPQN clock plus a Run gate so Pam knows when it starts and stops."
        ],
        "controls": [
          {
            "name": "Clk input",
            "type": "jack-in",
            "desc": "External clock input. In Settings can be set to CLOCK (sync to an external pulse train at the configured PPQN), CV (use as a fourth assignable CV input), or NEXT BANK (a trigger loads the next bank).",
            "tip": "For accurate sync set this to CLOCK and keep both Pam and the source at 24 PPQN."
          },
          {
            "name": "Run input",
            "type": "jack-in",
            "desc": "Transport/control input. Settable to RUN (gate high=play, low=stop), RESET (trigger returns to step 1, auto start/stop on external clock), CV (third assignable CV input), PREV BANK (trigger loads previous bank), or ROTATE (trigger rotates a defined range of outputs).",
            "tip": "Use RUN with a Din Sync gate for the most reliable external syncing — it lets Pam 'pre-sync'."
          },
          {
            "name": "EXT Clock PPQN",
            "type": "mode",
            "desc": "Settings value defining how many external clock pulses equal one quarter note. Default and recommended value is 24; must match the external source.",
            "tip": "A mismatched PPQN makes Pam show a much lower BPM than the source."
          },
          {
            "name": "Start/Stop",
            "type": "button",
            "desc": "Runs and stops the internal clock; when an external clock and Run gate are used, the external transport governs play/stop instead."
          }
        ],
        "howtos": [
          {
            "goal": "Set the master tempo manually",
            "steps": [
              "At the BPM home screen, click the blue click-encoder so the BPM value highlights.",
              "Turn the encoder to the desired tempo (approx. 10-330 BPM).",
              "Click again to deselect and store.",
              "Press Start/Stop to run the clock at that tempo."
            ]
          },
          {
            "goal": "Slave Pam to an external Din Sync / MIDI clock",
            "steps": [
              "At the BPM home screen, long-hold the encoder (~1s) to open Settings.",
              "Turn to Input: Clk, click and set it to CLOCK; turn to EXT Clock PPQN, click and set it to 24 to match your source.",
              "Turn to Input: Run, click and set it to RUN; long-hold to exit Settings.",
              "Patch the external 24 PPQN clock into the Clk jack and the play/stop gate into the Run jack.",
              "Start the external transport; Pam follows it (a +/-1 BPM display difference is normal)."
            ]
          }
        ]
      },
      {
        "title": "Clock modifiers",
        "body": [
          "Each output's modifier sets its ratio to the master clock, from /16384 to x192, including triplet and dotted values.",
          "Utility types (GATE, OFF, START, STOP) and triggered envelope types are also available."
        ],
        "controls": [
          {
            "name": "Output Modifier",
            "type": "mode",
            "desc": "Per-output value setting its clock relationship: multipliers/dividers from /16384 to x192 (including non-integer triplet/dotted factors), or one of the special utility/triggered types.",
            "tip": "The modifier sets the 'step time' that downstream parameters express percentages of."
          },
          {
            "name": "GATE (utility modifier)",
            "type": "mode",
            "desc": "Outputs a held high voltage while the clock is playing — useful as a Run signal for external sync.",
            "tip": "Patch a GATE (or On) output to another Pam's Run input to chain two units."
          },
          {
            "name": "OFF / START / STOP (utility modifiers)",
            "type": "mode",
            "desc": "OFF silences the output; START fires a single pulse at clock start; STOP fires a single pulse when the clock stops — both useful for resetting synced sequencers."
          },
          {
            "name": "Triggered (envelope) modifiers",
            "type": "mode",
            "desc": "Four modifier types that only output once a trigger arrives at an assigned input while Pam is playing, behaving as envelopes with time set in beats and Width fine-tuning the shape."
          }
        ],
        "howtos": [
          {
            "goal": "Make output 1 a quarter-note clock and output 2 a half-time clock",
            "steps": [
              "From the BPM home screen, turn the encoder to the output 1 screen and click to highlight its modifier.",
              "Turn to x1 (one step per beat) and click to exit.",
              "Turn the encoder to the output 2 screen, click the modifier, turn to /2 and click to exit.",
              "Press Start/Stop; output 1 pulses every beat, output 2 every other beat."
            ]
          },
          {
            "goal": "Send a reset pulse to an external sequencer when Pam stops",
            "steps": [
              "From the BPM home screen, turn the encoder to a free output screen and click its modifier.",
              "Turn the encoder until it reads STOP and click to exit.",
              "Patch that output jack to your sequencer's reset input.",
              "Press Start/Stop to halt Pam; a single pulse fires from that output to reset the external sequencer."
            ]
          }
        ]
      },
      {
        "title": "Output waveforms",
        "body": [
          "Shape picks the waveform per step: gates, ratchets, triangle, trapezoid, sine, hump, exp/log envelopes and two randoms.",
          "The single Width/Slew control reshapes each one differently; randoms add a Slew parameter."
        ],
        "controls": [
          {
            "name": "Shape",
            "type": "mode",
            "desc": "Selects the output waveform: Gate/Pulse, Ratchet x2, Ratchet x4, Triangle, Trapezoid, Sine, Hump, Exp Envelope, Log Envelope, Classic Random, Smooth Random. One full cycle spans one step.",
            "tip": "Set Level to 0 and use Offset to turn an output into a static programmable voltage source."
          },
          {
            "name": "Width / Slew",
            "type": "knob",
            "desc": "Context-dependent shaper: pulse width for gates, sub-pulse count for ratchets, slew for triangles, morph/lean for trapezoid/sine/hump, and envelope time for Exp/Log envelopes.",
            "tip": "Watch the built-in Scope while sweeping Width to see exactly how each shape responds."
          },
          {
            "name": "Slew (random shapes only)",
            "type": "knob",
            "desc": "Extra parameter that appears for Classic Random and Smooth Random; smooths the edges of the random waveform."
          }
        ],
        "howtos": [
          {
            "goal": "Create a slewed random LFO on an output",
            "steps": [
              "From the BPM home screen, turn the encoder to the output's screen and long-hold (~1s) to enter Extended Parameters.",
              "Turn to Shape, click, turn to Classic Random (or Smooth Random) and click to exit selection.",
              "Turn to the Slew parameter that has now appeared, click, and raise it to smooth the random steps.",
              "Turn to Level and Offset to set the voltage range, and optionally turn to Loop and set a beat count so the random pattern repeats."
            ]
          },
          {
            "goal": "Make a ratcheting gate",
            "steps": [
              "From the BPM home screen, turn the encoder to the output's screen and long-hold (~1s) to enter Extended Parameters.",
              "Turn to Shape, click, and choose Ratchet x2 or Ratchet x4, then click to exit.",
              "Turn to Width, click, and raise it to add more sub-pulses per step.",
              "Long-hold to exit to the output screen, click the modifier, and set a musical division (e.g. x1 or /2) to place the ratchets rhythmically.",
              "Optionally, back in Extended Parameters, assign Width to a CV input (select Width, then scroll below the lowest value to pick a CV input) so ratchet density can be modulated."
            ]
          }
        ]
      },
      {
        "title": "Level, Offset & Phase",
        "body": [
          "Level scales output voltage (roughly 1V per 20%); Offset biases it upward and can act as a constant CV.",
          "Phase shifts the waveform within its step to stagger outputs."
        ],
        "controls": [
          {
            "name": "Level",
            "type": "knob",
            "desc": "Overall maximum output voltage as a percentage of 0-5V. Scales the whole waveform.",
            "tip": "Each 20% of Level is approximately 1 volt."
          },
          {
            "name": "Offset",
            "type": "knob",
            "desc": "Initial DC bias/offset from zero volts as a percentage of 0-5V; shifts the waveform up and defines the resting voltage on skipped steps.",
            "tip": "Set Level to 0 and use Offset alone to make the output a programmable constant voltage source."
          },
          {
            "name": "Phase",
            "type": "knob",
            "desc": "Phase-shifts the waveform within its step, letting you time-offset outputs that share the same timing.",
            "tip": "Phase wraps — shifting a >50% Width pulse by >50% phase can cause unexpected double triggering."
          }
        ],
        "howtos": [
          {
            "goal": "Turn an output into a static programmable voltage",
            "steps": [
              "From the BPM home screen, turn the encoder to the output's screen and long-hold (~1s) to enter Extended Parameters.",
              "Turn to Level, click, set it to 0 and click to exit.",
              "Turn to Offset, click, and dial in the desired constant voltage (each 20% is roughly 1V), then click to exit.",
              "The output now holds a steady voltage you can patch as a fixed CV; the value is stored with the preset."
            ]
          },
          {
            "goal": "Create two LFOs in quadrature",
            "steps": [
              "On both outputs, set the same modifier: from the BPM home screen turn to each output screen, click the modifier and set the same value.",
              "Long-hold (~1s) on each output screen to enter Extended Parameters, turn to Shape and set both to the same waveform (e.g. Sine).",
              "On the second output's Extended Parameters, turn to Phase, click and set it to 25% (a quarter cycle), then click to exit.",
              "The two outputs now run a quarter-cycle apart for circular/quadrature modulation."
            ]
          }
        ]
      },
      {
        "title": "Probability & Euclidean",
        "body": [
          "Three engines decide which steps fire: Probability sets a per-step chance, Euclidean spreads hits evenly across steps.",
          "Loop resets patterns over a set number of beats; Nap, Wake and Shift mute and stagger outputs for evolving arrangements."
        ],
        "controls": [
          {
            "name": "Probability",
            "type": "knob",
            "desc": "Percentage likelihood that a step occurs versus being skipped. Skipped steps output only the Offset (or hold the last value for random shapes).",
            "tip": "Loop and save the seed to make a probabilistic pattern repeat."
          },
          {
            "name": "Euclidean Steps",
            "type": "mode",
            "desc": "Total number of steps in the Euclidean pattern. Must be greater than zero before the other Euclidean parameters appear."
          },
          {
            "name": "Euclidean Triggers",
            "type": "mode",
            "desc": "Number of hits distributed as evenly as possible across the steps. Must be >0 and <Steps to form a pattern (unless under CV)."
          },
          {
            "name": "Euclidean Pad",
            "type": "mode",
            "desc": "Adds empty padding steps to the end of the pattern to break up regularity and group hits to the start, middle or end of a loop."
          },
          {
            "name": "Euclidean Shift",
            "type": "mode",
            "desc": "Rotates the generated pattern by a number of steps, changing its start position."
          },
          {
            "name": "Loop",
            "type": "mode",
            "desc": "Number of beats (not steps) at which the output resets, giving repeatable structure to random, FLEX and Euclidean patterns."
          },
          {
            "name": "Loop Nap",
            "type": "mode",
            "desc": "Number of complete loops to sleep/shut off the output."
          },
          {
            "name": "Loop Wake",
            "type": "mode",
            "desc": "Number of complete loops to run before napping."
          },
          {
            "name": "Loop Shift",
            "type": "mode",
            "desc": "Offsets the start of the Nap/Wake cycle by a number of complete loops. This parameter cannot be CV controlled."
          }
        ],
        "howtos": [
          {
            "goal": "Program a Euclidean rhythm of 4 hits in 16 steps",
            "steps": [
              "From the BPM home screen, turn the encoder to the output's screen and long-hold (~1s) to enter Extended Parameters.",
              "Turn to Euclidean Steps, click, set it to 16 and click to exit.",
              "Turn to Euclidean Triggers, click, set it to 4 and click to exit; the grid shows four evenly spaced hits.",
              "Optionally turn to Euclidean Shift to rotate where the pattern begins, and Euclidean Pad to push hits toward one section.",
              "Turn to Shape, click, set it to Gate/Pulse and click to exit so each hit fires a trigger."
            ]
          },
          {
            "goal": "Make an output play two bars then rest one bar",
            "steps": [
              "From the BPM home screen, turn the encoder to the output's screen and long-hold (~1s) to enter Extended Parameters.",
              "Turn to Loop, click, and set it to one bar's worth of beats (e.g. 4), then click to exit.",
              "Turn to Loop Wake, click, set it to 2 (run two loops) and click to exit.",
              "Turn to Loop Nap, click, set it to 1 (sleep one loop) and click to exit.",
              "Optionally, on other outputs, turn to Loop Shift and set a value so their rests stagger against this one."
            ]
          }
        ]
      },
      {
        "title": "Quantiser & scales",
        "body": [
          "The Quantiser snaps an output to a musical scale at 1V/octave, applied after Cross Operations.",
          "The PRO adds up to three user-defined scales that persist across power cycles."
        ],
        "controls": [
          {
            "name": "Quantiser",
            "type": "mode",
            "desc": "Snaps the output's final value to a selected musical scale or mode at 1V/octave. Applied after Cross Operations, at the end of the signal path.",
            "tip": "Quantise a looped random shape to instantly generate a repeatable melodic line."
          },
          {
            "name": "User Scales",
            "type": "mode",
            "desc": "Up to three custom scales can be defined and saved across power cycles by long-holding the knob on a User scale to toggle notes on/off."
          }
        ],
        "howtos": [
          {
            "goal": "Generate a quantised generative melody",
            "steps": [
              "From the BPM home screen, turn the encoder to the output's screen and long-hold (~1s) to enter Extended Parameters.",
              "Turn to Shape, click, set it to Classic Random or Smooth Random and click to exit.",
              "Turn to Quantiser, click, and select a musical scale (or a User scale), then click to exit.",
              "Optionally turn to Loop and set a beat count so the melody repeats, then turn to Save and click to lock in the seed.",
              "Patch the output jack to an oscillator's 1V/oct input."
            ]
          },
          {
            "goal": "Create and save a custom scale",
            "steps": [
              "From the BPM home screen, turn the encoder to any output's screen and long-hold (~1s) to enter Extended Parameters.",
              "Turn to Quantiser, click, and select a User scale slot.",
              "Long-hold the encoder to enter scale edit mode.",
              "Turn the encoder to move between notes and click to toggle each note in/out of the scale.",
              "Long-hold the encoder again to exit and save; the scale persists across power cycles."
            ]
          }
        ]
      },
      {
        "title": "Cross Ops & FLEX",
        "body": [
          "Cross Operations combine the active output with another source via mixing, logic, sample-and-hold or seed resets, before quantisation.",
          "FLEX adds micro-timing: HUMAN, SWING, RAMP, HUMP, DELAY and PWR2, scaled by an amount."
        ],
        "controls": [
          {
            "name": "Cross Op",
            "type": "mode",
            "desc": "Selects how the active output is combined with a source: None, MIX, MULT, ADD, SUB, MIN, MAX, HOLD, S&H, MASK, NOT, OR, XOR, AND, BitOR, BitXOR, BitAND, SEED. Applied before quantisation.",
            "tip": "Use SEED with an Axon-2 button as the source to re-roll an output's randomness on a button press."
          },
          {
            "name": "Cross Src",
            "type": "mode",
            "desc": "Chooses the cross-operation source: another output, IN1/IN2 (sampled CV1/CV2 voltage, lower resolution), CVx (CV selects the source output number), or Axon A/B buttons.",
            "tip": "Axon A/B options are greyed out unless an Axon-2 is connected and its buttons are assigned to 'Cross Src'."
          },
          {
            "name": "Flex Op",
            "type": "mode",
            "desc": "Off-grid micro-timing engine: HUMAN, SWING, RAMP UP, RAMP DOWN, HUMP, DELAY, PWR2, each with an amount percentage scaling intensity.",
            "tip": "Loop resets RAMP UP/DOWN and HUMP back to their original timing; CV the PWR2 amount for ratchet effects."
          },
          {
            "name": "Invert",
            "type": "mode",
            "desc": "Inverts the final output value."
          },
          {
            "name": "Scope",
            "type": "mode",
            "desc": "Real-time waveform display for the output. Click to toggle full-screen; turn to zoom in/out."
          }
        ],
        "howtos": [
          {
            "goal": "Ring-modulate two outputs",
            "steps": [
              "From the BPM home screen, turn the encoder to the output 1 screen and long-hold (~1s) to enter Extended Parameters.",
              "Turn to Cross Op, click, set it to MULT and click to exit.",
              "Turn to Cross Src, click, set it to Out 2 and click to exit.",
              "Long-hold to exit, then give outputs 1 and 2 different shapes/timings (set each output's modifier on its screen, and Shape in its Extended Parameters, e.g. Sine vs Triangle).",
              "Output 1 now carries the scaled product of the two for a ring-mod-style result."
            ]
          },
          {
            "goal": "Add swing to a hi-hat pattern",
            "steps": [
              "From the BPM home screen, turn the encoder to the hi-hat output's screen and long-hold (~1s) to enter Extended Parameters.",
              "Turn to Flex Op, click, select SWING and click to exit.",
              "Turn to the Flex amount, click and raise it until the alternate steps are delayed to taste, then click to exit.",
              "If the pattern uses a Loop, the swing stays musically aligned to it."
            ]
          },
          {
            "goal": "Re-roll an output's randomness with a button",
            "steps": [
              "Connect an Axon-2 to the rear 6-pin EXPAND header (firmware v120+ required) and assign one of its buttons to 'Cross Src' in its settings.",
              "From the BPM home screen, turn the encoder to the random output's screen and long-hold (~1s) to enter Extended Parameters.",
              "Turn to Cross Op, click, set it to SEED and click to exit.",
              "Turn to Cross Src, click, set it to Axon A (or B) and click to exit.",
              "Each press of the assigned button resets the random seed, generating a fresh random pattern, ideal for Krell patches."
            ]
          }
        ]
      },
      {
        "title": "CV inputs & expanders",
        "body": [
          "Up to four CV inputs (CV1/CV2 plus reassigned Clk/Run) can drive almost any parameter, each with its own attenuation and offset.",
          "Axon and PPEXP expanders add more CV, outputs and sync; banks store all settings and back up over USB-C."
        ],
        "controls": [
          {
            "name": "CV 1 / CV 2 inputs",
            "type": "jack-in",
            "desc": "Two dedicated 0-5V CV inputs assignable to output modifiers and most extended parameters.",
            "tip": "Voltages outside 0-5V are safe but ignored."
          },
          {
            "name": "Clk / Run as CV",
            "type": "jack-in",
            "desc": "When set to 'CV' in Settings, the Clk and Run jacks become a third and fourth assignable CV input.",
            "tip": "If a CV option is greyed out, set the corresponding jack to CV mode in Settings first."
          },
          {
            "name": "CV Attenuation / Offset",
            "type": "mode",
            "desc": "Per-parameter scaling and bias for an assigned CV; push-hold the knob on a highlighted CV option to set them and monitor the applied value. Negative attenuation inverts the CV (attenuverter).",
            "tip": "Multiple parameters can share one CV input, but a parameter can only take one CV input."
          },
          {
            "name": "Axon-1 / Axon-2 expanders",
            "type": "mode",
            "desc": "Optional CV expanders on the rear 6-pin EXPAND header; Axon-1 adds 4 CV inputs, Axon-2 adds 4 CV inputs plus offsets and two assignable buttons (Menu, Next/Prev Output, Mute, Tap Tempo, Next/Prev Bank, Cross Src). One Axon supported; Axon-2 needs firmware v120+.",
            "tip": "Do not plug expanders into the wrong header — the EXPAND (6-pin horizontal) is for Axons, the MIDI-EX (5-pin vertical) for PPEXPs; swapping causes catastrophic damage."
          },
          {
            "name": "PPEXP1 / PPEXP2 expanders",
            "type": "mode",
            "desc": "Connect to the vertical MIDI-EX header to add Din Sync and MIDI Clock outputs; PPEXP1 adds fixed pulse outputs (x1, x2, x4, /4, /16) plus a Stop trigger for resetting sequencers."
          },
          {
            "name": "Bank memory (Load/Save Bank)",
            "type": "mode",
            "desc": "Stores and recalls whole banks (all 8 outputs plus BPM). Settings persist across power cycles without stopping the clock; full memory backs up via USB-C as PPWDATA.BAK."
          }
        ],
        "howtos": [
          {
            "goal": "Assign CV control to an output parameter with an attenuverter",
            "steps": [
              "From the BPM home screen, turn the encoder to the output's screen and long-hold (~1s) to enter Extended Parameters.",
              "Turn to the parameter you want to modulate and click to select it.",
              "Turn the encoder down past the lowest value until the CV-assign options appear, then choose a CV input (CV 1 or CV 2).",
              "Push and hold the encoder while the CV option is highlighted to open the CV sub-screens.",
              "Set the attenuation (negative values invert it as an attenuverter) and the offset, monitoring the live applied CV value, then exit."
            ]
          },
          {
            "goal": "Use Clk and Run as extra CV inputs",
            "steps": [
              "At the BPM home screen, long-hold the encoder (~1s) to open Settings.",
              "Turn to Input: Clk, click and set it to CV; turn to Input: Run, click and set it to CV.",
              "Long-hold to exit Settings; both jacks now appear as assignable CV inputs in parameter CV menus alongside CV 1 and CV 2."
            ]
          },
          {
            "goal": "Back up all banks to a computer",
            "steps": [
              "Power off Pam and connect it to a computer via USB-C; it mounts as a removable drive.",
              "Copy the PPWDATA.BAK file from the PAM root directory to your computer.",
              "To restore later, copy a saved PPWDATA.BAK back onto the PAM drive."
            ]
          }
        ]
      }
    ],
    "trivia": [
      {
        "title": "Not actual exercise",
        "fact": "ALM notes the module is 'unlikely to actually improve aerobic fitness' despite the workout-themed name."
      },
      {
        "title": "PRO is a ground-up rewrite",
        "fact": "The PRO replaces the popular Pamela's NEW Workout (ALM017), keeping the 8HP footprint and 8 outputs but adding a full-colour high-res display, up to 4 CV inputs, cross-output modulation and FLEX micro-timing."
      },
      {
        "title": "Available in VCV Rack",
        "fact": "Beyond the hardware, Pam's Pro Workout exists as an official software module for VCV Rack."
      },
      {
        "title": "Deep memory",
        "fact": "Settings persist across power cycles and presets are stored across 7 banks (56 total slots), so patches survive a reboot."
      }
    ],
    "outcomes": [
      {
        "title": "Set the tempo",
        "si": 2,
        "hi": 0
      },
      {
        "title": "Sync to external clock",
        "si": 2,
        "hi": 1
      },
      {
        "title": "Get clocks at different speeds",
        "si": 3,
        "hi": 0
      },
      {
        "title": "Make a random LFO",
        "si": 4,
        "hi": 0
      },
      {
        "title": "Add ratchets to a gate",
        "si": 4,
        "hi": 1
      },
      {
        "title": "Program a Euclidean rhythm",
        "si": 6,
        "hi": 0
      },
      {
        "title": "Generate a random melody",
        "si": 7,
        "hi": 0
      },
      {
        "title": "Add swing to hats",
        "si": 8,
        "hi": 1
      },
      {
        "title": "Copy an output's setup",
        "si": 1,
        "hi": 1
      }
    ],
    "hotspots": {
      "clk": {
        "x": 0.385,
        "y": 0.165,
        "r": 0.04
      },
      "run": {
        "x": 0.46,
        "y": 0.165,
        "r": 0.04
      },
      "cv 1": {
        "x": 0.535,
        "y": 0.165,
        "r": 0.04
      },
      "cv 2": {
        "x": 0.61,
        "y": 0.165,
        "r": 0.04
      },
      "screen": {
        "x": 0.5,
        "y": 0.325,
        "rx": 0.115,
        "ry": 0.06
      },
      "bpm screen": {
        "x": 0.5,
        "y": 0.325,
        "rx": 0.115,
        "ry": 0.06
      },
      "start/stop": {
        "x": 0.43,
        "y": 0.485,
        "r": 0.055
      },
      "encoder": {
        "x": 0.565,
        "y": 0.49,
        "r": 0.075
      },
      "program knob": {
        "x": 0.565,
        "y": 0.49,
        "r": 0.075
      },
      "output": {
        "x": 0.5,
        "y": 0.77,
        "rx": 0.15,
        "ry": 0.115
      }
    }
  },
  {
    "id": "harmonaig",
    "name": "Harmonaig",
    "manufacturer": "Instruō",
    "hp": 18,
    "tagline": "Four-voice diatonic harmonic quantiser that turns a single melody into chords.",
    "image": "images/harmonaig.png",
    "manualUrl": "https://www.instruomodular.com/product/harmonaig/",
    "overview": "A diatonic quantiser that turns one pitch CV into a four-note seventh chord — Root, 3rd, 5th and 7th outputs, with chord quality, inversion, voicing and per-voice slew.",
    "specs": {
      "Width": "18 HP",
      "Depth": "27 mm",
      "Power": "+12V 120mA / -12V 20mA",
      "CV range": "±10V (20 octaves) in and out",
      "Gate voltage": "+10V",
      "Trigger duration": "~5 ms"
    },
    "sections": [
      {
        "title": "What it does",
        "body": [
          "Four-voice diatonic harmonic quantiser in 18 HP.",
          "Takes one pitch CV, builds a four-note seventh chord, and outputs R, 3, 5, and 7 as separate 1V/oct voltages."
        ],
        "controls": [
          {
            "name": "R / 3 / 5 / 7 CV Outputs",
            "type": "jack-out",
            "desc": "Four independent +/-10V pitch outputs carrying the root, third, fifth and seventh chord tones respectively. Patch each to the 1V/Oct input of a separate oscillator."
          },
          {
            "name": "CV Input",
            "type": "jack-in",
            "desc": "The single bipolar pitch CV that is quantised and harmonised into the four-note chord. Range is +/-10V, spanning 20 octaves."
          },
          {
            "name": "Keyboard Buttons",
            "type": "button",
            "desc": "A horizontal twelve-button keyboard (C through B) used to enable scale tones, select modes, and play notes directly in Performance Mode."
          }
        ],
        "howtos": [
          {
            "goal": "Build a basic four-voice chord voice",
            "steps": [
              "Set four oscillators to the same tuning (unison) and patch each oscillator output into a separate channel of a four-channel mixer.",
              "Patch the Harmonaig R, 3, 5 and 7 CV Outputs to the 1V/Oct inputs of those four oscillators respectively.",
              "Feed a sequence or keyboard pitch CV into the CV Input, then turn the CV Attenuverter clockwise from center to set how much of that CV passes through.",
              "Patch the mixer output through a filter then a VCA, and patch the Harmonaig Gate Output to the envelope that opens the VCA."
            ]
          }
        ]
      },
      {
        "title": "CV input & scale",
        "body": [
          "The CV Input (+/-10V) runs through an attenuverter, then gets quantised to the active scale.",
          "Edit notes via the twelve Keyboard Buttons, or hold Transpose to pick a whole mode from the Modal Scale Menu."
        ],
        "controls": [
          {
            "name": "CV Input",
            "type": "jack-in",
            "desc": "Bipolar pitch CV to be quantised and harmonised. Input range +/-10V (20 octaves).",
            "tip": "It accepts audio-rate signals too; run a fully-clockwise attenuverter for a chord-stacked oscillator swarm."
          },
          {
            "name": "CV Attenuverter",
            "type": "knob",
            "desc": "Scales and inverts the CV Input signal before quantisation. Centre is zero; clockwise passes the signal upright, anticlockwise inverts it."
          },
          {
            "name": "Keyboard Buttons",
            "type": "button",
            "desc": "Enable (amber) or disable (dark) each of the twelve chromatic scale tones; the sounding note lights white. Used directly to hand-edit a scale.",
            "tip": "Deselecting all scale tones in Quantiser Mode changes Gate Out to trigger-on-keypress once you enter Performance Mode."
          }
        ],
        "howtos": [
          {
            "goal": "Select a mode from the Modal Scale Menu",
            "steps": [
              "Press and hold the Transpose Button (the fader's button) to open the Modal Scale Menu; the current mode lights bright soft-white and other modes glow dim.",
              "While still holding, press the Diatonic Button to switch between the Ionian and Harmonic Minor mode sets.",
              "Press the Keyboard Button that names the mode you want (e.g. the D key for Dorian).",
              "Press the Transpose Button again to exit and confirm the choice."
            ]
          },
          {
            "goal": "Hand-build a custom chromatic scale",
            "steps": [
              "Confirm you are in Quantiser Mode (the default at power-on). If notes play as triggers instead of quantising the CV Input, hold the Transpose Button and tap the Diatonic Button once to toggle back to Quantiser Mode.",
              "Tap each Keyboard Button to enable (amber) the chromatic notes you want in the scale; leave unwanted notes dark.",
              "Feed pitch into the CV Input; the root now quantises to the nearest enabled (amber) note."
            ]
          }
        ]
      },
      {
        "title": "Quantiser vs Performance",
        "body": [
          "Quantiser Mode turns an incoming sequence into a chord progression; Performance Mode makes the keys playable triggers.",
          "Hold Transpose and tap Diatonic to switch. Gate Out triggers per change in Quantiser, sustains while held in Performance."
        ],
        "controls": [
          {
            "name": "Quantiser Mode",
            "type": "mode",
            "desc": "Default mode. Quantises and harmonises the CV Input into four outputs; Gate Out emits ~5ms triggers on each new chord."
          },
          {
            "name": "Performance Mode",
            "type": "mode",
            "desc": "Keyboard Buttons play roots/chords directly; Gate Out is held high while a button is held."
          },
          {
            "name": "Gate Output",
            "type": "jack-out",
            "desc": "Pulse output that fires on every new voltage. Trigger (~5ms) in Quantiser Mode, sustained gate in Performance Mode. Output voltage +10V."
          }
        ],
        "howtos": [
          {
            "goal": "Switch between Quantiser and Performance Mode",
            "steps": [
              "Press and hold the Transpose Button (the fader's button).",
              "While holding it, tap the Diatonic Button once.",
              "Release both; the module has toggled to the other global mode (Quantiser to Performance, or back)."
            ]
          },
          {
            "goal": "Make the Gate Out fire a trigger on each Performance keypress",
            "steps": [
              "Confirm you are in Quantiser Mode (the power-on default). If unsure, hold the Transpose Button and tap the Diatonic Button until incoming CV is being quantised.",
              "Tap every amber Keyboard Button to deselect all scale tones so the whole twelve-button keyboard is dark.",
              "Switch to Performance Mode: hold the Transpose Button and tap the Diatonic Button once.",
              "Each Keyboard Button press now produces a short trigger from Gate Out rather than a sustained gate."
            ]
          }
        ]
      },
      {
        "title": "Chord quality",
        "body": [
          "The Chord Quality knob sweeps eight seventh-chord types from dark to bright by shifting the 3, 5, and 7 outputs.",
          "Diatonic Button off lets the mode pick the in-key chord; on gives manual knob and CV control."
        ],
        "controls": [
          {
            "name": "Chord Quality",
            "type": "knob",
            "desc": "Sweeps through eight seventh-chord types from Minor Major 7th to Augmented Dominant 7th, raising/lowering the 3, 5 and 7 outputs. Active quality lights an LED. Only active when the Diatonic Button is lit."
          },
          {
            "name": "Chord Quality CV Input",
            "type": "jack-in",
            "desc": "Bipolar +/-5V CV that sums with the knob to modulate chord quality. Effective only when the Diatonic Button is illuminated."
          },
          {
            "name": "Diatonic Button",
            "type": "button",
            "desc": "Unlit: chord quality is chosen automatically by the modal harmonisation. Lit: manual/CV control via the Chord Quality knob and CV input.",
            "tip": "Leave it unlit for automatic in-key progressions; light it to force a specific chord type or to program custom chords."
          }
        ],
        "howtos": [
          {
            "goal": "Let Harmonaig pick diatonic chords automatically",
            "steps": [
              "Press the Diatonic Button until it is unlit, so the mode chooses chord quality automatically.",
              "Hold the Transpose Button to open the Modal Scale Menu, press the Keyboard Button for the mode you want (e.g. D for Dorian), then press the Transpose Button again to confirm.",
              "Feed pitch into the CV Input; each root now gets its correct in-key seventh chord on the R, 3, 5 and 7 outputs."
            ]
          },
          {
            "goal": "Force a single chord type for every root",
            "steps": [
              "Press the Diatonic Button until it lights, enabling manual Chord Quality control.",
              "Turn the Chord Quality knob until the LED for the chord type you want lights (eight types from Minor Major 7th to Augmented Dominant 7th).",
              "Feed pitch into the CV Input; every root now produces that same chord quality regardless of scale."
            ]
          }
        ]
      },
      {
        "title": "Inversion",
        "body": [
          "Restacks the chord's notes across octaves, changing the bass note and voice leading without changing the tones.",
          "The knob steps Root through 3rd inversion; a bipolar +/-5V CV Input sums with it."
        ],
        "controls": [
          {
            "name": "Inversion",
            "type": "knob",
            "desc": "Selects Root Position, 1st, 2nd or 3rd Inversion, reordering the chord tones across octaves while keeping the same notes."
          },
          {
            "name": "Inversion CV Input",
            "type": "jack-in",
            "desc": "Bipolar +/-5V CV that sums with the Inversion knob to modulate the inversion automatically."
          }
        ],
        "howtos": [
          {
            "goal": "Automate chord inversions with random voltage",
            "steps": [
              "Patch a random or stepped CV source (+/-5V) into the Inversion CV Input.",
              "Set the Inversion knob near center so the CV has headroom to step Root through 3rd inversion.",
              "Clock that random source from your chord trigger (e.g. patch the Gate Output through a multiple to the random source's clock) so the inversion changes with each new chord."
            ]
          }
        ]
      },
      {
        "title": "Voicing",
        "body": [
          "Sets how spread out the chord tones are: Close, Drop 2, Drop 3, or Spread (Open).",
          "Wider voicings open the chord up without changing its identity. A +/-5V CV Input modulates density."
        ],
        "controls": [
          {
            "name": "Voicing",
            "type": "knob",
            "desc": "Selects Close, Drop 2, Drop 3 or Spread voicing, redistributing the chord tones across octaves to change density."
          },
          {
            "name": "Voicing CV Input",
            "type": "jack-in",
            "desc": "Bipolar +/-5V CV that sums with the Voicing knob to modulate density automatically."
          }
        ],
        "howtos": [
          {
            "goal": "Open up a dense chord under a melody",
            "steps": [
              "Turn the Voicing knob toward Drop 2, Drop 3, or fully clockwise to Spread (Open).",
              "Listen as chord tones move into other octaves, leaving register space for a lead line.",
              "For evolving width, patch a slow LFO (+/-5V) into the Voicing CV Input."
            ]
          }
        ]
      },
      {
        "title": "Transpose & outputs",
        "body": [
          "The Transpose fader offsets pitch: quantised per-output, global semitone, or fine tune, set by its colour.",
          "Four outputs (R, 3, 5, 7) each get an individual Slew knob; Unison Mode flattens all four for tuning oscillators."
        ],
        "controls": [
          {
            "name": "Transpose Button",
            "type": "button",
            "desc": "Cycles the Transpose fader through four states by colour: off (disabled), amber (Quantised Offset), soft white (Global Quantised Offset), white (Global Fine Tune)."
          },
          {
            "name": "Transpose",
            "type": "knob",
            "desc": "Fader whose function depends on the Transpose Button state: a quantised +/-2V scale offset summed with CV In, a global semitone +/-2V offset, or a global unquantised +/-1V fine tune. Centre dent is 0V."
          },
          {
            "name": "R / 3 / 5 / 7 CV Outputs",
            "type": "jack-out",
            "desc": "Root, third, fifth and seventh chord-tone pitch outputs, each +/-10V. The 3/5/7 intervals are set by the Chord Quality parameter."
          },
          {
            "name": "Slew",
            "type": "knob",
            "desc": "Per-output portamento. Fully anticlockwise = stepped CV; clockwise increases glide time. Each Slew knob affects only its own output."
          }
        ],
        "howtos": [
          {
            "goal": "Reset both global Transpose offsets",
            "steps": [
              "Press and hold the Transpose Button (the fader's button).",
              "While holding, double-tap the C Keyboard Button.",
              "Both global Transpose offsets return to zero immediately; release the Transpose Button."
            ]
          },
          {
            "goal": "Tune all four oscillators (Unison Mode)",
            "steps": [
              "Press and hold the Diatonic Button, then also press and hold the Transpose Button (in that order), keeping both held.",
              "Double-tap the C Keyboard Button; the C Button lighting amber confirms Unison Mode is active. Release the buttons.",
              "All four outputs (R, 3, 5, 7) now emit the same voltage; tune each connected oscillator to that pitch.",
              "Press the amber-lit C Keyboard Button once to exit Unison Mode."
            ]
          },
          {
            "goal": "Re-centre the whole chord to a new key on the fly",
            "steps": [
              "Tap the Transpose Button repeatedly until it glows soft white (Global Quantised Offset Mode).",
              "Move the Transpose fader from its center dent to shift all four outputs in semitones, up to +/-2 octaves.",
              "Act promptly: this mode times out automatically to prevent accidental detuning."
            ]
          }
        ]
      },
      {
        "title": "Custom chords & calibration",
        "body": [
          "Four custom slots store arbitrary four-note clusters: enable manual mode, hold Transpose, double-tap Diatonic, then pick notes.",
          "Per-output Calibration Trimmers are factory-set; leave them alone unless an output is measurably out of tune."
        ],
        "controls": [
          {
            "name": "Calibration Trimmers",
            "type": "knob",
            "desc": "Four trimmers that independently scale each output's voltage range. Factory-calibrated; adjust at your own risk.",
            "tip": "Use Unison Mode for routine oscillator tuning; only touch the trimmers if an output is genuinely out of scale."
          },
          {
            "name": "Custom chord slots",
            "type": "mode",
            "desc": "Four user-definable chord slots selected via Chord Quality (with the Diatonic Button lit), each storing an arbitrary set of chord-tone voltages."
          }
        ],
        "howtos": [
          {
            "goal": "Program a custom chord",
            "steps": [
              "Press the Diatonic Button until it lights, enabling manual Chord Quality control.",
              "Turn the Chord Quality knob to select the custom chord slot you want to write to, and make sure nothing is patched into the Chord Quality CV Input.",
              "Press and hold the Transpose Button, then double-tap the Diatonic Button while keeping Transpose held.",
              "Press Keyboard Buttons to add the chord notes; each selected note pulses.",
              "To clear a note, multi-tap the lowest desired note until all notes layer in unison (a single pulsing button remains).",
              "Release the Transpose Button to save the custom chord into that slot."
            ]
          }
        ]
      }
    ],
    "trivia": [
      {
        "title": "Two modes in one",
        "fact": "The Harmonaig has a Quantiser Mode (harmonising whatever CV you feed it) and a Performance Mode that turns the button row into a playable harmonising keyboard, with the Gate Out switching from triggers to held gates."
      },
      {
        "title": "Modal harmony engine",
        "fact": "It offers the seven Ionian modes plus all seven modes of the harmonic minor scale, mapped to the keyboard buttons, so it keeps every chord diatonically correct as you change tonal centre."
      },
      {
        "title": "Four custom chord slots",
        "fact": "Beyond automatic harmonisation, you can program four user-defined chords (including note clusters) by holding the Transpose button and selecting notes on the keyboard."
      },
      {
        "title": "Calibrated per voice",
        "fact": "Each of the four outputs has its own factory-calibrated trimmer scaled with precision test equipment, and the module includes reverse-polarity protection."
      }
    ],
    "outcomes": [
      {
        "title": "Turn a melody into chords",
        "si": 0,
        "hi": 0
      },
      {
        "title": "Change the scale or mode",
        "si": 1,
        "hi": 0
      },
      {
        "title": "Play chords by hand",
        "si": 2,
        "hi": 0
      },
      {
        "title": "Let it pick chords automatically",
        "si": 3,
        "hi": 0
      },
      {
        "title": "Randomize chord inversions",
        "si": 4,
        "hi": 0
      },
      {
        "title": "Un-muddy a dense chord",
        "si": 5,
        "hi": 0
      },
      {
        "title": "Change key on the fly",
        "si": 6,
        "hi": 2
      },
      {
        "title": "Program your own chord",
        "si": 7,
        "hi": 0
      }
    ],
    "hotspots": {
      "transpose": {
        "x": 0.23,
        "y": 0.1,
        "rx": 0.17,
        "ry": 0.05
      },
      "slew": {
        "x": 0.68,
        "y": 0.1,
        "rx": 0.21,
        "ry": 0.05
      },
      "inversion": {
        "x": 0.2,
        "y": 0.3,
        "r": 0.11
      },
      "voicing": {
        "x": 0.2,
        "y": 0.5,
        "r": 0.11
      },
      "chord quality": {
        "x": 0.62,
        "y": 0.42,
        "r": 0.16
      },
      "diatonic": {
        "x": 0.55,
        "y": 0.575,
        "r": 0.055
      },
      "gate": {
        "x": 0.87,
        "y": 0.2,
        "r": 0.05
      },
      "keyboard": {
        "x": 0.5,
        "y": 0.77,
        "rx": 0.43,
        "ry": 0.075
      }
    }
  },
  {
    "id": "beads",
    "name": "Beads",
    "manufacturer": "Mutable Instruments",
    "hp": 14,
    "tagline": "Texture synthesizer: a realtime granular processor with built-in random modulation.",
    "image": "images/beads.jpg",
    "manualUrl": "https://pichenettes.github.io/mutable-instruments-documentation/modules/beads/manual/",
    "overview": "A granular texture synthesizer: records audio into a buffer and replays it as clouds of grains — also a tape delay, beat-slicer and hidden wavetable synth.",
    "specs": {
      "Width": "14 HP",
      "Depth": "25 mm",
      "Power": "+12V 100mA / -12V 10mA",
      "Recording time": "4s (48kHz stereo) up to 32s (lo-fi mono)",
      "I/O": "Stereo audio in/out with auto level detection"
    },
    "sections": [
      {
        "title": "Granular texture",
        "body": [
          "Beads records incoming audio into a short buffer, then scatters tiny grains of it back out, each with its own position, pitch, length and envelope.",
          "The Clouds successor also works as a tape delay or a self-contained wavetable synth."
        ],
        "controls": [],
        "howtos": [],
        "image": "images/beads/tape.png",
        "imageCaption": "The virtual tape-loop metaphor: replay heads reading the continuously recorded buffer."
      },
      {
        "title": "The buffer",
        "body": [
          "Beads continuously records the inputs into the buffer all grains read from; one jack is mono, both is stereo.",
          "Input gain auto-calibrates over five seconds; FREEZE halts recording so grains replay a static moment."
        ],
        "controls": [
          {
            "name": "IN L / IN R",
            "type": "jack-in",
            "desc": "Audio inputs feeding the recording buffer. Patch one for mono recording, both for stereo. Cable insertion/removal triggers automatic gain calibration.",
            "tip": "Leave both unpatched and wait ten seconds to drop into the hidden wavetable synth mode."
          },
          {
            "name": "Input level LED",
            "type": "switch",
            "desc": "Indicates recording level; blinks during the five-second automatic input-gain adjustment after a cable is inserted or removed.",
            "tip": "Play your loudest expected material during the blink window so auto-gain sets headroom correctly."
          },
          {
            "name": "FREEZE [B]",
            "type": "button",
            "desc": "Latching button that stops new audio from being recorded while grains keep playing from the static buffer.",
            "tip": "Hold frozen for more than 10 seconds to back up the buffer to memory; it is restored on next power-up."
          },
          {
            "name": "Quality [A]",
            "type": "mode",
            "desc": "Selects the recording medium and buffer length: Cold Digital (Clouds-like), Sunny Tape (clean 48 kHz), or Scorched Cassette (wow/flutter degradation). Also sets the feedback limiting style.",
            "tip": "Cold Digital is the cleanest/longest reference; Scorched Cassette adds pitch drift for organic, broken textures."
          }
        ],
        "howtos": [
          {
            "goal": "Freeze a sound and granulate it forever",
            "steps": [
              "Patch audio into IN L (add IN R for stereo); cable insertion auto-calibrates gain, so wait ~5 s for the input level LED to stop blinking.",
              "At the musical moment, press FREEZE [B] once so it latches and recording stops.",
              "Turn TIME [E], SIZE [G], PITCH [F] and DENSITY [D] to explore the captured buffer."
            ]
          },
          {
            "goal": "Save the current buffer across power cycles",
            "steps": [
              "Press FREEZE [B] so it latches (recording stops).",
              "Leave it frozen for more than 10 seconds; Beads then writes the buffer to non-volatile memory.",
              "Power down; on the next boot the buffer is automatically restored."
            ]
          },
          {
            "goal": "Force a fresh input-gain calibration",
            "steps": [
              "Feed representative-level audio into IN L, then unplug and re-plug that cable.",
              "Watch the input level LED blink for ~5 seconds while Beads sets gain anywhere from +0 to +32 dB.",
              "Do not touch any levels until the LED stops blinking."
            ]
          }
        ],
        "image": "images/beads/quality_table.png",
        "imageCaption": "Quality medium / buffer-length table."
      },
      {
        "title": "Grain parameters",
        "body": [
          "TIME picks where on the tape a grain reads; SIZE sets duration and direction; PITCH transposes; SHAPE shapes the envelope.",
          "Values are latched at each grain's birth, so turning a knob shapes future grains and clouds evolve smoothly."
        ],
        "controls": [
          {
            "name": "TIME [E]",
            "type": "knob",
            "desc": "Chooses where in the buffer a new grain begins: fully CCW = most recent audio, fully CW = oldest audio in the buffer.",
            "tip": "In delay mode this instead selects the delay time as a multiple of the base delay time."
          },
          {
            "name": "SIZE [G]",
            "type": "knob",
            "desc": "Sets grain length and direction: ~30 ms at 11 o'clock, up to 4 s forward (CW) or 4 s reversed (CCW). Fully CW (∞) makes endless grains that behave as delay taps.",
            "tip": "Turn to ∞ to convert Beads into a delay/beat-slicer where a single grain reads the tape forever."
          },
          {
            "name": "PITCH [F]",
            "type": "knob",
            "desc": "Transposes each grain from -24 to +24 semitones, with virtual notches at musical intervals for easy octaves and fifths.",
            "tip": "In delay mode, PITCH at 12 o'clock bypasses the pitch-shifter; off-center applies a rotary-head pitch-shift on repeats."
          },
          {
            "name": "SHAPE [H]",
            "type": "knob",
            "desc": "Shapes the grain amplitude envelope: fully CCW gives clicky rectangular envelopes, fully CW gives slow-attack, reversed-sounding envelopes.",
            "tip": "In delay mode SHAPE applies a tempo-synced envelope to repeats; keep it fully CCW for clean delay behavior."
          }
        ],
        "howtos": [
          {
            "goal": "Get a smooth pad from any source",
            "steps": [
              "Patch audio into IN L and let the input level LED stop blinking (auto-gain).",
              "Turn SHAPE [H] fully CW for slow-attack envelopes.",
              "Turn SIZE [G] well clockwise for long forward grains.",
              "Hold SEED [C] ~4 s until it stays lit with pulsing brightness (free-running grains), turn DENSITY [D] CW of center to raise the rate, and turn REVERB [L] up for a continuous wash."
            ]
          },
          {
            "goal": "Make percussive granular stutters",
            "steps": [
              "Patch audio into IN L and let auto-gain settle.",
              "Turn SHAPE [H] fully CCW for clicky rectangular envelopes.",
              "Turn SIZE [G] to about 11 o'clock for short ~30 ms grains.",
              "Patch a clock or gate into the SEED input (4) so grains fire rhythmically (short-press SEED [C] first to stay in gated mode)."
            ]
          }
        ]
      },
      {
        "title": "Attenurandomizers",
        "body": [
          "An inner ring on each grain knob blends between internal randomization and external CV.",
          "With no cable patched it spreads each grain's values; patch CV for deliberate, scaled movement."
        ],
        "controls": [
          {
            "name": "Attenurandomizers [I]",
            "type": "knob",
            "desc": "Inner rings around TIME/SIZE/PITCH/SHAPE. With CV patched: CW = more external CV depth, CCW = more CV-controlled randomization. With nothing patched: CCW = peaky internal randomization, CW = uniform internal randomization.",
            "tip": "Open them with no CV patched for instant evolving textures; the distribution side (peaky vs uniform) changes the feel of the spread."
          },
          {
            "name": "CV inputs (6) — TIME/SIZE/PITCH/SHAPE",
            "type": "jack-in",
            "desc": "Per-parameter CV inputs read by the matching attenurandomizer. Presence of a cable switches that attenurandomizer from internal randomization into CV attenuation/CV-randomization blend.",
            "tip": "In wavetable synth mode the PITCH CV input always acts as a 1V/oct input on the root note regardless of attenurandomizer position."
          }
        ],
        "howtos": [
          {
            "goal": "Create motion with zero patching",
            "steps": [
              "Patch audio into IN L and let the input level LED settle.",
              "Leave all six CV inputs unpatched.",
              "Turn the TIME and PITCH attenurandomizers (inner rings [I] around TIME [E] and PITCH [F]) CCW for peaky/tight spread or CW for uniform/wide spread.",
              "Hold SEED [C] ~4 s to latch free-running grains, then turn DENSITY [D] CW of center so the per-grain randomization becomes audible."
            ]
          },
          {
            "goal": "Scale randomization with an external CV",
            "steps": [
              "Patch audio into IN L and let auto-gain settle.",
              "Patch an LFO or envelope into one parameter's CV input (e.g. the TIME CV jack).",
              "Turn that parameter's attenurandomizer inner ring [I] CCW so the CV controls the amount of randomization.",
              "Modulate the CV source to open and close the chaos dynamically."
            ]
          }
        ],
        "image": "images/beads/ar_cv.png",
        "imageCaption": "Attenurandomizer behavior with CV patched."
      },
      {
        "title": "DENSITY and SEED",
        "body": [
          "SEED decides whether grains stream freely (latched), follow a clock, or fire only on a gate.",
          "DENSITY then sets the rate, random-versus-constant character, or clock division and probability."
        ],
        "controls": [
          {
            "name": "SEED [C]",
            "type": "button",
            "desc": "Manually requests grains and sets the seeding mode. Hold 4 s (or press FREEZE while holding SEED) to latch free-running generation; short press to return to gated/triggered mode. Stays lit with slowly modulated brightness when latched.",
            "tip": "Tap rhythmically (gated) to seed grains by hand, or latch it and let DENSITY run the show."
          },
          {
            "name": "SEED input (4)",
            "type": "jack-in",
            "desc": "Accepts a gate, trigger, clock or sequence. In gated mode a high gate generates grains; in latched mode a clock here turns DENSITY into a divider/probability control.",
            "tip": "Patch a steady clock here while latched for tightly rhythmic, quantized grain clouds."
          },
          {
            "name": "DENSITY [D]",
            "type": "knob",
            "desc": "Sets grain rate/behavior. Latched free-running: 12 o'clock = no grains, CW = randomly modulated rate, CCW = constant rate. Latched + clock: CW = probability 0–100%, CCW = division 1/16→1. Gated: sets repetition rate of grains.",
            "tip": "Center DENSITY to silence free-running grains without un-latching."
          },
          {
            "name": "DENSITY CV input (5)",
            "type": "jack-in",
            "desc": "Modulates grain rate; at audio rates applies exponential 1V/oct FM on the repetition rate in gated mode, enabling pitched grain trains.",
            "tip": "Drive it from a keyboard/pitch CV to play tuned bursts of grains."
          }
        ],
        "howtos": [
          {
            "goal": "Enter latched (free-running) grain mode",
            "steps": [
              "Patch audio into IN L and let the input level LED stop blinking.",
              "Hold SEED [C] for about four seconds until it stays lit with gently pulsing brightness.",
              "Turn DENSITY [D] clockwise of center for a randomly modulated rate, or CCW for a constant rate.",
              "Center DENSITY [D] at 12 o'clock to pause generation without un-latching."
            ]
          },
          {
            "goal": "Sync grains to a clock",
            "steps": [
              "Patch audio into IN L and let auto-gain settle.",
              "Hold SEED [C] ~4 s until it stays lit with pulsing brightness (latched mode).",
              "Patch a clock or sequence into the SEED input (4).",
              "Turn DENSITY [D] CW for higher trigger probability, or CCW for larger clock divisions (down to 1/16)."
            ]
          },
          {
            "goal": "Play tuned grain bursts from a keyboard",
            "steps": [
              "Patch audio into IN L and let auto-gain settle.",
              "Short-press SEED [C] so it is unlit/gated mode (not latched).",
              "Patch a gate into the SEED input (4) so grains fire while the gate is high.",
              "Send 1V/oct pitch CV into the DENSITY CV input (5) and turn DENSITY [D] up so the rate reaches audio range."
            ]
          }
        ]
      },
      {
        "title": "Output stage",
        "body": [
          "FEEDBACK recirculates the output, DRY/WET balances it against the input, and REVERB adds space.",
          "One assignable CV input drives FEEDBACK, DRY/WET or REVERB; an unpatched R sums both channels to L."
        ],
        "controls": [
          {
            "name": "FEEDBACK [J]",
            "type": "knob",
            "desc": "Amount of output fed back into the input and reprocessed. Limiting/saturation character depends on the selected quality medium.",
            "tip": "Holding the quality button [A] while turning FEEDBACK manually overrides the automatic input gain."
          },
          {
            "name": "DRY/WET [K]",
            "type": "knob",
            "desc": "Balances the dry input signal against the processed (granular) signal.",
            "tip": "In wavetable mode it instead balances the continuous oscillator against the granularized signal."
          },
          {
            "name": "REVERB [L]",
            "type": "knob",
            "desc": "Sets the amount of the onboard reverb, from intimate room to lush artificial space.",
            "tip": "Pair high reverb with slow-attack SHAPE for evolving ambient beds."
          },
          {
            "name": "CV-assign button [M]",
            "type": "button",
            "desc": "Press to choose which of FEEDBACK/DRY/WET/REVERB the assignable CV input (7) controls; hold and turn each knob to set per-destination modulation depth shown by the LED under each knob.",
            "tip": "Hold [M] and press SEED [C] to enable a grain-trigger output on the R jack (hidden feature)."
          },
          {
            "name": "CV input (7)",
            "type": "jack-in",
            "desc": "Assignable modulation input routed to one or several output knobs via the assign button [M].",
            "tip": "Set small depths on all three destinations for subtle, coordinated output movement from one LFO."
          },
          {
            "name": "OUT L / OUT R (8)",
            "type": "jack-out",
            "desc": "Stereo outputs. If R is left unpatched, L and R are summed to the L output so a single cable carries the full signal.",
            "tip": "Patch R to also unlock its use as a grain-trigger output when that hidden mode is enabled."
          }
        ],
        "howtos": [
          {
            "goal": "Modulate several output knobs from one CV",
            "steps": [
              "Patch audio into IN L and let auto-gain settle.",
              "Patch an LFO or envelope into the assignable CV input (7).",
              "Hold the CV-assign button [M] and turn FEEDBACK [J], DRY/WET [K] and/or REVERB [L] to set each one's modulation depth.",
              "Watch the LED under each knob to gauge how much CV each is receiving."
            ]
          },
          {
            "goal": "Build a self-oscillating drone",
            "steps": [
              "Patch audio into IN L and let auto-gain settle.",
              "Turn FEEDBACK [J] toward maximum.",
              "Hold the quality button [A] and tap it to cycle the medium (Cold Digital, Sunny Tape, or Scorched Cassette) for the saturation flavor you want.",
              "Hold SEED [C] ~4 s to latch free-running grains, turn SIZE [G] well CW for long grains, and set PITCH [F] to shape the resonance."
            ]
          }
        ],
        "image": "images/beads/signal_flow.png",
        "imageCaption": "Beads signal flow through the grain engine, feedback and reverb."
      },
      {
        "title": "Delay and beat-slicer",
        "body": [
          "Turn SIZE fully clockwise to infinity and one endless grain turns Beads into a delay or beat-slicer.",
          "SEED and DENSITY set delay time or subdivisions; FREEZE switches between delaying and looping slices."
        ],
        "controls": [
          {
            "name": "SIZE [G] at ∞",
            "type": "knob",
            "desc": "Fully clockwise, SIZE collapses the grain cloud into a single endless grain, turning Beads into a delay or beat-slicer.",
            "tip": "This is the gateway: nothing else acts as 'delay mode' until SIZE is at ∞."
          },
          {
            "name": "DENSITY [D] (delay)",
            "type": "knob",
            "desc": "With SEED unpatched+latched, sets delay time (12 o'clock = full buffer, further = shorter down to audio-rate comb/flanger). With a clock, selects subdivisions (binary CCW, varied ratios CW).",
            "tip": "Push toward audio rates for metallic comb-filter and flanger tones."
          },
          {
            "name": "TIME [E] (delay)",
            "type": "knob",
            "desc": "FREEZE off: selects the delay time as a multiple of the base delay time. FREEZE on: selects which buffer slice is looped (beat-slicer).",
            "tip": "Engage FREEZE to lock a loop and scrub through slices with TIME."
          }
        ],
        "howtos": [
          {
            "goal": "Use Beads as a clock-synced delay",
            "steps": [
              "Patch audio into IN L and let the input level LED settle.",
              "Turn SIZE [G] fully CW to the infinity (single endless grain) setting.",
              "Make sure FREEZE [B] is unlit/disengaged (press it if it is lit).",
              "Send a clock into the SEED input (4), set subdivisions with DENSITY [D], and pick the delay-time multiple with TIME [E]."
            ]
          },
          {
            "goal": "Turn it into a beat-slicer",
            "steps": [
              "Patch rhythmic audio into IN L and let auto-gain settle.",
              "Turn SIZE [G] fully CW to infinity (single endless grain).",
              "Press FREEZE [B] so it latches and locks the buffer.",
              "Turn TIME [E] to choose which buffer slice loops and SHAPE [H] for a tempo-synced envelope on repeats."
            ]
          },
          {
            "goal": "Get flanger/comb effects",
            "steps": [
              "Patch audio into IN L and let auto-gain settle.",
              "Turn SIZE [G] fully CW to infinity, leave the SEED input (4) unpatched, and hold SEED [C] ~4 s to latch it.",
              "Turn DENSITY [D] well past 12 o'clock toward audio-rate short delays.",
              "Turn FEEDBACK [J] up to sharpen the comb resonance."
            ]
          }
        ],
        "image": "images/beads/delay_density.png",
        "imageCaption": "DENSITY as delay-time control in delay mode."
      },
      {
        "title": "Hidden modes",
        "body": [
          "Hold quality plus FEEDBACK to set input gain by hand; hold CV-assign plus SEED for a grain trigger on R.",
          "With no inputs patched Beads becomes a Plaits-based wavetable synth; holding FREEZE 10s saves the buffer."
        ],
        "controls": [
          {
            "name": "Manual gain override",
            "type": "mode",
            "desc": "Hold quality button [A] while turning FEEDBACK [J] to set input gain manually, overriding the automatic +0 to +32 dB calibration.",
            "tip": "Use it when auto-gain misreads quiet or highly transient material."
          },
          {
            "name": "Grain-trigger output (R jack)",
            "type": "mode",
            "desc": "Hold CV-assign [M] and press SEED [C] to toggle a grain-trigger signal on the R output; a cable must be patched into R for it to function.",
            "tip": "Clock other modules in time with your grain rhythm; note this sacrifices stereo on the R output."
          },
          {
            "name": "Granular wavetable synth",
            "type": "mode",
            "desc": "With both audio inputs unpatched for ten seconds, Beads granulates internal Plaits wavetable banks: FEEDBACK picks 1 of 8 banks, DRY/WET blends oscillator vs grains, FREEZE halts grains, PITCH CV is 1V/oct on the root.",
            "tip": "Play it as a standalone granular drone voice — patch pitch CV to the PITCH input to sequence notes."
          },
          {
            "name": "Buffer backup",
            "type": "mode",
            "desc": "Holding FREEZE [B] for more than 10 seconds saves the buffer to non-volatile memory; it is restored at the next power-up.",
            "tip": "Capture a perfect frozen texture and keep it through power cycles."
          }
        ],
        "howtos": [
          {
            "goal": "Override automatic input gain",
            "steps": [
              "Patch audio into IN L so there is signal to set.",
              "Press and hold the quality button [A].",
              "While still holding [A], turn the FEEDBACK knob [J] to raise or lower input gain manually (overriding the +0 to +32 dB auto-calibration).",
              "Release [A]; the manual setting now replaces auto-calibration."
            ]
          },
          {
            "goal": "Output grain triggers on the R jack",
            "steps": [
              "Patch a cable into the OUT R jack (8) (required for the trigger output to work).",
              "Hold the CV-assign button [M] and press SEED [C] to toggle the grain-trigger signal onto OUT R.",
              "Use the R jack's triggers to clock another module."
            ]
          },
          {
            "goal": "Play the hidden wavetable synth",
            "steps": [
              "Unplug both IN L and IN R and wait about ten seconds for Beads to enter Plaits wavetable mode.",
              "Turn FEEDBACK [J] to choose among the 8 wavetable banks and set DRY/WET [K] for the oscillator-vs-grain balance.",
              "Patch 1V/oct pitch CV into the PITCH CV input to play melodies; press FREEZE [B] to halt the grains."
            ]
          }
        ],
        "image": "images/beads/wavetable_quality_table.png",
        "imageCaption": "Quality table for the hidden granular wavetable synth."
      }
    ],
    "trivia": [
      {
        "title": "The anti-Clouds",
        "fact": "Beads was Émilie Gillet's response to Clouds becoming a cult favorite bloated with secret menus; she rebuilt it 'free of modes and bloat', replacing hidden parameter pages with always-visible attenurandomizer knobs."
      },
      {
        "title": "It's secretly a synth",
        "fact": "If you leave the audio inputs unpatched for about ten seconds, Beads stops being a processor and turns into a wavetable oscillator using the same wavetable banks as Mutable's Plaits."
      },
      {
        "title": "Capacitive grain trigger",
        "fact": "The SEED button is touch-sensitive, letting you sprinkle grains by tapping it like a performable instrument rather than just pressing a switch."
      },
      {
        "title": "One of the last MI modules",
        "fact": "Beads was among the final modules Mutable Instruments released before Émilie Gillet wound down the company in 2022, after which the open-source hardware was widely cloned."
      }
    ],
    "outcomes": [
      {
        "title": "Freeze a moment forever",
        "si": 1,
        "hi": 0
      },
      {
        "title": "Ambient wash from anything",
        "si": 2,
        "hi": 0
      },
      {
        "title": "Glitchy granular stutters",
        "si": 2,
        "hi": 1
      },
      {
        "title": "Instant motion, zero patching",
        "si": 3,
        "hi": 0
      },
      {
        "title": "Play grains like a keyboard",
        "si": 4,
        "hi": 2
      },
      {
        "title": "Self-oscillating drone machine",
        "si": 5,
        "hi": 1
      },
      {
        "title": "Clock-synced delay",
        "si": 6,
        "hi": 0
      },
      {
        "title": "Slice beats on the fly",
        "si": 6,
        "hi": 1
      },
      {
        "title": "Unlock the hidden wavetable synth",
        "si": 7,
        "hi": 2,
        "hidden": true
      }
    ],
    "hotspots": {
      "freeze": {
        "x": 0.12,
        "y": 0.115,
        "r": 0.09
      },
      "seed": {
        "x": 0.88,
        "y": 0.115,
        "r": 0.09
      },
      "density": {
        "x": 0.5,
        "y": 0.2,
        "r": 0.15
      },
      "time": {
        "x": 0.13,
        "y": 0.33,
        "r": 0.1
      },
      "pitch": {
        "x": 0.87,
        "y": 0.33,
        "r": 0.1
      },
      "size": {
        "x": 0.35,
        "y": 0.47,
        "r": 0.11
      },
      "shape": {
        "x": 0.66,
        "y": 0.47,
        "r": 0.11
      }
    }
  },
  {
    "id": "rings",
    "name": "Rings",
    "manufacturer": "Mutable Instruments",
    "hp": 14,
    "tagline": "Polyphonic modal/string resonator for physical-modeling synthesis.",
    "image": "images/rings.jpg",
    "manualUrl": "https://pichenettes.github.io/mutable-instruments-documentation/modules/rings/manual/",
    "overview": "A physical-modelling resonator: feed it triggers or audio and it rings like strings, bells or plates — three models, up to 4-voice polyphony, stereo ODD/EVEN outputs.",
    "specs": {
      "Width": "14 HP",
      "Depth": "25 mm",
      "Power": "+12V 120mA / -12V 5mA",
      "Audio I/O": "16-bit, 48 kHz",
      "Processor": "STM32F405 @ 168 MHz",
      "Production": "Dec 2015 – Apr 2022"
    },
    "sections": [
      {
        "title": "The resonator concept",
        "body": [
          "Rings doesn't generate tone; it resonates an excitation you feed it into a pitched, full-bodied sound.",
          "Excite it via IN, a STRUM trigger, or let it auto-strike on V/OCT note changes."
        ],
        "controls": [
          {
            "name": "IN",
            "type": "jack-in",
            "desc": "Audio excitation input. Whatever you patch here is the raw energy that the resonator colours and sustains. Normalled to an internal pulse/burst generator when nothing is connected.",
            "tip": "Try a contact mic, a noise burst, or even another module's audio for unexpected resonant timbres."
          },
          {
            "name": "STRUM",
            "type": "jack-in",
            "desc": "Trigger input that re-excites the resonator (fires the internal exciter and re-allocates a voice). Normalled to a note-change detector on V/OCT and a transient detector on IN.",
            "tip": "Patch a gate/trigger here to decouple when a note is struck from when its pitch changes."
          }
        ],
        "howtos": [
          {
            "goal": "Get a sound out of Rings with the fewest cables",
            "steps": [
              "Patch a melodic CV sequencer into V/OCT.",
              "Patch the ODD output (top output jack) to your mixer.",
              "Leave IN and STRUM unpatched; Rings detects each new V/OCT note and fires its internal exciter automatically, so notes sound without any trigger cable."
            ]
          },
          {
            "goal": "Use Rings as a resonant audio effect",
            "steps": [
              "Patch an external audio source (drums, voice, or guitar via contact mic) into IN; patching IN replaces the internal exciter so your audio becomes the excitation.",
              "Patch a pitch CV into V/OCT to set the resonant pitch.",
              "Sweep POSITION, STRUCTURE, and DAMPING (the labelled knobs) to tune the resonance to the source material."
            ]
          }
        ]
      },
      {
        "title": "Three models",
        "body": [
          "Pick Modal (bells, bars), Sympathetic strings (chorused overtones), or Modulated string (Karplus-Strong plucks to metallic).",
          "The polyphony button sets 1, 2, or 4 overlapping notes from the single V/OCT input."
        ],
        "controls": [
          {
            "name": "Resonator model button",
            "type": "button",
            "desc": "Cycles through the three resonator algorithms. LED colour shows the model: green = Modal, orange = Sympathetic strings, red = Modulated/inharmonic string.",
            "tip": "Holding (long-press) this button instead of tapping it reveals the hidden alternate variants — see the Hidden Models section."
          },
          {
            "name": "Polyphony button",
            "type": "button",
            "desc": "Selects mono / duo (2) / quad (4) note overlap. LED shows the current setting; this governs how many sequential notes can ring out together, not the number of CV inputs.",
            "tip": "Use monophonic for the fullest, brightest single voice; use quad for arpeggios and chords whose tails should bloom together."
          }
        ],
        "howtos": [
          {
            "goal": "Switch between resonator models",
            "steps": [
              "Find the resonator-model button (the upper of the two buttons; its LED shows the current model colour).",
              "Short-press (tap) it to step to the next model.",
              "Watch the LED colour: green = Modal, orange = Sympathetic strings, red = Modulated string.",
              "Stop tapping when the desired colour is shown."
            ]
          },
          {
            "goal": "Let an arpeggio's notes overlap and ring",
            "steps": [
              "Tap the polyphony button (the lower of the two buttons) until its LED shows the quad setting (4 notes).",
              "Feed a fast arpeggio into V/OCT.",
              "Turn the DAMPING knob up (toward maximum) so each note's tail sustains and the notes pile up into a chord."
            ]
          }
        ]
      },
      {
        "title": "Tone controls",
        "body": [
          "STRUCTURE morphs the partial spacing, BRIGHTNESS adds highs, DAMPING sets decay from 100ms to 10s, POSITION moves the strike point.",
          "Each has a CV input with attenuverter for animating the timbre."
        ],
        "controls": [
          {
            "name": "STRUCTURE",
            "type": "knob",
            "desc": "Model-dependent harmonic control: partial frequency ratios (Modal), the set of string ratios with octave/fifth notches (Sympathetic), or partial modulation/detuning amount (Modulated string).",
            "tip": "In any model, hunt for the 'sweet spot' where the spectrum snaps to a pure harmonic series for the most consonant, pitched tone."
          },
          {
            "name": "BRIGHTNESS",
            "type": "knob",
            "desc": "Raises the level of higher harmonics via a low-pass filter on the exciter (closed ~8 o'clock, open at 12 o'clock) plus the damping filter. Controls darkness vs. presence.",
            "tip": "Modulate with a decaying envelope for natural plucked attacks that mellow as they ring."
          },
          {
            "name": "DAMPING",
            "type": "knob",
            "desc": "Sets the decay/sustain time of the resonance, from under 100 ms (percussive) to roughly 10 seconds (drone).",
            "tip": ""
          },
          {
            "name": "POSITION",
            "type": "knob",
            "desc": "Chooses the excitation point on the virtual string/surface. The exact centre cancels even harmonics by symmetry, thinning the tone.",
            "tip": "Slowly modulate POSITION with an LFO for an evolving comb-filter / phaser-like motion."
          },
          {
            "name": "STRUCTURE / BRIGHTNESS / DAMPING / POSITION CV inputs",
            "type": "jack-in",
            "desc": "Each tone control has a CV input paired with an attenuverter knob, so modulation can be scaled and inverted before it is applied.",
            "tip": "Centre an attenuverter to mute its CV; turn left to invert the modulation, right for normal polarity."
          }
        ],
        "howtos": [
          {
            "goal": "Dial in a tight percussive pluck",
            "steps": [
              "Turn the DAMPING knob low (toward 8 o'clock) for a short decay.",
              "Set the BRIGHTNESS knob around 12 o'clock for bite.",
              "Send short triggers into the STRUM jack to strike it; adjust the POSITION knob to taste."
            ]
          },
          {
            "goal": "Create an evolving drone pad",
            "steps": [
              "Turn the DAMPING knob near maximum for roughly 10 s of sustain.",
              "Hold a steady note on V/OCT (or set the FREQUENCY knob with nothing patched to V/OCT).",
              "Patch a slow LFO into the POSITION or STRUCTURE CV input and set that input's attenuverter knob near noon to keep the spectrum slowly moving."
            ]
          }
        ]
      },
      {
        "title": "Pitch and triggering",
        "body": [
          "FREQUENCY tunes in semitones over five octaves; V/OCT tracks 1V/oct for melodies.",
          "With STRUM empty, each new V/OCT note re-strikes the resonator; patch STRUM to decouple pitch from triggering."
        ],
        "controls": [
          {
            "name": "FREQUENCY",
            "type": "knob",
            "desc": "Coarse pitch control quantised to semitone increments, spanning five octaves. Sets the base/transpose pitch of the resonator.",
            "tip": ""
          },
          {
            "name": "V/OCT",
            "type": "jack-in",
            "desc": "1V/octave pitch CV input for accurate melodic playing. Also doubles as a note-change detector that auto-triggers the exciter when STRUM is unpatched.",
            "tip": ""
          },
          {
            "name": "FREQUENCY CV input + attenuverter",
            "type": "jack-in",
            "desc": "Modulation input for pitch; with correct calibration its attenuverter acts as a fine-tune / linear-FM amount control.",
            "tip": "If this attenuverter no longer fine-tunes, recalibrate the module — calibration step 3 was likely skipped."
          }
        ],
        "howtos": [
          {
            "goal": "Recalibrate the V/OCT tracking",
            "steps": [
              "Disconnect all CV inputs, then patch a calibrated keyboard/CV source to V/OCT and run a second cable from the same source to the FREQUENCY CV input.",
              "Hold both buttons (resonator-model and polyphony) together for about 2 seconds until the first LED blinks orange, then release.",
              "Send C2 (1V) from your source, then press the polyphony button (the second LED turns orange).",
              "Send C4 (3V), then press the polyphony button again to store the calibration and finish."
            ]
          }
        ]
      },
      {
        "title": "STRUM and excitation",
        "body": [
          "Empty IN uses the internal pulse/noise exciter; patch audio in to make Rings a resonant processor.",
          "STRUM fires strikes manually, or stays empty to auto-detect V/OCT notes and IN transients."
        ],
        "controls": [
          {
            "name": "IN",
            "type": "jack-in",
            "desc": "Audio excitation input; replaces the internal exciter when patched. Its transient content can also auto-trigger re-strikes when STRUM is empty.",
            "tip": "Quiet or DC-like inputs may need recalibration of the normalization/transient detector if you hear continuous noise."
          },
          {
            "name": "STRUM",
            "type": "jack-in",
            "desc": "Trigger/gate input that fires the exciter and allocates a voice. When unpatched, Rings auto-detects strikes from V/OCT note changes or IN transients.",
            "tip": "Patch STRUM to play the same pitch repeatedly or to slide between notes without re-plucking."
          }
        ],
        "howtos": [
          {
            "goal": "Excite Rings with an external drum loop",
            "steps": [
              "Patch the drum audio into IN (this replaces the internal exciter with your audio).",
              "Leave STRUM unpatched so Rings auto-detects each drum transient and re-strikes on it.",
              "Set a pitch with the FREQUENCY knob or a CV into V/OCT, then adjust the DAMPING and STRUCTURE knobs to ring the loop."
            ]
          },
          {
            "goal": "Fix continuous background noise from the input detector",
            "steps": [
              "Hold both buttons (resonator-model and polyphony) together until the first LED blinks orange, then release.",
              "Repeat the hold-then-release a few times, cycling the LED state until both LEDs blink red.",
              "Press the resonator-model button (the upper button) twice to store the recalibrated input normalization threshold."
            ]
          }
        ]
      },
      {
        "title": "ODD and EVEN outputs",
        "body": [
          "ODD and EVEN carry complementary parts for stereo width, splitting voices across the field in polyphony.",
          "Patch one jack and both sum to it, so mono patches lose nothing."
        ],
        "controls": [
          {
            "name": "ODD",
            "type": "jack-out",
            "desc": "First resonator output. Carries one of the two complementary signal components (mono) or the odd-numbered voices (poly). If it is the only output patched, it carries the full summed signal.",
            "tip": ""
          },
          {
            "name": "EVEN",
            "type": "jack-out",
            "desc": "Second resonator output. Carries the complementary component (mono) or the even-numbered voices (poly).",
            "tip": "Patch both ODD and EVEN to a stereo input for an instant wide image; use just one for a full mono mix."
          }
        ],
        "howtos": [
          {
            "goal": "Get an instant stereo voice",
            "steps": [
              "Patch the ODD output to your mixer's left channel and the EVEN output to the right channel.",
              "Play notes; the two complementary signal components spread across the stereo field.",
              "For polyphonic stereo, tap the polyphony button (lower button) to the duo or quad setting so odd-numbered and even-numbered voices separate across the two outputs."
            ]
          }
        ]
      },
      {
        "title": "Hidden variants",
        "body": [
          "Long-press the model button to reveal a hidden variant of each model; the LED flashes to confirm.",
          "These add a 2-op FM voice, Western chords, and Karplusverb."
        ],
        "controls": [
          {
            "name": "Resonator model button (hold)",
            "type": "mode",
            "desc": "Long-pressing the model button in any base model switches to that model's hidden alternate variant; the LED flashes to confirm. Long-press again to return.",
            "tip": "The variant you reach depends on which base colour was active when you held the button: green to FM, orange to Western chords, red to Karplusverb."
          }
        ],
        "howtos": [
          {
            "goal": "Enter the 2-op FM voice",
            "steps": [
              "Tap the resonator-model button (upper button) until its LED is green (Modal base model).",
              "Hold (long-press) that same button until the LED flashes, confirming the hidden FM variant of Modal.",
              "Set the STRUCTURE knob for the FM ratio, the BRIGHTNESS knob for the FM index, and patch audio into IN to drive the envelope follower."
            ]
          },
          {
            "goal": "Strum full chords (Western chords mode)",
            "steps": [
              "Tap the resonator-model button (upper button) until its LED is orange (Sympathetic strings base model).",
              "Hold (long-press) that same button until the LED flashes, confirming the hidden Western-chords variant.",
              "Turn the STRUCTURE knob to choose the chord type, then play single notes on V/OCT to voice full chords."
            ]
          },
          {
            "goal": "Use Karplusverb",
            "steps": [
              "Tap the resonator-model button (upper button) until its LED is red (Modulated string base model).",
              "Hold (long-press) that same button until the LED flashes, confirming the hidden Karplusverb variant.",
              "Play plucks; the reverb tail follows the string's own absorption and decay, set by the DAMPING and BRIGHTNESS knobs."
            ]
          }
        ]
      },
      {
        "title": "Disastrous Peace egg",
        "body": [
          "A hidden paraphonic organ/string synth based on the Roland RS-09, remapping every control.",
          "Match the knob positions from the Secrets page, then long-press the model button to toggle it on or off."
        ],
        "controls": [
          {
            "name": "Disastrous Peace entry/exit",
            "type": "mode",
            "desc": "Set every knob to match the positions in the Secrets-page easter-egg image, then hold the model button for several seconds to enter (or, with the same gesture, exit) the RS-09-style Organ/String synth.",
            "tip": "Note your current knob positions first if you want to restore your resonator patch after leaving the egg."
          },
          {
            "name": "Polyphony button (in egg)",
            "type": "button",
            "desc": "Sets the chord size / note-overlap capacity (3, 2, or 1 notes) in Disastrous Peace.",
            "tip": ""
          },
          {
            "name": "Model button (in egg)",
            "type": "mode",
            "desc": "Selects the onboard effect: green = formant filter, yellow = chorus, red = reverb.",
            "tip": ""
          },
          {
            "name": "BRIGHTNESS (in egg)",
            "type": "knob",
            "desc": "Registration / waveform mixture — blends the organ-and-string voice's drawbar registers and waveforms.",
            "tip": ""
          },
          {
            "name": "DAMPING (in egg)",
            "type": "knob",
            "desc": "Sets the attack and decay/release time of the amplitude envelope, from percussive organ stabs to slow string pads.",
            "tip": ""
          },
          {
            "name": "POSITION (in egg)",
            "type": "knob",
            "desc": "Controls the amount of the selected effect (formant / chorus / reverb).",
            "tip": ""
          }
        ],
        "howtos": [
          {
            "goal": "Enter Disastrous Peace",
            "steps": [
              "Set FREQUENCY, STRUCTURE, BRIGHTNESS, DAMPING and POSITION to the entry positions shown on the Secrets-page image.",
              "Hold (long-press) the resonator-model button (upper button) for several seconds until the mode changes into the RS-09-style organ/string synth."
            ]
          },
          {
            "goal": "Play a string-ensemble pad in the egg",
            "steps": [
              "While in Disastrous Peace, tap the resonator-model button until its LED is yellow to select the chorus effect.",
              "Turn the DAMPING knob up for a slow attack and long release (string-pad envelope).",
              "Turn the STRUCTURE knob to a lush chord type and tap the polyphony button (lower button) to set the chord size (3, 2, or 1 notes).",
              "Play root notes on V/OCT and trigger the envelope from STRUM; raise the POSITION knob for more chorus depth."
            ]
          },
          {
            "goal": "Exit back to the resonator",
            "steps": [
              "Set the five knobs (FREQUENCY, STRUCTURE, BRIGHTNESS, DAMPING, POSITION) back to the same easter-egg entry positions you used to enter.",
              "Hold (long-press) the resonator-model button for several seconds to leave Disastrous Peace and return to the normal resonator.",
              "Restore your original knob positions to resume your resonator patch."
            ]
          }
        ],
        "image": "images/rings/easter_egg.jpg",
        "imageCaption": "Required knob positions to enter the Disastrous Peace easter egg"
      }
    ],
    "trivia": [
      {
        "title": "Elements distilled",
        "fact": "Rings is essentially the resonator half of Mutable's Elements, stripped of the exciter and reverb. Dropping those freed roughly 40% of CPU, which Mutable spent on polyphony and extra resonator models."
      },
      {
        "title": "Hidden organ synth",
        "fact": "Holding the model button reveals 'Disastrous Peace', a secret polyphonic organ/string machine loosely modeled on the Roland RS-09, turning the resonator into a full chord synth voice."
      },
      {
        "title": "Three secret models",
        "fact": "Beyond its three main resonators, holding the model button on each unlocks a hidden variant: a 2-operator FM voice, Western-tuned chord sympathetic strings, and 'Karplusverb'."
      },
      {
        "title": "Open source and widely cloned",
        "fact": "Like all Mutable Instruments designs, Rings is open hardware/firmware, spawning many clones and alternate firmwares such as 'Ominous Harmony'."
      }
    ],
    "outcomes": [
      {
        "title": "Pluck a string from one cable",
        "si": 0,
        "hi": 0
      },
      {
        "title": "Turn any sound resonant",
        "si": 0,
        "hi": 1
      },
      {
        "title": "Swap strings for bells",
        "si": 1,
        "hi": 0
      },
      {
        "title": "Let arpeggio notes ring together",
        "si": 1,
        "hi": 1
      },
      {
        "title": "Get a tight percussive pluck",
        "si": 2,
        "hi": 0
      },
      {
        "title": "Build an evolving drone pad",
        "si": 2,
        "hi": 1
      },
      {
        "title": "Ring out a drum loop",
        "si": 4,
        "hi": 0
      },
      {
        "title": "Strum full chords",
        "si": 6,
        "hi": 1,
        "hidden": true
      },
      {
        "title": "Enter the Disastrous Peace easter egg",
        "si": 7,
        "hi": 0,
        "hidden": true
      },
      {
        "title": "Unlock the hidden FM voice",
        "si": 6,
        "hi": 0,
        "hidden": true
      },
      {
        "title": "Get Karplusverb (string + reverb)",
        "si": 6,
        "hi": 2,
        "hidden": true
      }
    ],
    "hotspots": {
      "polyphony": {
        "x": 0.3,
        "y": 0.165,
        "r": 0.07
      },
      "model button": {
        "x": 0.7,
        "y": 0.165,
        "r": 0.07
      },
      "frequency": {
        "x": 0.27,
        "y": 0.27,
        "r": 0.12
      },
      "structure": {
        "x": 0.73,
        "y": 0.27,
        "r": 0.12
      },
      "brightness": {
        "x": 0.16,
        "y": 0.46,
        "r": 0.09
      },
      "damping": {
        "x": 0.5,
        "y": 0.46,
        "r": 0.09
      },
      "position": {
        "x": 0.84,
        "y": 0.46,
        "r": 0.09
      },
      "strum": {
        "x": 0.13,
        "y": 0.78,
        "r": 0.06
      },
      "v/oct": {
        "x": 0.3,
        "y": 0.78,
        "r": 0.06
      },
      "odd": {
        "x": 0.66,
        "y": 0.78,
        "r": 0.06
      },
      "even": {
        "x": 0.86,
        "y": 0.78,
        "r": 0.06
      }
    }
  },
  {
    "id": "fxaidxl",
    "name": "FX Aid XL",
    "manufacturer": "Happy Nerding",
    "hp": 6,
    "tagline": "Screen-free stereo multi-effects built on the Spin FV-1, packing 32 reflashable algorithms into 6HP.",
    "overview": "Screen-free stereo multi-FX on the Spin FV-1: 32 reflashable programs in 4 banks, three knobs plus dry/wet, per-parameter CV — selected with two buttons and LEDs.",
    "manualUrl": "https://happynerding.com/wp-content/uploads/2019/08/Happy_Nerding_FX_Aid.pdf",
    "specs": {
      "Width": "6 HP",
      "Depth": "45 mm",
      "Power": "80 mA +12V, 30 mA -12V",
      "DSP": "Spin FV-1",
      "Programs": "32 effects in 4 banks of 8 (reflashable)",
      "I/O": "Stereo in / stereo out (mono-compatible)",
      "CV inputs": "3 dedicated parameter CV + SRR (sample-rate) CV + Dry/Wet CV",
      "Presets": "4 user-storable"
    },
    "trivia": [
      {
        "title": "FV-1 heritage",
        "fact": "Like dozens of boutique guitar pedals and Eurorack FX, the FX Aid XL runs on the Spin Semiconductor FV-1, an 8-pin DSP that holds eight programs at a time and reads three potentiometers as its parameter inputs."
      },
      {
        "title": "Reflash with audio",
        "fact": "New banks are loaded not over USB but as a roughly 40-second WAV file played into a CV/SRR jack at roughly plus-or-minus 1V line level, with inner LEDs flashing to confirm a clean transfer."
      },
      {
        "title": "Illustrated by a fan",
        "fact": "The widely used manual with per-program control charts and signal-flow diagrams was created by Bob Borries (vo1t.com) and is hosted on Happy Nerding's own site."
      },
      {
        "title": "Browser editor",
        "fact": "A free web app at fxaid.app lets you assemble your own 32-program bank, print a control memo, and download the firmware WAV, including free third-party Spin programs."
      }
    ],
    "image": "images/fxaidxl.jpg",
    "knobLabels": [
      "Control 1 (Delay / Decay / Rate / Threshold)",
      "Control 2 (Feedback / Chorus / Range / Ratio)",
      "Control 3 (Tone / xFade / +-Feedback / Time)"
    ],
    "sections": [
      {
        "title": "What it is",
        "body": [
          "A 6HP stereo multi-effects module from Happy Nerding, built on the Spin FV-1 DSP.",
          "Pick from 32 algorithms (4 banks of 8) with two buttons and LEDs, then shape with three knobs and Dry/Wet."
        ]
      },
      {
        "title": "Panel and picking effects",
        "body": [
          "Three Control knobs and a Dry/Wet mix sit above four LEDs, two buttons, and the CV and stereo I/O jacks.",
          "Buttons step through banks and programs; your last effect, CV assignments, and presets survive power cycles."
        ],
        "controls": [
          {
            "name": "Control 1",
            "type": "knob",
            "desc": "First effect parameter. Typically Delay Time, Decay Time, Rate or Threshold depending on the algorithm.",
            "tip": "It is the most musically active knob on most delays and reverbs, so reach for it first."
          },
          {
            "name": "Control 2",
            "type": "knob",
            "desc": "Second effect parameter. Often Feedback, Chorus amount, Range or compression Ratio."
          },
          {
            "name": "Control 3",
            "type": "knob",
            "desc": "Third effect parameter. Commonly Tone, crossfade, +-Feedback, or Time."
          },
          {
            "name": "Dry/Wet",
            "type": "knob",
            "desc": "Analog blend between the dry input and the processed signal. Not stored in presets, so it is always a live performance control.",
            "tip": "Because it is analog and outside the preset system, you can ride it freely without changing the loaded program."
          },
          {
            "name": "bank LEDs + effect LEDs",
            "type": "mode",
            "desc": "Two LED rows give visual feedback for the current bank (1 of 4) and program (1 of 8)."
          },
          {
            "name": "Left button",
            "type": "button",
            "desc": "Steps to the previous program; also used to back up or confirm in preset and CV-assign modes."
          },
          {
            "name": "Right button",
            "type": "button",
            "desc": "Steps to the next program; also used to advance through presets, banks and CV-assign menus."
          },
          {
            "name": "L / R inputs",
            "type": "jack-in",
            "desc": "Stereo audio inputs. Many programs are mono-in and will use only the Left input."
          },
          {
            "name": "L / R outputs",
            "type": "jack-out",
            "desc": "Stereo audio outputs. Most reverbs and modulation effects produce a true stereo image even from a mono input."
          }
        ],
        "howtos": [
          {
            "goal": "Select a different effect",
            "steps": [
              "From normal playing mode (the module powers on into it), tap the right button to move to the next program, or the left button for the previous one.",
              "Watch the two LED rows: the bottom row shows the program (1 of 8), the top row shows the bank (1 of 4).",
              "Stepping past program 8 advances into the next bank, giving access to all 32 effects."
            ]
          }
        ]
      },
      {
        "title": "Loading banks",
        "body": [
          "Build any 32 FV-1 programs at fxaid.app and download a firmware WAV.",
          "Hold both buttons ~10s to enter update mode, then play the ~40s WAV at line level into the SRR input to reflash."
        ],
        "howtos": [
          {
            "goal": "Reflash a new bank of 32 programs",
            "steps": [
              "On a computer, open fxaid.app, build your 32-program list, and click GET FIRMWARE to download the firmware WAV (optionally GET MEMO for a control sheet and SAVE BANK to keep the list).",
              "On the module in normal playing mode, hold both buttons for about 10 seconds until the two inner LEDs blink, signaling it is ready to receive.",
              "Play the WAV from the computer into the SRR jack at line level, around plus-or-minus 1V; the inner LEDs flash alternately when the signal is good.",
              "If the outer LEDs blink (error), tap the left button, raise or lower the playback volume, and replay the file from the start.",
              "Wait for all LEDs to turn off; the module reboots into normal playing mode with the new 32 programs loaded."
            ]
          }
        ]
      },
      {
        "title": "Stereo and mono I/O",
        "body": [
          "High-quality stereo path; each program has its own I/O topology (mono-in/stereo-out, full stereo, or mono-out).",
          "Patch mono sources into Left. The Dry/Wet knob is an analog blend, so full dry passes the input cleanly."
        ],
        "howtos": [
          {
            "goal": "Run a mono synth voice in stereo",
            "steps": [
              "Patch your mono synth signal into the Left input jack.",
              "From normal playing mode, tap the right or left button to step to a mono-in/stereo-out program such as a reverb or shimmer (watch the bank and program LEDs to navigate the 32 effects).",
              "Patch both the Left and Right output jacks to your mixer to capture the stereo image.",
              "Turn the Dry/Wet knob to taste, leaving some dry signal for clarity."
            ]
          }
        ]
      },
      {
        "title": "CV, clock and tap",
        "body": [
          "CV1, CV2 and CV3 modulate the three Control knobs; SRR shifts sample rate, and Dry/Wet takes CV too.",
          "Clock-sync programs (_Clk, Sync) lock delays to your tempo, and CV can switch between all 32 programs."
        ],
        "controls": [
          {
            "name": "CV1 / CV2 / CV3",
            "type": "jack-in",
            "desc": "Dedicated CV inputs for Control 1, 2 and 3 respectively, for independent modulation of each parameter."
          },
          {
            "name": "SRR",
            "type": "jack-in",
            "desc": "Sample Rate Reducer CV, modulating the internal clock for crush/pitch effects. Can be reassigned to any control and summed with its CV.",
            "tip": "Slow modulation of SRR gives subtle detuning; fast or deep modulation gives gritty digital artefacts."
          },
          {
            "name": "Dry/Wet CV",
            "type": "jack-in",
            "desc": "CV control over the analog dry/wet mix, useful for envelope-shaped wet swells."
          }
        ],
        "howtos": [
          {
            "goal": "Sync a delay to your clock",
            "steps": [
              "From normal playing mode, tap the right or left button to step to a clock-syncable delay program (a _Clk or Sync type such as Delay Clock Sync); the bottom LED row shows program 1 to 8 and the top row the bank.",
              "Patch a square-wave clock from your sequencer into the SRR jack, which clock-sync programs read as the clock source.",
              "Turn Control 1 to set the clock divider and choose the rhythmic subdivision.",
              "Turn Control 2 (Feedback) for the number of repeats and Control 3 for tone."
            ]
          },
          {
            "goal": "Assign or change a CV destination",
            "steps": [
              "From normal playing mode, hold either button for about 2 seconds until a single LED blinks, entering CV-assign mode.",
              "Tap a button to move the blinking LED: LED1 = Control 1, LED2 = Control 2, LED3 = Control 3, LED4 = Sample Rate Reducer (LED1 plus LED5 = preset selection).",
              "Hold for about 2 seconds again to exit and save the assignment; the module returns to normal playing mode."
            ]
          }
        ]
      },
      {
        "title": "Presets and live tips",
        "body": [
          "Four presets store the program and all three knob positions; Dry/Wet stays a live analog knob.",
          "Pre-load four contrasting sounds, lean on sync delays for tempo-locked repeats, and switch hands-free via CV."
        ],
        "howtos": [
          {
            "goal": "Store a preset",
            "steps": [
              "From normal playing mode, first select the program and set Control 1, 2 and 3 to the sound you want to save (Dry/Wet is a live knob and is not stored).",
              "Press and hold the right button, keeping it held even after all LEDs turn off.",
              "While still holding the right button, tap the left button to step the lit LED across slots 1 to 4 left to right.",
              "When the lit LED reaches the slot you want, release to store the current program and knob positions there."
            ]
          },
          {
            "goal": "Recall a preset",
            "steps": [
              "From normal playing mode, hold both buttons for about 2 seconds to enter preset mode; an LED lights over the active preset slot.",
              "Tap the right button to advance to the next preset, or the left button to go back; slots 1 to 4 are shown by the lit LED.",
              "Stop on the preset you want; it loads its stored program and knob positions immediately."
            ]
          }
        ]
      }
    ],
    "effectBanks": [
      {
        "bank": "Bank A · Delays (factory programs 1-8)",
        "color": "green",
        "programs": [
          {
            "n": 1,
            "name": "Delay Tape",
            "k1": "Delay Time",
            "k2": "Feedback",
            "k3": "Heads Ratio",
            "notes": "3-tape-head emulation, heads 1 and 2 panned left and head 3 right for a stereo tape echo."
          },
          {
            "n": 2,
            "name": "Delay Ping-Pong",
            "k1": "Delay Time",
            "k2": "Feedback",
            "k3": "Frequency",
            "notes": "Right output sounds first, left second, bouncing across the stereo field."
          },
          {
            "n": 3,
            "name": "Delay HP",
            "k1": "Delay Time",
            "k2": "Feedback",
            "k3": "Frequency",
            "notes": "Resonating 2-pole high-pass filter inside the feedback loop thins the repeats over time."
          },
          {
            "n": 4,
            "name": "Delay LP",
            "k1": "Delay Time",
            "k2": "Feedback",
            "k3": "Frequency",
            "notes": "Resonating 4-pole low-pass in the feedback loop darkens each successive repeat, dub-style."
          },
          {
            "n": 5,
            "name": "Delay Freq. Shift",
            "k1": "Delay Time",
            "k2": "Feedback",
            "k3": "+-Freq. Shift",
            "notes": "A frequency shifter (about +-650 Hz) inside the feedback loop for metallic, detuning echoes."
          },
          {
            "n": 6,
            "name": "Delay Pitch Shift",
            "k1": "Delay Time",
            "k2": "Feedback",
            "k3": "+-Pitch Shift",
            "notes": "Pitch shift (about +-1 octave) inside the feedback loop for ascending/descending repeats."
          },
          {
            "n": 7,
            "name": "Delay Clock Sync",
            "k1": "CV (Clock) In",
            "k2": "Feedback",
            "k3": "Clock Divider",
            "notes": "Syncs to a square-wave clock at the CV input; Control 3 sets the rhythmic division."
          },
          {
            "n": 8,
            "name": "Delay Comb",
            "k1": "Frequency",
            "k2": "Resonance",
            "k3": "+-Feedforward",
            "notes": "Feedforward and feedback comb filter for resonant, tuned-delay textures."
          }
        ]
      },
      {
        "bank": "Bank B · Delays and modulation (factory programs 9-16)",
        "color": "teal",
        "programs": [
          {
            "n": 9,
            "name": "Delay Magneto",
            "k1": "Delay Time",
            "k2": "Feedback",
            "k3": "Chorus",
            "notes": "Four evenly spaced tape heads with chorus for a lush multi-tap echo."
          },
          {
            "n": 10,
            "name": "Delay > Reverb",
            "k1": "Delay Time",
            "k2": "Feedback",
            "k3": "+-Long/Short Amount",
            "notes": "Delay feeding a reverb placed outside the feedback loop, for echo into ambience."
          },
          {
            "n": 11,
            "name": "Delay > Dual Shimmer",
            "k1": "Delay Time",
            "k2": "Feedback",
            "k3": "+-Long/Short Amount",
            "notes": "Delay into both up- and down-octave shimmer voices."
          },
          {
            "n": 12,
            "name": "Delay Vowel",
            "k1": "Delay Time",
            "k2": "Feedback",
            "k3": "Vowel",
            "notes": "A pre-feedback vowel formant filter (AH-E-EE-O-I-AE-AW-A) gives talking echoes."
          },
          {
            "n": 13,
            "name": "Filter Vowel",
            "k1": "+-Freq. Shift",
            "k2": "Resonance",
            "k3": "Vowel",
            "notes": "Resonant vowel/formant filter morphing through vowel sounds; mono in/out."
          },
          {
            "n": 14,
            "name": "Wave Folder",
            "k1": "Amount",
            "k2": "+-Symmetry",
            "k3": "Stereo Width",
            "notes": "Reflects the waveform above a floor and ceiling for harmonically rich folding distortion."
          },
          {
            "n": 15,
            "name": "Sample Rate Reducer",
            "k1": "Amount",
            "k2": "Pre-FX Tone",
            "k3": "Post-FX Tone",
            "notes": "Reduces the sample rate for classic digital aliasing and lo-fi grit."
          },
          {
            "n": 16,
            "name": "Bit Crusher",
            "k1": "Amount",
            "k2": "Pre-FX Tone",
            "k3": "Post-FX Tone",
            "notes": "Reduces vertical bit depth for quantized, crunchy digital distortion."
          }
        ]
      },
      {
        "bank": "Bank C · Modulation and pitch (factory programs 17-24)",
        "color": "purple",
        "programs": [
          {
            "n": 17,
            "name": "Flanger",
            "k1": "Rate",
            "k2": "Range",
            "k3": "+-Feedback",
            "notes": "Classic flanger; with Rate at zero the sweep can be driven by CV or set manually."
          },
          {
            "n": 18,
            "name": "Phaser Classic 12",
            "k1": "Rate",
            "k2": "Range",
            "k3": "+-Feedback",
            "notes": "A 6-pole (12-stage) phaser; Rate at zero allows CV or manual sweeping."
          },
          {
            "n": 19,
            "name": "Pitch Shifter",
            "k1": "+-Pitch Shift",
            "k2": "+-Feedback",
            "k3": "Tone",
            "notes": "Smooth pitch adjustment over about a +-2 octave range; mono in."
          },
          {
            "n": 20,
            "name": "Pitch Shifter Dual",
            "k1": "+-Pitch Shift 1",
            "k2": "+-Pitch Shift 2",
            "k3": "1<>2 Xfade",
            "notes": "Two independent smooth pitch shifters with a crossfade between them; stereo."
          },
          {
            "n": 21,
            "name": "Freq. Shift Up/Down",
            "k1": "+-Freq. Shift",
            "k2": "+-Feedback",
            "k3": "Feedback Delay Time",
            "notes": "Simultaneous up and down frequency shifting with a feedback delay line."
          },
          {
            "n": 22,
            "name": "Chorus > Reverb",
            "k1": "Spread",
            "k2": "Stereo Width",
            "k3": "Long/Short Reverb Amount",
            "notes": "An 8-voice chorus running into a reverb; mono in, wide stereo out."
          },
          {
            "n": 23,
            "name": "Reverb Spring",
            "k1": "Decay Time",
            "k2": "+-Resonance",
            "k3": "Damping",
            "notes": "Variable-resonance spring reverb emulation from a mono input."
          },
          {
            "n": 24,
            "name": "Reverb Plate Classic",
            "k1": "Decay Time",
            "k2": "Pre-Delay",
            "k3": "Tone",
            "notes": "Popular studio plate sound with about 120 ms pre-delay."
          }
        ]
      },
      {
        "bank": "Bank D · Reverbs (factory programs 25-32)",
        "color": "blue",
        "programs": [
          {
            "n": 25,
            "name": "Reverb Room Stereo",
            "k1": "Decay Time",
            "k2": "Chorus",
            "k3": "Tone",
            "notes": "Stereo version of a realistic small-room reverb."
          },
          {
            "n": 26,
            "name": "Reverb Hall Chorus",
            "k1": "Delay Time",
            "k2": "Chorus",
            "k3": "Tone",
            "notes": "Big chorused hall for lush, moving ambience."
          },
          {
            "n": 27,
            "name": "Reverb Hall Medium",
            "k1": "Decay Time",
            "k2": "Pre-Delay",
            "k3": "Tone",
            "notes": "Medium-sized hall with pre-delay for a natural sense of space."
          },
          {
            "n": 28,
            "name": "Reverb Black Hole",
            "k1": "Decay Time",
            "k2": "Reverse/Gravity",
            "k3": "Tone",
            "notes": "Eventide Blackhole-inspired huge ambient reverb with a gravity/reverse control."
          },
          {
            "n": 29,
            "name": "Reverb Cloud",
            "k1": "Decay Time",
            "k2": "Chorus",
            "k3": "Diffusion",
            "notes": "Strymon BigSky-inspired Cloud reverb for soft, diffuse pads."
          },
          {
            "n": 30,
            "name": "Gray Hole Light",
            "k1": "Delay Time",
            "k2": "+-Gravity",
            "k3": "Tone",
            "notes": "A lighter Grayhole-style reverb/delay hybrid with pitch/gravity motion."
          },
          {
            "n": 31,
            "name": "Shimmer Input Dual",
            "k1": "Decay Time",
            "k2": "Amount",
            "k3": "Up<>Down Xfade",
            "notes": "Adds up- and down-octave shimmer to the input signal with a crossfade between them."
          },
          {
            "n": 32,
            "name": "Reverb Shimmer Dual",
            "k1": "Decay Time",
            "k2": "Amount",
            "k3": "Up<>Down Xfade",
            "notes": "Dual up- and down-octave shimmer regenerated in the reverb tail."
          }
        ]
      }
    ],
    "outcomes": [
      {
        "title": "Switch to a different effect",
        "si": 1,
        "hi": 0
      },
      {
        "title": "Tempo-synced delay",
        "si": 4,
        "hi": 0
      },
      {
        "title": "Save a preset",
        "si": 5,
        "hi": 0
      },
      {
        "title": "Recall a saved preset",
        "si": 5,
        "hi": 1
      },
      {
        "title": "Load a new 32-effect bank",
        "si": 2,
        "hi": 0
      },
      {
        "title": "Stereo width from a mono voice",
        "si": 3,
        "hi": 0
      },
      {
        "title": "Route CV to any knob",
        "si": 4,
        "hi": 1
      }
    ],
    "hotspots": {
      "control 1": {
        "x": 0.5,
        "y": 0.115,
        "r": 0.16
      },
      "control 2": {
        "x": 0.5,
        "y": 0.235,
        "r": 0.16
      },
      "control 3": {
        "x": 0.5,
        "y": 0.36,
        "r": 0.16
      },
      "dry/wet": {
        "x": 0.5,
        "y": 0.47,
        "r": 0.14
      },
      "srr": {
        "x": 0.5,
        "y": 0.615,
        "r": 0.07
      },
      "leds": {
        "x": 0.5,
        "y": 0.545,
        "rx": 0.3,
        "ry": 0.035
      }
    }
  }
];

const TRIVIA = MODULES.flatMap((m) =>
  m.trivia.map((t) => ({ module: m.name, moduleId: m.id, title: t.title, fact: t.fact }))
);
