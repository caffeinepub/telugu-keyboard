import { useEffect, useRef, useState } from "react";
import "./App.css";

const ALL_TELUGU_CONSONANTS = [
  "క",
  "ఖ",
  "గ",
  "ఘ",
  "ఙ",
  "చ",
  "ఛ",
  "జ",
  "ఝ",
  "ఞ",
  "ట",
  "ఠ",
  "డ",
  "ఢ",
  "ణ",
  "త",
  "థ",
  "ద",
  "ధ",
  "న",
  "ప",
  "ఫ",
  "బ",
  "భ",
  "మ",
  "య",
  "ర",
  "ల",
  "వ",
  "శ",
  "ష",
  "స",
  "హ",
  "ళ",
  "క్ష",
  "జ్ఞ",
  "ఱ",
];

const GUNINTALU_SUFFIXES = [
  "",
  "ా",
  "ి",
  "ీ",
  "ు",
  "ూ",
  "ృ",
  "ౄ",
  "ె",
  "ే",
  "ై",
  "ొ",
  "ో",
  "ౌ",
  "ం",
  "ః",
];

const VOWELS = [
  "అ",
  "ఆ",
  "ఇ",
  "ఈ",
  "ఉ",
  "ఊ",
  "ఎ",
  "ఏ",
  "ఐ",
  "ఒ",
  "ఓ",
  "ఔ",
  "అం",
  "అః",
];
const MATRAS = ["ా", "ి", "ీ", "ు", "ూ", "ృ", "ె", "ే", "ై", "ొ", "ో", "ౌ", "ం", "ః"];
const DIGITS = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
const PUNCTS = [".", ",", "-", "/", ":", ";", "(", ")"];

function formatDateDMY() {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const today = new Date();
  return `${today.getDate()} ${months[today.getMonth()]} ${today.getFullYear()}`;
}

function formatIndianCurrency(num: number): string {
  if (Number.isNaN(num)) return "0.00";
  const numStr = Number(num).toFixed(2);
  const parts = numStr.split(".");
  const integerPart = parts[0];
  const decimalPart = parts[1];
  const lastThree = integerPart.substring(integerPart.length - 3);
  const otherNumbers = integerPart.substring(0, integerPart.length - 3);
  let formatted: string;
  if (otherNumbers !== "") {
    const otherFormatted = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",");
    formatted = `${otherFormatted},${lastThree}`;
  } else {
    formatted = lastThree;
  }
  return `${formatted}.${decimalPart}`;
}

function convertNumberToWords(amount: number): string {
  if (amount === 0) return "Zero Rupees";
  const ones = [
    "",
    "One",
    "Two",
    "Three",
    "Four",
    "Five",
    "Six",
    "Seven",
    "Eight",
    "Nine",
  ];
  const tensArr = [
    "",
    "",
    "Twenty",
    "Thirty",
    "Forty",
    "Fifty",
    "Sixty",
    "Seventy",
    "Eighty",
    "Ninety",
  ];
  const teens = [
    "Ten",
    "Eleven",
    "Twelve",
    "Thirteen",
    "Fourteen",
    "Fifteen",
    "Sixteen",
    "Seventeen",
    "Eighteen",
    "Nineteen",
  ];
  function numToWords(n: number): string {
    if (n < 10) return ones[n];
    if (n < 20) return teens[n - 10];
    const ten = Math.floor(n / 10);
    const unit = n % 10;
    return `${tensArr[ten]}${unit > 0 ? ` ${ones[unit]}` : ""}`;
  }
  function convertThreeDigits(n: number): string {
    if (n === 0) return "";
    if (n < 100) return numToWords(n);
    const hundred = Math.floor(n / 100);
    const rest = n % 100;
    return `${ones[hundred]} Hundred${rest > 0 ? ` ${numToWords(rest)}` : ""}`;
  }
  const numStr = amount.toString();
  let rupees = 0;
  let paise = 0;
  if (numStr.includes(".")) {
    const parts = numStr.split(".");
    rupees = Number.parseInt(parts[0]);
    paise = Number.parseInt(parts[1].padEnd(2, "0").substring(0, 2));
  } else {
    rupees = Number.parseInt(numStr);
  }
  let result = "";
  const crore = Math.floor(rupees / 10000000);
  if (crore > 0) {
    result += `${numToWords(crore)} Crore `;
    rupees %= 10000000;
  }
  const lakh = Math.floor(rupees / 100000);
  if (lakh > 0) {
    result += `${numToWords(lakh)} Lakh `;
    rupees %= 100000;
  }
  const thousand = Math.floor(rupees / 1000);
  if (thousand > 0) {
    result += `${numToWords(thousand)} Thousand `;
    rupees %= 1000;
  }
  if (rupees > 0) {
    result += `${convertThreeDigits(rupees)} `;
  }
  result = `${result.trim()} Rupees`;
  if (paise > 0) result += ` and ${convertThreeDigits(paise)} Paise`;
  return `${result} Only`;
}

