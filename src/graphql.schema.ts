
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export type ClientType = "Personal" | "Company";
export type CurrencyEnum = "EUR" | "USD" | "GBP" | "JPY" | "AUD" | "CAD" | "CHF" | "CNY" | "SEK" | "NZD";
export type ContactType = "Email" | "Fax" | "Mobile" | "Phone";

export class MenuInput {
    name: string;
    slug: string;
    isVisible: boolean;
    onlyAdmin?: Nullable<boolean>;
    order: number;
    icon: string;
    parentId?: Nullable<number>;
}

export class MenuListInput {
    limit?: Nullable<number>;
    offset?: Nullable<number>;
    cursor?: Nullable<number>;
    sortBy?: Nullable<string>;
    sortOrder?: Nullable<string>;
    isVisible?: Nullable<boolean>;
}

export class LanguageListInput {
    limit?: Nullable<number>;
    offset?: Nullable<number>;
    sortBy?: Nullable<string>;
    sortOrder?: Nullable<string>;
    isAvailable?: Nullable<boolean>;
}

export class LanguageInput {
    code: string;
    name: string;
    isAvailable: boolean;
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

export class ClientInput {
    name: string;
    address: string;
    type: ClientType;
    city: string;
    state: string;
    country: string;
    zipCode: string;
    companyId: number;
    companyClientRoleId: number;
}

export class ClientListInput {
    companyId: number;
    limit?: Nullable<number>;
    offset?: Nullable<number>;
    cursor?: Nullable<number>;
    sortBy?: Nullable<string>;
    sortOrder?: Nullable<string>;
}

export class ClientContactInput {
    contact: string;
    name: string;
    type: ContactType;
    clientId: number;
}

export class ListClientDiscountInput {
    companyClientRoleId: number;
    categoryId?: Nullable<number>;
    productTypeId?: Nullable<number>;
    limit?: Nullable<number>;
    offset?: Nullable<number>;
    cursor?: Nullable<number>;
    sortBy?: Nullable<string>;
    sortOrder?: Nullable<string>;
}

export class ClientDiscountInput {
    companyClientRoleId: number;
    percentage: number;
    categoryId: number;
    productTypeId: number;
}

export class ClientRoleInput {
    name: string;
    companyId: number;
}

export class ClientRolesListInput {
    companyId: number;
    limit?: Nullable<number>;
    offset?: Nullable<number>;
    cursor?: Nullable<number>;
    sortBy?: Nullable<string>;
    sortOrder?: Nullable<string>;
}

export class CompanyInput {
    name: string;
    website: string;
    userIds?: Nullable<number>;
}

export class CompaniesListInput {
    limit?: Nullable<number>;
    offset?: Nullable<number>;
    cursor?: Nullable<number>;
    sortBy?: Nullable<string>;
    sortOrder?: Nullable<string>;
}

export class CompanyPermissionInput {
    companyRoleId: number;
    menuPermissions: CompanyPermissionMenuInput[];
}

export class CompanyPermissionMenuInput {
    menuId: number;
    read?: Nullable<boolean>;
    createUpdate?: Nullable<boolean>;
    delete?: Nullable<boolean>;
}

export class UpdateCompanyPermissions {
    id: number;
    input: CompanyPermissionMenuInput;
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

export class CategoryInput {
    companyId: number;
    names: CategoryNameInput[];
}

export class CategoryNameInput {
    name: string;
    productLanguagesInput: number;
}

export class CategoryListInput {
    companyId: number;
    limit?: Nullable<number>;
    offset?: Nullable<number>;
    cursor?: Nullable<number>;
    sortBy?: Nullable<string>;
    sortOrder?: Nullable<string>;
}

export class ProductInput {
    ref: string;
    companyId: number;
    productTypeId: number;
    languages: Nullable<ProductLanguagesInput>[];
    providers: Nullable<ProductProviderInput>[];
}

export class ProductLanguagesInput {
    id?: Nullable<number>;
    title: string;
    description: string;
    productLanguagesInput: number;
}

export class ProductProviderInput {
    id?: Nullable<number>;
    providerId: number;
}

export class ProductListInput {
    companyId: number;
    providerId?: Nullable<number>;
    limit?: Nullable<number>;
    offset?: Nullable<number>;
    cursor?: Nullable<number>;
    sortBy?: Nullable<string>;
    sortOrder?: Nullable<string>;
}

export class ProductProvidersInput {
    productId: number;
    providers: ProductProvidersPricesInput[];
}

export class ProductProvidersPricesInput {
    providerId: number;
    price: number;
}

export class UpdateProductProvidersPricesInput {
    productId: number;
    providerId: number;
    price: number;
}

export class ProductTypeInput {
    companyId: number;
    names: ProductTypeNameInput[];
}

export class ProductTypeNameInput {
    name: string;
    companyLanguageId: number;
}

export class ProductTypeListInput {
    companyId: number;
    limit?: Nullable<number>;
    offset?: Nullable<number>;
    cursor?: Nullable<number>;
    sortBy?: Nullable<string>;
    sortOrder?: Nullable<string>;
}

export class ProviderInput {
    name: string;
    website: string;
    address: string;
    city: string;
    state: string;
    country: string;
    zipCode: string;
    companyId: number;
}

export class ProviderListInput {
    companyId: number;
    limit?: Nullable<number>;
    offset?: Nullable<number>;
    cursor?: Nullable<number>;
    sortBy?: Nullable<string>;
    sortOrder?: Nullable<string>;
}

export class ProviderContactInput {
    contact: string;
    name: string;
    type: ContactType;
    providerId: number;
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
    userRoleId?: Nullable<number>;
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

export class Menu {
    id: number;
    name: string;
    slug: string;
    onlyAdmin: boolean;
    isVisible: boolean;
    parentId?: Nullable<number>;
    subMenu?: Nullable<Nullable<Menu>[]>;
    userPermission?: Nullable<CompanyPermission>;
    order?: Nullable<number>;
    icon?: Nullable<string>;
}

export class MenuResponsePaginated {
    menus?: Nullable<Nullable<Menu>[]>;
    totalCount?: Nullable<number>;
}

export class Language {
    id?: Nullable<number>;
    code?: Nullable<string>;
    name?: Nullable<string>;
    isAvailable?: Nullable<boolean>;
}

export class LanguagesResponsePaginated {
    languages?: Nullable<Nullable<Language>[]>;
    totalCount?: Nullable<number>;
}

export abstract class IQuery {
    abstract listMenus(input?: Nullable<MenuListInput>): Nullable<MenuResponsePaginated> | Promise<Nullable<MenuResponsePaginated>>;

