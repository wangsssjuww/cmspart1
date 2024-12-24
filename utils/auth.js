'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '../utils/supabase/server'

export async function login(formData) {
  const supabase = await createClient()

  // Mendapatkan data dari form
  const data = {
    email: formData.get('email'),
    password: formData.get('password'),
  }

  // Proses login dengan Supabase
  const { error } = await supabase.auth.signInWithPassword(data)

  // Penanganan error
  if (error) {
    if (error.message === 'Invalid login credentials') {
      redirect('/login?message=Email atau password salah')
    }
    redirect('/error')
  }

  // Pembaruan cache dan pengalihan
  revalidatePath('/', 'layout')
  redirect('/')
}

export async function signup(formData) {
  const supabase = await createClient()

  // Mendapatkan data dari form
  const data = {
    email: formData.get('email'),
    password: formData.get('password'),
  }

  // Proses pendaftaran dengan Supabase
  const { data: signUpData, error } = await supabase.auth.signUp(data)

  // Penanganan error
  if (error) {
    redirect('/error')
  }

  // Penambahan peran untuk pengguna baru
  if (signUpData?.user) {
    const { error: roleError } = await supabase
      .from('roles')
      .insert({
        user_id: signUpData.user.id,
        role: 'user',
      })
    if (roleError) {
      redirect('/error')
    }
  }

  // Penanganan email yang sudah terdaftar
  if (signUpData?.user?.identities?.length === 0) {
    redirect('/login?message=Email already registered')
  }

  // Pengalihan ke halaman login dengan pesan konfirmasi
  redirect('/login?message=Check your email to confirm your account')
}

export async function signout() {
  const supabase = await createClient()

  // Proses keluar (logout) dengan Supabase
  const { error } = await supabase.auth.signOut()

  // Penanganan error
  if (error) {
    redirect('/error')
  }

  // Pembaruan cache dan pengalihan
  revalidatePath('/', 'layout')
  redirect('/login')
}