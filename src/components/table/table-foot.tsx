import { Icon } from '../icon'
import { TableCell } from './table-cell'

interface TableFootProps {
  length: number
  total: number
  pageIndex?: number
  setPageIndex: (pageIndex: number) => void
}

export function TableFoot({
  length,
  total,
  pageIndex,
  setPageIndex
}: TableFootProps) {

  const totalPages = Math.ceil(total / 10)
  
  const currentPageIndex = pageIndex ? pageIndex : 1

  function goToFirstPage() {
    setPageIndex(1)
  }
  
  function goToPreviousPage() {
    setPageIndex(currentPageIndex - 1)
  }
  
  function goToNextPage() {
    setPageIndex(currentPageIndex + 1)
  }

  function goToLastPage() {
    setPageIndex(totalPages)
  }

  return (
    <tfoot>
      <tr>
        <TableCell colSpan={3}>
          Mostrando {length} de {total} items
        </TableCell>

        <TableCell className="text-right" colSpan={5}>
          <div className="inline-flex items-center gap-8">
            <span>Página {pageIndex ? pageIndex : 1} de {totalPages}</span>

            <div className="flex gap-1.5">
              <button
                type="button"
                className="p-1.5 rounded-lg disabled:cursor-not-allowed disabled:opacity-50 transition text-white border border-white/10 bg-white/10 enabled:hover:border-orange enabled:hover:text-orange"
                title="Ir para a primeira página"
                onClick={goToFirstPage}
                disabled={pageIndex === 1 || pageIndex === undefined}
              >
                <Icon
                  size="sm"
                  name="chevrons-left"
                />
              </button>

              <button
                type="button"
                className="p-1.5 rounded-lg disabled:cursor-not-allowed disabled:opacity-50 transition text-white border border-white/10 bg-white/10 enabled:hover:border-orange enabled:hover:text-orange"
                title="Ir para a página anterior"
                onClick={goToPreviousPage}
                disabled={pageIndex === 1 || pageIndex === undefined}
              >
                <Icon
                  size="sm"
                  name="chevron-left"
                />
              </button>

              <button
                type="button"
                className="p-1.5 rounded-lg disabled:cursor-not-allowed disabled:opacity-50 transition text-white border border-white/10 bg-white/10 enabled:hover:border-orange enabled:hover:text-orange"
                title="Ir para a próxima página"
                onClick={goToNextPage}
                disabled={currentPageIndex  >= totalPages}
              >
                <Icon
                  size="sm"
                  name="chevron-right"
                />
              </button>

              <button
                type="button"
                className="p-1.5 rounded-lg disabled:cursor-not-allowed disabled:opacity-50 transition text-white border border-white/10 bg-white/10 enabled:hover:border-orange enabled:hover:text-orange"
                title="Ir para a última página"
                onClick={goToLastPage}
                disabled={currentPageIndex >= totalPages}
              >
                <Icon
                  size="sm"
                  name="chevrons-right"
                />
              </button>
            </div>
          </div>
        </TableCell>
      </tr>
    </tfoot>
  )
}