import { useForm } from 'react-hook-form'
import { loginSchema, type LoginFormData } from '../validators/auth.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { CustomInput } from '../../../shared/components/ui/CustomInput';
import { CustomButton } from '../../../shared/components/ui/CustomButton';
import { useNavigate } from 'react-router';
import { useSignIn } from '../hooks/auth.queries';
import { toast } from 'sonner';
import type { AxiosError } from 'axios';
import { DarkLightButton } from '../../../shared/components/ui/DarkLightButton';
import { useAuthStore } from '../../../store/auth.store';

const LoginPage = () => {

  const navigate = useNavigate();
  const { mutate: signIn, isPending } = useSignIn();
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema)
  });

  const onSubmit = ( data: LoginFormData ) => {

    signIn(data, {
      // onSuccess de TanStack Query recibe automáticamente el valor que retornó el mutationFn. En este caso AuthService.signIn retorna Promise<User>, así que TanStack Query te lo pasa como primer argumento del onSuccess:
      onSuccess: (user) => {// ← TanStack Query te pasa el User aquí automáticamente
        toast.success(`Sesión iniciada correctamente, te amo!!! ${user.name}`);
        navigate('/dashboard');
        useAuthStore.getState().setUser(user);
      },
      onError: (error: unknown) => {
        // Casteas el unknown a AxiosError. El genérico <{ message: string }> le dice a TypeScript que el cuerpo del error del backend tiene forma { message: string } — que es lo que devuelve tu responseError del backend.
        const axiosError = error as AxiosError<{ message: string }>;
        toast.error(axiosError.response?.data?.message ?? 'Error al iniciar sesión')
      }
    })
  }
  return (
    // {/* Contenedor principal */}
    <div className='flex flex-col min-h-screen bg-bg-primary'>
       {/* Lado izquierdo */}
      <div className='w-full h-60 relative'>
        <div className='absolute top-4 right-6 z-1'>
          <DarkLightButton/>
        </div>
        <img src="/hero_obscuro.webp" alt="GPS App" className='w-full h-full object-cover opacity-60'/>
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className='text-2xl sm:text-3xl lg:text-4xl font-bold text-text-primary'>GPS Reports Manager</h1>
        </div>
        <div className="absolute bottom-1 right-1">
          <p className='text-xs sm:text-sm opacity-55'>Creado por: <i>ISC Josué Emmanuel Mata Lozano</i></p>
        </div>
      </div>
      <div className='flex flex-1 flex-col items-center justify-center'>
        <h2 className='text-2xl p-6'>Bienvenido</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='flex flex-col gap-4'>
            <CustomInput
              label='Email'
              type='email'
              placeholder='Ej: josuematloz@gmail.com'
              error={errors.email?.message}
              {...register('email')}
            />
            <CustomInput
              label='Password'
              type='password'
              error={errors.password?.message}
              {...register('password')}
            />
          </div>
          <div className='flex justify-center'>
            <CustomButton
              type='submit'
              variant='primary'
              className='mt-5'
              disabled={isPending}
            >
              Iniciar Sesion
            </CustomButton>
          </div>
        </form>
      </div>
    </div>
  )
}
export default LoginPage
