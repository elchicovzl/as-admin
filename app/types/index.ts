import { 
    Affiliate,
    ContributorType,
    Address,
    Phones,
    Media,
    Enum_Proccess,
    Esnum_Type_DocumentID,
    Enum_TypeAffiliate,
    Enum_TypePhones,
    TypesAffiliate
} from "@prisma/client";

export type SafeContributorType = Omit<ContributorType, "createdAt" | "updatedAt"> & {
    createdAt: string;
    updatedAt: string;
};

export type SafeAddress = Omit<Address, "createdAt" | "updatedAt"> & {
    createdAt: string;
    updatedAt: string;
};

export type SafePhones = Omit<Phones, "createdAt" | "updatedAt"> & {
    createdAt: string;
    updatedAt: string;
};

export type SafeAffiliate = Omit<Affiliate,
   "createdAt" | "updatedAt" | "dateBirth" | "dateAdmission" | "contributorType" | "address" | "phones" > & {
    
    createdAt: string;
    updatedAt: string;
    dateBirth: string;
    dateAdmission: string;
    contributorType: SafeContributorType;
    address: SafeAddress;
    phones: SafePhones;
};



