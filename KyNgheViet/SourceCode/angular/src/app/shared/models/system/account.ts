import * as moment from 'moment';

export class User {
    id: number;
    language_id: number;
    username!: string | undefined;
    password!: string | undefined;
    confirm_password!: string | undefined;
    token!: string | undefined;
    avatar!: string | undefined;
    firstName!: string | undefined;
    lastName!: string | undefined;
    roleID!: number | undefined;
    roleName!: string | undefined;
    language!: string | undefined;
    code!: string | undefined;
    branch!: string | undefined;
    department!: string | undefined;
    title_code!: string | undefined;
    position_code!: string | undefined;
    level!: number;
    voucher_year!: number;
    company_code!: string | undefined;
    voucher_code!: string | undefined;
    branch_name!: string | undefined;
}