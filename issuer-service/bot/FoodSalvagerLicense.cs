// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

using System.Text.Json.Serialization;

namespace OkeyDokey.LicenseIssuerBot;

/// <summary>
/// This is our application state. Just a regular serializable .NET class.
/// </summary>
public class FoodSalvagerLicense
{
    public string Address { get; set; }
    public string City { get; set; }
    public string State { get; set; }
    public string IdNumber { get; set; }
    public string CertificationGrade { get; set; }
    public string Name { get; set; }
    public string ProduceType { get; set; }
}
