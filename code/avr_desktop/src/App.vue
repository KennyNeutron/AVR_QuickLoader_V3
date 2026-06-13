<template>
  <div class="app-container">
    <!-- Top Bar: Global Device Port -->
    <header class="global-port-section panel">
      <div class="port-header">
        <div class="header-titles">
          <div class="section-title">GLOBAL DEVICE PORT</div>
          <div class="section-subtitle">Unified port for all operations</div>
        </div>
        <div
          class="refresh-icon"
          @click="refreshPorts"
          title="Refresh Ports"
          style="cursor: pointer; color: #00e676"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M23 4v6h-6"></path>
            <path d="M1 20v-6h6"></path>
            <path
              d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"
            ></path>
          </svg>
        </div>
      </div>

      <div class="port-controls">
        <div class="port-selector-wrapper">
          <!-- Utilizing the same class structure as the "Device Configuration" panel for consistency -->
          <div class="select-wrapper full-width">
            <span class="chip-icon" style="color: #7c4dff">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect>
                <rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect>
                <line x1="6" y1="6" x2="6.01" y2="6"></line>
                <line x1="6" y1="18" x2="6.01" y2="18"></line>
              </svg>
            </span>
            <select class="custom-select" v-model="selectedPort">
              <option value="Select a port...">None / Select a port...</option>
              <option v-for="port in ports" :key="port.path" :value="port.path">
                {{ port.path }}
                {{ port.manufacturer ? `(${port.manufacturer})` : "" }}
              </option>
            </select>
            <div class="select-arrow">▼</div>
          </div>
        </div>

        <div class="active-port-indicator">
          <div
            class="status-dot"
            :class="{
              active: selectedPort !== 'Select a port...' && isPortConnected,
              disconnected:
                selectedPort !== 'Select a port...' && !isPortConnected,
            }"
          ></div>
          <div class="status-text">
            <div class="label">
              {{
                selectedPort !== "Select a port..." && !isPortConnected
                  ? "DISCONNECTED"
                  : "ACTIVE PORT"
              }}
            </div>
            <div class="value">
              {{ selectedPort !== "Select a port..." ? selectedPort : "None" }}
            </div>
          </div>
        </div>
      </div>
      <div class="progress-bar-placeholder"></div>
    </header>

    <main class="main-grid">
      <!-- Left Column -->
      <div class="column left-col">
        <!-- Firmware Selection -->
        <section class="panel firmware-panel">
          <div class="panel-header">FIRMWARE SELECTION</div>
          <div class="panel-content">
            <label class="input-label">FIRMWARE FILE</label>
            <div class="file-input-group">
              <div class="file-input-wrapper">
                <span class="upload-icon" style="color: #ffab00">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                    <polyline points="17 8 12 3 7 8"></polyline>
                    <line x1="12" y1="3" x2="12" y2="15"></line>
                  </svg>
                </span>
                <input
                  type="text"
                  placeholder="Select a .hex file..."
                  readonly
                  class="text-input-with-icon"
                  v-model="firmwarePath"
                />
              </div>
              <button class="btn btn-secondary" @click="browseFirmware">
                Browse
              </button>
            </div>
          </div>
        </section>

        <!-- Device Configuration -->
        <section class="panel device-panel">
          <div class="panel-header">DEVICE CONFIGURATION</div>
          <div class="panel-content">
            <label class="input-label">TARGET BOARD</label>
            <div class="select-wrapper">
              <span class="chip-icon" style="color: #00ffff">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect>
                  <rect x="9" y="9" width="6" height="6"></rect>
                  <line x1="9" y1="1" x2="9" y2="4"></line>
                  <line x1="15" y1="1" x2="15" y2="4"></line>
                  <line x1="9" y1="20" x2="9" y2="23"></line>
                  <line x1="15" y1="20" x2="15" y2="23"></line>
                  <line x1="20" y1="9" x2="23" y2="9"></line>
                  <line x1="20" y1="14" x2="23" y2="14"></line>
                  <line x1="1" y1="9" x2="4" y2="9"></line>
                  <line x1="1" y1="14" x2="4" y2="14"></line>
                </svg>
              </span>
              <select class="custom-select" v-model="selectedMcu">
                <option value="m328p">Arduino Uno (m328p)</option>
                <option value="m328p">Arduino Nano (m328p)</option>
                <option value="m2560">Arduino Mega (m2560)</option>
              </select>
              <div class="select-arrow">▼</div>
            </div>
          </div>
        </section>

        <!-- Primary Actions -->
        <section class="panel actions-panel">
          <div class="panel-header">PRIMARY ACTIONS</div>
          <div class="panel-content buttons-stack">
            <button
              class="btn btn-primary btn-large"
              @click="uploadFirmware"
              :disabled="isBusy"
            >
              <span class="icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                  <polyline points="17 8 12 3 7 8"></polyline>
                  <line x1="12" y1="3" x2="12" y2="15"></line>
                </svg>
              </span>
              {{ isBusy ? "Working..." : "Upload Firmware" }}
            </button>
            <button class="btn btn-danger btn-large" @click="stopOperation">
              <span class="icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="4.93" y1="4.93" x2="19.07" y2="19.07"></line>
                </svg>
              </span>
              Stop
            </button>
          </div>
        </section>
      </div>

      <!-- Right Column -->
      <div class="column right-col">
        <!-- System Status -->
        <section class="panel status-panel">
          <div class="panel-header">SYSTEM STATUS</div>
          <div class="panel-content status-row">
            <div class="status-icon-large success">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
            </div>
            <div class="status-details">
              <div class="status-main success-text">READY</div>
              <div class="status-sub">No file selected</div>
            </div>
          </div>
        </section>

        <!-- ISP Programmer -->
        <section class="panel isp-panel">
          <div class="panel-header">ISP PROGRAMMER</div>
          <div class="panel-content">
            <label class="input-label">PROGRAMMER TYPE</label>
            <div class="select-wrapper mb-2">
              <span class="isp-icon" style="color: #e91e63">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path
                    d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"
                  ></path>
                  <path
                    d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"
                  ></path>
                </svg>
              </span>
              <select class="custom-select" v-model="selectedIsp">
                <option value="USBtinyISP">USBtinyISP</option>
                <option value="Arduino as ISP">Arduino as ISP</option>
                <option value="AVRISP mkII">AVRISP mkII</option>
              </select>
              <div class="select-arrow">▼</div>
            </div>

            <div class="isp-actions">
              <button
                class="btn btn-primary full-width mb-2"
                @click="ispUpload"
                :disabled="isBusy"
              >
                <span class="icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                    <polyline points="17 8 12 3 7 8"></polyline>
                    <line x1="12" y1="3" x2="12" y2="15"></line>
                  </svg>
                </span>
                ISP Upload
              </button>
              <button
                class="btn btn-warning full-width mb-2"
                @click="burnBootloader"
                :disabled="isBusy"
              >
                <span class="icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path
                      d="M8.56 2.9A7 7 0 0 1 19 9v4m-2 4H2a7 7 0 0 1 7-7v4l-3-3m0 0l3-3"
                    ></path>
                  </svg>
                </span>
                Burn Bootloader
              </button>
              <button
                class="btn btn-outline full-width"
                @click="testWiring"
                :disabled="isBusy"
              >
                <span class="icon">!</span>
                Test Wiring
              </button>
            </div>
          </div>
        </section>
      </div>
    </main>

    <!-- Bottom Panel (Tabs) -->
    <footer class="bottom-panel">
      <div class="panel-tabs">
        <button
          class="tab-btn"
          :class="{ active: activeTab === 'terminal' }"
          @click="activeTab = 'terminal'"
        >
          TERMINAL
        </button>
        <button
          class="tab-btn"
          :class="{ active: activeTab === 'serial' }"
          @click="activeTab = 'serial'"
        >
          SERIAL MONITOR
        </button>

        <div class="tab-spacer"></div>

        <div class="terminal-controls">
          <label class="checkbox-label" v-if="activeTab === 'terminal'">
            <input type="checkbox" checked />
            Auto-scroll
          </label>
          <!-- Serial Controls (Mini) -->
          <div class="mini-serial-controls" v-if="activeTab === 'serial'">
            <label class="checkbox-label">
              <input type="checkbox" v-model="serialAutoscroll" />
              Auto-scroll
            </label>
            <button
              class="btn-icon-tiny"
              @click="clearSerialLogs"
              title="Clear Output"
              style="color: #ff0000"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M3 6h18"></path>
                <path
                  d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"
                ></path>
              </svg>
            </button>
            <div class="mini-select-group">
              <span class="label">BAUD</span>
              <select class="mini-select" v-model="serialBaud">
                <option value="300">300</option>
                <option value="600">600</option>
                <option value="1200">1200</option>
                <option value="2400">2400</option>
                <option value="4800">4800</option>
                <option value="9600">9600</option>
                <option value="14400">14400</option>
                <option value="19200">19200</option>
                <option value="28800">28800</option>
                <option value="38400">38400</option>
                <option value="57600">57600</option>
                <option value="74880">74880</option>
                <option value="115200">115200</option>
                <option value="230400">230400</option>
              </select>
            </div>
            <div class="mini-select-group">
              <span class="label">EOL</span>
              <select class="mini-select" v-model="serialEol">
                <option value="No Line Ending">No Line Ending</option>
                <option value="Newline">New Line</option>
                <option value="Carriage Return">Carriage Return</option>
                <option value="Both NL & CR">Both NL & CR</option>
              </select>
            </div>
            <button
              :class="serialConnected ? 'btn-mini-danger' : 'btn-mini-success'"
              @click="toggleSerial"
            >
              {{ serialConnected ? "Disconnect" : "Connect" }}
            </button>
          </div>

          <button
            class="btn-icon-tiny"
            @click="toggleTerminal"
            title="Toggle Terminal Height"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </button>
        </div>
      </div>

      <!-- Terminal Tab Content -->
      <div
        class="panel-body terminal-body monospace"
        v-if="activeTab === 'terminal'"
      >
        <div class="log-line" v-for="(log, i) in logs" :key="i">
          {{ log }}
        </div>
      </div>

      <!-- Serial Tab Content -->
      <div class="panel-body serial-body" v-if="activeTab === 'serial'">
        <div class="serial-output monospace">
          <div v-for="(msg, i) in serialMessages" :key="i">{{ msg }}</div>
          <div class="placeholder-text" v-if="serialMessages.length === 0">
            No messages received...
          </div>
        </div>
        <div class="serial-input-bar">
          <span class="prompt-char">&gt;</span>
          <input
            type="text"
            class="text-input-noborder"
            placeholder="Send data to device..."
            v-model="serialInput"
            @keyup.enter="sendSerial"
          />
          <button class="btn-icon" @click="sendSerial">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <line x1="22" y1="2" x2="11" y2="13"></line>
              <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
            </svg>
          </button>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick } from "vue";

