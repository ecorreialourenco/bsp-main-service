
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
    onlyAdmin: boolean;
    order: number;
    icon: string;
    parentId?: Nullable<string>;
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

export class Group {
    id?: Nullable<string>;
    name?: Nullable<string>;
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
    companyId: string;
    companyClientRoleId: string;
}

export class ClientListInput {
    companyId: string;
    search?: Nullable<string>;
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
    clientId: string;
}

export class ListClientDiscountInput {
    companyClientRoleId: string;
    categoryId?: Nullable<string>;
    productTypeId?: Nullable<string>;
    limit?: Nullable<number>;
    offset?: Nullable<number>;
    cursor?: Nullable<number>;
    sortBy?: Nullable<string>;
    sortOrder?: Nullable<string>;
}

export class ClientDiscountInput {
    companyClientRoleId: string;
    percentage: number;
    categoryId: string;
    productTypeId: string;
}

export class ClientRoleInput {
    name: string;
    companyId: string;
}

export class ClientRolesListInput {
    companyId: string;
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

export class CompanyLanguagesInput {
    companyId: string;
    languageId: string;
    isDefault: boolean;
}

export class UpdateCompanyLanguagesInput {
    isDefault: boolean;
}

export class CompanyPermissionMenuInput {
    menuId: string;
    read?: Nullable<boolean>;
    create: boolean;
    update: boolean;
    delete?: Nullable<boolean>;
}

export class UpdateCompanyPermissions {
    id: string;
    input: CompanyPermissionMenuInput;
}

export class CompanyRoleInput {
    name: string;
    minWages: number;
    maxWages: number;
    companyId: string;
}

export class UpdateCompanyRoleInput {
    name: string;
    minWages: number;
    maxWages: number;
}

export class ListCompanyRolesInput {
    companyId: string;
    search?: Nullable<string>;
    limit?: Nullable<number>;
    offset?: Nullable<number>;
    cursor?: Nullable<number>;
    sortBy?: Nullable<string>;
    sortOrder?: Nullable<string>;
}

export class OfficeInput {
    name: string;
    address: string;
    city: string;
    state: string;
    country: string;
    zipCode: string;
    companyId: string;
}

export class OfficeListInput {
    companyId: string;
    limit?: Nullable<number>;
    offset?: Nullable<number>;
    cursor?: Nullable<number>;
    sortBy?: Nullable<string>;
    sortOrder?: Nullable<string>;
}

export class CategoryInput {
    companyId: string;
    names: CategoryNameInput[];
}

export class CategoryNameInput {
    name: string;
    productLanguagesInput: string;
}

export class CategoryListInput {
    companyId: string;
    limit?: Nullable<number>;
    offset?: Nullable<number>;
    cursor?: Nullable<number>;
    sortBy?: Nullable<string>;
    sortOrder?: Nullable<string>;
}

export class ProductInput {
    ref: string;
    companyId: string;
    productTypeId: string;
    languages: Nullable<ProductLanguagesInput>[];
    providers: Nullable<ProductProviderInput>[];
}

export class ProductLanguagesInput {
    id?: Nullable<string>;
    title: string;
    description: string;
    productLanguagesInput: string;
}

export class ProductProviderInput {
    id?: Nullable<string>;
    providerId: string;
}

export class ProductListInput {
    companyId: string;
    providerId?: Nullable<string>;
    limit?: Nullable<number>;
    offset?: Nullable<number>;
    cursor?: Nullable<number>;
    sortBy?: Nullable<string>;
    sortOrder?: Nullable<string>;
}

export class ProductProvidersInput {
    productId: string;
    providers: ProductProvidersPricesInput[];
}

export class ProductProvidersPricesInput {
    providerId: string;
    price: number;
}

export class UpdateProductProvidersPricesInput {
    productId: string;
    providerId: string;
    price: number;
}

export class ProductTypeInput {
    companyId: string;
    names: ProductTypeNameInput[];
}

export class ProductTypeNameInput {
    name: string;
    companyLanguageId: string;
}

export class ProductTypeListInput {
    companyId: string;
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
    companyId: string;
}

export class ProviderListInput {
    companyId: string;
    search?: Nullable<string>;
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
    providerId: string;
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
    companyId: string;
}

export class ListUsers {
    companyId: string;
    search?: Nullable<string>;
    userRoleId?: Nullable<string>;
    limit?: Nullable<number>;
    offset?: Nullable<number>;
    sortBy?: Nullable<string>;
    sortOrder?: Nullable<string>;
}

export class UserContactInput {
    contact: string;
    type: ContactType;
    userId: string;
}

export class ListUserPermissions {
    userId: string;
    companyId: string;
    menuId?: Nullable<string>;
}

export class NewUserRole {
    userCompanyId: string;
    roleId: string;
}

export class Menu {
    id: string;
    name: string;
    slug: string;
    onlyAdmin: boolean;
    isVisible: boolean;
    parentId?: Nullable<string>;
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
    id?: Nullable<string>;
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

