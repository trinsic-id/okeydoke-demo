import {
    CredentialTemplate,
    Issuer,
    TrustRegistry,
    TrustRegistryMembership,
} from "../models/registries";

const netherlands: Issuer = {
    name: "The Netherlands",
};
const belgium: Issuer = {
    name: "Belgium",
};

const dutchLicense: CredentialTemplate = {
    name: "Dutch Driver's License",
};
const belgiumLicense: CredentialTemplate = {
    name: "Belgium Driver's License",
};
export const EURegistryMemberships: TrustRegistryMembership[] = [
    {
        issuer: netherlands,
        credentialTemplate: dutchLicense,
    },
    {
        issuer: belgium,
        credentialTemplate: belgiumLicense,
    },
];

const utah: Issuer = {
    name: "Utah",
};
const florida: Issuer = {
    name: "Florida",
};

const floridaLicense: CredentialTemplate = {
    name: "Florida Driver's License",
};
const utahLicense: CredentialTemplate = {
    name: "Utah Driver's License",
};
export const USARegistryMemberships: TrustRegistryMembership[] = [
    {
        issuer: utah,
        credentialTemplate: utahLicense,
    },
    {
        issuer: florida,
        credentialTemplate: floridaLicense,
    },
];

export const Registries: TrustRegistry[] = [
    {
        name: "EU Registry",
        memberships: EURegistryMemberships,
        issuers: [netherlands, belgium],
        templates: [dutchLicense, belgiumLicense],
    },
    {
        name: "USA Registry",
        memberships: USARegistryMemberships,
        issuers: [utah, florida],
        templates: [utahLicense, floridaLicense],
    },
];