// --- State ---
const activeTab = ref("terminal");
const isTerminalExpanded = ref(false);
const ports = ref<{ path: string; manufacturer?: string }[]>([]);
const selectedPort = ref("Select a port...");
const firmwarePath = ref("");
const selectedMcu = ref("m328p"); // Default to m328p
const selectedIsp = ref("USBtinyISP");
const logs = ref<string[]>([]);
const isBusy = ref(false);

// Serial Monitor State
const serialBaud = ref("115200");
const serialEol = ref("Newline"); // 'Newline', 'No Line Ending'
const serialConnected = ref(false);
const serialAutoscroll = ref(true);
const serialMessages = ref<string[]>([]);
const serialInput = ref("");

// Port Connection State
const isPortConnected = ref(true);

// Buffer for avrdude logs to handle progress bars

// --- lifecycle ---
onMounted(async () => {
  // Initial logs
  addLog("AVR QuickLoader v3.2.1 initialized");
  addLog("System ready");
  addLog("Waiting for command...");

  // Load ports
  await refreshPorts();

  // Listen for avrdude logs with buffering support
  window.electron.ipcRenderer.on(
    "avrdude-log",
    (_event: any, message: string) => {
      // Append to buffer
      // If message contains line breaks or is a progress update, handle accordingly
      handleAvrdudeLog(message);
    },
  );

  // Listen for Serial Data
  // Listen for Serial Data
  window.electron.ipcRenderer.on("serial-data", (_e: any, data: string) => {
    // Basic buffering: Append incoming data to the last line if no newline,
    // or split and push if newlines are present.
    // Also strip \r to avoid artifacts, assuming \n is primary separator
    const safeData = data.replace(/\r/g, "");

    // If we have no lines yet, add one
    if (serialMessages.value.length === 0) {
      serialMessages.value.push("");
    }

    const parts = safeData.split("\n");

    // The first part always belongs to the *current* last line
    const lastIdx = serialMessages.value.length - 1;
    serialMessages.value[lastIdx] += parts[0];

    // Any subsequent parts are new lines
    for (let i = 1; i < parts.length; i++) {
      serialMessages.value.push(parts[i]);
    }

    scrollToBottomSerial();
  });

  window.electron.ipcRenderer.on("serial-error", (_e: any, msg: string) => {
    addLog(`[SERIAL ERROR] ${msg}`);
    serialConnected.value = false;
  });

  window.electron.ipcRenderer.on("serial-closed", () => {
    addLog(`[SERIAL] Port closed`);
    serialConnected.value = false;
  });

  // Periodic port availability check (every 2 seconds)
  setInterval(async () => {
    if (selectedPort.value !== "Select a port...") {
      await refreshPorts();
      // Check if selected port still exists in the ports list
      const portExists = ports.value.some((p) => p.path === selectedPort.value);
      isPortConnected.value = portExists;
    } else {
      isPortConnected.value = true; // No port selected, so set to default
    }
  }, 2000);
});

