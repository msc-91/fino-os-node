export interface Tag {
    name: string;
    source: string;
}

export interface DateRange {
    from: string;
    to: string;
}

export interface ContactInformation {
	telephone: string[];
	fax: string[];
	email: string[];
	website: string;
}

export interface Address {
	street: string;
	streetAdditionalInfo: string;
	postcode: string;
	city: string;
	countryCode: string;
}