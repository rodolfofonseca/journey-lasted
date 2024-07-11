import { AtSign, User, X } from "lucide-react";
import { FormEvent } from 'react'
import { Button } from "../../components/button";

interface ConfirmTripModalProps {
    closeConfirmTripModal: () => void
    setOwnerName:(name: string) => void
    setOwnerEmail:(email: string) => void
    createTrip: (event: FormEvent<HTMLFormElement>) => void
}

//parei aula 2 25:21 minutos

export function ConfirmTripModal({ closeConfirmTripModal, createTrip, setOwnerName, setOwnerEmail}: ConfirmTripModalProps) {
    return (
        <div className='fixed inset-0 bg-black/60 flex items-center justify-center'>
            <div className='w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5'>
                <div className='space-y-2'>
                    <div className='flex items-center justify-center'>
                        <h2 className='text-lg font-semibold'>Confirmar criação de viagem</h2>
                        <button type='button' onClick={closeConfirmTripModal}>
                            <X className='size-5 text-zinc-400' />
                        </button>
                    </div>
                    <p className='text-sm text-zinc-400'>Para concluir a criação da viagem para <span className='text-zinc-100 font-semibold'>Florianópolid, Brasil</span> nas datas <span className='text-zinc-100 font-semibold'>16 a 27 de Agosto de 2024</span> preencha seus dados abaixo:</p>
                </div>

                <form className='space-y-3' onSubmit={createTrip}>
                    <div className='h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2'>
                        <User className='text-zinc-400 size-5' />
                        <input type="text" name="name" placeholder="Digite seu nome completo" className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1" onChange={event => setOwnerName(event.target.value)}/>
                    </div>
                    <div className='h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2'>
                        <AtSign className='text-zinc-400 size-5' />
                        <input type="email" name="email" placeholder="Seu email pessal" className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1" onChange={event => setOwnerEmail(event.target.value)}/>
                    </div>
                    <Button type="submit" variants="primary" size="full">
                        Confirmar criação da viagem
                    </Button>
                </form>

            </div>
        </div>
    )
}