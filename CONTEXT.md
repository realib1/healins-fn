# Domain Glossary

This file defines the canonical vocabulary for the Healins project. It maps internal domain terminology to standard HL7 FHIR (R4) resource names to ensure interoperability and consistent architectural naming.

## Entities

| Healins Term | Description | FHIR Equivalent |
|---|---|---|
| **Patient** | The individual receiving care or whose health data is being managed. | `Patient` |
| **Clinician** | A healthcare professional (nurse, doctor, specialist) providing care. | `Practitioner` / `PractitionerRole` |
| **Encounter** | An interaction between a patient and a healthcare provider. (Formerly referred to as "Visit"). | `Encounter` |
| **Facility** | A physical clinic, hospital, or health outpost where care is provided. | `Location` |
| **Network** | The corporate entity or overall administrative body that owns a chain of Facilities. | `Organization` |
| **Medication** | A drug or treatment prescribed to a patient. | `MedicationRequest` / `MedicationAdministration` |
| **Consent** | A patient's granted authorization (previously called Permission) for a clinician to access their health records. | `Consent` |
| **Audit Log** | An immutable record of an event, such as a record being accessed or modified. | `AuditEvent` |
| **Access Session** | A time-bounded, active period during which a clinician holds cryptographic clearance to read a patient's records. | N/A (Internal security construct) |

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