function Key({
  label,
  onClick,
  className = "key",
}: { label: string; onClick: () => void; className?: string }) {
  return (
    <button type="button" className={className} onClick={onClick}>
      {label}
    </button>
  );
}

export default function App() {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const [textValue, setTextValue] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [panelVisible, setPanelVisible] = useState(false);
  const [gunintaluBase, setGunintaluBase] = useState<string | null>(null);

  const [expression, setExpression] = useState("");
  const [displayValue, setDisplayValue] = useState("₹0.00");
  const [calcDetails, setCalcDetails] = useState("");
  const [inWords, setInWords] = useState("In Words: Zero Rupees");
  const [history, setHistory] = useState<string[]>([]);
  const [currentRawValue, setCurrentRawValue] = useState(0);

  const [dateTimeStr, setDateTimeStr] = useState(formatDateDMY());
  const [toastMsg, setToastMsg] = useState("");
  const [toastVisible, setToastVisible] = useState(false);

  useEffect(() => {
    document.body.style.background =
      "linear-gradient(145deg, #1e2b3a, #0f1a24)";
    document.body.style.margin = "0";
    document.body.style.padding = "0";
    const interval = setInterval(() => setDateTimeStr(formatDateDMY()), 60000);
    return () => clearInterval(interval);
  }, []);

  function showToast(msg: string) {
    setToastMsg(msg);
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 1800);
  }

  function insertAtCursor(text: string) {
    const ta = textAreaRef.current;
    if (!ta) return;
    const start = ta.selectionStart;
    const end = ta.selectionEnd;
    const newVal =
      ta.value.substring(0, start) + text + ta.value.substring(end);
    setTextValue(newVal);
    requestAnimationFrame(() => {
      if (ta) {
        ta.selectionStart = ta.selectionEnd = start + text.length;
        ta.focus();
      }
    });
    checkForKOrKa(newVal);
  }

  function backspaceAtCursor() {
    const ta = textAreaRef.current;
    if (!ta) return;
    const start = ta.selectionStart;
    const end = ta.selectionEnd;
    let newVal: string;
    let newPos: number;
    if (start === end && start > 0) {
      newVal = ta.value.substring(0, start - 1) + ta.value.substring(start);
      newPos = start - 1;
    } else if (start !== end) {
      newVal = ta.value.substring(0, start) + ta.value.substring(end);
      newPos = start;
    } else {
      return;
    }
    setTextValue(newVal);
    requestAnimationFrame(() => {
      if (ta) {
        ta.selectionStart = ta.selectionEnd = newPos;
        ta.focus();
      }
    });
    checkForKOrKa(newVal);
  }

  function checkForKOrKa(val: string) {
    if (!val) {
      setPanelVisible(false);
      return;
    }
    const lastChar = val[val.length - 1] || "";
    const lastTwo = val.slice(-2).toLowerCase();
    if (
      lastChar === "k" ||
      lastChar === "K" ||
      lastTwo === "ka" ||
      lastTwo === "kA" ||
      lastChar === "క"
    ) {
      setPanelVisible(true);
    }
  }

  function getSelectedNumber() {
    const ta = textAreaRef.current;
    if (!ta) return null;
    const start = ta.selectionStart;
    const end = ta.selectionEnd;
    const value = ta.value;
    if (start !== end) {
      const selected = value.substring(start, end);
      const num = Number.parseFloat(selected);
      if (!Number.isNaN(num)) return { num, start, end };
    }
    let left = start - 1;
    let right = start;
    while (
      left >= 0 &&
      ((value[left] >= "0" && value[left] <= "9") || value[left] === ".")
    )
      left--;
    left++;
    while (
      right < value.length &&
      ((value[right] >= "0" && value[right] <= "9") || value[right] === ".")
    )
      right++;
    const numberStr = value.substring(left, right);
    if (numberStr && !Number.isNaN(Number.parseFloat(numberStr))) {
      return { num: Number.parseFloat(numberStr), start: left, end: right };
    }
    return null;
  }

  function replaceAtPosition(start: number, end: number, newText: string) {
    const ta = textAreaRef.current;
    if (!ta) return;
    const newVal =
      ta.value.substring(0, start) + newText + ta.value.substring(end);
    setTextValue(newVal);
    requestAnimationFrame(() => {
      if (ta) {
        ta.selectionStart = ta.selectionEnd = start + newText.length;
        ta.focus();
      }
    });
  }

  function handleRupeeAtCursor() {
    const numberInfo = getSelectedNumber();
    if (numberInfo) {
      const formatted = formatIndianCurrency(numberInfo.num);
      replaceAtPosition(numberInfo.start, numberInfo.end, `₹${formatted}`);
      showToast(`✅ ₹${formatted}`);
    } else {
      insertAtCursor("₹");
      showToast("₹ symbol inserted");
    }
  }

  function convertSqYdsAtCursor() {
    const info = getSelectedNumber();
    if (!info) {
      showToast("Please select or place cursor on a number");
      return;
    }
    const sqm = info.num * 0.836127;
    replaceAtPosition(
      info.start,
      info.end,
      `${info.num.toFixed(2)} Sq.Yds = ${sqm.toFixed(2)} Sq.Mtrs.`,
    );
    showToast(`✅ ${info.num} Sq.Yds = ${sqm.toFixed(2)} Sq.Mtrs`);
  }

  function convertGtsAtCursor() {
    const info = getSelectedNumber();
    if (!info) {
      showToast("Please select or place cursor on a number");
      return;
    }
    const sqm = info.num * 101.17141056;
    const acres = info.num / 40;
    replaceAtPosition(
      info.start,
      info.end,
      `${info.num.toFixed(2)} Gts = ${acres.toFixed(4)} Acres (${sqm.toFixed(2)} Sq.Mtrs)`,
    );
    showToast(`✅ ${info.num} Gts = ${acres.toFixed(4)} Acres`);
  }

  function copyText() {
    const ta = textAreaRef.current;
    if (ta) navigator.clipboard.writeText(ta.value);
    showToast("Copied");
  }

  function clearText() {
    setTextValue("");
    setSuggestions([]);
    setPanelVisible(false);
    setGunintaluBase(null);
    showToast("Text cleared");
  }

  function smartConvert() {
    let t = textValue.toLowerCase();
    const rules: [string, string][] = [
      ["apparao", "అప్పారావు"],
      ["amma", "అమ్మ"],
      ["ksha", "క్ష"],
      ["jnya", "జ్ఞ"],
      ["aa", "ా"],
      ["ee", "ీ"],
      ["oo", "ో"],
      ["uu", "ూ"],
      ["ai", "ై"],
      ["au", "ౌ"],
      ["ka", "క"],
      ["ga", "గ"],
      ["cha", "చ"],
      ["ja", "జ"],
      ["ta", "ట"],
      ["tha", "త"],
      ["da", "డ"],
      ["dha", "ధ"],
      ["na", "న"],
      ["pa", "ప"],
      ["ba", "బ"],
      ["ma", "మ"],
      ["ya", "య"],
      ["ra", "ర"],
      ["la", "ల"],
      ["va", "వ"],
      ["sa", "స"],
      ["ha", "హ"],
      ["a", "అ"],
      ["i", "ఇ"],
      ["u", "ఉ"],
      ["e", "ఎ"],
      ["o", "ఒ"],
    ];
    rules.sort((a, b) => b[0].length - a[0].length);
    for (const r of rules) t = t.split(r[0]).join(r[1]);
    t = t.replace(/[0-9]/g, (d) => "౦౧౨౩౪౫౬౭౮౯"[Number.parseInt(d)]);
    setTextValue(t);
    checkForKOrKa(t);
  }

  async function convertWord() {
    const words = textValue.trim().split(/\s+/);
    const last = words[words.length - 1];
    if (!last) return;
    try {
      const res = await fetch(
        `https://inputtools.google.com/request?text=${last}&itc=te-t-i0-und&num=1`,
      );
      const data = await res.json();
      if (data[0] === "SUCCESS") {
        words[words.length - 1] = data[1][0][1][0];
        const newVal = `${words.join(" ")} `;
        setTextValue(newVal);
        checkForKOrKa(newVal);
      }
    } catch (_e) {}
  }

  async function convertFull() {
    const txt = textValue.trim();
    if (!txt) return;
    try {
      const res = await fetch(
        `https://inputtools.google.com/request?text=${txt}&itc=te-t-i0-und&num=1`,
      );
      const data = await res.json();
      if (data[0] === "SUCCESS") {
        const newVal = data[1][0][1][0];
        setTextValue(newVal);
        checkForKOrKa(newVal);
      }
    } catch (_e) {}
  }

  async function handleTextInput(e: React.ChangeEvent<HTMLTextAreaElement>) {
    const val = e.target.value;
    setTextValue(val);
    const words = val.split(/\s+/);
    const last = words[words.length - 1];
    if (last && !last.startsWith("₹")) {
      try {
        const res = await fetch(
          `https://inputtools.google.com/request?text=${last}&itc=te-t-i0-und&num=5`,
        );
        const data = await res.json();
        if (data[0] === "SUCCESS") setSuggestions(data[1][0][1]);
        else setSuggestions([]);
      } catch (_e) {
        setSuggestions([]);
      }
    } else {
      setSuggestions([]);
    }
    checkForKOrKa(val);
  }

  function voice() {
    const SpeechRecognition = (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Voice not supported");
      return;
    }
    const rec = new SpeechRecognition();
    rec.lang = "te-IN";
    rec.onresult = (ev: any) => {
      insertAtCursor(` ${ev.results[0][0].transcript}`);
    };
    rec.start();
  }

  function calcDisplayStr(val: number) {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 2,
    }).format(val);
  }

  function updateDisplay(expr: string) {
    try {
      const evaluated = expr ? new Function(`return ${expr}`)() : 0;
      setCurrentRawValue(evaluated);
      setDisplayValue(calcDisplayStr(evaluated));
      setCalcDetails(expr ? `${expr} =` : "");
    } catch (_e) {
      setDisplayValue("Error");
    }
  }

  function appendNumber(num: string) {
    const newExpr = expression + num;
    setExpression(newExpr);
    updateDisplay(newExpr);
  }

  function appendOperator(op: string) {
    const newExpr = expression + op;
    setExpression(newExpr);
    updateDisplay(newExpr);
  }

  function appendDot() {
    const newExpr = `${expression}.`;
    setExpression(newExpr);
    updateDisplay(newExpr);
  }

  function clearAll() {
    setExpression("");
    setCurrentRawValue(0);
    setDisplayValue("₹0.00");
    setCalcDetails("");
    setInWords("In Words: Zero Rupees");
  }

  function clearEntry() {
    const newExpr = expression.slice(0, -1);
    setExpression(newExpr);
    updateDisplay(newExpr);
  }

  function calculate() {
    try {
      const result = new Function(`return ${expression}`)();
      setCurrentRawValue(result);
      setCalcDetails(`${expression} = ${formatIndianCurrency(result)}`);
      setDisplayValue(calcDisplayStr(result));
      const now = new Date();
      setHistory((prev) => [
        ...prev,
        `${calcDisplayStr(result)} (${formatDateDMY()} ${now.toLocaleTimeString()})`,
      ]);
      setExpression(result.toString());
    } catch (_e) {
      setDisplayValue("Error");
      setCalcDetails("Invalid expression");
    }
  }

  function convertToWords() {
    const num = Number.isNaN(currentRawValue) ? 0 : currentRawValue;
    setInWords(`In Words: ${convertNumberToWords(num)}`);
  }

  function clearWords() {
    setInWords("In Words: Zero Rupees");
  }
  function copyDisplay() {
    navigator.clipboard.writeText(displayValue);
    showToast("Display copied");
  }
  function copyWordsToClipboard() {
    navigator.clipboard.writeText(inWords.replace(/^In Words:\s*/, ""));
    showToast("Words copied");
  }
  function insertCalcToTelugu() {
    insertAtCursor(` ${displayValue}`);
    showToast("Result added");
  }

  const gunintaluList = gunintaluBase
    ? GUNINTALU_SUFFIXES.map((s) => gunintaluBase + s)
    : [];

  return (
    <div className="telugu-app-body">
      <div className="main-container">
        <div className="app-header">
          <h1>🔤 తెలుగు కీబోర్డ్ + గుణింతాలు + ₹ కాలిక్యులేటర్</h1>
          <div style={{ display: "flex", gap: "6px" }}>
            <div className="format-indicator">
              <span className="led" />
              <span>Normal</span>
            </div>
            <small>Type &apos;k&apos; or &apos;ka&apos; → క వర్ణమాల</small>
          </div>
        </div>

        {/* Input Area */}
        <div className="io-panel">
          <textarea
            ref={textAreaRef}
            className="telugu-textarea"
            value={textValue}
            onChange={handleTextInput}
            placeholder={
              "తెలుగు టైప్ చేయండి...\n👉 Type 'k' or 'ka' - All Telugu consonants appear\n👉 Click on any consonant (క, ఖ, గ etc.) to see its Gunintalu\n👉 Select a number, click ₹ or GTS or Sq.Yds"
            }
          />
          <div className="suggestions">
            {suggestions.map((s) => (
              <button
                type="button"
                key={s}
                className="suggest-item"
                onClick={() => {
                  const words = textValue.split(/\s+/);
                  words[words.length - 1] = s;
                  const newVal = `${words.join(" ")} `;
                  setTextValue(newVal);
                  setSuggestions([]);
                  checkForKOrKa(newVal);
                }}
              >
                {s}
              </button>
            ))}
          </div>

          {/* Consonant Panel */}
          {panelVisible && (
            <div className="cons-panel">
              <div className="panel-header">
                <div className="panel-title">
                  🔤 తెలుగు హల్లులు (Consonants) - Click to Insert
                </div>
                <button
                  type="button"
                  className="close-panel"
                  onClick={() => setPanelVisible(false)}
                >
                  ✖ Close
                </button>
              </div>
              <div className="cons-grid">
                {ALL_TELUGU_CONSONANTS.map((cons) => (
                  <button
                    type="button"
                    key={cons}
                    className="cons-card"
                    onClick={() => {
                      insertAtCursor(cons);
                      showToast(`✓ "${cons}" added`);
                    }}
                  >
                    <span className="cons-char">{cons}</span>
                    <span className="cons-name">హల్లు</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="action-grid">
            <button type="button" className="action-btn" onClick={convertWord}>
              🔤 Word
            </button>
            <button type="button" className="action-btn" onClick={convertFull}>
              ⚡ Full
            </button>
            <button type="button" className="action-btn" onClick={smartConvert}>
              🔥 Smart
            </button>
            <button
              type="button"
              className="action-btn calc"
              onClick={convertSqYdsAtCursor}
            >
              📐 Sq.Yds
            </button>
            <button
              type="button"
              className="action-btn calc"
              onClick={convertGtsAtCursor}
            >
              🌾 GTS
            </button>
            <button type="button" className="action-btn" onClick={copyText}>
              📋 Copy
            </button>
            <button type="button" className="action-btn" onClick={clearText}>
              🗑️ Clear
            </button>
            <button type="button" className="action-btn" onClick={voice}>
              🎤 Voice
            </button>
          </div>
        </div>

        {/* Keyboard Section */}
        <div className="keyboard-section">
          <div className="section-title">📖 అచ్చులు (Vowels)</div>
          <div className="row">
            {VOWELS.map((v) => (
              <Key key={v} label={v} onClick={() => insertAtCursor(v)} />
            ))}
          </div>

          <div className="section-title">
            ✍️ హల్లులు (Consonants) - Click to see Gunintalu
          </div>
          <div className="row">
            {ALL_TELUGU_CONSONANTS.map((cons) => (
              <Key
                key={cons}
                label={cons}
                onClick={() => setGunintaluBase(cons)}
              />
            ))}
          </div>

          {/* Gunintalu Box */}
          {gunintaluBase && (
            <div className="gunintalu-box" style={{ display: "flex" }}>
              {gunintaluList.map((letter) => (
                <button
                  type="button"
                  key={letter}
                  className="guni-key"
                  onClick={() => {
                    insertAtCursor(letter);
                    setGunintaluBase(null);
                    showToast(`✓ "${letter}" added`);
                  }}
                >
                  {letter}
                </button>
              ))}
              <button
                type="button"
                className="guni-key-close"
                onClick={() => setGunintaluBase(null)}
              >
                ✖ Close
              </button>
            </div>
          )}

          <div className="section-title">🔢 మాత్రలు &amp; సంఖ్యలు</div>
          <div className="row">
            {MATRAS.map((m) => (
              <Key key={m} label={m} onClick={() => insertAtCursor(m)} />
            ))}
          </div>
          <div className="row">
            {DIGITS.map((n) => (
              <Key key={n} label={n} onClick={() => insertAtCursor(n)} />
            ))}
            <Key
              label="₹"
              onClick={handleRupeeAtCursor}
              className="key special"
            />
          </div>
          <div className="row">
            {PUNCTS.map((p) => (
              <Key key={p} label={p} onClick={() => insertAtCursor(p)} />
            ))}
            <Key
              label="␣ Space"
              onClick={() => insertAtCursor(" ")}
              className="key double-key"
            />
            <Key
              label="⌫ Back"
              onClick={backspaceAtCursor}
              className="key double-key"
            />
          </div>
        </div>

        <div className="example-row">
          💡 సూచన: హల్లుపై క్లిక్ చేస్తే దాని గుణింతాలు కనిపిస్తాయి | Type &apos;k&apos; or
          &apos;ka&apos; for all consonants | నంబర్ సెలెక్ట్ చేసి ₹, Sq.Yds, GTS
        </div>

        {/* Calculator */}
        <div className="calculator-card">
          <div className="calc-header">
            💰 Indian Rupee Calculator
            <div className="calc-datetime">{dateTimeStr}</div>
          </div>
          <div className="calc-display">
            <span>{displayValue}</span>
            <button type="button" className="copy-btn" onClick={copyDisplay}>
              Copy
            </button>
          </div>
          <div className="calc-details">{calcDetails}</div>
          <div className="in-words-container">
            <span className="in-words">{inWords}</span>
            <button
              type="button"
              className="copy-words-btn"
              onClick={copyWordsToClipboard}
            >
              COPY
            </button>
          </div>
          <div className="buttons-grid">
            <button
              type="button"
              className="calc-btn orange"
              onClick={clearAll}
            >
              AC
            </button>
            <button
              type="button"
              className="calc-btn orange"
              onClick={clearEntry}
            >
              C
            </button>
            <button
              type="button"
              className="calc-btn orange"
              onClick={() => appendOperator("+")}
            >
              +
            </button>
            <button
              type="button"
              className="calc-btn orange"
              onClick={() => appendOperator("-")}
            >
              -
            </button>
            <button
              type="button"
              className="calc-btn gray"
              onClick={() => appendNumber("7")}
            >
              7
            </button>
            <button
              type="button"
              className="calc-btn gray"
              onClick={() => appendNumber("8")}
            >
              8
            </button>
            <button
              type="button"
              className="calc-btn gray"
              onClick={() => appendNumber("9")}
            >
              9
            </button>
            <button
              type="button"
              className="calc-btn orange"
              onClick={() => appendOperator("*")}
            >
              ×
            </button>
            <button
              type="button"
              className="calc-btn gray"
              onClick={() => appendNumber("4")}
            >
              4
            </button>
            <button
              type="button"
              className="calc-btn gray"
              onClick={() => appendNumber("5")}
            >
              5
            </button>
            <button
              type="button"
              className="calc-btn gray"
              onClick={() => appendNumber("6")}
            >
              6
            </button>
            <button
              type="button"
              className="calc-btn orange"
              onClick={() => appendOperator("/")}
            >
              ÷
            </button>
            <button
              type="button"
              className="calc-btn gray"
              onClick={() => appendNumber("1")}
            >
              1
            </button>
            <button
              type="button"
              className="calc-btn gray"
              onClick={() => appendNumber("2")}
            >
              2
            </button>
            <button
              type="button"
              className="calc-btn gray"
              onClick={() => appendNumber("3")}
            >
              3
            </button>
            <button
              type="button"
              className="calc-btn green"
              onClick={calculate}
            >
              =
            </button>
            <button
              type="button"
              className="calc-btn gray"
              onClick={() => appendNumber("0")}
            >
              0
            </button>
            <button type="button" className="calc-btn gray" onClick={appendDot}>
              .
            </button>
            <button
              type="button"
              className="calc-btn blue"
              onClick={convertToWords}
            >
              Words
            </button>
            <button type="button" className="calc-btn red" onClick={clearWords}>
              Clear
            </button>
          </div>
          <div className="calc-history">
            {history.map((h) => (
              <div key={h}>{h}</div>
            ))}
          </div>
          <button
            type="button"
            className="clear-history-btn"
            onClick={() => setHistory([])}
          >
            🧹 Clear History
          </button>
          <div style={{ textAlign: "center" }}>
            <button
              type="button"
              className="merge-insert"
              onClick={insertCalcToTelugu}
            >
              ➕ Insert result into Telugu text
            </button>
          </div>
        </div>
      </div>
      <div className="toast-msg" style={{ opacity: toastVisible ? 1 : 0 }}>
        {toastMsg}
      </div>
    </div>
  );
}