    abstract listLanguages(input?: Nullable<LanguageListInput>): Nullable<LanguagesResponsePaginated> | Promise<Nullable<LanguagesResponsePaginated>>;

    abstract checkUsername(username?: Nullable<string>): Nullable<boolean> | Promise<Nullable<boolean>>;

    abstract getClient(id: number): Nullable<Client> | Promise<Nullable<Client>>;

    abstract listClients(input?: Nullable<ClientListInput>): Nullable<ClientResponsePaginated> | Promise<Nullable<ClientResponsePaginated>>;

    abstract listClientTypes(): Nullable<Nullable<string>[]> | Promise<Nullable<Nullable<string>[]>>;

    abstract listClientDiscount(input?: Nullable<ListClientDiscountInput>): Nullable<ClientDiscountPaginated> | Promise<Nullable<ClientDiscountPaginated>>;

    abstract getClientRole(id: number): Nullable<ClientRole> | Promise<Nullable<ClientRole>>;

    abstract listClientRoles(input?: Nullable<ClientRolesListInput>): Nullable<ClientRolesPaginated> | Promise<Nullable<ClientRolesPaginated>>;

    abstract getCompany(id: number): Nullable<Company> | Promise<Nullable<Company>>;

    abstract listCompanies(input?: Nullable<CompaniesListInput>): Nullable<CompanyResponsePaginated> | Promise<Nullable<CompanyResponsePaginated>>;

    abstract listCompanyRoles(companyId: number): Nullable<CompanyRolesResponsePaginated> | Promise<Nullable<CompanyRolesResponsePaginated>>;

    abstract getOffice(Id?: Nullable<number>): Nullable<Office> | Promise<Nullable<Office>>;

    abstract listOffices(input?: Nullable<OfficeListInput>): Nullable<OfficeResponsePaginated> | Promise<Nullable<OfficeResponsePaginated>>;

