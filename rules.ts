import fs from "fs";
import { KarabinerRules } from "./types";
import { createHyperSubLayers, app, open } from "./utils";

const rules: KarabinerRules[] = [
  // Define the Hyper key itself
  {
    description: "Hyper Key (⌃⌥⇧⌘)",
    manipulators: [
      {
        description: "Caps Lock -> Hyper Key",
        from: {
          key_code: "caps_lock",
        },
        to: [
          {
            key_code: "left_shift",
            modifiers: ["left_command", "left_control", "left_option"],
          },
        ],
        to_if_alone: [
          {
            key_code: "escape",
          },
        ],
        type: "basic",
      },
      {
        type: "basic",
        description: "Disable CMD + Tab to force Hyper Key usage",
        from: {
          key_code: "tab",
          modifiers: {
            mandatory: ["left_command"],
          },
        },
        to: [
          {
            key_code: "tab",
          },
        ],
      },
    ],
  },
  ...createHyperSubLayers({
    // o = "Open" applications
    o: {
      g: app("Google Chrome"),
      v: app("Visual Studio Code"),
      s: app("Slack"),
      l: app("Trello"),
      t: app("Warp"),
      z: app("zoom.us"),
      i: app("Messages"),
      p: app("Spotify"),
      w: open("https://web.whatsapp.com"),
      r: open("https://calendar.google.com"),
      // # open finder
      e: { to: [{ key_code: "spacebar", modifiers: ["left_option","left_command"],}],},
    },

    // w = "Window" via Raycast.app
    w: {
      k: {
        description: "Window: Top Half",
        to: [
          {
            key_code: "k",
            modifiers: ["left_option", "left_control"],
          },
        ],
      },
      j: {
        description: "Window: Bottom Half",
        to: [
          {
            key_code: "j",
            modifiers: ["left_option", "left_control"],
          },
        ],
      },
      h: {
        description: "Window: Left Half",
        to: [
          {
            key_code: "h",
            modifiers: ["left_option", "left_control"],
          },
        ],
      },
      l: {
        description: "Window: Right Half",
        to: [
          {
            key_code: "l",
            modifiers: ["left_option", "left_control"],
          },
        ],
      },
      // # rotate layout clockwise, with Yabai
      r: { to: [{ key_code: "r", modifiers: ["left_option","left_shift"],}],},
      // # toggle window floatf, with Yabai
      e: { to: [{ key_code: "t", modifiers: ["left_option","left_shift"],}],},
      // # Maximize a Window, with Yabai
      f: { to: [ { key_code: "m", modifiers: ["left_option", "left_shift"],},],},
      // # Toggle Full Screen, with Raycast
      d: { to: [ { key_code: "f", modifiers: ["left_control", "left_option"],},],},
      // # Move window to prev and next space
      m: { to: [ { key_code: "n", modifiers: ["left_option","left_shift"],},],},
      n: { to: [ { key_code: "p", modifiers: ["left_option","left_shift"],},],},
      // # Move to next or prev Desktop
      u: { to: [ { key_code: "h", modifiers: ["left_control"],},],},
      i: { to: [ { key_code: "l", modifiers: ["left_control"],},],},
    },

    // s = "System"
    s: {
      u: {
        to: [
          {
            key_code: "volume_increment",
          },
        ],
      },
      j: {
        to: [
          {
            key_code: "volume_decrement",
          },
        ],
      },
      i: {
        to: [
          {
            key_code: "display_brightness_increment",
          },
        ],
      },
      k: {
        to: [
          {
            key_code: "display_brightness_decrement",
          },
        ],
      },
      l: {
        to: [
          {
            key_code: "q",
            modifiers: ["right_control", "right_command"],
          },
        ],
      },
      p: {
        to: [
          {
            key_code: "play_or_pause",
          },
        ],
      },
      semicolon: {
        to: [
          {
            key_code: "fastforward",
          },
        ],
      },
      e: {
        to: [
          {
            // Emoji picker
            key_code: "spacebar",
            modifiers: ["right_control", "right_command"],
          },
        ],
      },
    },

    // v = "moVe" which isn't "m" because we want it to be on the left hand
    // so that hjkl work like they do in vim
    v: {
      h: {
        to: [{ key_code: "left_arrow" }],
      },
      j: {
        to: [{ key_code: "down_arrow" }],
      },
      k: {
        to: [{ key_code: "up_arrow" }],
      },
      l: {
        to: [{ key_code: "right_arrow" }],
      },
      u: {
        to: [{ key_code: "page_down" }],
      },
      i: {
        to: [{ key_code: "page_up" }],
      },
    },

    // c = Musi*c* which isn't "m" because we want it to be on the left hand
    c: {
      p: {
        to: [{ key_code: "play_or_pause" }],
      },
      n: {
        to: [{ key_code: "fastforward" }],
      },
      b: {
        to: [{ key_code: "rewind" }],
      },
    },

    // f = focus
    f: {
      // # change window focus within space, with help of yabai
      j: { to: [{ key_code: "j", modifiers: ["left_option"],}],},
      k: { to: [{ key_code: "k", modifiers: ["left_option"],}],},
      h: { to: [{ key_code: "h", modifiers: ["left_option"],}],},
      l: { to: [{ key_code: "l", modifiers: ["left_option"],}],},
      // # change focus between external displays (left and right)
      u: { to: [{ key_code: "s", modifiers: ["left_option"],}],},
      i: { to: [{ key_code: "g", modifiers: ["left_option"],}],},
      
    },

  }),
];