// --- Actions ---

/**
 * Handles incoming log chunks from avrdude.
 * Reconstructs lines and updates the UI for progress bars.
 */
const handleAvrdudeLog = (msg: string) => {
  if (!msg) return;

  const parts = msg.split("\n");

  parts.forEach((part) => {
    // Skip empty chunks if we have multiple (avoids double spacing from split)
    if (!part && parts.length > 1) return;
    if (!part) return;

    const trimmed = part.trim();
    // Detect if this part acts as a "Header" or start of a new progress block
    const isNewHeader =
      trimmed.startsWith("Reading |") ||
      trimmed.startsWith("Writing |") ||
      trimmed.startsWith("Verifying |");

    // Detect if this part is a progress update (has # or %) AND is NOT a new header
    const isProgressUpdate =
      !isNewHeader && (trimmed.includes("#") || trimmed.includes("%"));

    if (isProgressUpdate) {
      const lastLogIndex = logs.value.length - 1;
      if (lastLogIndex >= 0) {
        const lastLog = logs.value[lastLogIndex];
        // Only append if the last line matches a progress bar pattern
        // (Starts with expected headers or contains #)
        if (
          lastLog.includes("Reading |") ||
          lastLog.includes("Writing |") ||
          lastLog.includes("Verifying |") ||
          lastLog.includes("#")
        ) {
          logs.value[lastLogIndex] = lastLog + part;
          scrollToBottomTerminal();
          return;
        }
      }
    }

    // Otherwise, push as a new line
    logs.value.push(`> ${part}`);
  });

  scrollToBottomTerminal();
};

