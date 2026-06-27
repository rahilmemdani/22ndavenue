import { getCliClient } from 'sanity/cli'

const client = getCliClient()

async function main() {
  const doc = {
    _type: 'stats',
    statsList: [
      {
        _key: 'stat1',
        value: 12,
        suffix: '+',
        label: 'Years of Legacy'
      },
      {
        _key: 'stat2',
        value: 1000,
        suffix: '+',
        label: 'Artists Worked With'
      },
      {
        _key: 'stat3',
        value: 2000,
        suffix: '+',
        label: 'Shows Managed'
      }
    ]
  }

  try {
    const res = await client.create(doc)
    console.log('Fact bar data created in Sanity with ID:', res._id)
  } catch (err) {
    console.error('Error creating document:', err)
  }
}

main()
