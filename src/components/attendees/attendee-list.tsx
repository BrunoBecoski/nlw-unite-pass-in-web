import { ChangeEvent, useEffect, useState } from 'react'
import dayjs from 'dayjs'
import 'dayjs/locale/pt-br'
import relativeTime from 'dayjs/plugin/relativeTime'

// import { attendees } from '../data/attendees'
import { useRouter } from '../../contexts/router-provider'
import { AttendeeTypes, deleteAttendee, getAttendees } from '../../fetches'
import { Table } from '../table/table'
import { TableHeader } from '../table/table-header'
import { TableCell } from '../table/table-cell'
import { TableRow } from '../table/table-row'
import { TableFoot } from '../table/table-foot'
import { TableSearch } from '../table/table-search'
import { Button } from '../button'
import { CreateAttendee } from './create-attendee'

dayjs.extend(relativeTime)
dayjs.locale('pt-br')

export function AttendeeList() { 
  const { changeRoute, pageIndex, changePageIndex, search, changeSearch } = useRouter()

  const [total, setTotal] = useState(0)
  const [attendees, setAttendees] = useState<AttendeeTypes[]>([])
  const [isCheck, setIsCheck] = useState(false)
  const [isCheckArray, setIsCheckArray] = useState<string[]>([])
  const [createAttendeeIsOpen, setCreateAttendeeIsOpen] = useState(false)

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

  async function handleDeleteAll() {
    const response = confirm('Remover todos os participantes marcados?')

    if (response == false) {
      return
    }

    if (response == true) {
      isCheckArray.forEach(async (id) => {
        const { successfully, message } = await deleteAttendee({ id })

        if (successfully == false) {
          alert(message)
        }

        if (successfully == true) {
          setIsCheck(false)
          setIsCheckArray([])
          fetchAttendees()
        }
      })
    }
  }

  useEffect(() => {
    setIsCheck(false) 
    setIsCheckArray([])
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
      <div className="flex gap-8 justify-between">
        {isCheck &&
          <Button
            iconName="trash-2"
            variant="primary"
            onClick={handleDeleteAll}
          >
            Deletar participantes
          </Button>
        }

        <TableSearch
          title="participantes"
          search={search}
          setSearch={changeSearch}
        />

        <Button onClick={() => setCreateAttendeeIsOpen(true)}>
          Criar participante
        </Button>
      </div>

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
                <TableHeader>Nome</TableHeader>
                <TableHeader>Email</TableHeader>
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
                    <span className="font-semibold text-white">{attendee.name}</span>
                  </TableCell>

                  <TableCell>
                    {attendee.email}
                  </TableCell>

                  <TableCell>
                    {attendee.events}
                  </TableCell>

                  <TableCell>
                    <Button
                      title={`Navegar para o participante ${attendee.name}`}
                      onClick={() => changeRoute({ route: 'attendee', code: attendee.code })}
                      iconName="ellipsis"
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

      <CreateAttendee isOpen={createAttendeeIsOpen} setIsOpen={setCreateAttendeeIsOpen} />
    </div>
  )
}