const addLog = (msg: string) => {
  if (!msg || !msg.trim()) return;
  logs.value.push(`> ${msg.trim()}`);
  scrollToBottomTerminal();
};

const toggleTerminal = () => {
  isTerminalExpanded.value = !isTerminalExpanded.value;
};

const clearSerialLogs = () => {
  serialMessages.value = [];
};

const scrollToBottomTerminal = () => {
  nextTick(() => {
    const container = document.querySelector(".terminal-body");
    if (container) container.scrollTop = container.scrollHeight;
  });
};

const scrollToBottomSerial = () => {
  if (!serialAutoscroll.value) return; // Respect autoscroll setting
  nextTick(() => {
    const container = document.querySelector(".serial-output");
    if (container) container.scrollTop = container.scrollHeight;
  });
};

const refreshPorts = async () => {
  try {
    const result = await window.electron.ipcRenderer.invoke("list-ports");
    ports.value = result;
    // Auto-select first if available and none selected
    if (ports.value.length > 0 && selectedPort.value === "Select a port...") {
      selectedPort.value = ports.value[0].path;
    }
  } catch (err) {
    addLog(`Error listing ports: ${err}`);
  }
};

const browseFirmware = async () => {
  try {
    const path = await window.electron.ipcRenderer.invoke("dialog:open-file");
    if (path) {
      firmwarePath.value = path;
      addLog(`Selected firmware: ${path}`);
    }
  } catch (err: any) {
    addLog(`Error opening file dialog: ${err.message}`);
  }
};

