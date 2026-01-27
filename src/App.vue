<template>
  <div class="app-container">
    <!-- Top Bar: Global Device Port -->
    <header class="global-port-section panel">
      <div class="port-header">
        <div class="header-titles">
          <div class="section-title">GLOBAL DEVICE PORT</div>
          <div class="section-subtitle">Unified port for all operations</div>
        </div>
        <div class="refresh-icon">
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
            <span class="chip-icon">
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
            <select class="custom-select">
              <option>Select a port...</option>
              <option>COM1</option>
              <option>COM3</option>
            </select>
            <div class="select-arrow">▼</div>
          </div>
        </div>

        <div class="active-port-indicator">
          <div class="status-dot"></div>
          <div class="status-text">
            <div class="label">Active Port</div>
            <div class="value">None</div>
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
                <span class="upload-icon">
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
                />
              </div>
              <button class="btn btn-secondary">Browse</button>
            </div>
          </div>
        </section>

        <!-- Device Configuration -->
        <section class="panel device-panel">
          <div class="panel-header">DEVICE CONFIGURATION</div>
          <div class="panel-content">
            <label class="input-label">TARGET BOARD</label>
            <div class="select-wrapper">
              <span class="chip-icon">
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
              <select class="custom-select">
                <option>Arduino Uno</option>
                <option>Arduino Nano</option>
                <option>Arduino Mega</option>
              </select>
              <div class="select-arrow">▼</div>
            </div>
          </div>
        </section>

        <!-- Primary Actions -->
        <section class="panel actions-panel">
          <div class="panel-header">PRIMARY ACTIONS</div>
          <div class="panel-content buttons-stack">
            <button class="btn btn-primary btn-large">
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
              Upload Firmware
            </button>
            <button class="btn btn-danger btn-large">
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
              <span class="isp-icon">
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
              <select class="custom-select">
                <option>USBtinyISP</option>
                <option>Arduino as ISP</option>
                <option>AVRISP mkII</option>
              </select>
              <div class="select-arrow">▼</div>
            </div>

            <div class="isp-actions">
              <button class="btn btn-primary full-width mb-2">
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
              <button class="btn btn-warning full-width mb-2">
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
              <button class="btn btn-outline full-width">
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
            <div class="mini-select-group">
              <span class="label">BAUD</span>
              <select class="mini-select">
                <option>115200</option>
              </select>
            </div>
            <div class="mini-select-group">
              <span class="label">EOL</span>
              <select class="mini-select">
                <option>Newline</option>
              </select>
            </div>
            <button class="btn-mini-primary">Connect</button>
          </div>

          <button class="btn-icon-tiny">
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
        <div class="log-line">
          <span class="prompt">&gt;</span>AVR QuickLoader v3.2.1 initialized
        </div>
        <div class="log-line"><span class="prompt">&gt;</span>System ready</div>
        <div class="log-line">
          <span class="prompt">&gt;</span>Waiting for command...
        </div>
      </div>

      <!-- Serial Tab Content -->
      <div class="panel-body serial-body" v-if="activeTab === 'serial'">
        <div class="serial-output monospace">
          <div class="placeholder-text">No messages received...</div>
        </div>
        <div class="serial-input-bar">
          <span class="prompt-char">&gt;</span>
          <input
            type="text"
            class="text-input-noborder"
            placeholder="Send data to device..."
          />
          <button class="btn-icon">
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
import { ref } from "vue";

const activeTab = ref("terminal");
</script>

<style scoped>
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
  flex: 1;
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
  padding: 12px 16px;
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
  padding-left: 12px;
  border-left: 1px solid #3d4a5c;
  min-width: 100px;
}

.status-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: #666;
}

.status-text .label {
  font-size: 0.65rem;
  color: var(--text-muted);
}
.status-text .value {
  font-size: 0.8rem;
  font-weight: 600;
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
  height: 200px; /* Increased height for serial */
  flex-shrink: 0;
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
  padding: 8px 12px;
  overflow-y: auto;
  font-family: "Consolas", "Monaco", monospace;
  font-size: 0.85rem;
  color: #ccc;
  line-height: 1.4;
}

.log-line {
  color: #4caf50;
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
  padding: 8px 12px;
  overflow-y: auto;
  font-size: 0.85rem;
  color: #ccc;
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
  color: #666;
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
