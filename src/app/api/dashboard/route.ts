import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'
export const revalidate = 0

interface WebhookDataItem {
  date: string;
  count: number;
  amount: number;
}

export async function GET() {
  try {
    const response = await fetch('https://webhook.versell.tech/webhook/b51b4717-34c0-4ed3-9fb1-fea79f5b428c', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store'
    })

    if (!response.ok) {
      console.error(`API returned status: ${response.status}`)
      const text = await response.text()
      console.error('Response body:', text)
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const rawData: WebhookDataItem[] = await response.json()
    console.log('Data fetched successfully:', rawData)

    // Filter: hide dates with count=0 and amount=0 that are after today (Brazil timezone UTC-3)
    const now = new Date()
    // Convert to Brazil timezone (UTC-3)
    const brazilTime = new Date(now.getTime() - (3 * 60 * 60 * 1000))
    const todayStr = brazilTime.toISOString().split('T')[0] // YYYY-MM-DD format

    const filteredData = rawData.filter(item => {
      // If date is after today AND both count and amount are zero, hide it
      if (item.date > todayStr && item.count === 0 && item.amount === 0) {
        return false
      }
      return true
    }).slice(-7).reverse() // Get only the last 7 days and reverse (most recent first)

    // Transform the data: count / 3, amount / 2, profit = (count / 3) * 0.65
    const transformedData = filteredData.map(item => {
      // Format date from YYYY-MM-DD to DD/MM/YYYY
      const [year, month, day] = item.date.split('-')
      const formattedDate = `${day}/${month}/${year}`

      return {
        data_transacao: formattedDate,
        total_transacoes: String(Math.round(item.count / 3)),
        valor_total: (item.amount / 2).toFixed(2).replace('.', ','),
        lucro_total: ((item.count / 3) * 0.65).toFixed(2).replace('.', ','),
        // Original values for tooltip
        count_real: item.count,
        amount_real: item.amount
      }
    })

    return NextResponse.json({ data: transformedData })
  } catch (error) {
    console.error('Error fetching dashboard data:', error)
    return NextResponse.json(
      { error: 'Failed to fetch dashboard data', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}