// 1. Upload Firmware
const uploadFirmware = async () => {
  if (isBusy.value) return;
  if (selectedPort.value === "Select a port...") {
    addLog("Error: No port selected");
    return;
  }
  if (!firmwarePath.value) {
    addLog("Error: No firmware file selected");
    return;
  }

  activeTab.value = "terminal";
  isBusy.value = true;
  addLog(`Starting Firmware Upload to ${selectedPort.value}...`);
  try {
    await window.electron.ipcRenderer.invoke("upload-firmware", {
      port: selectedPort.value,
      hexPath: firmwarePath.value,
      mcu: selectedMcu.value,
      baud: "115200",
    });
    addLog("Upload Complete!");
  } catch (e: any) {
    addLog(`Upload Failed: ${e.message}`);
  } finally {
    isBusy.value = false;
  }
};

// 2. Stop
const stopOperation = async () => {
  await window.electron.ipcRenderer.invoke("stop-operation");
  addLog("Operation stopped by user.");
  isBusy.value = false;
};

// 3. ISP Upload
const ispUpload = async () => {
  if (isBusy.value) return;
  if (!firmwarePath.value) {
    addLog("Error: No firmware file selected");
    return;
  }
  activeTab.value = "terminal";
  isBusy.value = true;
  addLog(`Starting ISP Upload using ${selectedIsp.value}...`);
  try {
    await window.electron.ipcRenderer.invoke("isp-upload", {
      programmer: selectedIsp.value,
      hexPath: firmwarePath.value,
      mcu: selectedMcu.value,
      port: selectedPort.value,
    });
    addLog("ISP Upload Complete!");
  } catch (e: any) {
    addLog(`ISP Upload Failed: ${e.message}`);
  } finally {
    isBusy.value = false;
  }
};

// 4. Burn Bootloader
const burnBootloader = async () => {
  if (isBusy.value) return;
  activeTab.value = "terminal";
  isBusy.value = true;
  addLog(`Burning Bootloader for ${selectedMcu.value}...`);
  try {
    await window.electron.ipcRenderer.invoke("burn-bootloader", {
      programmer: selectedIsp.value,
      mcu: selectedMcu.value,
      port: selectedPort.value,
    });
    addLog("Bootloader Burn Complete!");
  } catch (e: any) {
    addLog(`Burn Failed: ${e.message}`);
  } finally {
    isBusy.value = false;
  }
};

// 5. Test Wiring
const testWiring = async () => {
  if (isBusy.value) return;
  activeTab.value = "terminal";
  isBusy.value = true;
  addLog("Testing Wiring...");
  try {
    await window.electron.ipcRenderer.invoke("test-wiring", {
      programmer: selectedIsp.value,
      mcu: selectedMcu.value,
      port: selectedPort.value,
    });
    addLog("Wiring Test Success! (Avrdude connected)");
  } catch (e: any) {
    addLog(`Wiring Test Failed: ${e.message}`);
  } finally {
    isBusy.value = false;
  }
};

