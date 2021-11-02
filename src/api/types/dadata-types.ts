import {Nullable} from "../../types";

export namespace Dadata {
  export interface DadataAddrResponse {
    suggestions: Array<Dadata.DadataAddrData>
  }

  export interface DadataAddrData {
    value: string
    unrestricted_value: string
    data: Dadata.AddrDataPropsType
  }

  export interface AddrDataPropsType {
    area: Nullable<string>
    area_fias_id: Nullable<string>
    area_kladr_id: Nullable<string>
    area_type: Nullable<string>
    area_type_full: Nullable<string>
    area_with_type: Nullable<string>
    beltway_distance: null
    beltway_hit: null
    block: Nullable<string>
    block_type: Nullable<string>
    block_type_full: Nullable<string>
    federal_district: Nullable<string>
    capital_marker: '0' | '1' | '2' | '3' | '4'
    city: Nullable<string>
    city_area: Nullable<string>
    city_district: Nullable<string>
    city_district_fias_id: Nullable<string>
    city_district_kladr_id: Nullable<string>
    city_district_type: Nullable<string>
    city_district_type_full: Nullable<string>
    city_district_with_type: Nullable<string>
    city_fias_id: Nullable<string>
    city_kladr_id: Nullable<string>
    city_type: Nullable<string>
    city_type_full: Nullable<string>
    city_with_type: Nullable<string>
    country: string
    country_iso_code: string
    fias_id: string
    fias_level: string
    flat: Nullable<string>
    flat_area: null
    flat_price: null
    flat_type: Nullable<string>
    flat_type_full: Nullable<string>
    geo_lat: Nullable<string>
    geo_lon: Nullable<string>
    geoname_id: Nullable<string>
    history_values: Nullable<Array<string>>
    house: Nullable<string>
    house_fias_id: Nullable<string>
    house_kladr_id: Nullable<string>
    house_type: Nullable<string>
    house_type_full: Nullable<string>
    kladr_id: Nullable<string>
    okato: Nullable<string>
    oktmo: Nullable<string>
    postal_box: Nullable<string>
    postal_code: Nullable<string>
    qc: null
    qc_complete: null
    qc_geo: Nullable<'0' | '1' | '2' | '3' | '4' | '5'>
    qc_house: null
    region: string
    region_fias_id: string
    region_kladr_id: string
    region_type: string
    region_type_full: string
    region_with_type: string
    settlement: Nullable<string>
    settlement_fias_id: Nullable<string>
    settlement_kladr_id: Nullable<string>
    settlement_type: Nullable<string>
    settlement_type_full: Nullable<string>
    settlement_with_type: Nullable<string>
    source: Nullable<string>
    square_meter_price: null
    street: Nullable<string>
    street_fias_id: Nullable<string>
    street_kladr_id: Nullable<string>
    street_type: Nullable<string>
    street_type_full: Nullable<string>
    street_with_type: Nullable<string>
    tax_office: Nullable<string>
    tax_office_legal: Nullable<string>
    timezone: Nullable<string>
    unparsed_parts: null
    fias_code: string
    region_iso_code: string
    fias_actuality_state: string
    metro: Nullable<Array<Dadata.MetroPropsType>>
  }

  export interface MetroPropsType {
    name: string
    line: string
    distance: number
  }

  export type AddrTypePropValue = 'region' | 'city' | 'street' | 'houses'

  export interface DadataAddrRequest {
    query: string
    from_bound?: { value: Dadata.AddrBoundsType }
    to_bound?: { value: Dadata.AddrBoundsType }
    locations?: Array<Dadata.AddrLocationsType>
    locations_boost?: Array<Dadata.AddrLocationsBoostType>
    count?: number
    language?: string
    restrict_value?: boolean
  }

  export type AddrBoundsType =
    'country'
    | 'region'
    | 'city'
    | 'street'
    | 'house'
    | 'settlement'
    | 'area'
    | ''

  export interface AddrLocationsBoostType {
    kladr_id: string
  }

  export interface AddrLocationsType {
    kladr_id?: string
    country_iso_code?: string
    region_iso_code?: string
    region_fias_id?: string //Ограничение по ФИАС-коду региона
    area_fias_id?: string //области
    city_fias_id?: string // города
    settlement_fias_id?: string //	населенного пункта
    street_fias_id?: string
    region?: string
    area?: string
    city?: string
    settlement?: string
    street?: string
    region_type_full?: string //	Ограничение по полному типу региона
    area_type_full?: string //	района в регионе
    city_type_full?: string //	города
    settlement_type_full?: string //	населенного пункта
    street_type_full?: string //улице
  }

  export interface DadataFIORequest {
    query: string
    count?: number
    gender?: string
    parts?: Array<Dadata.FioPartsType>
  }

