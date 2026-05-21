/**
 * PROTOTYPE - WIPE ME
 * 
 * Question this answers: "How does the dynamic QR-based JWT handshake work for granting clinical access?"
 * 
 * How to run:
 * cd backend && npx ts-node ws4-prototype.ts
 */

import * as jwt from 'jsonwebtoken';

// --- 1. Simulation Setup ---

const SECRET_KEY = 'super-secret-patient-key-for-prototype';
const PATIENT_ID = 'PAT-9999';
const CLINICIAN_ID = 'DR-5555';

console.log("=== STARTING QR ACCESS REDESIGN PROTOTYPE ===\n");

// --- 2. Patient Device: Generate QR Token ---
// This runs on the Patient's mobile device when they hit "Generate QR"

function generatePatientQrToken(patientId: string): string {
  const payload = {
    sub: patientId,
    purpose: 'clinical_access_grant',
    // In a real scenario, this might also contain the device ID or a nonce to prevent replay attacks
    nonce: Math.random().toString(36).substring(2, 15)
  };

  // Token expires in exactly 5 minutes for security
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '5m' });
  console.log(`[PATIENT DEVICE] Generated short-lived QR Token: ${token.substring(0, 30)}...`);
  return token;
}

const qrToken = generatePatientQrToken(PATIENT_ID);


// --- 3. Clinician Device: Scan & Request Access ---
// The Clinician app scans the QR code and sends it to the backend

console.log(`\n[CLINICIAN DEVICE] Scanned QR Token and sending to backend for access...`);

function requestClinicalAccess(clinicianId: string, scannedToken: string) {
  try {
    // 3a. Backend validates the token
    const decoded = jwt.verify(scannedToken, SECRET_KEY) as jwt.JwtPayload;
    
    if (decoded.purpose !== 'clinical_access_grant') {
      throw new Error("Invalid token purpose");
    }

    const patientId = decoded.sub;

    console.log(`[BACKEND] Token validated for Patient: ${patientId}. Initiating access session.`);

    // 3b. Create an Access Session (valid for 24 hours)
    const sessionExpiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString();
    
    const accessSession = {
      sessionId: `SESS-${Math.floor(Math.random() * 10000)}`,
      patientId,
      clinicianId,
      expiresAt: sessionExpiresAt,
      status: 'active'
    };

    // 3c. Write an event to the Event Store (simulated)
    const event = {
      eventId: `EVT-${Math.floor(Math.random() * 10000)}`,
      patientId,
      type: 'AccessGranted',
      timestamp: new Date().toISOString(),
      actorId: patientId, // The patient technically authorized this via the QR code
      payload: { clinicianId, sessionId: accessSession.sessionId, expiresAt: sessionExpiresAt }
    };

    console.log(`[BACKEND] Access session created:`, accessSession);
    console.log(`[BACKEND] Event emitted to ledger:`, event);
    
    return { success: true, session: accessSession };

  } catch (error: any) {
    console.error(`[BACKEND] Access Denied: ${error.message}`);
    return { success: false, error: error.message };
  }
}

requestClinicalAccess(CLINICIAN_ID, qrToken);


// --- 4. Expiration Test ---
// Simulating scanning an expired token

console.log(`\n--- TESTING EXPIRED TOKEN ---`);
const expiredToken = jwt.sign({ sub: PATIENT_ID, purpose: 'clinical_access_grant' }, SECRET_KEY, { expiresIn: '-1m' });
requestClinicalAccess(CLINICIAN_ID, expiredToken);

console.log("\n=== PROTOTYPE COMPLETE ===");
