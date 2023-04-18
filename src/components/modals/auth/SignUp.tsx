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

const signUpSchema = z
  .object({
    email: z.string().email({ message: 'Digite um email válido' }),
    password: z
      .string()
      .min(4, { message: 'Email deve ter no mínimo 4 caracteres' }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'As senhas não coincidem',
    path: ['confirmPassword'],
  })

type SignUpInputs = z.infer<typeof signUpSchema>

export const SignUp = () => {
  const {
    actions: { changeOpenModal },
  } = useAuthModalStore()

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, error },
  } = useForm<SignUpInputs>({
    resolver: zodResolver(signUpSchema),
  })

  const handleLoginForm = (data: SignUpInputs) => {
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
          placeholder="password"
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
      <InputContainer className="flex mb-2">
        <InputRef
          {...register('confirmPassword')}
          placeholder="confirm password"
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
        Sign Up
      </Button>
      <div className="flex justify-center gap-1 text-xs">
        <span>Already a redditor?</span>
        <strong
          className="text-blue-500 cursor-pointer"
          onClick={() => changeOpenModal('login')}
        >
          LOG IN
        </strong>
      </div>
    </form>
  )
}