  export type FioPartsType = 'NAME' | 'PATRONYMIC' | 'SURNAME'

  export interface DadataFIOResponse {
    suggestions: Array<Dadata.DadataFIOResponseData>
  }

  export interface DadataFIOResponseData {
    value: string
    unrestricted_value: string
    data: {
      gender: Dadata.GenderType
      name: Nullable<string>
      patronymic: Nullable<string>
      source: Nullable<string>
      surname: Nullable<string>
      qc: string
    }
  }

  export type GenderType = 'UNKNOWN' | 'MALE' | 'FEMALE'

  export interface DadataIssuedByPassportRequest {
    query: string
    filters?: [{
      region_code?: string
      type?: string
    }]
    count?: number
  }

  export interface DadataIssuedByPasportResponse {
    value: string
    unrestricted_value: string
    data: Dadata.DadataIssuedByPasportResponseData
  }

  export interface DadataIssuedByPasportResponseData {
    code: Nullable<string>
    name: Nullable<string>
    region_code: Nullable<string>
    type: Nullable<string>
  }

  export interface DadataEmailRequest {
    query: string
    count?: number
  }

  export interface DadataEmailResponse {
    value: string
    unrestricted_value: string
    data: Dadata.DadataEmailResponseData
  }

  export interface DadataEmailResponseData {
    local: Nullable<string>
    domain: Nullable<string>
    qc: Nullable<string>
    source: Nullable<string>
    type: Nullable<string>
  }

  export interface DadataCompanyInfoRequest {
    query: string
    count?: number
    locations_boost?: Array<Dadata.AddrLocationsBoostType>
    status?: ['ACTIVE']
  }

  export interface CompanyByInn {
    query: string
    count?: number
    kpp?: Nullable<string>
    branch_type?: CompanyBranch
    type?: CompanyType
  }

  export interface DadataCompanyInfoResponse {
    value: string
    unrestricted_value: string
    data: Dadata.DadataCompanyInfoResponseData
  }

  export interface DadataCompanyInfoResponseData {
    inn: Nullable<string> //ИНН
    kpp: Nullable<string> //КПП +
    ogrn: Nullable<string> //ОГРН
    ogrn_date: number //Дата выдачи ОГРН
    hid: Nullable<string> //Внутренний идентификатор внутри Дадата
    type: CompanyType //Тип организации Legal - юр лица, INDIVIDUAL - ИП
    name: Dadata.CompanyInfoNameInterface //Наименование организации
    fio: Dadata.IndividualFIOPropsType | undefined //Имя индивидуального предпринимателя
    okato: Nullable<string> //Код ОКАТО
    oktmo: Nullable<string> //Код ОКТМО
    okpo: Nullable<string> //Код ОКПО
    okogu: Nullable<string> //Код ОКОГУ
    okfs: Nullable<string> //Код ОКФС
    okved: Nullable<string> //Код ОКВЭД
    okved_type: CompanyOkvedType //Версия справочника ОКВЭД (2001/2014)
    opf: Dadata.CompanyInfoOPFType //Организационно - правовая форма
    management: Dadata.CompanyManagementInfoTypes | undefined //Инфо о руководителе (не ИП)
    branch_count: Nullable<number> //Количество филиалов
    address: Dadata.DadataAddrData //Адресс
    state: Dadata.CompanyInfoStateTypes //Состояние компании
    branch_type: CompanyBranch //Тип подразделения
    authorities: Nullable<CompanyAuthorities>
    capital: Nullable<CompanyCapital> | undefined
    documents: Nullable<CompanyDocuments>
    citizenship: Nullable<Citizenship>,
    emails: Nullable<Array<CompanyEmail>>
    employee_count: Nullable<number>
    finance: Nullable<CompanyFinances>
    founders: Nullable<CompanyFounders>
    licenses: LicenseInfo
    managers: Nullable<CompanyManagers>
    okveds: Nullable<CompanyOkveds>
    phones: Nullable<Array<CompanyPhone>>
    predecessors: PredecessorsSuccessors
    qc: null
    source: null
    successors: PredecessorsSuccessors
  }

  export interface CompanyCapital {
    type: string
    value: number
  }

  export type CompanyType = 'LEGAL' | 'INDIVIDUAL' | undefined
  export type CompanyBranch = 'MAIN' | 'BRANCH' | undefined
  export type CompanyOkvedType = '2014' | '2001' | undefined

  export interface CompanyDocuments {
    fts_registration: DocumentInterface
    pf_registration: DocumentInterface
    sif_registration: DocumentInterface
    smb: DocumentsSMB
  }

  export type PredecessorsSuccessors = Nullable<Array<Predecessors>>