    abstract listCategories(input?: Nullable<CategoryListInput>): Nullable<CategoryResponsePaginated> | Promise<Nullable<CategoryResponsePaginated>>;

    abstract getProduct(id: number): Nullable<Product> | Promise<Nullable<Product>>;

    abstract listProducts(input?: Nullable<ProductListInput>): Nullable<ProductResponsePaginated> | Promise<Nullable<ProductResponsePaginated>>;

    abstract listProductTypes(input?: Nullable<ProductListInput>): Nullable<ProductTypeResponsePaginated> | Promise<Nullable<ProductTypeResponsePaginated>>;

    abstract getProvider(id: number): Nullable<Provider> | Promise<Nullable<Provider>>;

    abstract listProviders(input?: Nullable<ProviderListInput>): Nullable<ProviderListPaginated> | Promise<Nullable<ProviderListPaginated>>;

    abstract getUser(id: number): Nullable<User> | Promise<Nullable<User>>;

    abstract listUsers(input?: Nullable<ListUsers>): Nullable<UserResponsePaginated> | Promise<Nullable<UserResponsePaginated>>;

    abstract listContactTypes(): Nullable<Nullable<string>[]> | Promise<Nullable<Nullable<string>[]>>;

    abstract getUserRole(userId: number): Nullable<UserRole> | Promise<Nullable<UserRole>>;
}

export abstract class IMutation {
    abstract createMenu(input: MenuInput): Nullable<Menu> | Promise<Nullable<Menu>>;

    abstract updateMenu(id: number, input?: Nullable<MenuInput>): Nullable<Menu> | Promise<Nullable<Menu>>;

    abstract deleteMenu(id: number, forceDelete?: Nullable<boolean>): Nullable<string> | Promise<Nullable<string>>;

    abstract restoreMenu(id: number): Nullable<string> | Promise<Nullable<string>>;

    abstract createLanguage(input: LanguageInput): Nullable<Language> | Promise<Nullable<Language>>;

    abstract updateLanguage(id: number, input: LanguageInput): Nullable<Language> | Promise<Nullable<Language>>;

    abstract login(input?: Nullable<LoginInput>): Nullable<string> | Promise<Nullable<string>>;

    abstract signup(input?: Nullable<SignupInput>): Nullable<User> | Promise<Nullable<User>>;

    abstract createClient(input: ClientInput): Nullable<Client> | Promise<Nullable<Client>>;

    abstract updateClient(id: number, input: ClientInput): Nullable<Client> | Promise<Nullable<Client>>;

    abstract removeClient(id: number, forceDelete?: Nullable<boolean>): Nullable<string> | Promise<Nullable<string>>;

    abstract restoreClient(id: number): Nullable<string> | Promise<Nullable<string>>;

    abstract createClientContact(input: ClientContactInput): Nullable<ClientContact> | Promise<Nullable<ClientContact>>;

    abstract updateClientContact(id: number, input: ClientContactInput): Nullable<ClientContact> | Promise<Nullable<ClientContact>>;

    abstract removeClientContact(id: number, forceDelete?: Nullable<boolean>): Nullable<string> | Promise<Nullable<string>>;

    abstract restoreClientContact(id: number): Nullable<string> | Promise<Nullable<string>>;

    abstract createClientDiscount(input: ClientDiscountInput): Nullable<ClientDiscount> | Promise<Nullable<ClientDiscount>>;

    abstract updateClientDiscount(id: number, input: ClientDiscountInput): Nullable<ClientDiscount> | Promise<Nullable<ClientDiscount>>;

    abstract removeClientDiscount(id: number, forceDelete?: Nullable<boolean>): Nullable<string> | Promise<Nullable<string>>;

    abstract restoreClientDiscount(id: number): Nullable<string> | Promise<Nullable<string>>;

    abstract createClientRole(input: ClientRoleInput): Nullable<ClientRole> | Promise<Nullable<ClientRole>>;

    abstract updateClientRole(id: number, input: ClientRoleInput): Nullable<ClientRole> | Promise<Nullable<ClientRole>>;

    abstract deleteClientRole(id: number, forceDelete?: Nullable<boolean>): Nullable<string> | Promise<Nullable<string>>;

