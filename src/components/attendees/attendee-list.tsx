import { ChangeEvent, useEffect, useState } from 'react'
import dayjs from 'dayjs'
import 'dayjs/locale/pt-br'
import relativeTime from 'dayjs/plugin/relativeTime'

// import { attendees } from '../data/attendees'
import { useRouter } from '../../contexts/router-provider'
import { AttendeeTypes, getAttendees } from '../../fetches'

import { Table } from '../table/table'
import { TableHeader } from '../table/table-header'
import { TableCell } from '../table/table-cell'
import { TableRow } from '../table/table-row'
import { TableFoot } from '../table/table-foot'
import { TableSearch } from '../table/table-search'
import { Button } from '../button'

dayjs.extend(relativeTime)
dayjs.locale('pt-br')

export function AttendeeList() { 
  const { changeRoute, pageIndex, changePageIndex, search, changeSearch } = useRouter()

  const [total, setTotal] = useState(0)
  const [attendees, setAttendees] = useState<AttendeeTypes[]>([])
  const [isCheck, setIsCheck] = useState(false)
  const [isCheckArray, setIsCheckArray] = useState<string[]>([])

  function handleCheck(e: ChangeEvent<HTMLInputElement>) {
    const name = e.target.name
    const checked = e.target.checked

    if (name == 'checkbox') {
      let newIsCheckArray: string[] = []

      if (checked == true) {
        newIsCheckArray = attendees.map(attendee => attendee.id)
      }

      setIsCheckArray(newIsCheckArray)
      setIsCheck(checked)

      return
    }

    const idCheck = isCheckArray.includes(name)

    let newIsCheckArray: string[] = []

    if (idCheck == false) {
      newIsCheckArray = [...isCheckArray, name]
    }

    if (idCheck == true) {
      newIsCheckArray = isCheckArray.filter(id => id != name)
    }

    setIsCheckArray(newIsCheckArray)

    if (newIsCheckArray.length == 0) {
      setIsCheck(false)
    } else {
      setIsCheck(true)
    }
  }

  useEffect(() => {
    fetchAttendees()
  }, [pageIndex, search])

  async function fetchAttendees() {
    const { successfully, message, data } = await getAttendees({ pageIndex, search })

    if (successfully == false) {
      alert(message)
    }

    if (successfully == true && data != undefined) {
      setAttendees(data.attendees)
      setTotal(data.total)
    } 
  }

  return (
    <div className="flex flex-col gap-4">
      <TableSearch
        title="participantes"
        search={search}
        setSearch={changeSearch}
      />

      {attendees.length === 0
        ?
          <span>Nada encontrado com: <i>{search}</i></span>
        :
          <Table>
            <thead>
              <tr className="border-b border-white/10">
                <TableHeader style={{ width: 48 }} >
                  <input
                    name="checkbox"
                    type="checkbox"
                    className="size-4 bg-black/20 rounded border border-white/10 cursor-pointer checked:bg-orange-400"
                    checked={isCheck}
                    onChange={handleCheck}
                  />
                </TableHeader>
                <TableHeader>Código</TableHeader>
                <TableHeader>Participante</TableHeader>
                <TableHeader>Eventos</TableHeader>
                <TableHeader style={{ width: 64 }}></TableHeader>
              </tr>
            </thead>

            <tbody>
              {attendees.map((attendee) => {
                return (
                <TableRow key={attendee.id}>
                  <TableCell>
                    <input 
                      type="checkbox"
                      className="size-4 bg-black/20 rounded border border-white/10 cursor-pointer checked:bg-orange-400"
                      name={attendee.id}
                      onChange={handleCheck}
                      checked={isCheckArray.includes(attendee.id)}
                    />
                  </TableCell>

                  <TableCell>
                    {attendee.code}
                  </TableCell>

                  <TableCell>
                    <div className="flex flex-col gap-1">
                      <span className="font-semibold text-white">{attendee.name}</span>
                      <span>{attendee.email}</span>
                    </div>
                  </TableCell>

                  <TableCell>
                    {attendee.events}
                  </TableCell>

                  <TableCell>
                    <Button
                      onClick={() => changeRoute({ route: 'attendee', code: attendee.code })}
                      iconName="eye"
                      variant="iconBorder"
                    />
                  </TableCell>
                </TableRow>
                )
              })}
              
            </tbody>

            <TableFoot
              length={attendees.length}
              total={total}
              pageIndex={pageIndex}
              setPageIndex={changePageIndex}
            />
          </Table>
      }      
    </div>
  )
}