  export interface Predecessors {
    ogrn: Nullable<string>,
    name: Nullable<string>,
    inn: Nullable<string>,
  }

  export interface Citizenship {
    code: {
      numeric: Nullable<string>,
      alpha_3: Nullable<string>,
    },
    name: {
      full: Nullable<string>,
      short: Nullable<string>,
    }
  }

  export type LicenseInfo = Nullable<Array<License>>

  export interface License {
    series: Nullable<string>
    number: Nullable<string>
    issue_date: Nullable<string>
    issue_authority: Nullable<string>
    suspend_date: Nullable<string>
    suspend_authority: Nullable<string>
    valid_from: Nullable<string>
    valid_to: Nullable<string>
    activities: Nullable<Array<any>>
    addresses: Nullable<Array<any>>
  }

  export interface CompanyPhone {
    value: string,
    unrestricted_value: string,
    data: {
      contact: Nullable<string>,
      source: Nullable<string>,
      qc: null,
      type: Nullable<string>,
      number: Nullable<string>,
      extension: null,
      provider: Nullable<string>,
      country: Nullable<string>,
      region: Nullable<string>,
      city: Nullable<string>,
      timezone: Nullable<string>,
      country_code: Nullable<string>,
      city_code: Nullable<string>,
      qc_conflict: null
    } | null
  }

  export interface CompanyEmail {
    value: Nullable<string>,
    unrestricted_value: Nullable<string>,
    data: {
      local: Nullable<string>,
      domain: Nullable<string>,
      type: Nullable<string>,
      source: Nullable<string>,
      qc: null
    }
  }

  export interface DocumentInterface {
    category?: Nullable<string>,
    type: Nullable<string>,
    series: Nullable<string>,
    number: Nullable<string>,
    issue_date: Nullable<string>,
    issue_authority: Nullable<string>
  }

  export interface DocumentsSMB {
    type: Nullable<string>,
    category: Nullable<string>,
    issue_date: Nullable<string>,
  }

  export interface CompanyFounder {
    ogrn: Nullable<string>,
    inn: Nullable<string>,
    name: Nullable<string>,
    hid: Nullable<string>,
    type: CompanyType,
    share: { value: Nullable<number>, type: Nullable<string>, numerator: Nullable<any>, denominator: Nullable<any> }
  }

  export interface CompanyFinance {
    tax_system: null,
    income: Nullable<number>,
    expense: Nullable<number>,
    debt: null,
    penalty: null,
    year: 2019
  }

  export interface CompanyOkved {
    main: boolean,
    type: CompanyOkvedType,
    code: Nullable<string>,
    name: Nullable<string>
  }

  export interface CompanyAuthorities {
    fts_registration: AuthoritiesProperties
    fts_report: AuthoritiesProperties
    pf: AuthoritiesProperties
    sif: AuthoritiesProperties
  }

  export interface AuthoritiesProperties {
    type: Nullable<string>
    code: Nullable<string>
    name: Nullable<string>
    address: Nullable<string>
  }


  export interface CompanyManager {
    inn: Nullable<string>,
    fio: {
      surname: string,
      name: string,
      patronymic: string,
      gender: GenderType,
      source: string,
      qc: null
    },
    post: Nullable<string>,
    hid: Nullable<string>,
    type: Nullable<string>
  }

  export type CompanyFounders = Array<CompanyFounder>
  export type CompanyManagers = Array<CompanyManager>
  export type CompanyOkveds = Array<CompanyOkved>
  export type CompanyFinances = Array<CompanyFinance>

  export interface CompanyInfoNameInterface {
    full_with_opf: Nullable<string>
    short_with_opf: Nullable<string>
    latin: Nullable<string>
    full: Nullable<string>
    short: Nullable<string>
  }

  export interface IndividualFIOPropsType {
    surname: Nullable<string>
    name: Nullable<string>
    patronymic: Nullable<string>
  }

  export interface CompanyInfoOPFType {
    type: '99' | '2012' | '2014' | undefined //Версия справочника ОКОПФ
    code: Nullable<string> //код ОКОПФ
    full: Nullable<string> //Полное название ОПФ
    short: Nullable<string> //Краткое название ОПФ
  }

  export interface CompanyManagementInfoTypes {
    name: Nullable<string>
    post: Nullable<string>
    disqualified: Nullable<any>
  }

  export interface CompanyInfoStateTypes {
    status: 'ACTIVE' | 'LIQUIDATING' | 'LIQUIDATED' | 'BANKRUPT' | 'REORGANIZING' | undefined //Статус компании
    code: null //детальный статус
    actuality_date: number //дата последних изменений
    registration_date: number //дата регистрации
    liquidation_date: Nullable<string> //дата ликвидации
  }
}