    abstract restoreClientRole(id: number): Nullable<string> | Promise<Nullable<string>>;

    abstract updateCompany(id: number, input: CompanyInput): Nullable<Company> | Promise<Nullable<Company>>;

    abstract deleteCompany(id: number): Nullable<string> | Promise<Nullable<string>>;

    abstract createPermissions(input: CompanyPermissionInput): Nullable<Nullable<CompanyPermission>[]> | Promise<Nullable<Nullable<CompanyPermission>[]>>;

    abstract updatePermissions(input: Nullable<UpdateCompanyPermissions>[]): Nullable<Nullable<CompanyPermission>[]> | Promise<Nullable<Nullable<CompanyPermission>[]>>;

    abstract removePermissions(id?: Nullable<number>): Nullable<string> | Promise<Nullable<string>>;

    abstract createCompanyRole(input: CompanyRoleInput): Nullable<CompanyRole> | Promise<Nullable<CompanyRole>>;

    abstract updateCompanyRole(id: number, input: UpdateCompanyRoleInput): Nullable<CompanyRole> | Promise<Nullable<CompanyRole>>;

    abstract deleteCompanyRole(id: number): Nullable<string> | Promise<Nullable<string>>;

    abstract createOffice(input?: Nullable<OfficeInput>): Nullable<OfficeResponse> | Promise<Nullable<OfficeResponse>>;

    abstract updateOffice(id?: Nullable<number>, input?: Nullable<OfficeInput>): Nullable<OfficeResponse> | Promise<Nullable<OfficeResponse>>;

    abstract deleteOffice(id?: Nullable<number>, forceDelete?: Nullable<boolean>): Nullable<string> | Promise<Nullable<string>>;

    abstract restoreOffice(id?: Nullable<number>): Nullable<string> | Promise<Nullable<string>>;

    abstract createCategory(input: CategoryInput): Nullable<Category> | Promise<Nullable<Category>>;

    abstract updateCategory(id: number, input: CategoryInput): Nullable<Category> | Promise<Nullable<Category>>;

    abstract removeCategory(id: number, forceDelete?: Nullable<boolean>): Nullable<string> | Promise<Nullable<string>>;

    abstract restoreCategory(id: number): Nullable<string> | Promise<Nullable<string>>;

    abstract createProduct(input: ProductInput): Nullable<Product> | Promise<Nullable<Product>>;

    abstract updateProduct(id: number, input: ProductInput): Nullable<Product> | Promise<Nullable<Product>>;

    abstract removeProduct(id: number, forceDelete?: Nullable<boolean>): Nullable<string> | Promise<Nullable<string>>;

    abstract restoreProduct(id: number): Nullable<string> | Promise<Nullable<string>>;

    abstract updateProductPrice(id: number, price: number): Nullable<ProductPrice> | Promise<Nullable<ProductPrice>>;

    abstract createOrRestoreProductProvider(id?: Nullable<number>, input?: Nullable<ProductProvidersInput>): Nullable<Nullable<ProductProvider>[]> | Promise<Nullable<Nullable<ProductProvider>[]>>;

    abstract updateProductProviderPrice(input?: Nullable<UpdateProductProvidersPricesInput>): Nullable<ProductProvider> | Promise<Nullable<ProductProvider>>;

    abstract createProductType(input: ProductTypeInput): Nullable<ProductType> | Promise<Nullable<ProductType>>;

    abstract updateProductType(id: number, input: ProductTypeInput): Nullable<ProductType> | Promise<Nullable<ProductType>>;

    abstract removeProductType(id: number, forceDelete?: Nullable<boolean>): Nullable<string> | Promise<Nullable<string>>;

    abstract restoreProductType(id: number): Nullable<string> | Promise<Nullable<string>>;

    abstract createProvider(input: ProviderInput): Nullable<Provider> | Promise<Nullable<Provider>>;

    abstract updateProvider(id: number, input: ProviderInput): Nullable<Provider> | Promise<Nullable<Provider>>;

    abstract removeProvider(id: number, forceDelete?: Nullable<boolean>): Nullable<string> | Promise<Nullable<string>>;

    abstract restoreProvider(id: number): Nullable<string> | Promise<Nullable<string>>;

