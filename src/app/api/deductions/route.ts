import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export const dynamic = 'force-dynamic'

const DEDUCTIONS_FILE = path.join(process.cwd(), 'deducoes.csv')

// Read deductions from CSV file
function readDeductions(): number[] {
  try {
    if (fs.existsSync(DEDUCTIONS_FILE)) {
      const data = fs.readFileSync(DEDUCTIONS_FILE, 'utf-8')
      // Parse CSV - values separated by comma
      const values = data
        .split(',')
        .map(v => v.trim())
        .filter(v => v !== '')
        .map(v => parseFloat(v.replace(',', '.')))
        .filter(v => !isNaN(v))
      return values
    }
  } catch (error) {
    console.error('Error reading deductions:', error)
  }
  return []
}

// Write deductions to CSV file
function writeDeductions(deductions: number[]) {
  const csvContent = deductions.join(', ')
  fs.writeFileSync(DEDUCTIONS_FILE, csvContent)
}

// GET - Return total deductions
export async function GET() {
  try {
    const deductions = readDeductions()
    const total = deductions.reduce((sum, val) => sum + val, 0)

    return NextResponse.json({
      deductions,
      total,
      count: deductions.length
    })
  } catch (error) {
    console.error('Error getting deductions:', error)
    return NextResponse.json(
      { error: 'Failed to get deductions' },
      { status: 500 }
    )
  }
}

// POST - Add new deductions from CSV
export async function POST(request: Request) {
  try {
    const { values } = await request.json()

    if (!Array.isArray(values)) {
      return NextResponse.json(
        { error: 'Values must be an array' },
        { status: 400 }
      )
    }

    const currentDeductions = readDeductions()
    const newDeductions = [...currentDeductions, ...values]
    writeDeductions(newDeductions)

    const total = newDeductions.reduce((sum, val) => sum + val, 0)

    return NextResponse.json({
      success: true,
      added: values.length,
      total,
      count: newDeductions.length
    })
  } catch (error) {
    console.error('Error adding deductions:', error)
    return NextResponse.json(
      { error: 'Failed to add deductions' },
      { status: 500 }
    )
  }
}

// DELETE - Clear all deductions
export async function DELETE() {
  try {
    writeDeductions([])
    return NextResponse.json({ success: true, message: 'All deductions cleared' })
  } catch (error) {
    console.error('Error clearing deductions:', error)
    return NextResponse.json(
      { error: 'Failed to clear deductions' },
      { status: 500 }
    )
  }
}
