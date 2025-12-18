
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export enum CurrencyEnum {
    EUR = "EUR",
    USD = "USD",
    GBP = "GBP",
    JPY = "JPY",
    AUD = "AUD",
    CAD = "CAD",
    CHF = "CHF",
    CNY = "CNY",
    SEK = "SEK",
    NZD = "NZD"
}

export enum ContactType {
    Email = "Email",
    Fax = "Fax",
    Mobile = "Mobile",
    Phone = "Phone"
}

export class LoginInput {
    username: string;
    password: string;
}

export class SignupUserInput {
    firstName: string;
    lastName: string;
    userName: string;
    password: string;
}

export class SignupCompanyInput {
    name: string;
    website: string;
}

export class SignupOfficeInput {
    name: string;
    address: string;
    city: string;
    state: string;
    country: string;
    zipCode: string;
}

export class SignupInput {
    user: SignupUserInput;
    company: SignupCompanyInput;
    office: SignupOfficeInput;
}

export class CompanyInput {
    name: string;
    website: string;
    userIds?: Nullable<number>;
}

export class CompanyRoleInput {
    name: string;
    minWages: number;
    maxWages: number;
    companyId: number;
}

export class UpdateCompanyRoleInput {
    name: string;
    minWages: number;
    maxWages: number;
}

export class OfficeInput {
    name: string;
    address: string;
    city: string;
    state: string;
    country: string;
    zipCode: string;
    companyId: number;
}

export class OfficeListInput {
    companyId: number;
    limit?: Nullable<number>;
    offset?: Nullable<number>;
    cursor?: Nullable<number>;
    sortBy?: Nullable<string>;
    sortOrder?: Nullable<string>;
}

export class UserInput {
    firstName: string;
    lastName: string;
    userName: string;
    password: string;
    address?: Nullable<string>;
    city?: Nullable<string>;
    state?: Nullable<string>;
    country?: Nullable<string>;
    zipCode?: Nullable<string>;
    companyId: number;
}

export class ListUsers {
    companyId: number;
    limit?: Nullable<number>;
    offset?: Nullable<number>;
    sortBy?: Nullable<string>;
    sortOrder?: Nullable<string>;
}

export class UserContactInput {
    contact: string;
    type: ContactType;
    userId: number;
}

export class NewUserRole {
    userId: number;
    companyRoleId: number;
}

export class UsernameValidationResponse {
    isValid?: Nullable<boolean>;
    status?: Nullable<number>;
}

export class LoginResponse {
    token?: Nullable<string>;
    status?: Nullable<number>;
}

export class SignupResponse {
    user?: Nullable<User>;
    status?: Nullable<number>;
}

export abstract class IQuery {
    abstract checkUsername(username?: Nullable<string>): Nullable<UsernameValidationResponse> | Promise<Nullable<UsernameValidationResponse>>;

    abstract getCompany(id: number): Nullable<Company> | Promise<Nullable<Company>>;

    abstract listCompanies(): Nullable<CompanyResponsePaginated> | Promise<Nullable<CompanyResponsePaginated>>;

    abstract listCompanyRoles(companyId: number): Nullable<CompanyRolesResponsePaginated> | Promise<Nullable<CompanyRolesResponsePaginated>>;

    abstract getOffice(Id?: Nullable<number>): Nullable<Office> | Promise<Nullable<Office>>;

    abstract listOffices(input?: Nullable<OfficeListInput>): Nullable<OfficeResponsePaginated> | Promise<Nullable<OfficeResponsePaginated>>;

    abstract getUser(id: number): Nullable<User> | Promise<Nullable<User>>;

    abstract listUsers(input?: Nullable<ListUsers>): Nullable<UserResponsePaginated> | Promise<Nullable<UserResponsePaginated>>;

    abstract listContactTypes(): Nullable<Nullable<string>[]> | Promise<Nullable<Nullable<string>[]>>;

    abstract getUserRole(userId: number): Nullable<UserRole> | Promise<Nullable<UserRole>>;
}

export abstract class IMutation {
    abstract login(input?: Nullable<LoginInput>): Nullable<LoginResponse> | Promise<Nullable<LoginResponse>>;

    abstract signup(input?: Nullable<SignupInput>): Nullable<SignupResponse> | Promise<Nullable<SignupResponse>>;

    abstract updateCompany(id: number, input: CompanyInput): Nullable<CompanyResponse> | Promise<Nullable<CompanyResponse>>;

    abstract deleteCompany(id: number): Nullable<CompanyResponse> | Promise<Nullable<CompanyResponse>>;

