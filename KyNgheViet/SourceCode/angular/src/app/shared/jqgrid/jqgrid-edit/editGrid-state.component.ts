
export class EditGridState {
    totalRecordsCount: number;

    currentPage: number;
    isCheckAll = false;
    currentItem: any = (<any>{});

    reloadPageOnInit = false;
    isInitRequiredField = false;
    showErrorOnPage: boolean = false;

    allData: any[] = [];
    pageData: any[] = [];
}