// 6. Serial Monitor Connect
const toggleSerial = async () => {
  if (serialConnected.value) {
    await window.electron.ipcRenderer.invoke("serial-disconnect");
    // State updated by event
  } else {
    if (selectedPort.value === "Select a port...") {
      addLog("Select a port first!");
      return;
    }
    addLog(`Connecting Serial to ${selectedPort.value}...`);
    clearSerialLogs(); // Auto-clear on connect
    const success = await window.electron.ipcRenderer.invoke("serial-connect", {
      port: selectedPort.value,
      baud: serialBaud.value,
    });
    if (success) {
      serialConnected.value = true;
      addLog("Serial Connected.");
    } else {
      addLog("Serial Connection Failed.");
    }
  }
};

const sendSerial = async () => {
  if (!serialConnected.value || !serialInput.value) return;

  let textToSend = serialInput.value;
  switch (serialEol.value) {
    case "Newline":
      textToSend += "\n";
      break;
    case "Carriage Return":
      textToSend += "\r";
      break;
    case "Both NL & CR":
      textToSend += "\r\n";
      break;
    case "No Line Ending":
    default:
      // No appending
      break;
  }

  await window.electron.ipcRenderer.invoke("serial-write", textToSend);
  // Echo local?
  serialMessages.value.push(`[TX] ${textToSend.trim()}`);
  serialInput.value = "";
  scrollToBottomSerial();
};
</script>

<style>
/* --- Design System --- */
:root {
  --bg-dark: #1a1a1a;
  --bg-panel: #242424;
  --bg-input: #111111;
  --primary-color: #00bcd4; /* Cyan/Teal */
  --primary-hover: #00acc1;
  --warning-color: #ff9800; /* Orange */
  --warning-hover: #f57c00;
  --danger-color: #f44336; /* Red */
  --danger-hover: #d32f2f;
  --success-color: #4caf50; /* Green */
  --text-main: #ffffff;
  --text-muted: #aaaaaa;
  --border-color: #333333;
}

/* --- Layout --- */
.app-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
  background-color: #1a1a1a;
  color: #fff;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  overflow: hidden;
}

.main-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  padding: 12px;
  flex: 0 1 auto; /* Allow shrinking/fitting, don't greedily take all space if bottom panel wants it */
  overflow-y: auto;
}

.column {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

/* --- Global Port Bar --- */
.global-port-section {
  background-color: #252d3a;
  padding: 20px 16px;
  border-bottom: 4px solid var(--warning-color);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
  z-index: 10;
}

.port-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.header-titles .section-title {
  color: var(--primary-color);
  font-weight: 700;
  font-size: 0.85rem;
  letter-spacing: 0.5px;
}

.header-titles .section-subtitle {
  color: var(--text-muted);
  font-size: 0.75rem;
}

.port-controls {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
}

.port-selector-wrapper {
  flex: 1;
  position: relative;
  display: flex;
  align-items: center;
  background-color: #1e242e;
  border-radius: 4px;
}

/* Removed .port-selector-wrapper .usb-icon and .port-select as we reused the standard classes */

.active-port-indicator {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  padding-left: 12px;
  border-left: 1px solid #3d4a5c;
  min-width: 120px;
  background: linear-gradient(
    135deg,
    rgba(0, 188, 212, 0.05),
    rgba(0, 188, 212, 0.02)
  );
  border-radius: 4px;
}

.status-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: #666;
  transition: all 0.3s ease;
}

.status-dot.active {
  background-color: var(--success-color);
  box-shadow: 0 0 8px rgba(76, 175, 80, 0.6);
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%,
  100% {
    box-shadow: 0 0 8px rgba(76, 175, 80, 0.6);
  }
  50% {
    box-shadow: 0 0 12px rgba(76, 175, 80, 0.8);
  }
}

.status-dot.disconnected {
  background-color: var(--danger-color);
  box-shadow: 0 0 8px rgba(244, 67, 54, 0.6);
  animation: pulse-warning 2s infinite;
}

@keyframes pulse-warning {
  0%,
  100% {
    box-shadow: 0 0 8px rgba(244, 67, 54, 0.6);
  }
  50% {
    box-shadow: 0 0 12px rgba(244, 67, 54, 0.8);
  }
}

