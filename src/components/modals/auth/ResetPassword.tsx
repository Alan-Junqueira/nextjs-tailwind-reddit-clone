import { auth } from '@/firebase/clientApp';
import { useAuthModalStore } from '@/store/modal/useAuthModalStore'
import { BsDot, BsReddit } from "react-icons/bs";
import { useSendPasswordResetEmail } from 'react-firebase-hooks/auth';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { InputContainer } from '@/components/InputContainer';
import { TextError } from './TextError';
import { Button } from '@/components/Button';
import { InputRef } from '@/components/InputRef';
import { FIREBASE_ERRORS } from '@/firebase/errors';

const resetPasswordSchema = z.object({
  email: z.string().email({ message: "Digite um email válido" })
})

type ResetPasswordInputs = z.infer<typeof resetPasswordSchema>

export const ResetPassword = () => {
  const {
    actions: { changeOpenModal },
  } = useAuthModalStore()

  const { handleSubmit, register, formState: { errors, isSubmitting, isSubmitSuccessful } } = useForm<ResetPasswordInputs>({
    resolver: zodResolver(resetPasswordSchema)
  })

  const [sendPasswordResetEmail, sending, firebaseError] =
    useSendPasswordResetEmail(auth);

  const handleResetPassword = async (data: ResetPasswordInputs) => {
    const { email } = data
    await sendPasswordResetEmail(email);
  }
  return (
    <div className='flex flex-col items-center w-full'>
      <BsReddit className='text-brand-100 text-4xl mb-2' />
      <p className='font-bold mb-2'>Reset your password</p>

      {(isSubmitSuccessful && !firebaseError?.message) ? <>
        <p className='mb-4'>Check your email :)</p>
      </> : <>
        <p className='text-sm text-center mb-2 text-gray-700'>Enter the email associated with your account and we will send you a reset link </p>
        <form className='w-full' onSubmit={handleSubmit(handleResetPassword)}>
          <InputContainer className='mb-2'>
            <InputRef
              {...register('email')}
              placeholder='ex.: jhondoe@email.com'
              className='
                  text-xs py-3 px-4 rounded-lg border-[1px] border-solid
                  placeholder:text-gray-500 
                  hover:bg-white hover:border-blue-500
                  focus:outline-none focus:bg-white focus:border-blue-500
                '
            />
            <TextError>{errors.email?.message}</TextError>
          </InputContainer>
          <Button type='submit' className='w-full h-9 mt-2 mb-1' disabled={isSubmitting || sending}>Reset Password</Button>
          <TextError className='text-center mb-2'>{
            FIREBASE_ERRORS[
            firebaseError?.message as keyof typeof FIREBASE_ERRORS
            ]
          }</TextError>
        </form>
      </>}
      <div className='flex items-center text-xs text-blue-500 font-bold'>
        <p className='cursor-pointer' onClick={() => changeOpenModal('login')}>LOGIN</p>
        <BsDot />
        <p className='cursor-pointer' onClick={() => changeOpenModal('signup')}>SIGN UP</p>

      </div>
    </div>
  )
}
