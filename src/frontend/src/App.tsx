import React from "react";

const htmlContent = `<!DOCTYPE html>
<html lang="te">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=yes">
    <title>తెలుగు కీబోర్డ్ | పిన్ కోడ్ బటన్ | CA Calculator Tool</title>
    <style>
        * { box-sizing: border-box; font-family: 'Nirmala UI', 'Segoe UI', 'Noto Sans', system-ui, sans-serif; }
        body { background: linear-gradient(145deg, #1e2b3a, #0f1a24); display: flex; justify-content: center; align-items: flex-start; padding: 20px; margin: 0; color: #eef2f5; min-height: 100vh; }
        .main-container { width: 100%; max-width: 1300px; background: #1f2e3f; border-radius: 32px; padding: 24px 20px; box-shadow: 0 20px 40px rgba(0,0,0,0.6); }
        .app-header { display: flex; align-items: baseline; justify-content: space-between; margin-bottom: 16px; flex-wrap: wrap; }
        .app-header h1 { font-size: 1.8rem; font-weight: 500; margin: 0; background: linear-gradient(135deg, #fbbf24, #f59e0b); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
        .app-header small { color: #9ab3c9; font-size: 0.8rem; background: #1e2b37; padding: 4px 12px; border-radius: 40px; }
        .io-panel { background: #1a2632; border-radius: 24px; padding: 20px 18px; margin-bottom: 20px; border: 1px solid #3e5569; }
        textarea { width: 100%; min-height: 160px; font-size: 24px; background: #0d1922; border: 2px solid #2d445b; color: #ffffff; padding: 15px; border-radius: 20px; outline: none; resize: vertical; line-height: 1.4; font-family: monospace; }
        textarea:focus { border-color: #fbbf24; }
        .suggestions { display: flex; gap: 8px; flex-wrap: wrap; margin: 12px 0 6px; min-height: 40px; }
        .suggest-item { background: #10b981; padding: 6px 14px; border-radius: 30px; font-size: 1.1rem; cursor: pointer; color: white; transition: 0.1s; }
        .suggest-item:active { transform: scale(0.95); }
        .cons-panel { background: #1e2a3a; border-radius: 20px; padding: 12px; margin: 12px 0; border: 2px solid #f59e0b; animation: fadeIn 0.2s ease; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(-8px); } to { opacity: 1; transform: translateY(0); } }
        .panel-header { display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 8px; margin-bottom: 10px; }
        .panel-title { font-size: 0.85rem; font-weight: bold; color: #fbbf24; }
        .close-panel { background: #dc2626; border: none; color: white; padding: 3px 12px; border-radius: 25px; cursor: pointer; font-size: 0.7rem; }
        .cons-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(60px, 1fr)); gap: 6px; max-height: 250px; overflow-y: auto; padding: 4px; }
        .cons-card { background: linear-gradient(135deg, #2c4f6e, #1e3a5f); padding: 8px 4px; border-radius: 12px; text-align: center; cursor: pointer; border: 1px solid #f59e0b; transition: 0.05s; }
        .cons-card:active { transform: scale(0.96); background: #f59e0b; }
        .cons-char { font-size: 1.3rem; font-weight: bold; color: white; display: block; }
        .cons-name { font-size: 0.45rem; color: #ffd966; }
        .action-grid { display: flex; flex-wrap: wrap; gap: 8px; margin: 15px 0 10px; justify-content: center; }
        .action-btn { background: #2c4053; border: none; color: white; padding: 6px 14px; border-radius: 30px; font-size: 0.85rem; font-weight: 500; cursor: pointer; box-shadow: 0 3px 0 #15232e; transition: 0.05s; }
        .action-btn:active { transform: translateY(2px); box-shadow: 0 1px 0 #15232e; }
        .action-btn.calc { background: #b45309; }
        .action-btn.pin-btn { background: #0f5b7a; border-left: 3px solid #fbbf24; font-weight: bold; }
        .action-btn.ca-btn { background: #0f5f3a; border-left: 3px solid #fbbf24; font-weight: bold; }
        .keyboard-section { margin-top: 15px; }
        .section-title { color: #fbbf24; font-size: 0.9rem; font-weight: bold; margin: 15px 0 8px; padding-left: 8px; border-left: 3px solid #f59e0b; }
        .row { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 6px; justify-content: center; }
        .key { background: #263e52; padding: 10px 12px; border-radius: 14px; cursor: pointer; min-width: 50px; text-align: center; font-size: 1.2rem; font-weight: 500; box-shadow: 0 3px 0 #0d1f2c; transition: 0.05s; border: 1px solid #4e6f8a; color: #f5f9ff; }
        .key:active { transform: translateY(2px); box-shadow: 0 1px 0 #0d1f2c; }
        .key.special { background: #3b2e24; }
        .double-key { min-width: 80px; font-size: 1rem; }
        .gunintalu-box { margin-top: 12px; padding: 12px; background: #162635; border-radius: 16px; border: 1px solid #f59e0b; display: none; flex-wrap: wrap; gap: 8px; }
        .guni-key { background: #2c4f6e; padding: 8px 14px; border-radius: 12px; cursor: pointer; font-size: 1.1rem; transition: 0.05s; border: 1px solid #f59e0b; }
        .guni-key:active { transform: scale(0.95); background: #f59e0b; color: #1e2a3a; }
        .format-indicator { display: inline-flex; align-items: center; gap: 4px; background: #1f2e3f; padding: 3px 8px; border-radius: 25px; font-size: 0.65rem; }
        .led { width: 7px; height: 7px; border-radius: 50%; background-color: #6b7280; display: inline-block; }
        .led.active { background-color: #fbbf24; }
        .toast-msg { position: fixed; bottom: 20px; left: 50%; transform: translateX(-50%); background: #323232e6; color: white; padding: 5px 16px; border-radius: 25px; font-size: 0.75rem; z-index: 1000; pointer-events: none; transition: opacity 0.2s; }
        .example-row { background: #2c4053; padding: 5px 8px; border-radius: 12px; margin-top: 8px; font-size: 0.65rem; text-align: center; }
        @media (max-width: 600px) { .key { padding: 6px 8px; min-width: 42px; font-size: 1rem; } .cons-grid { grid-template-columns: repeat(auto-fill, minmax(48px, 1fr)); } }
    </style>
</head>
<body>
<div class="main-container">
    <div class="app-header">
        <h1>&#x1F524; తెలుగు కీబోర్డ్ + &#x1F4CC; PIN + &#x1F9FE; CA BUTTON</h1>
        <div style="display: flex; gap: 6px;">
            <div class="format-indicator">
                <span class="led" id="formatLed"></span>
                <span id="formatLabel">PIN Ready</span>
            </div>
            <small>Type 'k' or 'ka' &rarr; క వర్ణమాల</small>
        </div>
    </div>
    <div class="io-panel">
        <textarea id="text" placeholder="తెలుగు టైప్ చేయండి...&#10;&#x1F449; Click on any consonant to see its Gunintalu&#10;&#x1F449; CA BUTTON: Enter Plinth Area (e.g., 848) &rarr; Shows 30% value"></textarea>
        <div id="suggestions" class="suggestions"></div>
        <div id="consPanel" style="display: none;">
            <div class="cons-panel">
                <div class="panel-header">
                    <div class="panel-title">&#x1F524; తెలుగు హల్లులు (Consonants) - Click to Insert</div>
                    <button class="close-panel" onclick="hideConsonantPanel()">&#x2716; Close</button>
                </div>
                <div id="consGrid" class="cons-grid"></div>
            </div>
        </div>
        <div class="action-grid">
            <button class="action-btn" onclick="convertWord()">&#x1F524; Word</button>
            <button class="action-btn" onclick="convertFull()">&#x26A1; Full</button>
            <button class="action-btn" onclick="smartConvert()">&#x1F525; Smart</button>
            <button class="action-btn calc" onclick="convertSqYdsAtCursor()">&#x1F4D0; Sq.Yds</button>
            <button class="action-btn calc" onclick="convertGtsAtCursor()">&#x1F33E; GTS</button>
            <button class="action-btn pin-btn" onclick="getPinLocation()">&#x1F4CD; PIN</button>
            <button class="action-btn ca-btn" onclick="calculateCAArea()">&#x1F9FE; CA</button>
            <button class="action-btn" onclick="copyText()">&#x1F4CB; Copy</button>
            <button class="action-btn" onclick="clearText()">&#x1F5D1;&#xFE0F; Clear</button>
            <button class="action-btn" onclick="voice()">&#x1F3A4; Voice</button>
            <button class="action-btn" onclick="insertReference()">&#x1F4C4; Insert Ref</button>
        </div>
    </div>
    <div class="keyboard-section">
        <div class="section-title">&#x1F4D6; అచ్చులు (Vowels)</div>
        <div class="row">
            <div class="key" onclick="insertAtCursor('అ')">అ</div><div class="key" onclick="insertAtCursor('ఆ')">ఆ</div>
            <div class="key" onclick="insertAtCursor('ఇ')">ఇ</div><div class="key" onclick="insertAtCursor('ఈ')">ఈ</div>
            <div class="key" onclick="insertAtCursor('ఉ')">ఉ</div><div class="key" onclick="insertAtCursor('ఊ')">ఊ</div>
            <div class="key" onclick="insertAtCursor('ఎ')">ఎ</div><div class="key" onclick="insertAtCursor('ఏ')">ఏ</div>
            <div class="key" onclick="insertAtCursor('ఐ')">ఐ</div><div class="key" onclick="insertAtCursor('ఒ')">ఒ</div>
            <div class="key" onclick="insertAtCursor('ఓ')">ఓ</div><div class="key" onclick="insertAtCursor('ఔ')">ఔ</div>
            <div class="key" onclick="insertAtCursor('అం')">అం</div><div class="key" onclick="insertAtCursor('అః')">అః</div>
        </div>
        <div class="section-title">&#x270D;&#xFE0F; హల్లులు (Consonants) - Click to see Gunintalu</div>
        <div class="row" id="consonantsRow"></div>
        <div id="gunintaluBox" class="gunintalu-box"></div>
        <div class="section-title">&#x1F522; మాత్రలు &amp; సంఖ్యలు</div>
        <div class="row">
            <div class="key" onclick="insertAtCursor('ా')">ా</div><div class="key" onclick="insertAtCursor('ి')">ి</div>
            <div class="key" onclick="insertAtCursor('ీ')">ీ</div><div class="key" onclick="insertAtCursor('ు')">ు</div>
            <div class="key" onclick="insertAtCursor('ూ')">ూ</div><div class="key" onclick="insertAtCursor('ృ')">ృ</div>
            <div class="key" onclick="insertAtCursor('ె')">ె</div><div class="key" onclick="insertAtCursor('ే')">ే</div>
            <div class="key" onclick="insertAtCursor('ై')">ై</div><div class="key" onclick="insertAtCursor('ొ')">ొ</div>
            <div class="key" onclick="insertAtCursor('ో')">ో</div><div class="key" onclick="insertAtCursor('ౌ')">ౌ</div>
            <div class="key" onclick="insertAtCursor('ం')">ం</div><div class="key" onclick="insertAtCursor('ః')">ః</div>
        </div>
        <div class="row">
            <div class="key" onclick="insertAtCursor('1')">1</div><div class="key" onclick="insertAtCursor('2')">2</div>
            <div class="key" onclick="insertAtCursor('3')">3</div><div class="key" onclick="insertAtCursor('4')">4</div>
            <div class="key" onclick="insertAtCursor('5')">5</div><div class="key" onclick="insertAtCursor('6')">6</div>
            <div class="key" onclick="insertAtCursor('7')">7</div><div class="key" onclick="insertAtCursor('8')">8</div>
            <div class="key" onclick="insertAtCursor('9')">9</div><div class="key" onclick="insertAtCursor('0')">0</div>
            <div class="key special" onclick="handleRupeeAtCursor()">&#x20B9;</div>
        </div>
        <div class="row">
            <div class="key" onclick="insertAtCursor('.')">.</div><div class="key" onclick="insertAtCursor(',')">,</div>
            <div class="key" onclick="insertAtCursor('-')">-</div><div class="key" onclick="insertAtCursor('/')">&#x2F;</div>
            <div class="key" onclick="insertAtCursor(':')">:</div><div class="key" onclick="insertAtCursor(';')">;</div>
            <div class="key" onclick="insertAtCursor('(')">(</div><div class="key" onclick="insertAtCursor(')')">) </div>
            <div class="key double-key" onclick="insertAtCursor(' ')">&#x2423; Space</div>
            <div class="key double-key" onclick="backspaceAtCursor()">&#x232B; Back</div>
        </div>
    </div>
    <div class="example-row">
        &#x1F4A1; సూచన: హల్లుపై క్లిక్ చేస్తే గుణింతాలు | PIN కోసం 6 అంకెల నంబర్ సెలెక్ట్ చేసి &#x1F4CD; PIN నొక్కండి. ఉదా: 508248 &rarr; TELANGANA STATE: 508 248 (INDIA).<br>
        &#x1F9FE; <strong>CA BUTTON:</strong> Enter plinth area (like 848) then click CA &rarr; shows "848.00 Sq. Fts (Or) 78.78 Sq. Mtrs.&nbsp; 593.00 Sq. Fts (Or) 55.09 Sq. Mtrs." where second value = 70% of first (rounded to nearest integer).
    </div>
</div>
<div id="toastMsg" class="toast-msg" style="opacity:0;"></div>
<script>
    const ALL_TELUGU_CONSONANTS = ["క","ఖ","గ","ఘ","ఙ","చ","ఛ","జ","ఝ","ఞ","ట","ఠ","డ","ఢ","ణ","త","థ","ద","ధ","న","ప","ఫ","బ","భ","మ","య","ర","ల","వ","శ","ష","స","హ","ళ","క్ష","జ్ఞ","ఱ"];
    const gunintaluMap = {};
    const gunintaluSuffixes = ["","ా","ి","ీ","ు","ూ","ృ","ౄ","ె","ే","ై","ొ","ో","ౌ","ం","ః"];
    ALL_TELUGU_CONSONANTS.forEach(cons => { gunintaluMap[cons] = gunintaluSuffixes.map(suffix => cons + suffix); });
    const REFERENCE_TEXT = "SY. NO. 91/రు/1 & 91/రూ1/1";
    const textArea = document.getElementById("text");
    const suggestionsDiv = document.getElementById("suggestions");
    const consPanel = document.getElementById("consPanel");
    const consGrid = document.getElementById("consGrid");
    const gunintaluBox = document.getElementById("gunintaluBox");
    const consonantsRow = document.getElementById("consonantsRow");
    let panelVisible = false;
    function showToast(msg) {
        const toast = document.getElementById("toastMsg");
        toast.textContent = msg;
        toast.style.opacity = "1";
        setTimeout(() => { toast.style.opacity = "0"; }, 1800);
    }
    function buildConsonantsRow() {
        consonantsRow.innerHTML = "";
        ALL_TELUGU_CONSONANTS.forEach(cons => {
            const key = document.createElement("div");
            key.className = "key";
            key.innerText = cons;
            key.onclick = () => showGunintalu(cons);
            consonantsRow.appendChild(key);
        });
    }
    function showGunintalu(base) {
        gunintaluBox.innerHTML = "";
        gunintaluBox.style.display = "flex";
        const gunintaluList = gunintaluMap[base] || [base];
        gunintaluList.forEach(letter => {
            const btn = document.createElement("div");
            btn.className = "guni-key";
            btn.innerText = letter;
            btn.onclick = () => { insertAtCursor(letter); gunintaluBox.style.display = "none"; showToast('\u2713 "' + letter + '" added'); };
            gunintaluBox.appendChild(btn);
        });
        const closeBtn = document.createElement("div");
        closeBtn.className = "guni-key";
        closeBtn.style.background = "#dc2626";
        closeBtn.innerText = "\u2716 Close";
        closeBtn.onclick = () => { gunintaluBox.style.display = "none"; };
        gunintaluBox.appendChild(closeBtn);
    }
    function getSelectedPIN() {
        const start = textArea.selectionStart;
        const end = textArea.selectionEnd;
        const value = textArea.value;
        if (start !== end) {
            const selected = value.substring(start, end).trim();
            if (/^\d{6}$/.test(selected)) return { pin: selected, start: start, end: end };
        }
        let left = start - 1;
        let right = start;
        while (left >= 0 && value[left] >= "0" && value[left] <= "9") left--;
        left++;
        while (right < value.length && value[right] >= "0" && value[right] <= "9") right++;
        const numberStr = value.substring(left, right);
        if (numberStr && /^\d{6}$/.test(numberStr)) return { pin: numberStr, start: left, end: right };
        return null;
    }
    window.getPinLocation = function() {
        const pinInfo = getSelectedPIN();
        if (!pinInfo) { showToast("\u274C దయచేసి 6 అంకెల పిన్ కోడ్\u200Cను సెలెక్ట్ చేయండి (ఉదా: 508248)"); return; }
        const pin = pinInfo.pin;
        const formattedPin = pin.substring(0,3) + " " + pin.substring(3);
        const locationText = "TELANGANA STATE: " + formattedPin + " (INDIA).";
        replaceAtPosition(pinInfo.start, pinInfo.end, locationText);
        showToast("\uD83D\uDCCD " + locationText);
        checkForKOrKa();
    };
    window.calculateCAArea = function() {
        const start = textArea.selectionStart;
        const end = textArea.selectionEnd;
        const value = textArea.value;
        let numberStr = null;
        let numberStart = start;
        let numberEnd = end;
        if (start !== end) {
            const selected = value.substring(start, end).trim();
            if (/^\d+(\.\d+)?$/.test(selected)) { numberStr = selected; numberStart = start; numberEnd = end; }
        }
        if (!numberStr) {
            let left = start - 1;
            let right = start;
            while (left >= 0 && (value[left] >= "0" && value[left] <= "9" || value[left] === ".")) left--;
            left++;
            while (right < value.length && (value[right] >= "0" && value[right] <= "9" || value[right] === ".")) right++;
            const detectedNum = value.substring(left, right);
            if (detectedNum && !isNaN(parseFloat(detectedNum))) { numberStr = detectedNum; numberStart = left; numberEnd = right; }
        }
        if (!numberStr) {
            let userInput = prompt("Please enter PLINTH AREA (Sq. Ft):", "848");
            if (userInput === null) return;
            let parsed = parseFloat(userInput);
            if (isNaN(parsed)) { showToast("\u274C Invalid number. Please enter numeric plinth area."); return; }
            insertAtCursor(formatCAResult(parsed));
            showToast("\uD83E\uDDFE CA: 30% area computed for " + parsed + " Sq.Ft");
            checkForKOrKa();
            return;
        }
        const plinthArea = parseFloat(numberStr);
        if (isNaN(plinthArea)) { showToast("\u274C Could not detect valid plinth area number."); return; }
        replaceAtPosition(numberStart, numberEnd, formatCAResult(plinthArea));
        showToast("\uD83E\uDDFE Plinth " + plinthArea.toFixed(2) + " Sq.Ft \u2192 70% area added");
        checkForKOrKa();
    };
    function formatCAResult(plinthSqFt) {
        const firstSqFt = plinthSqFt;
        const firstSqMtr = firstSqFt * 0.092903;
        const secondSqFtRounded = Math.round(firstSqFt * 0.70);
        const secondSqMtr = secondSqFtRounded * 0.092903;
        return firstSqFt.toFixed(2) + " Sq. Fts (Or) " + firstSqMtr.toFixed(2) + " Sq. Mtrs.  " + secondSqFtRounded.toFixed(2) + " Sq. Fts (Or) " + secondSqMtr.toFixed(2) + " Sq. Mtrs.";
    }
    function replaceAtPosition(start, end, newText) {
        const value = textArea.value;
        textArea.value = value.substring(0, start) + newText + value.substring(end);
        textArea.selectionStart = textArea.selectionEnd = start + newText.length;
        textArea.focus();
    }
    function insertAtCursor(text) {
        const start = textArea.selectionStart;
        const end = textArea.selectionEnd;
        const value = textArea.value;
        textArea.value = value.substring(0, start) + text + value.substring(end);
        textArea.selectionStart = textArea.selectionEnd = start + text.length;
        textArea.focus();
        checkForKOrKa();
    }
    function backspaceAtCursor() {
        const start = textArea.selectionStart;
        const end = textArea.selectionEnd;
        if (start === end && start > 0) {
            textArea.value = textArea.value.substring(0, start - 1) + textArea.value.substring(start);
            textArea.selectionStart = textArea.selectionEnd = start - 1;
        } else if (start !== end) {
            textArea.value = textArea.value.substring(0, start) + textArea.value.substring(end);
            textArea.selectionStart = textArea.selectionEnd = start;
        }
        textArea.focus();
        checkForKOrKa();
    }
    function formatIndianCurrency(num) {
        if (num === undefined || isNaN(num)) return "0.00";
        let numStr = Number(num).toFixed(2);
        let parts = numStr.split(".");
        let integerPart = parts[0];
        let decimalPart = parts[1];
        let lastThree = integerPart.substring(integerPart.length - 3);
        let otherNumbers = integerPart.substring(0, integerPart.length - 3);
        let formatted;
        if (otherNumbers !== "") {
            let otherFormatted = otherNumbers.replace(/\\B(?=(\\d{2})+(?!\\d))/g, ",");
            formatted = otherFormatted + "," + lastThree;
        } else { formatted = lastThree; }
        return formatted + "." + decimalPart;
    }
    window.handleRupeeAtCursor = function() {
        const start = textArea.selectionStart;
        const value = textArea.value;
        let left = start - 1;
        let right = start;
        while (left >= 0 && (value[left] >= "0" && value[left] <= "9" || value[left] === ".")) left--;
        left++;
        while (right < value.length && (value[right] >= "0" && value[right] <= "9" || value[right] === ".")) right++;
        const numberStr = value.substring(left, right);
        if (numberStr && !isNaN(parseFloat(numberStr))) {
            const formatted = formatIndianCurrency(parseFloat(numberStr));
            replaceAtPosition(left, right, "\u20B9" + formatted);
            showToast("\u2705 \u20B9" + formatted);
        } else { insertAtCursor("\u20B9"); showToast("\u20B9 symbol inserted"); }
        checkForKOrKa();
    };
    window.convertSqYdsAtCursor = function() {
        const start = textArea.selectionStart;
        const value = textArea.value;
        let left = start - 1;
        let right = start;
        while (left >= 0 && (value[left] >= "0" && value[left] <= "9" || value[left] === ".")) left--;
        left++;
        while (right < value.length && (value[right] >= "0" && value[right] <= "9" || value[right] === ".")) right++;
        const numberStr = value.substring(left, right);
        if (numberStr && !isNaN(parseFloat(numberStr))) {
            const num = parseFloat(numberStr);
            const sqm = num * 0.836127;
            replaceAtPosition(left, right, num.toFixed(2) + " Sq.Yds (Or) " + sqm.toFixed(2) + " Sq.Mtrs.");
            showToast("\u2705 " + num + " Sq.Yds converted");
        } else { showToast("Please place cursor on a number"); }
        checkForKOrKa();
    };
    window.convertGtsAtCursor = function() {
        const start = textArea.selectionStart;
        const value = textArea.value;
        let left = start - 1;
        let right = start;
        while (left >= 0 && (value[left] >= "0" && value[left] <= "9" || value[left] === ".")) left--;
        left++;
        while (right < value.length && (value[right] >= "0" && value[right] <= "9" || value[right] === ".")) right++;
        const numberStr = value.substring(left, right);
        if (numberStr && !isNaN(parseFloat(numberStr))) {
            const num = parseFloat(numberStr);
            const sqMtrs = num * 101.17;
            replaceAtPosition(left, right, num.toFixed(2) + " Guntas (Or) " + sqMtrs.toFixed(2) + " Sq.Mtrs.");
            showToast("\u2705 " + num + " Guntas converted to Sq.Mtrs.");
        } else { showToast("Please place cursor on a number"); }
        checkForKOrKa();
    };
    function renderConsonants() {
        consGrid.innerHTML = "";
        ALL_TELUGU_CONSONANTS.forEach(cons => {
            const card = document.createElement("div");
            card.className = "cons-card";
            card.innerHTML = "<div class='cons-char'>" + cons + "</div><div class='cons-name'>హల్లు</div>";
            card.onclick = () => { insertAtCursor(cons); showToast('\u2713 "' + cons + '" added'); };
            consGrid.appendChild(card);
        });
    }
    function showConsonantPanel() { if (!panelVisible) { renderConsonants(); consPanel.style.display = "block"; panelVisible = true; } }
    window.hideConsonantPanel = function() { consPanel.style.display = "none"; panelVisible = false; };
    function checkForKOrKa() {
        const value = textArea.value;
        if (!value) { if (panelVisible) hideConsonantPanel(); return; }
        const lastChar = value[value.length - 1] || "";
        const lastTwo = value.slice(-2).toLowerCase();
        if (lastChar === "k" || lastChar === "K" || lastTwo === "ka" || lastTwo === "kA" || lastChar === "క") showConsonantPanel();
    }
    window.clearText = function() { textArea.value = ""; suggestionsDiv.innerHTML = ""; if(panelVisible) hideConsonantPanel(); gunintaluBox.style.display = "none"; showToast("Text cleared"); };
    window.copyText = function() { navigator.clipboard.writeText(textArea.value); showToast("Copied"); };
    window.smartConvert = function() {
        let t = textArea.value.toLowerCase();
        let rules=[["apparao","అప్పారావు"],["amma","అమ్మ"],["ksha","క్ష"],["jnya","జ్ఞ"],["aa","ా"],["ee","ీ"],["oo","ో"],["uu","ూ"],["ai","ై"],["au","ౌ"],["ka","క"],["ga","గ"],["cha","చ"],["ja","జ"],["ta","ట"],["tha","త"],["da","డ"],["dha","ధ"],["na","న"],["pa","ప"],["ba","బ"],["ma","మ"],["ya","య"],["ra","ర"],["la","ల"],["va","వ"],["sa","స"],["ha","హ"],["a","అ"],["i","ఇ"],["u","ఉ"],["e","ఎ"],["o","ఒ"]];
        rules.sort((a,b)=>b[0].length - a[0].length);
        for(let r of rules) t = t.split(r[0]).join(r[1]);
        t = t.replace(/[0-9]/g, d=>"౦౧౨౩౪౫౬౭౮౯"[d]);
        textArea.value = t;
        checkForKOrKa();
    };
    window.convertWord = async function() {
        let words = textArea.value.trim().split(/\\s+/);
        let last = words[words.length-1];
        if(!last) return;
        let url = "https://inputtools.google.com/request?text=" + last + "&itc=te-t-i0-und&num=1";
        try {
            let res = await fetch(url);
            let data = await res.json();
            if(data[0] === "SUCCESS") { words[words.length-1] = data[1][0][1][0]; textArea.value = words.join(" ") + " "; checkForKOrKa(); }
        } catch(e) {}
    };
    window.convertFull = async function() {
        let txt = textArea.value.trim();
        if(!txt) return;
        let url = "https://inputtools.google.com/request?text=" + txt + "&itc=te-t-i0-und&num=1";
        try {
            let res = await fetch(url);
            let data = await res.json();
            if(data[0] === "SUCCESS") textArea.value = data[1][0][1][0];
            checkForKOrKa();
        } catch(e) {}
    };
    window.insertReference = function() { insertAtCursor(REFERENCE_TEXT); showToast("Reference inserted"); };
    async function fetchTransliteration(word) {
        if(!word) return [];
        const url = "https://inputtools.google.com/request?text=" + word + "&itc=te-t-i0-und&num=5";
        try {
            let res = await fetch(url);
            let data = await res.json();
            if(data[0] === "SUCCESS") return data[1][0][1];
        }catch(e){}
        return [];
    }
    textArea.addEventListener("input", async function() {
        let words = textArea.value.split(/\\s+/);
        let last = words[words.length-1];
        if(last && !last.startsWith("\u20B9")) {
            let list = await fetchTransliteration(last);
            suggestionsDiv.innerHTML = "";
            list.forEach(i => {
                let d = document.createElement("div");
                d.className = "suggest-item";
                d.innerText = i;
                d.onclick = () => { words[words.length-1] = i; textArea.value = words.join(" ") + " "; suggestionsDiv.innerHTML = ""; checkForKOrKa(); };
                suggestionsDiv.appendChild(d);
            });
        } else suggestionsDiv.innerHTML = "";
        checkForKOrKa();
    });
    window.voice = function() {
        if (!("webkitSpeechRecognition" in window)) { alert("Voice not supported"); return; }
        let rec = new webkitSpeechRecognition();
        rec.lang = "te-IN";
        rec.onresult = e => { insertAtCursor(" " + e.results[0][0].transcript); };
        rec.start();
    };
    buildConsonantsRow();
<\/script>
</body>
</html>`;

export default function App() {
  return (
    <iframe
      srcDoc={htmlContent}
      style={{ width: "100%", height: "100vh", border: "none" }}
      title="Telugu Keyboard"
    />
  );
}
