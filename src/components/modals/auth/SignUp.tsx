import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { InputRef } from '@/components/InputRef'
import { InputContainer } from '@/components/InputContainer'
import { Button } from '@/components/Button'
import { useAuthModalStore } from '@/store/modal/useAuthModalStore'
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth'
import { TextError } from './TextError'
import { auth, firestore } from '@/libs/firebase/clientApp'
import { FIREBASE_ERRORS } from '@/libs/firebase/errors'
import { User } from 'firebase/auth'
import { addDoc, collection } from 'firebase/firestore'

const signUpSchema = z
  .object({
    email: z.string().email({ message: 'Digite um email válido' }),
    password: z
      .string()
      .min(6, { message: 'Senha deve ter no mínimo 6 caracteres' }),
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
    formState: { isSubmitting, errors },
  } = useForm<SignUpInputs>({
    resolver: zodResolver(signUpSchema),
  })

  const [createUserWithEmailAndPassword, userCredentials, loading, firebaseError] =
    useCreateUserWithEmailAndPassword(auth)

  const handleLoginForm = (data: SignUpInputs) => {
    const { email, password } = data
    createUserWithEmailAndPassword(email, password)
  }

  const createUserDocument = async (user: User) => {
    await addDoc(collection(firestore, 'users'), JSON.parse(JSON.stringify(user)))
  }

  useEffect(() => {
    if (userCredentials) {
      createUserDocument(userCredentials.user)
    }
  }, [userCredentials])

  return (
    <form className="w-full" onSubmit={handleSubmit(handleLoginForm)}>
      <InputContainer className="flex flex-col gap-1 mb-2">
        <InputRef
          {...register('email')}
          placeholder="jhondoe@example.com"
          type="text"
          className="
            text-xs bg-gray-50 py-3 px-4 rounded-lg
            placeholder:text-gray-500 
            border-[1px] border-solid
            hover:border-blue-500 hover:bg-white
            focus:outline-none focus:bg-white focus:border-blue-500
          "
        />
        <TextError>{errors.email?.message}</TextError>
      </InputContainer>
      <InputContainer className="flex flex-col gap-1 mb-2">
        <InputRef
          {...register('password')}
          placeholder="password"
          type="password"
          className="
            text-xs bg-gray-50 py-3 px-4 rounded-lg
            placeholder:text-gray-500 
            border-[1px] border-solid 
            hover:border-blue-500 hover:bg-white
            focus:outline-none focus:bg-white focus:border-blue-500
          "
        />
        <TextError>{errors.password?.message}</TextError>
      </InputContainer>
      <InputContainer className="flex flex-col gap-1 mb-2">
        <InputRef
          {...register('confirmPassword')}
          placeholder="confirm password"
          type="password"
          className="
            text-xs bg-gray-50 py-3 px-4 rounded-lg
            placeholder:text-gray-500 
            border-[1px] border-solid 
            hover:border-blue-500 hover:bg-white
            focus:outline-none focus:bg-white focus:border-blue-500
          "
        />
        <TextError>{errors.confirmPassword?.message}</TextError>
      </InputContainer>
      <Button
        className="w-full h-9 mt-6 mb-1"
        size="md"
        type="submit"
        disabled={isSubmitting || loading}
      >
        Sign Up
      </Button>
      <TextError className="mb-2 text-center">
        {
          FIREBASE_ERRORS[
          firebaseError?.message as keyof typeof FIREBASE_ERRORS
          ]
        }
      </TextError>
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
