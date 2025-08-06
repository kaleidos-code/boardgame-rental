import { DataTableExtendedColumn } from '../types/types'

export const actionsColumn: DataTableExtendedColumn<any> = {
  accessor: 'actions',
  resizable: false,
  sortable: false,
  filtering: false,
  hideFilter: true
}