    abstract createProviderContact(input?: Nullable<ProviderContactInput>): Nullable<ProviderContact> | Promise<Nullable<ProviderContact>>;

    abstract updateProviderContact(id?: Nullable<number>, input?: Nullable<ProviderContactInput>): Nullable<ProviderContact> | Promise<Nullable<ProviderContact>>;

    abstract removeProviderContact(id?: Nullable<number>): Nullable<string> | Promise<Nullable<string>>;

    abstract restoreProviderContact(id?: Nullable<number>): Nullable<string> | Promise<Nullable<string>>;

    abstract createUser(input: UserInput): UserResponse | Promise<UserResponse>;

    abstract updateUser(id: number, input?: Nullable<UserInput>): Nullable<UserResponse> | Promise<Nullable<UserResponse>>;

    abstract removeUser(id: number, forceDelete?: Nullable<boolean>): Nullable<string> | Promise<Nullable<string>>;

    abstract restoreUser(id: number): Nullable<string> | Promise<Nullable<string>>;

    abstract changeUserActiveStatus(id: number, status: boolean): Nullable<UserResponse> | Promise<Nullable<UserResponse>>;

    abstract createUserContact(input: UserContactInput): Nullable<UserContact> | Promise<Nullable<UserContact>>;

    abstract updateUserContact(id: number, input: UserContactInput): Nullable<UserContact> | Promise<Nullable<UserContact>>;

    abstract removeUserContact(id: number): Nullable<string> | Promise<Nullable<string>>;

    abstract createUserRole(input: NewUserRole): UserRole | Promise<UserRole>;

    abstract changeUserRole(userId: number, companyRoleId: number): UserRole | Promise<UserRole>;
}

export abstract class ISubscription {
    abstract menuChanged(): Nullable<Menu> | Promise<Nullable<Menu>>;

    abstract languageChanged(): Nullable<Language> | Promise<Nullable<Language>>;

    abstract userStatusChanged(): Nullable<UserResponse> | Promise<Nullable<UserResponse>>;

