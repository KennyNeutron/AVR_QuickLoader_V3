# AVR QuickLoader V3

A unified hardware and software development repository for **AVR QuickLoader V3**—a high-performance AVR microcontroller programmer and desktop utility interface.

This project is divided into two primary directories:

*   **[`code/juan_flasher_desktop/`](./code/juan_flasher_desktop)**: The companion desktop application built with Electron, Vue 3, TypeScript, and Vite.
*   **[`pcb/`](./pcb)**: The KiCad hardware design files for the custom AVR QuickLoader V3 programmer board.

---

## Directory Structure

```text
AVR_QuickLoader_V3/
├── code/
│   └── juan_flasher_desktop/ # Desktop application software
│       ├── electron/          # Electron main process source
│       ├── src/               # Frontend source (Vue 3, TypeScript)
│       └── package.json       # Node package manager config
│
└── pcb/                   # Hardware design files
    └── AVR_QuickLoader_PCB_V1.0/
        ├── AVR_QuickLoader_PCB_V1.0.kicad_sch # KiCad Schematic
        └── AVR_QuickLoader_PCB_V1.0.kicad_pcb # KiCad PCB Layout
```

---

## 1. Hardware (`pcb/`)

The PCB folder contains the custom AVR programmer hardware designs.

*   **Design Tool**: KiCad
*   **Key Files**:
    *   Schematic: [AVR_QuickLoader_PCB_V1.0.kicad_sch](file:///D:/Projects/AVR_QuickLoader_V3/pcb/AVR_QuickLoader_PCB_V1.0/AVR_QuickLoader_PCB_V1.0.kicad_sch)
    *   Layout: [AVR_QuickLoader_PCB_V1.0.kicad_pcb](file:///D:/Projects/AVR_QuickLoader_V3/pcb/AVR_QuickLoader_PCB_V1.0/AVR_QuickLoader_PCB_V1.0.kicad_pcb)

---

## 2. Desktop Application (`code/juan_flasher_desktop/`)

A desktop application designed to control the AVR programmer and provide a rich dashboard for port diagnostics, HEX firmware uploads, and live serial monitoring.

### Key Features
*   **User Authentication**: Secure login system powered by Supabase with role-based access control (Admin/Temp roles).
*   **Cloud Firmware Management**: Browse, download, and flash firmware directly from cloud storage, or use local HEX files.
*   **Admin Dashboard**: Manage temporary user sessions and upload/delete firmware from the cloud.
*   **Modern UI/UX**: Sleek dark theme with frosted glass effects and JuanRobotix branding.

### Prerequisites

*   **Node.js** (v18 or v20 LTS recommended)
*   **npm** (Node Package Manager)

### Quick Start

To run the desktop application locally:

1.  Navigate into the `juan_flasher_desktop` directory:
    ```bash
    cd code/juan_flasher_desktop
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Launch the application in development mode:
    ```bash
    npm run dev
    ```

For detailed software configuration, npm scripts, and development guidelines, refer to the [code/juan_flasher_desktop/README.md](file:///D:/Projects/AVR_QuickLoader_V3/code/juan_flasher_desktop/README.md).


---

## License

This project is licensed under the MIT License.

## Updates
Last Updated: June 14, 2026
