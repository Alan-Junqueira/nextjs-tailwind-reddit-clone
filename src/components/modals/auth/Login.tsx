import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { InputRef } from '@/components/InputRef'
import { InputContainer } from '@/components/InputContainer'
import { Button } from '@/components/Button'
import { useAuthModalStore } from '@/store/modal/useAuthModalStore'
import { TextError } from './TextError'
import { auth } from '@/firebase/clientApp'
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth'
import { FIREBASE_ERRORS } from '@/firebase/errors'

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
    formState: { isSubmitting, errors },
  } = useForm<LoginInputs>({
    resolver: zodResolver(loginSchema),
  })

  const [
    signInWithEmailAndPassword,
    loading,
    firebaseError,
  ] = useSignInWithEmailAndPassword(auth);

  const handleLoginForm = (data: LoginInputs) => {
    const { email, password } = data
    signInWithEmailAndPassword(email, password)
  }

  return (
    <form className="w-full" onSubmit={handleSubmit(handleLoginForm)}>
      <InputContainer className="mb-2">
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
        <TextError>{errors.email?.message}</TextError>
      </InputContainer>
      <InputContainer className="mb-2">
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
        <TextError>{errors.password?.message}</TextError>
      </InputContainer>
      <Button
        className="w-full h-9 mt-4 mb-1"
        size="md"
        type="submit"
        disabled={!!isSubmitting || !!loading}>
        Log In
      </Button>
      <TextError className='text-center mb-1'> {
        FIREBASE_ERRORS[
        firebaseError?.message as keyof typeof FIREBASE_ERRORS
        ]
      }</TextError>
      <div className="flex justify-center gap-1 text-xs my-2">
        <span>Forgot your password?</span>
        <strong
          className="text-blue-500 cursor-pointer"
          onClick={() => changeOpenModal('resetPassword')}
        >
          Reset
        </strong>
      </div>
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
