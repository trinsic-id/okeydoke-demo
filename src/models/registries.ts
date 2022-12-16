export interface CredentialTemplate {
    name: string;
}

export interface Issuer {
    name: string;
}

export interface TrustRegistryMembership {
    issuer: Issuer;
    credentialTemplate: CredentialTemplate;
}

export interface TrustRegistry {
    name: string;
    issuers: Issuer[];
    templates: CredentialTemplate[];
    memberships: TrustRegistryMembership[];
}