    abstract getClient(id: string): Nullable<Client> | Promise<Nullable<Client>>;

    abstract listClients(input?: Nullable<ClientListInput>): Nullable<ClientResponsePaginated> | Promise<Nullable<ClientResponsePaginated>>;

    abstract listClientTypes(): Nullable<Nullable<string>[]> | Promise<Nullable<Nullable<string>[]>>;

    abstract listClientDiscount(input?: Nullable<ListClientDiscountInput>): Nullable<ClientDiscountPaginated> | Promise<Nullable<ClientDiscountPaginated>>;

    abstract getClientRole(id: string): Nullable<ClientRole> | Promise<Nullable<ClientRole>>;

    abstract listClientRoles(input?: Nullable<ClientRolesListInput>): Nullable<ClientRolesPaginated> | Promise<Nullable<ClientRolesPaginated>>;

    abstract getCompany(id: string): Nullable<Company> | Promise<Nullable<Company>>;

    abstract listCompanies(input?: Nullable<CompaniesListInput>): Nullable<CompanyResponsePaginated> | Promise<Nullable<CompanyResponsePaginated>>;

    abstract listCompanyLanguages(companyId: string): Nullable<CompanyLanguagesResponsePaginated> | Promise<Nullable<CompanyLanguagesResponsePaginated>>;

    abstract listCompanyRoles(input?: Nullable<ListCompanyRolesInput>): Nullable<CompanyRolesResponsePaginated> | Promise<Nullable<CompanyRolesResponsePaginated>>;

    abstract getOffice(Id?: Nullable<string>): Nullable<Office> | Promise<Nullable<Office>>;

    abstract listOffices(input?: Nullable<OfficeListInput>): Nullable<OfficeResponsePaginated> | Promise<Nullable<OfficeResponsePaginated>>;

    abstract listCategories(input?: Nullable<CategoryListInput>): Nullable<CategoryResponsePaginated> | Promise<Nullable<CategoryResponsePaginated>>;

    abstract getProduct(id: string): Nullable<Product> | Promise<Nullable<Product>>;

    abstract listProducts(input?: Nullable<ProductListInput>): Nullable<ProductResponsePaginated> | Promise<Nullable<ProductResponsePaginated>>;

    abstract listProductTypes(input?: Nullable<ProductListInput>): Nullable<ProductTypeResponsePaginated> | Promise<Nullable<ProductTypeResponsePaginated>>;

    abstract getProvider(id: string): Nullable<Provider> | Promise<Nullable<Provider>>;

    abstract listProviders(input?: Nullable<ProviderListInput>): Nullable<ProviderListPaginated> | Promise<Nullable<ProviderListPaginated>>;

    abstract getUser(id: string): Nullable<User> | Promise<Nullable<User>>;

    abstract listUsers(input?: Nullable<ListUsers>): Nullable<UserResponsePaginated> | Promise<Nullable<UserResponsePaginated>>;

    abstract listContactTypes(): Nullable<Nullable<string>[]> | Promise<Nullable<Nullable<string>[]>>;

    abstract listUserPermissions(input?: Nullable<ListUserPermissions>): Nullable<UserPermissionsResponse> | Promise<Nullable<UserPermissionsResponse>>;

    abstract getUserRole(userCompanyId: string): Nullable<UserRole> | Promise<Nullable<UserRole>>;
}

export abstract class IMutation {
    abstract createMenu(input: MenuInput): Nullable<Menu> | Promise<Nullable<Menu>>;

    abstract updateMenu(id: string, input?: Nullable<MenuInput>): Nullable<Menu> | Promise<Nullable<Menu>>;

    abstract deleteMenu(id: string, forceDelete?: Nullable<boolean>): Nullable<string> | Promise<Nullable<string>>;

    abstract restoreMenu(id: string): Nullable<string> | Promise<Nullable<string>>;

    abstract createLanguage(input: LanguageInput): Nullable<Language> | Promise<Nullable<Language>>;

    abstract updateLanguage(id: string, input: LanguageInput): Nullable<Language> | Promise<Nullable<Language>>;

    abstract login(input?: Nullable<LoginInput>): Nullable<string> | Promise<Nullable<string>>;

    abstract signup(input?: Nullable<SignupInput>): Nullable<User> | Promise<Nullable<User>>;

