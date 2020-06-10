import { DateRange, Tag, Address, ContactInformation } from "./shared";
import { Transaction } from "./banking";

export interface ContractPartner {
    name: string;
	creditorIDs: string[];
	tags: Tag[];
	address: Address;
	contact: ContactInformation;
}

export interface Contract {
    id: string;
	customID: string;
	amount: number;
	amountConsistency: string;
	interval: string;
	hidden: boolean;
	active: boolean;
	partner: ContractPartner;
	forecastNextBooking: DateRange;
	Tags: Tag[];
	Transactions: Transaction[];
}