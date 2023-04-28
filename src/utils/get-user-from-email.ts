export const getUserFromEmail = (email: string) => {
  return email.split('@')[0]
}