    abstract createCompanyRole(input: CompanyRoleInput): Nullable<CompanyRole> | Promise<Nullable<CompanyRole>>;

    abstract updateCompanyRole(id: number, input: UpdateCompanyRoleInput): Nullable<CompanyRole> | Promise<Nullable<CompanyRole>>;

    abstract deleteCompanyRole(id: number): Nullable<string> | Promise<Nullable<string>>;

    abstract createOffice(input?: Nullable<OfficeInput>): Nullable<OfficeResponse> | Promise<Nullable<OfficeResponse>>;

    abstract updateOffice(id?: Nullable<number>, input?: Nullable<OfficeInput>): Nullable<OfficeResponse> | Promise<Nullable<OfficeResponse>>;

    abstract deleteOffice(id?: Nullable<number>, forceDelete?: Nullable<boolean>): Nullable<string> | Promise<Nullable<string>>;

    abstract restoreOffice(id?: Nullable<number>): Nullable<string> | Promise<Nullable<string>>;

    abstract createUser(input: UserInput): UserResponse | Promise<UserResponse>;

    abstract updateUser(id: number, input?: Nullable<UserInput>): Nullable<UserResponse> | Promise<Nullable<UserResponse>>;

    abstract removeUser(id: number, forceDelete?: Nullable<boolean>): Nullable<string> | Promise<Nullable<string>>;

    abstract restoreUser(id: number): Nullable<string> | Promise<Nullable<string>>;

    abstract changeUserActiveStatus(id: number, status: boolean): Nullable<UserResponse> | Promise<Nullable<UserResponse>>;

    abstract createUserContact(input: UserContactInput): Nullable<UserContactResponse> | Promise<Nullable<UserContactResponse>>;

    abstract updateUserContact(id: number, input: UserContactInput): Nullable<UserContactResponse> | Promise<Nullable<UserContactResponse>>;

    abstract removeUserContact(id: number): Nullable<string> | Promise<Nullable<string>>;

    abstract createUserRole(input: NewUserRole): UserRole | Promise<UserRole>;
}

export class Company {
    id: number;
    name: string;
    website: string;
    offices?: Nullable<Nullable<Office>[]>;
    users?: Nullable<Nullable<User>[]>;
    roles?: Nullable<Nullable<CompanyRole>[]>;
}

export class CompanyResponse {
    company?: Nullable<Company>;
    status?: Nullable<number>;
}

export class CompanyResponsePaginated {
    companies?: Nullable<Nullable<Company>[]>;
    totalCount?: Nullable<number>;
}

export class CompanyRole {
    id: number;
    name: string;
    minWages?: Nullable<number>;
    maxWages?: Nullable<number>;
    employeeCount?: Nullable<number>;
}

export class CompanyRolesResponsePaginated {
    roles?: Nullable<Nullable<CompanyRole>[]>;
    totalCount?: Nullable<number>;
}

export class Office {
    id?: Nullable<number>;
    name?: Nullable<string>;
    address?: Nullable<string>;
    city?: Nullable<string>;
    state?: Nullable<string>;
    country?: Nullable<string>;
    zipCode?: Nullable<string>;
    company?: Nullable<Company>;
}

export class OfficeResponse {
    office?: Nullable<Office>;
    status?: Nullable<number>;
}

export class OfficeResponsePaginated {
    offices?: Nullable<Nullable<Office>[]>;
    totalCount?: Nullable<number>;
}

export class User {
    id: number;
    firstName?: Nullable<string>;
    lastName?: Nullable<string>;
    userName?: Nullable<string>;
    isActive?: Nullable<boolean>;
    address?: Nullable<string>;
    type?: Nullable<string>;
    city?: Nullable<string>;
    state?: Nullable<string>;
    country?: Nullable<string>;
    zipCode?: Nullable<string>;
    employeeNr?: Nullable<number>;
    companyId: number;
    company?: Nullable<Company>;
    contacts?: Nullable<Nullable<UserContact>[]>;
}

export class UserResponsePaginated {
    users?: Nullable<Nullable<User>[]>;
    totalCount?: Nullable<number>;
}

export class UserResponse {
    user?: Nullable<User>;
    status?: Nullable<number>;
}

export abstract class ISubscription {
    abstract userStatusChanged(): Nullable<UserResponse> | Promise<Nullable<UserResponse>>;
}

export class UserContact {
    id: number;
    contact: string;
    user?: Nullable<User>;
    type: ContactType;
}

export class UserContactResponse {
    contact: UserContact;
    status: number;
}

export class UserRole {
    id: number;
    userId?: Nullable<number>;
    companyRoleId?: Nullable<number>;
}

type Nullable<T> = T | null;