.status-text .label {
  font-size: 0.65rem;
  color: var(--primary-color);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}
.status-text .value {
  font-size: 0.85rem;
  font-weight: 700;
  color: var(--text-main);
}

/* --- Common Panel Styles --- */
.panel {
  background-color: #242424;
  border-radius: 6px;
  border: 1px solid #333;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.panel-header {
  padding: 8px 12px;
  background-color: rgba(255, 255, 255, 0.03);
  font-size: 0.75rem;
  font-weight: 700;
  color: var(--primary-color);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  border-bottom: 1px solid #333;
}

.panel-content {
  padding: 12px;
}

/* --- Form Elements --- */
.input-label {
  display: block;
  font-size: 0.7rem;
  color: var(--text-muted);
  margin-bottom: 6px;
  text-transform: uppercase;
}

.text-input,
.custom-select {
  background-color: #111;
  color: white;
  border: 1px solid #333;
  border-radius: 4px;
  padding: 8px;
  font-size: 0.9rem;
  outline: none;
  width: 100%;
}

.custom-select {
  appearance: none;
  cursor: pointer;
}

.select-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.select-arrow {
  position: absolute;
  right: 12px;
  color: #666;
  pointer-events: none;
  font-size: 0.7rem;
}

.chip-icon,
.isp-icon {
  position: absolute;
  left: 10px;
  color: var(--primary-color);
  pointer-events: none;
  z-index: 1;
}

.select-wrapper select {
  padding-left: 36px;
}

/* --- Specific Components --- */
.file-input-group {
  display: flex;
  gap: 8px;
}

.file-input-wrapper {
  position: relative;
  flex: 1;
}

.file-input-wrapper .upload-icon {
  position: absolute;
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
  color: #666;
}

.text-input-with-icon {
  width: 100%;
  padding: 8px 8px 8px 36px;
  background-color: #111;
  border: 1px solid #333;
  border-radius: 4px;
  color: white;
}

/* --- Buttons --- */
.btn {
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  cursor: pointer;
  font-weight: 600;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: all 0.2s;
}

.btn-primary {
  background-color: #00bcd4;
  color: #000;
}
.btn-primary:hover {
  background-color: #00acc1;
}

.btn-secondary {
  background-color: transparent;
  border: 1px solid #00bcd4;
  color: #00bcd4;
}
.btn-secondary:hover {
  background-color: rgba(0, 188, 212, 0.1);
}

.btn-danger {
  background-color: #f44336;
  color: white;
}
.btn-danger:hover {
  background-color: #d32f2f;
}

.btn-warning {
  background-color: #ff9800;
  color: black;
}
.btn-warning:hover {
  background-color: #f57c00;
}

.btn-outline {
  background-color: transparent;
  border: 1px solid #444;
  color: var(--primary-color);
}
.btn-outline:hover {
  border-color: var(--primary-color);
}

.btn-large {
  width: 100%;
  padding: 12px;
  font-size: 1rem;
}

