import { useMutation, useQuery } from "@tanstack/react-query"
import { AuthService } from "../services/auth.service"
import { useAuthStore } from "../../../store/auth.store"

// Para useSignIn y useSignUp lo natural es siempre que el login sea exitoso querrás guardar el usuario en useAuthStore. Es lógica que aplica en cualquier lugar donde uses ese hook.

// Para onError en cambio, el mensaje de error puede variar según el componente que llame la mutation.

export const useSignIn = () => {
  // const setUser = useAuthStore((state) => state.setUser);

  return useMutation({
    mutationFn: (data: { email: string, password: string }) => AuthService.signIn(data.email, data.password),
    // onSuccess: (user) => setUser(user)
  });
};

export const useSignUp = () => {
  const setUser = useAuthStore((state) => state.setUser);
  return useMutation({
    mutationFn: (data: {name: string, email: string, password: string}) => AuthService.signUp(data.name, data.email, data.password),
    onSuccess: (user) => setUser(user),
  });
};

export const useSignOut = () => {
  // const clearUser = useAuthStore((state) => state.clearUser)
  return useMutation({
    mutationFn: () => AuthService.signOut(),
    // onSuccess: () => clearUser(),
  });
};

export const useGetProfile = () => {
  return useQuery({
    queryKey: ['profile'],
    queryFn: AuthService.getProfile
  })
};