    abstract createClient(input: ClientInput): Nullable<Client> | Promise<Nullable<Client>>;

    abstract updateClient(id: string, input: ClientInput): Nullable<Client> | Promise<Nullable<Client>>;

    abstract removeClient(id: string, forceDelete?: Nullable<boolean>): Nullable<string> | Promise<Nullable<string>>;

    abstract restoreClient(id: string): Nullable<string> | Promise<Nullable<string>>;

    abstract createClientContact(input: ClientContactInput): Nullable<ClientContact> | Promise<Nullable<ClientContact>>;

    abstract updateClientContact(id: string, input: ClientContactInput): Nullable<ClientContact> | Promise<Nullable<ClientContact>>;

    abstract removeClientContact(id: string, forceDelete?: Nullable<boolean>): Nullable<string> | Promise<Nullable<string>>;

    abstract restoreClientContact(id: string): Nullable<string> | Promise<Nullable<string>>;

    abstract createClientDiscount(input: ClientDiscountInput): Nullable<ClientDiscount> | Promise<Nullable<ClientDiscount>>;

    abstract updateClientDiscount(id: string, input: ClientDiscountInput): Nullable<ClientDiscount> | Promise<Nullable<ClientDiscount>>;

    abstract removeClientDiscount(id: string, forceDelete?: Nullable<boolean>): Nullable<string> | Promise<Nullable<string>>;

    abstract restoreClientDiscount(id: string): Nullable<string> | Promise<Nullable<string>>;

    abstract createClientRole(input: ClientRoleInput): Nullable<ClientRole> | Promise<Nullable<ClientRole>>;

    abstract updateClientRole(id: string, input: ClientRoleInput): Nullable<ClientRole> | Promise<Nullable<ClientRole>>;

    abstract deleteClientRole(id: string, forceDelete?: Nullable<boolean>): Nullable<string> | Promise<Nullable<string>>;

    abstract restoreClientRole(id: string): Nullable<string> | Promise<Nullable<string>>;

    abstract updateCompany(id: string, input: CompanyInput): Nullable<Company> | Promise<Nullable<Company>>;

    abstract deleteCompany(id: string): Nullable<string> | Promise<Nullable<string>>;

    abstract createCompanyLanguages(input: CompanyLanguagesInput): Nullable<CompanyLanguages> | Promise<Nullable<CompanyLanguages>>;

    abstract updateCompanyLanguages(id: string, input: UpdateCompanyLanguagesInput): Nullable<CompanyLanguages> | Promise<Nullable<CompanyLanguages>>;

    abstract deleteCompanyLanguages(id: string): Nullable<string> | Promise<Nullable<string>>;

    abstract updatePermissions(input: Nullable<UpdateCompanyPermissions>[]): Nullable<Nullable<CompanyPermission>[]> | Promise<Nullable<Nullable<CompanyPermission>[]>>;

    abstract removePermissions(roleId?: Nullable<string>): Nullable<string> | Promise<Nullable<string>>;

    abstract createCompanyRole(input: CompanyRoleInput): Nullable<CompanyRole> | Promise<Nullable<CompanyRole>>;

    abstract updateCompanyRole(id: string, input: UpdateCompanyRoleInput): Nullable<CompanyRole> | Promise<Nullable<CompanyRole>>;

    abstract deleteCompanyRole(id: string): Nullable<string> | Promise<Nullable<string>>;

    abstract createOffice(input?: Nullable<OfficeInput>): Nullable<OfficeResponse> | Promise<Nullable<OfficeResponse>>;

    abstract updateOffice(id?: Nullable<string>, input?: Nullable<OfficeInput>): Nullable<OfficeResponse> | Promise<Nullable<OfficeResponse>>;

    abstract deleteOffice(id?: Nullable<string>, forceDelete?: Nullable<boolean>): Nullable<string> | Promise<Nullable<string>>;

    abstract restoreOffice(id?: Nullable<string>): Nullable<string> | Promise<Nullable<string>>;

    abstract createCategory(input: CategoryInput): Nullable<Category> | Promise<Nullable<Category>>;

    abstract updateCategory(id: string, input: CategoryInput): Nullable<Category> | Promise<Nullable<Category>>;

    abstract removeCategory(id: string, forceDelete?: Nullable<boolean>): Nullable<string> | Promise<Nullable<string>>;

    abstract restoreCategory(id: string): Nullable<string> | Promise<Nullable<string>>;

    abstract createProduct(input: ProductInput): Nullable<Product> | Promise<Nullable<Product>>;

    abstract updateProduct(id: string, input: ProductInput): Nullable<Product> | Promise<Nullable<Product>>;