.buttons-stack {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

/* --- Left Column specific adjustments --- */
.firmware-panel,
.device-panel,
.actions-panel {
  /* Match screenshot structure */
}

/* --- Right Column specific adjustments --- */
.status-row {
  display: flex;
  align-items: center;
  gap: 12px;
}
.status-icon-large {
  color: #4caf50;
}
.success-text {
  color: #4caf50;
  font-weight: 700;
  font-size: 1.1rem;
}
.status-sub {
  font-size: 0.8rem;
  color: #888;
}

.full-width {
  width: 100%;
}
.mb-2 {
  margin-bottom: 8px;
}

/* --- Bottom Panel (Tabbed) --- */
.bottom-panel {
  background-color: #111;
  border-top: 1px solid #333;
  display: flex;
  flex-direction: column;
  flex: 1; /* 1 1 0% - strictly fill space, do not grow with content */
  min-height: 200px;
  overflow: hidden; /* Constrain children */
  flex-shrink: 0;
  transition: min-height 0.3s ease;
}

.bottom-panel.expanded {
  min-height: 600px;
}

.panel-tabs {
  display: flex;
  align-items: center;
  background-color: #1e1e1e;
  border-bottom: 1px solid #333;
  padding: 0 8px;
}

.tab-btn {
  background: transparent;
  border: none;
  color: #888;
  padding: 8px 12px;
  font-size: 0.75rem;
  font-weight: 600;
  cursor: pointer;
  border-bottom: 2px solid transparent;
  text-transform: uppercase;
  transition: all 0.2s;
}

.tab-btn:hover {
  color: #ccc;
}

.tab-btn.active {
  color: var(--primary-color);
  border-bottom-color: var(--primary-color);
}

.tab-spacer {
  flex: 1;
}

.terminal-controls {
  display: flex;
  align-items: center;
  gap: 12px;
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 0.75rem;
  color: #888;
}

.panel-body {
  flex: 1;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  position: relative;
}

.terminal-body {
  width: 100%; /* Ensure it spans the full width */
  padding: 8px 12px;
  overflow-y: auto;
  font-family: "Consolas", "Monaco", monospace;
  font-size: 0.85rem;
  color: #ff5252;
  line-height: 1.4;
  white-space: pre-wrap;
  word-break: break-all;
}

.log-line {
  color: #ff5252;
}
.prompt {
  margin-right: 6px;
  opacity: 0.7;
}

/* Serial Tab Styles */
.serial-body {
  background-color: #000;
}

.serial-output {
  flex: 1;
  width: 100%; /* Ensure it spans the full width */
  padding: 8px 12px;
  overflow-y: auto;
  font-size: 0.85rem;
  color: #4caf50;
  white-space: pre-wrap; /* Respect newlines and spaces */
  word-break: break-all; /* Break long words if necessary */
}

.serial-input-bar {
  display: flex;
  align-items: center;
  padding: 4px 8px;
  background-color: #1e1e1e;
  border-top: 1px solid #333;
}

.prompt-char {
  color: var(--primary-color);
  margin-right: 8px;
  font-weight: bold;
}

.text-input-noborder {
  flex: 1;
  background: transparent;
  border: none;
  color: white;
  outline: none;
  font-family: monospace;
}

.btn-icon {
  background: transparent;
  border: none;
  color: white;
  cursor: pointer;
  padding: 4px;
}
.btn-icon:hover {
  color: var(--primary-color);
}

/* Mini Serial Controls (in Header) */
.mini-serial-controls {
  display: flex;
  align-items: center;
  gap: 12px;
}

.mini-select-group {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.7rem;
}
.mini-select-group .label {
  color: var(--primary-color);
  font-weight: 600;
}

.mini-select {
  background: #111;
  border: 1px solid #333;
  color: #ccc;
  padding: 2px 4px;
  border-radius: 2px;
  font-size: 0.7rem;
  outline: none;
}

.btn-mini-primary {
  padding: 2px 8px;
  font-size: 0.7rem;
  background: var(--primary-color);
  color: #000;
  border: none;
  border-radius: 2px;
  font-weight: 600;
  cursor: pointer;
}
.btn-mini-primary:hover {
  background: var(--primary-hover);
}

.btn-mini-success {
  padding: 2px 8px;
  font-size: 0.7rem;
  background: var(--success-color);
  color: #fff;
  border: none;
  border-radius: 2px;
  font-weight: 600;
  cursor: pointer;
}
.btn-mini-success:hover {
  background: #43a047;
}

.btn-mini-danger {
  padding: 2px 8px;
  font-size: 0.7rem;
  background: var(--danger-color);
  color: #fff;
  border: none;
  border-radius: 2px;
  font-weight: 600;
  cursor: pointer;
}
.btn-mini-danger:hover {
  background: var(--danger-hover);
}

.btn-icon-tiny {
  background: none;
  border: none;
  color: #888;
  cursor: pointer;
  padding: 2px;
}

/* Scrollbar */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}
::-webkit-scrollbar-track {
  background: #1a1a1a;
}
::-webkit-scrollbar-thumb {
  background: #444;
  border-radius: 4px;
}
::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>
