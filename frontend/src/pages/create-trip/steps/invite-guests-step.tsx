import { ArrowRight, UserRoundPlus } from "lucide-react";
import { Button } from "../../../components/button";

interface InviteGuestSteapProps {
    openGuestsModal: () => void
    openConfirmTripModal: () => void
    emailsToInvite: string[]
}

export function InviteGuestSteap({ openGuestsModal, openConfirmTripModal, emailsToInvite }: InviteGuestSteapProps) {
    return (
        <div className="h-16 bg-zinc-900 px-4 rounded-xl flex items-center shadow-shape gap-3">
            <button type="button" className='flex items-center gap-2 flex-1 text-left' onClick={openGuestsModal}>
                <UserRoundPlus className='size-5 text-zinc-400' />
                {emailsToInvite.length > 0 ? (
                    <span className='text-zinc-100 text-lg flex-1'>{emailsToInvite.length} pessoa(a) convidada(s)</span>
                ) : (
                    <span className='text-zinc-400 text-lg flex-1'>Quem Estará na viagem?</span>
                )}
            </button>

            <div className='w-px h-6 bg-zinc-800' />
            <Button onClick={openConfirmTripModal} variants="primary">
                Confirmar Viagem
                <ArrowRight className='size-5 text-lime-950' />
            </Button>
        </div>
    )
}