    abstract removeProduct(id: string, forceDelete?: Nullable<boolean>): Nullable<string> | Promise<Nullable<string>>;

    abstract restoreProduct(id: string): Nullable<string> | Promise<Nullable<string>>;

    abstract updateProductPrice(id: string, price: number): Nullable<ProductPrice> | Promise<Nullable<ProductPrice>>;

    abstract createOrRestoreProductProvider(id?: Nullable<string>, input?: Nullable<ProductProvidersInput>): Nullable<Nullable<ProductProvider>[]> | Promise<Nullable<Nullable<ProductProvider>[]>>;

    abstract updateProductProviderPrice(input?: Nullable<UpdateProductProvidersPricesInput>): Nullable<ProductProvider> | Promise<Nullable<ProductProvider>>;

    abstract createProductType(input: ProductTypeInput): Nullable<ProductType> | Promise<Nullable<ProductType>>;

    abstract updateProductType(id: string, input: ProductTypeInput): Nullable<ProductType> | Promise<Nullable<ProductType>>;

    abstract removeProductType(id: string, forceDelete?: Nullable<boolean>): Nullable<string> | Promise<Nullable<string>>;

    abstract restoreProductType(id: string): Nullable<string> | Promise<Nullable<string>>;

    abstract createProvider(input: ProviderInput): Nullable<Provider> | Promise<Nullable<Provider>>;

    abstract updateProvider(id: string, input: ProviderInput): Nullable<Provider> | Promise<Nullable<Provider>>;

    abstract removeProvider(id: string, forceDelete?: Nullable<boolean>): Nullable<string> | Promise<Nullable<string>>;

    abstract restoreProvider(id: string): Nullable<string> | Promise<Nullable<string>>;

    abstract createProviderContact(input?: Nullable<ProviderContactInput>): Nullable<ProviderContact> | Promise<Nullable<ProviderContact>>;

    abstract updateProviderContact(id?: Nullable<string>, input?: Nullable<ProviderContactInput>): Nullable<ProviderContact> | Promise<Nullable<ProviderContact>>;

    abstract removeProviderContact(id?: Nullable<string>): Nullable<string> | Promise<Nullable<string>>;

    abstract restoreProviderContact(id?: Nullable<string>): Nullable<string> | Promise<Nullable<string>>;

    abstract createUser(input: UserInput): UserResponse | Promise<UserResponse>;

    abstract updateUser(id: string, input?: Nullable<UserInput>): Nullable<UserResponse> | Promise<Nullable<UserResponse>>;

    abstract removeUser(id: string, forceDelete?: Nullable<boolean>): Nullable<string> | Promise<Nullable<string>>;

    abstract restoreUser(id: string): Nullable<string> | Promise<Nullable<string>>;

    abstract changeUserActiveStatus(id: string, status: boolean): Nullable<UserResponse> | Promise<Nullable<UserResponse>>;

    abstract createUserContact(input: UserContactInput): Nullable<UserContact> | Promise<Nullable<UserContact>>;

    abstract updateUserContact(id: string, input: UserContactInput): Nullable<UserContact> | Promise<Nullable<UserContact>>;

    abstract removeUserContact(id: string): Nullable<string> | Promise<Nullable<string>>;

    abstract createUserRole(input: NewUserRole): UserRole | Promise<UserRole>;

    abstract changeUserRole(userCompanyId: string, roleId: string): UserRole | Promise<UserRole>;
}

export abstract class ISubscription {
    abstract menuChanged(): Nullable<Menu> | Promise<Nullable<Menu>>;

    abstract languageChanged(): Nullable<Language> | Promise<Nullable<Language>>;

    abstract userStatusChanged(): Nullable<UserResponse> | Promise<Nullable<UserResponse>>;

