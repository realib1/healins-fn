# Domain Glossary

This file defines the canonical vocabulary for the Healins project. It maps internal domain terminology to standard HL7 FHIR (R4) resource names to ensure interoperability and consistent architectural naming.

## Entities

| Healins Term | Description | FHIR Equivalent |
|---|---|---|
| **Patient** | The individual receiving care or whose health data is being managed. | `Patient` |
| **Clinician** | A healthcare professional (nurse, doctor, specialist) providing care. The canonical model name. All references (Permission, AuditLog, Encounter) link via `clinicianId`. | `Practitioner` / `PractitionerRole` |
| **Encounter** | An interaction between a patient and a healthcare provider. (Formerly referred to as "Visit"). | `Encounter` |
| **Facility** | A physical clinic, hospital, or health outpost where care is provided. | `Location` |
| **Network** | The corporate entity or overall administrative body that owns a chain of Facilities. | `Organization` |
| **Medication** | A drug or treatment prescribed to a patient. | `MedicationRequest` / `MedicationAdministration` |
| **Permission** | A per-clinician, time-bounded grant authorizing a specific practitioner to access a patient's health records. Can be revoked by the patient at any time. | N/A (Internal access-control construct) |
| **Consent** | A patient's broad policy choice about a category of data sharing (e.g., research, government, inter-facility). Independent of individual clinician access. | `Consent` |
| **Clinical Event** | An immutable, append-only record of a clinical action (encounter created, diagnosis confirmed, medication prescribed). The event-sourcing ledger — source of truth for reconstructing patient clinical state. | N/A (Internal event-sourcing construct) |
| **Audit Log** | An immutable record of a data-access event (record viewed, exported, access granted/revoked). Serves security and compliance purposes. Distinct from ClinicalEvent. | `AuditEvent` |
| **Access Session** | A live, single-patient consultation. A clinician can only hold one active session at a time. Requires a valid Permission to start. Tracks what was accessed during the session for audit purposes. | N/A (Internal security construct) |
| **Medicine Stock** | A facility-level inventory record for a specific medicine, tracking current quantity, daily usage rate, and reorder thresholds. The basis for stockout forecasting. | `SupplyDelivery` / `SupplyRequest` (loosely) |

## Actions

| Term | Description |
|---|---|
| **Sign off** | The action taken by a licensed physician to verify and authorize a clinical record. |
| **Prescribe** | The action of assigning a medication to a patient. |
| **Grant Access** | The action taken by a patient to authorize an access session. |
| **Revoke Access** | The action taken by a patient to terminate an active access session. |

## Notes

- Code modules and databases should use the Healins Terms (e.g., `facilities/`, `patients/`) where they are more descriptive of the operational domain, but APIs that integrate externally should strictly map these to their FHIR Equivalents.
- Any intentional divergence from FHIR naming in the internal architecture must be documented in an ADR.
