export interface IUiAction<TList> {
    onAdd(): void;
    onUpdate(item: TList): void;
    onDelete(item: TList): void;
    onApprove(item: TList): void;
    onViewDetail(item: TList): void;
    onSave(): void;
    onSearch(): void;
    onResetSearch(): void;
    onClickAcction(id: number, storedName: string, param: string, keyService: string, classForm: string): void;
    getDataByID(storedName: string, param: string, keyService: string): void;
}