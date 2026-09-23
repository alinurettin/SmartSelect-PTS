// SmartSelect-PTS: Predictive Test Selection & Flaky Triage Engine
class PredictiveTestSelector {
  /**
   * Select minimal test subset based on modified functions and call-graph coverage
   */
  static selectTests(modifiedSymbols = [], coverageMatrix = {}) {
    const selectedTests = new Set();
    const affectedReasons = new Map();

    for (const sym of modifiedSymbols) {
      // Find all tests that touch this symbol
      for (const [testName, touchedSymbols] of Object.entries(coverageMatrix)) {
        if (touchedSymbols.includes(sym)) {
          selectedTests.add(testName);
          if (!affectedReasons.has(testName)) {
            affectedReasons.set(testName, []);
          }
          affectedReasons.get(testName).push(sym);
        }
      }
    }

    const totalTestsCount = Object.keys(coverageMatrix).length;
    const selectedCount = selectedTests.size;
    const timeSavedPercent = totalTestsCount === 0 ? 0 : parseFloat((((totalTestsCount - selectedCount) / totalTestsCount) * 100).toFixed(1));

    return {
      totalTests: totalTestsCount,
      selectedCount,
      timeSavedPercent,
      selectedTests: Array.from(selectedTests).map(name => ({
        testName: name,
        triggeredBy: affectedReasons.get(name) || []
      }))
    };
  }

  /**
   * Calculate Bayesian flakiness score for test triage
   */
  static calculateFlakiness(history = []) {
    if (history.length < 2) {
      return { score: 0.0, flakinessVerdict: 'STABLE_INSUFFICIENT_DATA' };
    }

    let flips = 0; // State transitions from PASS to FAIL or vice-versa
    for (let i = 1; i < history.length; i++) {
      if (history[i].status !== history[i - 1].status) {
        flips++;
      }
    }

    // Bayesian flip frequency ratio
    const flipRate = flips / (history.length - 1);
    const score = parseFloat(Math.min(1.0, flipRate * 1.5).toFixed(3));

    let flakinessVerdict = 'ROCK_SOLID';
    if (score >= 0.5) flakinessVerdict = 'HIGHLY_FLAKY_QUARANTINE';
    else if (score >= 0.2) flakinessVerdict = 'SUSPICIOUS_FLAKY';

    return {
      runCount: history.length,
      flipsCount: flips,
      score,
      flakinessVerdict
    };
  }
}

module.exports = PredictiveTestSelector;