import test from 'node:test';
import assert from 'node:assert/strict';
import {
  searchLegalDatabase,
  searchConstitution,
  retrieveGroundedSources,
  parseLegalAnswer,
  validateDraftForm
} from './legalLogic.ts';

test('searchLegalDatabase finds criminal law theft topics on keyword query', () => {
  const results = searchLegalDatabase('theft property stolen');
  assert.ok(results.length > 0, 'Expected at least one search result for theft');
  assert.equal(results[0].topic.id, 'theft-property-offences');
  assert.equal(results[0].categoryName, 'Criminal Law');
});

test('searchLegalDatabase finds cyber law on online fraud query', () => {
  const results = searchLegalDatabase('online financial fraud UPI');
  assert.ok(results.length > 0);
  assert.equal(results[0].topic.id, 'online-financial-fraud');
});

test('searchConstitution finds Article 14 by direct number', () => {
  const results = searchConstitution('14');
  assert.ok(results.length > 0);
  assert.equal(results[0].articleNumber, '14');
  assert.equal(results[0].title, 'Equality before law');
});

test('searchConstitution finds Article 21 by phrase personal liberty', () => {
  const results = searchConstitution('personal liberty');
  const found = results.some(a => a.articleNumber === '21');
  assert.ok(found, 'Article 21 should be found when querying personal liberty');
});

test('retrieveGroundedSources returns verified sources for traffic query', () => {
  const sources = retrieveGroundedSources('traffic police licence documents');
  assert.ok(sources.length > 0);
  assert.ok(sources.some(s => s.actName.includes('Motor Vehicles')));
});

test('validateDraftForm checks required fields correctly', () => {
  const checkPass = validateDraftForm(['reporterName', 'dateTime'], {
    reporterName: 'Anil Rao',
    dateTime: '12th Oct 2024'
  });
  assert.equal(checkPass.isValid, true);
  assert.equal(checkPass.missingFields.length, 0);

  const checkFail = validateDraftForm(['reporterName', 'location'], {
    reporterName: 'Anil Rao',
    location: ''
  });
  assert.equal(checkFail.isValid, false);
  assert.deepEqual(checkFail.missingFields, ['location']);
});

test('parseLegalAnswer extracts short answer and what the law says', () => {
  const mockAI = `1. Short Answer
Traffic police can ask you to produce your driving licence and RC.

2. What the Law Says
The Motor Vehicles Act, 1988 mandates producing valid vehicle documents.

4. What You Can Do Next
- Keep DigiLocker handy.
- Ask for official e-challan.

6. Important Limitations
This is informational and not formal legal advice.`;

  const parsed = parseLegalAnswer(mockAI);
  assert.ok(parsed.shortAnswer.includes('Traffic police can ask you'));
  assert.ok(parsed.whatTheLawSays.includes('Motor Vehicles Act'));
  assert.ok(parsed.whatYouCanDoNext.length >= 2);
  assert.ok(parsed.limitations.includes('informational'));
});
