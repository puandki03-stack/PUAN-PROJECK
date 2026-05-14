'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'

export async function login(formData: FormData) {
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  // Hardcoded check for Anggota
  if (email === 'Anggota@Koperasi.com' && password === 'Anggota123') {
    const cookieStore = await cookies()
    const sessionData = JSON.stringify({ email, role: 'Anggota' })
    cookieStore.set('mock_user', sessionData, { path: '/' })
    revalidatePath('/', 'layout')
    redirect('/dashboard-anggota')
  }

  // Hardcoded check for Pengurus
  if (email === 'Pengurus@Koperasi.com' && password === 'Pengurus123') {
    const cookieStore = await cookies()
    const sessionData = JSON.stringify({ email, role: 'Pengurus' })
    cookieStore.set('mock_user', sessionData, { path: '/' })
    revalidatePath('/', 'layout')
    redirect('/dashboard-pengurus')
  }

  redirect('/login?message=Kredensial tidak valid. Silakan periksa kembali email dan password Anda.')
}

export async function loginAdmin(formData: FormData) {
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  // Hardcoded check
  if (email === 'Pengurus@Koperasi.com' && password === 'Pengurus123') {
    const cookieStore = await cookies()
    const sessionData = JSON.stringify({ email, role: 'Pengurus' })
    cookieStore.set('mock_user', sessionData, { path: '/' })
    revalidatePath('/', 'layout')
    redirect('/dashboard-pengurus')
  }

  redirect('/login-admin?message=Akses ditolak. Gunakan Pengurus@Koperasi.com dan Pengurus123')
}

export async function logout() {
  const cookieStore = await cookies()
  cookieStore.delete('mock_user')
  revalidatePath('/', 'layout')
  redirect('/')
}