    abstract userRoleChanged(userId: number): Nullable<UserRole> | Promise<Nullable<UserRole>>;
}

export class Client {
    id: number;
    name: string;
    address: string;
    type: ClientType;
    city?: Nullable<string>;
    state?: Nullable<string>;
    country?: Nullable<string>;
    zipCode?: Nullable<string>;
    clientNr: number;
    contacts?: Nullable<Nullable<ClientContact>[]>;
    companyClientRoleId: number;
    role?: Nullable<ClientRole>;
}

export class ClientResponsePaginated {
    clients?: Nullable<Nullable<Client>[]>;
    totalCount?: Nullable<number>;
}

export class ClientContact {
    id?: Nullable<number>;
    contact?: Nullable<string>;
    type?: Nullable<ContactType>;
    client?: Nullable<Client>;
}

export class ClientDiscount {
    id?: Nullable<number>;
    companyClientRoleId?: Nullable<number>;
    percentage?: Nullable<number>;
    categoryId?: Nullable<number>;
    productTypeId?: Nullable<number>;
}

export class ClientDiscountPaginated {
    discounts?: Nullable<Nullable<ClientDiscount>[]>;
    totalCount?: Nullable<number>;
}

export class ClientRole {
    id: number;
    name?: Nullable<string>;
    company?: Nullable<Company>;
    clients?: Nullable<Nullable<Client>[]>;
    discounts?: Nullable<Nullable<ClientDiscount>[]>;
}

export class ClientRolesPaginated {
    roles?: Nullable<Nullable<ClientRole>[]>;
    totalCount?: Nullable<number>;
}

export class Company {
    id: number;
    name: string;
    website: string;
    offices?: Nullable<Nullable<Office>[]>;
    users?: Nullable<Nullable<User>[]>;
    roles?: Nullable<Nullable<CompanyRole>[]>;
}

export class CompanyResponsePaginated {
    companies?: Nullable<Nullable<Company>[]>;
    totalCount?: Nullable<number>;
}

export class CompanyPermission {
    id: number;
    read: boolean;
    createUpdate: boolean;
    delete: boolean;
    companyRoleId: number;
    menuId: number;
    menu?: Nullable<Menu>;
}

export class CompanyRole {
    id: number;
    name: string;
    minWages?: Nullable<number>;
    maxWages?: Nullable<number>;
    employeeCount?: Nullable<number>;
    permissions?: Nullable<Nullable<CompanyPermission>[]>;
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

export class Category {
    id: number;
    names?: Nullable<Nullable<CategoryName>[]>;
    products?: Nullable<Nullable<Product>[]>;
}

export class CategoryName {
    id?: Nullable<number>;
    ref?: Nullable<string>;
    name?: Nullable<string>;
    companyLanguageId?: Nullable<number>;
    language?: Nullable<Language>;
}

export class CategoryResponsePaginated {
    categories?: Nullable<Nullable<Category>[]>;
    totalCount?: Nullable<number>;
}

export class Product {
    id: number;
    ref?: Nullable<string>;
    languages?: Nullable<Nullable<ProductLanguage>[]>;
    providers?: Nullable<Nullable<Provider>[]>;
    categories?: Nullable<Nullable<Category>[]>;
    productTypeId: number;
    type?: Nullable<ProductType>;
    price?: Nullable<number>;
    prices?: Nullable<Nullable<ProductPrice>[]>;
    costPrices?: Nullable<Nullable<ProductProviderPrice>[]>;
    stock?: Nullable<Nullable<ProductStock>[]>;
}

export class ProductLanguage {
    id?: Nullable<number>;
    title?: Nullable<string>;
    description?: Nullable<string>;
    languageId?: Nullable<number>;
}

export class ProductPrice {
    id?: Nullable<number>;
    productId?: Nullable<number>;
    price?: Nullable<number>;
    curency?: Nullable<CurrencyEnum>;
}

export class ProductStock {
    id?: Nullable<number>;
    product?: Nullable<Product>;
    office?: Nullable<Office>;
    quantity?: Nullable<number>;
}

export class ProductResponsePaginated {
    products?: Nullable<Nullable<Product>[]>;
    totalCount?: Nullable<number>;
}

export class ProductProvider {
    id: number;
    products?: Nullable<Nullable<Product>[]>;
    providers?: Nullable<Nullable<ProductProviderPrice>[]>;
    prices?: Nullable<Nullable<ProductProviderPrice>[]>;
}

export class ProductProviderPrice {
    id?: Nullable<number>;
    providerId?: Nullable<number>;
    lastPrice?: Nullable<number>;
    prices?: Nullable<number>;
}

export class ProductType {
    id: number;
    names?: Nullable<Nullable<ProductTypeName>[]>;
    products?: Nullable<Nullable<Product>[]>;
}

export class ProductTypeName {
    id?: Nullable<number>;
    name?: Nullable<string>;
    companyLanguageId?: Nullable<number>;
}

export class ProductTypeResponsePaginated {
    types?: Nullable<Nullable<ProductType>[]>;
    totalCount?: Nullable<number>;
}

export class Provider {
    id: number;
    name?: Nullable<string>;
    address?: Nullable<string>;
    city?: Nullable<string>;
    state?: Nullable<string>;
    country?: Nullable<string>;
    zipCode?: Nullable<string>;
    providerNr?: Nullable<number>;
    contacts?: Nullable<Nullable<ProviderContact>[]>;
    productsCount?: Nullable<number>;
}

export class ProviderListPaginated {
    providers?: Nullable<Nullable<Provider>[]>;
    totalCount?: Nullable<number>;
}

export class ProviderContact {
    id?: Nullable<number>;
    name?: Nullable<string>;
    contact?: Nullable<string>;
    type?: Nullable<ContactType>;
    provider?: Nullable<Provider>;
}

export class User {
    id: number;
    firstName?: Nullable<string>;
    lastName?: Nullable<string>;
    userName?: Nullable<string>;
    isAdmin?: Nullable<boolean>;
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
    role?: Nullable<UserRole>;
}

export class UserResponsePaginated {
    users?: Nullable<Nullable<User>[]>;
    totalCount?: Nullable<number>;
}

export class UserResponse {
    user?: Nullable<User>;
    status?: Nullable<number>;
}

export class UserContact {
    id: number;
    contact: string;
    user?: Nullable<User>;
    type: ContactType;
}

export class UserRole {
    id: number;
    userId?: Nullable<number>;
    companyRoleId?: Nullable<number>;
}

type Nullable<T> = T | null;