    abstract userRoleChanged(userCompanyId: string): Nullable<UserRole> | Promise<Nullable<UserRole>>;
}

export class Client {
    id: string;
    name: string;
    address: string;
    type: ClientType;
    city?: Nullable<string>;
    state?: Nullable<string>;
    country?: Nullable<string>;
    zipCode?: Nullable<string>;
    clientNr: number;
    contacts?: Nullable<Nullable<ClientContact>[]>;
    companyClientRoleId: string;
    role?: Nullable<ClientRole>;
}

export class ClientResponsePaginated {
    clients?: Nullable<Nullable<Client>[]>;
    totalCount?: Nullable<number>;
}

export class ClientContact {
    id?: Nullable<string>;
    contact?: Nullable<string>;
    type?: Nullable<ContactType>;
    name?: Nullable<string>;
    client?: Nullable<Client>;
}

export class ClientDiscount {
    id?: Nullable<string>;
    companyClientRoleId?: Nullable<string>;
    percentage?: Nullable<number>;
    categoryId?: Nullable<string>;
    productTypeId?: Nullable<string>;
}

export class ClientDiscountPaginated {
    discounts?: Nullable<Nullable<ClientDiscount>[]>;
    totalCount?: Nullable<number>;
}

export class ClientRole {
    id: string;
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
    id: string;
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

export class CompanyLanguages {
    id: string;
    companyId: string;
    languageId: string;
    isDefault?: Nullable<boolean>;
    name?: Nullable<string>;
}

export class CompanyLanguagesResponsePaginated {
    languages?: Nullable<Nullable<CompanyLanguages>[]>;
    totalCount?: Nullable<number>;
}

export class CompanyPermission {
    id: string;
    read: boolean;
    create: boolean;
    update: boolean;
    delete: boolean;
    roleId: string;
    menuId: string;
    menu?: Nullable<Menu>;
}

export class CompanyRole {
    id: string;
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
    id?: Nullable<string>;
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
    id: string;
    names?: Nullable<Nullable<CategoryName>[]>;
    products?: Nullable<Nullable<Product>[]>;
}

export class CategoryName {
    id?: Nullable<string>;
    ref?: Nullable<string>;
    name?: Nullable<string>;
    companyLanguageId?: Nullable<string>;
    language?: Nullable<Language>;
}

export class CategoryResponsePaginated {
    categories?: Nullable<Nullable<Category>[]>;
    totalCount?: Nullable<number>;
}

export class Product {
    id: string;
    ref?: Nullable<string>;
    languages?: Nullable<Nullable<ProductLanguage>[]>;
    providers?: Nullable<Nullable<Provider>[]>;
    categories?: Nullable<Nullable<Category>[]>;
    productTypeId: string;
    type?: Nullable<ProductType>;
    price?: Nullable<number>;
    prices?: Nullable<Nullable<ProductPrice>[]>;
    costPrices?: Nullable<Nullable<ProductProviderPrice>[]>;
    stock?: Nullable<Nullable<ProductStock>[]>;
}

export class ProductLanguage {
    id?: Nullable<string>;
    title?: Nullable<string>;
    description?: Nullable<string>;
    companyLanguageId?: Nullable<string>;
}

export class ProductPrice {
    id?: Nullable<string>;
    productId?: Nullable<string>;
    price?: Nullable<number>;
    curency?: Nullable<CurrencyEnum>;
}

export class ProductStock {
    id?: Nullable<string>;
    product?: Nullable<Product>;
    office?: Nullable<Office>;
    quantity?: Nullable<number>;
}

export class ProductResponsePaginated {
    products?: Nullable<Nullable<Product>[]>;
    totalCount?: Nullable<number>;
}

export class ProductProvider {
    id: string;
    products?: Nullable<Nullable<Product>[]>;
    providers?: Nullable<Nullable<ProductProviderPrice>[]>;
    prices?: Nullable<Nullable<ProductProviderPrice>[]>;
}

export class ProductProviderPrice {
    id?: Nullable<string>;
    providerId?: Nullable<string>;
    lastPrice?: Nullable<number>;
    prices?: Nullable<number>;
}

export class ProductType {
    id: string;
    names?: Nullable<Nullable<ProductTypeName>[]>;
    products?: Nullable<Nullable<Product>[]>;
}

export class ProductTypeName {
    id?: Nullable<string>;
    name?: Nullable<string>;
    companyLanguageId?: Nullable<string>;
}

export class ProductTypeResponsePaginated {
    types?: Nullable<Nullable<ProductType>[]>;
    totalCount?: Nullable<number>;
}

export class Provider {
    id: string;
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
    id?: Nullable<string>;
    name?: Nullable<string>;
    contact?: Nullable<string>;
    type?: Nullable<ContactType>;
    provider?: Nullable<Provider>;
}

export class User {
    id: string;
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
    company?: Nullable<Company>;
    contacts?: Nullable<Nullable<UserContact>[]>;
    userCompanies?: Nullable<Nullable<UserCompany>[]>;
}

export class UserCompany {
    id: string;
    employeeNr?: Nullable<number>;
    userId: string;
    companyId: string;
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
    id: string;
    contact: string;
    user?: Nullable<User>;
    type: ContactType;
}

export class UserPermissionsResponse {
    permissions?: Nullable<Nullable<CompanyPermission>[]>;
}

export class UserRole {
    id: string;
    userCompanyId?: Nullable<string>;
    roleId?: Nullable<string>;
    name?: Nullable<string>;
}

type Nullable<T> = T | null;
