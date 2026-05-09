import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
  // Membaca cookie secara langsung tanpa menghubungi Supabase
  const cookieVal = request.cookies.get('mock_user')?.value
  const path = request.nextUrl.pathname

  let user = null;
  let role = null;

  if (cookieVal) {
    try {
      const parsed = JSON.parse(cookieVal);
      user = parsed.email;
      role = parsed.role;
    } catch (e) {
      user = cookieVal; // fallback for older sessions
      if (user === 'Pengurus@Koperasi.com') role = 'Pengurus';
      else role = 'Anggota';
    }
  }

  // Daftar rute yang memerlukan login
  const protectedRoutes = ['/dashboard-anggota', '/dashboard-pengurus', '/simpanan']
  const isProtectedRoute = protectedRoutes.some((route) =>
    path.startsWith(route)
  )

  if (!user && isProtectedRoute) {
    // Redirect ke login jika belum autentikasi
    const url = request.nextUrl.clone()
    if (path.startsWith('/dashboard-pengurus')) {
      url.pathname = '/login-admin'
    } else {
      url.pathname = '/login'
    }
    return NextResponse.redirect(url)
  }

  // Pengecekan Role (RBAC Strict Guard)
  if (user) {
    if (role === 'Anggota' && path.startsWith('/dashboard-pengurus')) {
      // Ditolak: Anggota dilarang ke panel pengurus
      const url = request.nextUrl.clone()
      url.pathname = '/dashboard-anggota'
      return NextResponse.redirect(url)
    }

    if (role === 'Pengurus' && path.startsWith('/dashboard-anggota')) {
      // Ditolak: Pengurus dilarang ke dashboard anggota
      const url = request.nextUrl.clone()
      url.pathname = '/dashboard-pengurus'
      return NextResponse.redirect(url)
    }
  }

  return NextResponse.next()
}
