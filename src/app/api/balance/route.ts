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
      console.error(`Balance API returned status: ${response.status}`)
      const text = await response.text()
      console.error('Balance Response body:', text)
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const rawData: WebhookDataItem[] = await response.json()
    console.log('Balance data fetched successfully:', rawData)

    // Calculate the cumulative balance from all transactions: (count / 3) * 0.65
    const totalBalance = rawData.reduce((sum, item) => {
      return sum + ((item.count / 3) * 0.65)
    }, 0)

    return NextResponse.json({
      query: {
        currentBalance: totalBalance.toFixed(2).replace('.', ',')
      }
    })
  } catch (error) {
    console.error('Error fetching balance data:', error)
    return NextResponse.json(
      { error: 'Failed to fetch balance data', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}