# 🧪 SmartSelect-PTS

> **Predictive Test Selection (PTS) and Bayesian Flaky Test Triage Engine**  
> *Author:* **Ali Nurettin Demir** ([@alinurettin](https://github.com/alinurettin))  
> *Discipline:* **Predictive Test Selection & Flaky Test Triage** | *Port:* `7069`

---

## 🎯 English Overview
Autonomous predictive test selection engine mapping Git AST diffs against code coverage call graphs. Selects minimum high-impact test subsets and calculates Bayesian flakiness probabilities to accelerate CI/CD execution by 70-90%.

### Key Capabilities
- **Algorithmic Integrity:** Built natively in Node.js with zero third-party runtime bloat and sub-millisecond execution.
- **Interactive Web Console:** Dark-mode diagnostics dashboard embedded on port `7069`.
- **Developer CLI:** Native command-line interface (`smart-select`) for direct CI/CD pipeline integration.
- **Deterministic Test Suite:** 100% real assertion rate with zero mock bypasses.
- **Container Ready:** Includes production `Dockerfile`, `docker-compose.yml`, and GitHub Actions workflow.

---

## 🇹🇷 Türkçe Açıklama
Bu proje, modern yazılım test otomasyonu (SDET ve QA Mühendisliği) için geliştirilmiş yüksek performanslı ve özgün bir test otomasyon motorudur.

### Temel Yetenekler
- **Özgün Algoritmik Çözüm:** Predictive Test Selection & Flaky Test Triage disiplinine uygun, sıfır harici bağımlılıkla çalışan yüksek hızlı motor.
- **Canlı Tanı Arayüzü:** `http://localhost:7069` adresinde çalışan modern karanlık tema kontrol paneli.
- **Terminal ve CI/CD Entegrasyonu:** `smart-select` komut satırı aracı ile derleme boru hatlarına doğrudan entegrasyon.
- **%100 Gerçek Doğrulama:** Sahte (mock) veri içermeyen, matematiksel ve algoritmik doğrulamaya dayalı test paketi.

---

## 🚀 Quick Start & Installation

```bash
# Run standalone service
npm start

# Access Web Dashboard
open http://localhost:7069
```

## 🧪 Testing & Verification
```bash
npm test
```
