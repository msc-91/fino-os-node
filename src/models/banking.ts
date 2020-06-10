import { Tag } from "./shared";

export interface Transaction {
    id: string;
	accountId: string;
	bookingDate: string;
	valueDate: string;
	currency: string;
	mref: string;
	purpose: string;
	booked: boolean;
	amount: number;
	counterPart: CounterPart;
	tags: Tag[];
	codes: Code[];
}

export interface CounterPart {
    bic: string;
	iban: string;
	creditorId: string;
	name: string;
}

export interface Code {
    value: string;
	type: string;
}