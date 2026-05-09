import { NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'

// Interface representing the shape of joined data
export interface TransactionRecord {
  id: string
  user_id: string
  amount: number
  margin?: number       // For Sharia compliance checking
  bunga_statis?: number // Ribawi component to flag/filter out
  created_at: string
  profiles: {
    full_name: string
    [key: string]: any
  }
}

export async function GET() {
  try {
    const supabase = await createClient()

    // 1. Authenticate user
    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized Access' }, { status: 401 })
    }

    // 2. Fetch data (Join transactions with profiles)
    const { data: transactions, error: fetchError } = await supabase
      .from('transactions')
      .select(`
        id,
        user_id,
        amount,
        margin,
        bunga_statis,
        created_at,
        profiles (
          full_name
        )
      `)
      .eq('user_id', user.id)

    if (fetchError) {
      console.error('Database Fetch Error:', fetchError)
      return NextResponse.json({ error: 'Failed to fetch transactions' }, { status: 500 })
    }

    // 3. Sharia-compliant logic validation (Filter or Flag)
    // Here we ensure there's no static interest ('bunga_statis') 
    // and margin/profit sharing mechanism is respected instead.
    const validTransactions = transactions?.filter((trx: any) => {
      // Validate the transaction doesn't use static interest
      const isRibaFree = !trx.bunga_statis || trx.bunga_statis === 0;
      
      // Additional checks for profit sharing (margin) can be done here
      const hasValidMargin = trx.margin !== undefined && trx.margin >= 0;

      return isRibaFree && hasValidMargin;
    }) as TransactionRecord[];

    return NextResponse.json({ 
      success: true, 
      data: validTransactions,
      metadata: { totalCount: validTransactions.length }
    }, { status: 200 })

  } catch (error: any) {
    console.error('API Error - GET /transactions:', error)
    return NextResponse.json({ error: 'Internal Server Error', details: error.message }, { status: 500 })
  }
}
