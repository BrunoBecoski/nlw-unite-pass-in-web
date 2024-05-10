import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react'

import { useUrl } from '../../contexts/url-provider'
import { IconButton } from '../icon-button'
import { TableCell } from './table-cell'

interface TableFootProps {
  length: number
  total: number
}

export function TableFoot({
  length,
  total,
}: TableFootProps) {
  const { pageIndex, setPageIndex } = useUrl()

  const totalPages = Math.ceil(total / 10)

  function goToFirstPage() {
    setPageIndex(1)
  }

  function goToPreviousPage() {
    setPageIndex(pageIndex - 1)
  }

  function goToNextPage() {
    setPageIndex(pageIndex + 1)
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

        <TableCell className="text-right" colSpan={3}>
          <div className="inline-flex items-center gap-8">
            <span>Página {pageIndex} de {totalPages}</span>

            <div className="flex gap-1.5">
              <IconButton 
                title="Ir para a primeira página"
                onClick={goToFirstPage}
                disabled={pageIndex === 1}
              >
                <ChevronsLeft className="size-4" />
              </IconButton>

              <IconButton
                title="Ir para a página anterior"
                onClick={goToPreviousPage}
                disabled={pageIndex === 1}
              >
                <ChevronLeft className="size-4" />
              </IconButton>

              <IconButton
                title="Ir para a próxima página"
                onClick={goToNextPage}
                disabled={pageIndex >= totalPages}
              >
                <ChevronRight className="size-4" />
              </IconButton>
              
              <IconButton
                title="Ir para a última página"
                onClick={goToLastPage}
                disabled={pageIndex >= totalPages}
              >
                <ChevronsRight className="size-4" />
              </IconButton>
            </div>
          </div>
        </TableCell>
      </tr>
    </tfoot>
  )
}