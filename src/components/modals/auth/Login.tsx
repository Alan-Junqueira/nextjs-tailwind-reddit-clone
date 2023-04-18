import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '@/components/Input'
import { InputRef } from '@/components/InputRef'
import { InputContainer } from '@/components/InputContainer'
import { Button } from '@/components/Button'
import Link from 'next/link'
import { useAuthModalStore } from '@/store/modal/useAuthModalStore'

const loginSchema = z.object({
  email: z.string().email({ message: 'Digite um email válido' }),
  password: z
    .string()
    .min(4, { message: 'Email deve ter no mínimo 4 caracteres' }),
})

type LoginInputs = z.infer<typeof loginSchema>

export const Login = () => {
  const {
    actions: { changeOpenModal },
  } = useAuthModalStore()

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, error },
  } = useForm<LoginInputs>({
    resolver: zodResolver(loginSchema),
  })

  const handleLoginForm = (data: LoginInputs) => {
    console.log(data)
  }

  return (
    <form className="w-full" onSubmit={handleSubmit(handleLoginForm)}>
      <InputContainer className="flex mb-2">
        <InputRef
          {...register('email')}
          placeholder="jhondoe@example.com"
          type="email"
          required
          className="
            text-xs bg-gray-50 py-3 px-4 rounded-lg
            placeholder:text-gray-500 
            border-[1px] border-solid
            hover:border-blue-500 hover:bg-white
            focus:outline-none focus:bg-white focus:border-blue-500
          "
        />
      </InputContainer>
      <InputContainer className="flex mb-2">
        <InputRef
          {...register('password')}
          placeholder="**********"
          type="password"
          required
          className="
            text-xs bg-gray-50 py-3 px-4 rounded-lg
            placeholder:text-gray-500 
            border-[1px] border-solid 
            hover:border-blue-500 hover:bg-white
            focus:outline-none focus:bg-white focus:border-blue-500
          "
        />
      </InputContainer>
      <Button className="w-full h-9 mt-6 mb-2" size="md" type="submit">
        Log In
      </Button>
      <div className="flex justify-center gap-1 text-xs">
        <span>New here?</span>
        <strong
          className="text-blue-500 cursor-pointer"
          onClick={() => changeOpenModal('signup')}
        >
          SIGN UP
        </strong>
      </div>
    </form>
  )
}
