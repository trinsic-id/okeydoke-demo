import { MemberLevel } from "../atoms/member";
import { ProduceType } from "../data/products";

export interface CredentialSchema {
    id: string;
    type: string;
}
export interface CredentialStatus {
    id: string;
    type: string;
    revocationListCredential: string;
    revocationListIndex: string;
}

// "credentialSubject": {
//   "type": "object",
//   "required": [
//       "id"
//   ],
//   "additionalProperties": false,
//   "properties": {
//       "id": {
//           "type": "string",
//           "format": "uri"
//       },
//       "address": {
//           "type": "string",
//           "description": "Mailing Address"
//       },
//       "state": {
//           "type": "string",
//           "description": "State"
//       },
//       "city": {
//           "type": "string",
//           "description": "City"
//       },
//       "certificationGrade": {
//           "type": "string",
//           "description": "Certification Grade"
//       },
//       "idNumber": {
//           "type": "string",
//           "description": "Federal ID Number"
//       },
//       "name": {
//           "type": "string",
//           "description": "Individual Owner Name, Partnership or Full Name of the Corporation"
//       },
//       "produceType": {
//           "type": "string",
//           "description": "Type of Produce"
//       },
//       "businessLogo": {
//           "type": "string",
//           "format": "uri",
//           "description": "Business Logo",
//           "$annotations": {
//               "trinsic/web.display_method": "inline",
//               "trinsic/file.content_type": "image"
//           }
//       }
//   }
// },

export interface CredentialSubject {
    id?: string;
    address?: string;
    certificationGrade?: MemberLevel;
    city?: string;
    idNumber?: string;
    name?: string;
    produceType?: ProduceType;
    state?: string;
    businessLogo?: string;
}

export interface CredentialProof {
    type: string;
    created: string;
    nonce: string;
    proofPurpose: string;
    proofValue: string;
    verificationMethod: string;
}

export interface CredentialDerivedProof {
    "@context": string[];
    id: string;
    type: string[];
    credentialSchema: CredentialSchema;
    credentialStatus: CredentialStatus;
    credentialSubject: CredentialSubject;
    issuanceDate: string;
    issuer: string;
    proof: CredentialProof;
}