fs.writeFileSync(
  "karabiner.json",
  JSON.stringify(
    {
      global: {
        ask_for_confirmation_before_quitting: true,
        check_for_updates_on_startup: true,
        show_in_menu_bar: false,
        show_profile_name_in_menu_bar: false,
        unsafe_ui: false
      },
      profiles: [
        {
          complex_modifications: {
            parameters: {
              "basic.simultaneous_threshold_milliseconds": 50,
              "basic.to_delayed_action_delay_milliseconds": 500,
              "basic.to_if_alone_timeout_milliseconds": 1000,
              "basic.to_if_held_down_threshold_milliseconds": 500,
              "mouse_motion_to_scroll.speed": 100
            },
            rules,
          },
          devices: [
            {
                disable_built_in_keyboard_if_exists: false,
                fn_function_keys: [],
                identifiers: {
                    is_keyboard: true,
                    is_pointing_device: false,
                    product_id: 0,
                    vendor_id: 0
                },
                ignore: false,
                manipulate_caps_lock_led: true,
                simple_modifications: [
                    {
                        from: {
                            apple_vendor_top_case_key_code: "keyboard_fn"
                        },
                        to: [
                            {
                                key_code: "left_command"
                            }
                        ]
                    },
                    {
                        from: {
                            key_code: "left_command"
                        },
                        to: [
                            {
                                key_code: "left_option"
                            }
                        ]
                    },
                    {
                        from: {
                            key_code: "left_control"
                        },
                        to: [
                            {
                                apple_vendor_top_case_key_code: "keyboard_fn"
                            }
                        ]
                    },
                    {
                        from: {
                            key_code: "left_option"
                        },
                        to: [
                            {
                                key_code: "left_control"
                            }
                        ]
                    },
                    {
                        from: {
                            key_code: "right_option"
                        },
                        to: [
                            {
                                key_code: "right_command"
                            }
                        ]
                    },
                    {
                        from: {
                            key_code: "right_command"
                        },
                        to: [
                            {
                                key_code: "right_option"
                            }
                        ]
                    }
                ],
                treat_as_built_in_keyboard: false
            },
            {
                disable_built_in_keyboard_if_exists: false,
                fn_function_keys: [],
                identifiers: {
                    is_keyboard: false,
                    is_pointing_device: true,
                    product_id: 0,
                    vendor_id: 0
                },
                ignore: true,
                manipulate_caps_lock_led: false,
                simple_modifications: [],
                treat_as_built_in_keyboard: false
            },
            {
                disable_built_in_keyboard_if_exists: false,
                fn_function_keys: [],
                identifiers: {
                    is_keyboard: true,
                    is_pointing_device: false,
                    product_id: 1957,
                    vendor_id: 1118
                },
                ignore: false,
                manipulate_caps_lock_led: true,
                simple_modifications: [
                    {
                        from: {
                            key_code: "left_command"
                        },
                        to: [
                            {
                                key_code: "left_control"
                            }
                        ]
                    },
                    {
                        from: {
                            key_code: "left_control"
                        },
                        to: [
                            {
                                key_code: "left_command"
                            }
                        ]
                    }
                ],
                treat_as_built_in_keyboard: false
            },
            {
                disable_built_in_keyboard_if_exists: false,
                fn_function_keys: [],
                identifiers: {
                    is_keyboard: false,
                    is_pointing_device: true,
                    product_id: 1957,
                    vendor_id: 1118
                },
                ignore: true,
                manipulate_caps_lock_led: false,
                simple_modifications: [],
                treat_as_built_in_keyboard: false
            },
            {
                disable_built_in_keyboard_if_exists: false,
                fn_function_keys: [],
                identifiers: {
                    is_keyboard: false,
                    is_pointing_device: true,
                    product_id: 23644,
                    vendor_id: 9354
                },
                ignore: true,
                manipulate_caps_lock_led: false,
                simple_modifications: [],
                treat_as_built_in_keyboard: false
            },
            {
                disable_built_in_keyboard_if_exists: false,
                fn_function_keys: [],
                identifiers: {
                    is_keyboard: true,
                    is_pointing_device: false,
                    product_id: 50475,
                    vendor_id: 1133
                },
                ignore: false,
                manipulate_caps_lock_led: true,
                simple_modifications: [
                    {
                        from: {
                            key_code: "left_command"
                        },
                        to: [
                            {
                                key_code: "left_control"
                            }
                        ]
                    },
                    {
                        from: {
                            key_code: "left_control"
                        },
                        to: [
                            {
                                key_code: "left_command"
                            }
                        ]
                    }
                ],
                treat_as_built_in_keyboard: false
            },
            {
                disable_built_in_keyboard_if_exists: false,
                fn_function_keys: [],
                identifiers: {
                    is_keyboard: false,
                    is_pointing_device: true,
                    product_id: 50475,
                    vendor_id: 1133
                },
                ignore: true,
                manipulate_caps_lock_led: false,
                simple_modifications: [],
                treat_as_built_in_keyboard: false
            },
            {
                disable_built_in_keyboard_if_exists: false,
                fn_function_keys: [],
                identifiers: {
                    is_keyboard: true,
                    is_pointing_device: false,
                    product_id: 1031,
                    vendor_id: 4176
                },
                ignore: true,
                manipulate_caps_lock_led: true,
                simple_modifications: [],
                treat_as_built_in_keyboard: false
            }
          ],
          fn_function_keys: [
            {
                from: {
                    key_code: "f1"
                },
                to: [
                    {
                        consumer_key_code: "display_brightness_decrement"
                    }
                ]
            },
            {
                from: {
                    key_code: "f2"
                },
                to: [
                    {
                        consumer_key_code: "display_brightness_increment"
                    }
                ]
            },
            {
                from: {
                    key_code: "f3"
                },
                to: [
                    {
                        apple_vendor_keyboard_key_code: "mission_control"
                    }
                ]
            },
            {
                from: {
                    key_code: "f4"
                },
                to: [
                    {
                        apple_vendor_keyboard_key_code: "spotlight"
                    }
                ]
            },
            {
                from: {
                    key_code: "f5"
                },
                to: [
                    {
                        consumer_key_code: "dictation"
                    }
                ]
            },
            {
                from: {
                    key_code: "f6"
                },
                to: [
                    {
                        key_code: "f6"
                    }
                ]
            },
            {
                from: {
                    key_code: "f7"
                },
                to: [
                    {
                        consumer_key_code: "rewind"
                    }
                ]
            },
            {
                from: {
                    key_code: "f8"
                },
                to: [
                    {
                        consumer_key_code: "play_or_pause"
                    }
                ]
            },
            {
                from: {
                    key_code: "f9"
                },
                to: [
                    {
                        consumer_key_code: "fast_forward"
                    }
                ]
            },
            {
                from: {
                    key_code: "f10"
                },
                to: [
                    {
                        consumer_key_code: "mute"
                    }
                ]
            },
            {
                from: {
                    key_code: "f11"
                },
                to: [
                    {
                        consumer_key_code: "volume_decrement"
                    }
                ]
            },
            {
                from: {
                    key_code: "f12"
                },
                to: [
                    {
                        consumer_key_code: "volume_increment"
                    }
                ]
            }
        ],
          name: "Default",
            parameters: {
                delay_milliseconds_before_open_device: 1000
            },
            selected: false,
            simple_modifications: [],
            virtual_hid_keyboard: {
                country_code: 0,
                indicate_sticky_modifier_keys_state: true,
                mouse_key_xy_scale: 100
            }
        },
      ],
    },
    null,
    4
  )
);
