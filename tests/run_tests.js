const assert = require('assert');
const PredictiveTestSelector = require('../src/pts_engine');

console.log('Running test suite for SmartSelect-PTS...');

// Test 1: Predictive test selection from call-graph coverage
const mockCoverage = {
  'test_auth_login': ['AuthService.login', 'Token.generate', 'DB.findUser'],
  'test_auth_logout': ['AuthService.logout', 'Token.revoke'],
  'test_billing_charge': ['BillingService.charge', 'Stripe.createToken'],
  'test_billing_invoice': ['BillingService.generateInvoice', 'PDF.render']
};

const modified = ['Token.generate']; // Developer only changed Token.generate
const selection = PredictiveTestSelector.selectTests(modified, mockCoverage);

console.log('Selected Tests Result:', { selectedCount: selection.selectedCount, timeSaved: selection.timeSavedPercent + '%' });
assert.strictEqual(selection.selectedCount, 1);
assert.strictEqual(selection.selectedTests[0].testName, 'test_auth_login');
assert.strictEqual(selection.timeSavedPercent, 75.0); // 3 out of 4 tests skipped!

// Test 2: Bayesian flakiness scoring
const flakyHistory = [
  { status: 'PASS' }, { status: 'FAIL' }, { status: 'PASS' }, { status: 'FAIL' }, { status: 'PASS' }
];
const stableHistory = [
  { status: 'PASS' }, { status: 'PASS' }, { status: 'PASS' }, { status: 'PASS' }, { status: 'PASS' }
];

const flakyScore = PredictiveTestSelector.calculateFlakiness(flakyHistory);
const stableScore = PredictiveTestSelector.calculateFlakiness(stableHistory);

console.log('Flaky Score:', flakyScore);
console.log('Stable Score:', stableScore);

assert.strictEqual(stableScore.score, 0.0);
assert.strictEqual(stableScore.flakinessVerdict, 'ROCK_SOLID');
assert(flakyScore.score >= 0.5);
assert.strictEqual(flakyScore.flakinessVerdict, 'HIGHLY_FLAKY_QUARANTINE');

console.log('✅ ALL TESTS PASSED (100% Assertion Rate)');
