import { FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { InviteGuestsModal } from './invite-guests-modal'
import { ConfirmTripModal } from './confirm-trip-modal'
import { DestinationAndDateStep } from './steps/destination-and-date-steps'
import { InviteGuestSteap } from './steps/invite-guests-step'
import { DateRange } from 'react-day-picker'
import { api } from "../../lib/axios";

export function CreateTripPage() {
    const navigate = useNavigate()

  const [isGuestInputOpen, setisGuestInputOpen] = useState(false)

  const [isguestsModalOpen, setisguestModalOpen] = useState(false)
  const [isConfirmTripModalOpen, setisconfirmTripModalOpen] = useState(false)

  const [destination, setDestination] = useState('')
  const [ownerName, setOwnerName] = useState('')
  const [ownerEmail, setOwnerEmail] = useState('')
  const [eventStartAndEndDates, setEventStartAndEndDates] = useState <DateRange | undefined>()

  const [emailsToInvite, setEmailsToInvite] = useState(['rodolfofonseca01@gmail.com'])

  function openGuestInput() {
    setisGuestInputOpen(true)
  }

  function closeGuestInput() {
    setisGuestInputOpen(false)
  }

  function openGuestsModal() {
    setisguestModalOpen(true)
  }

  function closeGuestsModal() {
    setisguestModalOpen(false)
  }

  function openConfirmTripModal() {
    setisconfirmTripModalOpen(true)
  }

  function closeConfirmTripModal() {
    setisconfirmTripModalOpen(false)
  }

  function addNewEmailToInvite(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const email = data.get('email')?.toString()

    if (!email) {
      return
    }

    if (emailsToInvite.includes(email)) {
      return
    }

    setEmailsToInvite([...emailsToInvite, email])

    event.currentTarget.reset()
  }

  function removeEmailFromInvites(emailToRemove: string) {
    const newEmailList = emailsToInvite.filter(email => email !== emailToRemove)

    setEmailsToInvite(newEmailList)
  }

  async function createTrip(event: FormEvent<HTMLFormElement>){
    event.preventDefault()

    if (!destination) {
      return
    }

    if (!eventStartAndEndDates?.from || !eventStartAndEndDates?.to) {
      return
    }

    if (emailsToInvite.length === 0) {
      return
    }

    if (!ownerName || !ownerEmail) {
      return
    }

    const response = await api.post('/trips', {
      destination,
      starts_at: eventStartAndEndDates.from,
      ends_at: eventStartAndEndDates.to,
      emails_to_invite: emailsToInvite,
      owner_name: ownerName,
      owner_email: ownerEmail
    })

    const { tripId } = response.data

    navigate(`/trips/${tripId}`)
  }

  return (
    <div className="h-screen flex items-center justify-center bg-pattern bg-no-repeat bg-center">
      <div className="max-w-3xl w-full px-6 text-center space-y-10">
        <div className='flex flex-col items-center gap-3'>
          <img src='/logo.svg' alt='plann.er' />
          <p className="text-zinc-300 text-lg">Convide seus amigos e planeje sua próxima viagem!</p>
        </div>

        <div className='space-y-4'>
          <DestinationAndDateStep closeGuestsInput={closeGuestInput} isGuestInputOpen={isGuestInputOpen} openGuestInput={openGuestInput} setDestination={setDestination} setEventStartAndEndDates={setEventStartAndEndDates} eventStartAndEndDates={eventStartAndEndDates}/>

          {isGuestInputOpen && (
            <InviteGuestSteap openGuestsModal={openGuestsModal} openConfirmTripModal={openConfirmTripModal} emailsToInvite={emailsToInvite} />
          )}
        </div>

        {isguestsModalOpen && (
          <InviteGuestsModal emailsToInvite={emailsToInvite} addNewEmailToInvite={addNewEmailToInvite} closeGuestsModal={closeGuestsModal} removeEmailFromInvites={removeEmailFromInvites}/>
        )}

        {isConfirmTripModalOpen && (
          <ConfirmTripModal closeConfirmTripModal={closeConfirmTripModal} createTrip={createTrip} setOwnerName={setOwnerName} setOwnerEmail={setOwnerEmail}/>
        )}


        <p className="text-sm text-zinc-500">Ao planejar sua viagem pela plann.er você automaticamente concorda <br />
          com nossos <a href="#" className="text-zinc-300 underline">termos de uso</a> e <a href="#" className="text-zinc-300 underline">políticas de privacidade</a>.</p>
      </div>
    </div>
  )
}