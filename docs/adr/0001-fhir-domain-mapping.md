# 1. FHIR Domain Mapping

Date: 2026-05-21

## Status

Accepted

## Context

Healins aims to provide a patient-controlled interoperability layer between fragmented healthcare systems. To ensure future compatibility with standard healthcare integrations (e.g., regional hospital databases, Epic, Cerner), we must align our internal data model with the HL7 FHIR (Fast Healthcare Interoperability Resources) standard, specifically version R4.

However, the internal domain of Healins also needs to remain intuitive for product development and user experience. 

Two specific mapping challenges emerged:
1. **Physical place vs Corporate Entity**: FHIR distinguishes between a `Location` (a physical place) and an `Organization` (a corporate entity). Our initial model used "Facility".
2. **Access Authorization**: Our initial model used "Permission" to describe a patient granting access to their records. FHIR uses `Consent`.

## Decision

We will align our core backend data models and REST endpoints with FHIR resources, but we will make the following conscious deviations/clarifications in our internal application language:

1. **Facility → Location**: We will retain the term "Facility" in our internal codebase (e.g., `facilities/` module) and UI because it is widely understood by our users. However, architecturally, a Facility represents a FHIR `Location`. 
2. **Network → Organization**: To support chains of clinics, we introduce the concept of a "Network" which maps to the FHIR `Organization` resource. An Organization oversees multiple Facilities (Locations).
3. **Permission → Consent**: We will retire the term "Permission" in the backend. We map this 1:1 to FHIR `Consent`. The backend module will be renamed from `permissions` to `consents`.

## Consequences

*   **Positive**: The system is now structurally ready for FHIR R4 interoperability out of the box when we hit Phase 3.
*   **Positive**: Clear separation of physical clinics (Facilities) and their parent bodies (Networks) prevents future permission and reporting headaches.
*   **Negative**: Developers must maintain mental mapping between the internal term "Facility" and the FHIR term "Location" when building integrations. (Mitigated by `CONTEXT.md`).
