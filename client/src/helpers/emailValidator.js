export function emailValidator(email) {
  const re = /\S+@\S+\.\S+/
  if (!email) return "Email je neophodno uneti."
  if (!re.test(email)) return 'Ups! Potrebna nam je validna email adresa.'
  return ''
}
