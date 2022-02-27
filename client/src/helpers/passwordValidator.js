export function passwordValidator(password) {
  if (!password) return "Lozinku je neophondo uneti."
  if (password.length < 5) return 'Lozinka mora biti minimum 5 karaktera dužine.'
  return ''
}
